import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONTENT_CATALOG_VERSION,
  assertUniqueContentIds,
  validateContentManifest
} from '../src/content/aurumContentSystem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SHOP_ROOT = path.join(PROJECT_ROOT, 'assets', 'shop');
const OUT_FILE = path.join(SHOP_ROOT, 'catalog.generated.json');

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(dir) {
  if (!(await exists(dir))) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await listFilesRecursive(full));
    else result.push(full);
  }

  return result;
}

function toPosixRelative(from, to) {
  return path.relative(from, to).split(path.sep).join('/');
}

async function readJson(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`${filePath}: ${error.message}`);
  }
}

export async function scanShopContent() {
  const files = await listFilesRecursive(SHOP_ROOT);
  const manifests = files
    .filter(file => path.basename(file) === 'manifest.json')
    .sort((a, b) => a.localeCompare(b));

  const items = [];
  const errors = [];
  const warnings = [];

  for (const manifestPath of manifests) {
    const itemDir = path.dirname(manifestPath);
    const manifest = await readJson(manifestPath);
    const localFiles = await fs.readdir(itemDir);
    const availableAssetPaths = new Set(localFiles.filter(file => file !== 'manifest.json'));
    const basePath = `assets/shop/${toPosixRelative(SHOP_ROOT, itemDir)}`;

    const validation = validateContentManifest(manifest, {
      itemDir: toPosixRelative(PROJECT_ROOT, itemDir),
      basePath,
      availableAssetPaths
    });

    for (const error of validation.errors) {
      errors.push({ file: toPosixRelative(PROJECT_ROOT, manifestPath), ...error });
    }
    for (const warning of validation.warnings) {
      warnings.push({ file: toPosixRelative(PROJECT_ROOT, manifestPath), ...warning });
    }
    if (validation.ok) items.push(validation.item);
  }

  const unique = assertUniqueContentIds(items);
  if (!unique.ok) errors.push(...unique.errors.map(error => ({ file: 'catalog', ...error })));

  items.sort((a, b) => a.type.localeCompare(b.type) || (a.sort ?? 1000) - (b.sort ?? 1000) || a.name.localeCompare(b.name));

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    catalog: {
      version: CONTENT_CATALOG_VERSION,
      generatedAt: new Date().toISOString(),
      source: 'assets/shop/**/manifest.json',
      items
    }
  };
}

export async function generateContentCatalog() {
  const result = await scanShopContent();
  if (!result.ok) return result;

  await fs.mkdir(SHOP_ROOT, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(result.catalog, null, 2) + '\n', 'utf8');
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await generateContentCatalog();

  for (const warning of result.warnings) {
    console.warn(`[AURUM content warning] ${warning.file} ${warning.path}: ${warning.message}`);
  }

  if (!result.ok) {
    for (const error of result.errors) {
      console.error(`[AURUM content error] ${error.file} ${error.path}: ${error.message}`);
    }
    process.exit(1);
  }

  console.log(`AURUM content catalog generated: ${result.catalog.items.length} items -> ${toPosixRelative(PROJECT_ROOT, OUT_FILE)}`);
}

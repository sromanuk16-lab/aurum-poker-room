import { scanShopContent } from './generate-content-catalog.mjs';

const result = await scanShopContent();

for (const warning of result.warnings) {
  console.warn(`[AURUM content warning] ${warning.file} ${warning.path}: ${warning.message}`);
}

if (!result.ok) {
  for (const error of result.errors) {
    console.error(`[AURUM content error] ${error.file} ${error.path}: ${error.message}`);
  }
  process.exit(1);
}

console.log(`AURUM content valid: ${result.catalog.items.length} items.`);

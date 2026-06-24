// AURUM Content System v1
// Sell only overlay content that can be rendered above the video room.

export const CONTENT_CATALOG_VERSION = 1;

export const ITEM_TYPES = Object.freeze({
  CARD_BACK: 'card_back',
  PLAYER_FRAME: 'player_frame',
  DEALER_BUTTON: 'dealer_button',
  TURN_AURA: 'turn_aura',
  WINNER_EFFECT: 'winner_effect',
  EMOTE: 'emote',
  PROFILE_BADGE: 'profile_badge',
  TITLE: 'title',
  TABLE_FUNCTION: 'table_function',
  VIP_PASS: 'vip_pass',
  SEASON_PASS: 'season_pass',
  COINS_PACK: 'coins_pack'
});

export const BLOCKED_V1_TYPES = Object.freeze([
  'dealer_mask',
  'dealer_skin',
  'video_room',
  'video_table',
  'room_video_pack'
]);

export const RARITIES = Object.freeze(['common', 'rare', 'epic', 'legendary', 'founder', 'vip', 'seasonal']);
export const PRICE_CURRENCIES = Object.freeze(['aurum_coins', 'premium', 'vip_only', 'real_money_iap', 'free']);

export const DEFAULT_LOADOUT = Object.freeze({
  card_back: null,
  player_frame: null,
  dealer_button: null,
  turn_aura: null,
  winner_effect: null,
  emote: null,
  profile_badge: null,
  title: null
});

const KNOWN_TYPES = new Set(Object.values(ITEM_TYPES));
const BLOCKED_TYPES = new Set(BLOCKED_V1_TYPES);
const KNOWN_RARITIES = new Set(RARITIES);
const KNOWN_CURRENCIES = new Set(PRICE_CURRENCIES);

const REQUIRED_ASSETS = Object.freeze({
  card_back: ['preview', 'image'],
  player_frame: ['preview', 'frame'],
  dealer_button: ['preview', 'image'],
  turn_aura: ['preview'],
  winner_effect: ['preview'],
  emote: ['preview'],
  profile_badge: ['preview', 'image'],
  title: ['preview'],
  table_function: ['preview'],
  vip_pass: ['preview'],
  season_pass: ['preview'],
  coins_pack: ['preview']
});

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function safeAssetPath(value) {
  return typeof value === 'string'
    && value.length > 0
    && !value.startsWith('/')
    && !value.includes('..')
    && !/^https?:\/\//i.test(value);
}

function err(errors, path, message) {
  errors.push({ path, message });
}

export function validateContentManifest(manifest, options = {}) {
  const errors = [];
  const warnings = [];
  const availableAssetPaths = options.availableAssetPaths || null;

  if (!isObject(manifest)) {
    return { ok: false, errors: [{ path: 'manifest', message: 'manifest.json must be an object.' }], warnings, item: null };
  }

  if (typeof manifest.id !== 'string' || !/^[a-z0-9][a-z0-9_-]{2,80}$/.test(manifest.id)) {
    err(errors, 'id', 'Use lowercase latin id: letters, numbers, _ or - only.');
  }

  if (BLOCKED_TYPES.has(manifest.type)) {
    err(errors, 'type', `"${manifest.type}" is blocked in v1 because it depends on video production.`);
  } else if (!KNOWN_TYPES.has(manifest.type)) {
    err(errors, 'type', `Unknown item type "${manifest.type}".`);
  }

  if (typeof manifest.name !== 'string' || manifest.name.trim().length < 2) err(errors, 'name', 'Name is required.');
  if (!KNOWN_RARITIES.has(manifest.rarity)) err(errors, 'rarity', `Use one of: ${RARITIES.join(', ')}.`);

  if (!isObject(manifest.price)) {
    err(errors, 'price', 'Price object is required.');
  } else {
    if (!KNOWN_CURRENCIES.has(manifest.price.currency)) err(errors, 'price.currency', `Use one of: ${PRICE_CURRENCIES.join(', ')}.`);
    if (manifest.price.currency === 'free' && manifest.price.amount !== 0) err(errors, 'price.amount', 'Free item amount must be 0.');
    if (manifest.price.currency !== 'free' && (typeof manifest.price.amount !== 'number' || manifest.price.amount < 0)) {
      err(errors, 'price.amount', 'Amount must be a positive number or 0.');
    }
  }

  if (!isObject(manifest.assets)) {
    err(errors, 'assets', 'Assets object is required.');
  } else {
    for (const key of REQUIRED_ASSETS[manifest.type] || ['preview']) {
      if (!safeAssetPath(manifest.assets[key])) err(errors, `assets.${key}`, `Missing safe relative asset path for "${key}".`);
    }
    for (const [key, value] of Object.entries(manifest.assets)) {
      if (!safeAssetPath(value)) err(errors, `assets.${key}`, 'Asset path must be a local relative file.');
      else if (availableAssetPaths && !availableAssetPaths.has(value)) err(errors, `assets.${key}`, `Asset file "${value}" not found.`);
    }
  }

  if (manifest.tags !== undefined && (!Array.isArray(manifest.tags) || manifest.tags.some(tag => typeof tag !== 'string'))) {
    err(errors, 'tags', 'Tags must be an array of strings.');
  }

  if (manifest.type === ITEM_TYPES.COINS_PACK && manifest.price?.currency !== 'real_money_iap') {
    warnings.push({ path: 'price.currency', message: 'Coin packs usually map to app-store IAP products.' });
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    item: errors.length ? null : normalizeContentManifest(manifest, options)
  };
}

export function normalizeContentManifest(manifest, options = {}) {
  const basePath = (options.basePath || '').replace(/\/$/, '');
  const withBase = value => basePath ? `${basePath}/${value}` : value;

  return {
    id: manifest.id,
    type: manifest.type,
    name: manifest.name.trim(),
    description: manifest.description || '',
    rarity: manifest.rarity,
    price: {
      currency: manifest.price.currency,
      amount: manifest.price.amount,
      productId: manifest.price.productId || null
    },
    assets: Object.fromEntries(Object.entries(manifest.assets || {}).map(([key, value]) => [key, withBase(value)])),
    layout: manifest.layout || {},
    effect: manifest.effect || {},
    tags: manifest.tags || [],
    flags: manifest.flags || {},
    sort: Number.isFinite(manifest.sort) ? manifest.sort : 1000,
    basePath,
    manifestVersion: manifest.manifestVersion || 1
  };
}

export function assertUniqueContentIds(items) {
  const seen = new Set();
  const duplicates = [];
  for (const item of items) {
    if (seen.has(item.id)) duplicates.push(item.id);
    seen.add(item.id);
  }
  return duplicates.length
    ? { ok: false, errors: duplicates.map(id => ({ path: id, message: `Duplicate content id "${id}".` })) }
    : { ok: true, errors: [] };
}

export function buildContentRegistry(catalog) {
  const registry = {
    version: catalog?.version || CONTENT_CATALOG_VERSION,
    generatedAt: catalog?.generatedAt || null,
    items: Array.isArray(catalog?.items) ? [...catalog.items] : [],
    byId: new Map(),
    byType: new Map()
  };

  for (const item of registry.items) {
    registry.byId.set(item.id, item);
    if (!registry.byType.has(item.type)) registry.byType.set(item.type, []);
    registry.byType.get(item.type).push(item);
  }

  for (const list of registry.byType.values()) {
    list.sort((a, b) => (a.sort ?? 1000) - (b.sort ?? 1000) || a.name.localeCompare(b.name));
  }

  return registry;
}

export async function loadContentRegistry(catalogUrl = './assets/shop/catalog.generated.json', fetchImpl = globalThis.fetch) {
  if (!fetchImpl) throw new Error('fetch is not available.');
  const response = await fetchImpl(catalogUrl, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Cannot load content catalog: ${response.status} ${response.statusText}`);
  return buildContentRegistry(await response.json());
}

export function createShopCatalog(registry, options = {}) {
  const items = (registry?.items || [])
    .filter(item => options.includeHidden || !item.flags?.hidden)
    .filter(item => !options.type || item.type === options.type)
    .filter(item => !options.rarity || item.rarity === options.rarity)
    .sort((a, b) => (a.sort ?? 1000) - (b.sort ?? 1000) || a.name.localeCompare(b.name));
  return { generatedAt: registry?.generatedAt || null, items };
}

export function createEmptyInventory() {
  return { ownedItemIds: [], purchases: {}, updatedAt: new Date().toISOString() };
}

export function ownsItem(inventory, itemId) {
  return Boolean(itemId && inventory?.ownedItemIds?.includes(itemId));
}

export function grantItem(inventory, itemId, source = 'manual') {
  if (!itemId) throw new Error('itemId is required');
  return {
    ...inventory,
    ownedItemIds: Array.from(new Set([...(inventory.ownedItemIds || []), itemId])),
    purchases: { ...(inventory.purchases || {}), [itemId]: { source, grantedAt: new Date().toISOString() } },
    updatedAt: new Date().toISOString()
  };
}

export function createDefaultLoadout(overrides = {}) {
  return { ...DEFAULT_LOADOUT, ...overrides, updatedAt: new Date().toISOString() };
}

export function setLoadoutItem(loadout, slot, itemId, context = {}) {
  const { registry, inventory, allowLocked = false } = context;
  const item = registry?.byId?.get(itemId);
  if (item && item.type !== slot) throw new Error(`Item "${itemId}" cannot be placed into slot "${slot}".`);
  if (!allowLocked && inventory && itemId && !ownsItem(inventory, itemId)) throw new Error(`Item "${itemId}" is not owned.`);
  return { ...loadout, [slot]: itemId, updatedAt: new Date().toISOString() };
}

export function resolveLoadoutItems(loadout, registry) {
  const result = {};
  for (const [slot, itemId] of Object.entries(loadout || {})) {
    if (slot === 'updatedAt') continue;
    result[slot] = itemId ? registry?.byId?.get(itemId) || null : null;
  }
  return result;
}

export function applyLoadoutToTable(rootElement, resolvedLoadout) {
  if (!rootElement || !resolvedLoadout) return;

  rootElement.querySelectorAll('[data-aurum-card-back-target]').forEach(el => {
    const item = resolvedLoadout.card_back;
    if (!item) return;
    el.style.setProperty('--aurum-card-back-image', `url("${item.assets?.image || item.assets?.preview}")`);
    el.dataset.cardBackId = item.id;
  });

  rootElement.querySelectorAll('[data-aurum-player-frame-target]').forEach(el => {
    const item = resolvedLoadout.player_frame;
    if (!item) return;
    el.style.setProperty('--aurum-player-frame-image', `url("${item.assets?.frame || item.assets?.preview}")`);
    el.dataset.playerFrameId = item.id;
  });

  rootElement.querySelectorAll('[data-aurum-dealer-button-target]').forEach(el => {
    const item = resolvedLoadout.dealer_button;
    if (!item) return;
    el.style.setProperty('--aurum-dealer-button-image', `url("${item.assets?.image || item.assets?.preview}")`);
    el.dataset.dealerButtonId = item.id;
  });

  if (resolvedLoadout.turn_aura) rootElement.dataset.turnAuraId = resolvedLoadout.turn_aura.id;
  if (resolvedLoadout.winner_effect) rootElement.dataset.winnerEffectId = resolvedLoadout.winner_effect.id;
}

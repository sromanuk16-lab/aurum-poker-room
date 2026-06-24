# AURUM Content System v1

This is the foundation for the AURUM shop, inventory and cosmetics.

The current AURUM poker room uses a cinematic video/background scene. The dealer, room, table, chairs, lamps and mask are part of that scene. Because of that, v1 must sell only overlay content that can be rendered above the video without changing the video itself.

## What AURUM v1 sells

1. AURUM Coins
2. VIP Black Pass
3. Card backs
4. Player frames
5. Dealer button skins
6. Turn auras
7. Winner effects
8. Premium emotes
9. Profile badges and titles
10. Private tables and clubs
11. Season pass

## What AURUM v1 must not sell

1. Dealer masks
2. New dealers
3. Video room packs
4. Video table skins
5. Background table texture changes

Those are not impossible forever, but they belong to a later video room-pack pipeline.

## Folder rule

Every sellable item lives in its own folder:

```text
assets/shop/<category>/<item_slug>/
  manifest.json
  preview.png or preview.svg
  item_asset.png or item_asset.svg
```

Example:

```text
assets/shop/card_backs/royal_gold/
  manifest.json
  preview.png
  card_back.png
```

## Manifest example

```json
{
  "id": "card_back_royal_gold",
  "type": "card_back",
  "name": "Royal Gold",
  "description": "Luxury black and gold AURUM card back.",
  "rarity": "rare",
  "price": { "currency": "aurum_coins", "amount": 2500 },
  "assets": {
    "preview": "preview.png",
    "image": "card_back.png"
  },
  "tags": ["black_gold", "premium"],
  "sort": 100
}
```

## Catalog generation

Static browser JavaScript cannot safely scan folders by itself. The correct architecture is:

1. New folders are added under `assets/shop/`.
2. `npm run content:generate` scans every `manifest.json`.
3. The script validates ids, types, prices and asset paths.
4. It writes `assets/shop/catalog.generated.json`.
5. The game loads only that generated catalog.

Later, on a real server, this scan can run automatically at server startup or in CI. For mobile builds, the generated catalog becomes part of the app bundle or is fetched from the backend.

## Runtime layers

- `src/content/aurumContentSystem.js` contains the content types, manifest validation, registry, shop catalog helpers, inventory helpers, loadout helpers and renderer hooks.
- `scripts/generate-content-catalog.mjs` scans `assets/shop/**/manifest.json` and writes the generated catalog.
- `scripts/validate-content.mjs` validates the content folder without writing the catalog.

## Renderer rule

The calibrator sets fixed zones on the poker table:

- player card zones
- board card zones
- player frame zones
- dealer button zones
- pot zone
- action button zone

A shop item never owns table position. It only provides the asset/effect placed into an already calibrated zone.

This lets AURUM add unlimited sellable overlay content without recalibrating every item.

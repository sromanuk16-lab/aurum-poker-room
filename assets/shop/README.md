# AURUM Shop Assets

Every new sellable item must be dropped into its own folder with a `manifest.json` file.

Example:

```text
assets/shop/card_backs/royal_gold/
  manifest.json
  preview.png
  card_back.png
```

Then run:

```bash
npm run content:generate
```

The game should load:

```text
assets/shop/catalog.generated.json
```

The HTML/game code must not hard-code shop items.

## AURUM v1 sells overlay content only

Allowed v1 products:

- card backs
- player frames
- dealer button skins
- turn auras
- winner effects
- premium emotes
- profile badges / titles
- private table / club functions
- VIP pass / season pass / coin packs

Blocked in v1:

- dealer masks
- new dealers
- video rooms
- video table skins

Those blocked items depend on video production and should become a later room-pack pipeline, not the first monetization system.

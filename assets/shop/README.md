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

## AURUM v1 sells overlay content first

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
- Dealer Ceremonies as premium after-hand video events

Blocked in v1 as normal cheap skins:

- dealer masks
- new dealers
- video rooms
- video table skins

Those blocked items depend on video production and should become a later room-pack pipeline, not the first monetization system.

## Dealer Ceremonies

Dealer Ceremonies are allowed only as expensive after-hand social events. They are not live gameplay actions and they must not interrupt betting.

Required pack:

```text
assets/shop/dealer_ceremonies/<item_slug>/
  manifest.json
  preview.png
  poster.png
  seat_0.mp4
  seat_1.mp4
  seat_2.mp4
  seat_3.mp4
  seat_4.mp4
```

See `docs/DEALER_CEREMONIES.md` for the full architecture.

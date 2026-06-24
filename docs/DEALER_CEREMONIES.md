# Dealer Ceremonies

Dealer Ceremonies are premium paid social events.

They run only after a poker hand is finished. They never interrupt betting and never affect cards, odds, pot, rewards, or game logic.

A player can buy one ceremony and address it to one player at the table. The server queues the event and all clients play the same short video after the hand.

## Product rule

Dealer Ceremonies are not normal cheap emotes. They are the expensive top tier of AURUM social monetization.

Recommended order by price:

1. Emotes
2. Turn auras
3. Winner effects
4. Dealer Ceremonies

A ceremony should usually be consumable: bought once, used once.

## Required video pack

For five seats, every ceremony needs five prepared clips:

```text
assets/shop/dealer_ceremonies/royal_respect/
  manifest.json
  preview.png
  poster.png
  seat_0.mp4
  seat_1.mp4
  seat_2.mp4
  seat_3.mp4
  seat_4.mp4
```

Each `seat_X.mp4` is the same ceremony but directed at a specific table seat. The dealer should look or speak toward that seat.

The video must not include player names. Player names are rendered by HTML overlay.

## Manifest example

```json
{
  "id": "dealer_ceremony_royal_respect",
  "type": "premium_event",
  "eventKind": "dealer_reaction",
  "name": "Royal Respect",
  "description": "The dealer grants a rare word of respect after the hand.",
  "rarity": "legendary",
  "price": { "currency": "aurum_coins", "amount": 12000 },
  "consumable": true,
  "timing": "after_hand",
  "durationMs": 4500,
  "assets": {
    "preview": "preview.png",
    "poster": "poster.png",
    "seat_0": "seat_0.mp4",
    "seat_1": "seat_1.mp4",
    "seat_2": "seat_2.mp4",
    "seat_3": "seat_3.mp4",
    "seat_4": "seat_4.mp4"
  },
  "text": {
    "subtitle": "AURUM признаёт этот ход."
  },
  "tags": ["premium_event", "dealer", "after_hand"]
}
```

## Server flow

```text
1. Player buys Dealer Ceremony or receives one through VIP / event reward.
2. Player selects a target player at the current table.
3. Server validates ownership, consumable count, table id, target seat and hand phase.
4. Server adds one event to the after-hand queue.
5. Current hand finishes normally.
6. Server broadcasts the ceremony event to all clients.
7. Clients play the seat-specific video clip.
8. HTML overlay shows recipient / sender text if needed.
9. Server marks the event as played and starts the next hand.
```

## Limits

```text
max 1 Dealer Ceremony after one hand
only after hand is finished
no effect during betting
no gameplay advantage
no chips, prizes, odds or rewards
no player names inside video
```

## Client playback rule

The base room video is still the normal idle/dealer loop. Dealer Ceremonies are temporary video overlays or a short scene swap between hands. After the ceremony ends, the client returns to the normal idle table video.

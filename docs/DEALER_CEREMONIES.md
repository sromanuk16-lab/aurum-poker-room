# Dealer Ceremonies

Dealer Ceremonies are premium paid social events.

They run only after a poker hand is finished. They never interrupt betting and never affect cards, odds, pot, rewards, or game logic.

A player can buy one ceremony and address it to one player at the table. The server queues the event and all clients play the same short video after the hand.

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

The video must not include player names. Player names are rendered by HTML overlay.

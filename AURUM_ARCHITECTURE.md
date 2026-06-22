# AURUM Architecture

## Layers

```text
Video/Image Room Background
        ↓
Cinematic State Controller
        ↓
UI Overlay
        ↓
Client Game State
        ↓
Server Poker Engine
        ↓
Rooms / WebSocket / Persistence
```

## Main rule

The game controls the video. The video does not control the game.

Video is atmosphere. Code controls cards, bets, pot, turns, winners, and anti-cheat.

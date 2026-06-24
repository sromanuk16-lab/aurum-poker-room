# AURUM App Shell

The mobile app shell starts from:

```text
app.html
```

It contains five main tabs:

```text
Главная | Играть | Магазин | Инвентарь | Профиль
```

## Background media

Background media is configured in:

```text
src/appShell/appShell.js
```

Current config:

```js
const AURUM_MEDIA = {
  mode: 'auto',
  imageUrl: 'assets/app/backgrounds/home-bg.jpg',
  videoUrl: 'assets/app/videos/home-idle.mp4',
  posterUrl: 'assets/app/backgrounds/home-bg.jpg'
};
```

Modes:

```text
auto  - try video, fallback to image/CSS
video - use video background
image - use static image/CSS fallback
```

The UI must work even if the image or video is missing.

## Asset paths

Static image:

```text
assets/app/backgrounds/home-bg.jpg
```

Video:

```text
assets/app/videos/home-idle.mp4
```

The visual background must not contain baked buttons, balance, shop text or player names. All app UI is HTML/CSS above the media layer.

const CACHE_NAME = 'aurum-pwa-20260625-claude-1';

const APP_SHELL = [
  './',
  './app.html',
  './manifest.webmanifest',
  './styles/aurum-claude-shell.css',
  './src/appShell/appShell.js',
  './assets/app/backgrounds/home-bg-premium-mobile.webp',
  './assets/app/icons/aurum-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => null)
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => (key === CACHE_NAME ? null : caches.delete(key)))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./app.html', copy));
          return response;
        })
        .catch(() => caches.match('./app.html'))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.status === 200 && new URL(request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

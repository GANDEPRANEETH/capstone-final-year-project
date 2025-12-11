
const CACHE_NAME = 'gamified-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/static/js/bundle.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);

    if (url.pathname.startsWith('/api/')) {
        e.respondWith(
            fetch(e.request).catch(() => caches.match(e.request))
        );
        return;
    }

    // for other requests, serve cache first
    e.respondWith(
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});

// ==================== Service Worker Configuration ====================
const CACHE_NAME = 'advanced-calculator-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/service-worker.js'
];

// ==================== Install Event ====================
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.log('Cache installation error:', error);
            })
    );
    self.skipWaiting();
});

// ==================== Activate Event ====================
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// ==================== Fetch Event - Network First Strategy ====================
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests except for API calls
    if (url.origin !== location.origin) {
        // Allow API calls for currency conversion
        if (url.hostname === 'api.exchangerate-api.com') {
            event.respondWith(
                fetch(request)
                    .then(response => {
                        // Cache successful API responses
                        if (response.ok) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return response;
                    })
                    .catch(() => {
                        // Return cached response if offline
                        return caches.match(request);
                    })
            );
        }
        return;
    }

    // Cache first for static assets
    if (request.url.includes('.css') || request.url.includes('.js') || request.url.includes('.html')) {
        event.respondWith(
            caches.match(request)
                .then(response => {
                    return response || fetch(request)
                        .then(response => {
                            if (!response || response.status !== 200 || response.type === 'error') {
                                return response;
                            }
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(request, responseClone);
                            });
                            return response;
                        })
                        .catch(() => {
                            return caches.match(request);
                        });
                })
        );
    } else {
        // Network first for other requests
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    return caches.match(request);
                })
        );
    }
});

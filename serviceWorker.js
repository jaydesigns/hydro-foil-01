// Perform install steps
let CACHE_NAME = 'my-cache';
let urlsToCache = [
    "/",
  "/index.html",
  "/custom.css",
  "/pinegrow.json",
  "/tailwind_theme/tailwind.css",
  "/pgia/lib/pgia.js",
  "/assets/img/fireknife-dancers.jpg",
  "/assets/img/settlement.jpg",
  "/assets/img/home-icon.svg",
  "/assets/img/settings-icon.svg",
  "/assets/img/profile-vector.svg",

    ];

self.addEventListener('install', function(event) {
// Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pigment'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
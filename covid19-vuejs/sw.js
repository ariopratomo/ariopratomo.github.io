var CACHE_NAME = 'covid-19-vue-cache-v1';
var urlsToCache = [
  './offline.html',
  './assets/css/offline.css',
  './index.html'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Finally active. Ready to start serving content!');
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    }).catch(function () {
      // If both fail, show a generic fallback:
      return caches.match('offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});
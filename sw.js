// Service Worker for 1StopFirm website
const CACHE_NAME = '1stopfirm-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/website-development.html',
  '/brand-development.html',
  '/digital-marketing-service.html',
  '/services.html',
  '/styles/layout.css',
  '/styles/components.css',
  '/styles/animations.css',
  '/styles/website-development.css',
  '/styles/brand-development.css',
  '/styles/digital-marketing.css',
  '/scripts/main.js',
  '/scripts/website-development.js',
  '/scripts/brand-development.js',
  '/scripts/digital-marketing.js',
  '/1StopFirm-Logo.png',
  '/mcdonalds.png',
  '/huawei.png',
  '/firefox.png',
  '/oracle.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve resources from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response because it's a one-time use stream
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                // Don't cache API requests or external resources
                if (event.request.url.indexOf('http') === 0) {
                  cache.put(event.request, responseToCache);
                }
              });
              
            return response;
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 
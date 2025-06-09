// public/service-worker.js
self.addEventListener('install', event => {
  console.log('[SW] Installed');
});

self.addEventListener('fetch', event => {
  // Można dodać cache lub custom response
});

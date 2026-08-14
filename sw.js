// Service Worker — çevrimdışı (offline) kullanım için basit önbellek (cache).
const CACHE = "portfoy-takip-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Kur API'sini önbelleğe alma — her zaman ağdan iste.
  if (url.hostname.includes("er-api.com") || url.hostname.includes("frankfurter")) {
    return; // tarayıcı normal şekilde ağdan çeker
  }
  // Uygulama dosyaları: önce önbellek, yoksa ağ (cache-first).
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});

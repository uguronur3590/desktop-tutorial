// Service Worker — güncel içeriği ÖNCE ağdan alır (network-first), çevrimdışıysa önbellekten.
const CACHE = "portfoy-takip-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(()=> self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // Dış API'lere dokunma (kur + canlı fiyat)
  if (url.hostname.includes("er-api.com") || url.hostname.includes("frankfurter") || url.hostname.includes("binance.")) return;

  const isHTML = req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html") ||
    url.pathname.endsWith("/") || url.pathname.endsWith(".html");

  if (isHTML) {
    // network-first: her zaman en güncel uygulamayı getir, çevrimdışıysa önbellek
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
  } else {
    // diğer varlıklar: cache-first
    e.respondWith(caches.match(req).then((r) => r || fetch(req)));
  }
});

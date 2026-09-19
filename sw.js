/* Service Worker – macht die Tafel offline-fähig (App-Shell + Bibliotheken cachen). */
const CACHE = 'tafel-v207';
const ASSETS = [
  './',
  'index.html',
  'sheet.html',
  'plotter.html',
  'vierfelder.html',
  'baum.html',
  'wahrscheinlichkeit.html',
  'messwert.html',
  'gleichung.html',
  'tabelle.html',
  'geogebra.html',
  'wuerfel.html',
  'gluecksrad.html',
  'bruch.html',
  'stellenwerttafel.html',
  'umrechner.html',
  'einheitskreis.html',
  'raum.html',
  'ableitungen.html',
  'stromkreis.html',
  'pptx.js',
  'shot.js',
  'speech.js',
  'venn.js',
  'mindmap.html',
  'pinnwand.html',
  'manifest.webmanifest',
  'icon.svg',
  'icon-maskable.svg',
  'vendor/pdf.min.js',
  'vendor/pdf.worker.min.js',
  'vendor/jspdf.umd.min.js',
  'vendor/qrcode.min.js'
];

self.addEventListener('install', e => {
  // mit cache:'reload' laden, damit nie eine alte Kopie aus dem Browser-Cache in den neuen Cache wandert
  e.waitUntil(caches.open(CACHE).then(async c => {
    await Promise.all(ASSETS.map(async u => {
      try { const res = await fetch(u, {cache: 'reload'}); if (res.ok) await c.put(u, res); } catch (err) {}
    }));
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Nur eigene Dateien aus dem Cache bedienen; Einbettungen (YouTube/GeoGebra) immer aus dem Netz.
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || caches.match(e.request, {ignoreSearch: true})).then(hit => hit || fetch(e.request).then(res => {
      if (e.request.method === 'GET' && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }))
  );
});

/* Service Worker – macht die Tafel offline-fähig (App-Shell + Bibliotheken cachen). */
const CACHE = 'tafel-v295';
const H5P_CACHE = 'tafel-h5p';   // entpackte .h5p-Inhalte (bleiben über App-Updates hinweg erhalten)
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
  'modus.js',
  'speech.js',
  'venn.js',
  'mindmap.html',
  'pinnwand.html',
  'kreuzwort.html',
  'wortgitter.html',
  'wortwolke.html',
  'zeitleiste.html',
  'pse.html',
  'pse-data.js',
  'optik.html',
  'nuklid.html',
  'nuklid-data.js',
  'wellen.html',
  'glossar.html',
  'zuordnen.html',
  'luecken.html',
  'lernkarte.html',
  'manifest.webmanifest',
  'icon.svg',
  'icon-maskable.svg',
  'vendor/pdf.min.js',
  'vendor/pdf.worker.min.js',
  'vendor/jspdf.umd.min.js',
  'vendor/qrcode.min.js',
  'h5p.js',
  'h5pview.html',
  'h5p/main.bundle.js',
  'h5p/frame.bundle.js',
  'h5p/styles/h5p.css',
  'h5p/styles/font-open-sans.css',
  'h5p/images/h5p.svg',
  'h5p/images/throbber.gif',
  'h5p/fonts/h5p-core-30.woff2',
  'h5p/fonts/h5p-core-29.woff2',
  'h5p/fonts/h5p-hub-publish.woff2',
  'h5p/fonts/open-sans/opensans-400-600-700-v28-latin.woff2',
  'h5p/fonts/open-sans/opensans-400-600-700-v28-latin-ext.woff2',
  'h5p/fonts/open-sans/opensans-italic-400-600-700-v28-latin.woff2'
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
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== H5P_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Nur eigene Dateien aus dem Cache bedienen; Einbettungen (YouTube/GeoGebra) immer aus dem Netz.
  if (url.origin !== location.origin) return;
  if (url.pathname.includes('/h5pfiles/')) {          // entpackte H5P-Inhalte aus ihrem eigenen Cache
    // über die reine URL suchen: Skript-/Stil-Anfragen aus dem Player tragen andere Request-Eigenschaften
    e.respondWith(caches.open(H5P_CACHE)
      .then(c => c.match(url.origin + url.pathname, {ignoreSearch: true, ignoreVary: true}))
      .then(hit => hit || new Response('', {status: 404})));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || caches.match(e.request, {ignoreSearch: true})).then(hit => hit || fetch(e.request).then(res => {
      if (e.request.method === 'GET' && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }))
  );
});

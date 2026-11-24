/* Service Worker – macht die Tafel offline-fähig (App-Shell + Bibliotheken cachen). */
const CACHE = 'tafel-v827';
const H5P_CACHE = 'tafel-h5p';   // entpackte .h5p-Inhalte (bleiben über App-Updates hinweg erhalten)
/* Die Spiele-Suite ist gross (rund 4 MB) und aendert sich selten: sie bekommt einen eigenen
   Vorrat, der ein Tafel-Update ueberlebt. Erst wenn SPIELE_V hochgezaehlt wird (also wenn neue
   Spielstaende hereinkopiert wurden), wird er geleert und neu gefuellt. */
const SPIELE_CACHE = 'tafel-spiele';
const SPIELE_V = 's1';
const SPIELE = [
  'spiele/Breakout_Radioaktivitaet.html',
  'spiele/Bruno.html',
  'spiele/D-Uno.html',
  'spiele/Fumino.html',
  'spiele/Koordinaten-Schatzsuche.html',
  'spiele/Kopfrechen-Duell.html',
  'spiele/Mattle.html',
  'spiele/Schatzsuche.html',
  'spiele/Termino.html',
  'spiele/bewegungsdiagramme.html',
  'spiele/galgenmaennchen.html',
  'spiele/index.html',
  'spiele/luegen-labor.html',
  'spiele/luegen-werkstatt.html',
  'spiele/mathe-tabu.html',
  'spiele/memory.html',
  'spiele/motiontrace.html',
  'spiele/operation-datatruth.html',
  'spiele/physik-tabu.html',
  'spiele/raumschiffe-versenken.html',
  'spiele/schiffe-versenken-koordinaten.html',
  'spiele/superhirn.html',
  'spiele/vogt-vermaechtnis.html'
];
const ASSETS = [
  './',
  'index.html',
  'sheet.html',
  'plotter.html',
  'vierfelder.html',
  'baum.html',
  'wahrscheinlichkeit.html',
  'messwert.html',
  'motiontracker.html',
  'videophysik.html',
  'singmyfunction.html',
  'versuchsprotokoll.html',
  'geschichte.html',
  'beschriften.html',
  'beschriften-vorlagen.js',
  'video-interaktiv.html',
  'gleichung.html',
  'tabelle.html',
  'geogebra.html',
  'codap.html',
  'zufall.html',
  'strahlensatz.html',
  'wuerfel.html',
  'gluecksrad.html',
  'bruch.html',
  'stellenwerttafel.html',
  'umrechner.html',
  'einheitskreis.html',
  'raum.html',
  'ableitungen.html',
  'terme-rechner.html',
  'figuren-koerper.html',
  'diagramm.html',
  'formel.html',
  'stromkreis.html',
  'pptx.js',
  'shot.js',
  'druck.js',
  'modus.js',
  'speech.js',
  'venn.js',
  'mindmap.html','begriffsnetz.html','galgen.html','lehrerplan.html','lehrplan-glossar.js','lehrplan-texte.js','funktionen-bibliothek.js','zuordnen-bibliothek.js','diagramme-bibliothek.js','brueche-bibliothek.js','memory-bibliothek.js','reihenfolge.html','reihenfolge-bibliothek.js','lehrplan.js','teilen.js',
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
  'teilchen-data.js',
  'spektrum-data.js',
  'atomphysik.html',
  'induktion.html','energie.html','waerme.html','stoss.html',
  'wellen.html','doppelspalt.html','silentzoo.html',
  'astronomie.html',
  'bewegung.html',
  'glossar.html',
  'zuordnen.html',
  'luecken.html',
  'lernkarte.html',
  'manifest.webmanifest',
  'icon.svg',
  'icon-maskable.svg',
  'icon-apple.svg',
  'icon-180.png',
  'icon-192.png',
  'icon-512.png',
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
  }).then(spieleVorrat).then(() => self.skipWaiting()));
});
/* Spiele nachladen, aber nur was fehlt – ein Tafel-Update soll die 4 MB nicht jedes Mal holen */
async function spieleVorrat(){
  try{
    const c = await caches.open(SPIELE_CACHE);
    const marke = await c.match('spiele-version');
    if (!marke || (await marke.text()) !== SPIELE_V) {
      await caches.delete(SPIELE_CACHE);
      return spieleNeu();
    }
    await Promise.all(SPIELE.map(async u => {
      if (await c.match(u)) return;
      try { const r = await fetch(u, {cache: 'reload'}); if (r.ok) await c.put(u, r); } catch (err) {}
    }));
  }catch(err){}
}
async function spieleNeu(){
  const c = await caches.open(SPIELE_CACHE);
  await Promise.all(SPIELE.map(async u => {
    try { const r = await fetch(u, {cache: 'reload'}); if (r.ok) await c.put(u, r); } catch (err) {}
  }));
  await c.put('spiele-version', new Response(SPIELE_V));
}
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== H5P_CACHE && k !== SPIELE_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
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
  if (url.pathname.includes('/spiele/')) {            // Spiele-Suite aus ihrem eigenen Vorrat
    e.respondWith(caches.open(SPIELE_CACHE).then(c =>
      c.match(url.origin + url.pathname, {ignoreSearch: true}).then(hit => hit ||
        fetch(e.request).then(res => {
          if (e.request.method === 'GET' && res.ok) c.put(url.origin + url.pathname, res.clone());
          return res;
        }).catch(() => caches.match(e.request, {ignoreSearch: true})))));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(hit => hit || caches.match(e.request, {ignoreSearch: true})).then(hit => hit || fetch(e.request).then(res => {
      if (e.request.method === 'GET' && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }))
  );
});

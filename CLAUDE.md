# Digitale Tafel – Hinweise für Claude

Allgemeine Regeln für alle Projekte stehen in `~/git/CLAUDE.md`.

## 1. Worum es geht
- Digitale Tafel (Whiteboard) für den Unterricht eines Mathe-/Physiklehrers in Bayern (Gymnasium, LehrplanPLUS G9).
  Reine Web-App ohne Server, offline-fähig (PWA), gehostet auf GitHub Pages: https://mauthier-bit.github.io/Tafel/
  (Repo `mauthier-bit/Tafel`, Branch `main`).
- Zielgerät: **iPad mit Apple Pencil, Safari bzw. als Homebildschirm-App**, meist per Beamer an die Wand.
  Windows/Edge/Chrome sollen mitlaufen (Maus, Rechtsklick ignorieren), sind aber zweitrangig.
- Alles ist deutsch: Oberfläche, Kommentare, Bezeichner, Commit-Nachrichten. Der Nutzer ist Lehrer, kein Entwickler –
  Rückmeldungen an ihn in verständlichem Deutsch ohne Fachjargon.

## 2. Aufbau
- `index.html` = die Tafel selbst (eine große Datei, Code in einer IIFE). Ebenen: `#bgLayer` (fixiert, Hintergrundfarbe)
  → `#embedLayer` (iframes der Werkzeuge) → Canvas `#board` (transparent) → Knopf-/Leistenebenen darüber.
- Jedes Werkzeug ist eine **eigene HTML-Seite** (`plotter.html`, `stromkreis.html`, …), die die Tafel als bewegliches
  Objekt `type:'embed'` mit `{etype, src, label, x, y, w, h, rot, data}` in einem iframe zeigt (`syncEmbeds()`,
  Map `embedEls`). Jede Werkzeugseite läuft auch allein im Browser.
- Gemeinsame Bausteine (per `<script src>` im Werkzeug einbinden):
  - `shot.js` → `TafelShot`: `rasterize(el,{exclude,…})` (liefert `{canvas,w,h}`; zeichnet DOM und CANVAS, **kein SVG**),
    `buttons(host, make, cls, style)` für „Bild → Tafel“/„Kopieren“, `toast`.
  - `modus.js` → `TafelModus` (Benutzen/Bearbeiten): `init({get,set,after})` bzw. `anTafel(opt)`, `refresh()`.
    Klasse `tafelEdit` = im Benutzen-Modus ausblenden; `body.nurBenutzen`.
  - `teilen.js` → `TafelTeilen` (Zustand als Link/QR, `#t=…` deflate+base64url). Braucht **immer** zusätzlich
    `vendor/qrcode.min.js`. Link zeigt fest auf `https://mauthier-bit.github.io/Tafel/<datei>` (Groß-/Kleinschreibung zählt).
  - `lehrplan.js` → `TafelLehrplan.oeffnen(…)` (gemeinsames Auswahlfenster für Bibliotheksaufgaben, sortiert nach Titel).
  - `speech.js` → `TafelSpeech` (webkitSpeechRecognition de-DE), `venn.js`, `h5p.js`, `pptx.js`.
  - Datenbibliotheken: `lehrplan-glossar.js`, `lehrplan-texte.js`, `zuordnen-bibliothek.js`, `reihenfolge-bibliothek.js`,
    `memory-bibliothek.js` (Kopie aus der Spiele-Suite – bei Änderungen dort neu übernehmen), `brueche-bibliothek.js`,
    `funktionen-bibliothek.js`, `diagramme-bibliothek.js`, `pse-data.js`, `nuklid-data.js`, `beschriften-vorlagen.js`.
  - `vendor/` = lokale Fremdbibliotheken (pdf.js, jspdf, qrcode …) – nichts vom CDN laden, sonst nicht offline.
- Fremde Werkzeuge des Nutzers (motiontracker, videophysik, singmyfunction, versuchsprotokoll, geschichte) liegen
  **unverändert** im Repo, damit eine neue Fassung einfach drüberkopiert werden kann. Werkzeuge, die aus anderen
  Projekten in `/git/` stammen und für die Tafel angepasst wurden (terme-rechner, figuren-koerper), **nicht** blind
  überschreiben – Anpassungen nachziehen.

### Neues Werkzeug verdrahten (Stellen in index.html und sw.js)
- Knopf `w-<name>` mit SVG-Icon in die passende Gruppe/Popover (z. B. `#mathpop`, `#divpop`; Raster, Reihenfolge im
  Markup = Reihenfolge der Zeilen); Tooltip des Gruppenknopfs mitpflegen. Handler binden per id.
- Handler: `$('w-…').onclick=()=>askInsert(etype,'datei.html',label)` (fragt „eigene Seite oder Objekt?“) oder direkt
  `addEmbedObject(etype, src, label, data, asPage)`. „Eigene Seite“ nur anbieten, wenn der Zustand im Projekt gespeichert wird.
- Seitenverhältnis in der `ratio`-Map in `addEmbedObject` (Höhe/Breite, z. B. `plotter:0.95`).
- `WICON` (etype → Knopf-id; das Knopf-SVG wird für Minimier-Pillen geklont).
- `FONT_DEF[etype]` = Standardschriftgröße, damit die Schriftzeile im Kontextmenü greift (falls das Werkzeug `fontSize` kennt).
- `MODE_EMBED`, falls das Werkzeug Benutzen/Bearbeiten hat – sonst fehlt der Umschalter in der Kopfleiste.
- `OPEN_TOOLS` (Whitelist für `embed-open` aus anderen Werkzeugen heraus).
- iframe-`allow`: Standard ist `autoplay; fullscreen; clipboard-write; microphone`; **`camera`** nur für die etypes in der
  Liste neben `fr.setAttribute('allow',…)` (derzeit motion, vphysik, aphysik, protokoll) – bei Kamerabedarf dort ergänzen.
- `sw.js`: Datei (und jede neue gemeinsame `.js`) in `ASSETS` eintragen.
- README.md: Funktionsliste ergänzen.
- Ausgemusterte Werkzeuge/etypes bleiben als Datei und etype erhalten, damit alte Projekte weiter laden
  (Migration in `deserialize()`).

### Protokoll Tafel ↔ Werkzeug (postMessage)
- Werkzeug → Tafel: `embed-ready` (dann schickt die Tafel `data`), `embed-data` (Zustand, entprellt ~250 ms),
  `embed-image {url,w,h}` (Bild auf die Tafel), `embed-open {etype,src,label}`, `open-url`, `picker-space {on}`.
- Tafel → Werkzeug: `embed-data` mit Zustand, `fontSize/fontBold/fontItalic`, `edit` (Modus); über `postToEmbed(obj,data)`.
- Pflicht im Werkzeug:
  - Allein geöffnet (`window.parent===window`) nichts an sich selbst posten → sonst Echo/Endlosschleife.
  - Message-Handler: nur `e.source===window.parent` oder `e.source===window` annehmen (`TafelTeilen.einspielen`
    schickt den Zustand als MessageEvent ans eigene Fenster).
  - Erst senden, wenn die Tafel Daten geliefert hat (ready-Flag); Standardinhalt erst nach ~700 ms ohne Antwort laden,
    sonst wird die gespeicherte Szene überschrieben. „Letzter Stand“-Vergleich gegen Echo-Schleifen.
  - Modus lesen als `d.edit !== false` (neue Objekte haben kein `edit`), beim Empfang `TafelModus.refresh()` aufrufen.
  - Muster: `zustand()` und `uebernimm(d)` (bzw. `uebernehmen`) einmal schreiben und von Tafel-Sync und Teilen gemeinsam nutzen.
  - Liegt der Werkzeugcode in einer IIFE, gehört die Tafel-Anbindung hinein. `anTafel`-Aufrufe mit `typeof …==='function'`
    absichern (alte modus.js aus dem Cache).
- Iframe-Fenster ohne Tafelobjekt (z. B. `#win-lehrerplan`) brauchen einen eigenen Zweig vorn im message-Handler von index.html.
- Verschachtelte iframes: nach `e.source` trennen, `embed-image`/`open-url` nach oben weiterreichen.
- Iframes nie im DOM umhängen (WebKit lädt sie neu) – Geometrie in `syncEmbeds()` ändern.

## 3. Service Worker und Versionsnummer
- Version steht **nur** in `sw.js`: `const CACHE = 'tafel-vNNN';`. Bei **jeder** Änderung um 1 hochzählen; die Nummer
  ist zugleich die Versionsnummer im Notizprotokoll. `sync-tafel.sh` liest den Stand aus genau dieser Zeile.
- `ASSETS` = alle Dateien, die beim Install mit `fetch(u,{cache:'reload'})` vorgeladen werden. Neue Dateien eintragen.
  Testseiten (z. B. `pentest.html`) gehören nicht hinein.
- Fetch: cache-first, Rückfall `caches.match(req,{ignoreSearch:true})` – Query-Parameter umgehen den SW also **nicht**.
- `tafel-h5p` ist ein eigener Cache, der beim Update erhalten bleibt.
- Skripte mit Query in index.html (`pptx.js?v=…`, `speech.js?v=…`, `h5p.js?v=…`): bei Änderung an der Datei den Wert mitziehen.
- Nutzer sieht Änderungen erst nach Deploy und SW-Update; „geht immer noch nicht“ heißt oft: alte Version läuft noch
  (Home-App ganz schließen).

## 4. Speicherung und Code-Konventionen
### Speicher
- Projekte (= Klassen) in **IndexedDB** (`tafel`/`projects`), Index in `tafel_index`. localStorage hat ~5 MB und
  `setItem` scheitert still – große Daten nie dorthin.
- `tafel_ui` = geräteweite UI-Einstellungen mit Kurzschlüsseln (Min-Zustände, Leistenseite, Palette `pal`, Favoriten
  `favs`, `pxcm` …). Weitere: `tafel_events`, `tafel_ferien`, `tafel_abos`, `tafel_kalaus`, `tafel_lehrplan`,
  `tafel_calcExact`, `tafel_pinclock`, `tafel_fsbtn`, `tafel_greenscreen`, `tafel_camlook`, `tafelTimer…`/`tafelStop…`.
- Werkzeugzustand gehört ins Tafelobjekt (`o.data`, über `embed-data`) – **nicht** in den localStorage des Werkzeugs.
  Ausnahmen: geräte-/personenbezogene Einstellungen; dann Präfix je Werkzeug (z. B. `swt-…`, `bwd-…`).
  Einstellungen, die auch Schüler sehen sollen, zusätzlich in `zustand()` (Teilen).
- Ändert sich Bedeutung oder Standard eines gespeicherten Werts: Schlüssel umbenennen (`…2`) oder Migrationsfeld (`v:2`).
- Neue `doc`-Felder in `serialize`, `deserialize` und `blankDoc` eintragen; alte Formate weiter lesen.
  Datenmodelle mit Versionsfeld (`D.v`) und Migration; Standardwerte so, dass alte Objekte unverändert aussehen.
- Interne Kennungen (Formen-IDs, etypes, Knopf-ids) nie umbenennen, nur Anzeigenamen. Zuordnungen an stabile IDs hängen.
- `stripObj()` entfernt `_`-Übergangsfelder vor dem Speichern; abgeleitete Daten in eine WeakMap statt ans Objekt.
- Bilder verkleinern (`shrinkImage`), Fotos im Werkzeug ca. 1400 px/JPEG 0,82; geteilten Zustand klein halten (QR).
- Autosave nie während eines Strichs (wartet auf Stiftruhe).

### Code-Stil
- Deutsche Bezeichner (`zustand`, `uebernimm`, `setzeTyp`, `istGeteilt`), eindeutig genug gegen Namenskollisionen.
- Werkzeuge: Zustand in `D`, Helfer `$()`, Leisten `#bar`/`#bar2`, Knöpfe `.btn`, `.btn pri`, `.btn ghost`, Icon-Knöpfe `.ic`
  (nur Zeichen, Text in `title`/`aria-label`). Jedes Werkzeug hat `[hidden]{display:none!important}`.
- Werkzeug-Kopf: `<html lang="de" data-theme="light">`, Metas `apple-mobile-web-app-capable=yes`,
  `…-status-bar-style=black`, Viewport **ohne** `viewport-fit=cover`, Kanten-Skript (Statusleisten-Streifen), Systemschriften
  (keine Google Fonts), kein Dunkelmodus.
- Einstellungen hinter ein ⚙ neben „?“ (Muster wie in `bewegung.html`: `<details>`, Panel `position:fixed`, ins Fenster
  geklemmt, Kopfleiste mit Kreuz, scrollender Körper, „Standard wiederherstellen“).
- Rückgängig/Wiederholen/Laden immer mit den Tafel-SVGs (`.uico`, `.ldIcon`), nicht mit ↶ ↷ 📂.
- Tafel: Modus über `.mbody.on` (nie inline `display`); Popover `togglePop`/`closeAllPops`/`place`; Kontextmenü `#props`
  mit `#…Row`, gefüllt in `refreshProps`, Plus/Minus-Stepper statt Zahlenfelder; Fenster `.win` mit fester Breite.
- Objekte einfügen: `setMode('select')`; Undo-Schnappschuss (`pushUndo`) erst beim Übernehmen.
- Eine Quelle der Wahrheit für Eigenschaftslisten (z. B. `FUELLBAR`), die Zeichencode und Kontextmenü teilen.
- Alles, was ins Bild (TafelShot/Export) soll, aufs Canvas zeichnen oder als DOM – nicht als SVG. Hochzahlen dort als
  Unicode-Hochziffern statt `<sup>`.
- Pro Objekt den Canvas-Zustand zurücksetzen (font, textAlign, lineDash, globalAlpha, filter). Animationen mit `dt`
  (120-Hz-iPads). Zufall mit festem Startwert (`festerZufall()`), damit nichts flimmert und geteilte Aufgaben gleich bleiben.
- Eingabefelder nur neu setzen, wenn sich der Wert ändert und das Feld keinen Fokus hat; DOM wiederverwenden.

## 5. Fallstricke
### Bearbeiten
- Skripte/Metas vor dem **ersten** `</head>` einsetzen und prüfen, dass die Stelle nicht in `<script>`/`<style>` liegt
  (manche Werkzeuge bauen HTML in JS-Strings). Einige Dateien haben gar kein `<head>`.
- Beim Inlinen in eine Einzeldatei `</script` → `<\/script` (Kopfkommentare enthalten Beispiel-Einbindungen).
- index.html: doppelte `let`-Namen = SyntaxError, die ganze App lädt nicht. Keine Funktion beim Laden aufrufen, die
  spätere `let`/`const` berührt (TDZ). `doc` ist `let`, also kein `window.doc`. Nach jedem Patch Konsole prüfen.
- Keine `//`-Kommentare in einzeilige Anweisungen; `classList.add('')` wirft; `onclick=fn` bekommt das Event → `()=>fn()`.
- Datenlisten: fehlendes Komma `[…] […]` ist ein Indexzugriff, kein Syntaxfehler – Anzahl prüfen.
- Nach Massen-Edits jede Datei auf Syntax prüfen (z. B. `new Function(inlineSkript)` im Browser).
  `perl -pi` interpoliert `$(` → für solche Ersetzungen Python nehmen. Regex-Ersetzung kann die Definition selbst treffen.
- Kein CSS-Klassenname `pop` in index.html (globales `.pop{display:none}`).

### CSS
- `display:flex`/inline-`display` schlägt das `hidden`-Attribut → `[hidden]{display:none!important}`.
- Spezifische ID-Regeln (`#tabs button`, `table.dt input`) und globale Regeln (`input,select{width:100%}`,
  `canvas{position:absolute}`) mitprüfen. Selects in Zeilen: `width:auto; flex:0 0 auto; max-width`.
- `overflow-x:auto` macht `overflow-y` auch auto. `flex:1 1 0` macht Knöpfe nicht gleich breit. Scrollbarer Inhalt:
  `width:max-content; min-width:100%`.
- Im iframe bezieht sich `vh` auf das iframe, nicht auf den Bildschirm. Höhen sonst über `visualViewport`/`dvh`.

### iPadOS / Safari
- Board-Canvas: kein `setPointerCapture`; Touch-Events `{passive:false}` + `preventDefault` (sonst Doppeltipp-Erkennung).
  Beim Ziehen `pointerdown` am Element + `pointermove/up` auf `window`; `setPointerCapture` höchstens in try/catch.
- `html,body{touch-action:none}` → scrollende Bereiche brauchen `touch-action:pan-y`; ziehbare Elemente `touch-action:none`
  und `user-select:none`. `pointerenter` feuert bei Touch nicht.
- Tastatur erscheint nur bei synchronem `focus()` in der Geste (zur Sicherheit erneut beim `pointerup`); ihr Einblenden
  löst `resize` aus. Eigene Formel-Tastaturen: `inputMode='none'`, Tasten auf `pointerdown`+`preventDefault`.
  iOS nimmt beim Tippen den Fokus weg → eigenen Zustand halten statt `activeElement`/blur.
- `box-shadow` außerhalb der Box hinterlässt Reste → Schein als `::after` (Ruhe-Deckkraft .001) oder im Canvas.
- Senkrechtes `input[type=range]` unzuverlässig; verstecktes `<input type=color>` per `.click()` öffnet nichts.
- `ctx.filter` fehlt in Safari < 17 (still ignoriert) → Feature-Test + Rückfall.
- Ton nur nach Nutzergeste. Spracherkennung läuft nicht in der Homebildschirm-PWA → Rückfall Tastatur.
- Statusleiste: weicher Verlauf oben in Home-Apps; weg nur mit fixiertem, deckendem Element am oberen Rand
  (Tafel: `#bgLayer`; Werkzeuge: Kanten-Skript). Statusleisten-Metas werden nur beim App-Start gelesen.
- Safari-ITP blockiert Cookies in fremden iframes (Login-Seiten wie WebUntis) → „im Browser öffnen“.
  X-Frame-Options/CSP fremder Seiten lässt sich weder umgehen noch erkennen.

### Kamera / Mikrofon / Aufnahme
- Nur über https. Ein zweites `getUserMedia` beendet den ersten Stream → Bild+Ton in einem Aufruf, Mikrofon teilen.
- Kamera abschalten, sobald sie niemand mehr braucht (alle Wege: Schließen, Löschen, Undo, Projektwechsel).
- Werte aus `videoWidth/Height` erst nach `loadedmetadata`. Live-Strom liefert oft nur 1280×720; Fotos in voller
  Auflösung über `<input type=file accept=image/* capture=environment>`.
- CSS-Filter am `<video>` fehlen in Aufnahmen → durch ein Canvas schicken und dessen `captureStream()` aufnehmen.
  Eine per `captureStream` aufgenommene Leinwand bekommt **nur `drawImage`** (kein `putImageData`, keine Komposit-Modi,
  keine Selbstkopie – sonst schwarz in WebKit).
- MediaRecorder: MP4/H.264 vor webm; Audiocodec im mime nur, wenn eine Tonspur da ist. `torch` gibt iPadOS nicht frei.

### Testen im Vorschaufenster
- Server über `~/git/.claude/launch.json`, Eintrag `tafel` (python http.server, Port 8823). Einträge dort nicht löschen.
  `curl` auf localhost geht aus der Sandbox nicht → im Browser per `fetch` prüfen.
- **Zwischenspeicher:** Der SW hängt an der Origin und ignoriert Query-Parameter. Vor jedem Test: alle Registrierungen
  `unregister()` + alle `caches` löschen, dann neu laden – nach jedem Besuch von index.html erneut (registriert sofort neu).
  Dazu kommt der HTTP-Cache: für Unterressourcen `fetch(datei,{cache:'reload'})` bzw. `no-store` + `(0,eval)(text)`.
- `localStorage.clear()` auf der richtigen Origin. Sichtbarkeit über `el.offsetParent!==null` prüfen. `prompt`/`confirm`
  mocken. `let`/`const` hängen nicht an `window` (`contentWindow.D` ist undefined).
- Koordinaten: Screenshot-Pixel ≠ CSS-Pixel – umrechnen mit Screenshot-Breite / `innerWidth`. `left_click_drag` löst
  teils kein `pointermove` aus → eigene `PointerEvent`-Folgen schicken.
- Ist das Vorschaufenster verdeckt: kein bzw. gedrosseltes rAF, gedrosselte Transitions, iframes erst nach dem Rendern da.
  Konsole behält alte Fehler über Navigationen → frischer Tab.
- Kamera/Mikrofon sind im Testbrowser gesperrt → `captureStream` einer gemalten Leinwand als `srcObject` bzw. Mock.
  iPad-Fälle: `resize_window` 1180×820, `--sat` per JS setzen. Echte iPad-Eigenheiten (Statusleiste, Spracherkennung,
  `body position:fixed`) sind nur am iPad prüfbar – dann ehrlich sagen.
- Tests auf dem echten Weg der App nachbilden; Ergebnisse mit Messwerten melden, Nachbarfälle mitprüfen.

## 6. Fachlich-didaktische Vorgaben
- Lehrplan = **LehrplanPLUS Bayern, Gymnasium G9**; Erklärungen selbst formulieren, nicht zitieren.
- **Jahrgangsangabe = früheste Jahrgangsstufe**, in der eine Aufgabe einsetzbar ist – bestimmt vom Inhalt, der im
  Lehrplan am spätesten kommt. Im Zweifel nachfragen statt schätzen.
- Nur Fachbegriffe verwenden, die die Klassenstufe kennt (z. B. „Drehmoment“ kommt in Klasse 10 nicht vor).
  In niedrigen Jahrgängen erklärend formulieren. Fachnotation nach DIN.
- Fachliche Korrektheit vor allem anderen; jede Aufgabe nachrechnen, keine Dubletten in Bibliotheken.
  Rechenketten korrekt (kein „=“ zwischen Ungleichem); exakte Werte bevorzugen (Brüche nicht ausrechnen, π, Wurzeln).
- Deutsche Zahlschreibweise: Dezimalkomma (Ein- und Ausgabe), Trenner `;`, CSV mit `;`, Sortierung `localeCompare('de')`.
- Lösungen nicht vorab verraten (keine ablesbare Skala, Werte erst auf Haken/Knopf); Aufgabenmodus zum Verdecken und
  späteren Aufdecken ist ein wiederkehrender Wunsch. In geteilten Fassungen Lösung/Bearbeiten ausblenden.
- Bibliotheken: gleiche Bereichsnamen über Werkzeuge hinweg, Mathematik vor Physik, Varianten am Titel unterscheidbar.
- Gleiche Rolle = gleiche Farbe; feste Farbfolge je Bedeutung.
- Aus der letzten Reihe lesbar: Ergebnisse groß, Beamer-tauglich, hell als Standard.

## 7. Bedienvorlieben des Nutzers
- Leisten kompakt, möglichst einzeilig, passend aufs iPad; Symbole statt Text (Erklärung im `title`), seltene Optionen ins ⚙.
- Häkchen = „anzeigen“, Knöpfe = „ausführen/vorführen“. Umschalter zeigt den **aktiven** Zustand.
- Vorhandene Bedienung erweitern statt neue Knöpfe daneben; Erprobtes des Nutzers übernehmen statt neu bauen.
- Unnötige Funktionen dürfen weg; „neu anordnen“ heißt nicht löschen.
- Grenzen ehrlich benennen (offline keine Handschrift-/Formelerkennung, kein Rückkanal beim Teilen) – keine Scheinlösungen.
- Bei Mehrdeutigkeit nachfragen; eine bessere, einfachere Lösung als vorgeschlagen ist willkommen, aber begründen.

## 8. Arbeitsablauf
- Nach jeder abgeschlossenen, funktionierenden Änderung: `tafel-vNNN` in `sw.js` hochzählen, README bei Bedarf
  ergänzen, **Commit in diesem Repo** mit verständlicher deutscher Nachricht (Stil: „Stellenwerttafel: …“).
  Das übrige `/git/` ist ein eigenes, privates Sammel-Repo; `tafel/` steht dort in `.gitignore`.
- **Veröffentlichen (`git push`) nur auf Ansage** („veröffentliche die Tafel“). Vorher `git fetch` und ggf. einarbeiten –
  der Nutzer lädt manchmal über die GitHub-Webseite hoch.
- Nach jeder Änderung `~/git/sync-tafel.sh` ausführen: zieht die Tafel-Kopien unter `~/Documents/Schule` nach
  (Dateikopien sofort per Dateiabgleich; Klone per `git pull --ff-only` – die holen erst nach dem Push etwas, also nach dem Veröffentlichen erneut laufen lassen) und ruft am Ende
  `~/git/verteile-bewegung.sh` auf (Bewegungsdiagramme als Einzeldatei zu jedem Motion-Tracker-Ordner). Das läuft
  automatisch mit – nicht nachfragen, nicht vergessen. `--probe` zeigt nur, `--ohne-bewegung` schaltet die Verteilung ab.
- Unter `Documents/Schule` nie nach Dateinamen verteilen (dort liegen fremde Dateien gleichen Namens) – nur über die Skripte.
- Doppelte Dateien zwischen Tafel, Spiele-Suite und `/git/` sind Absicht: nicht zusammenführen.
- Das ausführliche Änderungsprotokoll steht in den Claude-Notizen (`memory/digitale-tafel.md`), nicht in diesem Repo.

# Digitale Tafel

Eine iPad-optimierte digitale Tafel (Whiteboard) als Web-App. Läuft komplett im Browser,
funktioniert nach dem ersten Laden auch **offline** (PWA) und braucht keinen Server.

## Funktionen

- **Schreiben:** Stift (mit Apple-Pencil-Druckstärke), Marker; **eigener Farb-Button**
  (Farbe & Dicke) – der Stift zeichnet in der zuletzt gewählten Farbe (Standard: Schwarz)
- **Formen:** Linie, Rechteck, Ellipse, Pfeil (auch gefüllt)
- **Konstruktionswerkzeuge:** **Kreis** (erster Punkt = Mittelpunkt, aufziehen = Radius, wird
  live angezeigt) und **Gerade** (zwei Punkte antippen/ziehen und am zweiten Punkt **2 Sekunden
  halten** → die Gerade wird durch beide Punkte gezeichnet)
- **Lineal:** über den Lineal-Knopf einblenden – es **bleibt aktiv**, während der Stift zeichnet.
  Lineal mit dem Finger am **unteren** Teil verschieben / am Griff drehen; mit dem Stift **an der
  Kante** eine saubere gerade Linie ziehen.
- **Scheinwerfer:** Größe des Spots mit **zwei Fingern (Aufziehen)** einstellen
- **Endlose Seite:** beliebig nach unten/rechts weiterschreiben – mit dem Finger schieben
  (bzw. Pencil schreibt, Finger schiebt) oder am Desktop mit dem Mausrad/Trackpad scrollen
- **Tabellenkalkulation** einfügen (eigene Seite): Zellbezüge **relativ (A1) und absolut ($A$1)**,
  Grundrechenarten, Potenz `^`, `sqrt`, `sin`, `cos` (Bogenmaß); Kopieren/Einfügen passt
  relative Bezüge an. Die Tabelle wird im Projekt gespeichert.
- **Wissenschaftlicher Taschenrechner** (Werkzeug): + − × ÷, Klammern, `xʸ`, √, sin/cos/tan,
  ln/log, π, e, umschaltbar **DEG/RAD**
- **Aufnahme** (Werkzeug): nimmt die Tafelfläche **mit Ton** auf, direkt abspielbar (echtes
  H.264-**MP4**, sonst WEBM) und speicherbar
- **Projekte / Klassen** (Einstellungen): mehrere Projekte (z. B. „Mathe 6a", „Physik 11c")
  anlegen, **umbenennen**, dazwischen **wechseln** und **schließen**. Jedes Projekt hat eigene
  Seiten **und** eine eigene Klassenliste. Alles wird automatisch im Browser gesichert.
- Tabellen-Funktionen zusätzlich: **SUMME / MITTELWERT** (auch über Bereiche wie `A1:A5`),
  MAX, MIN, ANZAHL, **ZUFALL()**, ZUFALLSBEREICH(a;b)
- **Hintergrundfarben** (Einstellungen): Weiß, **Tafelgrün**, Schwarz, Dunkelgrau, Hellblau –
  getrennt einstellbar vom **Muster** (Kein / Karo / Linien / Punkte). Gitterlinien passen sich
  hell/dunkel an.
- **Text:** Textfelder anlegen; **Doppeltipp** auf einen Text zum Nachbearbeiten
- **Radierer:** radiert Teile von Strichen weg (nicht nur ganze Striche)
- **Lineal:** einblendbar, mit Pencil verschieben/drehen, Striche schnappen an die Kante
- **Auswählen, Verschieben, Skalieren, Drehen:** Objekt antippen → Rahmen mit Griffen
  (Eckgriffe = Größe, Kreis oben = drehen); ein **Kontext-Panel** erscheint zum
  nachträglichen Ändern von Farbe, Dicke/Größe und Füllung
- **Gruppieren / Duplizieren / Löschen** im Kontext-Panel
- **Laserpointer** und **Scheinwerferspot**
- **Zoom/Verschieben:** zwei Finger zoomen, ein Finger schiebt (Pencil schreibt weiter)
- **Seiten:** hinzufügen, löschen, blättern
- **Einbetten:** PDF (offline), Bilder, **YouTube/Video**, **Webseiten/HTML**, **GeoGebra**
- **QR-Code-Generator**
- **Klassenlisten:** CSV importieren (Name in der 1. Spalte), pro Projekt gespeichert;
  Button „Zufälliger Name" zieht per Zufall eine Person (ohne Wiederholung)
- **PDF-Export** der ganzen Tafel
- **Vollbild-Button** (oben rechts)
- **Speichern/Laden** als `.tafel`-Datei + automatische Sicherung im Browser
- **Widgets:** Lärmampel (Mikrofon), Stoppuhr, Timer, Sozialform (Still-/Partner-/Gruppenarbeit), Umfrage
- **Hintergrund:** Weiß / Karo / Linien / Punkte (Einstellungen)

## Leisten (Bedienung)

Es gibt drei feste Leisten, jede lässt sich über ihren **Pfeil-Knopf minimieren**:

1. **Hauptleiste (unten, mittig):** links **nebeneinander** drei immer sichtbare Buttons –
   die **Schwunglinie** = Schreiben (Stiftwerkzeuge), der **Auswahl-Cursor** = Auswählen &
   Werkzeuge (Objekte auswählen/verschieben + Timer, Stoppuhr, Lärmampel, Umfrage, QR,
   Namensziehung, **Taschenrechner**, Einfügen, PDF-Export) und der **Laserpointer**.
   Ein **Trennstrich** trennt diese drei Buttons vom jeweiligen Werkzeugmenü. Ganz rechts der
   Minimieren-Knopf – minimiert sieht man nur die drei Buttons und den Aufklapp-Knopf.
2. **Seiten-Leiste (unten rechts, senkrecht):** blättern (‹ ›), Seite hinzufügen/löschen, Zoom
   zurücksetzen. Der **Minimier-Pfeil zeigt nach unten** (⌄) – klar unterscheidbar von den
   Blätter-Pfeilen. Minimiert bleiben Minimier-Pfeil und **+** (neue Seite) sichtbar.
3. **Einstellungs-Leiste (oben links):** Einstellungen (Hintergrund, Klassenlisten), Speichern, Laden.

Oben rechts liegt der **Vollbild-Knopf**.

> Hinweis Vollbild: Auf dem iPad ist die Fullscreen-API in Safari eingeschränkt – am
> zuverlässigsten wird es über **Teilen → Zum Home-Bildschirm** (läuft dann randlos).

## Auf dem iPad nutzen

Nach dem Hosting (siehe unten) die Seite in **Safari** öffnen, dann
**Teilen → Zum Home-Bildschirm**. Die Tafel läuft dann als Vollbild-App und offline.

## Auf GitHub Pages hosten

1. Diesen Ordner (`tafel/`) in ein GitHub-Repository legen — am einfachsten den **Inhalt**
   des Ordners direkt ins Repo-Root.
2. Im Repo: **Settings → Pages → Build and deployment → Source: „Deploy from a branch"**,
   Branch `main`, Ordner `/ (root)`, speichern.
3. Nach ein paar Minuten ist die Tafel unter
   `https://DEIN-NAME.github.io/DEIN-REPO/` erreichbar.
4. Über diese **https**-Adresse funktioniert auch die **Lärmampel** (Mikrofon-Zugriff erlauben).

### Ordnerstruktur

```
index.html            ← die App
manifest.webmanifest  ← PWA-Manifest
sw.js                 ← Service Worker (Offline-Cache)
icon.svg, icon-maskable.svg
vendor/
  pdf.min.js, pdf.worker.min.js   ← PDF-Import (offline)
  jspdf.umd.min.js                ← PDF-Export
  qrcode.min.js                   ← QR-Codes
```

## Offline

Alle eigenen Dateien (inkl. PDF-Import und -Export, QR) werden vom Service Worker
gecacht und laufen offline. **Eingebettete** YouTube-/Web-/GeoGebra-Seiten brauchen
naturgemäß Internet.

> Nach Änderungen an den Dateien in `sw.js` die Zeile `const CACHE = 'tafel-v1'`
> hochzählen (`tafel-v2`, …), damit Geräte die neue Version laden.

## Grenzen

- Mikrofon (Lärmampel) nur über https, nicht beim direkten Öffnen der Datei (`file://`).
- Eingebettete Seiten lassen sich nicht ins PDF exportieren (nur Annotationen darauf).

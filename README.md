# Digitale Tafel

Eine iPad-optimierte digitale Tafel (Whiteboard) als Web-App. Läuft komplett im Browser,
funktioniert nach dem ersten Laden auch **offline** (PWA) und braucht keinen Server.

## Funktionen

- **Schreiben:** Stift (mit Apple-Pencil-Druckstärke), Marker; **eigener Farb-Button**
  (Farbe & Dicke) – der Stift zeichnet in der zuletzt gewählten Farbe (Standard: Schwarz)
- **Formen:** Linie, Rechteck, Ellipse, Pfeil (auch gefüllt)
- **Freihand → gerade Strecke:** Beim normalen Schreiben am Ende einer Linie **2 Sekunden
  ruhig halten** → aus der Linie wird eine gerade Strecke (Anfang → gehaltener Punkt).
  Sonst bleibt es die Freihandlinie.
- **Konstruktionswerkzeuge:** **Kreis** (erster Punkt = Mittelpunkt – bleibt als Punkt sichtbar –,
  aufziehen = Radius, live angezeigt) und **Gerade** (zwei Punkte ziehen, loslassen → Gerade
  durch beide Punkte)
- **Pfeil** (Werkzeug): Pfeile ziehen.
- **Koordinatensystem** (Werkzeug): fügt ein **transparentes** Achsenkreuz mit Gitter, x/y-Achsen-
  beschriftung und Zahlenskala als bewegliches Objekt ein – man kann direkt darauf zeichnen. Im
  Kontextmenü lässt sich der **x- und y-Bereich** (Ausschnitt) einstellen.
- **Formen** enthalten jetzt auch ein **Dreieck** (neben Linie/Rechteck/Ellipse/Pfeil).
- **Lineal** und **Geodreieck:** über ihren Knopf einblenden – sie **bleiben aktiv**, während der
  Stift zeichnet. Mit dem Finger am **unteren** Teil verschieben / am Griff (Ecke bzw. Spitze)
  drehen; mit dem Stift **an der Kante** eine saubere gerade Linie ziehen. Das Geodreieck hat
  eine **Winkelskala (0–180°)**, eine Lot-Linie, eine **innenliegende cm-Skala** und
  **Parallelen zur längsten Seite** (zum Zeichnen von Parallelen).
- **Zirkel** (Werkzeug): Kreisbögen in **zwei Schritten** – **1)** Mittelpunkt antippen und
  Radius aufziehen, loslassen (der Radius wird gefixt, ein gestrichelter Kreis bleibt als
  Hilfe stehen); **2)** einmal herumziehen, um den Bogen zu zeichnen. Radius/Winkel live.
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
- **Einbetten als bewegliches Objekt:** Bilder, **YouTube/Video**, **Webseiten/HTML**, **GeoGebra**
  und die **Tabellenkalkulation** – verschieben/skalieren/drehen wie jedes andere Objekt. Zum
  Bedienen (Video abspielen, GeoGebra ziehen …) unten auf **„Einbettungen bedienen"** tippen.
  In die Link-Felder kann man per **📋-Knopf aus der Zwischenablage** einfügen. Mit der Option
  **„Als eigene Seite einfügen"** kommt das Eingebettete stattdessen groß auf eine neue Seite.
  (PDF wird weiter als ganze Seite(n) eingefügt.)
- **Kamera** (Werkzeug): Live-Bild in einem Fenster (z. B. für Versuche), Kamera umschaltbar,
  „Foto auf Tafel" legt einen Schnappschuss als bewegliches Objekt ab. (Nur über https.)
- **Punktestand** (Werkzeug): Score-Board für Spiele – Teams mit Namen, hoch-/runterzählen.
- **Gruppen bilden** (Werkzeug): erzeugt aus der Klassenliste zufällige, ausgewogene Gruppen
  in einstellbarer Größe; „Auf Tafel" schreibt die Gruppen auf die Tafel.
- **Uhr** (Werkzeug): fügt eine live laufende Analoguhr als bewegliches Objekt ein.
- **Funktionsplotter** (Werkzeug): Funktionsterm eingeben (mit Parametern **a, b, c** → Schieberegler),
  der Graph wird gezeichnet; im Bedien-Modus mit **Fingergeste zoom-/verschiebbar**.
- **Vierfeldertafel** (Werkzeug): 2×2-Tabelle mit editierbaren Beschriftungen; Zeilen-/Spaltensummen
  werden automatisch berechnet.
- **Baumdiagramm** (Werkzeug): Stufen und Verzweigungen einstellbar, Wahrscheinlichkeiten an die
  Äste eintragen; Pfadprodukte werden an den Blättern angezeigt.
- **Wahrscheinlichkeitsrechner** (Werkzeug): Binomial- und Normalverteilung – Wahrscheinlichkeiten
  (=, ≤, <, ≥, >, zwischen) mit Histogramm bzw. Glockenkurve und markiertem Bereich; bei Binomial
  zusätzlich eine **scrollbare Wertetabelle** (k, P(X=k), P(X≤k)).
- **Messwert-Analyse** (Werkzeug): bindet das Messdaten-Tool ein (als Objekt oder eigene Seite;
  fragt beim Einfügen nach). Braucht Internet (nutzt Chart.js u. a. per CDN).
- **Seitenübersicht:** auf die **Seitenzahl** (z. B. „2/5") tippen → Miniaturen aller Seiten,
  eine antippen wechselt direkt dorthin (und Seiten löschen).
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

1. **Hauptleiste (unten, mittig):** links **nebeneinander** vier immer sichtbare Buttons –
   die **Schwunglinie** = Schreiben (Stiftwerkzeuge), der **Auswahl-Cursor** = Auswählen &
   Werkzeuge (Objekte auswählen/verschieben + Timer/Stoppuhr/Uhr, Lärmampel, Umfrage, QR,
   Namensziehung, Taschenrechner, Einfügen …), der **Laserpointer** und der **Scheinwerfer**.
   Ein **Trennstrich** trennt diese Buttons vom jeweiligen Werkzeugmenü. Ganz rechts der
   Minimieren-Knopf – minimiert sieht man nur diese Buttons und den Aufklapp-Knopf.
2. **Seiten-Leiste (unten rechts, senkrecht):** blättern (‹ ›), Seite hinzufügen/löschen, Zoom
   zurücksetzen. Der **Minimier-Pfeil zeigt nach unten** (⌄) – klar unterscheidbar von den
   Blätter-Pfeilen. Minimiert bleiben Minimier-Pfeil und **+** (neue Seite) sichtbar.
2b. **Seiten-Leiste (oben rechts, waagrecht):** blättern, Seite +/−, Zoom, Seitenzahl (= Übersicht).
   Minimiert bleiben Seitenzahl und **+** sichtbar.
3. **Einstellungs-Leiste (oben links):** **Projekt-Auswahl** und **Vollbild** (bleiben auch
   minimiert sichtbar) sowie Einstellungen (Hintergrund, Klassenlisten), Speichern, Laden, **PDF-Export**.

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
sheet.html            ← eingebettete Tabellenkalkulation
plotter.html          ← eingebetteter Funktionsplotter
vierfelder.html       ← eingebettete Vierfeldertafel
baum.html             ← eingebettetes Baumdiagramm
wahrscheinlichkeit.html ← Binomial-/Normalverteilungs-Rechner
messwert.html         ← eingebundenes Messwert-Analyse-Tool (nutzt CDN → Internet nötig)
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

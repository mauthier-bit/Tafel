# Digitale Tafel

Eine iPad-optimierte digitale Tafel (Whiteboard) als Web-App. Läuft komplett im Browser,
funktioniert nach dem ersten Laden auch **offline** (PWA) und braucht keinen Server.

## Funktionen

- **Schreiben:** Stift (mit Apple-Pencil-Druckstärke), Marker; **eigener Farb-Button**
  (Farbe & Dicke) mit **sechs Strichstärken** (eine feinere und eine dickere als früher).
  **Stift, Linien/Formen und Marker haben getrennte Farben** (Stift und Marker zusätzlich getrennte Strichstärken): der Stift
  schreibt standardmäßig **schwarz**, Linien und Formen ebenfalls **schwarz**, der Marker **gelb**.
  Beim Umschalten kommt automatisch die
  zuletzt für dieses Werkzeug gewählte Farbe zurück (geräteweit gespeichert); voreingestellt sind
  beim Stift die zweite Stufe (wie bisher) und beim Marker die vierte. Auf dunklem
  Hintergrund werden **Stift sowie Linien/Formen** automatisch auf Weiß gestellt, die Markerfarbe bleibt.
- **Farbpalette selbst zusammenstellen** (Einstellungen → Werkzeugleisten → „Farbpalette"): auf eines
  der **acht Felder** tippen und eine beliebige Farbe wählen – die Auswahl gilt sofort in **allen**
  Farbmenüs (Stift/Marker, Formen, Kontextmenü, Lineal und Geodreieck) und bleibt geräteweit
  gespeichert; „Palette zurücksetzen" stellt die Standardfarben wieder her.
  Neben den festen Farben gibt es einen **bunten Punkt** – ein Tipp öffnet den vollen Farbwähler
  für beliebige Farben (auch bei der Objektfarbe im Kontextmenü).
- **Formen:** Linie, Rechteck, **Quadrat**, Ellipse, Dreieck, **rechtwinkliges Dreieck**,
  **allgemeines Dreieck**, **Parallelogramm**, **Trapez**, Pfeil (auch gefüllt), **Drachenviereck**
  sowie **Schrägbilder** von **Quader, vierseitiger Pyramide, Zylinder und Kegel** (mit
  gestrichelten verdeckten Kanten). Alle im **Formen**-Popover. Ein **erneutes Tippen auf „Formen"**
  klappt die Auswahl wieder zu (das Werkzeug bleibt aktiv). Sind Formen-Auswahl und **Farbpalette**
  gleichzeitig offen, weichen sie einander aus, statt sich zu überdecken.
- **Glatte Striche:** Auch druckabhängige Striche (Apple Pencil) werden als **Kurven** gezeichnet –
  je Messpunkt ein kurzes Kurvenstück statt gerader Verbindungen. Schnell geschriebene Bögen zeigen
  dadurch keine Polygon-Ecken mehr, ohne zusätzliche Punkte (gleicher Speicherbedarf) und sogar
  etwas schneller als vorher.
- **Freihand → gerade Strecke:** Beim normalen Schreiben am Ende einer Linie **1 Sekunde
  ruhig halten** → aus der Linie wird eine gerade Strecke (Anfang → gehaltener Punkt).
  Sonst bleibt es die Freihandlinie.
- **Konstruktionswerkzeuge:** **Kreis** (erster Punkt = Mittelpunkt – bleibt als Punkt sichtbar –,
  aufziehen = Radius, live angezeigt) und **Gerade** (zwei Punkte ziehen, loslassen → Gerade
  durch beide Punkte)
- **Pfeil** (Werkzeug): Pfeile ziehen.
- **Koordinatensystem** (Werkzeug): fügt ein **transparentes** Achsenkreuz mit x/y-Achsen-
  beschriftung und Zahlenskala als bewegliches Objekt ein – man kann direkt darauf zeichnen. Im
  Kontextmenü lässt sich der **x- und y-Bereich** (Ausschnitt) über **＋/−-Buttons** einstellen sowie
  **Gitterlinien** und **Achsenbeschriftung** ein-/ausschalten (Gitter standardmäßig **aus** – meist
  reicht das Karogitter des Hintergrunds), einen **Hintergrund** (Schalter + Farbwähler, Standard weiß;
  aus = transparent wie bisher) sowie die **Schriftgröße der Beschriftung** (＋/−). Achsen
  sind kräftig mit großen Pfeilspitzen und gut lesbaren Beschriftungen.
- **Zahlenstrahl** (im Formen-Popover): waagerechter Strahl mit Pfeilspitze, Teilstrichen und Zahlen
  als bewegliches Objekt. Im Kontextmenü einstellbar: **Beginn, Ende, Beschriftungsintervall**
  (0,1 bis 1000), **Zahlen an/aus** sowie **Schriftgröße, Fett und Kursiv**; **Farbe und Liniendicke**
  kommen aus den Farbpunkten bzw. „Dicke/Größe" oben im selben Kontextmenü. Wird die Teilung sehr fein,
  bleiben alle Striche stehen, aber nur jede n-te Zahl wird beschriftet, damit nichts überlappt.
- **Lineal** und **Geodreieck:** über ihren Knopf einblenden – mit **cm-/mm-Skala und Zahlen**. Über das
  kleine **⚙-Feld auf dem Werkzeug** öffnet sich ein Menü für **Länge bzw. Größe (8–40 cm), Millimeter
  an/aus, Zahlen an/aus und Farbe** (unten schließt ein **„Schließen"-Knopf** das Menü);
  stimmen die Zentimeter auf einem Gerät nicht (z. B. Windows-Tablet mit anderer Anzeigeskalierung),
  lässt sich der **Maßstab** in den Einstellungen → Bedienung kalibrieren (siehe unten);
  voreingestellt sind **Lineal 19 cm** und **Geodreieck 15 cm**, jeweils **mit Millimeter-Skala**;
  die Einstellungen bleiben geräteweit gespeichert. Sie **bleiben aktiv**, während der
  Stift zeichnet. Mit dem Finger am **unteren** Teil verschieben / am Griff (Ecke bzw. Spitze)
  drehen; mit dem Stift **an der Kante** eine saubere gerade Linie ziehen. Das Geodreieck hat
  eine **Winkelskala (0–180°)**, eine Lot-Linie, eine **innenliegende cm-Skala**, deren **Null in der
  Mitte der langen Seite** liegt und die nach links und rechts hochzählt (wie beim echten Geodreieck), und
  **Parallelen zur längsten Seite** (zum Zeichnen von Parallelen).
- **Winkel zeichnen (Geodreieck):** mit dem Stift **mindestens 1 Sekunde in der Mitte der langen Seite**
  (dem Scheitelpunkt) ruhig halten – danach lässt sich von dort eine **gerade Linie über die Winkelskala**
  ziehen. Der **aktuelle Winkel zur Kante** wird dabei laufend angezeigt (α = …°) und die Linie rastet
  auf **ganze Grad** ein, sodass der gezeichnete Winkel genau dem angezeigten Wert entspricht.
- **Zirkel** (Werkzeug): Kreisbögen in **zwei Schritten** – **1)** Mittelpunkt antippen und
  Radius aufziehen, loslassen (der Radius wird gefixt, ein gestrichelter Kreis bleibt als
  Hilfe stehen); **2)** einmal herumziehen, um den Bogen zu zeichnen. Radius/Winkel live.
- **Scheinwerfer:** Größe des Spots mit **zwei Fingern (Aufziehen)** einstellen
- **Endlose Seite:** beliebig nach unten/rechts weiterschreiben – mit dem Finger schieben
  (bzw. Pencil schreibt, Finger schiebt) oder am Desktop mit dem Mausrad/Trackpad scrollen
- **Tabellenkalkulation** einfügen (eigene Seite): Zellbezüge **relativ (A1) und absolut ($A$1)**,
  Grundrechenarten, Potenz `^`, `sqrt`, `sin`, `cos` (Bogenmaß); Kopieren/Einfügen passt
  relative Bezüge an. Die Tabelle wird im Projekt gespeichert. Neu: Formel **`=zufallszahl(1;6)`** (ganze Zufallszahl im Bereich; ohne Klammern 0–1), ein **✓-Button** neben der Eingabezeile übernimmt die Eingabe (wie Enter), und im Kontextmenü lassen sich **Schriftgröße, Fett und Kursiv** für Zellen und Spalten-/Zeilenköpfe einstellen.
- **Schriftgröße vieler Werkzeuge im Kontextmenü einstellbar** (＋/−): Tabelle, Funktionsplotter,
  Vierfeldertafel, Baumdiagramm, Wahrscheinlichkeitsrechner und Stellenwerttafel. Neben ＋/− gibt es dort jeweils einen Button für **Fett (F)** und **Kursiv (K)** – auch beim Koordinatensystem und der Tabellenkalkulation. „Fett" wirkt auch auf Teile, die ohnehin schon halbfett sind (Tabellen-/Spaltenköpfe, Ereignisnamen, Summenzeile, Ergebniszeile): sie werden dann noch kräftiger gesetzt.
- Beim Wechsel auf die **Schreibwerkzeuge** ist immer der **Stift** aktiv.
- **Diagramme aus der Tabelle:** einen **Zellbereich markieren** (mit gedrücktem Finger/Maus über
  die Zellen ziehen) und auf **„📊 Diagramm"** tippen – die markierten Zahlen werden wahlweise als
  **Säulendiagramm**, **Kreisdiagramm** oder **Boxplot** (mit Min/Q₁/Median/Q₃/Max) angezeigt.
  Bei zwei markierten Spalten (bzw. Zeilen) dient die erste als **Beschriftung**, die zweite als Werte.
  Im **Säulendiagramm** öffnet **„⚙ Achsen"** zusätzlich die Achsen-Einstellungen: **Rubriken (x)** und
  **Werte (y)** lassen sich als eigene Bereiche festlegen – entweder eintippen (z. B. `A1:A8`) oder über
  **„Markieren"**: das Diagramm blendet sich kurz aus, man markiert den Bereich in der Tabelle und tippt
  auf **„Übernehmen"**. Dazu kommen **Achsentitel** für x und y sowie **Start- und Endwert der senkrechten
  Achse** (leer = automatisch, „Auto" setzt beides zurück).
  Mit **A− / A+** im Diagrammkopf lässt sich die **Schriftgröße der Diagrammbeschriftung** einstellen
  (Achsen, Rubriken, Werte, Titel, Legende); die Ränder wachsen automatisch mit.
- **Tabellen-Schrift und Spaltenbreite:** Wird die Schrift der Tabelle mit A+ vergrößert, werden die
  **Spalten (und die Zeilennummern-Spalte) automatisch mitbreiter**; beim Verkleinern gehen sie auf
  die gewohnte Breite zurück. Selbst gezogene Spaltenbreiten bleiben dabei im gleichen Verhältnis.
- **Formeln durch Ziehen ausfüllen:** unten rechts an der markierten Zelle/Auswahl sitzt ein kleines
  blaues **Ausfüllkästchen** – nach unten oder zur Seite ziehen füllt die Formel/den Wert in die
  überstrichenen Zellen; **relative Bezüge (A1) werden angepasst, absolute ($A$1) bleiben fest**
  (touch-optimiert fürs iPad).
- **Tabelle (als Objekt):** im Kontextmenü **Zeilen-, Spalten-**, **Schrift-** und **Linienstärke**
  per ＋/− einstellbar.
- **Finger-Modus (Tabelle):** Umschalter **„👆 Auswählen ⇄ ✋ Scrollen"** oben in der Tabelle.
  Standard **Auswählen** – der Finger markiert Bereiche und bedient das Ausfüllkästchen (statt zu
  scrollen); zum Blättern großer Tabellen einmal auf **Scrollen**. (Voraussetzung: oben
  **„Einbettungen bedienen"** aktiviert; der Stift funktioniert in beiden Modi.)
- **Import & Einfügen (Tabelle):** Button **„📥 Import"** liest **CSV**- (Komma/Semikolon/Tab,
  auch Anführungszeichen) oder **Excel-Dateien (.xlsx)** ein (offline; ab A1). Button **„📋 Einfügen"**
  fügt tabellarische Daten **aus der Zwischenablage** (z. B. aus Excel/Sheets kopiert) ab der
  aktuellen Zelle ein. (Altes `.xls` bitte vorher als `.xlsx` oder CSV speichern.)
- **Wissenschaftlicher Taschenrechner** (Werkzeug): + − × ÷, Klammern, `xʸ`, √, sin/cos/tan,
  ln/log, π, e, umschaltbar **DEG/RAD**
- **Aufnahme** (Werkzeug): nimmt die Tafelfläche **mit Ton** auf, direkt abspielbar (echtes
  H.264-**MP4**, sonst WEBM) und speicherbar. Während der Aufnahme **verschwindet das Fenster**;
  oben in der Mitte bleibt nur ein rotes **„■ Aufnahme stoppen"** mit laufender Zeit. Die Statuszeile
  Mit **„🎙 Nur Ton"** lässt sich auch **nur eine Tonaufnahme** machen (ohne Bild): danach anhören und
  entweder **auf die Tafel legen** (Audioplayer als bewegliches Objekt) oder als **Datei speichern**
  (.m4a bzw. .webm). Wie Videoclips gelten Tonaufnahmen nur für die laufende Sitzung; im Kontextmenü
  des Objekts steht „🎙 Ton speichern". Mit **„🗑 Verwerfen"** lässt sich eine Aufnahme direkt im
  Fenster wieder löschen (bereits auf der Tafel abgelegte Aufnahmen bleiben davon unberührt). Die Statuszeile
  sagt, ob **mit Ton** aufgenommen wird (bei verweigertem Mikrofon läuft die Aufnahme stumm weiter).
  Nach dem Stoppen prüft die Tafel die fertige Datei und schreibt in die Statuszeile, ob wirklich eine
  **Tonspur** drin ist – steht dort „mit Ton" und man hört trotzdem nichts, liegt es am Gerät
  (iPad: Lautstärke bzw. Stummschalter im Kontrollzentrum).
- **Screenshot** (Werkzeug, direkt vor der Aufnahme): nimmt einen **Ausschnitt der Tafelfläche** auf. Vorher
  wählt man im Fenster das **Ziel** (auf die Tafel legen · in die Zwischenablage · als PNG
  speichern) und die **Form**: **Rechteck, Oval oder Lasso**. Danach den Bereich ziehen – der Rest des
  Bildschirms wird abgedunkelt; „Abbrechen" (oder Esc) bricht ab. Bei Oval und Lasso ist alles außerhalb
  der Form transparent. Leisten und eingebettete Web-/Video-Seiten sind nicht im Bild.
- **Projekte / Klassen** (Einstellungen): mehrere Projekte (z. B. „Mathe 6a", „Physik 11c")
  anlegen, **umbenennen**, dazwischen **wechseln** und **schließen**. Jedes Projekt hat eigene
  Seiten **und** eine eigene Klassenliste. Alles wird automatisch im Browser gesichert.
  **„Speichern und schließen"** sichert das Projekt zuerst als `.tafel`-Datei und entfernt es
  danach (nach Rückfrage) aus der App – später einfach über „Laden" wieder öffnen.
- **Reihen automatisch fortsetzen:** Zwei (oder mehr) Zellen markieren und am kleinen Quadrat unten
  rechts ziehen – `1;2` wird zu `3;4;5 …`, `5;10` zu `15;20 …`, auch rückwärts, nach rechts und mit
  Kommazahlen. Auch Text mit Zahl (`Gruppe 1` → `Gruppe 2 …`) wird fortgesetzt; ein **einzelner Wert**
  und **Formeln** werden wie bisher kopiert (Formeln mit angepassten Bezügen).
- **Zeilenzahl** wählbar (60 / 100 / 200 / 500 / 1000) über das Auswahlfeld in der Leiste; beim Import
  oder Einfügen größerer Datenmengen wächst das Blatt automatisch mit. Die Einstellung wird im Projekt
  gespeichert.
- **Solange eine Formel offen ist**, gehört jeder Tipp auf eine Zelle zur Formel – die Eingabe wird
  dabei nie beendet. Tippt man direkt hintereinander auf zwei Zellen, wird der Bezug **ersetzt**.
  Beendet wird die Formel mit **✓** (Leiste), **„✓ Fertig"** (Formel-Tastatur) oder **Enter**;
  **Esc** verwirft die Eingabe. Danach wählt ein Tipp wieder ganz normal Zellen aus.
- **Zellen und Bereiche mit dem Finger übernehmen:** Beginnt man eine Formel (`=` oder `=summe(`),
  setzt ein **Antippen** einer Zelle deren Bezug ein (`=A3`, dann normal weitertippen: `+5`), und
  **Streichen** über mehrere Zellen setzt den Bereich (`A1:A7`) ein – auch beim Antippen eines Spalten- oder
  Zeilenkopfes (ganze Spalte/Zeile). **Kopfzelle antippen** markiert die ganze Spalte bzw. Zeile
  (Ziehen über mehrere Köpfe markiert mehrere), und der **rechte Rand einer Kopfzelle** lässt sich
  ziehen, um die **Spaltenbreite** zu ändern (Doppeltipp = Standardbreite). Breiten werden im Projekt
  gespeichert und aus **Excel-Dateien** mit übernommen. Während des Tippens werden **alle in der Formel
  verwendeten Zellen und Bereiche farbig umrandet** (jeder Bezug in einer eigenen Farbe) – und der
  **Bezug in der Formel selbst erscheint in derselben Farbe**, in der Eingabezeile wie in der Zelle.
- **Formeln:** Grundrechenarten, Klammern, `^`, Zellbezüge relativ und absolut (`A1`, `$A1`, `A$3`,
  `$A$3` – beim Ausfüllen wird nur der nicht festgehaltene Teil angepasst). Dezimalzahlen mit Komma
  oder Punkt (`=runden(2,345;2)`), Argumente mit `;` trennen.
  - **Rechnen:** SUMME, MITTELWERT, PRODUKT, MIN, MAX, ANZAHL, WURZEL, POTENZ, ABS, EXP, LN,
    LOG (auch mit Basis: `=log(8;2)`), SIN/COS/TAN, GRAD, BOGENMASS, PI, E
  - **Runden & ganze Zahlen:** RUNDEN(x;Stellen), AUFRUNDEN, ABRUNDEN, GANZZAHL, REST, GGT, KGV
  - **Statistik:** MEDIAN, MODALWERT, SPANNWEITE, VARIANZ / VARIANZEN, STABW / STABWN,
    QUARTIL(Bereich;0–4), QUANTIL(Bereich;p)
  - **Bedingungen:** Vergleiche `= <> < <= > >=`, WENN(Bedingung;dann;sonst) – auch mit Text
    (`=wenn(A1>=50;"bestanden";"durchgefallen")`), UND, ODER, NICHT, WAHR, FALSCH
  - **Zählen/Zufall:** ZÄHLENWENN(Bereich;Kriterium) – Zahl, Vergleich (`">3"`) oder Text (`"ja"`);
    ZUFALL(), ZUFALLSZAHL(a;b), ZUFALLSBEREICH(a;b)
  - **Leere Zellen und Texte** werden in Bereichen übersprungen: `=mittelwert(A1:A100)` rechnet nur
    mit den gefüllten Zellen.
  - **Formel-Tastatur** (Knopf **⌨**): blendet unten ein Tastenfeld ein, das aufs Formelschreiben
    zugeschnitten ist – Ziffern, `= + − × ÷ ^ ( ) ; : , < > ≥ ≤ ≠`, Rücktaste, Cursor ◀ ▶, „✓ Fertig"
    (übernimmt und springt eine Zeile tiefer) und eine Reihe fertiger Funktionen (SUMME, MITTELWERT,
    WENN, ZÄHLENWENN …), die gleich mit `=` und Klammer eingesetzt werden. Solange sie offen ist,
    bleibt die **Systemtastatur zu**, und die Tabelle rutscht nach oben, damit nichts verdeckt wird.
    Zellbezüge tippt man weiter direkt im Blatt an – ideal fürs iPad ohne Tastatur. Für Texte
    (z. B. Tabellenköpfe) schaltet die Taste **ABC** auf die gewohnte Systemtastatur um – mit
    Umlauten, Diktat und Autokorrektur; der Knopf **⌨** holt die Formeltasten wieder zurück.
    Die **$-Taste** schaltet den Bezug am Cursor durch `A1 → $A$1 → A$1 → $A1` (wie F4 in Excel).
  - **Namen für Zellen und Bereiche:** oben links auf die Zellbezeichnung tippen und einen Namen
    vergeben (leer lassen = entfernen). Danach rechnet man damit wie mit einer Variablen:
    `=Preis*MwSt`, `=summe(Werte)`. Namen sind **immer fest** – beim Ausfüllen wandern sie nicht mit
    (relative Bezüge wie `A1` dagegen schon). Sie werden in der Formel genauso farbig markiert wie
    Zellbezüge und mit der Tabelle gespeichert.
  - **Rückgängig / Wiederherstellen** (↶ ↷ in der Leiste, auch ⌘Z / Strg+Z bzw. ⇧⌘Z).
    Es wirkt auf **alle Änderungen an den Objekten einer Seite**: Schreiben, **Radieren**,
    Löschen, Einfügen, Duplizieren, Gruppieren/Lösen, Ebenen-Wechsel und „Seite leeren"
    (bis zu 40 Schritte je Seite). Nicht erfasst wird das **Verschieben/Skalieren/Drehen**
    von Objekten.
  - **Schriftgröße** direkt im Werkzeug über **A− / A+**.
  - **Datei-Menü** (📁): **Neu** (leere Tabelle – setzt auch Spaltenbreiten, Schriftgröße und
    Zeilenzahl zurück), **Öffnen** (eigene `.json`-Tabelle, CSV, Excel), **Tabelle speichern**
    (`.json` mit Formeln, Spaltenbreiten, Zeilenzahl), **Als CSV speichern** (Semikolon, deutsche
    Kommazahlen – öffnet sich direkt in Excel), **Aus Zwischenablage einfügen**, **Alles löschen**.
  - **Eigenständig nutzbar:** `sheet.html` lässt sich auch direkt aufrufen (z. B. per QR-Code für die
    Klasse). Dort **speichert die Tabelle automatisch im Browser**, ist nach dem Neuladen also noch da;
    zum Abgeben/Weitergeben dient „Tabelle speichern" bzw. der CSV-Export.
  - **Anzeige mit deutschem Komma** (0,75 · 4,33) – auch in den Diagramm-Achsen und -Infozeilen;
    eingeben darf man Komma oder Punkt.
- **Favoriten:** Oben in der senkrechten Leiste – gleich unter den Modus-Knöpfen – lassen sich bis zu
  **8 Lieblingswerkzeuge** ablegen; sie sind in jedem Modus sichtbar. Einen beliebigen Knopf (aus jeder
  Leiste, auch aus den Untermenüs) **eine Sekunde gedrückt halten** → „★ Zu den Favoriten". Auf einem
  Favoriten liefert dasselbe lange Drücken „▲ Nach oben / ▼ Nach unten / ☆ Entfernen". In den
  Einstellungen (Abschnitt **Favoriten**) gibt es zusätzlich eine Liste aller Knöpfe zum An- und
  Abwählen sowie **„Favoriten zurücksetzen"**. Die Auswahl gilt geräteweit, projektübergreifend.
- Voreinstellungen bei einem neuen Projekt: Muster **Karo**, **„Finger wählt aus"** an, Leisten **hell/hellgrau**.
- **Hintergrundfarben** (Einstellungen): Weiß, **Tafelgrün**, Schwarz, Dunkelgrau, **Dunkelblau**,
  **dunkles Weinrot**, Hellblau sowie **helles Gelb / Grün / Rot / Orange / Lila** und ein
  **Regenbogen-Button** für eine **beliebige Farbe** (Farbwähler) – die Farbkreise sind größer und
  die aktive Farbe ist am blauen Ring erkennbar – getrennt einstellbar vom **Muster**
  (Kein / Karo / Linien / Punkte / **Notenlinien** / **Dreiecke** – gleichseitiges 60°-Raster).
  Die **Größe des Musters** ist direkt darunter einstellbar (＋/− und „Standard"): Kästchenweite,
  Linien-/Punktabstand, Notenlinienabstand bzw. Seitenlänge der Dreiecke – je Musterart gespeichert.
  Die **Kästchenweite wird in Millimetern** angezeigt und in 1-mm-Schritten verstellt; **Standard sind
  5 mm**, damit das Karo genau zur Skala von **Lineal und Geodreieck** passt.
- **Sticker & Klassenliste** (Gruppe „Klasse & Interaktion", Stern-Knopf) – ein Fenster mit zwei
  Bereichen, gespeichert **je Projekt (= Klasse)**:
  - **Sticker:** Die gesammelten Sticker der aktiven Klasse werden groß angezeigt; ein Tipp auf einen
    der 16 Sticker in der Auswahl (u. a. ⭐ 🏆 👑 🎉 😊 🦄 🦋 🐱) **vergibt** ihn – mit großer Einblendung
    und **Applaus**, dazu **abwechselnd** ein **Konfettiregen** (ca. 4 Sekunden) oder ein **Feuerwerk**
    (Raketen mit bunten Funken und leisem Knallen vor abgedunkeltem Hintergrund, ca. 4–5 Sekunden).
    Gilt auch für den automatischen Sticker; alle Töne werden im Browser erzeugt, es wird keine
    Audiodatei geladen.
    „Sticker entfernen" lässt einzelne Sticker per Tipp wieder wegnehmen, „Alle entfernen" leert die
    Sammlung. Schalter **„Automatisch bei Ruhe"**: siehe Lärmampel.
  - **Klassenliste:** alle Namen der aktiven Klasse als Knöpfe. Ein Tipp auf einen Namen öffnet die
    **Kategorien** (Standard: ⚠️ Verwarnung, 👍 Lob, ℹ️ Hinweis, 📚 Keine Hausaufgabe) – ein Tipp auf eine Kategorie zählt
    **+1**, das kleine **−** daneben nimmt einen zurück. **„Anzeigen/Verbergen"** blendet die Zähler
    an den Namen ein oder aus (standardmäßig verborgen – praktisch, wenn die Tafel projiziert wird).
    Unter **„Kategorien"** lassen sich Kategorien **hinzufügen, umbenennen**, mit einem Symbol versehen
    und löschen; „Zähler zurücksetzen" setzt alle Zähler der Klasse auf 0.
- **Sticker bei Ruhe (Sozialform):** In der Sozialform-Ansicht gibt es bei der **Lärmampel** den
  Schalter **„⭐ Sticker für die Klasse, wenn die Ampel bis zum Timer-Ende nicht rot wird"**. Sind Timer und
  Lärmampel beide aufgeklappt, sind ihre Bereiche **gleich hoch**. Laufen **Timer und Lärmampel** zusammen und
  leuchtet die Ampel bis zum Ablauf des Timers **nicht rot** (kurze Ausreißer unter ⅓ Sekunde zählen
  nicht), bekommt die aktive Klasse automatisch einen ⭐ – mit großer Einblendung. War sie rot, gibt es
  einen kurzen Hinweis. Der Schalter ist derselbe wie „Automatisch bei Ruhe" im Sticker-Fenster.
- **Stift-Testseite** `pentest.html` (im selben Ordner, direkt aufrufbar): kleine, von der Tafel
  unabhängige Seite zum Prüfen der Stifteingabe – zählt Pointer- und Touch-Ereignisse gegen die
  tatsächlich gezeichneten Striche und lässt `preventDefault`, `PointerCapture` und die Eingabeart
  umschalten. Damit lässt sich eingrenzen, ob fehlende Striche an der App oder am Browser liegen.
- **Maßstab kalibrieren** (Einstellungen → Bedienung, optional): Standard ist auf das **iPad**
  abgestimmt (37,8 px = 1 cm) – ohne Zutun ändert sich nichts. Bei Bedarf den angezeigten Balken mit
  einem echten Lineal messen und mit ＋/− auf **genau 5 cm** stellen; Lineal, Geodreieck und
  Karo-Muster übernehmen den Maßstab (ihre Zentimeter-Angaben bleiben dabei gleich), „Standard"
  stellt den Ausgangswert wieder her. Die Einstellung gilt geräteweit.
- **Maus:** Rechts- und Mittelklick zeichnen nicht (nur die linke Taste) – relevant an Geräten mit
  Maus/Trackpad oder Stiften mit Knopf.
- **Erscheinung der Leisten** (Einstellungen → „Leisten"): **Dunkel** oder **Hell** (Voreinstellung) – bei Hell
  cremeweiße Knöpfe mit schwarzen Symbolen und Beschriftungen. Darunter stehen je Variante mehrere
  **Farbtöne** zur Wahl: dunkel = Graphit, Dunkelblau, dunkles Weinrot, Dunkelbraun, Dunkelgrün;
  hell = Cremeweiß, Hellblau, Hellgelb, Beige, Hellgrau (Voreinstellung). Gilt für alle drei Leisten samt Stift-/Formen-
  Popovers; jede Variante merkt sich ihren Farbton. Die Einstellung gilt geräteweit (projektübergreifend).
  Bei dunklem Hintergrund schreibt der Stift automatisch weiß.
- **Ebene ändern:** Im Kontextmenü eines ausgewählten Objekts gibt es **▲ Vor / ▼ Zurück** (eine Ebene)
  und **⤒ Ganz vorn / ⤓ Ganz hinten**. Funktioniert auch mit einer Mehrfachauswahl und mit
  eingebetteten Werkzeugen (Tabelle, Glücksrad …) gegenüber Gezeichnetem.
- **Text:** Textfelder anlegen; **Doppeltipp** auf einen Text zum Nachbearbeiten. Bei ausgewähltem
  Text bietet das **Kontextmenü** zusätzlich **Fett, Kursiv, Aufzählung (Liste)** und eine
  **Schriftgrößen-Einstellung** (＋/−).
- **Gleichungslöser** (Werkzeug neben dem Textfeld): bewegliches Objekt, in das man eine
  Gleichung **tippt** (z. B. `2x+3=7` oder `x^2-5x+6=0`). **Lineare und quadratische**
  Gleichungen werden mit Lösungsweg gelöst; andere werden ehrlich als „nicht lösbar" gemeldet.
  (Handschrift-Erkennung ist offline nicht möglich – für handschriftliche/komplexere Mathematik
  die **GeoGebra-App** nutzen.)
- **Tabelle** (Werkzeug bei den Schreibwerkzeugen): fügt eine **gewöhnliche Tabelle** als
  bewegliches Objekt ein; **Zeilen- und Spaltenzahl** lassen sich im **Kontextmenü** nachträglich
  einstellen, Zelleninhalte werden im Projekt gespeichert.
- **GeoGebra-App** (Werkzeug): fügt ein vollständiges **GeoGebra-App-Fenster** ein (nicht nur eine
  .ggb-Datei) – wahlweise als bewegliches **Objekt** oder als **eigene Seite**. Braucht Internet.
- **„Als eigene Seite anzeigen":** Bei einem als Objekt eingefügten **Wahrscheinlichkeitsrechner**,
  **Messwert-Analyse**- oder **GeoGebra-App**-Objekt erscheint im Kontext-Panel eine Schaltfläche,
  die das Objekt nachträglich groß auf eine **neue eigene Seite** verschiebt (Inhalt bleibt erhalten).
- **Kopieren / Ausschneiden / Einfügen:** im Kontext-Panel **Kopieren**/**Ausschneiden** (oder
  ⌘/Strg + C/X) – Objekte lassen sich **auf einer anderen Seite** oder **in einer anderen App**
  einfügen (als Bild). Umgekehrt fügt **„Aus Zwischenablage einfügen"** im Einfügen-Fenster (oder
  ⌘/Strg + V) Objekte, Bilder oder Text **aus anderen Apps** in die Tafel ein. Zusätzlich gibt es
  in der **Einstellungs-Leiste (oben links)** einen eigenen Knopf **„Aus der Zwischenablage einfügen"**.
- **Radierer:** radiert Teile von Strichen weg (nicht nur ganze Striche) – **Rückgängig macht auch das Radieren wieder rückgängig**
- **Schnell aufeinanderfolgende Striche:** Bleibt ein Strich „offen", weil das System das
  Loslassen des Stifts verschluckt hat, wird er jetzt **sauber übernommen** und der nächste Strich
  beginnt sofort – vorher ging in solchen Fällen jeder zweite kurze Strich verloren (typisch beim
  schnell geschriebenen **Gleichheitszeichen**). Ein Wächter erkennt zusätzlich verlorene
  Stiftkontakte und schließt den Strich ab, statt ihn zu verwerfen.
- **Doppeltipp-Erkennung ausgehebelt:** Setzt der Stift kurz nach dem letzten Strich **dicht daneben**
  wieder auf (typisch beim Gleichheitszeichen), hielt iPadOS das für einen **Doppeltipp** und verwarf
  den Kontakt – der Strich fehlte komplett. Die Tafel unterbindet auf der Zeichenfläche jetzt die
  Standardaktion der Touch-Ereignisse, damit Safaris Gestenerkennung gar nicht erst greift.
- **Der Stift hat Vorrang:** Liegt beim Schreiben ein **Finger oder der Handballen** auf der Tafel,
  schreibt der Pencil trotzdem weiter (bisher blockierte eine solche Berührung das Schreiben, bis
  man die Hand anhob). Nur bei **zwei** Fingern (Zoomen/Schieben) hält sich der Stift heraus.
- **Lineal:** einblendbar, mit Pencil verschieben/drehen, Striche schnappen an die Kante
- **Lasso-Auswahl** (Werkzeug): einen Bereich mit dem Stift **einrahmen** (ist die Kurve nicht
  geschlossen, wird sie automatisch mit einer geraden Strecke geschlossen). Nach dem Loslassen
  erscheint ein Menü mit **Kopieren · Ausschneiden · Gruppieren · Löschen** für alle eingerahmten
  Objekte. (Die Rechteck-Auswahl im Auswahl-Modus bleibt zusätzlich erhalten.)
- **Auswählen, Verschieben, Skalieren, Drehen:** Objekt antippen → Rahmen mit Griffen
  (Eckgriffe = Größe, Kreis oben = drehen). Am Objekt erscheint ein **kleiner Button (☰)** –
  ein Tipp klappt das **Kontext-Panel** auf/zu (Farbe, Dicke/Größe, Füllung, Kopieren usw.),
  damit es nicht ständig im Weg ist.
- **Finger-Bedienung im Auswahl-Modus** (Einstellungen, standardmäßig **aus**): ist der Schalter
  **„Finger wählt aus (Auswahl-Modus)"** aktiv, kann man bei gewähltem **Auswahl-Cursor** auch
  **mit dem Finger** Objekte antippen und verschieben; eine **Zwei-Finger-Geste auf einem
  ausgewählten Objekt** skaliert (aufziehen/zusammenziehen) und **dreht** es. Ist der Schalter aus,
  bleibt alles wie gewohnt (Finger schiebt/zoomt nur das Blatt, Auswählen nur mit dem Stift).
- Das **Kontextmenü** ist nach Abschnitten geordnet (Objekt-Einstellungen · Ebene · Aktionen) und zeigt
  nur, was beim ausgewählten Objekt wirklich etwas bewirkt – Farbe und Dicke erscheinen z. B. nicht bei
  einer eingefügten Tabelle oder einem Bild.
- **Gruppieren / Lösen / Duplizieren / Löschen** im Kontext-Panel („Lösen" hebt die Gruppe auf und
  die Auswahl auf, damit die Objekte danach wirklich einzeln beweglich sind)
- **Laserpointer** und **Scheinwerferspot** – nutzbar auch **mit dem Finger**, unabhängig von der Einstellung „Nur mit Stift schreiben"
- **Zoom/Verschieben:** zwei Finger zoomen, ein Finger schiebt (Pencil schreibt weiter). Die Seite
  ist **oben und links fest begrenzt** (Ursprung oben-links) und **nach unten und rechts unbegrenzt** –
  man schiebt also nur nach unten/rechts.
- **Seiten:** hinzufügen, löschen, blättern
- **Einbetten als bewegliches Objekt:** Bilder, **YouTube/Video**, **Webseiten/HTML**, **GeoGebra**
  und die **Tabellenkalkulation** – verschieben/skalieren/drehen wie jedes andere Objekt. Zum
  Bedienen (Video abspielen, Zellen auswählen, GeoGebra ziehen …) **oben** auf
  **„Einbettung bedienen"** tippen (schaltet zwischen Zeichnen und Bedienen um). Der Knopf sitzt
  **mittig oben**, wenn die oberen Leisten eingeklappt sind, und rutscht in die **Lücke zwischen
  den Leisten**, wenn sie ausgeklappt sind – immer vollständig sichtbar.
  In die Link-Felder kann man per **📋-Knopf aus der Zwischenablage** einfügen. Mit der Option
  **„Als eigene Seite einfügen"** kommt das Eingebettete stattdessen groß auf eine neue Seite.
  Beim Webseiten-Feld darf auch ein **kompletter `<iframe src="…">`-Einbettungscode** eingefügt
  werden – die URL wird automatisch herausgezogen. **Hinweis:** Manche Websites (z. B. leifiphysik.de)
  verbieten das Einbetten technisch (`X-Frame-Options` / CSP) – das lässt sich nicht umgehen. Statt
  eines leeren weißen Kastens zeigt das Objekt dann eine **Info-Karte mit der Domain**; über
  **„Einbettungen bedienen" → „↗ Öffnen"** (oben links am Objekt) lässt sich die Seite im Browser öffnen.
  Direkte Inhalts-URLs (z. B. **PhET-Simulationen**) funktionieren dagegen problemlos.
  (PDF wird weiter als ganze Seite(n) eingefügt.)
- **Audiodatei einfügen (mp3 …):** über **Einfügen → Datei** („PDF / Bild / PowerPoint / Audio wählen").
  Unterstützt **mp3, m4a, aac, wav, ogg, opus**; die Datei landet als kleiner **Abspieler** (Play,
  Position, Lautstärke) als bewegliches Objekt auf der Tafel – zum Abspielen oben auf **„Einbettung
  bedienen"** tippen. Dateien **bis 4 MB werden mit dem Projekt gespeichert** und sind nach dem
  Neuladen noch da; größere Dateien laufen nur bis zum Neuladen. Über das Kontextmenü lässt sich der
  Ton mit **„🎙 Ton speichern"** wieder als Datei sichern.
- **PowerPoint (.pptx) einfügen:** über **„PDF / Bild / PowerPoint"** – jede Folie wird als Bild
  dargestellt (einfache Darstellung: **Text & Bilder**, keine Animationen/Themes/SmartArt) und
  wahlweise als **Objekt** oder als **eigene Seite** eingefügt. Läuft offline (entpackt die .pptx
  im Browser). Für **exakte** Darstellung die Präsentation als **PDF** exportieren und einfügen.
- **Kamera** (Werkzeug): Live-Bild in einem Fenster (z. B. für Versuche), Kamera umschaltbar,
  **Zoom mit zwei Fingern** direkt im Bild (Doppeltipp = zurück; am Rechner auch per Mausrad) –
  der Zoom steckt auch im Foto und in der Videoaufnahme,
  „Foto auf Tafel" legt einen Schnappschuss als bewegliches Objekt ab. **„Video auf Tafel"** nimmt
  einen Clip auf (nochmal antippen = beenden, mit laufender Zeitanzeige) und legt ihn als abspielbares
  Videoobjekt auf die Tafel – wahlweise **mit Ton** (Schalter „Video mit Ton"; ohne Mikrofonfreigabe
  wird stumm aufgenommen). Zum Abspielen oben „Einbettung bedienen" antippen. Clips gelten nur für die
  laufende Sitzung: im gespeicherten Projekt bleibt ein Platzhalter statt der Videodaten – wer eine
  Aufnahme behalten will, wählt den Clip aus und tippt im **Kontextmenü** auf **„🎬 Video speichern"**
  (.mp4 bzw. .webm). (Nur über https.)
- **Punktestand** (Werkzeug): Score-Board für Spiele – Teams mit Namen, hoch-/runterzählen.
- **Gruppen bilden** (Werkzeug): erzeugt aus der Klassenliste zufällige, ausgewogene Gruppen
  in einstellbarer Größe; „Auf Tafel" schreibt die Gruppen auf die Tafel.
- **Uhr** (Werkzeug): fügt eine live laufende Analoguhr als bewegliches Objekt ein.
- **Funktionsplotter** (Werkzeug): Funktionsterm eingeben (mit Parametern **a, b, c** → Schieberegler),
  der Graph wird gezeichnet; im Bedien-Modus mit **Fingergeste zoom-/verschiebbar**. Über **„＋ Funktion"**
  lassen sich **mehrere Funktionen gleichzeitig** anzeigen (je eigene Farbe, eigene Eingabezeile, mit „×"
  entfernbar); die **Parameter a/b/c wirken auf alle Funktionen gemeinsam**. **Farbe und Linienstärke**
  im **Kontextmenü** wirken auf den **aktiven Graphen** (die farblich hervorgehobene Eingabezeile –
  im Bedien-Modus die Zeile antippen, um sie auszuwählen).
- **Vierfeldertafel** (Werkzeug): 2×2-Tabelle mit editierbaren Beschriftungen; Zeilen-/Spaltensummen
  werden automatisch berechnet. Die Schriftgröße aus dem Kontextmenü gilt für Ereignisse, **Gegenereignisse und das Σ-Zeichen** gleichermaßen.
- **Baumdiagramm** (Werkzeug): Stufen und Verzweigungen einstellbar, Wahrscheinlichkeiten an die
  Äste eintragen; Pfadprodukte werden an den Blättern angezeigt. Über jedem Knoten lässt sich per Tipp ein **Ereignisname** eintragen – die Eingabe `nichtA` erscheint als **Ā** (A mit Querstrich). Oben kann zusätzlich ein **Stichprobenumfang n** eingegeben werden; ist er gesetzt, stehen unter den Ereignissen die **absoluten Häufigkeiten** n·P(Pfad) (an der Wurzel n selbst).
- **Wahrscheinlichkeitsrechner** (Werkzeug): Binomial- und Normalverteilung – Wahrscheinlichkeiten
  (=, ≤, <, ≥, >, zwischen) mit Histogramm bzw. Glockenkurve und markiertem Bereich; bei Binomial
  zusätzlich eine **scrollbare Wertetabelle** (k, P(X=k), P(X≤k)).
- **Messwert-Analyse** (Werkzeug): bindet das Messdaten-Tool ein (als Objekt oder eigene Seite;
  fragt beim Einfügen nach). Braucht Internet (nutzt Chart.js u. a. per CDN).
- **Seitenübersicht:** auf die **Seitenzahl** (z. B. „2/5") tippen → Miniaturen aller Seiten,
  eine antippen wechselt direkt dorthin. Jede Miniatur hat oben rechts ein **⋮-Menü** (mit **×** zum
  Schließen) mit **Umbenennen, Duplizieren, Kopieren, Ausschneiden, Einfügen** sowie **Seitenstil** (Muster
  Kein/Karo/Linien/Punkte/Noten/Dreiecke **und** Hintergrundfarbe) – **je Seite einzeln** einstellbar –
  und oben links ein **rotes ×** zum **Löschen** der Seite
  (der Seitenname erscheint auch in der Kopfzeile). Die Miniaturen behalten immer **dieselbe Größe**
  (werden bei vielen Seiten nicht gequetscht) – bei Bedarf wird die Übersicht **scrollbar**.
  **Bedienung der Miniaturen:** **antippen** springt zur Seite, **streichen** scrollt die Übersicht
  (auch direkt auf einer Miniatur), **lange gedrückt halten** (ca. eine halbe Sekunde) und ziehen
  ordnet die Seiten neu. Zusätzlich gibt es oben rechts **▲/▼-Knöpfe** zum seitenweisen Scrollen
  (sie erscheinen nur, wenn es etwas zu scrollen gibt). Die Höhe richtet sich nach dem **wirklich
  sichtbaren** Bereich, damit am iPad nichts hinter den Safari-Leisten verschwindet.
- **QR-Code-Generator**
- **Klassenlisten:** pro Projekt – **Namen direkt eintippen** (ein Name pro Zeile im Einstellungen-
  Fenster) oder **CSV importieren** (Name in der 1. Spalte); Button „Zufälliger Name" zieht per Zufall
  eine Person (ohne Wiederholung) – **animiert wie ein Spielautomat**: die Namen laufen im Slot-Fenster
  durch, werden langsamer und bleiben auf dem gezogenen Namen stehen.
- **PDF-Export** der ganzen Tafel
- **Vollbild-Button** (oben links in der Einstellungs-Leiste; wird beim **Minimieren** der Leiste
  mit ausgeblendet)
- **Speichern/Laden** als `.tafel`-Datei + automatische Sicherung im Browser
- **Widgets:** Lärmampel (Mikrofon), Stoppuhr, Timer, **Sozialform** (Auswahl-Bildschirm: Stillarbeit /
  Partnerarbeit / Gruppenarbeit antippen → große Anzeige mit gut erkennbaren Symbolen; in der Anzeige
  lassen sich **optional ein Timer** für die Dauer **und die Lärmampel** einblenden), Umfrage
- **Hintergrund:** Weiß / Karo / Linien / Punkte / Notenlinien / Dreiecke (Einstellungen)

## Leisten (Bedienung)

Es gibt drei feste Leisten, jede lässt sich über ihren **Pfeil-Knopf minimieren**:

1. **Hauptleiste (links, senkrecht):** am **linken Rand vertikal** angeordnet (damit man beim
   Schreiben nicht versehentlich etwas auslöst). Oben **untereinander** vier immer sichtbare Buttons –
   die **Schwunglinie** = Schreiben (Stiftwerkzeuge), der **Auswahl-Cursor** = Auswählen &
   Werkzeuge (Objekte auswählen/verschieben + Zeit, Klasse & Interaktion, Lärmampel, QR,
   Namensziehung, Taschenrechner, Einfügen …), der **Laserpointer** und der **Scheinwerfer**.
   Ein **Trennstrich** trennt diese Buttons vom jeweiligen Werkzeugmenü (das bei Bedarf **scrollt**).
   Die Leiste beginnt **unter der oberen Einstellungs-Leiste** und
   wächst nach unten. Verwandte Werkzeuge sind zur Übersicht in **Gruppen-Popovers**
   zusammengefasst (wie „Formen"): der **Formen**-Button enthält Linie/Rechteck/Ellipse/Dreiecke/Pfeil
   **und** Kreis, Gerade, Zirkel, Zahlenstrahl, Koordinatensystem (alle Knöpfe gleich groß);
   ein **Zeit**-Button (Uhr, Stoppuhr, Timer);
   ein **Klasse & Interaktion**-Button (Sozialform, Gruppen bilden, Umfrage, Zufälliger Name, Punktestand)
   und ein **Mathe & Physik**-Button (Gleichungslöser, Funktionsplotter, Vierfeldertafel, Baumdiagramm,
   Wahrscheinlichkeitsrechner, GeoGebra-App, Messwert-Analyse, **Würfel** und **Glücksrad**).
- **Würfel** (Zufallsgenerator, Mathe & Physik): 1–6 Würfel mit wählbarer Seitenzahl (2–20),
  „Würfeln" rollt, Summe wird angezeigt. **Antippen eines Würfels wechselt seine Farbe**
  (durch eine Palette) – so kann man mehrere Würfel zur Unterscheidung einfärben; die Farben
  bleiben beim Würfeln erhalten. (Nur die **Würfelfläche** wird gefärbt, die Augen bleiben schwarz.)
- **Glücksrad** (Zufallsgenerator, Mathe & Physik): dreht auf einen zufälligen Sektor. **Anzahl der
  Sektoren sowie Beschriftung (Zahl) und Farbe je Sektor** lassen sich im **Kontextmenü** einstellen.
- **Bruch** (Mathe & Physik): Zähler und Nenner eingeben → der Bruch wird angezeigt und als **Kreis
  mit gleich großen Sektoren** dargestellt (Zähler-viele Sektoren gefüllt), plus Dezimalwert.
- **Stellenwerttafel** (Mathe & Physik): umschaltbar **Längen / Flächen / Volumen / Massen** mit den
  üblichen Einheiten. Ziffern eintippen; ein Tipp auf eine Einheit **verschiebt das Komma** (Umrechnung) –
  **Komma und die zugehörige Einheit werden rot hervorgehoben**. Mit **„＋ Zeile"** lassen sich
  weitere Zahlen-Zeilen hinzufügen; jede Zeile zeigt ihren Wert in der gewählten Einheit. Die Schriftgröße im Kontextmenü vergrößert jetzt auch **Zellenbreite und -höhe**. Neue Kategorie **„Zahl"**: Stellen vor dem Komma **E, Z, H, T, ZT, HT, M** (Einer bis Millionen), nach dem Komma **z, h, t, zt** (Zehntel bis Zehntausendstel); das Komma sitzt fest hinter den Einern. „Zahl" steht als erste Kategorie ganz links. Im Zahl-Modus schaltet der Button **„%-Komma"** ein zweites (blaues) Komma an der Hundertstel-Stelle ein – dann erscheinen nach dem = beide Darstellungen, z. B. **1,025 = 102,5 %**. Bei „Zahl" reichen die Nachkommastellen jetzt bis **ht** und **m**. Tippt man auf eine Stelle (z. B. h), werden **die Zellen dieser und aller Stellen links davon grün unterstrichen** (die Kopfzeile bleibt unverändert); erst dann erscheint der Button **„Bruch"**, der die Zahl als Bruch mit der markierten Stelle als Nenner zeigt (h → Nenner 100, t → 1000 …; der Bruchstrich ist so lang wie die längere der beiden Zahlen). Erneutes Tippen hebt die Markierung auf.
- **Einheitenumrechner** (Mathe & Physik): rechnet gängige physikalische Größen des Schulbetriebs um –
  **Dichte, Stromstärke, Spannung, Widerstand, Länge, Fläche, Volumen, Masse, Geschwindigkeit,
  Beschleunigung, Kraft, Temperatur (°C/K/°F), Impuls, Wärmekapazität, Kapazität, Ladung, Leistung,
  Magnetische Flussdichte, Energie**. Größe wählen,
  Wert + Ausgangseinheit eingeben → alle Einheiten werden live angezeigt.
2. **Seiten-Leiste (unten rechts, senkrecht):** blättern (‹ ›), Seite hinzufügen/löschen, Zoom
   zurücksetzen. Der **Minimier-Pfeil zeigt nach unten** (⌄) – klar unterscheidbar von den
   Blätter-Pfeilen. Minimiert bleiben Minimier-Pfeil und **+** (neue Seite) sichtbar.
2b. **Seiten-Leiste (oben rechts, waagrecht):** blättern, Seite +/−, Zoom, Seitenzahl (= Übersicht).
   Lässt sich **vollständig einklappen** – dann bleibt nur der Aufklapp-Pfeil.
3. **Einstellungs-Leiste (oben links):** Projekt-Auswahl, Vollbild, **Zurück/Vor (Rückgängig)**,
   **Seite leeren**, Einstellungen (Hintergrund, Klassenlisten), Speichern, Laden, **PDF-Export**.
   Lässt sich ebenfalls **vollständig einklappen** (nur der Aufklapp-Pfeil bleibt).

**Alle Leisten weg-/hervorwischen (Präsentation):** Die **vertikale Leiste zur äußeren Kante
hinauswischen** blendet **alle** Leisten aus (die vertikale zur Seite, die beiden oberen nach oben).
Am Rand erscheinen dann kleine Griffe. **Von links in die App wischen** holt alle Leisten zurück
(vertikale Leiste **links**); **von rechts hereinwischen** holt sie zurück mit der vertikalen Leiste
**rechts** (dort auch wieder hinauswischbar). Die gewählte Seite bleibt gespeichert.

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
gleichung.html        ← eingebetteter Gleichungslöser (linear/quadratisch)
tabelle.html          ← eingebettete gewöhnliche Tabelle (Zeilen/Spalten im Kontextmenü)
geogebra.html         ← eingebettete GeoGebra-App (nutzt CDN → Internet nötig)
wuerfel.html          ← Würfel-Zufallsgenerator (Objekt)
gluecksrad.html       ← Glücksrad (Sektoren im Kontextmenü einstellbar)
bruch.html            ← Bruch mit Kreis-Sektoren-Darstellung
stellenwerttafel.html ← Stellenwerttafel (Längen/Flächen/Volumen/Massen, Komma verschieben)
umrechner.html        ← Einheitenumrechner (physikalische Größen)
pptx.js               ← einfacher PPTX-Renderer (Folien → Bilder, offline)
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

# Digitale Tafel

Eine iPad-optimierte digitale Tafel (Whiteboard) als Web-App. Läuft komplett im Browser,
funktioniert nach dem ersten Laden auch **offline** (PWA) und braucht keinen Server.

## Funktionen

- **✍️ Text** (Knopf direkt unter dem Stift): auf die Tafel tippen – **an dieser Stelle** öffnet sich
  das Schreibfeld. Die Tafel erkennt dabei, **womit** du tippst:
  - **mit dem Pencil** → ein großer, halbdurchsichtiger **Schreibbereich** zum Handschreiben;
    **iPadOS (Kritzeln) wandelt die Handschrift in Text um**. Der Bereich **wächst beim Schreiben
    mit** und hält immer eine Zeile Platz frei.
  - **mit dem Finger oder der Maus** → das schmale Feld zum Tippen wie bisher.
  Geschrieben wird gleich in der späteren **Größe und Farbe** (Text hat eine eigene Farbe neben
  Stift, Linien und Marker); ein Tipp daneben übernimmt den Text als Objekt an dieser Stelle.
  Formeln erkennt das nicht, dafür bräuchte es einen Cloud-Dienst.
- **Schreiben:** Stift (mit Apple-Pencil-Druckstärke), Marker; **eigener Farb-Button**
  (Farbe & Dicke) mit **sechs Strichstärken** (eine feinere und eine dickere als früher).
  **Stift, Linien/Formen und Marker haben getrennte Farben** (Stift und Marker zusätzlich getrennte Strichstärken): der Stift
  schreibt standardmäßig **schwarz**, Linien und Formen ebenfalls **schwarz**, der Marker **gelb**,
  der **Laserpointer rot** – auch er hat eine **eigene Farbe**: bei aktivem Laser den Farb-Button
  öffnen und eine Farbe (oder über den Regenbogen eine **beliebige eigene Farbe**) wählen.
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
  **allgemeines Dreieck**, **Parallelogramm**, **Trapez**, Pfeil (auch gefüllt), **Drachenviereck**,
  **Kreis** (aufziehen), **Raute**, **regelmäßiges Sechseck** und **Vieleck**: Ecken nacheinander antippen – ein grüner
  Ring markiert den ersten Punkt; tippt man ihn erneut an (ab drei Ecken), wird das Vieleck geschlossen und gezeichnet.
  „Rückgängig“ nimmt während des Setzens die letzte Ecke zurück. Alle neuen Formen lassen sich füllen, verschieben und skalieren,
  sowie **Schrägbilder** von **Quader, Prisma, Pyramide, Zylinder und Kegel** (mit
  gestrichelten verdeckten Kanten). Bei **Prisma** (Standard: Dreiecksprisma) und **Pyramide** (Standard: vierseitig)
  legt man im **Kontextmenü** unter „Ecken der Grundfläche“ die Eckenzahl fest (3–12); die verdeckten Kanten werden
  jeweils passend gestrichelt. Im **Kontextmenü** lassen sich bei Vielecken (Rechteck, Quadrat, Dreiecke, Parallelogramm, Trapez,
  Raute, Drachenviereck, Sechseck, Vieleck) und bei Quader, Prisma und Pyramide **„Ecken beschriften“** (A, B, C …; Pyramidenspitze S,
  Quader ABCD unten/EFGH oben) und **„Seiten/Kanten beschriften“** (a, b, c …; im Dreieck liegt a gegenüber von A) einschalten.
  Die Beschriftung steht außen an der Figur, bleibt beim Drehen waagrecht und hat die Farbe der Form; ihre **Schriftgröße**
  stellt man daneben im Kontextmenü mit − / + ein. Alle im **Formen**-Popover. Ein **erneutes Tippen auf „Formen"**
  klappt die Auswahl wieder zu (das Werkzeug bleibt aktiv). Sind Formen-Auswahl und **Farbpalette**
  gleichzeitig offen, weichen sie einander aus, statt sich zu überdecken.
- **Glatte Striche:** Auch druckabhängige Striche (Apple Pencil) werden als **Kurven** gezeichnet –
  je Messpunkt ein kurzes Kurvenstück statt gerader Verbindungen. Schnell geschriebene Bögen zeigen
  dadurch keine Polygon-Ecken mehr, ohne zusätzliche Punkte (gleicher Speicherbedarf) und sogar
  etwas schneller als vorher.
- **Freihand → Form** (Schalter „Freihand erkennen" im **Formen**-Menü): Ist er an, werden mit dem
  **Stift** gezeichnete Kritzel beim Loslassen automatisch zu einer sauberen **Linie, einem Rechteck,
  einer Ellipse oder einem Dreieck**, wenn die Zeichnung eindeutig genug ist – sonst bleibt der Strich
  als Freihand stehen. Farbe und Strichstärke werden übernommen, „Rückgängig" nimmt die Umwandlung
  zurück. Marker, Lineal-Striche und geglättete Strecken bleiben unberührt. Die Schalter „Gefüllt"
  und „Freihand erkennen" stehen kompakt direkt untereinander.
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
  ln/log, π, e, **Ans** (letztes Ergebnis), **Binomialkoeffizient** `nCr(n;k)` (Taste „nCr“, Semikolon-Taste für das zweite Argument, z. B. nCr(49;6) = 13983816),
  `x²`, **⇧ Shift** für die Umkehrfunktionen (sin⁻¹, cos⁻¹, tan⁻¹, eˣ, 10ˣ, **1/x** aus xʸ – hängt ^(-1) an, n-te Wurzel ⁿ√ als root(n;x) – z. B. root(3;27) = 3; Shift gilt für einen Tastendruck, im DEG-Modus kommt sin⁻¹ in Grad). Nach „=“ beginnt eine Zahl/Funktion/Ans eine neue Rechnung, ein Rechenzeichen rechnet mit Ans weiter. **Iteration:** erneutes „=“ wiederholt die letzte Rechnung mit dem neuen Ans (z. B. 5 = , Ans+1/Ans = = = …); die letzte Rechnung steht klein über der Anzeige; ⌫ löscht Funktionsnamen und Ans am Stück
  und **Fakultät** `n!`, umschaltbar **DEG/RAD**. Tastenanordnung: C ( ) ⌫ · ⇧ Shift x² xʸ √ · sin cos tan π · ln log n! nCr · Ziffernblock (0 , e +) · ; Ans S⇔D =; **DEG/RAD** als Umschalter oben rechts über der Anzeige. **Exakte Ergebnisse** (Taste **S⇔D** bzw. Schalter „exakt/dezimal“ über der Anzeige, wird gemerkt): Brüche (1/3+1/4 = 7/12), Vielfache von π (sin⁻¹(0,5) = π/6), Wurzelterme (cos(π/6) = √3/2, √8 = 2√2, (1+√5)/2); nicht erkennbare Zahlen (e, ln 2, sin 1) bleiben Dezimalzahlen. π und √ dürfen ohne Malpunkt stehen (2π/3, 2√3), sodass exakte Ergebnisse weiterbearbeitet werden können. **Dezimaltrennzeichen ist das Komma** (Ergebnisse z. B. 5,2), das **Semikolon** trennt Argumente (nCr(n;k), root(n;x))
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
- **Umschalter Schreiben ⇄ Werkzeuge:** ganz oben in der senkrechten Leiste ein **runder, blauer Knopf**
  (auch Laserpointer und Scheinwerfer darunter sind rund und damit abgesetzt). Er zeigt den **aktiven** Bereich (abklingende Schreibwelle mit Schwung = Schreibwerkzeuge, Mauszeiger = Auswählen & Werkzeuge); Antippen
  wechselt. Beim Wechsel zu den Schreibwerkzeugen ist sofort der **Stift** aktiv, bei den Werkzeugen das Auswählen.
  **Laserpointer und Scheinwerfer** schalten sich durch **erneutes Antippen** oder durch Tippen auf den Umschalter
  wieder aus (dann gilt wieder das zuletzt benutzte Werkzeug der aktiven Leiste, die Leiste bleibt).
- **Favoriten:** Oben in der senkrechten Leiste – gleich unter Umschalter, Laserpointer und Scheinwerfer – lassen sich bis zu
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
  - **Suchfeld** rechts neben „Drucken“ (bricht auf schmalen Bildschirmen in die nächste Zeile um): filtert die Tabelle beim Tippen (Groß-/Kleinschreibung und Umlaute egal, „weiss“ findet „Weiß“), × leert die Suche. Die Tabelle passt ihre Höhe an das Fenster an (auch bei eingeblendeten Kategorien), sodass immer bis zur letzten Zeile gescrollt werden kann. Kompakte Knöpfe und Reiter; lange Kategorienamen in der Kopfzeile brechen um, damit die Tabelle auch im schmalen Fenster (680 px) ohne seitliches Scrollen passt. Vor den Namen steht eine **Nummernspalte** (fortlaufend in der aktuellen Sortierung; beim Suchen behält jeder Name seine Nummer; bleibt wie der Name beim seitlichen Scrollen stehen). Auch der Ausdruck hat die Spalte „Nr.“ (Kästchenliste jetzt mit 24 Spalten, damit sie auf A4 passt).
  - **Klassenliste:** die Namen der aktiven Klasse **alphabetisch** in einer **scrollbaren Tabelle**
    (Kopfzeile und Namensspalte bleiben beim Scrollen stehen); dahinter je **Kategorie eine Spalte**.
    - **Art der Kategorie:** *Zähler* (Zelle antippen = **+1**), *Haken* (Zelle antippen =
      **✓ setzen/entfernen**), *Noten* oder *Frei*. Standard: ⚠️ Verwarnung, 👍 Lob, ℹ️ Hinweis,
      📚 Keine Hausaufgabe (Zähler), 📝 **Noten** und ✏️ **Frei**; die Art lässt sich unter
      „Kategorien" umstellen.
    - **Frei:** eine freie Textzeile je Kind. Zelle antippen → Eingabefeld direkt in der Tabelle,
      **Enter** oder Wegtippen speichert, **Esc** bricht ab. Lange Texte werden gekürzt angezeigt
      (vollständig beim Bearbeiten und im Druck). Sortiert wird alphabetisch nach dem Text, leere
      Zeilen ans Ende. Im Namensmenü wird die Zeile per Tipp zum Eingabefeld, ✕ löscht den Text.
    - **Noten:** Zelle (oder im Namensmenü die Kategorie) antippen → kleines Fenster mit **Note 1–6**,
      **Art gLN/kLN** (die zuletzt gewählte Art ist vorbelegt) und **Datum** (heute vorbelegt) →
      „eintragen". In der Zelle erscheinen die Noten als Kästchen (**gLN gefüllt**, kLN umrandet, Datum
      beim Antippen/Überfahren). Im selben Fenster lassen sich bisherige Noten ansehen und einzeln
      löschen – bei verborgener Klassenliste erst nach „Bisherige Noten anzeigen". Sortiert wird eine
      Notenspalte nach dem **ungewichteten Schnitt** (bester zuerst, Kinder ohne Note am Ende).
    - **Direkt in den Spalten eintragen:** Jede Zelle einer sichtbaren Spalte ist antippbar; leere
      Zellen zeigen dafür ein blasses **+** (Zähler, Noten), **○** (Haken) bzw. **✎** (Frei).
    - **Name antippen** öffnet alle Kategorien des Kindes (auch ausgeblendete) mit **+1 / −1** bzw.
      **✓ / ✕**.
    - **Spaltenkopf antippen** sortiert nach dieser Kategorie (erst meiste/abgehakte oben, erneut
      tippen = umgekehrt); „Name" sortiert wieder alphabetisch (A–Z / Z–A). Beim Antippen der Zellen
      bleibt die Reihenfolge stehen, damit die Zeilen nicht unter dem Finger wegspringen.
    - **„Anzeigen/Verbergen"** blendet alle Kategorien-Spalten ein oder aus (standardmäßig verborgen
      – praktisch, wenn die Tafel projiziert wird). Bei eingeblendeten Werten lässt sich über die
      Knöpfe **„Spalten:"** jede Kategorie **einzeln ein- oder ausblenden**.
    - Unter **„Kategorien"**: Symbol, Name und Art (Zähler/Haken/Noten/Frei) je Kategorie, löschen,
      „+ Kategorie", „Standard". „Zurücksetzen" löscht alle Zähler, Haken, Noten und Texte der Klasse.
    - **🖨 Drucken:** druckt genau das Sichtbare – Namen plus eingeblendete Spalten, in der aktuellen
      Sortierung, mit Klassenname und Datum (Noten mit Art und Datum). Bei verborgener Klassenliste
      wird nur die Namensliste gedruckt – wahlweise **nur mit Zeilen** oder mit Zeilen **und ca. 5 mm
      breiten Kästchenspalten** (26 Spalten, zum Abhaken).
    - Alle Ausdrucke (Klassenliste, Sitzplan, Dienstpläne) tragen im Kopf das **aktuelle Schuljahr**
      (z. B. „Schuljahr 2026/27"), ermittelt aus dem Ferienkalender: ab Beginn der Sommerferien gilt
      schon das neue Schuljahr.
- **🪑 Sitzplan** (Reiter im Klassen-Fenster): Reihen anlegen und darin **Einzel-, Zweier- oder
  Viererbänke** hinzufügen; für jeden Platz wird der Name aus der Klassenliste gewählt. Oben zeigt ein
  Balken **„▲ Vorne · Tafel ▲"**, wo vorne ist. Darunter stehen die noch nicht verteilten Namen (und
  eine Warnung bei doppelt eingeteilten). Dazu zwei Felder für die **Klassensprecher**.
  **🖨 Drucken** gibt den Sitzplan samt Klassensprechern aus.
- **🗒 Notizen** (Reiter im Klassen-Fenster): ein großes Notizfeld zur aktiven Klasse, wird mit
  dem Projekt gespeichert (und exportiert).
- **📅 Termine** (vierter Reiter): **Monatskalender** (‹ › blättern, „Heute"; Punkte zeigen Einträge:
  blau = Termin, orange = Erinnerung). Tag antippen → Einträge des Tages; darunter das Formular:
  - **Termin** mit Titel, Datum, Uhrzeit und optional **„vorher erinnern"** (5/10/15/30 Min, 1 Std,
    1 Tag, 2 Tage, 5 Tage, 1 Woche). Zur Termin-Zeit – und bei gewählter Erinnerung zusätzlich vorher – erscheint oben rechts
    auf der Tafel ein **Popup mit Gong**, das sich mit × oder „Schließen" wegklicken lässt.
  - **Erinnerung** mit Titel, Datum und Uhrzeit: poppt zur Zeit auf und lässt sich dort mit
    **„✓ Erledigt"** abhaken oder **„In 10 Min erneut"** verschieben. Offene Erinnerungen, die fällig
    wurden, während die Tafel geschlossen war, erscheinen beim nächsten Öffnen; verpasste Termine
    werden nur bis 12 Stunden danach noch angezeigt.
  - Unter **„Anstehend"** stehen die nächsten Termine und alle offenen Erinnerungen (überfällige rot);
    ✓ markiert eine Erinnerung als erledigt (↺ öffnet sie wieder), × löscht einen Eintrag.
  - Popups erscheinen **nur für die aktive Klasse** – fällige Einträge einer anderen Klasse kommen
    spätestens, wenn du dieses Projekt öffnest. Gespeichert werden alle Termine geräteweit; der
    Kalender zeigt die Einträge der aktiven Klasse, mit **„alle Klassen"** alle (mit Klassennamen).
  - **🏖 Schulferien (Bayern)** lassen sich einblenden (Ferientage sind im Kalender hell hinterlegt).
    Voreingetragen sind die **amtlichen bayerischen Ferientermine 2025–2030** (aus dem iCal-Export des
    Kultusministeriums). Unter „bearbeiten" lässt sich jeder Zeitraum ändern, löschen oder ergänzen
    („+ Zeitraum", „Standard (Bayern)"); die Liste gilt geräteweit.
  - **📥 .ics importieren:** Beliebige Ferienkalender im **iCal-Format** (z. B. der Download von
    km.bayern.de oder das eigene Bundesland) einlesen – auf Nachfrage **ersetzend** oder **ergänzend**.
    Erkannt werden ganztägige Einträge (das Ende in der Datei ist der Folgetag und wird korrekt
    umgerechnet), umbrochene Zeilen und Einträge mit Uhrzeit.
  - **🧹 Dienste:** Es lassen sich **mehrere Dienstpläne** anlegen (z. B. Putzdienst, Tafeldienst).
    Über die Knöpfe oben im Dienst-Bereich wechselst du zwischen ihnen, **„+ Dienst"** legt einen
    neuen an, „Dienst löschen" entfernt den gewählten; der Schalter rechts schaltet **den gewählten**
    Dienst ein oder aus (ausgeschaltete sind an „(aus)" erkennbar). Kalender, Tagesliste, „Anstehend",
    Erinnerungen und Druck berücksichtigen **alle eingeschalteten** Dienste.
    Je Dienst: Aufgabe (z. B. Putzdienst), **Gruppengröße**, **Rhythmus** (täglich an Schultagen,
    wöchentlich, zweiwöchentlich) und Startdatum. „Gruppen bilden" teilt die Klassenliste
    alphabetisch, „Neu mischen" zufällig. Die Tafel zeigt den **aktuellen Dienst** und die nächsten
    Zeiträume; im Kalender steht die Gruppe am jeweiligen Tag. **Ferien bleiben frei** – dort ruht der
    Dienst und die Reihenfolge rückt nicht weiter. Gedruckt werden die nächsten Zeiträume.
    Der Dienst erscheint auch **im Kalender**: der erste Tag jedes Zeitraums bekommt einen **grünen
    Punkt**, und unter „Anstehend" stehen die nächsten Dienst-Zeiträume zwischen den Terminen.
    Mit **„🔔 Erinnerung zum Dienstbeginn um …"** poppt zu Beginn jedes Zeitraums ein Fenster mit der
    **Gruppe und ihren Namen** auf (einmal je Zeitraum und Dienst; war die Tafel zu, kommt es beim
    nächsten Öffnen). **🖨 Dienstpläne** druckt alle eingeschalteten Dienste nacheinander.
- Das Klassen-Fenster („Klassenliste & Aufgaben") ist 720 px breit; **„🖨 Drucken"** steht mit
  „Anzeigen/Verbergen", „Kategorien" und „Zurücksetzen" in einer Zeile. Reihenfolge der Reiter:
  **Klassenliste · Termine · Sitzplan · Sticker · Notizen**, beim Öffnen ist die Klassenliste aktiv.
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
- **Diktierstift** (Schreibwerkzeuge, Mikrofon-Symbol): an die gewünschte Stelle tippen und sprechen – der
  erkannte Text erscheint live in einem Textfeld (Deutsch, Web-Spracherkennung von Safari/Siri). Gesprochene
  Satzzeichen: „Punkt“, „Komma“, „Fragezeichen“, „Ausrufezeichen“, „Doppelpunkt“, „neue Zeile“ („Punkt A“ bleibt
  als Wort stehen). „■ Stopp“ beendet das Zuhören und lässt das Textfeld mit Tastatur offen, um den Text zu korrigieren; „✓ Fertig“ oder Wegtippen übernimmt den Text als normales Textobjekt (Farbe wie beim Text). Mit dem Diktierstift auf einen vorhandenen Text tippen = dort weiterdiktieren; Doppeltipp (Auswahl) öffnet jeden Text zum Bearbeiten.
  Während des Diktats bleibt die Bildschirmtastatur zu. Ist die Spracherkennung nicht verfügbar oder nicht
  erlaubt, bleibt das Textfeld offen – dann die **Mikrofon-Taste der iPad-Tastatur** zum Diktieren nutzen.
  Hinweis: Safari braucht dafür „Siri & Diktat“ und eine Internetverbindung.
- **Mindmap** (Schreibwerkzeuge): Thema in der Mitte; **+ Unterpunkt** / **+ Nachbar** hängen Äste an
  (neuer Knoten wird automatisch frei platziert und sofort beschriftet), Knoten **antippen** = auswählen,
  **nochmal antippen** = Text ändern (Enter fertig, Esc abbrechen, Tab = weiterer Unterpunkt), **ziehen** =
  verschieben (Unterpunkte wandern mit), **🎙** diktiert den Knotentext, **🗑** löscht einen Ast, **🎨** färbt
  einen Ast, **↶** Rückgängig, **⟳ Ordnen** ordnet alles kreisförmig ohne Überlappungen an, **A−/A+** sowie
  Schrift (fett/kursiv) im Kontextmenü, **🖼 Tafel / 📋 Kopieren** als Bild. Passt sich automatisch der
  Objektgröße an; auch „Als eigene Seite anzeigen“.
- **Gleichungslöser** (Mathe & Physik): bewegliches Objekt mit großem Eingabefeld und zwei Modi:
  - **Gleichung** (Variable x): tippt man z. B. `2x+3=7`, `x^2-5x+6=0` oder `3/(x-2)=2/(x+1)`.
    **Lineare, quadratische und Bruchgleichungen** werden mit Lösungsweg gelöst – bei Bruchgleichungen
    mit **Definitionsmenge 𝔻**, **Hauptnenner** (in Linearfaktoren), der Gleichung nach dem
    Multiplizieren (ganzzahlig), ggf. Diskriminante und **Lösungsmenge 𝕃**. Lösungen, die nicht in 𝔻
    liegen, werden rot als „entfällt" markiert (z. B. `x/(x-2)=2/(x-2)`). Ergebnisse als **Bruch**
    (z. B. −3/5), sonst gerundet; höhere Grade werden numerisch gelöst. `:` = geteilt, Komma als
    Dezimalzeichen möglich.
  - **Einfache trigonometrische Gleichungen** (sin, cos, tan mit linearem Argument, z. B. `2sin(x)=1`,
    `cos(2x+30)=0,5`, auch quadratisch wie `2sin^2(x)-sin(x)-1=0` per Substitution): allgemeine Lösung
    mit k ∈ ℤ und alle Lösungen in [0°; 360°[. Umschalter **Grad / Bogenmaß** (dann z. B. π/6, 5π/12).
    Unmögliche Werte (|sin| > 1) werden rot markiert.
  - **Einfache Exponential- und Logarithmusgleichungen:** `3*2^x=48` (Umformen + log₂),
    `8^x=4^(x+1)` (gleiche Basis → Exponentenvergleich), `2^x=3^(x-1)` (logarithmieren),
    `e^(2x)-3e^x+2=0` (Substitution u = eˣ, u ≤ 0 entfällt), `ln(2x-1)=3`, `lg(x)=2` (mit Definitionsmenge).
  - **Schriftgröße:** Knöpfe **A− / A+** oben im Werkzeug (auch über das Kontextmenü, dort zusätzlich fett/kursiv); die Formel-Tastatur behält ihre Größe.
  - **Formel-Tastatur** (Knopf „⌨ Formeln"): Ziffern, Rechenzeichen, Klammern, x, π, °, sin/cos/tan,
    eˣ, ln, lg, √, x² – wie in der Tabellenkalkulation; die iPad-Tastatur bleibt dabei zu. „ABC" wechselt
    zur normalen Tastatur, „✓ Fertig" schließt sie (bei Gleichungssystemen: nächste Zeile).
  - **Gleichungssystem** mit **2 Unbekannten (x, y)** oder **3 Unbekannten (x, y, z)**: Gleichungen I–III
    eintippen → geordnete Form, **Stufenform (Gauß-Verfahren)**, Lösung und Lösungsmenge
    (z. B. 𝕃 = {(1 | 2 | 3)}); erkennt auch **keine Lösung** (Widerspruch 0 = 1) und **unendlich viele
    Lösungen** (mit Parameter t bzw. t, s).
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
  (Eck- und Kantengriffe = Größe, Kreis oben = drehen). Beim Ziehen an einem Griff bleibt die **gegenüberliegende
  Kante bzw. Ecke stehen** – das Objekt wächst nur in Zugrichtung (auch bei gedrehten Objekten).
  Im Kontextmenü unter **Drehung** (mit Anzeige des aktuellen Winkels): **⟲ 90° / ⟳ 90°** dreht exakt um 90°,
  **⊾ Gerade ausrichten** richtet schräg (z. B. mit zwei Fingern) gedrehte Objekte auf das nächste Vielfache von 90° aus.
  Mehrere bzw. gruppierte Objekte drehen gemeinsam um ihre gemeinsame Mitte. Am Objekt erscheint ein **kleiner Button (☰)** –
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
- **Pinnwand** (Werkzeuge, direkt über dem QR-Code): Karten anheften wie auf einer Korkwand.
  **+ Karte** öffnet einen Dialog mit Text (auch **🎙 Diktieren**), **Farbe** (7 Zettelfarben), **Bild**
  (Foto/Kamera, wird verkleinert gespeichert), **Link** (antippbar), **👍-Zähler** und **Namen aus der Klassenliste** der aktiven Klasse (Auswahlliste getrennt nach „noch nicht vergeben“ / „schon auf anderen Karten“, **🎲 Zufall** wählt bevorzugt einen noch freien Namen, mehrere Namen pro Karte, × entfernt; ohne Klassenliste Namen eintippen) – die Namen stehen mit 👤 auf der Karte; ✎ auf der Karte oder
  Doppeltipp bearbeitet, dort auch **Löschen** und **Kopie**. Ansicht **✥ Frei** (Karten mit Pin beliebig
  ziehen, **▦** ordnet im Raster) oder **▥ Spalten** (Spalten anlegen, per Antippen umbenennen, ✕ löschen;
  Karten seitlich bzw. nach kurzem Halten zwischen Spalten ziehen, senkrecht wischen blättert). **👍** auf der
  Karte zählt hoch, **⇅ 👍** sortiert nach Likes, **🔀** mischt, **🙈 Verdecken** dreht alle Karten um (einzeln
  antippen deckt auf), Hintergrund **Kork/Hell/Tafelgrün**, **↶** Rückgängig, **A−/A+** und Schrift im
  Kontextmenü, **🖼 Tafel / 📋 Kopieren** als Bild. Hinweis: Die Pinnwand liegt nur auf diesem iPad – Schüler
  können nicht von eigenen Geräten aus Karten hinzufügen.
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
  Malpunkte dürfen fehlen (`2x`, `ax^2+bx+c`, `3(x+1)`, `2sin(x)`, `(x+1)(x−1)`),
  der Graph wird gezeichnet; im Bedien-Modus mit **Fingergeste zoom-/verschiebbar**. Über **„＋ Funktion"**
  lassen sich **mehrere Funktionen gleichzeitig** anzeigen (je eigene Farbe, eigene Eingabezeile, mit „×"
  entfernbar); die **Parameter a/b/c wirken auf alle Funktionen gemeinsam**. **Farbe und Linienstärke**
  im **Kontextmenü** wirken auf den **aktiven Graphen** (die farblich hervorgehobene Eingabezeile –
  im Bedien-Modus die Zeile antippen, um sie auszuwählen). **⌨ Formeln** blendet eine **Formel-Tastatur** ein (Ziffern, x, a/b/c, + − × ÷ ^ ², Klammern, sin/cos/tan, √, ln, eˣ, |x|, π – schreibt in die aktive Eingabezeile, die iPad-Tastatur bleibt zu; „ABC“ wechselt zur normalen Tastatur). **A−/A+** (neben „Ansicht“) für die Schriftgröße – Achsenbeschriftung, Eingabezeilen und Parameterregler wachsen mit (auch im Kontextmenü, dort zusätzlich fett/kursiv); **🖼 Tafel / 📋 Kopieren**: Graph mit
  Legende (Terme, Parameterwerte) als Bild neben das Werkzeug legen bzw. in die Zwischenablage kopieren.
- **Vierfeldertafel** (Werkzeug): 2×2-Tabelle mit editierbaren Beschriftungen. **Alle neun Felder** (vier innere,
  Zeilen- und Spaltensummen, Gesamt) sind eintragbar – beliebige gegebene Werte eintragen und **„Berechnen“** tippen:
  fehlende Felder werden **blau** ergänzt. Eingaben als Zahl, Dezimalzahl (Punkt oder Komma), Bruch (`1/4`) oder
  Prozent (`30 %`); das Ergebnis erscheint im selben Stil. **Wahrscheinlichkeiten** (Prozent, Brüche oder nur Werte
  zwischen 0 und 1): die Gesamtsumme ist **fest 1 bzw. 100 %** (ein anderer Wert wird als Fehler gemeldet). **Absolute
  Zahlen** (Werte größer 1): Gesamt = Stichprobenumfang, frei; Mischen von Prozent und absoluten Zahlen wird gemeldet. Hinweise bei **nicht eindeutigen** Angaben, **Widersprüchen** und **negativen Werten**.
  Ändert man eine Eingabe, verschwinden die berechneten Werte bis zum nächsten „Berechnen“; ein überschriebenes blaues
  Feld wird zur Vorgabe. „Berechnete leeren“ / „Alles leeren“. Ältere Tafeln (nur innere Felder) werden automatisch ergänzt. Die Schriftgröße aus dem Kontextmenü gilt für Ereignisse, **Gegenereignisse und das Σ-Zeichen** gleichermaßen. Oben rechts: **A−/A+** für die Schriftgröße (auch im Kontextmenü) und **🖼 Tafel / 📋 Kopieren**: Tabelle als Bild.
- **Baumdiagramm** (Werkzeug): Stufen und Verzweigungen einstellbar. Wahrscheinlichkeiten **an die Äste und/oder
  rechts an die Pfade** (Pfadwahrscheinlichkeiten) eintragen – beliebig gemischt – und **„Berechnen“** tippen: fehlende
  Werte werden **blau** ergänzt (Astsumme = 1, Pfadregel, Summenregel; z. B. aus P(A) und zwei Pfadwahrscheinlichkeiten
  den ganzen Baum). Eingaben als Dezimalzahl, Bruch oder Prozent, Ergebnis im selben Stil; Hinweise bei nicht eindeutigen
  Angaben, Widersprüchen oder Werten außerhalb von 0 bis 1. Ändern einer Eingabe entfernt die berechneten Werte bis zum
  nächsten „Berechnen“; „Berechnete leeren“. Ältere Bäume zeigen ihre Pfadprodukte wie bisher. Über jedem Knoten lässt sich per Tipp ein **Ereignisname** eintragen – die Eingabe `nichtA` erscheint als **Ā** (A mit Querstrich). Oben kann zusätzlich ein **Stichprobenumfang n** eingegeben werden; ist er gesetzt, stehen unter den Ereignissen die **absoluten Häufigkeiten** n·P(Pfad) (an der Wurzel n selbst). Oben rechts: **A−/A+** für die Schriftgröße (auch im Kontextmenü) und **🖼 Tafel / 📋 Kopieren**: Baum als Bild.
- **Wahrscheinlichkeitsrechner** (Werkzeug): Binomial- und Normalverteilung – Wahrscheinlichkeiten
  (=, ≤, <, ≥, >, zwischen) mit Histogramm bzw. Glockenkurve und markiertem Bereich; bei Binomial
  zusätzlich eine **scrollbare Wertetabelle** (k, P(X=k), P(X≤k)). Rechts neben dem Ergebnis: **A−/A+** für die Schriftgröße (auch im Kontextmenü) und **🖼 Tafel / 📋 Kopieren** –
  Eingaben, Ergebnis, Diagramm und sichtbarer Teil der Tabelle als Bild.
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
   und ein **Mathe & Physik**-Button (Gleichungslöser, Funktionsplotter, **Ableitungen**, **Einheitskreis**, **3D-Koordinatensystem**, Vierfeldertafel, Baumdiagramm,
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
  **Komma und die zugehörige Einheit werden rot hervorgehoben**. Unten rechts: **A−/A+** für die Schriftgröße (auch im Kontextmenü) sowie **🖼 Tafel / 📋 Kopieren** – die Tafel (ohne Löschknöpfe) als Bild neben das Werkzeug legen bzw. in die Zwischenablage kopieren. Mit **„＋ Zeile"** lassen sich
  weitere Zahlen-Zeilen hinzufügen; jede Zeile zeigt ihren Wert in der gewählten Einheit. Die Schriftgröße im Kontextmenü vergrößert jetzt auch **Zellenbreite und -höhe**. Neue Kategorie **„Zahl"**: Stellen vor dem Komma **E, Z, H, T, ZT, HT, M** (Einer bis Millionen), nach dem Komma **z, h, t, zt** (Zehntel bis Zehntausendstel); das Komma sitzt fest hinter den Einern. „Zahl" steht als erste Kategorie ganz links. Im Zahl-Modus schaltet der Button **„%-Komma"** ein zweites (blaues) Komma an der Hundertstel-Stelle ein – dann erscheinen nach dem = beide Darstellungen, z. B. **1,025 = 102,5 %**. Bei „Zahl" reichen die Nachkommastellen jetzt bis **ht** und **m**. Tippt man auf eine Stelle (z. B. h), werden **die Zellen dieser und aller Stellen links davon grün unterstrichen** (die Kopfzeile bleibt unverändert); erst dann erscheint der Button **„Bruch"**, der die Zahl als Bruch mit der markierten Stelle als Nenner zeigt (h → Nenner 100, t → 1000 …; der Bruchstrich ist so lang wie die längere der beiden Zahlen). Erneutes Tippen hebt die Markierung auf.
- **Einheitskreis** (Mathe & Physik): interaktiver Einheitskreis, Schriftgröße mit **A−/A+** direkt im
  Werkzeug (rechts unten) oder im **Kontextmenü** (＋/−, fett, kursiv). **🖼 Tafel / 📋 Kopieren**: Kreis samt
  Werten (ohne Bedienknöpfe) als Bild neben das Werkzeug legen bzw. in die Zwischenablage kopieren. Bedienen über „Einbettung bedienen". Zwei Modi:
  - **Winkel → Werte:** Punkt P auf dem Kreis ziehen (oder irgendwo in die Kreisfläche tippen), Winkel
    eintippen (auch im Bogenmaß, z. B. `2π/3`) oder per Schieberegler. Angezeigt werden **sin α (rot)**,
    **cos α (blau)** und **tan α (grün, Abschnitt auf der Tangente x = 1)** – jeweils mit den Knöpfen
    ein-/ausblendbar – als Strecken im Kreis und als Werte, bei besonderen Winkeln **exakt**
    (z. B. ½√3 ≈ 0,866; tan 90° „nicht definiert"), dazu der Quadrant mit den Vorzeichen.
  - **Wert → Winkel:** sin, cos oder tan wählen, Wert eintippen (`0,5`, `1/2`, `½√3`, `-√2/2` …) oder den
    farbigen Anfasser auf der Achse bzw. Tangente ziehen → beide Winkel **α₁, α₂ im Bereich
    0° ≤ α < 360°** in Grad und Bogenmaß, mit Punkten P₁, P₂ im Kreis und Symmetrie-Hinweis; bei
    |sin α| > 1 bzw. |cos α| > 1 „keine Lösung".
  - **Einrasten:** besondere Winkel (Vielfache von 30° und 45°) und die zugehörigen Werte
    (0, ±½, ±½√2, ±½√3, ±1; bei tan 0, ±⅓√3, ±1, ±√3) rasten beim Ziehen ein; ohne Einrasten ganze Grad
    bzw. Hundertstel. **Besondere Winkel** markiert diese am Kreis, **Bogenmaß** beschriftet sie mit π.
- **Stromkreis** (Mathe & Physik): Schaltungen zeichnen und simulieren. Einfügen als eigene Seite oder
  bewegliches Objekt; Schriftgröße über **A−/A+** im Werkzeug oder im **Kontextmenü** (dort auch fett/kursiv) –
  eine Änderung dort setzt die laufende Simulation (z. B. geladene Kondensatoren) nicht zurück.
  - **Bauteile:** Quelle (Gleichspannung, U einstellbar), **Wechselspannungsquelle** (Scheitelwert Û und
    **Frequenz f** einstellbar, z. B. 0,5 Hz zum Zuschauen), Schalter, **Wechselschalter**, Widerstand,
    Lampe (leuchtet je nach Leistung), Diode, **Transistor (NPN)**, Motor (dreht sich je nach Strom),
    **Spule** (mit 5 Ω Drahtwiderstand), **Kondensator**, **Strommesser** und **Spannungsmesser**.
  - **Zeichnen:** Bauteil wählen und antippen (waagrecht) oder in eine Richtung ziehen; auf eine
    Leitung gesetzt ersetzt es das Leitungsstück. „Leitung" von Gitterpunkt zu Gitterpunkt ziehen
    (Ecken automatisch); Verzweigungen bekommen einen Knotenpunkt. Auswahl: antippen = auswählen,
    ziehen = verschieben, Schalter/Wechselschalter antippen = umlegen. Eigenschaften oben: Wert mit −/+
    oder Eingabe, **↻ Drehen**, **⇄ Umpolen**, **⇅ Spiegeln**, Löschen. Radierer, Zurück/Vor.
  - **Rechnen:** Knotenanalyse – Reihen-, Parallel- und gemischte Schaltungen; Werte **U, I** und
    **R/C/L** einblendbar, Messgeräte zeigen ihren Messwert immer. Kondensator lädt/entlädt sich,
    Spule verzögert den Stromanstieg, Wechselspannung wechselt die Richtung, Diode sperrt,
    Transistor sperrt/verstärkt/schaltet durch. Warnung bei **Kurzschluss**.
  - **Ladungen fließen** bei geschlossenem Stromkreis – als **Elektronen** (− → +) oder positive
    Ladungen (technische Stromrichtung), Geschwindigkeit je nach Stromstärke; nicht durch den Kondensator.
  - **Vorlagen:** einfacher Stromkreis, Reihen-, Parallel-, gemischte Schaltung, Diode, Messgeräte,
    Kondensator laden/entladen, Wechselspannung, Transistor als Schalter, Spule, leeres Blatt.
  - **📈 Diagramm:** Bauteil antippen → „📈 Diagramm" blendet ein verschiebbares Fenster mit dem
    **zeitlichen Verlauf von Spannung U und Stromstärke I** an diesem Bauteil ein (Nulllinien beider
    Achsen auf gleicher Höhe, beim Transistor U_CE und I_C, bei Quellen der abgegebene Strom). U/I
    einzeln ein-/ausblendbar, Zeitfenster 5–60 s, ⏸ anhalten, 🖼 Diagramm als Bild auf die Tafel. Das
    Bauteil ist in der Schaltung grün gestrichelt markiert. Gut sichtbar z. B. Laden/Entladen des
    Kondensators, Einschaltverzögerung der Spule oder die Gleichrichtung an der Diode.
  - **Datei:** **Neu** (leere Schaltung), **Speichern** (als `.json`-Datei, Name wählbar – auf dem iPad z. B. in
    „Dateien“), **Laden** (gespeicherte Datei öffnen). Bei nicht gespeicherten Änderungen wird nachgefragt.
  - **Eigenständig nutzbar:** `stromkreis.html` direkt im Browser öffnen (…/tafel/stromkreis.html). Dann gibt es
    zusätzlich **Schließen**, und die zuletzt bearbeitete Schaltung wird im Browser gemerkt und beim nächsten
    Öffnen wiederhergestellt („Auf die Tafel“ entfällt, Kopieren bleibt).
  - **🖼 Bild → Tafel** (rechts in der zweiten Zeile, immer sichtbar – auch wenn ein Bauteil ausgewählt ist) legt die Schaltung als Bild neben das Werkzeug; **📋 Kopieren** kopiert sie als
    Bild in die Zwischenablage.
- **Ableitungen** (Mathe & Physik): die Lernumgebung „Zusammenhänge von F · f · f′ · f″" als Werkzeug.
  Beim Einfügen fragt die Tafel „eigene Seite oder bewegliches Objekt" (im Kontextmenü auch später
  „Als eigene Seite anzeigen"). Bedienen über „Einbettung bedienen": Ausgangsfunktion (F, f, f′, f″),
  Funktionstyp mit Parametern, eigener Term, Freihand-Zeichnen, Graphen ein-/ausblenden mit C-Reglern,
  Analyse-Knöpfe VZ/M/K, Tangente, Fläche/Integral, Intervalle, Symbolleiste, Ableitungsrelation,
  Krümmungs-Smileys, Linienstil, Anleitung (?). Der eingestellte Zustand (Funktion, Parameter, sichtbare
  Graphen, Analyse-Knöpfe, Zoom, Farben, Freihand-Kurve) wird **mit dem Tafel-Projekt gespeichert**.
- **3D-Koordinatensystem** (Mathe & Physik): räumliches Koordinatensystem im **Schrägbild** wie im
  Heft (x₁ schräg nach vorne, x₂ nach rechts, x₃ nach oben); Achsen **x₁ x₂ x₃ oder x y z** umschaltbar.
  Schriftgröße mit **A−/A+** oben in der Zeichenfläche oder im **Kontextmenü** (＋/−, fett, kursiv). Bedienen über
  „Einbettung bedienen". **🖼 Tafel / 📋 Kopieren**: Zeichnung mit Legende der sichtbaren Objekte als Bild neben das
  Werkzeug legen bzw. in die Zwischenablage kopieren.
  - **Ansicht:** mit einem Finger **drehen**, mit zwei Fingern **zoomen/verschieben**, −/＋ zum Zoomen,
    „Schrägbild" setzt die Ansicht zurück. **Bereich** (± 2 … 20) einstellbar, **Gitter** in der
    x₁x₂-Ebene, **Hilfslinien** zu Punkten (Koordinatenquader), **Koordinaten** an Punkten.
  - **Objekte eintippen** (mit eigener **Formel-Tastatur**: X =, λ, μ, x₁…x₃, ∘, |, Namen):
    Punkte `A(2|3|1)` (auch `A(2;3;1)`, `A = B + 2·(1|0|0)`), Geraden `g: X = (1|0|2) + λ·(2|1|−1)`,
    `h: AB`, Ebenen in **Koordinatenform** `E: 2x₁ + x₂ − x₃ = 4`, **Parameterform**
    `F: X = … + λ·… + μ·…`, **Normalenform** `G: (X − (1|1|1)) ∘ (0|0|1) = 0` oder durch drei Punkte
    `E: ABC`. Objekte, die auf Punkten aufbauen, ändern sich mit, wenn man den Punkt bearbeitet.
    Die Eingabe wird sofort geprüft (✓ bzw. Fehlermeldung).
  - **Liste:** Farbe antippen = wechseln, ✎ bearbeiten, 👁 ein-/ausblenden, ✕ löschen; Antippen
    hebt das Objekt in der Zeichnung hervor. Unter jeder Ebene steht ihre Koordinatenform.
  - **Darstellung:** Ebenen halbdurchsichtig (am Würfel abgeschnitten oder als **Spurdreieck**),
    **verdeckte Teile** von Achsen und Geraden gestrichelt, verdeckte Punkte hohl.
    **Spurpunkte** (S₁, S₂, S₃ bei Ebenen; S₁₂, S₁₃, S₂₃ bei Geraden) und Spurgeraden einblendbar.
  - **Berechnen** (ein oder zwei Objekte wählen): Koordinaten-, Normalen- und Parameterform einer
    Ebene, Normalenvektor, Spurpunkte, Abstand zum Ursprung; Abstand, Verbindungsvektor und
    Mittelpunkt zweier Punkte; **Punktprobe**, Lotfußpunkt, Spiegelpunkt und **Abstand Punkt–Gerade/Ebene**;
    **Lage zweier Geraden** (identisch, parallel mit Abstand, Schnittpunkt mit Winkel, windschief mit
    Abstand); **Gerade–Ebene** (liegt in, parallel mit Abstand, Schnittpunkt + Schnittwinkel);
    **Ebene–Ebene** (identisch, parallel mit Abstand, Schnittgerade + Schnittwinkel). Ergebnisse
    exakt (Brüche, Wurzeln wie 2√6/3 ≈ 1,633); Schnittpunkte, Lotfußpunkte, Schnittgeraden usw. lassen
    sich mit einem Knopf **einzeichnen**.
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
gleichung.html        ← eingebetteter Gleichungslöser (linear/quadratisch/Bruch-, trig., Exponential-/Log-Gleichungen, LGS; Formel-Tastatur)
tabelle.html          ← eingebettete gewöhnliche Tabelle (Zeilen/Spalten im Kontextmenü)
geogebra.html         ← eingebettete GeoGebra-App (nutzt CDN → Internet nötig)
wuerfel.html          ← Würfel-Zufallsgenerator (Objekt)
gluecksrad.html       ← Glücksrad (Sektoren im Kontextmenü einstellbar)
bruch.html            ← Bruch mit Kreis-Sektoren-Darstellung
stellenwerttafel.html ← Stellenwerttafel (Längen/Flächen/Volumen/Massen, Komma verschieben)
umrechner.html        ← Einheitenumrechner (physikalische Größen)
einheitskreis.html    ← interaktiver Einheitskreis (sin/cos/tan, Winkel ↔ Werte)
raum.html             ← 3D-Koordinatensystem (Punkte, Geraden, Ebenen, Lagebeziehungen)
ableitungen.html      ← Lernumgebung F · f · f′ · f″ (Ableitungen/Stammfunktionen), mit Zustands-Sync
stromkreis.html       ← Stromkreis-Editor mit Simulation (U, I, R, C, L, Ladungsfluss, Bild-Export)
pptx.js               ← einfacher PPTX-Renderer (Folien → Bilder, offline)
shot.js               ← Werkzeug als Bild: auf die Tafel legen / in die Zwischenablage kopieren
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

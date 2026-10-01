/* Fertige Argumentationsketten für das Reihenfolge-Werkzeug
   ---------------------------------------------------------
   Jede Aufgabe ist eine Kette von Schritten in der richtigen Reihenfolge:
   von der Voraussetzung über die Begründungen bis zum Ergebnis.
   Aufbau je Eintrag: { f:Fach, j:Jahrgangsstufe, g:Themenbereich, t:Titel, s:[Schritte] }
*/
(function(){
"use strict";

const A=[

{f:'M', j:8, g:'Kreis und Satz des Thales', t:'Beweis: Satz des Thales', s:[
 'Gegeben ist ein Halbkreis über der Strecke AB mit dem Mittelpunkt M. Der Punkt C liegt auf dem Halbkreis.',
 'Behauptung: Das Dreieck ABC hat bei C einen rechten Winkel.',
 'Weil M der Mittelpunkt ist, sind MA, MB und MC Radien desselben Kreises und damit gleich lang.',
 'Das Dreieck AMC hat somit zwei gleich lange Seiten, es ist gleichschenklig.',
 'In einem gleichschenkligen Dreieck sind die Basiswinkel gleich groß: Der Winkel bei A ist also so groß wie der Winkel bei C im Teildreieck AMC. Wir nennen ihn Alpha.',
 'Ebenso ist das Dreieck BMC gleichschenklig; der Winkel bei B ist so groß wie der Winkel bei C im Teildreieck BMC. Wir nennen ihn Beta.',
 'Der gesamte Winkel bei C setzt sich aus diesen beiden Teilwinkeln zusammen, er beträgt also Alpha plus Beta.',
 'Die Winkelsumme im Dreieck ABC beträgt 180°, also gilt: Alpha + Beta + (Alpha + Beta) = 180°.',
 'Daraus folgt 2 · (Alpha + Beta) = 180°, also Alpha + Beta = 90°.',
 'Der Winkel bei C misst genau Alpha + Beta und damit 90°: Das Dreieck ist rechtwinklig. Damit ist die Behauptung bewiesen.'
]},

{f:'M', j:9, g:'Quadratwurzeln', t:'Beweis: Wurzel 2 ist irrational', s:[
 'Behauptung: Die Wurzel aus 2 lässt sich nicht als Bruch ganzer Zahlen schreiben.',
 'Wir führen einen Widerspruchsbeweis und nehmen das Gegenteil an.',
 'Annahme: Es gibt ganze Zahlen p und q mit q ungleich 0, sodass Wurzel 2 = p/q gilt und der Bruch vollständig gekürzt ist. p und q haben also keinen gemeinsamen Teiler außer 1.',
 'Quadrieren beider Seiten ergibt 2 = p² / q².',
 'Multiplizieren mit q² liefert p² = 2 · q².',
 'Die rechte Seite ist das Doppelte einer ganzen Zahl, also ist p² eine gerade Zahl.',
 'Das Quadrat einer ungeraden Zahl ist stets ungerade. Weil p² gerade ist, muss daher auch p selbst gerade sein.',
 'Also lässt sich p als p = 2k mit einer ganzen Zahl k schreiben.',
 'Einsetzen ergibt (2k)² = 2 · q², also 4k² = 2q² und damit q² = 2k².',
 'Mit derselben Überlegung wie zuvor folgt: q² ist gerade, also ist auch q gerade.',
 'Damit sind p und q beide gerade und haben den gemeinsamen Teiler 2. Das widerspricht der Annahme, dass der Bruch vollständig gekürzt war.',
 'Die Annahme muss also falsch sein. Die Wurzel aus 2 ist nicht als Bruch darstellbar, sie ist irrational.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Magnetkugel fällt durch ein Kupferrohr', s:[
 'Eine Magnetkugel wird oben in ein senkrechtes Kupferrohr fallen gelassen. Sie braucht für einen Meter mehrere Sekunden, im gleich langen Kunststoffrohr nur Sekundenbruchteile.',
 'Kupfer ist nicht magnetisch. Die Bremsung kann also nicht an einer gewöhnlichen magnetischen Anziehung liegen.',
 'Die Kugel bewegt sich, und mit ihr bewegt sich auch ihr Magnetfeld.',
 'Für jeden gedachten Ring der Rohrwand ändert sich dadurch der magnetische Fluss, der ihn durchsetzt.',
 'Nach dem Induktionsgesetz wird bei jeder Flussänderung eine Spannung induziert.',
 'Kupfer leitet sehr gut, und die Ringe der Rohrwand sind in sich geschlossen. Die induzierte Spannung treibt deshalb sofort einen Strom an: Es fließen Wirbelströme.',
 'Jeder dieser Wirbelströme erzeugt selbst ein Magnetfeld.',
 'In welche Richtung fließt der Strom? Darüber entscheidet die Energiebilanz.',
 'Vergleiche dazu die beiden Rohre: Durch dieselbe Höhe wird in beiden Fällen dieselbe Lageenergie abgegeben.',
 'Im Kupferrohr kommt die Kugel jedoch viel langsamer unten an, sie hat dort also deutlich weniger Bewegungsenergie als beim freien Fall.',
 'Diese fehlende Energie kann nicht verschwunden sein. Sie wurde in elektrische Energie der Wirbelströme umgewandelt und über den Widerstand des Kupfers in innere Energie.',
 'Angenommen, das induzierte Feld würde die Kugel stattdessen beschleunigen: Dann käme sie schneller an als im freien Fall und zusätzlich flösse Strom. Energie entstünde aus dem Nichts.',
 'Das ist unmöglich. Das induzierte Feld muss also seiner Ursache entgegenwirken und die Kugel bremsen. Genau das besagt die lenzsche Regel.',
 'Konkret heißt das: Unterhalb der Kugel wirkt das induzierte Feld abstoßend, oberhalb der Kugel anziehend. Beide Kräfte zeigen nach oben.',
 'Die bremsende Kraft wächst mit der Geschwindigkeit. Sobald sie so groß wie die Gewichtskraft ist, sinkt die Kugel mit nahezu gleichbleibender Geschwindigkeit.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Kraft zwischen zwei parallelen Leitern', s:[
 'Zwei dünne Drähte hängen parallel nebeneinander. Durch beide fließt ein Strom.',
 'Beobachtung: Bei gleicher Stromrichtung ziehen sich die Drähte an, bei entgegengesetzter Stromrichtung stoßen sie sich ab.',
 'Jeder stromdurchflossene Leiter erzeugt ein Magnetfeld.',
 'Die Feldlinien dieses Magnetfeldes verlaufen als konzentrische Kreise um den Draht. Ihre Richtung liefert die Rechte-Hand-Regel, wenn der Daumen in die technische Stromrichtung zeigt.',
 'Am Ort des zweiten Drahtes herrscht deshalb das Magnetfeld des ersten Drahtes, und zwar senkrecht zu dessen Stromrichtung.',
 'Im zweiten Draht bewegen sich Ladungsträger, denn dort fließt ebenfalls ein Strom.',
 'Auf bewegte Ladungen in einem Magnetfeld wirkt die Lorentzkraft.',
 'Die vielen kleinen Kräfte auf die einzelnen Ladungsträger ergeben zusammen eine Kraft auf den gesamten zweiten Draht.',
 'Die Richtung dieser Kraft liefert die Drei-Finger-Regel: Bei gleichgerichteten Strömen zeigt sie zum ersten Draht hin, bei entgegengesetzten von ihm weg.',
 'Damit ist die Beobachtung erklärt: gleiche Stromrichtung bedeutet Anziehung, entgegengesetzte Stromrichtung bedeutet Abstoßung.',
 'Dieselbe Überlegung gilt auch umgekehrt. Nach dem Wechselwirkungsprinzip wirkt auf den ersten Draht eine gleich große Kraft in die Gegenrichtung.',
 'Die Kraft wächst mit beiden Stromstärken und nimmt mit größerem Abstand ab. Über sie war früher die Einheit Ampere festgelegt.'
]},

{f:'M', j:5, g:'Problemlösen', t:'Umschütträtsel: 4 Liter abmessen', s:[
 'Gegeben sind zwei Gefäße ohne Skala: eines fasst 3 Liter, das andere 5 Liter. Beide sind leer. Abgemessen werden sollen genau 4 Liter.',
 'Fülle das 3-Liter-Gefäß am Wasserhahn vollständig.',
 'Schütte diese 3 Liter in das 5-Liter-Gefäß. Darin sind jetzt 3 Liter, das kleine Gefäß ist leer.',
 'Fülle das 3-Liter-Gefäß erneut vollständig.',
 'Gieße daraus in das 5-Liter-Gefäß, bis dieses randvoll ist. Es passen nur noch 2 Liter hinein.',
 'Im 3-Liter-Gefäß bleibt deshalb genau 1 Liter zurück. Das ist der entscheidende Zwischenschritt.',
 'Leere das 5-Liter-Gefäß vollständig aus.',
 'Schütte den einen Liter aus dem kleinen Gefäß in das leere 5-Liter-Gefäß.',
 'Fülle das 3-Liter-Gefäß wieder vollständig.',
 'Schütte diese 3 Liter dazu: 1 Liter plus 3 Liter ergeben genau 4 Liter im 5-Liter-Gefäß.'
]},

{f:'M', j:7, g:'Lineare Gleichungen', t:'Vorgehen: lineare Gleichung lösen', s:[
 'Schreibe die Gleichung auf und prüfe, ob Klammern oder Brüche vorkommen.',
 'Löse zuerst alle Klammern auf, indem du ausmultiplizierst.',
 'Beseitige Brüche, indem du beide Seiten mit dem Hauptnenner multiplizierst.',
 'Fasse auf jeder Seite für sich alles zusammen, was gleichartig ist.',
 'Bringe durch Addieren oder Subtrahieren alle Glieder mit der Variablen auf eine Seite.',
 'Bringe mit demselben Schritt alle reinen Zahlen auf die andere Seite.',
 'Fasse erneut zusammen; es bleibt eine Gleichung der Form a · x = b.',
 'Teile beide Seiten durch den Faktor vor der Variablen. Ist dieser Faktor null, prüfe gesondert, ob die Gleichung keine oder unendlich viele Lösungen hat.',
 'Schreibe die Lösung auf und mache die Probe, indem du sie in die ursprüngliche Gleichung einsetzt.',
 'Gib die Lösungsmenge an und deute das Ergebnis im Sachzusammenhang, falls es eine Textaufgabe war.'
]},

{f:'M', j:9, g:'Quadratische Gleichungen', t:'Vorgehen: quadratische Gleichung lösen', s:[
 'Bringe die Gleichung durch Umformen auf die Normalform, also alles auf eine Seite, sodass rechts null steht.',
 'Ordne die Glieder nach fallenden Potenzen: zuerst das Glied mit x², dann das mit x, dann die Zahl.',
 'Prüfe, ob ein einfacher Weg genügt: Fehlt das absolute Glied, kannst du x ausklammern; fehlt das lineare Glied, genügt Wurzelziehen.',
 'Prüfe außerdem, ob eine binomische Formel oder der Satz von Vieta das Zerlegen erleichtert.',
 'Andernfalls lies die Koeffizienten a, b und c ab.',
 'Berechne die Diskriminante, also den Term unter der Wurzel: b² − 4ac.',
 'Ist die Diskriminante negativ, gibt es keine Lösung; ist sie null, genau eine; ist sie positiv, zwei Lösungen.',
 'Setze die Werte in die Lösungsformel ein und berechne die Lösungen.',
 'Mache die Probe, indem du jede Lösung in die ursprüngliche Gleichung einsetzt.',
 'Gib die Lösungsmenge an und prüfe bei Sachaufgaben, ob beide Lösungen sinnvoll sind.'
]},

{f:'M', j:9, g:'Quadratwurzeln', t:'Vorgehen: Wurzelgleichung lösen', s:[
 'Bestimme zuerst den Definitionsbereich: Der Term unter jeder Wurzel darf nicht negativ werden.',
 'Stelle die Gleichung so um, dass die Wurzel allein auf einer Seite steht.',
 'Quadriere beide Seiten der Gleichung.',
 'Beachte dabei: Quadrieren ist keine Äquivalenzumformung, es können Scheinlösungen entstehen.',
 'Kommt noch eine zweite Wurzel vor, wiederhole das Isolieren und Quadrieren.',
 'Löse die entstandene Gleichung, die nun meist linear oder quadratisch ist.',
 'Prüfe für jede gefundene Zahl, ob sie im Definitionsbereich liegt.',
 'Setze jede verbliebene Zahl in die ursprüngliche Gleichung ein; nur so erkennst du Scheinlösungen sicher.',
 'Streiche alle Zahlen, die die Probe nicht bestehen.',
 'Gib die Lösungsmenge der verbliebenen Zahlen an.'
]},

{f:'M', j:10, g:'Exponentielles Wachstum', t:'Vorgehen: Exponentialgleichung lösen', s:[
 'Schreibe die Gleichung auf und suche die Variable: Sie steht im Exponenten.',
 'Forme so um, dass auf einer Seite nur noch die Potenz mit der Variablen steht; Faktoren und Summanden wandern auf die andere Seite.',
 'Prüfe, ob sich beide Seiten als Potenzen derselben Basis schreiben lassen.',
 'Ist das der Fall, genügt der Vergleich der Exponenten und du erhältst eine einfache Gleichung.',
 'Andernfalls wende auf beide Seiten den Logarithmus an.',
 'Nutze das Logarithmusgesetz, mit dem der Exponent als Faktor vor den Logarithmus gezogen wird.',
 'Löse die nun lineare Gleichung nach der Variablen auf.',
 'Berechne den Wert mit dem Taschenrechner und runde sinnvoll.',
 'Mache die Probe durch Einsetzen in die ursprüngliche Gleichung.',
 'Deute das Ergebnis im Sachzusammenhang, etwa als Zeitpunkt oder als Anzahl von Zeitschritten.'
]},

{f:'M', j:9, g:'Quadratische Funktionen', t:'Vorgehen: Extremwertaufgabe mit quadratischer Funktion', s:[
 'Lies die Aufgabe genau und fertige eine Skizze an. Beschrifte darin die veränderlichen Größen.',
 'Benenne die gesuchte Größe, die größt- oder kleinstmöglich werden soll; sie ist die Zielgröße.',
 'Wähle eine Variable für eine der veränderlichen Größen, zum Beispiel x für eine Seitenlänge.',
 'Stelle die Nebenbedingung auf: die Gleichung, die die gegebene Einschränkung beschreibt, etwa einen festen Umfang.',
 'Löse die Nebenbedingung nach der zweiten Größe auf, sodass sie durch x ausgedrückt wird.',
 'Setze diesen Ausdruck in die Zielgröße ein. So entsteht die Zielfunktion, die nur noch von x abhängt.',
 'Vereinfache den Term; er ist quadratisch und hat die Form a x² + b x + c.',
 'Bestimme den Scheitel, zum Beispiel durch quadratische Ergänzung oder über die Scheitelformel.',
 'Entscheide am Vorzeichen von a, ob der Scheitel ein Maximum oder ein Minimum liefert.',
 'Prüfe, ob der gefundene x-Wert im sinnvollen Bereich liegt, etwa ob die Länge positiv ist.',
 'Berechne mit diesem x die zweite Größe und den Extremwert selbst.',
 'Formuliere einen Antwortsatz mit Einheiten.'
]},

{f:'M', j:11, g:'Differentialrechnung', t:'Vorgehen: Extremwertaufgabe mit Ableitung', s:[
 'Lies die Aufgabe genau und fertige eine beschriftete Skizze an.',
 'Benenne die Zielgröße, die maximal oder minimal werden soll, und stelle die Zielgleichung auf.',
 'Stelle die Nebenbedingung auf, also die Gleichung, die die gegebene Einschränkung beschreibt.',
 'Löse die Nebenbedingung nach einer Variablen auf und setze sie in die Zielgleichung ein.',
 'Du erhältst die Zielfunktion f, die nur noch von einer Variablen abhängt.',
 'Bestimme den sinnvollen Definitionsbereich aus dem Sachzusammenhang.',
 'Bilde die erste Ableitung f Strich.',
 'Setze f Strich gleich null und löse diese Gleichung; die Lösungen sind die Kandidaten für Extremstellen.',
 'Weise mit dem Vorzeichenwechsel von f Strich oder mit der zweiten Ableitung nach, ob dort ein Maximum oder ein Minimum vorliegt.',
 'Untersuche zusätzlich die Ränder des Definitionsbereichs, denn auch dort kann der größte oder kleinste Wert liegen.',
 'Berechne den zugehörigen Funktionswert und die übrigen gesuchten Größen.',
 'Formuliere einen Antwortsatz mit Einheiten und prüfe das Ergebnis auf Plausibilität.'
]},
{f:'M', j:6, g:'Rationale Zahlen', t:'Vorgehen: ungleichnamige Brüche addieren', s:[
 'Schreibe beide Brüche auf und vergleiche die Nenner.',
 'Sind die Nenner verschieden, müssen die Brüche zuerst gleichnamig gemacht werden.',
 'Bestimme den Hauptnenner, also das kleinste gemeinsame Vielfache der beiden Nenner.',
 'Berechne für jeden Bruch, mit welcher Zahl du erweitern musst: Hauptnenner geteilt durch den alten Nenner.',
 'Erweitere jeden Bruch mit dieser Zahl, also Zähler und Nenner damit malnehmen.',
 'Nun haben beide Brüche denselben Nenner; addiere die Zähler und behalte den Nenner bei.',
 'Kürze das Ergebnis so weit wie möglich.',
 'Ist der Zähler größer als der Nenner, schreibe das Ergebnis als gemischte Zahl.',
 'Prüfe das Ergebnis mit einer Überschlagsrechnung: Ist die Summe ungefähr so groß wie erwartet?'
]},

{f:'M', j:7, g:'Lineare Gleichungen', t:'Vorgehen: Textaufgabe in eine Gleichung übersetzen', s:[
 'Lies den Text zweimal und markiere die Zahlenangaben und die Frage.',
 'Benenne die gesuchte Größe und lege fest, wofür die Variable x steht; schreibe das auf.',
 'Drücke die übrigen Größen durch x aus, zum Beispiel die Nachfolgerzahl als x + 1.',
 'Suche im Text die Aussage, die eine Gleichheit beschreibt; sie enthält oft das Wort ist, ergibt oder zusammen.',
 'Stelle mit dieser Aussage die Gleichung auf.',
 'Löse die Gleichung mit Äquivalenzumformungen.',
 'Mache die Probe am Text, nicht nur an der Gleichung: Passt die gefundene Zahl zu allen Angaben?',
 'Prüfe, ob das Ergebnis im Sachzusammenhang sinnvoll ist, etwa ob eine Anzahl ganzzahlig und positiv ist.',
 'Formuliere einen Antwortsatz mit Einheiten.'
]},

{f:'M', j:8, g:'Lineare Funktionen', t:'Vorgehen: Geradengleichung aus zwei Punkten', s:[
 'Schreibe die beiden gegebenen Punkte mit ihren Koordinaten auf.',
 'Die gesuchte Gleichung hat die Form y = m · x + t; gesucht sind also m und t.',
 'Berechne die Steigung m als Quotient aus dem Unterschied der y-Werte und dem Unterschied der x-Werte.',
 'Achte dabei auf die Reihenfolge: In Zähler und Nenner muss derselbe Punkt zuerst stehen.',
 'Setze die berechnete Steigung in die Gleichung ein.',
 'Setze nun die Koordinaten eines der beiden Punkte ein; dadurch entsteht eine Gleichung mit der einzigen Unbekannten t.',
 'Löse diese Gleichung nach t auf.',
 'Schreibe die vollständige Geradengleichung auf.',
 'Mache die Probe mit dem anderen Punkt: Seine Koordinaten müssen die Gleichung ebenfalls erfüllen.'
]},

{f:'M', j:8, g:'Lineare Gleichungssysteme', t:'Vorgehen: Gleichungssystem mit dem Additionsverfahren', s:[
 'Schreibe beide Gleichungen untereinander und ordne sie: links die Glieder mit x und y, rechts die Zahlen.',
 'Entscheide, welche Variable zuerst verschwinden soll.',
 'Multipliziere eine oder beide Gleichungen mit einer passenden Zahl, sodass die Koeffizienten dieser Variablen entgegengesetzt gleich sind.',
 'Addiere die beiden Gleichungen; die gewählte Variable fällt dabei weg.',
 'Löse die entstandene Gleichung mit nur einer Unbekannten.',
 'Setze den gefundenen Wert in eine der ursprünglichen Gleichungen ein.',
 'Berechne daraus die zweite Unbekannte.',
 'Mache die Probe, indem du beide Werte in beide ursprünglichen Gleichungen einsetzt.',
 'Gib die Lösung als Zahlenpaar an und deute sie bei Sachaufgaben, etwa als Schnittpunkt zweier Tarife.'
]},

{f:'M', j:13, g:'Integralrechnung', t:'Vorgehen: Fläche zwischen Graph und x-Achse', s:[
 'Schreibe die Funktion und das gesuchte Intervall auf und fertige eine Skizze des Graphen an.',
 'Berechne die Nullstellen der Funktion im betrachteten Intervall.',
 'Teile das Intervall an diesen Nullstellen in Teilintervalle auf.',
 'Bestimme für jedes Teilintervall, ob der Graph oberhalb oder unterhalb der x-Achse verläuft.',
 'Bestimme eine Stammfunktion F der Funktion f.',
 'Berechne für jedes Teilintervall das bestimmte Integral als F an der oberen Grenze minus F an der unteren Grenze.',
 'Beachte: Unterhalb der x-Achse liefert das Integral einen negativen Wert.',
 'Nimm für den Flächeninhalt von jedem Teilintegral den Betrag.',
 'Addiere die Beträge zum gesuchten Flächeninhalt.',
 'Vergleiche das Ergebnis mit der Skizze: Passt die Größenordnung zu den Kästchen im Bild?'
]},
{f:'Ph', j:7, g:'Arbeitsweisen', t:'Vorgehen: eine Physikaufgabe rechnen', s:[
 'Lies die Aufgabe vollständig und stelle dir den Vorgang vor; fertige wenn möglich eine Skizze an.',
 'Schreibe unter „gegeben" alle bekannten Größen mit Formelzeichen, Zahlenwert und Einheit auf.',
 'Schreibe unter „gesucht" die Größe auf, die berechnet werden soll.',
 'Rechne alle Angaben in zusammenpassende Einheiten um, zum Beispiel Minuten in Sekunden.',
 'Suche die Formel, die die gegebenen und die gesuchte Größe verbindet.',
 'Stelle die Formel nach der gesuchten Größe um, bevor du Zahlen einsetzt.',
 'Setze die Zahlenwerte mit ihren Einheiten ein.',
 'Rechne aus und vereinfache dabei auch die Einheiten; die Einheit des Ergebnisses muss zur gesuchten Größe passen.',
 'Runde sinnvoll und prüfe die Größenordnung: Ist der Wert für die Situation plausibel?',
 'Schreibe einen Antwortsatz mit Zahlenwert und Einheit.'
]},

{f:'Ph', j:8, g:'Optik', t:'Vorgehen: Bildkonstruktion an der Sammellinse', s:[
 'Zeichne die optische Achse als waagerechte Linie und die Linse senkrecht dazu, als Strich mit Doppelpfeilen.',
 'Markiere den Mittelpunkt der Linse und auf beiden Seiten im gleichen Abstand die Brennpunkte.',
 'Zeichne den Gegenstand als senkrechten Pfeil links der Linse, mit dem Fuß auf der optischen Achse.',
 'Zeichne vom Pfeilende den Parallelstrahl: Er läuft parallel zur optischen Achse bis zur Linse.',
 'Hinter der Linse verläuft dieser Strahl als Brennpunktstrahl, also durch den Brennpunkt auf der anderen Seite.',
 'Zeichne vom Pfeilende den Mittelpunktstrahl: Er geht ungebrochen durch die Mitte der Linse.',
 'Der Schnittpunkt der beiden Strahlen hinter der Linse ist die Spitze des Bildes.',
 'Zeichne von dort das Lot auf die optische Achse; das ist das Bild des Gegenstands.',
 'Zeichne zur Kontrolle den Brennpunktstrahl: Er geht vor der Linse durch den Brennpunkt und verläuft dahinter parallel zur Achse. Er muss durch denselben Punkt gehen.',
 'Beschreibe das Bild: Steht es aufrecht oder auf dem Kopf, ist es größer oder kleiner, ist es reell oder virtuell?'
]},

{f:'Ph', j:9, g:'Elektrischer Strom', t:'Vorgehen: Gesamtwiderstand einer gemischten Schaltung', s:[
 'Zeichne den Schaltplan sauber ab und nummeriere die Widerstände.',
 'Suche Teilschaltungen, in denen Widerstände eindeutig in Reihe oder parallel liegen.',
 'Beginne mit der innersten Teilschaltung, also der, die am weitesten von den Anschlussklemmen entfernt ist.',
 'Liegen Widerstände in Reihe, addiere ihre Werte zu einem Ersatzwiderstand.',
 'Liegen sie parallel, addiere die Kehrwerte und bilde vom Ergebnis wieder den Kehrwert.',
 'Zeichne die Schaltung neu und ersetze die berechnete Teilschaltung durch ihren Ersatzwiderstand.',
 'Wiederhole das Zusammenfassen, bis nur noch ein einziger Widerstand übrig ist.',
 'Prüfe das Ergebnis: Eine Parallelschaltung ist stets kleiner als der kleinste Einzelwiderstand, eine Reihenschaltung größer als der größte.',
 'Berechne mit dem ohmschen Gesetz die Gesamtstromstärke aus der angelegten Spannung.',
 'Arbeite dich Schritt für Schritt zurück, um Teilspannungen und Teilströme zu bestimmen.'
]},

{f:'Ph', j:11, g:'Mechanik', t:'Vorgehen: Bewegung mit konstanter Beschleunigung', s:[
 'Lies die Aufgabe und skizziere den Bewegungsablauf; lege fest, wo der Nullpunkt liegt und welche Richtung positiv zählt.',
 'Trage ein, was gegeben ist: Anfangsort, Anfangsgeschwindigkeit, Beschleunigung, Zeit oder Endgeschwindigkeit.',
 'Prüfe, ob die Beschleunigung während des betrachteten Abschnitts wirklich konstant ist; sonst teile die Bewegung in Abschnitte.',
 'Rechne alle Größen in SI-Einheiten um, insbesondere Kilometer je Stunde in Meter je Sekunde.',
 'Wähle die passende Gleichung: Weg-Zeit-Gesetz, Geschwindigkeit-Zeit-Gesetz oder die Beziehung ohne Zeit.',
 'Stelle die gewählte Gleichung nach der gesuchten Größe um.',
 'Setze die Werte ein und berechne das Ergebnis.',
 'Achte bei Bremsvorgängen auf das Vorzeichen: Die Beschleunigung ist dann der Geschwindigkeit entgegengerichtet.',
 'Prüfe das Ergebnis auf Plausibilität, etwa ob ein Bremsweg zur Erfahrung passt.',
 'Zeichne wenn gefordert das Zeit-Geschwindigkeit-Diagramm; die Fläche darunter entspricht dem zurückgelegten Weg.'
]},
{f:'M', j:6, g:'Dreisatz und Proportionalität', t:'Vorgehen: Dreisatz', s:[
 'Lies die Aufgabe und schreibe die beiden zusammengehörenden Größen heraus, zum Beispiel Anzahl und Preis.',
 'Prüfe, ob die Zuordnung proportional ist: Doppelt so viele Teile kosten doppelt so viel. Nur dann ist der Dreisatz erlaubt.',
 'Schreibe die gegebene Zuordnung in eine Zeile, die Größen sauber untereinander und mit Einheiten.',
 'Erster Schritt: Rechne von der gegebenen Menge auf eine Einheit herunter, meist durch Division.',
 'Schreibe diesen Zwischenwert auf; er gibt an, wie viel eine einzige Einheit ausmacht.',
 'Zweiter Schritt: Rechne von einer Einheit auf die gesuchte Menge hoch, meist durch Multiplikation.',
 'Achte bei antiproportionalen Zuordnungen auf die Umkehrung: Dort wird im zweiten Schritt geteilt statt malgenommen.',
 'Runde sinnvoll und schreibe die Einheit dazu.',
 'Prüfe mit einer Überschlagsrechnung, ob das Ergebnis in der richtigen Größenordnung liegt.',
 'Formuliere einen Antwortsatz.'
]},

{f:'M', j:6, g:'Prozentrechnung', t:'Vorgehen: Prozentaufgabe mit gesuchtem Grundwert', s:[
 'Lies die Aufgabe und suche die drei Größen der Prozentrechnung: Grundwert, Prozentsatz und Prozentwert.',
 'Der Grundwert ist das Ganze und entspricht 100 Prozent; er ist hier gesucht.',
 'Der Prozentwert ist der Anteil, der im Text als Betrag genannt wird.',
 'Schreibe auf, welche Angabe zu welcher Größe gehört, und notiere die gesuchte Größe mit einem Fragezeichen.',
 'Vorsicht bei Formulierungen wie „um 20 Prozent reduziert": Der genannte Preis entspricht dann nicht 20, sondern 80 Prozent.',
 'Rechne zuerst von den gegebenen Prozent auf ein Prozent herunter, indem du den Prozentwert durch die Prozentzahl teilst.',
 'Rechne dann von einem Prozent auf hundert Prozent hoch, indem du mit 100 malnimmst.',
 'Alternativ kannst du die Formel Grundwert gleich Prozentwert geteilt durch Prozentsatz verwenden.',
 'Runde auf sinnvolle Genauigkeit, bei Geldbeträgen auf zwei Nachkommastellen.',
 'Mache die Probe: Berechne aus dem gefundenen Grundwert den Prozentwert zurück.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Mittelsenkrechte einer Strecke', s:[
 'Zeichne die Strecke AB und lege das Geodreieck beiseite: Konstruiert wird nur mit Zirkel und Lineal.',
 'Stich mit dem Zirkel in den Punkt A ein.',
 'Wähle eine Zirkelöffnung, die größer als die Hälfte der Strecke AB ist. Sonst schneiden sich die Kreise später nicht.',
 'Zeichne mit dieser Öffnung einen Kreisbogen oberhalb und unterhalb der Strecke.',
 'Stich nun in den Punkt B ein und behalte dieselbe Zirkelöffnung bei.',
 'Zeichne wieder je einen Kreisbogen oberhalb und unterhalb der Strecke.',
 'Die Bögen schneiden sich in zwei Punkten, einem oberhalb und einem unterhalb der Strecke.',
 'Verbinde diese beiden Schnittpunkte mit dem Lineal zu einer Geraden.',
 'Diese Gerade ist die Mittelsenkrechte: Sie steht senkrecht auf AB und halbiert die Strecke.',
 'Begründung: Beide Schnittpunkte haben von A und von B denselben Abstand, nämlich die Zirkelöffnung. Alle Punkte mit dieser Eigenschaft liegen auf der Mittelsenkrechten.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Winkelhalbierende', s:[
 'Zeichne den Winkel mit seinem Scheitel S und den beiden Schenkeln.',
 'Stich mit dem Zirkel in den Scheitel S ein.',
 'Zeichne mit beliebiger Öffnung einen Kreisbogen, der beide Schenkel schneidet.',
 'Benenne die beiden Schnittpunkte, etwa P auf dem ersten und Q auf dem zweiten Schenkel. Beide haben von S denselben Abstand.',
 'Stich nun in P ein und zeichne mit einer Öffnung, die größer als die halbe Strecke PQ ist, einen Bogen im Inneren des Winkels.',
 'Stich in Q ein und zeichne mit derselben Öffnung einen zweiten Bogen, der den ersten schneidet.',
 'Verbinde den Scheitel S mit diesem Schnittpunkt.',
 'Diese Gerade ist die Winkelhalbierende; sie teilt den Winkel in zwei gleich große Teilwinkel.',
 'Prüfe mit dem Geodreieck nach: Beide Teilwinkel müssen gleich groß sein.',
 'Begründung: Alle Punkte der Winkelhalbierenden haben von beiden Schenkeln denselben Abstand.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Umkreis eines Dreiecks', s:[
 'Zeichne das Dreieck ABC.',
 'Überlege zuerst, was der Umkreis leisten muss: Er geht durch alle drei Eckpunkte, sein Mittelpunkt hat also von A, B und C denselben Abstand.',
 'Punkte mit gleichem Abstand von zwei Ecken liegen auf der Mittelsenkrechten der entsprechenden Seite.',
 'Konstruiere die Mittelsenkrechte der Seite AB mit dem Zirkel.',
 'Konstruiere die Mittelsenkrechte der Seite BC auf dieselbe Weise.',
 'Der Schnittpunkt der beiden Mittelsenkrechten ist der Umkreismittelpunkt M.',
 'Die dritte Mittelsenkrechte muss durch denselben Punkt gehen; zeichne sie als Probe.',
 'Stich mit dem Zirkel in M ein und stelle als Radius den Abstand zu einem Eckpunkt ein.',
 'Zeichne den Kreis; er muss durch alle drei Ecken verlaufen.',
 'Beachte die Lage von M: Im spitzwinkligen Dreieck liegt er innen, im rechtwinkligen auf der Hypotenuse, im stumpfwinkligen außerhalb.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Inkreis eines Dreiecks', s:[
 'Zeichne das Dreieck ABC.',
 'Überlege, was der Inkreis leisten muss: Er berührt alle drei Seiten, sein Mittelpunkt hat also von allen Seiten denselben Abstand.',
 'Punkte mit gleichem Abstand von zwei Seiten liegen auf der Winkelhalbierenden des von ihnen eingeschlossenen Winkels.',
 'Konstruiere die Winkelhalbierende des Winkels bei A mit dem Zirkel.',
 'Konstruiere die Winkelhalbierende des Winkels bei B auf dieselbe Weise.',
 'Der Schnittpunkt der beiden Winkelhalbierenden ist der Inkreismittelpunkt M; er liegt immer innerhalb des Dreiecks.',
 'Fälle von M aus das Lot auf eine der Seiten.',
 'Der Abstand von M zu diesem Lotfußpunkt ist der Inkreisradius.',
 'Stich in M ein und zeichne den Kreis mit diesem Radius.',
 'Prüfe: Der Kreis muss jede Seite in genau einem Punkt berühren, nicht schneiden.'
]},
{f:'M', j:9, g:'Satz des Pythagoras', t:'Vorgehen: Sachaufgabe mit dem Satz des Pythagoras', s:[
 'Lies die Aufgabe und fertige eine Skizze der Situation an.',
 'Suche in der Skizze ein rechtwinkliges Dreieck und markiere den rechten Winkel.',
 'Findest du keines, ziehe eine Hilfslinie ein, etwa eine Höhe oder eine Diagonale.',
 'Benenne im Dreieck die Hypotenuse: Sie liegt dem rechten Winkel gegenüber und ist die längste Seite.',
 'Trage die bekannten Längen ein und bezeichne die gesuchte Seite mit einem Buchstaben.',
 'Achte darauf, dass alle Längen in derselben Einheit angegeben sind.',
 'Schreibe den Satz des Pythagoras für dieses Dreieck auf: Die Summe der Kathetenquadrate ist gleich dem Hypotenusenquadrat.',
 'Stelle die Gleichung nach der gesuchten Größe um – je nachdem, ob eine Kathete oder die Hypotenuse gesucht ist.',
 'Setze die Zahlen ein, quadriere zuerst und ziehe erst ganz am Schluss die Wurzel.',
 'Runde sinnvoll und prüfe: Die Hypotenuse muss länger sein als jede Kathete, aber kürzer als deren Summe.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},

{f:'M', j:9, g:'Strahlensätze', t:'Vorgehen: Aufgabe mit dem Strahlensatz', s:[
 'Fertige eine Skizze an und suche das Zentrum, von dem die beiden Strahlen ausgehen.',
 'Prüfe die Voraussetzung: Die beiden geschnittenen Geraden müssen parallel sein. Ohne Parallelität gilt der Strahlensatz nicht.',
 'Markiere die Parallelen und das Zentrum farbig, damit die Figur übersichtlich wird.',
 'Benenne die Punkte und trage die bekannten Längen ein.',
 'Entscheide, welcher Strahlensatz passt: der erste für Abschnitte auf den Strahlen, der zweite für die Parallelstücke.',
 'Stelle die Verhältnisgleichung auf und achte darauf, dass in Zähler und Nenner jeweils zusammengehörende Strecken stehen.',
 'Vorsicht bei den Abschnitten: Wird vom Zentrum aus gemessen oder nur das Teilstück dazwischen? Rechne gegebenenfalls erst die Gesamtlänge aus.',
 'Löse die Verhältnisgleichung durch Überkreuzmultiplizieren nach der gesuchten Länge auf.',
 'Setze die Zahlen ein und berechne das Ergebnis.',
 'Prüfe die Plausibilität an der Skizze: Liegt die gesuchte Strecke näher am Zentrum, muss sie kürzer sein.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},

{f:'M', j:9, g:'Mehrstufige Zufallsexperimente', t:'Vorgehen: Baumdiagramm und Pfadregeln', s:[
 'Lies die Aufgabe und bestimme, aus wie vielen Stufen das Zufallsexperiment besteht.',
 'Kläre, ob mit oder ohne Zurücklegen gezogen wird; davon hängen die Wahrscheinlichkeiten der zweiten Stufe ab.',
 'Zeichne die erste Stufe des Baumdiagramms mit allen möglichen Ergebnissen.',
 'Schreibe an jeden Ast seine Wahrscheinlichkeit; die Summe der Wahrscheinlichkeiten an einer Verzweigung ist immer 1.',
 'Zeichne die zweite Stufe an jedes Ende und beschrifte auch diese Äste.',
 'Markiere die Pfade, die zum gesuchten Ereignis gehören.',
 'Erste Pfadregel: Entlang eines Pfades werden die Wahrscheinlichkeiten multipliziert.',
 'Zweite Pfadregel: Die Wahrscheinlichkeiten mehrerer günstiger Pfade werden addiert.',
 'Prüfe bei Formulierungen wie „mindestens einmal", ob der Umweg über das Gegenereignis kürzer ist.',
 'Rechne aus und gib das Ergebnis als Bruch, Dezimalzahl oder Prozentwert an.',
 'Prüfe zur Kontrolle, ob die Summe aller Pfadwahrscheinlichkeiten 1 ergibt.'
]},

{f:'M', j:12, g:'Signifikanztest', t:'Vorgehen: Signifikanztest durchführen', s:[
 'Lies die Aufgabe und formuliere die Vermutung, die geprüft werden soll.',
 'Lege die Nullhypothese fest; sie beschreibt den bisher angenommenen Zustand.',
 'Lege die Gegenhypothese fest und entscheide, ob einseitig links, einseitig rechts oder zweiseitig getestet wird.',
 'Notiere den Stichprobenumfang n und das Signifikanzniveau, meist 5 Prozent.',
 'Benenne die Testgröße: die Anzahl der Treffer in der Stichprobe; sie ist unter der Nullhypothese binomialverteilt.',
 'Bestimme den Ablehnungsbereich, indem du mit der kumulierten Binomialverteilung die Grenze suchst, ab der die Wahrscheinlichkeit das Niveau unterschreitet.',
 'Schreibe Ablehnungs- und Annahmebereich vollständig auf.',
 'Führe die Stichprobe aus beziehungsweise entnimm der Aufgabe das Ergebnis.',
 'Vergleiche die Testgröße mit dem Ablehnungsbereich.',
 'Entscheide: Liegt sie im Ablehnungsbereich, wird die Nullhypothese verworfen, sonst nicht.',
 'Formuliere die Antwort im Sachzusammenhang und beachte: Nicht verwerfen heißt nicht beweisen.',
 'Benenne auf Nachfrage den Fehler erster Art, also die Nullhypothese fälschlich zu verwerfen.'
]},

{f:'M', j:13, g:'Geraden und Ebenen', t:'Vorgehen: Schnittpunkt von Gerade und Ebene', s:[
 'Schreibe die Gerade in Parameterform und die Ebene in Koordinatenform auf.',
 'Liegt die Ebene in Parameterform vor, wandle sie zuerst in die Koordinatenform um, etwa über den Normalenvektor.',
 'Setze die drei Koordinaten des Geradenpunkts, also die Terme mit dem Parameter, in die Ebenengleichung ein.',
 'Fasse die entstehende Gleichung zusammen; sie enthält nur noch den Parameter.',
 'Löse diese Gleichung nach dem Parameter auf.',
 'Prüfe die Sonderfälle: Bleibt eine wahre Aussage ohne Parameter, liegt die Gerade in der Ebene; bleibt eine falsche Aussage, ist sie echt parallel.',
 'Setze den gefundenen Parameterwert in die Geradengleichung ein.',
 'Berechne daraus die Koordinaten des Schnittpunkts.',
 'Mache die Probe: Die Koordinaten müssen die Ebenengleichung erfüllen.',
 'Gib den Schnittpunkt an und deute ihn, falls die Aufgabe einen Sachzusammenhang hat.'
]},
{f:'Ph', j:8, g:'Arbeitsweisen', t:'Vorgehen: Messwerte auswerten und Proportionalität prüfen', s:[
 'Schreibe vor dem Versuch auf, welche Größe du veränderst und welche du misst.',
 'Halte alle übrigen Größen konstant; sonst lässt sich der Zusammenhang nicht deuten.',
 'Lege eine Wertetabelle an, mit Formelzeichen und Einheit in der Kopfzeile.',
 'Miss jeden Wert mehrmals und trage den Mittelwert ein; so fallen Ausreißer weniger ins Gewicht.',
 'Zeichne ein Diagramm: die veränderte Größe nach rechts, die gemessene nach oben, beide Achsen beschriftet und sinnvoll eingeteilt.',
 'Trage die Messpunkte ein, ohne sie von Punkt zu Punkt zu verbinden.',
 'Lege eine Ausgleichsgerade so durch die Punktwolke, dass die Abweichungen nach oben und unten etwa gleich groß sind.',
 'Prüfe auf Proportionalität: Die Gerade muss durch den Ursprung gehen.',
 'Prüfe es zusätzlich rechnerisch: Bilde für jede Zeile den Quotienten der beiden Größen. Bleibt er im Rahmen der Messgenauigkeit gleich, sind die Größen zueinander proportional.',
 'Bestimme die Steigung der Ausgleichsgeraden aus einem großen Steigungsdreieck und gib ihre Einheit an.',
 'Deute die Steigung physikalisch, zum Beispiel als Widerstand, als Federhärte oder als Geschwindigkeit.',
 'Nenne mögliche Fehlerquellen und schätze ab, wie stark sie das Ergebnis beeinflussen.'
]},

{f:'Ph', j:8, g:'Optik', t:'Vorgehen: Aufgabe mit der Linsengleichung', s:[
 'Fertige eine Skizze mit Linse, Brennpunkten, Gegenstand und Bild an.',
 'Schreibe auf, was gegeben ist: Gegenstandsweite g, Bildweite b, Brennweite f, Gegenstandsgröße oder Bildgröße.',
 'Benenne die gesuchte Größe.',
 'Achte auf einheitliche Einheiten, meist Zentimeter oder Meter.',
 'Schreibe die Linsengleichung auf: Der Kehrwert der Brennweite ist gleich der Summe der Kehrwerte von Gegenstandsweite und Bildweite.',
 'Stelle die Gleichung nach der gesuchten Größe um; beachte dabei, dass du am Ende noch einmal den Kehrwert bilden musst.',
 'Setze die Zahlen ein und berechne das Ergebnis.',
 'Brauchst du die Bildgröße, nutze den Abbildungsmaßstab: Bildgröße zu Gegenstandsgröße verhält sich wie Bildweite zu Gegenstandsweite.',
 'Prüfe das Ergebnis mit der Skizze und mit den bekannten Fällen: Innerhalb der Brennweite entsteht ein virtuelles, aufrechtes und vergrößertes Bild.',
 'Formuliere einen Antwortsatz mit Einheit und beschreibe das Bild.'
]},

{f:'Ph', j:9, g:'Energie', t:'Vorgehen: Sachaufgabe mit dem Energieerhaltungssatz', s:[
 'Lies die Aufgabe und skizziere den Vorgang mit Anfangs- und Endzustand.',
 'Lege das System fest und entscheide, welche Körper dazugehören.',
 'Wähle ein Bezugsniveau für die Lageenergie, meist den tiefsten Punkt der Bewegung.',
 'Schreibe auf, welche Energieformen im Anfangszustand vorliegen, etwa Lageenergie oder Spannenergie.',
 'Schreibe auf, welche Energieformen im Endzustand vorliegen, etwa Bewegungsenergie.',
 'Formuliere den Energieerhaltungssatz: Die Summe der Energien im Anfangszustand ist gleich der Summe im Endzustand.',
 'Berücksichtige Reibung, indem du die dabei entstehende innere Energie als zusätzlichen Term auf der Endseite aufnimmst.',
 'Setze die Formeln der einzelnen Energieformen ein.',
 'Kürze gemeinsame Faktoren; häufig fällt die Masse heraus, was ein gutes Zwischenergebnis ist.',
 'Stelle nach der gesuchten Größe um und setze die Zahlen mit Einheiten ein.',
 'Prüfe die Einheit des Ergebnisses und die Größenordnung.',
 'Formuliere einen Antwortsatz.'
]},

{f:'Ph', j:10, g:'Mechanik', t:'Vorgehen: Kräftezerlegung an der schiefen Ebene', s:[
 'Zeichne die schiefe Ebene mit dem Neigungswinkel und dem Körper darauf.',
 'Zeichne die Gewichtskraft als Pfeil senkrecht nach unten im Schwerpunkt des Körpers.',
 'Lege ein gedrehtes Koordinatensystem fest: eine Achse parallel zur Ebene, die andere senkrecht dazu.',
 'Zerlege die Gewichtskraft in diese beiden Richtungen, indem du vom Pfeilende aus die Parallelen zu den Achsen einzeichnest.',
 'Die Komponente parallel zur Ebene heißt Hangabtriebskraft; sie zieht den Körper hangabwärts.',
 'Die Komponente senkrecht zur Ebene heißt Normalkraft; sie drückt den Körper auf die Unterlage.',
 'Suche den Winkel im Kräftedreieck: Er ist genauso groß wie der Neigungswinkel der Ebene, weil die Schenkel paarweise senkrecht aufeinander stehen.',
 'Berechne die Hangabtriebskraft mit dem Sinus des Neigungswinkels, die Normalkraft mit dem Kosinus.',
 'Prüfe die Grenzfälle: Bei 0 Grad ist die Hangabtriebskraft null, bei 90 Grad gleich der Gewichtskraft.',
 'Vergleiche die Hangabtriebskraft mit der Haftreibungskraft, um zu entscheiden, ob der Körper liegen bleibt oder rutscht.',
 'Formuliere das Ergebnis mit Zahlenwerten und Einheiten.'
]},

{f:'Ph', j:10, g:'Kernphysik', t:'Vorgehen: Altersbestimmung über die Halbwertszeit', s:[
 'Lies die Aufgabe und schreibe auf, welches Isotop verwendet wird und wie groß seine Halbwertszeit ist.',
 'Notiere den Anfangswert, also den Anteil zu Beginn, und den gemessenen Restanteil.',
 'Mache dir das Zerfallsgesetz klar: Nach jeder Halbwertszeit ist nur noch die Hälfte der Kerne vorhanden.',
 'Prüfe, ob der Restanteil ein einfacher Bruchteil ist, etwa ein Halb, ein Viertel oder ein Achtel.',
 'Ist das der Fall, zähle einfach die Halbierungsschritte: Ein Achtel bedeutet drei Halbwertszeiten.',
 'Multipliziere die Anzahl der Schritte mit der Halbwertszeit; das ergibt das gesuchte Alter.',
 'Ist der Restanteil kein einfacher Bruchteil, setze ihn in das Zerfallsgesetz ein.',
 'Löse die Gleichung nach der Zeit auf; weil die Zeit im Exponenten steht, brauchst du dafür den Logarithmus.',
 'Setze die Zahlen ein und berechne das Alter.',
 'Prüfe die Größenordnung: Je weniger übrig ist, desto älter muss der Fund sein.',
 'Beachte die Grenzen des Verfahrens: Ist kaum noch Aktivität messbar, wird die Angabe unsicher.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},
{f:'Ph', j:10, g:'Elektromagnetismus', t:'Wirbelstrombremse', s:[
 'Eine Metallscheibe dreht sich und taucht dabei zwischen die Pole eines starken Magneten ein.',
 'Für jedes Flächenstück der Scheibe ändert sich beim Ein- und Austauchen der magnetische Fluss.',
 'Nach dem Induktionsgesetz wird bei dieser Flussänderung eine Spannung induziert.',
 'Die Scheibe ist aus einem Stück Metall und damit ein geschlossener Leiter; die Spannung treibt deshalb ringförmige Ströme an, die Wirbelströme.',
 'Jeder dieser Wirbelströme erzeugt ein eigenes Magnetfeld.',
 'Die Richtung der Ströme folgt aus der Energiebilanz: Die Scheibe wird messbar langsamer, ihre Rotationsenergie nimmt also ab.',
 'Diese Energie steckt in den Wirbelströmen und wird über den Widerstand des Metalls in innere Energie umgewandelt.',
 'Würde das induzierte Feld die Scheibe stattdessen antreiben, würde sie schneller und zugleich flösse Strom: Energie aus dem Nichts.',
 'Das Feld der Wirbelströme muss der Bewegung also entgegenwirken und bremsen. Genau das besagt die lenzsche Regel.',
 'Die Bremskraft wächst mit der Geschwindigkeit: Bei hoher Drehzahl bremst sie stark, bei kleiner schwach, im Stillstand gar nicht. Deshalb bremst eine Wirbelstrombremse sanft, aber nie bis zum völligen Halt.',
 'Als Gegenprobe schlitzt man die Scheibe radial ein: Die Wirbelströme können sich nicht mehr schließen und die Bremswirkung verschwindet fast völlig.',
 'Weil nichts berührt wird, gibt es keinen Verschleiß und keinen Bremsstaub; genutzt wird das in Zügen, in Lastwagen und in Fitnessgeräten.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Wie der Induktionsherd heizt', s:[
 'Unter der Glaskeramikplatte liegt eine flache Spule aus Kupferdraht.',
 'Durch diese Spule schickt die Elektronik einen hochfrequenten Wechselstrom mit etwa zwanzig- bis fünfzigtausend Schwingungen je Sekunde.',
 'Dadurch entsteht ein sich sehr schnell änderndes Magnetfeld.',
 'Die Glaskeramik ist weder magnetisch noch elektrisch leitend; das Feld geht praktisch ungehindert durch sie hindurch und die Platte selbst bleibt kalt.',
 'Steht ein Topf mit ferromagnetischem Boden darauf, durchsetzt das Wechselfeld diesen Boden.',
 'Der magnetische Fluss im Topfboden ändert sich damit ständig, und nach dem Induktionsgesetz wird in ihm eine Spannung induziert.',
 'Der Boden ist ein geschlossener Leiter, also fließen in ihm Wirbelströme.',
 'Der Boden hat einen elektrischen Widerstand; die Wirbelströme geben dort ihre Energie als innere Energie ab. Dazu kommt die Erwärmung durch das ständige Ummagnetisieren.',
 'Die Wärme entsteht also unmittelbar im Topfboden und nicht in der Kochfläche.',
 'Daraus folgen die bekannten Vorteile: Die Hitze wirkt sofort, lässt sich schnell regeln und es geht wenig Energie an die Umgebung verloren.',
 'Töpfe aus Aluminium oder Kupfer heizen dagegen kaum: Sie sind nicht ferromagnetisch und haben einen zu kleinen Widerstand. Der Magnettest am Topfboden verrät, ob ein Topf geeignet ist.',
 'Fehlt der Topf, erkennt die Elektronik die fehlende Last und schaltet ab; deshalb lässt sich eine leere Platte nicht aufheizen.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Wie Nordlichter entstehen', s:[
 'Die Sonne schleudert ständig geladene Teilchen ins All, vor allem Elektronen und Protonen; dieser Strom heißt Sonnenwind.',
 'Bei einem Sonnensturm sind es besonders viele und besonders schnelle Teilchen.',
 'Die Erde besitzt ein Magnetfeld, dessen Feldlinien ähnlich wie bei einem Stabmagneten von einem Pol zum anderen verlaufen.',
 'Auf bewegte Ladungen in einem Magnetfeld wirkt die Lorentzkraft.',
 'Diese Kraft steht immer senkrecht auf der Bewegungsrichtung und senkrecht auf dem Feld; sie lenkt die Teilchen also ab, statt sie abzubremsen.',
 'Deshalb können die Teilchen nicht geradlinig auf die Erde zufliegen: Das Magnetfeld wirkt wie ein Schutzschild.',
 'Die Geschwindigkeitskomponente längs der Feldlinien bleibt dabei erhalten, weil in dieser Richtung keine Kraft wirkt.',
 'Aus beidem zusammen ergibt sich eine Schraubenbahn: Die Teilchen kreisen um eine Feldlinie und wandern zugleich an ihr entlang.',
 'Die Feldlinien laufen an den magnetischen Polen zusammen; die Teilchen werden daher zu den Polargebieten geführt.',
 'Dort dringen sie in etwa hundert bis dreihundert Kilometern Höhe in die Atmosphäre ein.',
 'Beim Zusammenstoß mit Sauerstoff- und Stickstoffatomen geben sie Energie ab und regen diese Atome an, heben also Elektronen auf höhere Energieniveaus.',
 'Fallen die Elektronen kurz darauf zurück, wird die Energie als Licht abgestrahlt. Jede Atomsorte leuchtet dabei in ihrer eigenen Farbe: Sauerstoff grün und rot, Stickstoff blauviolett.',
 'Deshalb erscheinen die Nordlichter als Ringe um die Pole und sind nur bei starken Sonnenstürmen auch weiter südlich zu sehen.'
]},
{f:'M', j:7, g:'Symmetrie und Winkel', t:'Beweis: Winkelsumme im Dreieck', s:[
 'Gegeben ist ein beliebiges Dreieck ABC mit den Innenwinkeln Alpha bei A, Beta bei B und Gamma bei C.',
 'Behauptung: Die Summe der drei Innenwinkel beträgt 180°.',
 'Zeichne durch den Punkt C eine Gerade p, die parallel zur Seite AB verläuft.',
 'Dass es diese Parallele gibt und dass sie eindeutig ist, sichert das Parallelenaxiom.',
 'Die Gerade durch A und C schneidet nun zwei parallele Geraden, nämlich AB und p.',
 'An Parallelen sind Wechselwinkel gleich groß. Der Wechselwinkel zu Alpha liegt bei C auf der einen Seite von Gamma und ist deshalb ebenfalls Alpha groß.',
 'Ebenso schneidet die Gerade durch B und C die beiden Parallelen; der zugehörige Wechselwinkel bei C ist Beta groß.',
 'Am Punkt C liegen damit drei Winkel nebeneinander auf der Geraden p: Alpha, Gamma und Beta.',
 'Winkel, die nebeneinander auf einer Geraden liegen, ergänzen sich zum gestreckten Winkel von 180°.',
 'Also gilt Alpha + Gamma + Beta = 180°.',
 'Da das Dreieck beliebig gewählt war, gilt das für jedes Dreieck. Damit ist die Behauptung bewiesen.'
]},

{f:'M', j:9, g:'Quadratwurzeln', t:'Heron-Verfahren: Wurzel näherungsweise berechnen', s:[
 'Gesucht ist die Wurzel aus einer Zahl a, ohne die Wurzeltaste zu benutzen.',
 'Grundidee: Ein Rechteck mit dem Flächeninhalt a hat die Seiten x und a geteilt durch x. Je quadratischer dieses Rechteck wird, desto näher liegen die Seiten an der gesuchten Wurzel.',
 'Wähle einen Startwert x, zum Beispiel eine nahe liegende ganze Zahl.',
 'Berechne die zweite Rechteckseite, also a geteilt durch x.',
 'Vergleiche beide Werte: Ist x zu klein, so ist a geteilt durch x zu groß – und umgekehrt. Die gesuchte Wurzel liegt also immer zwischen den beiden.',
 'Bilde den Mittelwert der beiden Werte; er ist der neue, bessere Näherungswert.',
 'Berechne mit diesem neuen x wieder a geteilt durch x.',
 'Mittle erneut und wiederhole diesen Schritt.',
 'Jede Wiederholung verdoppelt ungefähr die Zahl der richtigen Stellen; schon nach wenigen Schritten ist die Genauigkeit sehr hoch.',
 'Brich ab, sobald sich die Stellen, auf die es dir ankommt, nicht mehr ändern oder x und a geteilt durch x übereinstimmen.',
 'Mache die Probe, indem du das Ergebnis quadrierst und mit a vergleichst.'
]},

{f:'M', j:11, g:'Differentialrechnung', t:'Newton-Verfahren: Nullstelle näherungsweise bestimmen', s:[
 'Gesucht ist eine Nullstelle der Funktion f, die sich nicht exakt berechnen lässt.',
 'Verschaffe dir zuerst einen Überblick: Zeichne den Graphen oder suche einen Vorzeichenwechsel von f, um die Nullstelle grob einzugrenzen.',
 'Wähle einen Startwert in der Nähe der vermuteten Nullstelle.',
 'Bilde die Ableitung f Strich; sie wird in jedem Schritt gebraucht.',
 'Grundidee: Ersetze den Graphen in der Nähe des Startwerts durch seine Tangente.',
 'Lege die Tangente im Punkt mit dem Startwert an den Graphen an.',
 'Berechne die Nullstelle dieser Tangente; sie liegt in der Regel näher an der gesuchten Nullstelle als der Startwert.',
 'In Formeln: Der neue Wert ist der alte minus f an dieser Stelle geteilt durch f Strich an dieser Stelle.',
 'Wiederhole den Schritt mit dem neuen Wert; das Verfahren ist eine Iteration.',
 'Brich ab, wenn sich die Werte in der geforderten Genauigkeit nicht mehr ändern oder der Funktionswert nahe genug bei null liegt.',
 'Mache die Probe, indem du den gefundenen Wert in f einsetzt.',
 'Beachte die Grenzen: Ist die Ableitung an einer Stelle null oder liegt der Startwert ungünstig, kann das Verfahren scheitern oder zu einer ganz anderen Nullstelle führen.'
]},
{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus drei Seiten (SSS)', s:[
 'Gegeben sind die drei Seitenlängen a, b und c.',
 'Prüfe zuerst die Dreiecksungleichung: Je zwei Seiten zusammen müssen länger sein als die dritte. Sonst gibt es kein Dreieck.',
 'Fertige eine Planfigur an, eine freihändige Skizze mit allen gegebenen Stücken.',
 'Zeichne die längste Seite als Strecke; nenne ihre Endpunkte A und B. Das ist die Seite c.',
 'Stich mit dem Zirkel in A ein und stelle die Länge der Seite b ein.',
 'Zeichne damit einen Kreisbogen oberhalb der Strecke AB.',
 'Stich in B ein und stelle die Länge der Seite a ein.',
 'Zeichne damit einen zweiten Kreisbogen, der den ersten schneidet.',
 'Der Schnittpunkt der beiden Bögen ist der Punkt C.',
 'Verbinde A mit C und B mit C.',
 'Miss zur Probe alle drei Seiten nach; sie müssen mit den Vorgaben übereinstimmen.',
 'Nach dem Kongruenzsatz SSS ist das Dreieck durch die drei Seiten eindeutig festgelegt; die zweite Lösung unterhalb der Strecke ist nur die Spiegelung.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus zwei Seiten und Zwischenwinkel (SWS)', s:[
 'Gegeben sind zwei Seiten und der Winkel, der von ihnen eingeschlossen wird, zum Beispiel b, c und Alpha.',
 'Fertige eine Planfigur an und markiere darin die gegebenen Stücke.',
 'Prüfe, dass der gegebene Winkel wirklich zwischen den beiden gegebenen Seiten liegt. Nur dann gilt der Satz SWS.',
 'Zeichne die Seite c als Strecke AB.',
 'Trage im Punkt A mit dem Geodreieck den Winkel Alpha an die Strecke AB an und zeichne den freien Schenkel.',
 'Stich mit dem Zirkel in A ein und stelle die Länge der Seite b ein.',
 'Schlage einen Kreisbogen, der den freien Schenkel schneidet.',
 'Der Schnittpunkt ist der Punkt C.',
 'Verbinde B mit C; damit ist das Dreieck fertig.',
 'Miss zur Probe die Seite b und den Winkel Alpha nach.',
 'Nach dem Kongruenzsatz SWS ist das Dreieck damit eindeutig bestimmt.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus einer Seite und zwei Winkeln (WSW)', s:[
 'Gegeben sind eine Seite und die beiden Winkel, die an ihr anliegen, zum Beispiel c, Alpha und Beta.',
 'Prüfe, dass die Summe der beiden gegebenen Winkel kleiner als 180° ist. Sonst schneiden sich die Schenkel nicht.',
 'Fertige eine Planfigur an.',
 'Zeichne die Seite c als Strecke AB.',
 'Trage im Punkt A den Winkel Alpha an die Strecke an und zeichne den freien Schenkel.',
 'Trage im Punkt B den Winkel Beta an dieselbe Strecke an, und zwar auf derselben Seite wie Alpha.',
 'Zeichne auch hier den freien Schenkel.',
 'Die beiden freien Schenkel schneiden sich in einem Punkt; das ist der Punkt C.',
 'Zeichne die Seiten bis zu diesem Schnittpunkt aus.',
 'Miss zur Probe den dritten Winkel nach: Alle drei Winkel müssen zusammen 180° ergeben.',
 'Nach dem Kongruenzsatz WSW ist das Dreieck eindeutig bestimmt. Ist statt eines anliegenden Winkels der gegenüberliegende gegeben, rechne ihn zuerst über die Winkelsumme aus.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus zwei Seiten und Gegenwinkel (SsW)', s:[
 'Gegeben sind zwei Seiten und der Winkel, der der längeren von beiden gegenüberliegt, zum Beispiel a, c und Alpha mit a größer als c.',
 'Prüfe genau diese Bedingung: Der gegebene Winkel muss der längeren Seite gegenüberliegen. Nur dann ist die Konstruktion eindeutig.',
 'Fertige eine Planfigur an und markiere die gegebenen Stücke.',
 'Zeichne die Seite c als Strecke AB.',
 'Trage im Punkt A den Winkel Alpha an und zeichne den freien Schenkel ausreichend lang.',
 'Stich mit dem Zirkel in B ein und stelle die Länge der Seite a ein.',
 'Schlage einen Kreisbogen um B.',
 'Weil a länger als c ist, schneidet der Bogen den freien Schenkel genau einmal im Bereich des Dreiecks; dieser Schnittpunkt ist C.',
 'Verbinde B mit C.',
 'Miss zur Probe die Seite a und den Winkel Alpha nach.',
 'Liegt der gegebene Winkel dagegen der kürzeren Seite gegenüber, schneidet der Bogen zweimal: Dann gibt es zwei verschiedene Dreiecke, und die Angaben legen die Figur nicht eindeutig fest.'
]},

];

const FA={M:'Mathematik',Ph:'Physik'};
window.TafelReihen={
  verfuegbar:()=>A.length>0,
  anzahl:()=>A.length,
  /* gleiche Struktur wie die anderen Quellen des Auswahlfensters */
  daten(){ return A.map(e=>({ f:e.f, j:e.j, g:e.g, b:e.t,
    e:e.s.length+' Schritte · '+e.s[0].slice(0,70)+(e.s[0].length>70?' …':''),
    schritte:e.s.slice() })); },
  fachName:k=>FA[k]||k
};
})();

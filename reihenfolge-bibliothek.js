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

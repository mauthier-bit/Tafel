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
 'Eine Magnetkugel wird oben in ein senkrechtes Kupferrohr fallen gelassen. Sie sinkt auffällig langsam, obwohl Kupfer nicht magnetisch ist.',
 'Die Kugel bewegt sich, und mit ihr bewegt sich auch ihr Magnetfeld.',
 'Für jeden gedachten Ring der Rohrwand ändert sich dadurch der magnetische Fluss, der ihn durchsetzt.',
 'Nach dem Induktionsgesetz wird bei jeder Flussänderung eine Spannung induziert.',
 'Kupfer leitet sehr gut, und die Ringe der Rohrwand sind in sich geschlossen. Die induzierte Spannung treibt deshalb sofort einen Strom an: Es fließen Wirbelströme.',
 'Jeder dieser Wirbelströme erzeugt selbst ein Magnetfeld.',
 'In welche Richtung fließt der Strom? Das entscheidet die Energieerhaltung.',
 'Angenommen, das induzierte Feld würde die Kugel beschleunigen: Dann würde sie immer schneller werden und gleichzeitig würde im Kupfer Wärme entstehen.',
 'Energie entstünde damit aus dem Nichts. Das ist unmöglich, die Annahme ist also falsch.',
 'Das induzierte Feld muss folglich seiner Ursache entgegenwirken und die Kugel bremsen. Genau das besagt die lenzsche Regel.',
 'Konkret heißt das: Unterhalb der Kugel wirkt das induzierte Feld abstoßend, oberhalb der Kugel anziehend. Beide Kräfte zeigen nach oben.',
 'Die bremsende Kraft wächst mit der Geschwindigkeit. Sobald sie so groß wie die Gewichtskraft ist, sinkt die Kugel mit nahezu gleichbleibender Geschwindigkeit.',
 'Die Lageenergie der Kugel wird daher nicht in immer mehr Bewegungsenergie umgewandelt, sondern über die Wirbelströme in innere Energie des Kupfers: Das Rohr erwärmt sich.'
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
]}

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

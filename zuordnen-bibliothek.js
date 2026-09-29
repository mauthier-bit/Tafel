/* Aufgabensammlung für das Zuordnungswerkzeug (paarweise Zuordnung)
   -----------------------------------------------------------------
   Jede Gruppe liefert Paare aus linker und rechter Karte.
   Aufbau: { j:Jahrgangsstufe, g:Themenbereich, paare:[[links, rechts], …] }
   Die Funktionsgraphen stecken in funktionen-bibliothek.js; beide Quellen
   werden im Zuordnungswerkzeug gemeinsam angeboten.
*/
(function(){
"use strict";
const G=[

/* ---------- Mathematik 6: Brüche ---------- */
{ j:6, g:'Bruch und Dezimalbruch', paare:[
 ['1/2','0,5'], ['1/4','0,25'], ['3/4','0,75'], ['1/5','0,2'], ['2/5','0,4'],
 ['1/8','0,125'], ['3/8','0,375'], ['1/10','0,1'], ['7/10','0,7'], ['1/20','0,05'],
 ['1/3','0,333…'], ['2/3','0,666…'], ['9/10','0,9'], ['5/8','0,625'] ] },

{ j:6, g:'Brüche erweitern und kürzen', paare:[
 ['1/2','4/8'], ['2/3','8/12'], ['3/4','9/12'], ['1/5','3/15'], ['5/6','10/12'],
 ['3/8','6/16'], ['2/7','6/21'], ['4/9','12/27'], ['3/5','12/20'], ['7/8','21/24'] ] },

{ j:6, g:'Unechter Bruch und gemischte Zahl', paare:[
 ['7/2','3 1/2'], ['11/4','2 3/4'], ['5/3','1 2/3'], ['9/2','4 1/2'], ['17/5','3 2/5'],
 ['13/6','2 1/6'], ['22/7','3 1/7'], ['15/4','3 3/4'], ['8/3','2 2/3'], ['19/8','2 3/8'] ] },

/* ---------- Mathematik 7: Zahlenrätsel und Gleichungen ---------- */
{ j:7, g:'Zahlenrätsel und Gleichungen', paare:[
 ['Das Dreifache einer Zahl, vermindert um 5, ergibt 16.','3x − 5 = 16'],
 ['Addiert man zu einer Zahl 8, so erhält man das Doppelte der Zahl.','x + 8 = 2x'],
 ['Die Hälfte einer Zahl, vermehrt um 7, ergibt 12.','x : 2 + 7 = 12'],
 ['Vermindert man das Fünffache einer Zahl um 9, so erhält man 31.','5x − 9 = 31'],
 ['Das Doppelte der um 3 vergrößerten Zahl ergibt 20.','2 · (x + 3) = 20'],
 ['Eine Zahl und ihr Nachfolger ergeben zusammen 45.','x + (x + 1) = 45'],
 ['Ein Viertel einer Zahl ist um 6 kleiner als die Zahl.','x : 4 = x − 6'],
 ['Subtrahiert man 12 vom Dreifachen einer Zahl, so erhält man die Zahl selbst.','3x − 12 = x'],
 ['Das Siebenfache einer Zahl ist genauso groß wie die um 24 vergrößerte Zahl.','7x = x + 24'],
 ['Zwei aufeinanderfolgende gerade Zahlen ergeben zusammen 38.','x + (x + 2) = 38'],
 ['Vergrößert man eine Zahl um ihr Doppeltes, so erhält man 27.','x + 2x = 27'],
 ['Nimmt man von einer Zahl 4 weg und verdoppelt danach, erhält man 18.','2 · (x − 4) = 18'],
 ['Ein Drittel einer Zahl und 5 ergeben zusammen die halbe Zahl.','x : 3 + 5 = x : 2'],
 ['Das um 6 verminderte Vierfache einer Zahl ist 30.','4x − 6 = 30'] ] },

/* ---------- Mathematik 7: Terme umformen ---------- */
{ j:7, g:'Term und umgeformter Term', paare:[
 ['3 · (x + 4)','3x + 12'],
 ['2 · (5x − 3)','10x − 6'],
 ['x + x + x','3x'],
 ['4x + 2x − x','5x'],
 ['(x + 3)²','x² + 6x + 9'],
 ['(x − 5)²','x² − 10x + 25'],
 ['(x + 4) · (x − 4)','x² − 16'],
 ['5x + 10','5 · (x + 2)'],
 ['a · a · a','a³'],
 ['2a + 3b + 4a − b','6a + 2b'],
 ['−(x − 7)','−x + 7'],
 ['x · x + 2 · x · 3','x² + 6x'],
 ['6x − 3 · (x − 2)','3x + 6'],
 ['(2x)²','4x²'] ] }
];

window.TafelPaare={
  verfuegbar:()=>G.length>0,
  anzahl:()=>G.reduce((s,g)=>s+g.paare.length,0),
  /* gleiche Struktur wie die anderen Quellen: b = linke Karte, e = rechte Karte */
  daten(){ const out=[];
    G.forEach(gr=>gr.paare.forEach(p=>out.push({ f:'M', j:gr.j, g:gr.g, b:p[0], e:p[1] })));
    return out; }
};
})();

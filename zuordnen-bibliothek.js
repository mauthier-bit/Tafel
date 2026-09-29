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

/* ---------- Potenzterme: gleiche Sorte Aufgabe, über die Jahrgangsstufen hinweg ---------- */
{ j:5, g:'Potenzterme', paare:[
 ['2 · 2 · 2','2³'], ['5 · 5','5²'], ['10 · 10 · 10 · 10','10⁴'], ['3 · 3 · 3 · 3','3⁴'],
 ['2⁵','32'], ['3⁴','81'], ['10³','1000'], ['4³','64'], ['2⁶','64'], ['5³','125'] ] },

{ j:6, g:'Potenzterme', paare:[
 ['2⁻¹','1/2'], ['10⁻²','0,01'], ['10⁻³','0,001'], ['(1/2)³','1/8'], ['(2/3)²','4/9'],
 ['0,1²','0,01'], ['(3/4)²','9/16'], ['5⁻¹','1/5'], ['(1/10)²','0,01'], ['(0,5)²','0,25'] ] },

{ j:7, g:'Potenzterme', paare:[
 ['a³ · a²','a⁵'], ['x⁵ : x²','x³'], ['(a²)³','a⁶'], ['a² · b²','(a · b)²'],
 ['(2a)³','8a³'], ['x · x⁴','x⁵'], ['(x³)²','x⁶'], ['2³ · 2⁴','2⁷'],
 ['(3x)²','9x²'], ['a⁷ : a⁷','1'] ] },

{ j:8, g:'Potenzterme', paare:[
 ['x⁻²','1/x²'], ['(x³)⁻¹','1/x³'], ['a⁰','1'], ['3x⁻¹','3/x'],
 ['(2/x)²','4/x²'], ['x³ : x⁵','1/x²'], ['(x⁻¹)⁻¹','x'], ['2⁻³','1/8'],
 ['(a/b)⁻¹','b/a'], ['x⁻¹ · x⁴','x³'] ] },

{ j:9, g:'Potenzterme', paare:[
 ['x^(1/2)','√x'], ['x^(1/3)','∛x'], ['x^(3/2)','√(x³)'], ['8^(1/3)','2'],
 ['16^(3/4)','8'], ['25^(1/2)','5'], ['27^(2/3)','9'], ['x^(1/2) · x^(1/2)','x'],
 ['(√x)³','x^(3/2)'], ['100^(1/2)','10'] ] },

/* ---------- Mathematik 8: Bruchterme ---------- */
{ j:8, g:'Bruchterme kürzen und umformen', paare:[
 ['6x / (3x)','2'],
 ['(4a) / (2a)','2'],
 ['x² / x','x'],
 ['(3x + 6) / 3','x + 2'],
 ['(x² − 4) / (x + 2)','x − 2'],
 ['(5x) / x²','5 / x'],
 ['(x + 1) / (2x + 2)','1/2'],
 ['(3a²b) / (6ab)','a / 2'],
 ['1/x + 2/x','3 / x'],
 ['1/x − 1/(2x)','1 / (2x)'],
 ['1/2 + 1/x','(x + 2) / (2x)'],
 ['(a/b) · (b/a)','1'],
 ['(2/x) · (x/3)','2/3'],
 ['(1/x) : (2/x)','1/2'],
 ['(x² − 9) / (x − 3)','x + 3'],
 ['2 / (x + 1) + 3 / (x + 1)','5 / (x + 1)'] ] },

/* ---------- Mathematik 9: Wurzelterme ---------- */
{ j:9, g:'Wurzelterme vereinfachen', paare:[
 ['√50','5√2'],
 ['√12','2√3'],
 ['√72','6√2'],
 ['√45','3√5'],
 ['√8 + √2','3√2'],
 ['√18 − √2','2√2'],
 ['√3 · √12','6'],
 ['√2 · √8','4'],
 ['(√5)²','5'],
 ['(2√3)²','12'],
 ['3√2 · 2√2','12'],
 ['1 / √2','√2 / 2'],
 ['√(9/16)','3/4'],
 ['√(a²)','|a|'],
 ['√20 + √5','3√5'],
 ['√6 · √6','6'] ] },

/* ---------- Mathematik 10: Logarithmusterme ---------- */
{ j:10, g:'Logarithmusterme', paare:[
 ['log₂(8)','3'],
 ['log₂(16)','4'],
 ['log₂(32)','5'],
 ['log₂(1)','0'],
 ['log₂(2)','1'],
 ['log₃(9)','2'],
 ['log₃(27)','3'],
 ['log₅(25)','2'],
 ['log₁₀(1000)','3'],
 ['log₁₀(10⁶)','6'],
 ['log₁₀(0,1)','−1'],
 ['log₂(1/2)','−1'],
 ['log₂(1/8)','−3'],
 ['log₄(2)','0,5'],
 ['log₂(2⁵)','5'],
 ['log₇(49)','2'] ] },

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

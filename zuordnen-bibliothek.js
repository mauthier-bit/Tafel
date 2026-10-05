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
 ['(2x)²','4x²'] ] },

/* ---------- Distributivgesetz: über drei Jahrgangsstufen hinweg dieselbe Idee ---------- */
{ j:5, g:'Distributivgesetz (ganze Zahlen)', paare:[
 ['7 · (20 + 3)','7 · 20 + 7 · 3'],
 ['4 · (50 + 6)','4 · 50 + 4 · 6'],
 ['6 · (40 + 5)','6 · 40 + 6 · 5'],
 ['9 · (30 − 2)','9 · 30 − 9 · 2'],
 ['8 · (100 − 7)','8 · 100 − 8 · 7'],
 ['12 · (10 + 9)','12 · 10 + 12 · 9'],
 ['(12 + 5) · 3','12 · 3 + 5 · 3'],
 ['(20 − 4) · 7','20 · 7 − 4 · 7'],
 ['25 · (8 + 4)','25 · 8 + 25 · 4'],
 ['7 · 102','7 · 100 + 7 · 2'],
 ['6 · 98','6 · 100 − 6 · 2'],
 ['5 · (10 + 4 + 2)','5 · 10 + 5 · 4 + 5 · 2'],
 ['3 · (20 + 6 + 1)','3 · 20 + 3 · 6 + 3 · 1'],
 ['2 · (30 + 8 + 5)','2 · 30 + 2 · 8 + 2 · 5'] ] },

{ j:6, g:'Distributivgesetz (Brüche und Dezimalzahlen)', paare:[
 ['1/2 · (8 + 6)','1/2 · 8 + 1/2 · 6'],
 ['2/3 · (9 + 3)','2/3 · 9 + 2/3 · 3'],
 ['3/4 · (8 − 4)','3/4 · 8 − 3/4 · 4'],
 ['4/5 · (15 + 5)','4/5 · 15 + 4/5 · 5'],
 ['(3/5 + 1/5) · 10','3/5 · 10 + 1/5 · 10'],
 ['0,5 · (12 + 4)','0,5 · 12 + 0,5 · 4'],
 ['0,2 · (30 + 15)','0,2 · 30 + 0,2 · 15'],
 ['1,5 · (10 − 2)','1,5 · 10 − 1,5 · 2'],
 ['0,1 · (70 − 20)','0,1 · 70 − 0,1 · 20'],
 ['2,5 · (1,2 + 0,8)','2,5 · 1,2 + 2,5 · 0,8'],
 ['(0,4 + 0,6) · 7','0,4 · 7 + 0,6 · 7'],
 ['0,25 · (40 + 8 + 4)','0,25 · 40 + 0,25 · 8 + 0,25 · 4'],
 ['1/3 · (6 + 9 + 3)','1/3 · 6 + 1/3 · 9 + 1/3 · 3'],
 ['1,2 · (5 + 10 + 20)','1,2 · 5 + 1,2 · 10 + 1,2 · 20'] ] },

{ j:7, g:'Distributivgesetz (Terme)', paare:[
 ['4 · (x + 5)','4x + 20'],
 ['7 · (2x − 3)','14x − 21'],
 ['(y + 8) · 5','5y + 40'],
 ['−3 · (x − 2)','−3x + 6'],
 ['x · (x + 7)','x² + 7x'],
 ['2a · (3a + 4)','6a² + 8a'],
 ['x · (4x − 7)','4x² − 7x'],
 ['5 · (2x + 3y)','10x + 15y'],
 ['8 · (3x − 2y)','24x − 16y'],
 ['1/2 · (6x + 10)','3x + 5'],
 ['a · (b + c + d)','ab + ac + ad'],
 ['2 · (x + 3y + 4)','2x + 6y + 8'],
 ['4 · (a + b + 2c)','4a + 4b + 8c'],
 ['3x · (x + 2y + 5)','3x² + 6xy + 15x'] ] },

/* ---------- Mathematik 8: binomische Formeln ---------- */
{ j:8, g:'Binomische Formeln: ausmultiplizieren', paare:[
 ['(a + 2)²','a² + 4a + 4'],
 ['(x + 5)²','x² + 10x + 25'],
 ['(y − 3)²','y² − 6y + 9'],
 ['(a − 7)²','a² − 14a + 49'],
 ['(2a + 1)²','4a² + 4a + 1'],
 ['(3x − 2)²','9x² − 12x + 4'],
 ['(2a + b)²','4a² + 4ab + b²'],
 ['(x − 2y)²','x² − 4xy + 4y²'],
 ['(a + b)(a − b)','a² − b²'],
 ['(x + 6)(x − 6)','x² − 36'],
 ['(2x + 3)(2x − 3)','4x² − 9'],
 ['(5 + a)(5 − a)','25 − a²'],
 ['(3a + 4b)(3a − 4b)','9a² − 16b²'],
 ['(x + 1/2)²','x² + x + 1/4'] ] },

{ j:8, g:'Binomische Formeln: faktorisieren', paare:[
 ['a² + 4a + 4','(a + 2)²'],
 ['x² + 10x + 25','(x + 5)²'],
 ['y² − 6y + 9','(y − 3)²'],
 ['a² − 14a + 49','(a − 7)²'],
 ['4a² + 4a + 1','(2a + 1)²'],
 ['9x² − 12x + 4','(3x − 2)²'],
 ['x² − 4xy + 4y²','(x − 2y)²'],
 ['x² − 9','(x + 3)(x − 3)'],
 ['x² − 36','(x + 6)(x − 6)'],
 ['4x² − 25','(2x + 5)(2x − 5)'],
 ['49 − a²','(7 + a)(7 − a)'],
 ['9a² − 16b²','(3a + 4b)(3a − 4b)'],
 ['a² + 2ab + b²','(a + b)²'],
 ['x² − 2x + 1','(x − 1)²'] ] },

/* ---------- Mathematik 9: teilweises Wurzelziehen ---------- */
{ j:9, g:'Teilweises Wurzelziehen (Zahlen)', paare:[
 ['√8','2√2'],
 ['√18','3√2'],
 ['√20','2√5'],
 ['√27','3√3'],
 ['√32','4√2'],
 ['√48','4√3'],
 ['√75','5√3'],
 ['√98','7√2'],
 ['√108','6√3'],
 ['√128','8√2'],
 ['√147','7√3'],
 ['√162','9√2'],
 ['√200','10√2'],
 ['√300','10√3'],
 ['2√50','10√2'],
 ['3√12','6√3'] ] },

{ j:9, g:'Teilweises Wurzelziehen mit Variablen (a, x ≥ 0)', paare:[
 ['√(a³)','a√a'],
 ['√(x⁵)','x²√x'],
 ['√(a⁷)','a³√a'],
 ['√(4a²)','2a'],
 ['√(25x⁴)','5x²'],
 ['√(9x³)','3x√x'],
 ['√(a²b)','a√b'],
 ['√(x⁴y)','x²√y'],
 ['√(8a³)','2a√(2a)'],
 ['√(18x³)','3x√(2x)'],
 ['√(12a²)','2a√3'],
 ['√(50x²)','5x√2'],
 ['√(a³b²)','ab√a'],
 ['√(27x⁵)','3x²√(3x)'] ] },

/* ---------- Mathematik 10: Logarithmusgesetze ---------- */
{ j:10, g:'Logarithmusgesetze', paare:[
 ['log(a · b)','log(a) + log(b)'],
 ['log(a / b)','log(a) − log(b)'],
 ['log(aⁿ)','n · log(a)'],
 ['log(√a)','0,5 · log(a)'],
 ['log(1/a)','−log(a)'],
 ['log₂(8 · 4)','5'],
 ['log₂(32 / 4)','3'],
 ['log₃(9²)','4'],
 ['log(100 · 1000)','5'],
 ['log₂(√8)','1,5'],
 ['ln(e)','1'],
 ['ln(1)','0'],
 ['ln(e³)','3'],
 ['ln(1/e)','−1'],
 ['log₁₀(10ˣ)','x'],
 ['2^(log₂(7))','7'] ] },

/* ---------- Physik: Einheiten umrechnen ---------- */
{ f:'Ph', j:7, g:'Dichte: g/cm³, kg/dm³ und kg/m³', paare:[
 ['1 g/cm³','1000 kg/m³'],
 ['2,7 g/cm³','2700 kg/m³'],
 ['7,8 g/cm³','7800 kg/m³'],
 ['0,92 g/cm³','920 kg/m³'],
 ['11,3 g/cm³','11300 kg/m³'],
 ['19,3 g/cm³','19300 kg/m³'],
 ['13,6 g/cm³','13600 kg/m³'],
 ['0,8 g/cm³','800 kg/m³'],
 ['2,5 g/cm³','2500 kg/m³'],
 ['0,0013 g/cm³','1,3 kg/m³'],
 ['5 g/cm³','5 kg/dm³'],
 ['3,2 kg/dm³','3200 kg/m³'],
 ['850 kg/m³','0,85 g/cm³'],
 ['1500 g/dm³','1,5 kg/dm³'] ] },

{ f:'Ph', j:8, g:'Geschwindigkeit: km/h und m/s', paare:[
 ['36 km/h','10 m/s'],
 ['72 km/h','20 m/s'],
 ['18 km/h','5 m/s'],
 ['90 km/h','25 m/s'],
 ['108 km/h','30 m/s'],
 ['54 km/h','15 m/s'],
 ['3,6 km/h','1 m/s'],
 ['1,8 km/h','0,5 m/s'],
 ['100 km/h','rund 27,8 m/s'],
 ['12 m/s','43,2 km/h'],
 ['2,5 m/s','9 km/h'],
 ['0,2 m/s','0,72 km/h'],
 ['50 m/s','180 km/h'],
 ['8 m/s','28,8 km/h'] ] },

{ f:'Ph', j:9, g:'Temperatur: °C und K', paare:[
 ['0 °C','273,15 K'],
 ['100 °C','373,15 K'],
 ['20 °C','293,15 K'],
 ['25 °C','298,15 K'],
 ['37 °C','310,15 K'],
 ['10 °C','283,15 K'],
 ['−18 °C','255,15 K'],
 ['−40 °C','233,15 K'],
 ['1000 °C','1273,15 K'],
 ['−273,15 °C','0 K'],
 ['300 K','26,85 °C'],
 ['500 K','226,85 °C'],
 ['77 K','−196,15 °C'],
 ['4,2 K','−268,95 °C'] ] },

{ f:'Ph', j:9, g:'Energie: J und kWh', paare:[
 ['1 kWh','3,6 MJ'],
 ['2 kWh','7,2 MJ'],
 ['0,5 kWh','1,8 MJ'],
 ['10 kWh','36 MJ'],
 ['3 kWh','10,8 MJ'],
 ['5 kWh','18 MJ'],
 ['20 kWh','72 MJ'],
 ['100 kWh','360 MJ'],
 ['2,5 kWh','9 MJ'],
 ['0,1 kWh','360000 J'],
 ['0,25 kWh','900000 J'],
 ['1,5 kWh','5400000 J'],
 ['36000 J','0,01 kWh'],
 ['720000 J','0,2 kWh'] ] },

{ f:'Ph', j:9, g:'Ladung: C, Ah und mAh', paare:[
 ['1 Ah','3600 C'],
 ['2 Ah','7200 C'],
 ['10 Ah','36000 C'],
 ['4,5 Ah','16200 C'],
 ['0,25 Ah','900 C'],
 ['0,05 Ah','180 C'],
 ['1 mAh','3,6 C'],
 ['100 mAh','360 C'],
 ['500 mAh','1800 C'],
 ['5000 mAh','18000 C'],
 ['3000 mAh','3 Ah'],
 ['1500 mAh','1,5 Ah'],
 ['2500 mAh','2,5 Ah'],
 ['0,8 Ah','800 mAh'] ] },

/* ---------- Physik: gültige Ziffern (Taschenrechnerwert → sinnvoll gerundet) ---------- */
{ f:'Ph', j:7, g:'Gültige Ziffern', paare:[
 ['8,3741 m (3 gültige Ziffern)','8,37 m'],
 ['12,4567 cm (4 gültige Ziffern)','12,46 cm'],
 ['0,004567 kg (2 gültige Ziffern)','0,0046 kg'],
 ['2,3049 g/cm³ (3 gültige Ziffern)','2,30 g/cm³'],
 ['145,82 g (4 gültige Ziffern)','145,8 g'],
 ['7,0952 L (3 gültige Ziffern)','7,10 L'],
 ['0,07846 m³ (2 gültige Ziffern)','0,078 m³'],
 ['36,249 mm (3 gültige Ziffern)','36,2 mm'],
 ['1,8356 kg (2 gültige Ziffern)','1,8 kg'],
 ['0,51283 L (3 gültige Ziffern)','0,513 L'] ] },

{ f:'Ph', j:8, g:'Gültige Ziffern', paare:[
 ['23,4567 m/s (3 gültige Ziffern)','23,5 m/s'],
 ['0,082345 kWh (2 gültige Ziffern)','0,082 kWh'],
 ['1234,7 J (3 gültige Ziffern)','1,23 · 10³ J'],
 ['96,049 km/h (4 gültige Ziffern)','96,05 km/h'],
 ['0,0039876 kWh (3 gültige Ziffern)','0,00399 kWh'],
 ['15,996 m/s (3 gültige Ziffern)','16,0 m/s'],
 ['847,32 J (2 gültige Ziffern)','8,5 · 10² J'],
 ['3,6049 kJ (3 gültige Ziffern)','3,60 kJ'],
 ['0,74851 kW (3 gültige Ziffern)','0,749 kW'],
 ['58,347 km/h (2 gültige Ziffern)','58 km/h'] ] },

{ f:'Ph', j:9, g:'Gültige Ziffern', paare:[
 ['0,23456 A (3 gültige Ziffern)','0,235 A'],
 ['229,87 V (4 gültige Ziffern)','229,9 V'],
 ['4,7051 Ω (3 gültige Ziffern)','4,71 Ω'],
 ['0,0062849 A (2 gültige Ziffern)','0,0063 A'],
 ['1498,6 Ω (3 gültige Ziffern)','1,50 · 10³ Ω'],
 ['12,0049 V (4 gültige Ziffern)','12,00 V'],
 ['0,98765 W (2 gültige Ziffern)','0,99 W'],
 ['36,452 °C (3 gültige Ziffern)','36,5 °C'],
 ['4186,8 J/(kg·K) (3 gültige Ziffern)','4,19 · 10³ J/(kg·K)'],
 ['0,00049982 F (2 gültige Ziffern)','5,0 · 10⁻⁴ F'] ] },

{ f:'Ph', j:11, g:'Gültige Ziffern', paare:[
 ['9,80665 m/s² (3 gültige Ziffern)','9,81 m/s²'],
 ['299792458 m/s (4 gültige Ziffern)','2,998 · 10⁸ m/s'],
 ['6,67430 · 10⁻¹¹ N·m²/kg² (3 gültige Ziffern)','6,67 · 10⁻¹¹ N·m²/kg²'],
 ['1,602176634 · 10⁻¹⁹ C (3 gültige Ziffern)','1,60 · 10⁻¹⁹ C'],
 ['6,62607015 · 10⁻³⁴ J·s (4 gültige Ziffern)','6,626 · 10⁻³⁴ J·s'],
 ['0,000123456 s (3 gültige Ziffern)','1,23 · 10⁻⁴ s'],
 ['54321 N (2 gültige Ziffern)','5,4 · 10⁴ N'],
 ['1,00794 u (3 gültige Ziffern)','1,01 u'],
 ['0,0909091 kg (3 gültige Ziffern)','0,0909 kg'],
 ['7,6543 · 10⁵ Pa (2 gültige Ziffern)','7,7 · 10⁵ Pa'] ] },
];

/* ---------- Gruppenaufgaben: ein Feld, mehrere Karten ----------
   Hier gehören mehrere Situationen zu demselben Urnenmodell – als Paare wären sie
   nicht eindeutig zuzuordnen, deshalb stehen sie als Gruppe (Feld + Karten). */
const GR=[

{ j:12, g:'Zufallsexperimente und Urnenmodelle', felder:[
 ['mit Zurücklegen · Reihenfolge zählt (nᵏ)', [
   'Eine Münze fünfmal werfen und die Folge notieren',
   'Zahlenschloss mit vier Ziffern von 0 bis 9',
   'Dreimal würfeln und die Augenzahlen der Reihe nach aufschreiben',
   'Toto: für elf Spiele je 1, X oder 2 tippen',
   'Beim Korbwurf dreimal werfen und Treffer oder Fehlwurf notieren',
   'Ein Kennwort aus fünf Buchstaben bilden' ] ],
 ['ohne Zurücklegen · Reihenfolge zählt (n · (n−1) · …)', [
   'Gold, Silber und Bronze unter acht Läuferinnen vergeben',
   'Die ersten drei Pferde eines Rennens in der richtigen Reihenfolge tippen',
   'Aus zwölf Kindern Sprecher, Vertreter und Kassenwart wählen',
   'Drei verschiedene Eissorten auf der Waffel übereinander',
   'Die Startreihenfolge der fünf Schwimmer einer Staffel festlegen' ] ],
 ['ohne Zurücklegen · Reihenfolge egal (n über k)', [
   'Lotto: sechs Zahlen aus 49 ziehen',
   'Aus zehn Aufgaben drei zum Rechnen auswählen',
   'Eine Mannschaft aus fünf von zwölf Spielern aufstellen',
   'Drei Lose aus der Tombola ziehen und behalten',
   'Fünf Karten aus dem Skatblatt auf die Hand nehmen',
   'Aus der Klasse eine Gruppe von vier Kindern bilden' ] ],
 ['mit Zurücklegen · Reihenfolge egal', [
   'Drei Kugeln Eis aus acht Sorten in einem Becher',
   'Fünf Gummibärchen aus vier Farben in eine Tüte',
   'Beim Dart dreimal werfen – nur die getroffenen Felder zählen, nicht die Reihenfolge',
   'Sechs Semmeln aus vier Sorten beim Bäcker kaufen',
   'Drei Würfel gleichzeitig werfen und nur notieren, welche Augenzahlen fallen' ] ]
]}

];

window.TafelPaare={
  verfuegbar:()=>G.length>0,
  anzahl:()=>G.reduce((s,g)=>s+g.paare.length,0)+GR.reduce((s,g)=>s+g.felder.reduce((t,f)=>t+f[1].length,0),0),
  /* gleiche Struktur wie die anderen Quellen: b = linke Karte, e = rechte Karte.
     Gruppeneinträge bringen zusätzlich k = die Karten, die in dieses Feld gehören. */
  daten(){ const out=[];
    G.forEach(gr=>gr.paare.forEach(p=>out.push({ f:gr.f||'M', j:gr.j, g:gr.g, b:p[0], e:p[1] })));
    GR.forEach(gr=>gr.felder.forEach(f=>out.push({ f:gr.f||'M', j:gr.j, g:gr.g, b:f[0], e:f[1].join(' · '), k:f[1].slice() })));
    return out; }
};
})();

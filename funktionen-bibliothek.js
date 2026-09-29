/* Bibliothek „Funktionsterm und Graph" für das Zuordnungswerkzeug
   ---------------------------------------------------------------
   Die Graphen werden beim Import gezeichnet, nicht als Bilddateien mitgeliefert:
   Das bleibt klein, scharf auf jedem Bildschirm und funktioniert offline.
   Aufbau je Eintrag: { j:Jahrgangsstufe, g:Themenbereich, t:Termtext, f:Funktion, fenster? }
*/
(function(){
"use strict";
const F=[
 /* ---- Jgst. 8: lineare Funktionen ---- */
 {j:8,g:'Lineare Funktionen',t:'f(x) = x',            f:x=>x},
 {j:8,g:'Lineare Funktionen',t:'f(x) = 2x',           f:x=>2*x},
 {j:8,g:'Lineare Funktionen',t:'f(x) = 0,5x',         f:x=>0.5*x},
 {j:8,g:'Lineare Funktionen',t:'f(x) = −x',           f:x=>-x},
 {j:8,g:'Lineare Funktionen',t:'f(x) = x + 2',        f:x=>x+2},
 {j:8,g:'Lineare Funktionen',t:'f(x) = −2x + 3',      f:x=>-2*x+3},
 {j:8,g:'Lineare Funktionen',t:'f(x) = 3',            f:()=>3},
 /* ---- Jgst. 8: elementare gebrochen-rationale Funktionen ---- */
 {j:8,g:'Gebrochen-rationale Funktionen',t:'f(x) = 1/x',      f:x=>1/x, pol:[0]},
 {j:8,g:'Gebrochen-rationale Funktionen',t:'f(x) = 2/x',      f:x=>2/x, pol:[0]},
 {j:8,g:'Gebrochen-rationale Funktionen',t:'f(x) = −1/x',     f:x=>-1/x, pol:[0]},
 {j:8,g:'Gebrochen-rationale Funktionen',t:'f(x) = 1/(x − 1)',f:x=>1/(x-1), pol:[1]},
 /* ---- Jgst. 9: quadratische Funktionen ---- */
 {j:9,g:'Quadratische Funktionen',t:'f(x) = x²',              f:x=>x*x},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = −x²',             f:x=>-x*x},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = 0,5x²',           f:x=>0.5*x*x},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = 2x²',             f:x=>2*x*x},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = x² − 3',          f:x=>x*x-3},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = (x − 2)²',        f:x=>(x-2)*(x-2)},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = (x + 1)² − 2',    f:x=>(x+1)*(x+1)-2},
 {j:9,g:'Quadratische Funktionen',t:'f(x) = x² − 2x − 3',     f:x=>x*x-2*x-3},
 /* ---- Jgst. 9: Potenzfunktionen und Wurzel ---- */
 {j:9,g:'Potenzfunktionen',t:'f(x) = x³',             f:x=>x*x*x},
 {j:9,g:'Potenzfunktionen',t:'f(x) = x⁴',             f:x=>x*x*x*x},
 {j:9,g:'Potenzfunktionen',t:'f(x) = √x',             f:x=>x>=0?Math.sqrt(x):NaN},
 /* ---- Jgst. 10: Exponential-, Logarithmus- und trigonometrische Funktionen ---- */
 {j:10,g:'Exponentielles Wachstum',t:'f(x) = 2ˣ',       f:x=>Math.pow(2,x)},
 {j:10,g:'Exponentielles Wachstum',t:'f(x) = 0,5ˣ',     f:x=>Math.pow(0.5,x)},
 {j:10,g:'Exponentielles Wachstum',t:'f(x) = 3 · 2ˣ',   f:x=>3*Math.pow(2,x)},
 {j:10,g:'Exponentielles Wachstum',t:'f(x) = log₂(x)',  f:x=>x>0?Math.log2(x):NaN},
 {j:10,g:'Sinus- und Kosinusfunktion',t:'f(x) = sin(x)',       f:x=>Math.sin(x), fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}},
 {j:10,g:'Sinus- und Kosinusfunktion',t:'f(x) = cos(x)',       f:x=>Math.cos(x), fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}},
 {j:10,g:'Sinus- und Kosinusfunktion',t:'f(x) = 2 · sin(x)',   f:x=>2*Math.sin(x), fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}},
 {j:10,g:'Sinus- und Kosinusfunktion',t:'f(x) = sin(2x)',      f:x=>Math.sin(2*x), fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}},
 {j:10,g:'Sinus- und Kosinusfunktion',t:'f(x) = sin(x) + 1',   f:x=>Math.sin(x)+1, fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}},
 /* ---- Jgst. 10/11: ganzrationale Funktionen ---- */
 {j:10,g:'Ganzrationale Funktionen',t:'f(x) = x³ − 3x',        f:x=>x*x*x-3*x},
 {j:10,g:'Ganzrationale Funktionen',t:'f(x) = x⁴ − 4x²',       f:x=>x*x*x*x-4*x*x, fenster:{xmin:-3,xmax:3,ymin:-6,ymax:6}},
 {j:10,g:'Ganzrationale Funktionen',t:'f(x) = −x³ + x',        f:x=>-x*x*x+x},
 {j:11,g:'Gebrochen-rationale Funktionen',t:'f(x) = 1/x²',     f:x=>1/(x*x), pol:[0]},
 {j:11,g:'Gebrochen-rationale Funktionen',t:'f(x) = x/(x − 2)',f:x=>x/(x-2), pol:[2]},
 {j:11,g:'Gebrochen-rationale Funktionen',t:'f(x) = 1/(x² − 1)',f:x=>1/(x*x-1), pol:[-1,1]},
 /* ---- Jgst. 12: e-Funktion, Logarithmus, Wurzel ---- */
 {j:12,g:'Natürliche Exponentialfunktion',t:'f(x) = eˣ',        f:x=>Math.exp(x)},
 {j:12,g:'Natürliche Exponentialfunktion',t:'f(x) = e⁻ˣ',       f:x=>Math.exp(-x)},
 {j:12,g:'Natürliche Exponentialfunktion',t:'f(x) = x · eˣ',    f:x=>x*Math.exp(x)},
 {j:12,g:'Natürliche Exponentialfunktion',t:'f(x) = e^(−x²)',   f:x=>Math.exp(-x*x), fenster:{xmin:-3,xmax:3,ymin:-1,ymax:2}},
 {j:12,g:'Natürliche Logarithmusfunktion',t:'f(x) = ln(x)',     f:x=>x>0?Math.log(x):NaN},
 {j:12,g:'Natürliche Logarithmusfunktion',t:'f(x) = ln(x + 2)', f:x=>x>-2?Math.log(x+2):NaN},
 {j:12,g:'Wurzelfunktion',t:'f(x) = √(x + 1)',                  f:x=>x>=-1?Math.sqrt(x+1):NaN},
 {j:12,g:'Wurzelfunktion',t:'f(x) = 2√x',                       f:x=>x>=0?2*Math.sqrt(x):NaN}
];

/* ---------- Graph zeichnen ---------- */
function zeichne(e, breite, hoehe){
  const w=breite||300, h=hoehe||230;
  const fe=Object.assign({xmin:-5,xmax:5,ymin:-5,ymax:5}, e.fenster||{});
  const c=document.createElement('canvas'); const dpr=Math.max(2,Math.min(3,window.devicePixelRatio||1));
  c.width=Math.round(w*dpr); c.height=Math.round(h*dpr);
  const g=c.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
  g.fillStyle='#fff'; g.fillRect(0,0,w,h);
  const PX=x=>(x-fe.xmin)/(fe.xmax-fe.xmin)*w, PY=y=>h-(y-fe.ymin)/(fe.ymax-fe.ymin)*h;
  /* Gitter */
  g.strokeStyle='#e2e8f0'; g.lineWidth=1; g.beginPath();
  for(let x=Math.ceil(fe.xmin);x<=fe.xmax;x++){ g.moveTo(PX(x),0); g.lineTo(PX(x),h); }
  for(let y=Math.ceil(fe.ymin);y<=fe.ymax;y++){ g.moveTo(0,PY(y)); g.lineTo(w,PY(y)); }
  g.stroke();
  /* Achsen mit Pfeilen und Zahlen */
  g.strokeStyle='#334155'; g.lineWidth=2; g.beginPath();
  g.moveTo(0,PY(0)); g.lineTo(w,PY(0)); g.moveTo(PX(0),h); g.lineTo(PX(0),0); g.stroke();
  g.beginPath(); g.moveTo(w,PY(0)); g.lineTo(w-8,PY(0)-4); g.moveTo(w,PY(0)); g.lineTo(w-8,PY(0)+4);
  g.moveTo(PX(0),0); g.lineTo(PX(0)-4,8); g.moveTo(PX(0),0); g.lineTo(PX(0)+4,8); g.stroke();
  g.fillStyle='#475569'; g.font='11px -apple-system,sans-serif'; g.textAlign='center'; g.textBaseline='top';
  const schrittX=(fe.xmax-fe.xmin)>9?2:1, schrittY=(fe.ymax-fe.ymin)>9?2:1;
  for(let x=Math.ceil(fe.xmin);x<=fe.xmax-0.5;x+=schrittX){ if(!x) continue; g.fillText(String(x),PX(x),PY(0)+4); }
  g.textAlign='right'; g.textBaseline='middle';
  for(let y=Math.ceil(fe.ymin);y<=fe.ymax-0.5;y+=schrittY){ if(!y) continue; g.fillText(String(y),PX(0)-4,PY(y)); }
  /* Kurve – an Polstellen und außerhalb des Definitionsbereichs wird abgesetzt */
  g.strokeStyle='#2563eb'; g.lineWidth=2.6; g.lineJoin='round'; g.lineCap='round';
  let neu=true; g.beginPath();
  const N=520;
  for(let i=0;i<=N;i++){
    const x=fe.xmin+(fe.xmax-fe.xmin)*i/N;
    const nahPol=(e.pol||[]).some(p=>Math.abs(x-p)<(fe.xmax-fe.xmin)/N*1.2);
    const y=nahPol?NaN:e.f(x);
    if(!isFinite(y)||y<fe.ymin-50||y>fe.ymax+50){ neu=true; continue; }
    const px=PX(x), py=PY(Math.max(fe.ymin-2,Math.min(fe.ymax+2,y)));
    if(neu){ g.moveTo(px,py); neu=false; } else g.lineTo(px,py);
  }
  g.stroke();
  g.strokeStyle='#cbd5e1'; g.lineWidth=1; g.strokeRect(0.5,0.5,w-1,h-1);
  return c.toDataURL('image/png');
}

window.TafelFunktionen={
  verfuegbar:()=>F.length>0,
  anzahl:()=>F.length,
  /* für den Auswahl-Dialog: gleiche Struktur wie die Begriffe, dazu ein Vorschaubild */
  daten(){ return F.map(e=>({ f:'M', j:e.j, g:e.g, b:e.t, e:'Graph zuordnen', art:'graph',
    bild:zeichne(e,150,115), voll:()=>zeichne(e,340,260) })); },
  zeichne
};
})();

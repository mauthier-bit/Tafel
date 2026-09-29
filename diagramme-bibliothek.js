/* Diagramm-Paare für das Zuordnungswerkzeug
   -----------------------------------------
   Beide Seiten sind Diagramme, die beim Übernehmen gezeichnet werden:
   • Physik 10: Zeit-Ort-Diagramm ↔ zugehöriges Zeit-Geschwindigkeit-Diagramm
   • Mathematik 11: Funktionsgraph ↔ Graph der Ableitungsfunktion
*/
(function(){
"use strict";

/* ---------- gemeinsamer Zeichner ---------- */
function plot(opt, breite, hoehe){
  const w=breite||300, h=hoehe||230;
  const fe=Object.assign({xmin:-5,xmax:5,ymin:-5,ymax:5}, opt.fenster||{});
  const c=document.createElement('canvas'), dpr=Math.max(2,Math.min(3,window.devicePixelRatio||1));
  c.width=Math.round(w*dpr); c.height=Math.round(h*dpr);
  const g=c.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
  g.fillStyle='#fff'; g.fillRect(0,0,w,h);
  const PX=x=>(x-fe.xmin)/(fe.xmax-fe.xmin)*w, PY=y=>h-(y-fe.ymin)/(fe.ymax-fe.ymin)*h;
  g.strokeStyle='#e2e8f0'; g.lineWidth=1; g.beginPath();
  const sx=(fe.xmax-fe.xmin)>12?2:1, sy=(fe.ymax-fe.ymin)>12?2:1;
  for(let x=Math.ceil(fe.xmin/sx)*sx;x<=fe.xmax;x+=sx){ g.moveTo(PX(x),0); g.lineTo(PX(x),h); }
  for(let y=Math.ceil(fe.ymin/sy)*sy;y<=fe.ymax;y+=sy){ g.moveTo(0,PY(y)); g.lineTo(w,PY(y)); }
  g.stroke();
  g.strokeStyle='#334155'; g.lineWidth=2; g.beginPath();
  g.moveTo(0,PY(0)); g.lineTo(w,PY(0)); g.moveTo(PX(0),h); g.lineTo(PX(0),0); g.stroke();
  g.beginPath(); g.moveTo(w,PY(0)); g.lineTo(w-8,PY(0)-4); g.moveTo(w,PY(0)); g.lineTo(w-8,PY(0)+4);
  g.moveTo(PX(0),0); g.lineTo(PX(0)-4,8); g.moveTo(PX(0),0); g.lineTo(PX(0)+4,8); g.stroke();
  /* Achsenbeschriftung statt Zahlenwerten: Es geht um den Verlauf, nicht um Ablesewerte */
  g.fillStyle='#334155'; g.font='italic 600 13px -apple-system,sans-serif';
  g.textAlign='right'; g.textBaseline='top';
  if(opt.xLabel) g.fillText(opt.xLabel, w-7, PY(0)+7);
  g.textAlign='left'; g.textBaseline='top';
  if(opt.yLabel) g.fillText(opt.yLabel, PX(0)+7, 4);
  if(opt.zahlen!==false){ g.fillStyle='#94a3b8'; g.font='10px -apple-system,sans-serif';
    g.textAlign='center'; g.textBaseline='top';
    for(let x=Math.ceil(fe.xmin/sx)*sx;x<=fe.xmax-0.4;x+=sx){ if(!x) continue; g.fillText(String(x),PX(x),PY(0)+3); }
    g.textAlign='right'; g.textBaseline='middle';
    for(let y=Math.ceil(fe.ymin/sy)*sy;y<=fe.ymax-0.4;y+=sy){ if(!y) continue; g.fillText(String(y),PX(0)-3,PY(y)); } }
  g.strokeStyle=opt.farbe||'#2563eb'; g.lineWidth=2.8; g.lineJoin='round'; g.lineCap='round';
  let neu=true; g.beginPath();
  const von=(opt.von!==undefined)?opt.von:fe.xmin, bis=(opt.bis!==undefined)?opt.bis:fe.xmax, N=500;
  for(let i=0;i<=N;i++){
    const x=von+(bis-von)*i/N, y=opt.f(x);
    if(!isFinite(y)){ neu=true; continue; }
    const px=PX(x), py=PY(Math.max(fe.ymin-2,Math.min(fe.ymax+2,y)));
    if(neu){ g.moveTo(px,py); neu=false; } else g.lineTo(px,py);
  }
  g.stroke();
  g.strokeStyle='#cbd5e1'; g.lineWidth=1; g.strokeRect(0.5,0.5,w-1,h-1);
  return c.toDataURL('image/png');
}

/* ---------- Physik 10: Zeit-Ort- und Zeit-Geschwindigkeit-Diagramm ---------- */
/* v(t) ist vorgegeben, s(t) wird daraus aufsummiert – so passen beide Bilder immer zusammen. */
const BEW=[
 {n:'gleichförmige Fahrt',           v:()=>3,                          s0:0},
 {n:'Beschleunigung aus dem Stand',  v:t=>0.8*t,                       s0:0},
 {n:'Abbremsen bis zum Stillstand',  v:t=>Math.max(0,8-0.9*t),         s0:0},
 {n:'Fahrzeug steht',                v:()=>0,                          s0:5},
 {n:'erst langsam, dann schneller',  v:t=>t<5?1.5:4.5,                 s0:0},
 {n:'fahren und dann anhalten',      v:t=>t<6?4:0,                     s0:0},
 {n:'Rückwärtsfahrt',                v:()=>-1.6,                       s0:9},
 {n:'beschleunigen, fahren, bremsen',v:t=>t<3?1.6*t:(t<7?4.8:Math.max(0,4.8-1.6*(t-7))), s0:0}
];
function wegFn(e){
  const N=400, T=10, dt=T/N, tab=[e.s0||0];
  for(let i=1;i<=N;i++) tab.push(tab[i-1]+e.v((i-0.5)*dt)*dt);
  return t=>{ const i=Math.max(0,Math.min(N,Math.round(t/dt))); return tab[i]; };
}
function bewegung(e, w, h){
  const s=wegFn(e);
  const fS={xmin:-0.6,xmax:10.5,ymin:-2,ymax:26};
  const fV={xmin:-0.6,xmax:10.5,ymin:-3,ymax:9};
  return { links: plot({f:s, fenster:fS, von:0, bis:10, xLabel:'t', yLabel:'s', zahlen:false}, w,h),
           rechts:plot({f:e.v, fenster:fV, von:0, bis:10, xLabel:'t', yLabel:'v', farbe:'#b45309', zahlen:false}, w,h) };
}

/* ---------- Mathematik 11: Funktion und Ableitung ---------- */
const ABL=[
 {t:'f(x) = x²',            f:x=>x*x,               a:x=>2*x},
 {t:'f(x) = x³',            f:x=>x*x*x,             a:x=>3*x*x},
 {t:'f(x) = 2x + 1',        f:x=>2*x+1,             a:()=>2},
 {t:'f(x) = −x²',           f:x=>-x*x,              a:x=>-2*x},
 {t:'f(x) = x³ − 3x',       f:x=>x*x*x-3*x,         a:x=>3*x*x-3},
 {t:'f(x) = 0,5x² − 2x',    f:x=>0.5*x*x-2*x,       a:x=>x-2},
 {t:'f(x) = x² − 4x + 3',   f:x=>x*x-4*x+3,         a:x=>2*x-4},
 {t:'f(x) = 0,25x⁴ − x²',   f:x=>0.25*x*x*x*x-x*x,  a:x=>x*x*x-2*x},
 {t:'f(x) = −0,5x³ + 1,5x', f:x=>-0.5*x*x*x+1.5*x,  a:x=>-1.5*x*x+1.5},
 {t:'f(x) = sin(x)',        f:x=>Math.sin(x),       a:x=>Math.cos(x),
    fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}}
];
function ableitung(e, w, h){
  const fe=e.fenster||{xmin:-4,xmax:4,ymin:-6,ymax:6};
  return { links: plot({f:e.f, fenster:fe, yLabel:'f'}, w,h),
           rechts:plot({f:e.a, fenster:fe, yLabel:'f ′', farbe:'#b45309'}, w,h) };
}

window.TafelDiagramme={
  verfuegbar:()=>BEW.length+ABL.length>0,
  anzahl:()=>BEW.length+ABL.length,
  daten(){
    const out=[];
    BEW.forEach(e=>{ const klein=bewegung(e,150,115);
      out.push({ f:'Ph', j:10, g:'Bewegungsdiagramme', b:'t-s-Diagramm: '+e.n, e:'zugehöriges t-v-Diagramm',
        bild:klein.links, bild2:klein.rechts,
        paar:()=>{ const gross=bewegung(e,320,240); return {links:gross.links, rechts:gross.rechts}; } }); });
    ABL.forEach(e=>{ const klein=ableitung(e,150,115);
      out.push({ f:'M', j:11, g:'Funktion und Ableitung', b:'Graph von '+e.t, e:'Graph der Ableitung',
        bild:klein.links, bild2:klein.rechts,
        paar:()=>{ const gross=ableitung(e,320,240); return {links:gross.links, rechts:gross.rechts}; } }); });
    return out;
  }
};
})();

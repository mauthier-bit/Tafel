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

/* ---------- Physik 10: Bewegungsdiagramme ----------
   Vorgegeben ist die Beschleunigung a(t); daraus werden v(t) und s(t) aufsummiert.
   So passen Zeit-Ort-, Zeit-Geschwindigkeit- und Zeit-Beschleunigung-Diagramm immer zusammen. */
const BEW=[
 {n:'gleichförmige Fahrt',              a:()=>0,                                   v0:3,    s0:0},
 {n:'Beschleunigung aus dem Stand',     a:()=>0.8,                                 v0:0,    s0:0},
 {n:'Abbremsen bis zum Stillstand',     a:t=>t<8.8?-0.9:0,                         v0:8,    s0:0},
 {n:'Fahrzeug steht',                   a:()=>0,                                   v0:0,    s0:5},
 {n:'Rückwärtsfahrt',                   a:()=>0,                                   v0:-1.6, s0:9},
 {n:'beschleunigen, fahren, bremsen',   a:t=>t<3?1.6:(t<7?0:-1.6),                 v0:0,    s0:0},
 {n:'mit Anfangstempo weiter beschleunigen', a:()=>0.6,                            v0:2,    s0:0},
 {n:'bremsen und rückwärts rollen',     a:()=>-1,                                  v0:4,    s0:2},
 {n:'erst stark, dann schwach beschleunigen', a:t=>t<4?1.5:0.4,                    v0:0,    s0:0},
 {n:'Stop and go',                      a:t=>t<2?2:(t<4?0:(t<6?-2:0)),             v0:0,    s0:0},
 {n:'anfahren und gleich wieder bremsen', a:t=>t<2.5?2:(t<5?-2:0),                 v0:0,    s0:0},
 {n:'gleichmäßig langsamer werden',     a:t=>t<6?-0.7:0,                           v0:4.2,  s0:0}
];
const TMAX=10;
function kurven(e){
  const N=600, dt=TMAX/N, vt=[e.v0||0], st=[e.s0||0];
  for(let i=1;i<=N;i++){ const t=(i-0.5)*dt;
    vt.push(vt[i-1]+e.a(t)*dt);
    st.push(st[i-1]+(vt[i-1]+vt[i])/2*dt); }
  const idx=t=>Math.max(0,Math.min(N,Math.round(t/dt)));
  return { s:t=>st[idx(t)], v:t=>vt[idx(t)], a:t=>e.a(Math.max(0,Math.min(TMAX,t))) };
}
/* Fenster so wählen, dass die Kurve immer gut im Bild liegt */
function fenster(fn, min, max){
  let lo=0, hi=0;
  for(let i=0;i<=100;i++){ const y=fn(TMAX*i/100); if(y<lo) lo=y; if(y>hi) hi=y; }
  const sp=Math.max(1,(hi-lo))*0.22;
  return {xmin:-0.6, xmax:TMAX+0.6, ymin:Math.min(min!==undefined?min:lo-sp, lo-sp), ymax:Math.max(max!==undefined?max:hi+sp, hi+sp)};
}
function bewBild(e, art, w, h){
  const k=kurven(e);
  const fn = art==='s'?k.s : art==='v'?k.v : k.a;
  const label = art==='s'?'s' : art==='v'?'v' : 'a';
  const farbe = art==='s'?'#2563eb' : art==='v'?'#b45309' : '#0d9488';
  return plot({f:fn, fenster:fenster(fn, art==='a'?-2.6:undefined, art==='a'?2.6:undefined),
    von:0, bis:TMAX, xLabel:'t', yLabel:label, farbe, zahlen:false}, w, h);
}

/* ---------- Mathematik 11: Funktion, erste und zweite Ableitung ---------- */
const ABL=[
 {t:'f(x) = x²',            f:x=>x*x,               a:x=>2*x,              b:()=>2},
 {t:'f(x) = x³',            f:x=>x*x*x,             a:x=>3*x*x,            b:x=>6*x},
 {t:'f(x) = 2x + 1',        f:x=>2*x+1,             a:()=>2,               b:()=>0},
 {t:'f(x) = −x²',           f:x=>-x*x,              a:x=>-2*x,             b:()=>-2},
 {t:'f(x) = x³ − 3x',       f:x=>x*x*x-3*x,         a:x=>3*x*x-3,          b:x=>6*x},
 {t:'f(x) = 0,5x² − 2x',    f:x=>0.5*x*x-2*x,       a:x=>x-2,              b:()=>1},
 {t:'f(x) = x² − 4x + 3',   f:x=>x*x-4*x+3,         a:x=>2*x-4,            b:()=>2},
 {t:'f(x) = 0,25x⁴ − x²',   f:x=>0.25*x*x*x*x-x*x,  a:x=>x*x*x-2*x,        b:x=>3*x*x-2},
 {t:'f(x) = −0,5x³ + 1,5x', f:x=>-0.5*x*x*x+1.5*x,  a:x=>-1.5*x*x+1.5,     b:x=>-3*x},
 {t:'f(x) = 0,5x³ − 1,5x²', f:x=>0.5*x*x*x-1.5*x*x, a:x=>1.5*x*x-3*x,      b:x=>3*x-3},
 {t:'f(x) = x⁴ − 2x²',      f:x=>x*x*x*x-2*x*x,     a:x=>4*x*x*x-4*x,      b:x=>12*x*x-4,
    fenster:{xmin:-2.6,xmax:2.6,ymin:-5,ymax:5}},
 {t:'f(x) = −x³ + 3x²',     f:x=>-x*x*x+3*x*x,      a:x=>-3*x*x+6*x,       b:x=>-6*x+6,
    fenster:{xmin:-2,xmax:4,ymin:-5,ymax:6}},
 {t:'f(x) = sin(x)',        f:x=>Math.sin(x),       a:x=>Math.cos(x),      b:x=>-Math.sin(x),
    fenster:{xmin:-6.5,xmax:6.5,ymin:-2.5,ymax:2.5}},
 {t:'f(x) = 0,5x⁴ − 3x²',   f:x=>0.5*x*x*x*x-3*x*x, a:x=>2*x*x*x-6*x,      b:x=>6*x*x-6,
    fenster:{xmin:-2.8,xmax:2.8,ymin:-6,ymax:6}}
];
function ablBild(e, art, w, h){
  const fe=e.fenster||{xmin:-4,xmax:4,ymin:-6,ymax:6};
  const fn = art==='f'?e.f : art==='a'?e.a : e.b;
  const label = art==='f'?'f' : art==='a'?'f ′' : 'f ″';
  const farbe = art==='f'?'#2563eb' : art==='a'?'#b45309' : '#0d9488';
  return plot({f:fn, fenster:fe, yLabel:label, farbe}, w, h);
}

/* Zwei Bewegungen können dasselbe a-Diagramm haben (z. B. Stillstand und gleichförmige Fahrt).
   Solche Dubletten würden die Zuordnung mehrdeutig machen und werden je Sammlung aussortiert. */
function signatur(fn, von, bis){ let out='';
  for(let i=0;i<=14;i++){ const y=fn(von+(bis-von)*i/14); out+=(Math.round(y*100)/100)+'|'; }
  return out; }
function bewSig(e, art){ const k=kurven(e); const fn=art==='s'?k.s:art==='v'?k.v:k.a; return signatur(fn,0,TMAX); }
function ablSig(e, art){ const fe=e.fenster||{xmin:-4,xmax:4};
  const fn=art==='f'?e.f:art==='a'?e.a:e.b; return signatur(fn,fe.xmin,fe.xmax); }

window.TafelDiagramme={
  verfuegbar:()=>BEW.length+ABL.length>0,
  anzahl(){ return this.daten().length; },
  daten(){
    const out=[];
    const paarEintrag=(o)=>out.push(o);
    /* Bewegungen: drei Kombinationen je Bewegung */
    const KOMB=[['s','v','t-s-Diagramm','t-v-Diagramm'],
                ['v','a','t-v-Diagramm','t-a-Diagramm'],
                ['s','a','t-s-Diagramm','t-a-Diagramm']];
    KOMB.forEach(([l,r,ln,rn])=>{ const gesehen=new Set();
      BEW.forEach(e=>{ const sig=bewSig(e,l)+'#'+bewSig(e,r);
        const sigL=bewSig(e,l), sigR=bewSig(e,r);
        if(gesehen.has(sigL)||gesehen.has('R'+sigR)) return;    // eindeutig bleiben
        gesehen.add(sigL); gesehen.add('R'+sigR);
        paarEintrag({ f:'Ph', j:10, g:'Bewegung: '+ln+' und '+rn,
          b:ln+': '+e.n, e:'zugehöriges '+rn,
          bild:bewBild(e,l,150,115), bild2:bewBild(e,r,150,115),
          paar:()=>({links:bewBild(e,l,320,240), rechts:bewBild(e,r,320,240)}),
          /* für die Gruppenform: zum t-s-Diagramm gehören t-v und t-a */
          gruppe:()=>({ feld:bewBild(e,'s',320,240),
                        karten:[bewBild(e,'v',320,240), bewBild(e,'a',320,240)],
                        name:e.n }) });
      }); });
    /* Ableitungen: f↔f′, f′↔f″ und f↔f″ */
    const AK=[['f','a','Graph von f','Graph von f ′','Funktion und erste Ableitung'],
              ['a','b','Graph von f ′','Graph von f ″','Erste und zweite Ableitung'],
              ['f','b','Graph von f','Graph von f ″','Funktion und zweite Ableitung']];
    AK.forEach(([l,r,ln,rn,grp])=>{ const gesehen=new Set();
      ABL.forEach(e=>{ const sigL=ablSig(e,l), sigR=ablSig(e,r);
        if(gesehen.has(sigL)||gesehen.has('R'+sigR)) return;
        gesehen.add(sigL); gesehen.add('R'+sigR);
        paarEintrag({ f:'M', j:11, g:grp, b:ln+' bei '+e.t, e:rn,
          bild:ablBild(e,l,150,115), bild2:ablBild(e,r,150,115),
          paar:()=>({links:ablBild(e,l,320,240), rechts:ablBild(e,r,320,240)}),
          /* für die Gruppenform: zum Graphen von f gehören f ′ und f ″ */
          gruppe:()=>({ feld:ablBild(e,'f',320,240),
                        karten:[ablBild(e,'a',320,240), ablBild(e,'b',320,240)],
                        name:e.t }) });
      }); });
    return out;
  }
};
})();

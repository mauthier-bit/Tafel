/* Brüche und Tortenstücke für das Zuordnungswerkzeug (Mathematik 6)
   ------------------------------------------------------------------
   Zu jedem Bruch gehören drei Tortenbilder mit demselben Anteil:
   das gekürzte und zwei erweiterte. Die Bilder werden beim Übernehmen
   gezeichnet – das bleibt klein, scharf auf jedem Bildschirm und offline.
   Aufbau je Eintrag: { z:Zähler, n:Nenner, f1, f2 }  (f1, f2 = Erweiterungsfaktoren)
*/
(function(){
"use strict";

/* d: Dezimalbruch als [fester Teil, periodischer Teil] – der periodische Teil bekommt den Strich */
const B=[
  {z:1,n:2,f1:3,f2:4,d:['0,5','']},       /* 1/2 = 3/6 = 4/8      */
  {z:1,n:3,f1:2,f2:4,d:['0,','3']},       /* 1/3 = 2/6 = 4/12     */
  {z:2,n:3,f1:2,f2:4,d:['0,','6']},       /* 2/3 = 4/6 = 8/12     */
  {z:1,n:4,f1:2,f2:3,d:['0,25','']},      /* 1/4 = 2/8 = 3/12     */
  {z:3,n:4,f1:2,f2:3,d:['0,75','']},      /* 3/4 = 6/8 = 9/12     */
  {z:1,n:5,f1:2,f2:3,d:['0,2','']},       /* 1/5 = 2/10 = 3/15    */
  {z:2,n:5,f1:2,f2:3,d:['0,4','']},       /* 2/5 = 4/10 = 6/15    */
  {z:3,n:5,f1:2,f2:3,d:['0,6','']},       /* 3/5 = 6/10 = 9/15    */
  {z:4,n:5,f1:2,f2:3,d:['0,8','']},       /* 4/5 = 8/10 = 12/15   */
  {z:1,n:6,f1:2,f2:0,d:['0,1','6']},      /* 1/6 = 2/12           */
  {z:5,n:6,f1:2,f2:0,d:['0,8','3']},      /* 5/6 = 10/12          */
  {z:3,n:8,f1:2,f2:0,d:['0,375','']}      /* 3/8 = 6/16           */
];

const TEIG='#f59e0b', RAND='#334155', LEER='#ffffff';

function leinwand(w,h){ const c=document.createElement('canvas');
  const dpr=Math.max(2,Math.min(3,window.devicePixelRatio||1));
  c.width=Math.round(w*dpr); c.height=Math.round(h*dpr);
  const g=c.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
  g.fillStyle='#fff'; g.fillRect(0,0,w,h); return {c,g}; }

/* ---------- Tortenbild: n gleiche Stücke, davon k gefüllt ---------- */
function torte(k,n,breite,hoehe){
  const w=breite||150, h=hoehe||115, {c,g}=leinwand(w,h);
  const cx=w/2, cy=h/2, r=Math.min(w,h)*0.42, SCHRITT=2*Math.PI/n;
  for(let i=0;i<n;i++){ const a0=-Math.PI/2+i*SCHRITT;
    g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,r,a0,a0+SCHRITT); g.closePath();
    g.fillStyle=(i<k)?TEIG:LEER; g.fill();
    g.strokeStyle=RAND; g.lineWidth=Math.max(1,r*0.035); g.stroke(); }
  g.beginPath(); g.arc(cx,cy,r,0,7); g.strokeStyle=RAND; g.lineWidth=Math.max(1.6,r*0.055); g.stroke();
  return c.toDataURL('image/png');
}

/* ---------- Bruch als Zahl: Zähler über Bruchstrich über Nenner ---------- */
function bruchBild(z,n,breite,hoehe){
  const w=breite||150, h=hoehe||115, {c,g}=leinwand(w,h);
  const fs=Math.min(h*0.34,w*0.3), cx=w/2, cy=h/2;
  g.fillStyle='#1f2430'; g.textAlign='center';
  g.font='700 '+fs+'px "Cambria Math",Cambria,Georgia,serif';
  g.textBaseline='bottom'; g.fillText(String(z), cx, cy-fs*0.16);
  g.textBaseline='top';    g.fillText(String(n), cx, cy+fs*0.16);
  const br=Math.max(fs*0.78, g.measureText(String(n)).width*1.5);
  g.strokeStyle='#1f2430'; g.lineWidth=Math.max(2,fs*0.08);
  g.beginPath(); g.moveTo(cx-br/2,cy); g.lineTo(cx+br/2,cy); g.stroke();
  return c.toDataURL('image/png');
}

/* ---------- Dezimalbruch; der periodische Teil bekommt einen Strich darüber ---------- */
function dezBild(fest,periode,breite,hoehe){
  const w=breite||150, h=hoehe||115, {c,g}=leinwand(w,h);
  const fs=Math.min(h*0.3,w*0.24), cx=w/2, cy=h/2;
  g.fillStyle='#1f2430'; g.textBaseline='middle'; g.textAlign='left';
  g.font='700 '+fs+'px "Cambria Math",Cambria,Georgia,serif';
  const bF=g.measureText(fest).width, bP=periode?g.measureText(periode).width:0;
  const x0=cx-(bF+bP)/2;
  g.fillText(fest, x0, cy);
  if(periode){ g.fillText(periode, x0+bF, cy);
    const y=cy-fs*0.62;                       /* Periodenstrich knapp über den Ziffern */
    g.strokeStyle='#1f2430'; g.lineWidth=Math.max(1.6,fs*0.06);
    g.beginPath(); g.moveTo(x0+bF, y); g.lineTo(x0+bF+bP, y); g.stroke(); }
  return c.toDataURL('image/png');
}
const dezTxt=e=>e.d[0]+e.d[1]+(e.d[1]?'…':'');
const txt=e=>e.z+'/'+e.n;
const formen=e=>[e.f1,e.f2].filter(f=>f>0).map(f=>({z:e.z*f, n:e.n*f}));

window.TafelBrueche={
  verfuegbar:()=>B.length>0,
  anzahl:()=>B.length,
  torte, bruchBild, dezBild,
  daten(){ return B.map(e=>{ const er=formen(e), e1=er[0];
    const alle=[{z:e.z,n:e.n}].concat(er);
    return {
      f:'M', j:6, g:'Brüche und Tortenstücke (kürzen und erweitern)',
      b:txt(e),
      e:'Tortenstücke und erweiterte Brüche: '+alle.map(x=>x.z+'/'+x.n).join(' = ')+' = '+dezTxt(e),
      art:'torte',
      bild:bruchBild(e.z,e.n,150,115),
      bild2:torte(e1.z,e1.n,150,115),
      /* paarweise: der Bruch und ein erweitertes Tortenbild – man muss also kürzen.
         Mit Dezimalbrüchen steht links der Dezimalbruch, rechts das gekürzte Tortenbild. */
      paar:(dez)=>dez?({ links:dezBild(e.d[0],e.d[1],300,240), rechts:torte(e.z,e.n,300,240) })
                     :({ links:bruchBild(e.z,e.n,300,240), rechts:torte(e1.z,e1.n,300,240) }),
      /* als Gruppe: zum Bruch gehören die drei Tortenbilder (gekürzt und erweitert),
         die erweiterten Brüche als Zahlenkarten und auf Wunsch der Dezimalbruch */
      gruppe:(dez)=>({ feld:bruchBild(e.z,e.n,300,240),
                    karten:alle.map(x=>torte(x.z,x.n,300,240))
                           .concat(er.map(x=>bruchBild(x.z,x.n,300,240)))
                           .concat(dez?[dezBild(e.d[0],e.d[1],300,240)]:[]),
                    name:txt(e) })
    }; }); }
};
})();

/* Digitale Tafel – Venn-Diagramm für ein bis drei Mengen (Vierfeldertafel und Baumdiagramm).
   TafelVenn.draw(canvas,{names:['A','B'], vals:{'11':'0,05','10':'0,15','01':'0,1','00':'0,7'}, fs, bold, italic})
   Schlüssel = Bitmuster, Bit i = 1 bedeutet „liegt in Menge i". */
(function(){
"use strict";
const COL=['#2563eb','#dc2626','#16a34a'];
const tint=(hex,a)=>{ const v=parseInt(hex.slice(1),16); return 'rgba('+(v>>16&255)+','+(v>>8&255)+','+(v&255)+','+a+')'; };
function draw(cv,o){ o=o||{};
  const names=(o.names||['A','B']).slice(0,3), n=names.length;
  const vals=o.vals||{}, fs=Math.max(10,o.fs||14), dpr=window.devicePixelRatio||1;
  const W=Math.max(120,o.w||cv.clientWidth||360), H=Math.max(100,o.h||Math.round(W*(n===3?0.78:0.58)));
  cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
  const c=cv.getContext('2d'); c.setTransform(dpr,0,0,dpr,0,0);
  c.fillStyle='#fff'; c.fillRect(0,0,W,H);
  const pad=Math.max(6,fs*0.5), bx=pad, by=pad, bw=W-2*pad, bh=H-2*pad;
  c.strokeStyle='#94a3b8'; c.lineWidth=1.4; c.strokeRect(bx,by,bw,bh);   // Grundmenge Ω
  c.fillStyle='#8a93a2'; c.font='600 '+(fs*0.85)+'px -apple-system,BlinkMacSystemFont,sans-serif';
  c.textAlign='left'; c.textBaseline='top'; c.fillText('Ω',bx+4,by+3);
  const cx=bx+bw/2, cy=by+bh/2+ (n===3?bh*0.03:0);
  let R, C=[];
  if(n===1){ R=Math.min(bw,bh)*0.32; C=[[cx,cy]]; }
  else if(n===2){ R=Math.min(bw/3.1,bh/2.5); C=[[cx-R*0.62,cy],[cx+R*0.62,cy]]; }
  else { R=Math.min(bw/3.5,bh/3.1); const d=R*0.62;
    C=[[cx,cy-d],[cx+d*0.87,cy+d*0.5],[cx-d*0.87,cy+d*0.5]]; }
  C.forEach(([x,y],i)=>{ c.beginPath(); c.arc(x,y,R,0,7); c.fillStyle=tint(COL[i],0.14); c.fill();
    c.strokeStyle=COL[i]; c.lineWidth=Math.max(1.5,fs/9); c.stroke(); });
  cv._venn={n,C,R,bx,by,bw,bh};                                  // für Treffer-Abfrage beim Antippen
  /* ausgewählte Teilmengen einfärben: Schnitt der beteiligten Kreise füllen, die übrigen ausstanzen */
  const hi=(o.hi||[]).filter(k=>typeof k==='string'&&k.length===n);
  if(hi.length){ const t=document.createElement('canvas'); t.width=cv.width; t.height=cv.height;
    const g=t.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
    hi.forEach(key=>{ g.save(); g.clearRect(0,0,W,H);
      const inside=[], outside=[];
      for(let i=0;i<n;i++) (key[i]==='1'?inside:outside).push(i);
      g.beginPath(); g.rect(bx,by,bw,bh); g.clip();
      inside.forEach(i=>{ g.beginPath(); g.arc(C[i][0],C[i][1],R,0,7); g.clip(); });
      g.fillStyle='rgba(245,158,11,.55)'; g.fillRect(bx,by,bw,bh);
      g.globalCompositeOperation='destination-out'; g.fillStyle='#000';   // voll deckend ausstanzen
      outside.forEach(i=>{ g.beginPath(); g.arc(C[i][0],C[i][1],R,0,7); g.fill(); });
      g.restore(); c.save(); c.setTransform(1,0,0,1,0,0); c.drawImage(t,0,0); c.restore(); }); }
  /* Namen an den Rand der Kreise (vom Mittelpunkt weg) */
  c.textBaseline='middle'; c.font=(o.italic?'italic ':'')+(o.bold?'800 ':'700 ')+fs+'px -apple-system,BlinkMacSystemFont,sans-serif';
  C.forEach(([x,y],i)=>{ let dx=x-cx, dy=y-cy; const L=Math.hypot(dx,dy)||1;
    if(n===1){ dx=0; dy=-1; } else { dx/=L; dy/=L; }
    const lx=x+dx*(R+fs*0.9), ly=y+dy*(R+fs*0.75);
    c.textAlign=dx>0.2?'left':(dx<-0.2?'right':'center'); c.fillStyle=COL[i];
    c.fillText(names[i],Math.max(bx+fs*0.4,Math.min(bx+bw-fs*0.4,lx)),Math.max(by+fs*0.8,Math.min(by+bh-fs*0.5,ly))); });
  /* Mittelpunkte der Bereiche */
  const spots={};
  /* Schlüssel: Zeichen k gehört zu Menge k (links = erste Menge) */
  if(n===1){ spots['1']=[C[0][0],C[0][1]]; }
  else if(n===2){ spots['10']=[C[0][0]-R*0.45,C[0][1]]; spots['01']=[C[1][0]+R*0.45,C[1][1]]; spots['11']=[cx,cy]; }
  else { const mid=(a,b)=>[(C[a][0]+C[b][0])/2,(C[a][1]+C[b][1])/2];
    const ctr=[(C[0][0]+C[1][0]+C[2][0])/3,(C[0][1]+C[1][1]+C[2][1])/3];
    const push=(p,f)=>[p[0]+(p[0]-ctr[0])*f,p[1]+(p[1]-ctr[1])*f];
    spots['100']=push([C[0][0],C[0][1]],0.52); spots['010']=push([C[1][0],C[1][1]],0.52); spots['001']=push([C[2][0],C[2][1]],0.52);
    spots['110']=push(mid(0,1),0.75); spots['101']=push(mid(0,2),0.75); spots['011']=push(mid(1,2),0.75);
    spots['111']=ctr; }
  const zero=n===1?'0':(n===2?'00':'000');
  spots[zero]=[bx+bw-fs*0.7, by+bh-fs*0.7];
  c.font=(o.italic?'italic ':'')+'700 '+(fs*0.95)+'px -apple-system,BlinkMacSystemFont,sans-serif';
  for(const key in spots){ const t=vals[key]; if(t===undefined||t===null||t==='') continue;
    const [x,y]=spots[key], out=(key===zero);
    c.textAlign=out?'right':'center'; c.textBaseline='middle';
    const w=c.measureText(t).width+6, lx=out?x:x-w/2;
    c.fillStyle='rgba(255,255,255,.88)'; c.fillRect(lx-(out?w-6:0),y-fs*0.62,w,fs*1.24);
    c.fillStyle=out?'#64748b':'#1f2430'; c.fillText(t,x,y); }
  return {w:W,h:H}; }
/* Welche Teilmenge liegt unter dem Punkt (CSS-Koordinaten im Canvas)? */
function keyAt(cv,x,y){ const v=cv._venn; if(!v) return null;
  if(x<v.bx||y<v.by||x>v.bx+v.bw||y>v.by+v.bh) return null;
  let key=''; for(let i=0;i<v.n;i++){ const [cx,cy]=v.C[i]; key+=(Math.hypot(x-cx,y-cy)<=v.R)?'1':'0'; }
  return key; }
window.TafelVenn={draw,keyAt};
})();

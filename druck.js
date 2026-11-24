/* Digitale Tafel – Drucken, das auch im Homebildschirm-Programm klappt.
   iPadOS zeigt in einer Homebildschirm-App (standalone) KEINEN Druckdialog: window.print()
   bleibt dort wirkungslos (in Safari und am Mac geht es wie immer). Dieses Modul baut aus
   derselben Druckvorlage ein PDF (A4) und gibt es über das Teilen-Blatt weiter – darin steht
   „Drucken“; ohne Teilen-Blatt wird die Datei heruntergeladen.

   Einbinden:  <script src="druck.js"></script>      (shot.js und jsPDF werden bei Bedarf nachgeladen)
   Nutzung im Werkzeug – jeweils als erste Zeile der vorhandenen Druckfunktion:
     if(window.TafelDruck&&TafelDruck.homeApp()) return TafelDruck.dokument(html,'arbeitsblatt.pdf');
     if(window.TafelDruck&&TafelDruck.homeApp()) return TafelDruck.seite('tabelle.pdf');
     if(window.TafelDruck&&TafelDruck.homeApp()) return TafelDruck.element(el,{datei:'liste.pdf'});
   Alles andere bleibt unverändert, am Mac und in Safari wird weiter normal gedruckt. */
(function(){
"use strict";
const BASIS=(()=>{ const s=document.currentScript&&document.currentScript.src; return s?s.slice(0,s.lastIndexOf('/')+1):''; })();
const homeApp=()=>navigator.standalone===true;

function skript(src){ return new Promise((ok,nein)=>{ const s=document.createElement('script'); s.src=src;
  s.onload=()=>ok(); s.onerror=()=>nein(new Error('nicht ladbar: '+src)); document.head.appendChild(s); }); }
async function werkzeuge(){ if(!window.TafelShot) await skript(BASIS+'shot.js');
  if(!window.jspdf) await skript(BASIS+'vendor/jspdf.umd.min.js'); }
function sagen(t){ try{ if(window.TafelShot&&TafelShot.toast){ TafelShot.toast(t); return; } }catch(e){}
  try{ if(window.parent!==window) return; }catch(e){} }
/* Auf das nächste Bild warten – mit Zeitgrenze, damit der Weg nicht stehenbleibt,
   wenn das Fenster im Hintergrund liegt (dort liefert requestAnimationFrame nichts). */
function naechstesBild(){ return new Promise(r=>{ let fertig=false;
  const ok=()=>{ if(!fertig){ fertig=true; r(); } };
  requestAnimationFrame(()=>requestAnimationFrame(ok)); setTimeout(ok,150); }); }
function warten(an,text){ let el=document.getElementById('tafelDruckWarte');
  if(an){ if(!el){ el=document.createElement('div'); el.id='tafelDruckWarte';
      el.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.72);font:600 15px -apple-system,BlinkMacSystemFont,sans-serif;color:#1f2430;';
      document.body.appendChild(el); }
    el.textContent=text||'PDF wird erstellt …'; }
  else if(el) el.remove(); }

/* ---- Die @media-print-Regeln eines Dokuments als gewöhnliches CSS einsammeln, damit die
       Vorlage im PDF so aussieht wie auf dem Papier (Druckknöpfe weg, Umbrüche an). ---- */
function druckRegeln(d){ let t='';
  for(const ss of [...d.styleSheets]){ let rs=null; try{ rs=ss.cssRules; }catch(e){ continue; }
    if(!rs) continue;
    for(const r of [...rs]){ const m=r.conditionText||(r.media&&r.media.mediaText)||'';
      if(r.cssRules&&/print/i.test(m)&&!/screen/i.test(m)){ for(const x of [...r.cssRules]) t+=x.cssText+'\n'; } } }
  return t; }
function regelnAn(d,text){ const st=d.createElement('style'); st.id='tafelDruckRegeln'; st.textContent=text;
  (d.head||d.documentElement).appendChild(st); return st; }

/* ---- Weitergeben: auf dem iPad das Teilen-Blatt (darin „Drucken“), sonst herunterladen ---- */
async function ausgeben(pdf,datei){
  try{ const blob=pdf.output('blob'), f=new File([blob],datei,{type:'application/pdf'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){ await navigator.share({files:[f],title:datei});
      sagen('Als PDF – im Teilen-Blatt steht „Drucken“'); return; } }
  catch(e){ if(e&&e.name==='AbortError') return; }
  pdf.save(datei); sagen('Als PDF gesichert'); }

/* ---- Seitenmaß: Ausrichtung und Rand kommen, wenn vorhanden, aus der @page-Regel der Vorlage.
       Nur so bleiben Millimeter der Vorlage auch im PDF Millimeter (Maßstab, Kontrollbalken). ---- */
function seitenMass(html,opt){ opt=opt||{};
  let quer=!!opt.quer, rand=(opt.rand!==undefined)?opt.rand:15, ausPage=false;
  const m=/@page[^{]*\{([^}]*)\}/i.exec(html||'');
  if(m){ const t=m[1];
    if(/landscape/i.test(t)){ quer=true; ausPage=true; } else if(/portrait/i.test(t)){ quer=false; ausPage=true; }
    const r=/margin\s*:\s*([\d.]+)\s*mm/i.exec(t);
    if(r){ rand=parseFloat(r[1]); ausPage=true; } }
  return {quer:quer, rand:rand, bMm:(quer?297:210)-2*rand, hMm:(quer?210:297)-2*rand, ausPage:ausPage}; }

/* ---- Bild der Vorlage in A4-Seiten schneiden: an Zeilenkanten, Tabellenkopf wiederholen ---- */
function bauen(im,wurzel,r0,S,mmPx,sm){
  const quer=sm.quer, seiteH=sm.hMm*mmPx;
  const oben=r0.top, gesamt=r0.height;
  const marken=[];
  wurzel.querySelectorAll('tr,.prow,h1,h2,h3,p,li,.pmeta,.pfront,figure,img,table').forEach(el=>{
    const r=el.getBoundingClientRect(); if(r.height>0) marken.push(r.bottom-oben); });
  marken.push(gesamt); marken.sort((a,b)=>a-b);
  const tabs=[...wurzel.querySelectorAll('table')].map(t=>{ const r=t.getBoundingClientRect(), th=t.querySelector('thead');
    const k=th?th.getBoundingClientRect():null;
    return {b:r.bottom-oben, ka:k?(k.top-oben):0, kb:k?(k.bottom-oben):0}; });
  const {jsPDF}=window.jspdf, pdf=new jsPDF({orientation:quer?'l':'p',unit:'mm',format:'a4'});
  let y=0, erste=true;
  while(y<gesamt-0.5){
    const tb=tabs.find(t=>t.kb>0&&y>t.kb+0.5&&y<t.b-0.5);            /* Tabelle läuft weiter → Kopfzeile mitnehmen */
    const kopfH=tb?(tb.kb-tb.ka):0, platz=Math.max(10,seiteH-kopfH);
    let ende=Math.min(gesamt,y+platz);
    if(ende<gesamt-0.5){ const pass=marken.filter(m=>m>y+platz*0.25&&m<=ende);
      if(pass.length) ende=pass[pass.length-1]; }
    if(ende<=y+1) ende=Math.min(gesamt,y+platz);
    const kPx=Math.round(kopfH*S), iPx=Math.round((ende-y)*S);
    const c=document.createElement('canvas'); c.width=im.canvas.width; c.height=Math.max(1,kPx+iPx);
    const g=c.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,c.width,c.height);
    if(kPx>0) g.drawImage(im.canvas,0,Math.round(tb.ka*S),c.width,kPx,0,0,c.width,kPx);
    g.drawImage(im.canvas,0,Math.round(y*S),c.width,iPx,0,kPx,c.width,iPx);
    if(!erste) pdf.addPage('a4',quer?'l':'p'); erste=false;
    pdf.addImage(c.toDataURL('image/png'),'PNG',sm.rand,sm.rand,c.width/S/mmPx,c.height/S/mmPx,undefined,'FAST');  /* ohne Kompression wird das PDF riesig */
    y=ende; }
  return pdf; }

/* ---- Ein sichtbares Element als PDF ---- */
async function element(el,opt){ opt=opt||{};
  const datei=opt.datei||'druck.pdf';
  warten(true);
  try{ await werkzeuge();
    const r0=el.getBoundingClientRect();
    if(r0.width<2||r0.height<2) throw new Error('nichts zu drucken');
    const sm=opt.sm||seitenMass('',{quer:(opt.quer!==undefined)?opt.quer:(r0.width>r0.height)});
    const mmPx=r0.width/sm.bMm;
    const S=Math.max(1,Math.min(2.1,Math.sqrt(30e6/Math.max(1,r0.width*r0.height))));
    const aus='#tafelDruckWarte'+(opt.exclude?(','+opt.exclude):'');      /* der Warte-Hinweis gehört nicht aufs Blatt */
    const im=TafelShot.rasterize(el,{scale:S,bg:opt.bg||'#fff',exclude:aus});
    const pdf=bauen(im,el,r0,S,mmPx,sm);
    warten(false);
    await ausgeben(pdf,datei); return true; }
  catch(e){ warten(false); sagen('PDF nicht möglich: '+(e&&e.message||e)); return false; } }

/* ---- Ein fertiges Bild (Canvas oder data:-URL) als PDF, auf eine Seite eingepasst ---- */
async function bild(quelle,datei,opt){ opt=opt||{}; warten(true);
  try{ await werkzeuge();
    const q=(quelle&&quelle.canvas)?quelle.canvas:quelle;
    const src=(typeof q==='string')?q:q.toDataURL('image/png');
    const b=new Image(); b.src=src;
    await (b.decode?b.decode():new Promise(r=>{ b.onload=r; b.onerror=r; }));
    const sm=opt.sm||seitenMass('',{quer:(opt.quer!==undefined)?opt.quer:(b.naturalWidth>b.naturalHeight)});
    const f=Math.min(sm.bMm/b.naturalWidth,sm.hMm/b.naturalHeight), w=b.naturalWidth*f, h=b.naturalHeight*f;
    const {jsPDF}=window.jspdf, pdf=new jsPDF({orientation:sm.quer?'l':'p',unit:'mm',format:'a4'});
    pdf.addImage(src,/image\/jpe?g/.test(src.slice(0,30))?'JPEG':'PNG',sm.rand+(sm.bMm-w)/2,sm.rand+(sm.hMm-h)/2,w,h,undefined,'FAST');
    warten(false); await ausgeben(pdf,datei||'druck.pdf'); return true; }
  catch(e){ warten(false); sagen('PDF nicht möglich: '+(e&&e.message||e)); return false; } }

/* ---- Eine fertige HTML-Seite (bisher window.open(…)) als PDF ---- */
async function dokument(html,datei,opt){ opt=opt||{};
  warten(true);
  const sm=seitenMass(html,opt);                                     /* Ausrichtung und Rand wie in der Vorlage */
  const rahmen=document.createElement('iframe');
  rahmen.setAttribute('aria-hidden','true');
  rahmen.style.cssText='position:fixed;left:-30000px;top:0;border:0;background:#fff;z-index:-1;width:'+sm.bMm+'mm;height:400px;';
  document.body.appendChild(rahmen);
  try{ await werkzeuge();
    const d=rahmen.contentDocument; d.open(); d.write(html); d.close();
    await new Promise(r=>{ if(d.readyState==='complete') return r();
      rahmen.addEventListener('load',r,{once:true}); setTimeout(r,2500); });
    const bilder=[...d.images].map(b=>b.complete?null:new Promise(r=>{ b.addEventListener('load',r,{once:true}); b.addEventListener('error',r,{once:true}); setTimeout(r,2500); })).filter(Boolean);
    if(bilder.length) await Promise.all(bilder);
    regelnAn(d,druckRegeln(d));                                     /* Druckknöpfe u. Ä. der Vorlage ausblenden */
    await naechstesBild();
    /* Besteht die Vorlage nur aus einem Bild, kommt es in voller Auflösung ins PDF */
    const nur=[...d.body.children].filter(e=>e.tagName!=='STYLE'&&e.tagName!=='SCRIPT'&&getComputedStyle(e).display!=='none');
    if(nur.length===1&&nur[0].tagName==='IMG'&&nur[0].src){ const q=nur[0].src; rahmen.remove(); warten(false);
      return await bild(q,datei||'druck.pdf',{sm:sm}); }
    /* Ist die Vorlage breiter als die Seite, wird sie als Ganzes verkleinert – nie abgeschnitten */
    const breit=Math.max(d.documentElement.scrollWidth, d.body?d.body.scrollWidth:0);
    if(breit>rahmen.clientWidth+2){ rahmen.style.width=breit+'px';
      await naechstesBild(); }
    rahmen.style.height=Math.max(400,d.documentElement.scrollHeight+40)+'px';
    await naechstesBild();
    const ziel=d.body;
    const r0=ziel.getBoundingClientRect();
    const mmPx=r0.width/sm.bMm;                                      /* Millimeter der Vorlage bleiben Millimeter */
    const S=Math.max(1,Math.min(2.1,Math.sqrt(30e6/Math.max(1,r0.width*r0.height))));
    const im=TafelShot.rasterize(ziel,{scale:S,bg:'#fff',exclude:opt.exclude||null});
    const pdf=bauen(im,ziel,r0,S,mmPx,sm);
    rahmen.remove(); warten(false);
    await ausgeben(pdf,datei||'druck.pdf'); return true; }
  catch(e){ rahmen.remove(); warten(false); sagen('PDF nicht möglich: '+(e&&e.message||e)); return false; } }

/* ---- Die eigene Seite als PDF (bisher window.print()): die @media-print-Regeln der Seite
       werden dafür kurz regulär angewandt, damit das PDF wie der Ausdruck aussieht. ---- */
async function seite(datei,opt){ opt=opt||{};
  const st=regelnAn(document,druckRegeln(document));
  const el=(opt.el&&document.querySelector(opt.el))||document.body;
  await naechstesBild();
  if(opt.vor){ try{ opt.vor(); }catch(e){} await naechstesBild(); }
  let ok=false;
  try{ ok=await element(el,{datei:datei||'druck.pdf',quer:opt.quer,bg:opt.bg,exclude:opt.exclude}); }
  finally{ st.remove(); if(opt.nach){ try{ opt.nach(); }catch(e){} } }
  return ok; }

/* ---- Ersatz für window.open(…) beim Drucken: im Homebildschirm-Programm wird die Seite nicht
       geöffnet, sondern gesammelt und beim document.close() als PDF ausgegeben. Sonst ganz
       normal window.open. Vierter Parameter (von window.open ignoriert): {datei, exclude, quer}. ---- */
function oeffnen(url,ziel,eigenschaften,opt){
  if(!homeApp()) return window.open(url,ziel,eigenschaften);
  opt=opt||{};
  let txt='', fertig=false;
  const fenster={ closed:false, location:{href:url||''},
    document:{ open(){}, write(t){ txt+=String(t); }, writeln(t){ txt+=String(t)+'\n'; },
      close(){ if(fertig) return; fertig=true; dokument(txt,opt.datei||'druck.pdf',opt); } },
    focus(){}, blur(){}, close(){}, print(){ if(!fertig){ fertig=true; dokument(txt,opt.datei||'druck.pdf',opt); } } };
  return fenster; }

window.TafelDruck={homeApp,element,dokument,bild,seite,oeffnen,ausgeben};
})();

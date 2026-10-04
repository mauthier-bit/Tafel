/* Digitale Tafel – Aufgabe per QR-Code an die Klasse geben
   --------------------------------------------------------
   Der Knopf „Teilen" zeigt einen QR-Code. Wer ihn scannt, öffnet dasselbe
   Werkzeug mit genau der Aufgabe, die an der Tafel eingestellt ist.

   Die Aufgabe steckt im Fragment der Adresse (hinter dem #). Dieser Teil wird
   nie an einen Server geschickt; es ist also kein Konto und kein Dienst nötig.
   Stammt die Aufgabe aus einer Bibliothek, wird nur ihr Titel mitgegeben und
   das Schülergerät baut sie selbst auf – dadurch bleibt der Code winzig und
   auch Bilder (Tortenstücke, Konstruktionsfiguren) sind wieder dabei.

   Einbinden:  <script src="vendor/qrcode.min.js"></script>
               <script src="teilen.js"></script>
   Senden:     TafelTeilen.knopf($('shotBtns'), 'reihenfolge.html', ()=>({…}));
   Empfangen:  if(TafelTeilen.istGeteilt()){ TafelTeilen.nurBenutzen('#bSol,#shotBtns');
                 TafelTeilen.empfangen().then(p=>…); }                        */
(function(){
"use strict";

const OEFFENTLICH='https://mauthier-bit.github.io/Tafel/';
const GRENZE=900;                       /* ab hier wird der QR-Code merklich dichter */

/* ---------- Adresse ---------- */
function basis(){
  try{
    if(/github\.io$/i.test(location.hostname)) return location.href.replace(/[?#].*$/,'').replace(/[^/]*$/,'');
  }catch(e){}
  return OEFFENTLICH;                   /* lokal geöffnet: trotzdem auf die veröffentlichte Tafel zeigen */
}

/* ---------- Packen und Auspacken ---------- */
function b64(u8){ let s=''; for(let i=0;i<u8.length;i++) s+=String.fromCharCode(u8[i]);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function unb64(t){ const s=atob(t.replace(/-/g,'+').replace(/_/g,'/'));
  const u=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u[i]=s.charCodeAt(i); return u; }
async function packen(obj){
  const roh=new TextEncoder().encode(JSON.stringify(obj));
  if(typeof CompressionStream!=='undefined'){
    try{
      const cs=new CompressionStream('deflate-raw'), w=cs.writable.getWriter();
      w.write(roh); w.close();
      return 'c'+b64(new Uint8Array(await new Response(cs.readable).arrayBuffer()));
    }catch(e){}
  }
  return 'u'+b64(roh);
}
async function auspacken(txt){
  const art=txt.charAt(0); let bin=unb64(txt.slice(1));
  if(art==='c'){
    const ds=new DecompressionStream('deflate-raw'), w=ds.writable.getWriter();
    w.write(bin); w.close();
    bin=new Uint8Array(await new Response(ds.readable).arrayBuffer());
  }
  return JSON.parse(new TextDecoder().decode(bin));
}

/* ---------- Empfangen ---------- */
function teil(){ const m=/[#&]t=([A-Za-z0-9\-_]+)/.exec(location.hash||''); return m?m[1]:null; }
function istGeteilt(){ return !!teil(); }
function empfangen(){ const t=teil();
  if(!t) return Promise.reject(new Error('kein Code'));
  return auspacken(t).then(p=>{ if(p&&typeof p.a==='string') auftragAnzeigen(p.a); return p; }); }

/* Der Arbeitsauftrag der Lehrkraft – auf dem Schülergerät unten eingeblendet, antippen klappt ihn zu */
function auftragAnzeigen(text){
  text=(text||'').trim();
  if(!text||document.getElementById('tAuftrag')) return;
  const st=document.createElement('style');
  st.textContent=
   '#tAuftrag{position:fixed;left:0;right:0;bottom:0;z-index:9996;background:#fff;border-top:2px solid #2563eb;'+
     'box-shadow:0 -5px 16px rgba(15,23,42,.16);color:#1f2430;max-height:40vh;overflow:auto;'+
     'font:16px/1.4 -apple-system,BlinkMacSystemFont,sans-serif;padding:9px 46px 11px 14px;'+
     '-webkit-overflow-scrolling:touch;}'+
   '#tAuftrag .l{display:block;font-size:11.5px;font-weight:700;letter-spacing:.06em;'+
     'text-transform:uppercase;color:#2563eb;margin-bottom:3px;}'+
   '#tAuftrag .t{white-space:pre-wrap;}'+
   '#tAuftrag .k{position:absolute;top:5px;right:7px;border:0;background:transparent;color:#64748b;'+
     'font:700 17px -apple-system,sans-serif;cursor:pointer;padding:2px 7px;line-height:1;}'+
   '#tAuftrag.zu{max-height:none;overflow:hidden;padding:6px 46px 6px 14px;cursor:pointer;}'+
   '#tAuftrag.zu .t{display:none;} #tAuftrag.zu .l{margin:0;}';
  document.head.appendChild(st);
  const d=document.createElement('div'); d.id='tAuftrag';
  d.innerHTML='<span class="l">Arbeitsauftrag</span><div class="t"></div><button class="k" title="ein-/ausklappen">▾</button>';
  d.querySelector('.t').textContent=text;
  const um=()=>{ const zu=d.classList.toggle('zu'); d.querySelector('.k').textContent=zu?'▴':'▾'; };
  d.querySelector('.k').onclick=e=>{ e.stopPropagation(); um(); };
  d.addEventListener('click',()=>{ if(d.classList.contains('zu')) um(); });
  document.body.appendChild(d);
}

/* Geteilte Fassung: nur bedienen, keine Bibliothek, keine Lösung */
function nurBenutzen(verstecken){
  document.body.classList.add('nurBenutzen','tafelGeteilt');
  if(!document.getElementById('tafelTeilenCSS')){
    const st=document.createElement('style'); st.id='tafelTeilenCSS';
    st.textContent='body.nurBenutzen .tafelEdit{display:none!important;}'+
      'body.tafelGeteilt .tafelTeilenKnopf,body.tafelGeteilt .tafelLoesung{display:none!important;}'+
      'body.tafelGeteilt #tafelModus{display:none!important;}';   /* kein Zurück ins Bearbeiten */
    document.head.appendChild(st);
  }
  if(verstecken) document.querySelectorAll(verstecken).forEach(el=>{ el.hidden=true; el.disabled=true; });
}

/* ---------- Fenster mit dem QR-Code ---------- */
let raumAngefragt=false;
function raum(an){
  try{ if(window.parent===window) return;
    parent.postMessage({type:'picker-space',on:!!an},'*'); raumAngefragt=!!an;
  }catch(e){}
}
function aufbau(){
  if(document.getElementById('tTeilen')) return;
  const st=document.createElement('style');
  st.textContent=
   '#tTeilen{position:fixed;inset:0;background:rgba(15,23,42,.45);display:none;align-items:center;justify-content:center;padding:12px;z-index:9997;}'+
   '#tTeilen.an{display:flex;}'+
   '#tTeilenIn{background:#fff;border-radius:14px;padding:12px;max-width:min(680px,97vw);max-height:97vh;overflow:auto;'+
     'display:flex;flex-direction:column;gap:9px;align-items:center;font:14px -apple-system,BlinkMacSystemFont,sans-serif;color:#1f2430;}'+
   '#tTeilenIn h3{margin:0;font-size:1.05em;align-self:flex-start;}'+
   '#tTeilenIn .hint{color:#64748b;font-size:.84em;align-self:flex-start;line-height:1.35;}'+
   '#tTeilenBild{display:flex;align-items:center;justify-content:center;min-height:60px;flex:0 0 auto;width:100%;}'+
   '#tTeilenBild img,#tTeilenBild canvas{width:auto;height:auto;max-width:min(600px,100%);image-rendering:pixelated;}'+
   '#tTeilenAuftrag{width:100%;display:flex;gap:7px;align-items:flex-start;}'+
   '#tTeilenText{flex:1 1 auto;min-width:0;border:1px solid #cfd6e0;border-radius:10px;padding:7px 9px;'+
     'font:inherit;line-height:1.35;resize:none;overflow:auto;min-height:38px;color:#1f2430;background:#fff;}'+
   '#tTeilenText::placeholder{color:#94a3b8;font-size:13px;}'+
   '#tTeilenAuftrag .fs{display:flex;flex-direction:column;gap:4px;flex:none;}'+
   '#tTeilenAuftrag .fs button{padding:3px 8px;font-size:12px;}'+
   '#tTeilenLink{width:100%;border:1px solid #cfd6e0;border-radius:9px;padding:6px 8px;font:12px ui-monospace,monospace;color:#475569;}'+
   '#tTeilen .row{display:flex;gap:7px;align-self:stretch;justify-content:flex-end;flex-wrap:wrap;}'+
   '#tTeilen button{border:1px solid #cfd6e0;background:#fff;border-radius:9px;padding:6px 11px;font:inherit;font-weight:600;cursor:pointer;}'+
   '#tTeilen button.pri{background:#2563eb;border-color:#2563eb;color:#fff;}'+
   '#tTeilen .warn{color:#b45309;font-size:.84em;align-self:flex-start;}';
  document.head.appendChild(st);
  const d=document.createElement('div'); d.id='tTeilen';
  d.innerHTML='<div id="tTeilenIn"><h3>Aufgabe teilen</h3>'+
    '<div class="hint">Mit der Kamera scannen – dann öffnet sich dasselbe Werkzeug mit dieser Aufgabe.</div>'+
    '<div id="tTeilenBild"></div><div id="tTeilenWarn" class="warn" hidden></div>'+
    '<div id="tTeilenAuftrag"><textarea id="tTeilenText" rows="1" spellcheck="false" '+
      'placeholder="Arbeitsauftrag (freiwillig) – erscheint beim Scannen auf dem Schülergerät"></textarea>'+
      '<span class="fs"><button id="tTeilenFsP" title="Schrift größer">A+</button>'+
      '<button id="tTeilenFsM" title="Schrift kleiner">A−</button></span></div>'+
    '<input type="text" id="tTeilenLink" readonly>'+
    '<div class="row"><button id="tTeilenKopie">Link kopieren</button>'+
    '<button class="pri" id="tTeilenZu">Schließen</button></div></div>';
  document.body.appendChild(d);
  d.addEventListener('click',e=>{ if(e.target===d) zu(); });
  document.getElementById('tTeilenZu').onclick=zu;
  const ta=document.getElementById('tTeilenText');
  ta.value=auftrag;
  ta.style.fontSize=schrift+'px';
  ta.addEventListener('input',()=>{ auftrag=ta.value; merken(); hoehen(); neuerCode(); });
  document.getElementById('tTeilenFsP').onclick=()=>schriftUm(2);
  document.getElementById('tTeilenFsM').onclick=()=>schriftUm(-2);
  addEventListener('resize',()=>{ if(document.querySelector('#tTeilen.an')) hoehen(); });
  document.getElementById('tTeilenKopie').onclick=()=>{
    const i=document.getElementById('tTeilenLink');
    i.select(); i.setSelectionRange(0,99999);
    const fertig=()=>window.TafelShot&&TafelShot.toast('Link kopiert');
    if(navigator.clipboard) navigator.clipboard.writeText(i.value).then(fertig,()=>{ try{document.execCommand('copy'); fertig();}catch(e){} });
    else { try{ document.execCommand('copy'); fertig(); }catch(e){} }
  };
}
function zu(){ const d=document.getElementById('tTeilen'); if(d) d.classList.remove('an');
  if(raumAngefragt) raum(false); }
/* Beendet die Lehrkraft das Vollbild, während das Teilen-Fenster offen ist, schließt die Tafel es mit */
addEventListener('message',e=>{ if(e.data&&e.data.type==='picker-zu') zu(); });

/* ---------- Arbeitsauftrag ---------- */
let auftrag='', schrift=17, letzteQuelle=null, codeT=null;
try{ auftrag=sessionStorage.getItem('tafel_teilen_auftrag')||''; }catch(e){}
try{ schrift=Math.max(13,Math.min(44,+localStorage.getItem('tafel_teilen_fs')||17)); }catch(e){}
function merken(){ try{ sessionStorage.setItem('tafel_teilen_auftrag',auftrag); }catch(e){} }
function schriftUm(d){
  schrift=Math.max(13,Math.min(44,schrift+d));
  try{ localStorage.setItem('tafel_teilen_fs',String(schrift)); }catch(e){}
  const ta=document.getElementById('tTeilenText');
  if(ta) ta.style.fontSize=schrift+'px';
  hoehen();
}
/* Je länger der Auftrag, desto größer das Feld – und desto kleiner der QR-Code.
   Beides hängt voneinander ab (schmaleres Bild → anderer Zeilenumbruch), deshalb wird
   zwei-, dreimal nachgemessen, bis sich nichts mehr ändert.                          */
function messen(){
  const inn=document.getElementById('tTeilenIn'), bild=document.getElementById('tTeilenBild');
  const ta=document.getElementById('tTeilenText');
  if(!inn||!bild||!ta) return;
  /* 1. Platz für den Code: alles andere im Fenster abziehen */
  const bilder=bild.querySelectorAll('img,canvas');     /* die QR-Bibliothek legt beides an */
  if(bilder.length){
    let belegt=0;
    Array.prototype.forEach.call(inn.children,c=>{ if(c!==bild&&!c.hidden) belegt+=c.getBoundingClientRect().height+9; });
    const platz=Math.round(innerHeight*0.97)-belegt-28;
    const hoch=Math.max(120,Math.min(platz,600))+'px';
    Array.prototype.forEach.call(bilder,e=>{ e.style.maxHeight=hoch; });
  }
  /* 2. Feldhöhe an den Text anpassen */
  const deckel=Math.round(innerHeight*0.42);
  ta.style.height='auto';
  const rand=ta.offsetHeight-ta.clientHeight;          /* Rahmen zählt bei border-box mit */
  ta.style.height=Math.max(38,Math.min(ta.scrollHeight+rand,deckel))+'px';
  if(ta.scrollHeight>ta.clientHeight+1)                /* letzte Zeile nicht abschneiden */
    ta.style.height=Math.max(38,Math.min(ta.scrollHeight+rand+(ta.scrollHeight-ta.clientHeight),deckel))+'px';
}
function hoehen(){
  messen();
  requestAnimationFrame(()=>{ messen(); requestAnimationFrame(messen); });
}
function neuerCode(){                       /* der Auftrag steckt im Link – also neu erzeugen */
  clearTimeout(codeT);
  codeT=setTimeout(async()=>{ if(!letzteQuelle) return;
    const url=await bauenUrl(letzteQuelle.datei,letzteQuelle.inhalt);
    const feld=document.getElementById('tTeilenLink'); if(feld) feld.value=url;
    qr(url); hoehen();
  },350);
}
async function bauenUrl(datei,inhalt){
  const paket=Object.assign({},inhalt);
  const txt=(auftrag||'').trim();
  if(txt) paket.a=txt; else delete paket.a;
  return basis()+datei+'#t='+await packen(paket);
}

function qr(url){
  const host=document.getElementById('tTeilenBild'); host.innerHTML='';
  const warn=document.getElementById('tTeilenWarn');
  warn.hidden=true; warn.textContent='';
  if(typeof QRCode==='undefined'){ warn.hidden=false; warn.textContent='QR-Code nicht verfügbar – bitte den Link weitergeben.'; return; }
  const stufe=url.length>GRENZE?QRCode.CorrectLevel.L:QRCode.CorrectLevel.M;
  try{ new QRCode(host,{text:url,width:900,height:900,correctLevel:stufe}); }
  catch(e){ warn.hidden=false;
    warn.textContent='Die Aufgabe ist zu umfangreich für einen QR-Code. Bitte den Link kopieren und weitergeben.'; return; }
  if(url.length>GRENZE){ warn.hidden=false;
    warn.textContent='Umfangreiche Aufgabe: Der Code ist dicht. Groß darstellen und aus der Nähe scannen – sonst den Link weitergeben.'; }
}

async function zeigen(datei,bauen){
  const inhalt=bauen&&bauen();
  if(!inhalt){ window.TafelShot&&TafelShot.toast('Es ist noch keine Aufgabe geladen'); return; }
  aufbau();
  letzteQuelle={datei,inhalt};
  const url=await bauenUrl(datei,inhalt);
  document.getElementById('tTeilenLink').value=url;
  qr(url);
  document.getElementById('tTeilen').classList.add('an');
  raum(true);
  hoehen();
}

/* ---------- Knopf in der Werkzeugleiste ---------- */
/* Das Symbol bringt Größe und Strichfarbe selbst mit – sonst sieht es in Werkzeugen,
   die keine eigene Regel für Knopf-Grafiken haben, riesig und falsch gefüllt aus. */
const SYMBOL='<svg viewBox="0 0 32 20" width="17" height="11" fill="none" stroke="currentColor" '+
  'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex:none;display:block">'+
  '<path d="M11.5 7.5H6.5v10h19v-10h-5"/>'+
  '<path d="M16 13.5V2.6"/><path d="M12.3 6.3 16 2.6l3.7 3.7"/></svg>';
function knopf(host,datei,bauen,opt){
  if(!host) return null;
  opt=opt||{};
  const b=document.createElement('button');
  b.type='button';
  b.className=(opt.cls||'tb')+' tafelTeilenKnopf'; b.id='bTeilen';
  b.title='Diese Aufgabe per QR-Code an die Klasse geben';
  b.innerHTML=opt.html||(SYMBOL+'<span>Teilen</span>');
  if(!opt.html) b.style.cssText+='display:inline-flex;align-items:center;gap:5px;white-space:nowrap;';
  b.onclick=()=>zeigen(datei,bauen);
  host.appendChild(b);
  return b;
}

/* Viele Werkzeuge bekommen ihren Zustand ohnehin über „embed-data" von der Tafel.
   Ein geteilter Link spielt ihn auf demselben Weg ein – als Nachricht an das eigene Fenster. */
function einspielen(daten){
  try{ window.dispatchEvent(new MessageEvent('message',{data:{type:'embed-data',data:daten},source:window})); return true; }
  catch(e){ return false; }
}

window.TafelTeilen={ knopf, zeigen, empfangen, istGeteilt, nurBenutzen, einspielen, auftragAnzeigen, basis };
})();

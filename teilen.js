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
function empfangen(){ const t=teil(); return t?auspacken(t):Promise.reject(new Error('kein Code')); }

/* Geteilte Fassung: nur bedienen, keine Bibliothek, keine Lösung */
function nurBenutzen(verstecken){
  document.body.classList.add('nurBenutzen','tafelGeteilt');
  if(!document.getElementById('tafelTeilenCSS')){
    const st=document.createElement('style'); st.id='tafelTeilenCSS';
    st.textContent='body.nurBenutzen .tafelEdit{display:none!important;}'+
      'body.tafelGeteilt .tafelTeilenKnopf,body.tafelGeteilt .tafelLoesung{display:none!important;}';
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
   '#tTeilenIn{background:#fff;border-radius:14px;padding:14px;max-width:min(560px,96vw);max-height:96vh;overflow:auto;'+
     'display:flex;flex-direction:column;gap:9px;align-items:center;font:14px -apple-system,BlinkMacSystemFont,sans-serif;color:#1f2430;}'+
   '#tTeilenIn h3{margin:0;font-size:1.05em;align-self:flex-start;}'+
   '#tTeilenIn .hint{color:#64748b;font-size:.84em;align-self:flex-start;line-height:1.35;}'+
   '#tTeilenBild{display:flex;align-items:center;justify-content:center;min-height:60px;}'+
   '#tTeilenBild img,#tTeilenBild canvas{width:min(62vh,340px);height:auto;image-rendering:pixelated;}'+
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
    '<input type="text" id="tTeilenLink" readonly>'+
    '<div class="row"><button id="tTeilenKopie">Link kopieren</button>'+
    '<button class="pri" id="tTeilenZu">Schließen</button></div></div>';
  document.body.appendChild(d);
  d.addEventListener('click',e=>{ if(e.target===d) zu(); });
  document.getElementById('tTeilenZu').onclick=zu;
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

function qr(url){
  const host=document.getElementById('tTeilenBild'); host.innerHTML='';
  const warn=document.getElementById('tTeilenWarn');
  warn.hidden=true; warn.textContent='';
  if(typeof QRCode==='undefined'){ warn.hidden=false; warn.textContent='QR-Code nicht verfügbar – bitte den Link weitergeben.'; return; }
  const stufe=url.length>GRENZE?QRCode.CorrectLevel.L:QRCode.CorrectLevel.M;
  try{ new QRCode(host,{text:url,width:620,height:620,correctLevel:stufe}); }
  catch(e){ warn.hidden=false;
    warn.textContent='Die Aufgabe ist zu umfangreich für einen QR-Code. Bitte den Link kopieren und weitergeben.'; return; }
  if(url.length>GRENZE){ warn.hidden=false;
    warn.textContent='Umfangreiche Aufgabe: Der Code ist dicht. Groß darstellen und aus der Nähe scannen – sonst den Link weitergeben.'; }
}

async function zeigen(datei,bauen){
  const inhalt=bauen&&bauen();
  if(!inhalt){ window.TafelShot&&TafelShot.toast('Es ist noch keine Aufgabe geladen'); return; }
  aufbau();
  const url=basis()+datei+'#t='+await packen(inhalt);
  document.getElementById('tTeilenLink').value=url;
  qr(url);
  document.getElementById('tTeilen').classList.add('an');
  raum(true);
}

/* ---------- Knopf in der Werkzeugleiste ---------- */
function knopf(host,datei,bauen){
  if(!host) return null;
  const b=document.createElement('button');
  b.className='tb tafelTeilenKnopf'; b.id='bTeilen';
  b.title='Diese Aufgabe per QR-Code an die Klasse geben';
  b.innerHTML='<svg viewBox="0 0 32 20"><rect x="4" y="2" width="6" height="6"/><rect x="4" y="12" width="6" height="6"/>'+
    '<rect x="14" y="2" width="6" height="6"/><path d="M14 12h3v3M20 12v6h-6M17 18v-3M24 4v3M27 9h-3M24 13v5M27 16h1"/></svg>'+
    '<span>Teilen</span>';
  b.onclick=()=>zeigen(datei,bauen);
  host.appendChild(b);
  return b;
}

window.TafelTeilen={ knopf, zeigen, empfangen, istGeteilt, nurBenutzen, basis };
})();

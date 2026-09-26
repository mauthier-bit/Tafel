/* Digitale Tafel – Umschalter „Benutzen ↔ Bearbeiten" für Lernwerkzeuge.
   Im Benutzen-Modus bleibt nur der Inhalt sichtbar (arbeiten, ausfüllen, durchklicken),
   im Bearbeiten-Modus erscheinen die Bedienleisten des Werkzeugs.
   Einbinden:  <script src="modus.js"></script>
   Aufruf:     TafelModus.init({ get:()=>D.edit, set:v=>{ D.edit=v; sync(); }, hide:'#bar,#bar2', after:()=>resize() }); */
(function(){
"use strict";
let cfg=null, btn=null;

function style(){
  if(document.getElementById('tafelModusCSS')) return;
  const st=document.createElement('style'); st.id='tafelModusCSS';
  st.textContent=
   '#tafelModus{position:fixed;top:6px;right:8px;z-index:9998;display:inline-flex;gap:0;'+
   'border:1px solid #cfd6e0;border-radius:999px;background:rgba(255,255,255,.94);box-shadow:0 1px 4px rgba(15,23,42,.18);'+
   'font:700 12px -apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden;}'+
   '#tafelModus button{border:0;background:transparent;color:#475569;padding:5px 11px;font:inherit;cursor:pointer;}'+
   '#tafelModus.imEdit{background:rgba(37,99,235,.95);border-color:#2563eb;}'+
   '#tafelModus.imEdit button{color:#fff;}'+
   'body.nurBenutzen .tafelEdit{display:none!important;}';
  document.head.appendChild(st);
}
function paint(){
  const edit=!!(cfg&&cfg.get&&cfg.get());
  document.body.classList.toggle('nurBenutzen',!edit);
  if(btn){                                             /* nur der Knopf für den anderen Modus wird gezeigt */
    btn.children[0].hidden=!edit; btn.children[1].hidden=edit;
    btn.classList.toggle('imEdit',edit);
  }
  if(cfg&&cfg.hide) document.querySelectorAll(cfg.hide).forEach(el=>el.classList.toggle('tafelEdit',true));
}
function setMode(v){
  if(!cfg) return;
  if(cfg.set) cfg.set(!!v);
  paint();
  if(cfg.after) try{ cfg.after(); }catch(e){}
}
function init(opt){
  cfg=opt||{}; style();
  if(cfg.hide) document.querySelectorAll(cfg.hide).forEach(el=>el.classList.add('tafelEdit'));
  const inTafel=(window.parent!==window);        /* in der Tafel sitzt der Umschalter neben dem Kontextmenü */
  if(!btn&&cfg.button!==false&&!inTafel){
    btn=document.createElement('div'); btn.id='tafelModus';
    const mk=(t,v,title)=>{ const b=document.createElement('button'); b.type='button'; b.textContent=t; b.title=title;
      b.onclick=()=>setMode(v); btn.appendChild(b); };
    mk('▶ Benutzen',false,'Nur mit dem Inhalt arbeiten');
    mk('✎ Bearbeiten',true,'Bedienelemente einblenden');
    document.body.appendChild(btn);
  }
  paint();
}
window.TafelModus={ init, set:setMode, refresh:paint,
  verstecke(){ if(btn) btn.style.display='none'; },
  zeige(){ if(btn) btn.style.display=''; } };
})();

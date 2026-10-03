/* Gemeinsamer Begriffs-Import aus dem Lehrplan-Glossar.
   Wird von Glossar, Kreuzworträtsel, Buchstabengitter und Galgenmännchen genutzt.
   Aufruf:  TafelLehrplan.oeffnen({ titel:'…', uebernehmen: liste => { … } })
   Die Liste enthält Objekte { b:Begriff, e:Erklärung, f:Fach, j:Jahrgangsstufe, g:Themenbereich }. */
(function(){
"use strict";
if(!window.LEHRPLAN) return;
const L=window.LEHRPLAN, FA=L.faecher||{M:'Mathematik',Ph:'Physik'};
const alle=()=>L.e.map(r=>({f:r[0], j:+r[1], g:r[2], b:r[3], e:r[4]}));

let css=false;
function stil(){ if(css) return; css=true;
  const s=document.createElement('style');
  s.textContent=`
  #lpBox{position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.35);display:flex;align-items:center;justify-content:center;padding:10px;
    font-family:-apple-system,BlinkMacSystemFont,sans-serif;color:#1f2430;}
  #lpIn{background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(15,23,42,.35);width:min(880px,96vw);max-height:96vh;display:flex;flex-direction:column;overflow:hidden;}
  #lpKopf{padding:8px 14px;font-weight:800;background:#f1f5fb;border-bottom:1px solid #e2e7ef;display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:15px;flex:none;}
  #lpKopf #lpTitel{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  #lpKopf .rechts{display:flex;gap:8px;align-items:center;flex:none;}
  #lpKopf .lpBtn{padding:4px 11px;font-size:13.5px;}
  #lpKopf .x{cursor:pointer;color:#64748b;font-size:22px;line-height:1;padding:0 4px;}
  #lpQuelle{padding:7px 14px;border-bottom:1px solid #e2e7ef;display:flex;gap:6px;align-items:center;flex-wrap:wrap;flex:none;}
  #lpQuelle b{font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;width:88px;flex:none;}
  #lpFilter{padding:9px 14px;border-bottom:1px solid #e2e7ef;display:flex;flex-direction:column;gap:11px;
    flex:0 1 auto;min-height:0;max-height:30vh;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;}
  #lpFilter .zeile{display:flex;gap:6px;align-items:center;flex-wrap:wrap;}
  #lpFilter .zeile[data-r="ber"]{max-height:84px;overflow:auto;-webkit-overflow-scrolling:touch;align-items:flex-start;align-content:flex-start;}
  #lpFilter b{font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;width:88px;flex:none;padding-right:10px;}
  .lpChip{border:1.5px solid #cfd6e0;background:#fff;border-radius:999px;padding:3px 11px;font:700 13px -apple-system,sans-serif;color:#475569;cursor:pointer;}
  .lpChip.on{background:#2563eb;border-color:#2563eb;color:#fff;}
  #lpSuche{flex:1 1 140px;border:1px solid #cfd6e0;border-radius:9px;padding:5px 9px;font:inherit;font-size:14px;min-width:120px;}
  .lpSel{flex:1 1 200px;max-width:460px;border:1.5px solid #cfd6e0;border-radius:9px;padding:5px 9px;
    font:700 13.5px -apple-system,sans-serif;color:#475569;background:#fff;}
  .lpSel.on{border-color:#2563eb;color:#2563eb;}
  #lpListe{flex:1 1 380px;overflow:auto;-webkit-overflow-scrolling:touch;padding:6px 10px;min-height:170px;}
  .lpZ{display:flex;gap:8px;align-items:flex-start;padding:5px 4px;border-bottom:1px solid #f1f5f9;cursor:pointer;}
  .lpZ input{margin-top:3px;width:18px;height:18px;flex:none;}
  .lpZ .t{flex:1 1 auto;min-width:0;}
  .lpZ .b{font-weight:700;font-size:14px;}
  .lpZ .e{font-size:12.5px;color:#64748b;line-height:1.35;}
  .lpZ .m{font-size:11px;color:#94a3b8;}
  .lpZ .lpPfeil{align-self:center;color:#94a3b8;font-weight:800;}
  .lpZ .lpBild{width:96px;height:74px;object-fit:contain;border:1px solid #e2e7ef;border-radius:7px;background:#fff;flex:none;}
  #lpFuss{padding:9px 14px;border-top:1px solid #e2e7ef;display:flex;gap:8px;align-items:center;flex-wrap:nowrap;flex:none;background:#fff;}
  #lpFuss .info{font-size:13px;color:#64748b;flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  #lpFuss .lpBtn{flex:none;white-space:nowrap;}
  .lpBtn{border:1px solid #cfd6e0;background:#fff;border-radius:9px;padding:6px 12px;font:700 14px -apple-system,sans-serif;color:#1f2430;cursor:pointer;}
  #lpFuss .lpBtn{padding:6px 10px;font-size:13.5px;}
  .lpBtn.pri{background:#2563eb;border-color:#2563eb;color:#fff;}
  #lpHinweis{font-size:11.5px;color:#94a3b8;padding:0 14px 8px;flex:none;}
  #lpArt{display:none;gap:6px;align-items:center;flex-wrap:wrap;padding:0 14px 8px;}
  #lpArt.an{display:flex;} #lpArt b{font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.04em;}
  #lpArt .lpWahl{display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap;margin-right:14px;}
  #lpArt{flex:none;}
  /* niedriges Fenster: der Knopf „Übernehmen" bleibt sichtbar, die Filter rücken zusammen */
  /* je niedriger das Fenster, desto mehr Platz bekommt die Begriffsliste */
  @media (max-height:680px){ #lpHinweis{display:none;} }
  @media (max-height:560px){ #lpFilter{max-height:26vh;padding:6px 14px;}
    #lpFilter .zeile[data-r="ber"]{max-height:56px;} #lpListe{min-height:130px;} #lpFuss .info{display:none;} }
  /* sehr niedriges Objektfenster: alles schmal, damit „Übernehmen" ganz sichtbar bleibt */
  @media (max-height:460px){ #lpIn{max-height:99vh;border-radius:12px;} #lpBox{padding:3px;}
    #lpKopf{padding:6px 10px;} #lpQuelle{padding:4px 10px;} #lpFilter{padding:5px 10px;gap:6px;max-height:24vh;}
    #lpListe{min-height:84px;padding:2px 8px;}
    #lpFuss{padding:6px 10px;gap:6px;} #lpFuss .lpBtn{padding:5px 9px;font-size:13px;} }`;
  document.head.appendChild(s); }

/* Ein gespeichertes Glossar (Textformat „Begriff = Erklärung", Abschnitte mit „# …") einlesen */
function ausText(txt,name){
  const out=[]; let g=name||'Glossar';
  String(txt||'').split(/\r?\n/).forEach(z=>{ const t=z.trim(); if(!t) return;
    if(/^#+\s*/.test(t)){ g=t.replace(/^#+\s*/,'').trim()||g; return; }
    const m=t.match(/^([^=:]{1,60})\s*[=:]\s*(.+)$/);
    if(m) out.push({f:'', j:0, g, b:m[1].trim(), e:m[2].trim()});
    else out.push({f:'', j:0, g, b:t, e:''}); });
  return out;
}
const TX=()=>window.LEHRPLAN_TEXTE&&window.LEHRPLAN_TEXTE.t||[];
const ARTNAME={sach:'Sachtext', alltag:'Alltag', geschichte:'Geschichte'};
/* Texte der Bibliothek in dieselbe Struktur bringen: b = Titel, e = Text */
function texte(){ return TX().map(r=>{ const mitArt=r.length>5;
  return { f:r[0], j:+r[1], g:r[2], b:r[3], e:mitArt?r[5]:r[4], art:mitArt?r[4]:'sach' }; }); }

/* Im Objektfenster der Tafel ist oft wenig Platz. Ist das Fenster zu niedrig, bittet das
   Auswahlfenster die Tafel, das Werkzeug so lange auf Vollbild zu stellen. */
let platzAngefragt=false;
function platzHolen(){ try{ if(window.parent===window||window.innerHeight>=560) return;
  parent.postMessage({type:'picker-space',on:true},'*'); platzAngefragt=true; }catch(e){} }
function platzZurueck(){ try{ if(!platzAngefragt) return; platzAngefragt=false;
  parent.postMessage({type:'picker-space',on:false},'*'); }catch(e){} }

function oeffnen(opt){
  opt=opt||{}; stil(); platzHolen();
  const textModus=!!opt.texte, eigen=!!opt.daten;
  let daten=eigen?opt.daten.slice():(textModus?texte():alle()), quelle=eigen?'eigen':(textModus?'tx':'lp');
  let fFach='', fJg=0, fBer='', fArt='', fQ='';
  /* Jedes Werkzeug benennt seine Einträge selbst: Begriffe, Texte, Aufgaben, Ketten … */
  const WORT=opt.einheit||'Begriffe';
  /* „Art" heißt beim Lückentext Textsorte, beim Zuordnen Darstellung – Namen kommen vom Werkzeug */
  const ARTEN=(opt.sorten&&opt.sorten.namen)||ARTNAME;
  const ARTTITEL=(opt.sorten&&opt.sorten.titel)||'Art';
  const SUCHE=opt.suche||'Begriff oder Erklärung …';
  const gewaehlt=new Set();

  const box=document.createElement('div'); box.id='lpBox';
  box.innerHTML=`<div id="lpIn">
    <div id="lpKopf"><span id="lpTitel">${opt.titel||'Begriffe übernehmen'}</span><span class="rechts"><button class="lpBtn pri" id="lpOk2" title="Auswahl übernehmen">Übernehmen</button><span class="x">×</span></span></div>
    <div id="lpQuelle"><b>Quelle</b>
      <button class="lpChip on" data-q="lp">${textModus?'Textbibliothek':'Lehrplan-Glossar'}</button>
      <button class="lpChip" data-q="datei">📄 ${textModus?'eigener Text …':'eigenes Glossar …'}</button>
      <input type="file" id="lpFile" accept=".txt,.json,text/plain,application/json" hidden>
    </div>
    <div id="lpFilter">
      <div class="zeile" data-r="fach"><b>Fach</b></div>
      <div class="zeile" data-r="jg"><b>Jahrgang</b></div>
      <div class="zeile" data-r="ber"><b>Bereich</b></div>
      <div class="zeile" data-r="art" style="display:none"><b>Art</b></div>
      <div class="zeile"><b>Suche</b><input id="lpSuche" type="search" placeholder="${SUCHE}"></div>
    </div>
    <div id="lpListe"></div>
    <div id="lpHinweis">${opt.hinweis||L.stand||''}</div>
    <div id="lpArt"></div>
    <div id="lpFuss">
      <button class="lpBtn" id="lpAlle">alle</button>
      <button class="lpBtn" id="lpKeine">keine</button>
      <button class="lpBtn" id="lpZufall">10 zufällig</button>
      <span class="info" id="lpInfo"></span>
      <button class="lpBtn" id="lpAb">Abbrechen</button>
      <button class="lpBtn pri" id="lpOk">Übernehmen</button>
    </div></div>`;
  document.body.appendChild(box);
  const $l=q=>box.querySelector(q);
  if(eigen) $l('#lpQuelle').style.display='none';

  const passt=d=>(!fFach||d.f===fFach)&&(!fJg||d.j===fJg)&&(!fBer||d.g===fBer)&&(!fArt||d.art===fArt)&&
    (!fQ||(d.b+' '+d.e).toLowerCase().includes(fQ));
  const sichtbar=()=>daten.filter(passt);

  function chips(){
    const bauen=(sel,werte,akt,setz,titel)=>{ const z=$l('.zeile[data-r="'+sel+'"]');
      z.innerHTML='<b>'+titel+'</b>';
      const mk=(txt,val)=>{ const b=document.createElement('button'); b.className='lpChip'+(akt()===val?' on':''); b.textContent=txt;
        b.onclick=()=>{ setz(val); chips(); liste(); }; z.appendChild(b); };
      mk('alle',sel==='jg'?0:'');
      werte.forEach(v=>mk(sel==='fach'?(FA[v]||v):(sel==='jg'?('Jgst. '+v):(sel==='art'?(ARTEN[v]||v):v)), v)); };
    const feld=(sel,werte,akt,setz,titel,alleText)=>{ const z=$l('.zeile[data-r="'+sel+'"]');
      z.innerHTML='<b>'+titel+'</b>';
      const s=document.createElement('select'); s.className='lpSel';
      const opt=(t,v)=>{ const o=document.createElement('option'); o.textContent=t; o.value=String(v); s.appendChild(o); };
      opt(alleText||'alle','');
      werte.forEach(v=>opt(v,v));
      s.value=String(akt()||'');
      s.classList.toggle('on',!!akt());
      s.onchange=()=>{ setz(s.value); chips(); liste(); };
      z.appendChild(s); };
    const faecher=[...new Set(daten.map(d=>d.f))].filter(Boolean);
    $l('.zeile[data-r="fach"]').style.display=faecher.length?'':'none';
    bauen('fach',faecher,()=>fFach,v=>{ fFach=v; fBer=''; },'Fach');
    const jgs=[...new Set(daten.filter(d=>!fFach||d.f===fFach).map(d=>d.j))].filter(Boolean).sort((a,b)=>a-b);
    $l('.zeile[data-r="jg"]').style.display=jgs.length?'':'none';
    bauen('jg',jgs,()=>fJg,v=>{ fJg=v; fBer=''; },'Jahrgang');
    const bers=[...new Set(daten.filter(d=>(!fFach||d.f===fFach)&&(!fJg||d.j===fJg)).map(d=>d.g))].filter(Boolean);
    $l('.zeile[data-r="ber"]').style.display=bers.length?'':'none';
    /* Viele Lehrplanthemen passen nicht als Chips in die Zeile – dann ein Auswahlfeld */
    if(bers.length>8) feld('ber',bers,()=>fBer,v=>{ fBer=v; },'Bereich','alle Bereiche');
    else bauen('ber',bers,()=>fBer,v=>{ fBer=v; },'Bereich');
    /* Die Art-Zeile nur zeigen, wenn jeder Wert einen Namen hat – sonst stünden dort Kürzel */
    const arten=[...new Set(daten.map(d=>d.art).filter(Boolean))];
    const benannt=arten.filter(a=>ARTEN[a]);
    const zeigeArt=benannt.length>1&&benannt.length===arten.length;
    const za=$l('.zeile[data-r="art"]');
    za.style.display=zeigeArt?'':'none';
    if(zeigeArt) bauen('art',arten,()=>fArt,v=>{ fArt=v; },ARTTITEL); else fArt='';
  }
  function liste(){
    const box2=$l('#lpListe'); box2.innerHTML='';
    const list=sichtbar();
    list.forEach(d=>{
      const z=document.createElement('label'); z.className='lpZ';
      const c=document.createElement('input'); c.type='checkbox'; c.checked=gewaehlt.has(d);
      c.onchange=()=>{ if(textModus) gewaehlt.clear();          // ein Lückentext braucht genau einen Text
        if(c.checked) gewaehlt.add(d); else gewaehlt.delete(d); if(textModus) liste(); else info(); };
      if(d.bild){ const im=document.createElement('img'); im.src=d.bild; im.className='lpBild'; z.appendChild(im); }
      if(d.bild2){ const p2=document.createElement('span'); p2.className='lpPfeil'; p2.textContent='↔'; z.appendChild(p2);
        const im2=document.createElement('img'); im2.src=d.bild2; im2.className='lpBild'; z.appendChild(im2); }
      const t=document.createElement('div'); t.className='t';
      t.innerHTML='<div class="b"></div><div class="e"></div><div class="m"></div>';
      t.querySelector('.b').textContent=d.b;
      t.querySelector('.e').textContent=textModus?(d.e.slice(0,150)+(d.e.length>150?' …':'')):d.e;
      t.querySelector('.m').textContent=(d.f?((FA[d.f]||d.f)+' · Jgst. '+d.j+' · '+d.g):d.g)
        +(textModus?(' · '+(ARTNAME[d.art]||'Text')+' · '+d.e.split(/\s+/).length+' Wörter'):'');
      z.appendChild(c); z.appendChild(t); box2.appendChild(z);
    });
    if(!list.length) box2.innerHTML='<div style="padding:20px;text-align:center;color:#94a3b8">Keine '+WORT+' – Filter ändern</div>';
    info();
  }
  const info=()=>{ $l('#lpInfo').textContent=sichtbar().length+' '+WORT+' · '+gewaehlt.size+' gewählt';
    $l('#lpInfo').title=sichtbar().length+' '+WORT+' sichtbar · '+gewaehlt.size+' ausgewählt'; };

  box.querySelectorAll('#lpQuelle .lpChip').forEach(b=>b.onclick=()=>{
    if(b.dataset.q==='datei'){ $l('#lpFile').click(); return; }
    quelle='lp'; daten=textModus?texte():alle(); gewaehlt.clear(); fFach=''; fJg=0; fBer='';
    box.querySelectorAll('#lpQuelle .lpChip').forEach(x=>x.classList.toggle('on',x.dataset.q==='lp'));
    $l('#lpHinweis').textContent=(textModus&&window.LEHRPLAN_TEXTE?window.LEHRPLAN_TEXTE.stand:L.stand)||''; chips(); liste(); });
  $l('#lpFile').onchange=async e=>{ const f=e.target.files[0]; e.target.value=''; if(!f) return;
    let txt=''; try{ txt=await f.text(); }catch(err){ return; }
    if(/^\s*[{\[]/.test(txt)){ try{ const o=JSON.parse(txt); txt=(o&&(o.text||o.d&&o.d.text))||txt; }catch(err){} }
    const name=f.name.replace(/\.[^.]+$/,'');
    const neu=textModus ? [{f:'', j:0, g:'Eigener Text', b:name, e:txt.trim(), art:'sach'}] : ausText(txt, name);
    if(!neu.length) return;
    quelle='datei'; daten=neu; gewaehlt.clear(); fFach=''; fJg=0; fBer='';
    box.querySelectorAll('#lpQuelle .lpChip').forEach(x=>x.classList.toggle('on',x.dataset.q==='datei'));
    $l('#lpHinweis').textContent='Aus der Datei „'+f.name+'" – '+neu.length+' '+WORT;
    chips(); liste(); };
  $l('#lpSuche').oninput=e=>{ fQ=e.target.value.trim().toLowerCase(); liste(); };
  $l('#lpAlle').onclick=()=>{ sichtbar().forEach(d=>gewaehlt.add(d)); liste(); };
  $l('#lpKeine').onclick=()=>{ gewaehlt.clear(); liste(); };
  $l('#lpZufall').onclick=()=>{ gewaehlt.clear(); const l=sichtbar().slice();
    for(let i=l.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [l[i],l[j]]=[l[j],l[i]]; }
    l.slice(0,textModus?1:10).forEach(d=>gewaehlt.add(d)); liste(); };
  if(textModus){ $l('#lpZufall').textContent='zufällig'; $l('#lpAlle').hidden=true; }
  const zu=()=>{ box.remove(); platzZurueck(); removeEventListener('message',vonTafel); };
  /* Beendet die Lehrkraft das Vollbild, während die Auswahl offen ist, schließt die Tafel sie mit */
  const vonTafel=e=>{ if(e.data&&e.data.type==='picker-zu') zu(); };
  addEventListener('message',vonTafel);
  $l('.x').onclick=zu; $l('#lpAb').onclick=zu;
  box.onclick=e=>{ if(e.target===box) zu(); };
  /* zusätzliche Auswahl, die das aufrufende Werkzeug anbietet (z. B. Paare oder Gruppen) */
  let art=(opt.arten&&opt.arten[0]&&opt.arten[0].id)||null;
  let art2=(opt.arten2&&opt.arten2[0]&&opt.arten2[0].id)||null;
  const wahlzeile=(liste,titel,setz,aktiv)=>{ const z=$l('#lpArt'); z.classList.add('an');
    const g=document.createElement('span'); g.className='lpWahl';
    g.innerHTML='<b>'+titel+'</b>';
    liste.forEach(a=>{ const b=document.createElement('button'); b.className='lpChip'+(a.id===aktiv()?' on':''); b.textContent=a.name;
      b.onclick=()=>{ setz(a.id); [...g.querySelectorAll('.lpChip')].forEach(x=>x.classList.toggle('on',x===b)); }; g.appendChild(b); });
    z.appendChild(g); };
  if(opt.arten&&opt.arten.length>1) wahlzeile(opt.arten, opt.artTitel||'Form', v=>{art=v;}, ()=>art);
  if(opt.arten2&&opt.arten2.length>1) wahlzeile(opt.arten2, opt.art2Titel||'Zusatz', v=>{art2=v;}, ()=>art2);
  const uebernehmen=()=>{
    let l=[...gewaehlt];
    if(!l.length) l=textModus?sichtbar().slice(0,1):sichtbar();   // nichts angekreuzt: alles Sichtbare (beim Text der erste)
    if(!l.length){ zu(); return; }
    l.sort((a,b)=>String(a.f).localeCompare(String(b.f))||a.j-b.j||String(a.g).localeCompare(String(b.g),'de')||a.b.localeCompare(b.b,'de'));
    zu(); if(opt.uebernehmen) opt.uebernehmen(l, art, art2);
  };
  $l('#lpOk').onclick=uebernehmen; $l('#lpOk2').onclick=uebernehmen;
  chips(); liste();
  if(opt.fach) { fFach=opt.fach; chips(); liste(); }
}

window.TafelLehrplan={
  verfuegbar:()=>!!(window.LEHRPLAN&&window.LEHRPLAN.e&&window.LEHRPLAN.e.length),
  anzahl:()=>window.LEHRPLAN?window.LEHRPLAN.e.length:0,
  oeffnen,
  /* hängt einen fertigen Knopf an ein Element */
  knopf(ziel,opt){ if(!ziel) return null; const b=document.createElement('button');
    b.type='button'; b.className=(opt&&opt.cls)||'btn'; b.textContent=(opt&&opt.text)||'📚 Begriffe';
    b.title='Begriffe aus dem Lehrplan-Glossar oder aus einem gespeicherten Glossar übernehmen';
    b.onclick=()=>oeffnen(opt); ziel.appendChild(b); return b; }
};
})();

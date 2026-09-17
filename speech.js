/* Digitale Tafel – Spracherkennung (Web Speech API, Deutsch) für Diktierstift und Mindmap.
   TafelSpeech.start({onText(text,final), onEnd(reason), onError(msg)}) → Objekt mit stop().
   onText liefert den bisher erkannten Gesamttext dieser Sitzung (fertige Teile + vorläufiger Rest). */
(function(){
"use strict";
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
const embedded=window.parent!==window;
/* gesprochene Satzzeichen wie bei der iPad-Diktierfunktion */
const CMDS=[[/\s*\b(neue Zeile|neuer Absatz)\b\s*/gi,'\n'],[/\s+Punkt\b(?!\s+[A-ZÄÖÜ]\b)/g,'.'],[/\s+Komma\b/g,','],[/\s+Fragezeichen\b/g,'?'],
  [/\s+Ausrufezeichen\b/g,'!'],[/\s+Doppelpunkt\b/g,':'],[/\s+Bindestrich\s+/g,'-']];
function tidy(t){ t=' '+t; for(const [re,r] of CMDS) t=t.replace(re,r); return t.replace(/^ /,'').replace(/[ \t]+\n/g,'\n'); }
function start(h){ h=h||{};
  if(!SR){ h.onError&&h.onError('unsupported'); return null; }
  let stopped=false, done='', rec=null, got=false, wd=null;
  /* Wachhund: In der App vom Home-Bildschirm startet Safari die Erkennung, liefert aber nie etwas
     und meldet auch keinen Fehler – nach kurzer Zeit auf die Tastatur-Diktierfunktion verweisen. */
  const arm=()=>{ if(h.watchdog>0&&!got) wd=setTimeout(()=>{ if(got||stopped) return; stopped=true; blocked=true; try{ rec.stop(); }catch(e){} h.onError&&h.onError('silent'); },h.watchdog); };
  const disarm=()=>{ clearTimeout(wd); wd=null; };
  const run=()=>{ rec=new SR(); rec.lang='de-DE'; rec.continuous=true; rec.interimResults=true;
    let base=done;
    rec.onresult=e=>{ let fin='', tmp='';
      for(let i=0;i<e.results.length;i++){ const s=e.results[i][0].transcript; if(e.results[i].isFinal) fin+=s; else tmp+=s; }
      const join=(a,b)=>!a?b.trim():(!b.trim()?a:(a.replace(/\s+$/,'')+' '+b.trim()));
      done=join(base,fin); got=true; disarm(); h.onText&&h.onText(tidy(join(done,tmp)),!tmp); };
    rec.onerror=e=>{ const c=e.error||'';
      if(c==='no-speech'||c==='aborted') return;
      stopped=true; disarm(); h.onError&&h.onError(c==='not-allowed'||c==='service-not-allowed'?'denied':(c||'error')); };
    rec.onend=()=>{ if(!stopped){ try{ run(); return; }catch(e){} } h.onEnd&&h.onEnd(got); };   // Safari beendet nach Sprechpausen – weiterhören, bis gestoppt
    try{ rec.start(); arm(); }catch(e){ stopped=true; disarm(); h.onError&&h.onError('error'); } };
  run();
  return { stop(){ if(stopped) return; stopped=true; disarm(); try{ rec.stop(); }catch(e){ h.onEnd&&h.onEnd(got); } } };
}
/* In der Tafel eingebettete Werkzeuge: Safari lässt die Spracherkennung im iframe teils nicht zu –
   dann übernimmt die Tafel selbst das Zuhören und schickt den Text ins Werkzeug zurück. */
function startRemote(h){ h=h||{}; let done=false;
  const finish=()=>{ if(done) return true; done=true; removeEventListener('message',onMsg); return false; };
  const onMsg=e=>{ if(e.source!==window.parent||!e.data||done) return; const d=e.data;
    if(d.type==='speech-text') h.onText&&h.onText(String(d.text||''),!!d.final);
    else if(d.type==='speech-end'){ finish(); h.onEnd&&h.onEnd(); }
    else if(d.type==='speech-error'){ finish(); h.onError&&h.onError(d.code||'error'); } };
  addEventListener('message',onMsg);
  try{ parent.postMessage({type:'speech-start'},'*'); }catch(e){ finish(); h.onError&&h.onError('error'); return null; }
  return { stop(){ try{ parent.postMessage({type:'speech-stop'},'*'); }catch(e){} if(!finish()) h.onEnd&&h.onEnd(); } }; }
/* bevorzugt hier zuhören, sonst über die Tafel */
const standalone=()=>navigator.standalone===true||(window.matchMedia&&matchMedia('(display-mode: standalone)').matches);
let blocked=false;   // einmal festgestellt: iPadOS lässt die Erkennung hier nicht zu – dann nicht mehr warten
function begin(h){ h=h||{}; let local=null, remote=null, viaParent=false, stopped=false;
  if(h.watchdog===undefined&&standalone()) h.watchdog=4000;
  if(blocked){ h.onError&&h.onError('silent'); return null; }
  const goRemote=()=>{ if(viaParent||!embedded||stopped) return false; viaParent=true; remote=startRemote(h); return !!remote; };
  if(!SR&&embedded) goRemote();
  else local=start({ watchdog:h.watchdog, onText:(t,f)=>h.onText&&h.onText(t,f), onEnd:r=>{ if(!viaParent) h.onEnd&&h.onEnd(r); },
    onError:c=>{ if(c==='silent') blocked=true; if(c==='silent'||!goRemote()) h.onError&&h.onError(c); } });   // stumm = auch die Tafel bekäme nichts
  if(!local&&!remote) return null;
  return { stop(){ stopped=true; if(remote) remote.stop(); else if(local) local.stop(); } }; }
function errText(c){ return c==='silent'?'Diktat ist in der App vom Home-Bildschirm gesperrt – Mikrofon-Taste der Tastatur verwenden (oder die Tafel in Safari öffnen)'
  : c==='unsupported'?'Spracherkennung wird hier nicht unterstützt – Mikrofon-Taste der Bildschirmtastatur verwenden'
  : c==='denied'?'Kein Zugriff aufs Mikrofon/Diktat – in den Einstellungen erlauben oder Mikrofon-Taste der Tastatur verwenden'
  : c==='network'?'Spracherkennung braucht eine Internetverbindung':'Spracherkennung fehlgeschlagen ('+c+')'; }
window.TafelSpeech={available:!!SR||embedded,embedded,standalone,start:begin,startLocal:start,tidy,errText};
})();

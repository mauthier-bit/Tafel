/* Digitale Tafel – Spracherkennung (Web Speech API, Deutsch) für Diktierstift und Mindmap.
   TafelSpeech.start({onText(text,final), onEnd(reason), onError(msg)}) → Objekt mit stop().
   onText liefert den bisher erkannten Gesamttext dieser Sitzung (fertige Teile + vorläufiger Rest). */
(function(){
"use strict";
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
/* gesprochene Satzzeichen wie bei der iPad-Diktierfunktion */
const CMDS=[[/\s*\b(neue Zeile|neuer Absatz)\b\s*/gi,'\n'],[/\s+Punkt\b(?!\s+[A-ZÄÖÜ]\b)/g,'.'],[/\s+Komma\b/g,','],[/\s+Fragezeichen\b/g,'?'],
  [/\s+Ausrufezeichen\b/g,'!'],[/\s+Doppelpunkt\b/g,':'],[/\s+Bindestrich\s+/g,'-']];
function tidy(t){ t=' '+t; for(const [re,r] of CMDS) t=t.replace(re,r); return t.replace(/^ /,'').replace(/[ \t]+\n/g,'\n'); }
function start(h){ h=h||{};
  if(!SR){ h.onError&&h.onError('unsupported'); return null; }
  let stopped=false, done='', rec=null, got=false;
  const run=()=>{ rec=new SR(); rec.lang='de-DE'; rec.continuous=true; rec.interimResults=true;
    let base=done;
    rec.onresult=e=>{ let fin='', tmp='';
      for(let i=0;i<e.results.length;i++){ const s=e.results[i][0].transcript; if(e.results[i].isFinal) fin+=s; else tmp+=s; }
      const join=(a,b)=>!a?b.trim():(!b.trim()?a:(a.replace(/\s+$/,'')+' '+b.trim()));
      done=join(base,fin); got=true; h.onText&&h.onText(tidy(join(done,tmp)),!tmp); };
    rec.onerror=e=>{ const c=e.error||'';
      if(c==='no-speech'||c==='aborted') return;
      stopped=true; h.onError&&h.onError(c==='not-allowed'||c==='service-not-allowed'?'denied':(c||'error')); };
    rec.onend=()=>{ if(!stopped){ try{ run(); return; }catch(e){} } h.onEnd&&h.onEnd(got); };   // Safari beendet nach Sprechpausen – weiterhören, bis gestoppt
    try{ rec.start(); }catch(e){ stopped=true; h.onError&&h.onError('error'); } };
  run();
  return { stop(){ if(stopped) return; stopped=true; try{ rec.stop(); }catch(e){ h.onEnd&&h.onEnd(got); } } };
}
function errText(c){ return c==='unsupported'?'Spracherkennung wird hier nicht unterstützt – Mikrofon-Taste der Bildschirmtastatur verwenden'
  : c==='denied'?'Kein Zugriff aufs Mikrofon/Diktat – in den Einstellungen erlauben oder Mikrofon-Taste der Tastatur verwenden'
  : c==='network'?'Spracherkennung braucht eine Internetverbindung':'Spracherkennung fehlgeschlagen ('+c+')'; }
window.TafelSpeech={available:!!SR,start,tidy,errText};
})();

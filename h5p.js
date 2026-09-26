/* Digitale Tafel – lokale .h5p-Dateien abspielen.
   Die Datei wird entpackt und in den Cache „tafel-h5p" gelegt; der Service Worker liefert die
   Dateien danach unter  …/h5pfiles/<id>/…  aus, sodass der H5P-Player sie ganz normal laden kann.
   TafelH5P.install(file) → {id,title}   ·   TafelH5P.has(id)   ·   TafelH5P.remove(id) */
(function(){
"use strict";
const CACHE='tafel-h5p';
const baseOf=id=>new URL('h5pfiles/'+id+'/',location.href).href;

/* ---------- ZIP lesen (nativ über DecompressionStream, wie beim PPTX-Import) ---------- */
async function unzipAll(ab){
  const dv=new DataView(ab), u8=new Uint8Array(ab), dec=new TextDecoder();
  let eocd=-1; const min=Math.max(0, ab.byteLength-22-65536);
  for(let i=ab.byteLength-22;i>=min;i--){ if(dv.getUint32(i,true)===0x06054b50){ eocd=i; break; } }
  if(eocd<0) throw new Error('Das ist keine gültige .h5p-Datei (kein ZIP).');
  const count=dv.getUint16(eocd+10,true); let p=dv.getUint32(eocd+16,true);
  const out=[];
  for(let n=0;n<count;n++){
    if(dv.getUint32(p,true)!==0x02014b50) break;
    const method=dv.getUint16(p+10,true), compSize=dv.getUint32(p+20,true);
    const nameLen=dv.getUint16(p+28,true), extraLen=dv.getUint16(p+30,true), commentLen=dv.getUint16(p+32,true);
    const lho=dv.getUint32(p+42,true);
    const name=dec.decode(u8.subarray(p+46,p+46+nameLen));
    const lNameLen=dv.getUint16(lho+26,true), lExtraLen=dv.getUint16(lho+28,true);
    const start=lho+30+lNameLen+lExtraLen;
    if(!/\/$/.test(name)) out.push({name,method,comp:u8.subarray(start,start+compSize)});
    p+=46+nameLen+extraLen+commentLen;
  }
  const files=[];
  for(const e of out){
    let bytes;
    if(e.method===0) bytes=e.comp;
    else { const s=new Blob([e.comp]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
      bytes=new Uint8Array(await new Response(s).arrayBuffer()); }
    files.push({name:e.name,bytes});
  }
  return files;
}
const MIME={js:'text/javascript',css:'text/css',json:'application/json',html:'text/html',svg:'image/svg+xml',
  png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',gif:'image/gif',webp:'image/webp',mp3:'audio/mpeg',
  m4a:'audio/mp4',wav:'audio/wav',ogg:'audio/ogg',mp4:'video/mp4',webm:'video/webm',woff:'font/woff',
  woff2:'font/woff2',ttf:'font/ttf',eot:'application/vnd.ms-fontobject',txt:'text/plain',vtt:'text/vtt',pdf:'application/pdf'};
const mimeOf=n=>MIME[(n.split('.').pop()||'').toLowerCase()]||'application/octet-stream';

async function install(file){
  if(typeof DecompressionStream==='undefined') throw new Error('Dieser Browser kann .h5p-Dateien nicht entpacken.');
  const files=await unzipAll(await file.arrayBuffer());
  if(!files.some(f=>f.name==='h5p.json')) throw new Error('In der Datei fehlt h5p.json – ist das wirklich ein H5P-Inhalt?');
  let title=(file.name||'H5P').replace(/\.h5p$/i,'');
  try{ const j=files.find(f=>f.name==='h5p.json');
    const meta=JSON.parse(new TextDecoder().decode(j.bytes)); if(meta&&meta.title) title=meta.title; }catch(e){}
  const id='h5p-'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const cache=await caches.open(CACHE), base=baseOf(id);
  for(const f of files){
    const url=base+f.name.split('/').map(encodeURIComponent).join('/');
    await cache.put(url,new Response(f.bytes,{headers:{'Content-Type':mimeOf(f.name),'Cache-Control':'no-store'}}));
  }
  return {id,title,count:files.length};
}
async function has(id){ if(!id) return false;
  const cache=await caches.open(CACHE); return !!(await cache.match(baseOf(id)+'h5p.json')); }
async function remove(id){ const cache=await caches.open(CACHE), keys=await cache.keys(), base=baseOf(id);
  for(const k of keys) if(k.url.indexOf(base)===0) await cache.delete(k); }
async function ids(){ const cache=await caches.open(CACHE), keys=await cache.keys(), set=new Set();
  for(const k of keys){ const m=k.url.match(/h5pfiles\/([^/]+)\//); if(m) set.add(m[1]); }
  return [...set]; }
/* Inhalte aufräumen, die zu keinem Objekt mehr gehören */
async function keepOnly(used){ const all=await ids();
  for(const id of all) if(used.indexOf(id)<0) await remove(id); }
window.TafelH5P={install,has,remove,ids,keepOnly};
})();

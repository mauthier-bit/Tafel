/* Digitale Tafel – Werkzeug als Bild: auf die Tafel legen oder in die Zwischenablage kopieren.
   Zeichnet einen DOM-Bereich (Canvas, Hintergründe, Rahmen, Texte, Eingabefelder) in ein Canvas. */
(function(){
"use strict";
const inBoard=()=>window.parent!==window;
function toast(msg){ let el=document.getElementById('tshotToast');
  if(!el){ el=document.createElement('div'); el.id='tshotToast';
    el.style.cssText='position:fixed;left:50%;bottom:14px;transform:translateX(-50%);background:#1f2430;color:#fff;padding:7px 14px;border-radius:999px;font:600 13px -apple-system,BlinkMacSystemFont,sans-serif;z-index:9999;opacity:0;transition:opacity .2s;pointer-events:none;white-space:nowrap;';
    document.body.appendChild(el); }
  el.textContent=msg; el.style.opacity='.92'; clearTimeout(el._t); el._t=setTimeout(()=>{ el.style.opacity='0'; },1800); }
const transparent=c=>!c||c==='transparent'||/rgba\([^)]*,\s*0\)$/.test(c);
function rrect(g,x,y,w,h,r){ r=Math.max(0,Math.min(r,w/2,h/2)); g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
const fontOf=cs=>(cs.fontStyle||'normal')+' '+(cs.fontWeight||'400')+' '+cs.fontSize+' '+(cs.fontFamily||'sans-serif');
function hasOverline(el){ for(let k=0;el&&k<3;k++,el=el.parentElement){ const d=getComputedStyle(el).textDecorationLine||getComputedStyle(el).textDecoration||''; if(/overline/.test(d)) return true; } return false; }

function rasterize(root,opt){ opt=opt||{}; const S=opt.scale||2, pad=opt.pad||0;
  const rr=root.getBoundingClientRect(), W=Math.ceil(rr.width)+2*pad, H=Math.ceil(rr.height)+2*pad;
  const c=document.createElement('canvas'); c.width=W*S; c.height=H*S; const g=c.getContext('2d');
  g.scale(S,S); g.fillStyle='#fff'; g.fillRect(0,0,W,H); g.translate(pad-rr.left,pad-rr.top);
  const skip=el=>opt.exclude&&el.matches&&el.matches(opt.exclude);
  function drawText(tn){ const raw=tn.data; if(!raw||!raw.trim()) return; const pe=tn.parentElement; if(!pe) return; const cs=getComputedStyle(pe);
    const range=document.createRange(); range.selectNodeContents(tn); const rects=[...range.getClientRects()].filter(r=>r.width>0); if(!rects.length) return;
    g.font=fontOf(cs); g.fillStyle=cs.color; g.textBaseline='middle'; g.textAlign='left';
    const words=raw.replace(/\s+/g,' ').trim(), ov=hasOverline(pe);
    if(rects.length===1){ const r=rects[0]; g.fillText(words,r.left,r.top+r.height/2);
      if(ov){ g.fillRect(r.left,r.top+Math.max(1,r.height*0.08),g.measureText(words).width,Math.max(1,parseFloat(cs.fontSize)/14)); } return; }
    // umbrochener Text: Wörter nacheinander auf die Zeilen verteilen
    const parts=words.split(' '); let li=0, x=rects[0].left;
    for(const w of parts){ const ww=g.measureText(w+' ').width; while(li<rects.length-1&&x+g.measureText(w).width>rects[li].right+1){ li++; x=rects[li].left; }
      const r=rects[li]; g.fillText(w,x,r.top+r.height/2); x+=ww; } }
  function walk(el){ if(el.nodeType===3){ drawText(el); return; } if(el.nodeType!==1||skip(el)) return;
    const cs=getComputedStyle(el); if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)===0) return;
    const r=el.getBoundingClientRect();
    if(el.tagName==='IMG'){ try{ if(el.complete&&el.naturalWidth) g.drawImage(el,r.left,r.top,r.width,r.height); }catch(e){} return; }
    if(el.tagName==='CANVAS'){ try{ g.drawImage(el,r.left,r.top,r.width,r.height); }catch(e){} return; }
    if(el.tagName==='SVG'||el.tagName==='svg') return;
    const rad=parseFloat(cs.borderTopLeftRadius)||0;
    if(!transparent(cs.backgroundColor)){ g.fillStyle=cs.backgroundColor; rrect(g,r.left,r.top,r.width,r.height,rad); g.fill(); }
    const bw=['Top','Right','Bottom','Left'].map(sd=>({w:parseFloat(cs['border'+sd+'Width'])||0,c:cs['border'+sd+'Color'],s:cs['border'+sd+'Style']}));
    if(bw.every(b=>b.w>0&&b.s!=='none'&&b.c===bw[0].c&&b.w===bw[0].w)&&!transparent(bw[0].c)){ g.strokeStyle=bw[0].c; g.lineWidth=bw[0].w; rrect(g,r.left+bw[0].w/2,r.top+bw[0].w/2,r.width-bw[0].w,r.height-bw[0].w,rad); g.stroke(); }
    else bw.forEach((b,i)=>{ if(b.w<=0||b.s==='none'||transparent(b.c)) return; g.fillStyle=b.c;
      if(i===0) g.fillRect(r.left,r.top,r.width,b.w); if(i===2) g.fillRect(r.left,r.bottom-b.w,r.width,b.w);
      if(i===3) g.fillRect(r.left,r.top,b.w,r.height); if(i===1) g.fillRect(r.right-b.w,r.top,b.w,r.height); });
    if(el.tagName==='INPUT'||el.tagName==='TEXTAREA'||el.tagName==='SELECT'){
      if(el.type==='range'||el.type==='checkbox'||el.type==='color') return;
      const v=el.tagName==='SELECT'?((el.options[el.selectedIndex]||{}).text||''):el.value; if(!v) return;
      g.font=fontOf(cs); g.fillStyle=cs.color; g.textBaseline='middle'; const pl=parseFloat(cs.paddingLeft)||0, pr=parseFloat(cs.paddingRight)||0;
      const al=cs.textAlign; let x=r.left+pl+(parseFloat(cs.borderLeftWidth)||0); g.textAlign='left';
      if(al==='center'){ g.textAlign='center'; x=r.left+r.width/2; } else if(al==='right'||al==='end'){ g.textAlign='right'; x=r.right-pr-(parseFloat(cs.borderRightWidth)||0); }
      g.fillText(v,x,r.top+r.height/2); return; }
    el.childNodes.forEach(walk); }
  walk(root);
  return {canvas:c,w:W,h:H}; }

function toBoard(im){ if(!im) return; if(!inBoard()){ toast('Nur innerhalb der Tafel möglich'); return; }
  try{ parent.postMessage({type:'embed-image',url:im.canvas.toDataURL('image/png'),w:im.w,h:im.h},'*'); toast('Bild neben das Werkzeug gelegt'); }catch(e){ toast('Nicht möglich'); } }
function copy(im){ if(!im) return;
  try{ if(!navigator.clipboard||!window.ClipboardItem) throw new Error('x');
    const blob=new Promise(r=>im.canvas.toBlob(r,'image/png'));
    navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(()=>toast('Bild in die Zwischenablage kopiert'),()=>toast('Kopieren wurde vom Browser verhindert')); }
  catch(e){ toast('Kopieren wird hier nicht unterstützt'); } }
/* zwei Knöpfe anlegen; make() liefert {canvas,w,h} */
function buttons(container,make,cls,style){ const mk=(txt,title,fn)=>{ const b=document.createElement('button'); b.type='button'; b.textContent=txt; b.title=title; if(cls) b.className=cls; if(style) b.style.cssText=style;
    b.addEventListener('pointerdown',e=>e.preventDefault()); b.onclick=()=>{ let im=null; try{ im=make(); }catch(e){ toast('Bild konnte nicht erstellt werden'); } fn(im); }; container.appendChild(b); return b; };
  return [mk('🖼 Tafel','Als Bild neben das Werkzeug auf die Tafel legen',toBoard), mk('📋 Kopieren','Als Bild in die Zwischenablage kopieren',copy)]; }
window.TafelShot={rasterize,toBoard,copy,buttons,toast};
})();

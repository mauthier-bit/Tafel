/* Kartensätze des Memory-Spiels für das Zuordnen-Werkzeug der Tafel
   -----------------------------------------------------------------
   Übernommen aus dem Spiel „Memory – Mathematik & Physik" (memory.html der Spiele-Suite):
   die Kartensätze samt ihren Erzeugern, Zeichnungen und Rechenhilfen. Jeder Satz liefert
   über make(n) Paare {a,b}; a und b sind HTML (Text mit Potenzen, Brüchen …) oder fertiges SVG.

   Für die Tafel werden daraus Zuordnungspaare:
     Text ↔ Text   → b und e als einfacher Text (Potenzen als ⁿ, Brüche als a/b)
     Text ↔ Bild   → b als Text, das Bild als bild (SVG wird zur data-URL)
     Bild ↔ Bild   → paar() liefert beide Seiten als Bild
   Der Zufall läuft dabei über einen festen Startwert: Dieselbe Jahrgangsstufe liefert
   immer dieselben Paare – sonst würde ein geteilter Link die Aufgabe nicht wiederfinden.
*/
(function(){
"use strict";

/* =======================================================================
   1. Werkzeuge: Zufall, Zahlen, Brüche, Formatierung
   ======================================================================= */
const MINUS="−", MAL="·", RAD="√";
function ri(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ [a,b]=[b,a%b]; } return a||1; }
function kgv(a,b){ return Math.abs(a*b)/gcd(a,b); }
function F(n,d){ if(d<0){ n=-n; d=-d; } const g=gcd(n,d); return [n/g,d/g]; }
function terminates(n,d){ let r=F(n,d)[1]; while(r%2===0)r/=2; while(r%5===0)r/=5; return r===1; }
/* Zahl mit deutschem Komma, echtes Minuszeichen */
function z(v){
  let s=(Math.round(v*1e9)/1e9).toString();
  if(s.indexOf("e")>=0) s=Number(v).toFixed(6).replace(/0+$/,"").replace(/\.$/,"");
  return s.replace(".",",").replace("-",MINUS);
}
function zv(v){ return v<0 ? MINUS+z(-v) : z(v); }
/* Vorzeichenterm: " + 3" / " − 3" / "" bei 0 */
function sig(t){ if(Math.abs(t)<1e-12) return ""; return t>0 ? " + "+z(t) : " "+MINUS+" "+z(-t); }
function frac(n,d,cls){ return '<span class="frac '+(cls||"")+'"><span class="fn">'+n+'</span><span class="fd">'+d+'</span></span>'; }
function fracOf(f,cls){ return f[1]===1 ? (f[0]<0?MINUS+Math.abs(f[0]):""+f[0]) : (f[0]<0?MINUS:"")+frac(Math.abs(f[0]),f[1],cls); }
function dez(n,d){ return z(n/d); }
function wurzel(x){ return '<span class="sq">'+RAD+'<span class="rad">'+x+'</span></span>'; }
function pot(b,e){ return e===1 ? ""+b : b+"<sup>"+(e<0?MINUS+Math.abs(e):e)+"</sup>"; }
function tx(s,cls){ return '<div class="tx '+(cls||"")+'">'+s+'</div>'; }
/* Faktor vor einem Ausdruck */
function vorf(a,sep){ if(a===1) return ""; if(a===-1) return MINUS; return z(a)+(sep?MAL:""); }
function koefX(m,x){ x=x||"x"; if(m===1) return x; if(m===-1) return MINUS+x; return z(m)+x; }
function isQuad(n){ const r=Math.round(Math.sqrt(n)); return r*r===n ? r : 0; }

/* =======================================================================
   2. Bilder: Tortendiagramm, Punktmuster, Koordinatensystem, Graphen
   ======================================================================= */
function svg(inner,w,h){
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" '+
         'width="100%" height="100%" preserveAspectRatio="xMidYMid meet">'+inner+'</svg>';
}
/* --- Tortendiagramm (Bruno-Stil) --- */
function pie(shaded,total,size,cx,cy){
  size=size||100; cx=cx===undefined?size/2:cx; cy=cy===undefined?size/2:cy;
  const r=size/2-3; let s="";
  if(total<=1) return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#6c4bb6" stroke="#4a3382" stroke-width="2"/>';
  for(let i=0;i<total;i++){
    const a0=(i/total)*2*Math.PI-Math.PI/2, a1=((i+1)/total)*2*Math.PI-Math.PI/2;
    const x0=(cx+r*Math.cos(a0)).toFixed(2), y0=(cy+r*Math.sin(a0)).toFixed(2);
    const x1=(cx+r*Math.cos(a1)).toFixed(2), y1=(cy+r*Math.sin(a1)).toFixed(2);
    const big=(a1-a0)>Math.PI?1:0;
    s+='<path d="M '+cx+' '+cy+' L '+x0+' '+y0+' A '+r+' '+r+' 0 '+big+' 1 '+x1+' '+y1+' Z" fill="'+
       (i<shaded?"#6c4bb6":"#ffffff")+'" stroke="#4a3382" stroke-width="1.6"/>';
  }
  return s;
}
function pieCard(n,d){                       // auch unechte Brüche: mehrere Kreise
  if(n<=d) return svg(pie(n,d,100),100,100);
  const voll=Math.floor(n/d), rest=n-voll*d, k=voll+(rest>0?1:0);
  const s=Math.min(96,Math.floor(210/k)); let inner="", w=0;
  for(let i=0;i<voll;i++){ inner+='<g transform="translate('+w+',0)">'+pie(d,d,s)+'</g>'; w+=s+4; }
  if(rest>0){ inner+='<g transform="translate('+w+',0)">'+pie(rest,d,s)+'</g>'; w+=s+4; }
  return svg(inner,w-4,s);
}
/* --- Punktmuster für das Distributivgesetz --- */
function dots(rows,cols1,cols2){
  const r=7, g=20, pad=10, cols=cols1+cols2;
  const w=pad*2+(cols-1)*g+(cols2?14:0), h=pad*2+(rows-1)*g;
  let s="";
  for(let i=0;i<rows;i++) for(let j=0;j<cols;j++){
    const x=pad+j*g+(j>=cols1?14:0), y=pad+i*g;
    s+='<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(j<cols1?"#2f7d4f":"#e0a93e")+'"/>';
  }
  return svg(s,w,h);
}
/* --- Koordinatensystem mit einem Punkt --- */
function punktBild(px,py,lo,hi){
  const S=120, m=12, sp=(S-2*m)/(hi-lo);
  const X=v=>m+(v-lo)*sp, Y=v=>S-m-(v-lo)*sp;
  let s='<rect x="0" y="0" width="'+S+'" height="'+S+'" fill="#fff"/>';
  for(let v=lo;v<=hi;v++){
    s+='<line x1="'+X(v)+'" y1="'+Y(lo)+'" x2="'+X(v)+'" y2="'+Y(hi)+'" stroke="#e6e9ee" stroke-width="1"/>';
    s+='<line x1="'+X(lo)+'" y1="'+Y(v)+'" x2="'+X(hi)+'" y2="'+Y(v)+'" stroke="#e6e9ee" stroke-width="1"/>';
  }
  s+='<line x1="'+X(lo)+'" y1="'+Y(0)+'" x2="'+X(hi)+'" y2="'+Y(0)+'" stroke="#7d8694" stroke-width="1.6"/>';
  s+='<line x1="'+X(0)+'" y1="'+Y(lo)+'" x2="'+X(0)+'" y2="'+Y(hi)+'" stroke="#7d8694" stroke-width="1.6"/>';
  s+='<circle cx="'+X(px)+'" cy="'+Y(py)+'" r="5.5" fill="#c9513c" stroke="#fff" stroke-width="1.6"/>';
  return svg(s,S,S);
}

/* --- Funktionsgraphen (nach dem Vorbild von Fumino) --- */
const VIEW={X0:-5,X1:5,Y0:-5,Y1:5};
function plotSegs(f,sing,dom,view){
  const V=view||VIEW, N=320, step=(V.X1-V.X0)/N, eps=step*0.6, CLAMP=500;
  let iv=[[V.X0,V.X1]];
  if(dom){ iv=iv.map(([a,b])=>[Math.max(a,dom[0]),Math.min(b,dom[1])]).filter(([a,b])=>b-a>1e-9); }
  (sing||[]).forEach(sg=>{
    const next=[];
    iv.forEach(([a,b])=>{
      if(sg>a+eps && sg<b-eps){ next.push([a,sg-eps],[sg+eps,b]); }
      else if(sg<=a+eps && sg>=a-1){ next.push([Math.max(a,sg+eps),b]); }
      else if(sg>=b-eps && sg<=b+1){ next.push([a,Math.min(b,sg-eps)]); }
      else next.push([a,b]);
    });
    iv=next.filter(([a,b])=>b-a>1e-9);
  });
  const segs=[];
  iv.forEach(([a,b])=>{
    let cur=[]; const m=Math.max(2,Math.round((b-a)/step));
    for(let i=0;i<=m;i++){
      const x=a+(b-a)*(i/m); let y=f(x);
      if(!isFinite(y)){ if(cur.length>1) segs.push(cur); cur=[]; continue; }
      y=Math.max(-CLAMP,Math.min(CLAMP,y));
      cur.push([x,y]);
    }
    if(cur.length>1) segs.push(cur);
  });
  return segs;
}
function graph(f,opt){
  opt=opt||{};
  const V=opt.view||VIEW, S=130, m=9;
  const id="c"+Math.random().toString(36).slice(2,8);
  const X=x=>m+(x-V.X0)/(V.X1-V.X0)*(S-2*m), Y=y=>m+(V.Y1-y)/(V.Y1-V.Y0)*(S-2*m);
  let g="";
  const stepX=opt.gridX||1, stepY=opt.gridY||1;
  for(let v=Math.ceil(V.X0/stepX)*stepX; v<=V.X1+1e-9; v+=stepX)
    g+='<line x1="'+X(v).toFixed(1)+'" y1="'+Y(V.Y1)+'" x2="'+X(v).toFixed(1)+'" y2="'+Y(V.Y0)+'" stroke="#e7e9ef" stroke-width="1"/>';
  for(let v=Math.ceil(V.Y0/stepY)*stepY; v<=V.Y1+1e-9; v+=stepY)
    g+='<line x1="'+X(V.X0)+'" y1="'+Y(v).toFixed(1)+'" x2="'+X(V.X1)+'" y2="'+Y(v).toFixed(1)+'" stroke="#e7e9ef" stroke-width="1"/>';
  g+='<line x1="'+X(V.X0)+'" y1="'+Y(0).toFixed(1)+'" x2="'+X(V.X1)+'" y2="'+Y(0).toFixed(1)+'" stroke="#9aa1b4" stroke-width="1.5"/>';
  g+='<line x1="'+X(0).toFixed(1)+'" y1="'+Y(V.Y0)+'" x2="'+X(0).toFixed(1)+'" y2="'+Y(V.Y1)+'" stroke="#9aa1b4" stroke-width="1.5"/>';
  let p="";
  plotSegs(f,opt.sing,opt.dom,V).forEach(seg=>{
    let d=""; seg.forEach(([x,y],i)=>{ d+=(i?"L":"M")+X(x).toFixed(1)+" "+Y(y).toFixed(1)+" "; });
    p+='<path d="'+d.trim()+'" fill="none" stroke="'+(opt.color||"#2c5fd6")+'" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
  });
  let extra="";
  (opt.points||[]).forEach(pt=>{ extra+='<circle cx="'+X(pt[0]).toFixed(1)+'" cy="'+Y(pt[1]).toFixed(1)+'" r="3.6" fill="#c9513c" stroke="#fff" stroke-width="1.4"/>'; });
  const inner='<defs><clipPath id="'+id+'"><rect x="0" y="0" width="'+S+'" height="'+S+'"/></clipPath></defs>'+
    '<rect width="'+S+'" height="'+S+'" fill="#fff"/>'+
    '<g clip-path="url(#'+id+')">'+g+p+extra+'</g>';
  return svg(inner,S,S);
}

/* =======================================================================
   3. Zeichnungen: Geometrie, Körper, Physik
   ======================================================================= */
const STK='stroke="#243028" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"';
const FILL='fill="rgba(47,125,79,.15)"';
const THIN='stroke="#8c968f" stroke-width="1.4" fill="none"';
const MARK='stroke="#c9513c" stroke-width="3.2" fill="none" stroke-linecap="round"';
const ARC='stroke="#c9513c" stroke-width="2.2" fill="none"';
function fig(inner,w,h){ return svg('<rect width="'+(w||120)+'" height="'+(h||100)+'" fill="#fff"/>'+inner,w||120,h||100); }
function poly(pts,extra){ return '<polygon points="'+pts+'" '+FILL+' '+STK+' '+(extra||"")+'/>'; }
/* Winkelbogen bei Punkt B zwischen den Richtungen zu A und C */
function arcAt(bx,by,ax,ay,cx,cy,r,cls){
  const a1=Math.atan2(ay-by,ax-bx), a2=Math.atan2(cy-by,cx-bx);
  let d=a2-a1; while(d<=-Math.PI)d+=2*Math.PI; while(d>Math.PI)d-=2*Math.PI;
  const x1=bx+r*Math.cos(a1), y1=by+r*Math.sin(a1), x2=bx+r*Math.cos(a2), y2=by+r*Math.sin(a2);
  return '<path d="M '+x1.toFixed(1)+' '+y1.toFixed(1)+' A '+r+' '+r+' 0 0 '+(d>0?1:0)+' '+x2.toFixed(1)+' '+y2.toFixed(1)+'" '+(cls||ARC)+'/>';
}
/* Striche quer über eine Strecke (Markierung gleicher Längen) */
function ticks(x1,y1,x2,y2,n){
  const mx=(x1+x2)/2, my=(y1+y2)/2, dx=x2-x1, dy=y2-y1;
  const L=Math.hypot(dx,dy), ux=dx/L, uy=dy/L, px=-uy, py=ux, s=5;
  let out="";
  for(let i=0;i<n;i++){
    const o=(i-(n-1)/2)*4, cx=mx+ux*o, cy=my+uy*o;
    out+='<line x1="'+(cx-px*s).toFixed(1)+'" y1="'+(cy-py*s).toFixed(1)+'" x2="'+(cx+px*s).toFixed(1)+'" y2="'+(cy+py*s).toFixed(1)+'" '+MARK+'/>';
  }
  return out;
}
const FIG={
  /* --- Vierecke --- */
  quadrat:()=>fig(poly("30,15 90,15 90,75 30,75")+ticks(30,15,90,15,1)+ticks(90,15,90,75,1)+ticks(30,75,90,75,1)+ticks(30,15,30,75,1)+
    '<path d="M38,15 L38,23 L30,23" '+THIN+'/>'),
  rechteck:()=>fig(poly("16,22 104,22 104,74 16,74")+ticks(16,22,104,22,1)+ticks(16,74,104,74,1)+ticks(104,22,104,74,2)+ticks(16,22,16,74,2)+
    '<path d="M24,22 L24,30 L16,30" '+THIN+'/>'),
  parallelogramm:()=>fig(poly("16,72 74,72 104,26 46,26")+ticks(16,72,74,72,1)+ticks(46,26,104,26,1)+ticks(74,72,104,26,2)+ticks(16,72,46,26,2)),
  raute:()=>fig(poly("60,14 104,50 60,86 16,50")+ticks(60,14,104,50,1)+ticks(104,50,60,86,1)+ticks(60,86,16,50,1)+ticks(16,50,60,14,1)),
  drachen:()=>fig(poly("60,10 100,46 60,90 20,46")+ticks(60,10,100,46,1)+ticks(60,10,20,46,1)+ticks(100,46,60,90,2)+ticks(20,46,60,90,2)+
    '<line x1="60" y1="10" x2="60" y2="90" '+THIN+' stroke-dasharray="4 3"/>'),
  trapez:()=>fig(poly("12,74 108,74 86,26 40,26")+
    '<line x1="40" y1="26" x2="86" y2="26" stroke="#2f7d4f" stroke-width="3" fill="none"/>'+
    '<line x1="12" y1="74" x2="108" y2="74" stroke="#2f7d4f" stroke-width="3" fill="none"/>'),
  trapezGl:()=>fig(poly("16,74 104,74 84,26 36,26")+ticks(16,74,36,26,1)+ticks(104,74,84,26,1)+
    '<line x1="60" y1="18" x2="60" y2="82" '+THIN+' stroke-dasharray="4 3"/>'),
  /* --- Winkel --- */
  winkel:(deg,label)=>{
    const bx=26,by=78,L=76, a=-deg*Math.PI/180;
    const ex=bx+L*Math.cos(a), ey=by+L*Math.sin(a);
    return fig('<line x1="'+bx+'" y1="'+by+'" x2="'+(bx+L)+'" y2="'+by+'" '+STK+'/>'+
      '<line x1="'+bx+'" y1="'+by+'" x2="'+ex.toFixed(1)+'" y2="'+ey.toFixed(1)+'" '+STK+'/>'+
      arcAt(bx,by,bx+L,by,ex,ey,24)+
      (label?'<text x="'+(bx+34)+'" y="'+(by-14)+'" font-size="13" fill="#c9513c" font-weight="700">'+label+'</text>':""));
  },
  winkelUeber:()=>{
    const bx=60,by=58,L=42, a=-300*Math.PI/180;
    const ex=bx+L*Math.cos(a), ey=by+L*Math.sin(a);
    return fig('<line x1="'+bx+'" y1="'+by+'" x2="'+(bx+L)+'" y2="'+by+'" '+STK+'/>'+
      '<line x1="'+bx+'" y1="'+by+'" x2="'+ex.toFixed(1)+'" y2="'+ey.toFixed(1)+'" '+STK+'/>'+
      arcAt(bx,by,bx+L,by,ex,ey,22)+
      '<text x="'+(bx-30)+'" y="'+(by+6)+'" font-size="13" fill="#c9513c" font-weight="700">300°</text>');
  },
  /* --- Winkelpaare an Geradenkreuzungen --- */
  winkelpaar:(art)=>{
    const g1='<line x1="8" y1="70" x2="112" y2="30" '+STK+'/>';
    const kreuz='<line x1="30" y1="8" x2="80" y2="92" '+STK+'/>';
    let m="";
    if(art==="scheitel") m='<circle cx="46" cy="40" r="9" fill="rgba(201,81,60,.35)"/><circle cx="64" cy="60" r="9" fill="rgba(201,81,60,.35)"/>';
    if(art==="neben")    m='<circle cx="46" cy="40" r="9" fill="rgba(201,81,60,.35)"/><circle cx="68" cy="43" r="9" fill="rgba(224,169,62,.5)"/>';
    if(art==="stufen")   m='<circle cx="40" cy="30" r="9" fill="rgba(201,81,60,.35)"/><circle cx="66" cy="68" r="9" fill="rgba(201,81,60,.35)"/>';
    if(art==="wechsel")  m='<circle cx="62" cy="33" r="9" fill="rgba(201,81,60,.35)"/><circle cx="44" cy="66" r="9" fill="rgba(201,81,60,.35)"/>';
    if(art==="stufen"||art==="wechsel")
      return fig('<line x1="6" y1="34" x2="114" y2="34" '+STK+'/><line x1="6" y1="72" x2="114" y2="72" '+STK+'/>'+
                 '<line x1="28" y1="6" x2="80" y2="96" '+STK+'/>'+m);
    return fig(g1+kreuz+m);
  },
  /* --- Dreiecke & Sätze --- */
  dreieck:(art)=>{
    if(art==="gleichschenklig") return fig(poly("60,14 100,80 20,80")+ticks(60,14,100,80,1)+ticks(60,14,20,80,1));
    if(art==="gleichseitig")    return fig(poly("60,16 98,82 22,82")+ticks(60,16,98,82,1)+ticks(98,82,22,82,1)+ticks(22,82,60,16,1));
    if(art==="rechtwinklig")    return fig(poly("22,80 102,80 22,20")+'<path d="M22,70 L32,70 L32,80" '+THIN+'/>');
    if(art==="stumpfwinklig")   return fig(poly("14,78 106,78 44,34")+arcAt(44,34,14,78,106,78,16));
    return "";
  },
  mittelsenkrechte:()=>fig('<line x1="18" y1="70" x2="102" y2="70" '+STK+'/>'+ticks(18,70,60,70,1)+ticks(60,70,102,70,1)+
    '<line x1="60" y1="16" x2="60" y2="92" stroke="#c9513c" stroke-width="2.6"/>'+
    '<path d="M52,70 L52,62 L60,62" '+THIN+'/>'+
    '<circle cx="18" cy="70" r="3" fill="#243028"/><circle cx="102" cy="70" r="3" fill="#243028"/>'),
  winkelhalbierende:()=>fig('<line x1="20" y1="82" x2="108" y2="82" '+STK+'/><line x1="20" y1="82" x2="92" y2="20" '+STK+'/>'+
    '<line x1="20" y1="82" x2="104" y2="48" stroke="#c9513c" stroke-width="2.6"/>'+
    arcAt(20,82,108,82,104,48,26)+arcAt(20,82,104,48,92,20,26)),
  umkreis:()=>fig('<circle cx="60" cy="52" r="38" '+ARC+'/>'+poly("60,14 93,72 27,72")+'<circle cx="60" cy="52" r="2.6" fill="#c9513c"/>'),
  inkreis:()=>fig(poly("60,12 100,82 20,82")+'<circle cx="60" cy="58" r="21" '+ARC+'/><circle cx="60" cy="58" r="2.6" fill="#c9513c"/>'),
  thales:()=>fig('<path d="M 18 66 A 42 42 0 0 1 102 66" '+ARC+'/>'+
    '<line x1="18" y1="66" x2="102" y2="66" '+STK+'/><line x1="18" y1="66" x2="78" y2="36" '+STK+'/><line x1="102" y1="66" x2="78" y2="36" '+STK+'/>'+
    '<path d="M73,28 L81,31 L78,39" '+THIN+'/><circle cx="60" cy="66" r="2.6" fill="#c9513c"/>'),
  /* --- Kongruenzsätze: markiert ist, was gegeben ist --- */
  kong:(art)=>{
    const P="24,82 104,82 58,22", A=[24,82], B=[104,82], C=[58,22];
    let m="";
    if(art==="SSS") m=ticks(24,82,104,82,1)+ticks(104,82,58,22,2)+ticks(58,22,24,82,3);
    if(art==="SWS") m=ticks(24,82,104,82,1)+ticks(24,82,58,22,2)+arcAt(A[0],A[1],B[0],B[1],C[0],C[1],22);
    if(art==="WSW") m=ticks(24,82,104,82,1)+arcAt(A[0],A[1],B[0],B[1],C[0],C[1],22)+arcAt(B[0],B[1],C[0],C[1],A[0],A[1],22);
    if(art==="SsW") m=ticks(104,82,58,22,1)+ticks(24,82,58,22,3)+arcAt(A[0],A[1],B[0],B[1],C[0],C[1],22);
    return fig(poly(P)+m);
  },
  /* --- Körper (Schrägbilder) --- */
  koerper:(art)=>{
    const dx=22, dy=-14;
    if(art==="wuerfel"||art==="quader"){
      const w=art==="wuerfel"?52:74, h=52, x=18, y=80;
      return fig('<polygon points="'+x+','+y+' '+(x+w)+','+y+' '+(x+w)+','+(y-h)+' '+x+','+(y-h)+'" '+FILL+' '+STK+'/>'+
        '<polygon points="'+x+','+(y-h)+' '+(x+dx)+','+(y-h+dy)+' '+(x+w+dx)+','+(y-h+dy)+' '+(x+w)+','+(y-h)+'" '+FILL+' '+STK+'/>'+
        '<polygon points="'+(x+w)+','+y+' '+(x+w+dx)+','+(y+dy)+' '+(x+w+dx)+','+(y-h+dy)+' '+(x+w)+','+(y-h)+'" '+FILL+' '+STK+'/>');
    }
    if(art==="prisma") return fig('<polygon points="20,80 70,80 45,40" '+FILL+' '+STK+'/>'+
      '<polygon points="42,74 92,74 67,34" '+FILL+' '+STK+'/>'+
      '<line x1="20" y1="80" x2="42" y2="74" '+STK+'/><line x1="70" y1="80" x2="92" y2="74" '+STK+'/><line x1="45" y1="40" x2="67" y2="34" '+STK+'/>');
    if(art==="zylinder") return fig('<ellipse cx="60" cy="26" rx="30" ry="10" '+FILL+' '+STK+'/>'+
      '<path d="M30,26 L30,76" '+STK+'/><path d="M90,26 L90,76" '+STK+'/>'+
      '<path d="M30,76 A 30 10 0 0 0 90 76" '+STK+'/><path d="M30,76 A 30 10 0 0 1 90 76" '+THIN+' stroke-dasharray="4 3"/>');
    if(art==="pyramide") return fig('<polygon points="20,76 76,76 60,20" '+FILL+' '+STK+'/>'+
      '<polygon points="76,76 98,66 60,20" '+FILL+' '+STK+'/>'+
      '<path d="M20,76 L42,66 L98,66" '+THIN+' stroke-dasharray="4 3"/><path d="M42,66 L60,20" '+THIN+' stroke-dasharray="4 3"/>');
    if(art==="kegel") return fig('<path d="M30,74 L60,18 L90,74" '+FILL+' '+STK+'/>'+
      '<ellipse cx="60" cy="74" rx="30" ry="10" '+FILL+' '+STK+'/>');
    if(art==="kugel") return fig('<circle cx="60" cy="50" r="34" '+FILL+' '+STK+'/>'+
      '<ellipse cx="60" cy="50" rx="34" ry="11" '+THIN+' stroke-dasharray="4 3"/>');
    return "";
  },
  /* --- Physik: Schaltzeichen --- */
  schalt:(art)=>{
    const L='stroke="#243028" stroke-width="2.6" fill="none" stroke-linecap="round"';
    const wire='<line x1="6" y1="50" x2="38" y2="50" '+L+'/><line x1="82" y1="50" x2="114" y2="50" '+L+'/>';
    if(art==="lampe")      return fig(wire+'<circle cx="60" cy="50" r="20" '+L+'/><line x1="46" y1="36" x2="74" y2="64" '+L+'/><line x1="74" y1="36" x2="46" y2="64" '+L+'/>');
    if(art==="widerstand") return fig(wire+'<rect x="38" y="38" width="44" height="24" '+L+'/>');
    if(art==="schalter")   return fig('<line x1="6" y1="50" x2="40" y2="50" '+L+'/><line x1="80" y1="50" x2="114" y2="50" '+L+'/>'+
      '<line x1="40" y1="50" x2="76" y2="30" '+L+'/><circle cx="40" cy="50" r="3.4" fill="#243028"/><circle cx="80" cy="50" r="3.4" fill="#243028"/>');
    if(art==="quelle")     return fig('<line x1="6" y1="50" x2="52" y2="50" '+L+'/><line x1="68" y1="50" x2="114" y2="50" '+L+'/>'+
      '<line x1="52" y1="28" x2="52" y2="72" '+L+'/><line x1="68" y1="38" x2="68" y2="62" stroke="#243028" stroke-width="5"/>');
    if(art==="voltmeter")  return fig(wire+'<circle cx="60" cy="50" r="20" '+L+'/><text x="60" y="57" text-anchor="middle" font-size="19" font-weight="700" fill="#243028">V</text>');
    if(art==="ampere")     return fig(wire+'<circle cx="60" cy="50" r="20" '+L+'/><text x="60" y="57" text-anchor="middle" font-size="19" font-weight="700" fill="#243028">A</text>');
    if(art==="motor")      return fig(wire+'<circle cx="60" cy="50" r="20" '+L+'/><text x="60" y="57" text-anchor="middle" font-size="18" font-weight="700" fill="#243028">M</text>');
    if(art==="led")        return fig(wire+'<polygon points="44,34 44,66 76,50" '+L+'/><line x1="76" y1="32" x2="76" y2="68" '+L+'/>'+
      '<line x1="80" y1="30" x2="94" y2="18" '+L+'/><line x1="88" y1="32" x2="100" y2="22" '+L+'/>');
    if(art==="diode")      return fig(wire+'<polygon points="44,34 44,66 76,50" '+L+'/><line x1="76" y1="32" x2="76" y2="68" '+L+'/>');
    if(art==="kondensator")return fig('<line x1="6" y1="50" x2="52" y2="50" '+L+'/><line x1="68" y1="50" x2="114" y2="50" '+L+'/>'+
      '<line x1="52" y1="30" x2="52" y2="70" stroke="#243028" stroke-width="4"/><line x1="68" y1="30" x2="68" y2="70" stroke="#243028" stroke-width="4"/>');
    if(art==="spule")      return fig('<line x1="6" y1="50" x2="30" y2="50" '+L+'/><line x1="90" y1="50" x2="114" y2="50" '+L+'/>'+
      '<path d="M30,50 a9,9 0 0 1 15,0 a9,9 0 0 1 15,0 a9,9 0 0 1 15,0 a9,9 0 0 1 15,0" '+L+'/>');
    if(art==="sicherung")  return fig(wire+'<rect x="38" y="40" width="44" height="20" '+L+'/><line x1="38" y1="50" x2="82" y2="50" '+L+'/>');
    return "";
  },
  /* --- Physik: Optik --- */
  optik:(art)=>{
    const L='stroke="#243028" stroke-width="2.4" fill="none" stroke-linecap="round"';
    const R='stroke="#e0a93e" stroke-width="2.6" fill="none" stroke-linecap="round"';
    if(art==="reflexion") return fig('<line x1="10" y1="76" x2="110" y2="76" '+L+'/>'+
      '<line x1="60" y1="76" x2="60" y2="14" stroke="#8c968f" stroke-width="1.4" stroke-dasharray="4 3"/>'+
      '<line x1="18" y1="22" x2="60" y2="76" '+R+'/><line x1="60" y1="76" x2="102" y2="22" '+R+'/>'+
      arcAt(60,76,60,14,18,22,22)+arcAt(60,76,102,22,60,14,22)+
      '<path d="M48,66 l-4,-6 l8,-2" fill="none" stroke="#e0a93e" stroke-width="2"/>');
    if(art==="brechung") return fig('<rect x="0" y="52" width="120" height="48" fill="rgba(90,160,236,.18)"/>'+
      '<line x1="0" y1="52" x2="120" y2="52" '+L+'/>'+
      '<line x1="60" y1="8" x2="60" y2="96" stroke="#8c968f" stroke-width="1.4" stroke-dasharray="4 3"/>'+
      '<line x1="18" y1="10" x2="60" y2="52" '+R+'/><line x1="60" y1="52" x2="84" y2="96" '+R+'/>');
    if(art==="sammellinse") return fig('<ellipse cx="60" cy="50" rx="11" ry="34" fill="rgba(90,160,236,.25)" '+L+'/>'+
      '<line x1="4" y1="50" x2="116" y2="50" stroke="#8c968f" stroke-width="1.2" stroke-dasharray="4 3"/>'+
      '<line x1="6" y1="26" x2="60" y2="26" '+R+'/><line x1="60" y1="26" x2="112" y2="66" '+R+'/>'+
      '<line x1="6" y1="74" x2="60" y2="74" '+R+'/><line x1="60" y1="74" x2="112" y2="34" '+R+'/>'+
      '<circle cx="96" cy="50" r="3.2" fill="#c9513c"/>');
    if(art==="zerstreuung") return fig('<path d="M54,16 q10,34 0,68 l12,0 q-10,-34 0,-68 z" fill="rgba(90,160,236,.25)" '+L+'/>'+
      '<line x1="4" y1="50" x2="116" y2="50" stroke="#8c968f" stroke-width="1.2" stroke-dasharray="4 3"/>'+
      '<line x1="6" y1="30" x2="56" y2="30" '+R+'/><line x1="62" y1="30" x2="112" y2="14" '+R+'/>'+
      '<line x1="6" y1="70" x2="56" y2="70" '+R+'/><line x1="62" y1="70" x2="112" y2="86" '+R+'/>');
    if(art==="schatten") return fig('<circle cx="16" cy="50" r="8" fill="#e0a93e"/>'+
      '<rect x="46" y="26" width="9" height="48" fill="#243028"/>'+
      '<rect x="92" y="10" width="26" height="80" fill="#f2f3f5" stroke="#8c968f" stroke-width="1.2"/>'+
      '<rect x="92" y="28" width="26" height="44" fill="#243028" opacity=".8"/>'+
      '<line x1="16" y1="50" x2="92" y2="20" stroke="#e0a93e" stroke-width="1.6" stroke-dasharray="3 3"/>'+
      '<line x1="16" y1="50" x2="92" y2="80" stroke="#e0a93e" stroke-width="1.6" stroke-dasharray="3 3"/>');
    if(art==="totalreflexion") return fig('<rect x="0" y="0" width="120" height="52" fill="rgba(90,160,236,.18)"/>'+
      '<line x1="0" y1="52" x2="120" y2="52" '+L+'/>'+
      '<line x1="60" y1="8" x2="60" y2="96" stroke="#8c968f" stroke-width="1.4" stroke-dasharray="4 3"/>'+
      '<line x1="12" y1="16" x2="60" y2="52" '+R+'/><line x1="60" y1="52" x2="108" y2="16" '+R+'/>');
    return "";
  },
  /* --- Physik: Magnetismus & Elektromagnetismus --- */
  magnet:(art)=>{
    const L='stroke="#243028" stroke-width="2.4" fill="none"';
    if(art==="stabmagnet") return fig('<rect x="26" y="40" width="34" height="22" fill="#c9513c"/><rect x="60" y="40" width="34" height="22" fill="#3c6fc9"/>'+
      '<text x="43" y="56" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">N</text>'+
      '<text x="77" y="56" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">S</text>'+
      '<path d="M26,40 C10,10 110,10 94,40" '+THIN+'/><path d="M26,62 C10,92 110,92 94,62" '+THIN+'/>');
    if(art==="spulenfeld") return fig('<rect x="34" y="34" width="52" height="32" '+L+'/>'+
      '<path d="M34,34 l-10,0 M86,66 l10,0" '+L+'/>'+
      '<path d="M18,50 L102,50" stroke="#3c6fc9" stroke-width="2" marker-end=""/>'+
      '<path d="M22,30 C50,6 70,6 98,30" stroke="#3c6fc9" stroke-width="1.6" fill="none"/>'+
      '<path d="M22,70 C50,94 70,94 98,70" stroke="#3c6fc9" stroke-width="1.6" fill="none"/>');
    if(art==="lorentz") return fig('<rect x="14" y="14" width="92" height="72" fill="rgba(60,111,201,.1)" stroke="#8c968f" stroke-width="1.2"/>'+
      '<g fill="#3c6fc9">'+[0,1,2].map(i=>[0,1,2].map(j=>'<circle cx="'+(30+j*30)+'" cy="'+(30+i*22)+'" r="2.4"/>').join("")).join("")+'</g>'+
      '<line x1="20" y1="52" x2="100" y2="52" stroke="#243028" stroke-width="3"/>'+
      '<line x1="60" y1="52" x2="60" y2="18" stroke="#c9513c" stroke-width="3"/>'+
      '<path d="M54,26 L60,16 L66,26" fill="none" stroke="#c9513c" stroke-width="3"/>');
    if(art==="trafo") return fig('<rect x="52" y="18" width="16" height="64" fill="#d9d4c6" stroke="#243028" stroke-width="2"/>'+
      '<path d="M30,28 a8,8 0 0 1 0,16 a8,8 0 0 1 0,16 a8,8 0 0 1 0,16" '+L+'/>'+
      '<path d="M90,28 a8,8 0 0 0 0,16 a8,8 0 0 0 0,16 a8,8 0 0 0 0,16" '+L+'/>'+
      '<line x1="14" y1="28" x2="30" y2="28" '+L+'/><line x1="14" y1="76" x2="30" y2="76" '+L+'/>'+
      '<line x1="90" y1="28" x2="106" y2="28" '+L+'/><line x1="90" y1="76" x2="106" y2="76" '+L+'/>');
    return "";
  }
};

/* =======================================================================
   4. Kartenbibliothek
   Jeder Satz liefert make(n) -> [{key, a, b, info}]
   key = der zugrunde liegende Wert; zwei Paare dürfen nie denselben key haben,
   sonst gäbe es im Spiel zwei richtige Lösungen.
   ======================================================================= */
const SETS=[];
function S(def){ SETS.push(def); }
function build(n,gen,tries){
  const out=[], seen=new Set(); let t=0;
  while(out.length<n && t<(tries||6000)){
    t++; const c=gen();
    if(!c || seen.has(c.key)) continue;
    seen.add(c.key); out.push(c);
  }
  return out;
}
function liste(items){ return (n)=>shuffle(items).slice(0,n); }
function bildPaar(name,bild,info){ return {key:name, a:tx(name), b:bild, info:info||name}; }

/* ---------------------------------------------------------------- Klasse 5 */
S({fach:"Mathematik", stufe:5, gebiet:"Zahlen", titel:"Potenz und Produkt",
  kurz:"2⁵ gehört zu 2·2·2·2·2", a:"Potenz", b:"Produkt", max:18,
  make:(n)=>build(n,()=>{
    const b=ri(2,7), e=ri(2,5);
    if(Math.pow(b,e)>20000) return null;
    const f=[]; for(let i=0;i<e;i++) f.push(b);
    return {key:b+"^"+e, a:tx(pot(b,e),"lg"), b:tx(f.join(MAL)), info:pot(b,e)+" = "+f.join(MAL)+" = "+z(Math.pow(b,e))};
  })});

S({fach:"Mathematik", stufe:5, gebiet:"Zahlen", titel:"Zehnerpotenzen und große Zahlen",
  kurz:"3 · 10⁴ gehört zu 30 000", a:"Zehnerpotenz", b:"Zahl", max:16,
  make:(n)=>build(n,()=>{
    const f=ri(1,9), e=ri(2,6), v=f*Math.pow(10,e);
    const txt=String(v).replace(/\B(?=(\d{3})+(?!\d))/g," ");
    return {key:"z"+v, a:tx((f===1?"":f+MAL)+pot(10,e),"lg"), b:tx(txt), info:(f===1?"":f+MAL)+pot(10,e)+" = "+txt};
  })});

S({fach:"Mathematik", stufe:5, gebiet:"Zahlen", titel:"Primfaktorzerlegung",
  kurz:"72 gehört zu 2³ · 3²", a:"Zahl", b:"Primfaktoren", max:20,
  make:(n)=>build(n,()=>{
    const v=ri(12,300); let r=v, out=[], cnt={};
    for(let p=2;p*p<=r;p++){ while(r%p===0){ cnt[p]=(cnt[p]||0)+1; r/=p; } }
    if(r>1) cnt[r]=(cnt[r]||0)+1;
    const ks=Object.keys(cnt).map(Number).sort((x,y)=>x-y);
    if(ks.length<2 && (cnt[ks[0]]||0)<3) return null;
    if(ks.some(k=>k>19)) return null;
    out=ks.map(k=>pot(k,cnt[k]));
    return {key:"p"+v, a:tx(""+v,"lg"), b:tx(out.join(" "+MAL+" ")), info:v+" = "+out.join(" "+MAL+" ")};
  })});

S({fach:"Mathematik", stufe:5, gebiet:"Zahlen", titel:"Rechnen mit ganzen Zahlen",
  kurz:"(−7) + 12 gehört zu 5", a:"Term", b:"Wert", max:20,
  make:(n)=>build(n,()=>{
    const art=ri(1,3); let t,v;
    if(art===1){ const a=ri(-15,15), b=ri(-15,15); if(!a||!b) return null; v=a+b;
      t=(a<0?"("+MINUS+Math.abs(a)+")":a)+" + "+(b<0?"("+MINUS+Math.abs(b)+")":b); }
    else if(art===2){ const a=ri(-15,15), b=ri(-15,15); if(!a||!b) return null; v=a-b;
      t=(a<0?"("+MINUS+Math.abs(a)+")":a)+" "+MINUS+" "+(b<0?"("+MINUS+Math.abs(b)+")":b); }
    else { const a=ri(-9,9), b=ri(-9,9); if(Math.abs(a)<2||Math.abs(b)<2) return null; v=a*b;
      t=(a<0?"("+MINUS+Math.abs(a)+")":a)+" "+MAL+" "+(b<0?"("+MINUS+Math.abs(b)+")":b); }
    if(v===0) return null;
    return {key:"g"+v, a:tx(t), b:tx(zv(v),"lg"), info:t+" = "+zv(v)};
  })});

const LAENGE=[["km",1000],["m",1],["dm",0.1],["cm",0.01],["mm",0.001]];
const MASSE=[["t",1000],["kg",1],["g",0.001],["mg",0.000001]];
const ZEIT=[["h",3600],["min",60],["s",1]];
S({fach:"Mathematik", stufe:5, gebiet:"Größen", titel:"Größen umrechnen",
  kurz:"2,5 km gehört zu 2500 m", a:"Größe", b:"gleiche Größe", max:20,
  make:(n)=>build(n,()=>{
    const dim=pick(["l","m","t"]);
    const tab = dim==="l"?LAENGE : dim==="m"?MASSE : ZEIT;
    const i=ri(0,tab.length-2), j=ri(i+1,tab.length-1);
    if(tab[i][1]/tab[j][1]>10000) return null;
    const w = dim==="t" ? pick([0.5,1,1.5,2,2.5,3,4]) : pick([1,1.5,2,2.5,3,4,5,7.5,12,25,0.5,0.25]);
    const basis=w*tab[i][1], w2=basis/tab[j][1];
    if(w2>100000 || w2<1 || Math.abs(w2-Math.round(w2))>1e-9) return null;
    const A=z(w)+" "+tab[i][0], B=z(w2)+" "+tab[j][0];
    return {key:dim+":"+basis, a:tx(A,"lg"), b:tx(B,"lg"), info:A+" = "+B};
  })});

S({fach:"Mathematik", stufe:5, gebiet:"Größen", titel:"Flächen- und Raummaße",
  kurz:"1 m² gehört zu 10 000 cm²", a:"Größe", b:"gleiche Größe", max:14,
  make:liste([
    ["1 m²","10 000 cm²"],["1 km²","1 000 000 m²"],["1 ha","10 000 m²"],["1 a","100 m²"],
    ["1 dm²","100 cm²"],["1 cm²","100 mm²"],["3 m²","30 000 cm²"],["5 ha","50 000 m²"],
    ["1 m³","1000 dm³"],["1 dm³","1 l"],["0,5 l","500 ml"],["1 cm³","1 ml"],
    ["2 m³","2000 l"],["1 hl","100 l"]
  ].map(p=>({key:"fl"+p[0], a:tx(p[0],"lg"), b:tx(p[1],"lg"), info:p[0]+" = "+p[1]})))});

S({fach:"Mathematik", stufe:5, gebiet:"Geometrie", titel:"Figuren und Winkel erkennen",
  kurz:"Name und Zeichnung – Vierecke, Dreiecke, Winkelarten", a:"Begriff", b:"Zeichnung", max:16,
  make:liste([
    bildPaar("Quadrat",FIG.quadrat(),"Quadrat: vier gleich lange Seiten, vier rechte Winkel"),
    bildPaar("Rechteck",FIG.rechteck(),"Rechteck: vier rechte Winkel"),
    bildPaar("Parallelogramm",FIG.parallelogramm(),"Parallelogramm: gegenüberliegende Seiten parallel und gleich lang"),
    bildPaar("Raute",FIG.raute(),"Raute: vier gleich lange Seiten"),
    bildPaar("Drachenviereck",FIG.drachen(),"Drachen: zwei Paare benachbarter gleich langer Seiten"),
    bildPaar("Trapez",FIG.trapez(),"Trapez: mindestens zwei parallele Seiten"),
    bildPaar("gleichschenkliges Trapez",FIG.trapezGl(),"gleichschenkliges Trapez: achsensymmetrisch"),
    bildPaar("gleichschenkliges Dreieck",FIG.dreieck("gleichschenklig"),"zwei gleich lange Schenkel"),
    bildPaar("gleichseitiges Dreieck",FIG.dreieck("gleichseitig"),"drei gleich lange Seiten, alle Winkel 60°"),
    bildPaar("rechtwinkliges Dreieck",FIG.dreieck("rechtwinklig"),"ein Winkel misst 90°"),
    bildPaar("stumpfwinkliges Dreieck",FIG.dreieck("stumpfwinklig"),"ein Winkel ist größer als 90°"),
    bildPaar("spitzer Winkel",FIG.winkel(42,"42°"),"spitzer Winkel: kleiner als 90°"),
    bildPaar("rechter Winkel",FIG.winkel(90,"90°"),"rechter Winkel: genau 90°"),
    bildPaar("stumpfer Winkel",FIG.winkel(128,"128°"),"stumpfer Winkel: zwischen 90° und 180°"),
    bildPaar("gestreckter Winkel",FIG.winkel(180,"180°"),"gestreckter Winkel: genau 180°"),
    bildPaar("überstumpfer Winkel",FIG.winkelUeber(),"überstumpfer Winkel: zwischen 180° und 360°")
  ])});

S({fach:"Mathematik", stufe:5, gebiet:"Geometrie", titel:"Punkte im Koordinatensystem",
  kurz:"P(3|2) gehört zum eingezeichneten Punkt", a:"Koordinaten", b:"Zeichnung", max:20,
  make:(n)=>build(n,()=>{
    const x=ri(-4,5), y=ri(-4,5);
    if(x===0&&y===0) return null;
    return {key:x+"|"+y, a:tx("P ("+zv(x)+" | "+zv(y)+")","lg"), b:punktBild(x,y,-5,6),
      info:"P ("+zv(x)+" | "+zv(y)+"): erst "+zv(x)+" nach rechts, dann "+zv(y)+" nach oben"};
  })});

/* ---------------------------------------------------------------- Klasse 6 */
const BR=[[1,2],[1,3],[2,3],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,6],[5,6],[1,8],[3,8],[5,8],[7,8],[1,10],[3,10],[7,10],[9,10],[1,12],[5,12],[7,12],[2,9],[4,9],[1,20],[3,20]];
S({fach:"Mathematik", stufe:6, gebiet:"Brüche", titel:"Brüche kürzen und erweitern",
  kurz:"3/4 gehört zu 9/12", a:"Bruch", b:"gleichwertiger Bruch", max:22,
  make:(n)=>build(n,()=>{
    const [p,q]=pick(BR), k=ri(2,6);
    return {key:p+"/"+q, a:tx(frac(p,q),"lg"), b:tx(frac(p*k,q*k),"lg"),
      info:p+"/"+q+" = "+(p*k)+"/"+(q*k)+"  (mit "+k+" erweitert)"};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Brüche", titel:"Brüche als Bild",
  kurz:"3/4 gehört zum gefärbten Kreis", a:"Bruch", b:"Anteil", max:18,
  make:(n)=>build(n,()=>{
    const [p,q]=pick(BR.filter(([a,b])=>b<=12));
    const k=(q<=6 && Math.random()<0.4)?2:1;
    return {key:p+"/"+q, a:tx(frac(p,q),"lg"), b:pieCard(p*k,q*k),
      info:frac(p,q)+" des Kreises sind gefärbt"};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Brüche", titel:"Bruch und Dezimalzahl",
  kurz:"3/8 gehört zu 0,375", a:"Bruch", b:"Dezimalzahl", max:16,
  make:(n)=>build(n,()=>{
    const [p,q]=pick(BR.filter(([a,b])=>terminates(a,b)));
    const k=Math.random()<0.3?2:1;
    return {key:p+"/"+q, a:tx(frac(p*k,q*k),"lg"), b:tx(z(p/q),"lg"), info:(p*k)+"/"+(q*k)+" = "+z(p/q)};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Prozent", titel:"Bruch, Dezimalzahl und Prozent",
  kurz:"1/4 gehört zu 25 %", a:"Bruch oder Dezimalzahl", b:"Prozent", max:13,
  make:(n)=>build(n,()=>{
    const [p,q]=pick(BR.filter(([a,b])=>terminates(a,b) && (a*100)%b===0));
    const pr=p/q*100;
    const alsDez=Math.random()<0.4;
    return {key:p+"/"+q, a:tx(alsDez?z(p/q):frac(p,q),"lg"), b:tx(z(pr)+" %","lg"),
      info:frac(p,q)+" = "+z(p/q)+" = "+z(pr)+" %"};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Brüche", titel:"Brüche addieren und subtrahieren",
  kurz:"1/2 + 1/3 gehört zu 5/6", a:"Aufgabe", b:"Ergebnis", max:20,
  make:(n)=>build(n,()=>{
    const [a,b]=pick(BR), [c,d]=pick(BR);
    const plus=Math.random()<0.6;
    const r=F(plus? a*d+c*b : a*d-c*b, b*d);
    if(r[0]<=0 || r[1]>24 || r[0]/r[1]>3) return null;
    if(b===d && !plus) return null;
    return {key:"s"+r[0]+"/"+r[1], a:tx(frac(a,b)+(plus?" + ":" "+MINUS+" ")+frac(c,d)), b:tx(fracOf(r),"lg"),
      info:a+"/"+b+(plus?" + ":" − ")+c+"/"+d+" = "+r[0]+"/"+r[1]};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Brüche", titel:"Brüche multiplizieren und dividieren",
  kurz:"3/4 · 2/5 gehört zu 3/10", a:"Aufgabe", b:"Ergebnis", max:20,
  make:(n)=>build(n,()=>{
    const [a,b]=pick(BR), [c,d]=pick(BR);
    const mal=Math.random()<0.6;
    const r=F(mal? a*c : a*d, mal? b*d : b*c);
    if(r[1]>40 || r[0]/r[1]>6) return null;
    return {key:"m"+r[0]+"/"+r[1], a:tx(frac(a,b)+" "+(mal?MAL:":")+" "+frac(c,d)), b:tx(fracOf(r),"lg"),
      info:a+"/"+b+(mal?" · ":" : ")+c+"/"+d+" = "+r[0]+"/"+r[1]};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Prozent", titel:"Prozent im Kopf",
  kurz:"20 % von 80 gehört zu 16", a:"Aufgabe", b:"Prozentwert", max:18,
  make:(n)=>build(n,()=>{
    const p=pick([5,10,20,25,30,40,50,60,75,80]), g=pick([20,40,50,60,80,120,200,240,300,400,500]);
    const v=g*p/100;
    if(Math.abs(v-Math.round(v))>1e-9 || v<2) return null;
    return {key:"pr"+v, a:tx(z(p)+" % von "+z(g)), b:tx(z(v),"lg"), info:z(p)+" % von "+z(g)+" = "+z(v)};
  })});

S({fach:"Mathematik", stufe:6, gebiet:"Geometrie", titel:"Flächen- und Volumenformeln",
  kurz:"Formel und passende Figur", a:"Formel", b:"Figur", max:8,
  make:liste([
    {key:"quadrat", a:tx("A = a · a","lg"), b:FIG.quadrat(), info:"Quadrat: A = a · a = a²"},
    {key:"rechteck", a:tx("A = a · b","lg"), b:FIG.rechteck(), info:"Rechteck: A = a · b"},
    {key:"parallelogramm", a:tx("A = g · h","lg"), b:FIG.parallelogramm(), info:"Parallelogramm: A = Grundseite · Höhe"},
    {key:"dreieck", a:tx("A = "+frac("g · h","2"),"lg"), b:FIG.dreieck("stumpfwinklig"), info:"Dreieck: A = (g · h) : 2"},
    {key:"trapez", a:tx("A = "+frac("(a + c) · h","2"),"lg"), b:FIG.trapez(), info:"Trapez: A = ((a + c) · h) : 2"},
    {key:"raute", a:tx("A = "+frac("e · f","2"),"lg"), b:FIG.raute(), info:"Raute: A = (e · f) : 2 (Diagonalen)"},
    {key:"quader", a:tx("V = a · b · c","lg"), b:FIG.koerper("quader"), info:"Quader: V = a · b · c"},
    {key:"wuerfel", a:tx("O = 6 · a²","lg"), b:FIG.koerper("wuerfel"), info:"Würfel: O = 6 · a²"}
  ])});

S({fach:"Mathematik", stufe:6, gebiet:"Zahlen", titel:"Potenzen mit negativen Exponenten",
  kurz:"10⁻³ gehört zu 0,001", a:"Potenz", b:"Wert", max:14,
  make:(n)=>build(n,()=>{
    const b=pick([2,3,4,5,10]), e=ri(1,4);
    const v=Math.pow(b,-e);
    if(v<0.0001) return null;
    const w = terminates(1,Math.pow(b,e)) ? z(v) : frac(1,pot(b,e));
    return {key:"ne"+v, a:tx(pot(b,-e),"lg"), b:tx(w,"lg"), info:pot(b,-e)+" = 1 : "+Math.pow(b,e)};
  })});

/* ---------------------------------------------------------------- Klasse 7 */
const VAR=["x","a","y","z","n","t"];
S({fach:"Mathematik", stufe:7, gebiet:"Terme", titel:"Terme zusammenfassen",
  kurz:"3a + 4a gehört zu 7a", a:"Term", b:"zusammengefasst", max:20,
  make:(n)=>build(n,()=>{
    const v=pick(VAR), art=ri(1,3);
    if(art===1){ const p=ri(2,9), q=ri(2,9), s=p+q;
      return {key:"t"+v+s, a:tx(koefX(p,v)+" + "+koefX(q,v)), b:tx(koefX(s,v),"lg"), info:koefX(p,v)+" + "+koefX(q,v)+" = "+koefX(s,v)}; }
    if(art===2){ const p=ri(5,14), q=ri(2,p-1), s=p-q;
      if(s<2) return null;
      return {key:"t"+v+s, a:tx(koefX(p,v)+" "+MINUS+" "+koefX(q,v)), b:tx(koefX(s,v),"lg"), info:koefX(p,v)+" − "+koefX(q,v)+" = "+koefX(s,v)}; }
    const w=pick(VAR.filter(x=>x!==v)), p=ri(2,6), q=ri(2,6), r=ri(2,6);
    const t=p+r;
    return {key:"tt"+v+w+t+"_"+q, a:tx(koefX(p,v)+" + "+koefX(q,w)+" + "+koefX(r,v)),
      b:tx(koefX(t,v)+" + "+koefX(q,w),"lg"), info:koefX(p,v)+" + "+koefX(q,w)+" + "+koefX(r,v)+" = "+koefX(t,v)+" + "+koefX(q,w)};
  })});

S({fach:"Mathematik", stufe:7, gebiet:"Terme", titel:"Ausmultiplizieren und Ausklammern",
  kurz:"3 · (x + 4) gehört zu 3x + 12", a:"mit Klammer", b:"ausmultipliziert", max:20,
  make:(n)=>build(n,()=>{
    const a=ri(2,9), b=ri(1,9), v=pick(["x","a","y"]), minus=Math.random()<0.4;
    const c=minus?-b:b, p=a*c;
    return {key:"d"+v+a+"_"+p, a:tx(a+MAL+"("+v+(minus?" "+MINUS+" ":" + ")+b+")"),
      b:tx(koefX(a,v)+(p<0?" "+MINUS+" "+Math.abs(p):" + "+p),"lg"),
      info:a+"·("+v+(minus?" − ":" + ")+b+") = "+a+v+(p<0?" − "+Math.abs(p):" + "+p)};
  })});

S({fach:"Mathematik", stufe:7, gebiet:"Terme", titel:"Binomische Formeln",
  kurz:"(x + 5)² gehört zu x² + 10x + 25", a:"Klammer", b:"ausmultipliziert", max:18,
  make:(n)=>build(n,()=>{
    const a=ri(1,9), art=ri(1,3), v="x";
    if(art===1) return {key:"b1_"+a, a:tx("("+v+" + "+a+")<sup>2</sup>","lg"),
      b:tx(v+"<sup>2</sup> + "+(2*a)+v+" + "+(a*a)), info:"(x + "+a+")² = x² + "+(2*a)+"x + "+(a*a)};
    if(art===2) return {key:"b2_"+a, a:tx("("+v+" "+MINUS+" "+a+")<sup>2</sup>","lg"),
      b:tx(v+"<sup>2</sup> "+MINUS+" "+(2*a)+v+" + "+(a*a)), info:"(x − "+a+")² = x² − "+(2*a)+"x + "+(a*a)};
    return {key:"b3_"+a, a:tx("("+v+" + "+a+")("+v+" "+MINUS+" "+a+")"),
      b:tx(v+"<sup>2</sup> "+MINUS+" "+(a*a),"lg"), info:"(x + "+a+")(x − "+a+") = x² − "+(a*a)};
  })});

S({fach:"Mathematik", stufe:7, gebiet:"Terme", titel:"Potenzen zusammenfassen",
  kurz:"a³ · a⁴ gehört zu a⁷", a:"Produkt", b:"Potenz", max:16,
  make:(n)=>build(n,()=>{
    const v=pick(["a","x","b","y"]), p=ri(1,5), q=ri(1,5);
    if(p+q<3) return null;
    const k=ri(1,3), vz = k>1 ? k+"" : "";
    return {key:"po"+v+(p+q)+"_"+k, a:tx((k>1?k+MAL:"")+pot(v,p)+" "+MAL+" "+pot(v,q)),
      b:tx((k>1?k:"")+pot(v,p+q),"lg"), info:pot(v,p)+" · "+pot(v,q)+" = "+pot(v,p+q)};
  })});

S({fach:"Mathematik", stufe:7, gebiet:"Gleichungen", titel:"Lineare Gleichungen lösen",
  kurz:"3x + 5 = 20 gehört zu x = 5", a:"Gleichung", b:"Lösung", max:18,
  make:(n)=>build(n,()=>{
    const x=ri(-9,12); if(x===0) return null;
    const a=ri(2,8), b=ri(-12,12), art=ri(1,2);
    if(art===1){ const r=a*x+b;
      return {key:"gl"+x, a:tx(koefX(a)+sig(b)+" = "+zv(r)), b:tx("x = "+zv(x),"lg"), info:a+"x"+sig(b)+" = "+zv(r)+"  ⇒  x = "+zv(x)}; }
    const c=ri(1,a-1)||1, d=b+ (a-c)*x;
    return {key:"gl"+x, a:tx(koefX(a)+sig(b)+" = "+koefX(c)+sig(d)), b:tx("x = "+zv(x),"lg"),
      info:a+"x"+sig(b)+" = "+c+"x"+sig(d)+"  ⇒  x = "+zv(x)};
  })});

S({fach:"Mathematik", stufe:7, gebiet:"Geometrie", titel:"Winkel, Dreiecke und Konstruktionen",
  kurz:"Begriff und Zeichnung – auch die Kongruenzsätze", a:"Begriff", b:"Zeichnung", max:17,
  make:liste([
    bildPaar("Scheitelwinkel",FIG.winkelpaar("scheitel"),"Scheitelwinkel liegen sich gegenüber und sind gleich groß"),
    bildPaar("Nebenwinkel",FIG.winkelpaar("neben"),"Nebenwinkel ergänzen sich zu 180°"),
    bildPaar("Stufenwinkel",FIG.winkelpaar("stufen"),"Stufenwinkel an Parallelen sind gleich groß"),
    bildPaar("Wechselwinkel",FIG.winkelpaar("wechsel"),"Wechselwinkel an Parallelen sind gleich groß"),
    bildPaar("Mittelsenkrechte",FIG.mittelsenkrechte(),"Mittelsenkrechte: senkrecht durch den Mittelpunkt der Strecke"),
    bildPaar("Winkelhalbierende",FIG.winkelhalbierende(),"Winkelhalbierende teilt den Winkel in zwei gleiche Teile"),
    bildPaar("Umkreis",FIG.umkreis(),"Umkreis: Mittelpunkt ist Schnittpunkt der Mittelsenkrechten"),
    bildPaar("Inkreis",FIG.inkreis(),"Inkreis: Mittelpunkt ist Schnittpunkt der Winkelhalbierenden"),
    bildPaar("Satz des Thales",FIG.thales(),"Satz des Thales: Winkel im Halbkreis ist 90°"),
    bildPaar("gleichschenkliges Dreieck",FIG.dreieck("gleichschenklig"),"zwei gleich lange Schenkel, zwei gleiche Basiswinkel"),
    bildPaar("gleichseitiges Dreieck",FIG.dreieck("gleichseitig"),"drei gleiche Seiten, alle Winkel 60°"),
    bildPaar("rechtwinkliges Dreieck",FIG.dreieck("rechtwinklig"),"ein Winkel misst 90°"),
    bildPaar("stumpfwinkliges Dreieck",FIG.dreieck("stumpfwinklig"),"ein Winkel ist größer als 90°"),
    {key:"SSS", a:tx("Kongruenzsatz SSS","sm"), b:FIG.kong("SSS"), info:"SSS: drei Seiten sind gegeben"},
    {key:"SWS", a:tx("Kongruenzsatz SWS","sm"), b:FIG.kong("SWS"), info:"SWS: zwei Seiten und der eingeschlossene Winkel"},
    {key:"WSW", a:tx("Kongruenzsatz WSW","sm"), b:FIG.kong("WSW"), info:"WSW: eine Seite und die beiden anliegenden Winkel"},
    {key:"SsW", a:tx("Kongruenzsatz SsW","sm"), b:FIG.kong("SsW"), info:"SsW: zwei Seiten und der Winkel gegenüber der längeren Seite"}
  ])});

/* ---------------------------------------------------------------- Klasse 8 */
S({fach:"Mathematik", stufe:8, gebiet:"Funktionen", titel:"Lineare Funktionen: Term und Graph",
  kurz:"y = 2x − 1 gehört zur passenden Geraden", a:"Funktionsterm", b:"Graph", max:20,
  make:(n)=>build(n,()=>{
    const m=pick([-3,-2,-1.5,-1,-0.5,0.5,1,1.5,2,3]), t=ri(-4,4);
    return {key:"lin"+m+"_"+t, a:tx("y = "+koefX(m)+sig(t)), b:graph(x=>m*x+t),
      info:"y = "+koefX(m)+sig(t)+": Steigung "+z(m)+", y-Achsenabschnitt "+z(t)};
  })});

S({fach:"Mathematik", stufe:8, gebiet:"Funktionen", titel:"Lineare Funktionen: Gerade und Eigenschaft",
  kurz:"Steigung und Nullstelle ablesen", a:"Funktionsterm", b:"Eigenschaft", max:18,
  make:(n)=>build(n,()=>{
    const m=pick([-3,-2,-1,-0.5,0.5,1,2,3]), t=pick([-6,-4,-3,-2,2,3,4,6]);
    const ns=-t/m;
    if(Math.abs(ns-Math.round(ns))>1e-9) return null;
    return {key:"lne"+m+"_"+t, a:tx("y = "+koefX(m)+sig(t)),
      b:tx("Steigung "+z(m)+"<br>Nullstelle bei x = "+zv(ns),"sm"),
      info:"y = "+koefX(m)+sig(t)+": Nullstelle "+zv(ns)+", Steigung "+z(m)};
  })});

S({fach:"Mathematik", stufe:8, gebiet:"Funktionen", titel:"Gebrochen-rationale Funktionen",
  kurz:"Term und Graph mit Asymptoten", a:"Funktionsterm", b:"Graph", max:16,
  make:(n)=>build(n,()=>{
    const a=pick([-4,-3,-2,-1,1,2,3,4]), b=ri(-2,2), c=ri(-2,2);
    return {key:"hyp"+a+"_"+b+"_"+c, a:tx("y = "+frac(z(a),"x"+(b?(b>0?" + "+b:" "+MINUS+" "+(-b)):""))+sig(c)),
      b:graph(x=>a/(x+b)+c,{sing:[-b]}),
      info:"Polstelle bei x = "+zv(-b)+", waagrechte Asymptote y = "+zv(c)};
  })});

S({fach:"Mathematik", stufe:8, gebiet:"Terme", titel:"Bruchterme kürzen",
  kurz:"(x+2)(x+3) / (x+2) gehört zu x + 3", a:"Bruchterm", b:"gekürzt", max:18,
  make:(n)=>build(n,()=>{
    const art=ri(1,3);
    if(art===1){ const A=ri(1,9), B=ri(1,9); if(A===B) return null;
      const sA=pick([1,-1]), sB=pick([1,-1]);
      const fa="(x"+(sA<0?" "+MINUS+" ":" + ")+A+")", fb="(x"+(sB<0?" "+MINUS+" ":" + ")+B+")";
      return {key:"bt:x"+(sB*B), a:tx(frac(fa+fb,fa)), b:tx("x"+(sB<0?" "+MINUS+" ":" + ")+B,"lg"),
        info:fa+" kürzt sich weg, es bleibt x"+(sB<0?" − ":" + ")+B}; }
    if(art===2){ const k=ri(2,9), v=pick(["x","a"]), e=ri(1,3);
      return {key:"bt:"+k+v+e, a:tx(frac(z(k*2)+pot(v,e+1),"2"+v)), b:tx(z(k)+pot(v,e),"lg"),
        info:(2*k)+v+"<sup>"+(e+1)+"</sup> : (2"+v+") = "+k+(e>1?v+"<sup>"+e+"</sup>":v)}; }
    const a=ri(2,9);
    return {key:"bt:x"+(-a), a:tx(frac("x<sup>2</sup> "+MINUS+" "+(a*a),"x + "+a)), b:tx("x "+MINUS+" "+a,"lg"),
      info:"x² − "+(a*a)+" = (x + "+a+")(x − "+a+"), kürzen ergibt x − "+a};
  })});

S({fach:"Mathematik", stufe:8, gebiet:"Terme", titel:"Potenzgesetze",
  kurz:"x⁵ · x⁻² gehört zu x³", a:"Term", b:"vereinfacht", max:18,
  make:(n)=>build(n,()=>{
    const v=pick(["x","a","y"]), art=ri(1,3);
    if(art===1){ const p=ri(2,7), q=ri(-3,-1), r=p+q; if(r===0||r===1) return null;
      return {key:"pg"+v+"^"+r, a:tx(pot(v,p)+" "+MAL+" "+pot(v,q)), b:tx(pot(v,r),"lg"), info:v+"^"+p+" · "+v+"^"+q+" = "+v+"^"+r}; }
    if(art===2){ const p=ri(4,9), q=ri(1,3), r=p-q; if(r<2) return null;
      return {key:"pg"+v+"^"+r, a:tx(frac(pot(v,p),pot(v,q))), b:tx(pot(v,r),"lg"), info:v+"^"+p+" : "+v+"^"+q+" = "+v+"^"+r}; }
    const p=ri(2,4), q=ri(2,3), r=p*q;
    return {key:"pg"+v+"^"+r, a:tx("("+pot(v,p)+")<sup>"+q+"</sup>"), b:tx(pot(v,r),"lg"), info:"("+v+"^"+p+")^"+q+" = "+v+"^"+r};
  })});

S({fach:"Mathematik", stufe:8, gebiet:"Gleichungen", titel:"Lineare Gleichungssysteme",
  kurz:"System und Lösungspaar", a:"Gleichungssystem", b:"Lösung", max:16,
  make:(n)=>build(n,()=>{
    const x=ri(-5,6), y=ri(-5,6);
    const a=ri(1,4), b=ri(1,4), c=ri(1,4), d=ri(-4,4);
    if(d===0 || a*d-b*c===0) return null;
    const e=a*x+b*y, f=c*x+d*y;
    return {key:"lgs"+x+"|"+y,
      a:tx(koefX(a)+" + "+koefX(b,"y")+" = "+zv(e)+"<br>"+koefX(c)+(d<0?" "+MINUS+" "+koefX(-d,"y"):" + "+koefX(d,"y"))+" = "+zv(f),"sm"),
      b:tx("x = "+zv(x)+"<br>y = "+zv(y),"lg"), info:"Lösung: x = "+zv(x)+", y = "+zv(y)};
  })});

S({fach:"Mathematik", stufe:8, gebiet:"Stochastik", titel:"Laplace-Wahrscheinlichkeiten",
  kurz:"Ereignis und Wahrscheinlichkeit", a:"Ereignis", b:"Wahrscheinlichkeit", max:13,
  make:liste([
    {key:"w16",  a:tx("Würfel: eine Sechs","sm"),                        b:tx(frac(1,6),"lg"),  info:"1 von 6 Ergebnissen"},
    {key:"w12",  a:tx("Würfel: eine gerade Zahl","sm"),                  b:tx(frac(1,2),"lg"),  info:"3 von 6 Ergebnissen"},
    {key:"w13",  a:tx("Würfel: Zahl kleiner als 3","sm"),                b:tx(frac(1,3),"lg"),  info:"2 von 6 Ergebnissen"},
    {key:"w56",  a:tx("Würfel: keine Sechs","sm"),                       b:tx(frac(5,6),"lg"),  info:"Gegenereignis zu „eine Sechs“"},
    {key:"w23",  a:tx("Würfel: Zahl größer als 2","sm"),                 b:tx(frac(2,3),"lg"),  info:"4 von 6 Ergebnissen"},
    {key:"w136", a:tx("Zwei Würfel: Augensumme 12","sm"),                b:tx(frac(1,36),"lg"), info:"nur 6 + 6 von 36 Möglichkeiten"},
    {key:"w118", a:tx("Zwei Würfel: Augensumme 11","sm"),                b:tx(frac(1,18),"lg"), info:"5 + 6 und 6 + 5, also 2 von 36"},
    {key:"w14",  a:tx("Münze: zweimal Wappen","sm"),                     b:tx(frac(1,4),"lg"),  info:"1 von 4 Möglichkeiten"},
    {key:"w18",  a:tx("Münze: dreimal Wappen","sm"),                     b:tx(frac(1,8),"lg"),  info:"1 von 8 Möglichkeiten"},
    {key:"w132", a:tx("Skatblatt: genau das Herz-Ass","sm"),             b:tx(frac(1,32),"lg"), info:"1 von 32 Karten"},
    {key:"w15",  a:tx("Glücksrad mit 5 gleichen Feldern: ein Feld","sm"),b:tx(frac(1,5),"lg"),  info:"1 von 5 Feldern"},
    {key:"w310", a:tx("Urne: 3 rote und 7 blaue Kugeln – rot","sm"),     b:tx(frac(3,10),"lg"), info:"3 von 10 Kugeln"},
    {key:"w25",  a:tx("Urne: 4 rote und 6 blaue Kugeln – rot","sm"),     b:tx(frac(2,5),"lg"),  info:"4 von 10 Kugeln = 2/5"}
  ])});

S({fach:"Mathematik", stufe:8, gebiet:"Geometrie", titel:"Kreis, Prisma und Zylinder",
  kurz:"Formel und Körper bzw. Bedeutung", a:"Formel", b:"wofür?", max:8,
  make:liste([
    {key:"ku", a:tx("u = 2 · π · r","lg"), b:tx("Umfang des Kreises","sm"), info:"Kreisumfang u = 2πr"},
    {key:"ka", a:tx("A = π · r²","lg"), b:tx("Flächeninhalt des Kreises","sm"), info:"Kreisfläche A = πr²"},
    {key:"zv", a:tx("V = π · r² · h","lg"), b:FIG.koerper("zylinder"), info:"Zylindervolumen V = πr²h"},
    {key:"zm", a:tx("M = 2 · π · r · h","lg"), b:tx("Mantelfläche des Zylinders","sm"), info:"Die Mantelfläche ist ein Rechteck mit dem Kreisumfang als Breite"},
    {key:"pv", a:tx("V = G · h","lg"), b:FIG.koerper("prisma"), info:"Prismenvolumen V = Grundfläche · Höhe"},
    {key:"po", a:tx("O = 2 · G + M","lg"), b:tx("Oberfläche eines Prismas","sm"), info:"zwei Grundflächen plus Mantel"},
    {key:"bo", a:tx("b = "+frac("α","360°")+" · 2πr","lg"), b:tx("Länge eines Kreisbogens","sm"), info:"Anteil am ganzen Umfang"},
    {key:"se", a:tx("A = "+frac("α","360°")+" · πr²","lg"), b:tx("Flächeninhalt eines Kreissektors","sm"), info:"Anteil an der ganzen Kreisfläche"}
  ])});

/* ---------------------------------------------------------------- Klasse 9 */
S({fach:"Mathematik", stufe:9, gebiet:"Zahlen", titel:"Wurzelterme vereinfachen",
  kurz:"√72 gehört zu 6√2", a:"Wurzel", b:"teilweise radiziert", max:16,
  make:(n)=>build(n,()=>{
    const c=ri(2,9), r=pick([2,3,5,6,7,10,11]);
    const v=c*c*r;
    if(v>900) return null;
    return {key:"w"+c+"_"+r, a:tx(wurzel(v),"lg"), b:tx(c+wurzel(r),"lg"),
      info:RAD+v+" = "+RAD+"("+(c*c)+MAL+r+") = "+c+RAD+r};
  })});

S({fach:"Mathematik", stufe:9, gebiet:"Funktionen", titel:"Parabeln: Scheitelform und Graph",
  kurz:"y = (x − 2)² − 3 gehört zur passenden Parabel", a:"Funktionsterm", b:"Graph", max:18,
  make:(n)=>build(n,()=>{
    const a=pick([-2,-1,-0.5,0.5,1,2]), d=ri(-3,3), e=ri(-4,3);
    const basis = d===0 ? "x<sup>2</sup>" : "(x"+(d>0?" "+MINUS+" "+d:" + "+(-d))+")<sup>2</sup>";
    return {key:"sp"+a+"_"+d+"_"+e, a:tx("y = "+vorf(a,false)+basis+sig(e)),
      b:graph(x=>a*(x-d)*(x-d)+e), info:"Scheitel S("+zv(d)+" | "+zv(e)+"), Faktor a = "+z(a)};
  })});

S({fach:"Mathematik", stufe:9, gebiet:"Funktionen", titel:"Scheitelform und Normalform",
  kurz:"(x − 3)² − 4 gehört zu x² − 6x + 5", a:"Scheitelform", b:"Normalform", max:18,
  make:(n)=>build(n,()=>{
    const a=pick([-2,-1,1,2]), d=ri(-4,4), e=ri(-6,6);
    const b=-2*a*d, c=a*d*d+e;
    if(b===0) return null;
    const basis = d===0 ? "x<sup>2</sup>" : "(x"+(d>0?" "+MINUS+" "+d:" + "+(-d))+")<sup>2</sup>";
    const nf = vorf(a,false)+"x<sup>2</sup>"+(b>0?" + ":" "+MINUS+" ")+(Math.abs(b)===1?"":z(Math.abs(b)))+"x"+sig(c);
    return {key:"sn"+a+"_"+b+"_"+c, a:tx("y = "+vorf(a,false)+basis+sig(e)), b:tx("y = "+nf),
      info:"Scheitel S("+zv(d)+" | "+zv(e)+")"};
  })});

S({fach:"Mathematik", stufe:9, gebiet:"Gleichungen", titel:"Quadratische Gleichungen lösen",
  kurz:"x² − 5x + 6 = 0 gehört zu L = {2; 3}", a:"Gleichung", b:"Lösungsmenge", max:18,
  make:(n)=>build(n,()=>{
    let x1=ri(-6,6), x2=ri(-6,6);
    if(x1>x2){ const t=x1; x1=x2; x2=t; }
    if(x1===x2) return null;
    const p=-(x1+x2), q=x1*x2;
    const t="x<sup>2</sup>"+(p?((p>0?" + ":" "+MINUS+" ")+(Math.abs(p)===1?"":Math.abs(p))+"x"):"")+sig(q)+" = 0";
    return {key:"qg"+x1+"|"+x2, a:tx(t), b:tx("L = { "+zv(x1)+" ; "+zv(x2)+" }","lg"),
      info:"(x"+(x1<0?" + "+(-x1):" "+MINUS+" "+x1)+")(x"+(x2<0?" + "+(-x2):" "+MINUS+" "+x2)+") = 0"};
  })});

const TRIP=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25],[12,16,20],[20,21,29],[9,40,41],[10,24,26],[15,20,25],[18,24,30],[12,35,37],[16,30,34]];
function pythBild(a,b,c,frage){
  const lab=(t)=>'font-size="13" font-weight="700" fill="#243028"';
  return fig('<polygon points="22,82 102,82 22,26" '+FILL+' '+STK+'/>'+
    '<path d="M22,72 L32,72 L32,82" '+THIN+'/>'+
    '<text x="62" y="96" text-anchor="middle" '+lab()+'>'+(frage==="a"?"?":a)+'</text>'+
    '<text x="12" y="56" text-anchor="middle" '+lab()+'>'+(frage==="b"?"?":b)+'</text>'+
    '<text x="72" y="48" text-anchor="middle" '+lab()+'>'+(frage==="c"?"?":c)+'</text>',120,100);
}
S({fach:"Mathematik", stufe:9, gebiet:"Geometrie", titel:"Satz des Pythagoras",
  kurz:"Rechtwinkliges Dreieck und fehlende Seite", a:"Dreieck", b:"fehlende Seite", max:16,
  make:(n)=>build(n,()=>{
    const [a,b,c]=pick(TRIP), frage=pick(["a","b","c"]);
    const wert = frage==="a"?a : frage==="b"?b : c;
    return {key:"py"+frage+wert, a:pythBild(a,b,c,frage), b:tx(frage+" = "+wert,"lg"),
      info:frage==="c" ? "c = √("+a+"² + "+b+"²) = "+c : (frage+" = √("+c+"² − "+(frage==="a"?b:a)+"²) = "+wert)};
  })});

S({fach:"Mathematik", stufe:9, gebiet:"Geometrie", titel:"Trigonometrie: Formeln und Werte",
  kurz:"sin α, Sinussatz und die wichtigen Werte", a:"Begriff", b:"Formel oder Wert", max:11,
  make:liste([
    {key:"sin", a:tx("sin α","lg"), b:tx(frac("Gegenkathete","Hypotenuse"),"sm"), info:"Sinus = Gegenkathete : Hypotenuse"},
    {key:"cos", a:tx("cos α","lg"), b:tx(frac("Ankathete","Hypotenuse"),"sm"), info:"Kosinus = Ankathete : Hypotenuse"},
    {key:"tan", a:tx("tan α","lg"), b:tx(frac("Gegenkathete","Ankathete"),"sm"), info:"Tangens = Gegenkathete : Ankathete"},
    {key:"sinsatz", a:tx("Sinussatz","sm"), b:tx(frac("a","sin α")+" = "+frac("b","sin β"),"sm"), info:"im beliebigen Dreieck"},
    {key:"cossatz", a:tx("Kosinussatz","sm"), b:tx("a² = b² + c² "+MINUS+" 2bc"+MAL+"cos α","sm"), info:"Verallgemeinerung des Satzes von Pythagoras"},
    {key:"komp", a:tx("cos α = ?","sm"), b:tx("sin (90° "+MINUS+" α)","sm"), info:"cos α = sin(90° − α)"},
    {key:"t30", a:tx("sin 30°","lg"), b:tx("0,5","lg"), info:"sin 30° = 0,5"},
    {key:"t45", a:tx("cos 45°","lg"), b:tx(frac(1,2)+wurzel(2),"lg"), info:"cos 45° = ½√2 ≈ 0,71"},
    {key:"t60", a:tx("sin 60°","lg"), b:tx(frac(1,2)+wurzel(3),"lg"), info:"sin 60° = ½√3 ≈ 0,87"},
    {key:"tt45", a:tx("tan 45°","lg"), b:tx("1","lg"), info:"tan 45° = 1"},
    {key:"tt60", a:tx("tan 60°","lg"), b:tx(wurzel(3),"lg"), info:"tan 60° = √3 ≈ 1,73"}
  ])});

S({fach:"Mathematik", stufe:9, gebiet:"Funktionen", titel:"Potenzfunktionen: Term und Graph",
  kurz:"y = 2x³ gehört zum passenden Graphen", a:"Funktionsterm", b:"Graph", max:14,
  make:(n)=>build(n,()=>{
    const a=pick([-2,-1,-0.5,0.5,1,2]), e=pick([2,3,4,5,-1,-2]);
    return {key:"pf"+a+"_"+e, a:tx("y = "+vorf(a,false)+pot("x",e)),
      b:graph(x=>a*Math.pow(x,e),{sing:e<0?[0]:[]}),
      info:"y = "+vorf(a,false)+"x^"+e+(e<0?" – Hyperbel-Typ":(e%2===0?" – gerade Potenz, achsensymmetrisch":" – ungerade Potenz, punktsymmetrisch"))};
  })});

/* --------------------------------------------------------------- Klasse 10 */
const VEXP={X0:-3,X1:3,Y0:-1,Y1:9};
S({fach:"Mathematik", stufe:10, gebiet:"Funktionen", titel:"Exponentialfunktionen: Term und Graph",
  kurz:"y = 2 · 3ˣ gehört zum passenden Graphen", a:"Funktionsterm", b:"Graph", max:14,
  make:(n)=>build(n,()=>{
    const b=pick([2,3,4,0.5,0.25,1.5]), a=pick([1,2,3,0.5]);
    return {key:"ex"+a+"_"+b, a:tx("y = "+(a===1?"":z(a)+MAL)+z(b)+"<sup>x</sup>","lg"),
      b:graph(x=>a*Math.pow(b,x),{view:VEXP,gridY:1}),
      info:(b>1?"Wachstum":"Abnahme")+" mit Faktor "+z(b)+", Startwert "+z(a)};
  })});

S({fach:"Mathematik", stufe:10, gebiet:"Funktionen", titel:"Logarithmus: Term und Wert",
  kurz:"lg 1000 gehört zu 3", a:"Logarithmus", b:"Wert", max:8,
  make:(n)=>build(n,()=>{
    const b=pick([10,2,3,5]), e=pick([-2,-1,1,2,3,4,5,6]);
    const v=Math.pow(b,e);
    if(v>100000 || v<0.005) return null;
    const name = b===10 ? "lg " : "log<sub>"+b+"</sub> ";
    return {key:"lg"+e, a:tx(name+z(v),"lg"), b:tx(zv(e),"lg"), info:name+z(v)+" = "+zv(e)+", denn "+b+"^"+zv(e)+" = "+z(v)};
  })});

S({fach:"Mathematik", stufe:10, gebiet:"Funktionen", titel:"Logarithmusterme umformen",
  kurz:"lg a + lg b gehört zu lg(a · b)", a:"Term", b:"gleichwertiger Term", max:10,
  make:liste([
    {key:"lga1", a:tx("lg a + lg b"), b:tx("lg (a "+MAL+" b)"), info:"Produktregel"},
    {key:"lga2", a:tx("lg a "+MINUS+" lg b"), b:tx("lg "+frac("a","b")), info:"Quotientenregel"},
    {key:"lga3", a:tx("3 "+MAL+" lg a"), b:tx("lg a<sup>3</sup>"), info:"Potenzregel"},
    {key:"lga4", a:tx("lg 1"), b:tx("0","lg"), info:"10⁰ = 1"},
    {key:"lga5", a:tx("lg 10"), b:tx("1","lg"), info:"10¹ = 10"},
    {key:"lga6", a:tx("lg "+RAD+"a"), b:tx(frac(1,2)+" "+MAL+" lg a"), info:"√a = a^(1/2)"},
    {key:"lga7", a:tx("lg "+frac(1,"a")), b:tx(MINUS+" lg a"), info:"1/a = a^(−1)"},
    {key:"lga8", a:tx("lg 2 + lg 50"), b:tx("2","lg"), info:"lg(2 · 50) = lg 100 = 2"},
    {key:"lga9", a:tx("lg 10 000"), b:tx("4","lg"), info:"10⁴ = 10 000"},
    {key:"lga10", a:tx("2 "+MAL+" lg 3"), b:tx("lg 9","lg"), info:"2 · lg 3 = lg 3² = lg 9"}
  ])});

const VTRIG={X0:-6.3,X1:6.3,Y0:-3.2,Y1:3.2};
S({fach:"Mathematik", stufe:10, gebiet:"Funktionen", titel:"Sinus und Kosinus: Term und Graph",
  kurz:"y = 2 · sin x gehört zum passenden Graphen", a:"Funktionsterm", b:"Graph", max:14,
  make:(n)=>build(n,()=>{
    const fn=pick(["sin","cos"]), a=pick([0.5,1,2,-1]), b=pick([1,2,0.5]), c=pick([0,0,1,-1]);
    const f=x=>a*(fn==="sin"?Math.sin(b*x):Math.cos(b*x))+c;
    return {key:"tr"+fn+a+"_"+b+"_"+c,
      a:tx("y = "+vorf(a,true)+fn+"("+(b===1?"x":z(b)+"x")+")"+sig(c)),
      b:graph(f,{view:VTRIG,gridX:1.5707963,gridY:1}),
      info:"Amplitude "+z(Math.abs(a))+", Periode "+(b===1?"2π":"2π : "+z(b))+(c?", um "+zv(c)+" verschoben":"")};
  })});

S({fach:"Mathematik", stufe:10, gebiet:"Funktionen", titel:"Ganzrationale Funktionen: Term und Graph",
  kurz:"Nullstellenform und passender Graph", a:"Funktionsterm", b:"Graph", max:14,
  make:(n)=>build(n,()=>{
    const grad=pick([3,3,4]);
    let rs=shuffle([-3,-2,-1,0,1,2,3]).slice(0,grad).sort((x,y)=>x-y);
    const a=pick([0.25,0.5,-0.25,-0.5]);
    const f=x=>{ let y=a; rs.forEach(r=>y*=(x-r)); return y; };
    const t=vorf(a,true)+rs.map(r=>r===0?"x":"(x"+(r>0?" "+MINUS+" "+r:" + "+(-r))+")").join("");
    return {key:"gr"+a+"_"+rs.join(","), a:tx("y = "+t,"sm"), b:graph(f,{gridY:1}),
      info:"Nullstellen bei x = "+rs.map(zv).join("; ")};
  })});

S({fach:"Mathematik", stufe:10, gebiet:"Geometrie", titel:"Bogenmaß und Gradmaß",
  kurz:"180° gehört zu π", a:"Gradmaß", b:"Bogenmaß", max:14,
  make:liste([[30,frac("π","6")],[45,frac("π","4")],[60,frac("π","3")],[90,frac("π","2")],
    [120,frac("2π","3")],[135,frac("3π","4")],[150,frac("5π","6")],[180,"π"],
    [210,frac("7π","6")],[225,frac("5π","4")],[240,frac("4π","3")],[270,frac("3π","2")],
    [300,frac("5π","3")],[360,"2π"]].map(p=>({key:"bm"+p[0], a:tx(p[0]+"°","lg"), b:tx(p[1],"lg"),
      info:p[0]+"° = "+p[0]+"/180 · π"})))});

S({fach:"Mathematik", stufe:10, gebiet:"Geometrie", titel:"Körper: Formel und Körper",
  kurz:"V = ⅓ · G · h gehört zur Pyramide", a:"Formel", b:"Körper oder Bedeutung", max:9,
  make:liste([
    {key:"kp", a:tx("V = "+frac(1,3)+" "+MAL+" G "+MAL+" h","lg"), b:FIG.koerper("pyramide"), info:"Pyramide: ein Drittel von Grundfläche · Höhe"},
    {key:"kk", a:tx("V = "+frac(1,3)+" "+MAL+" π r² h","lg"), b:FIG.koerper("kegel"), info:"Kegel: ein Drittel des Zylinders"},
    {key:"kug", a:tx("V = "+frac(4,3)+" "+MAL+" π r³","lg"), b:FIG.koerper("kugel"), info:"Kugelvolumen"},
    {key:"kugo", a:tx("O = 4 "+MAL+" π r²","lg"), b:tx("Oberfläche der Kugel","sm"), info:"viermal die Kreisfläche"},
    {key:"kegm", a:tx("M = π "+MAL+" r "+MAL+" s","lg"), b:tx("Mantelfläche des Kegels","sm"), info:"s ist die Mantellinie"},
    {key:"zyl", a:tx("V = π r² h","lg"), b:FIG.koerper("zylinder"), info:"Zylindervolumen"},
    {key:"pri", a:tx("V = G "+MAL+" h","lg"), b:FIG.koerper("prisma"), info:"Prismenvolumen"},
    {key:"wue", a:tx("V = a³","lg"), b:FIG.koerper("wuerfel"), info:"Würfelvolumen"},
    {key:"qua", a:tx("V = a "+MAL+" b "+MAL+" c","lg"), b:FIG.koerper("quader"), info:"Quadervolumen"}
  ])});

/* --------------------------------------------------------- Klasse 11 bis 13 */
function polyTerm(co){            // co = [a_n, ..., a_1, a_0]
  const g=co.length-1; let s="";
  co.forEach((c,i)=>{
    const e=g-i; if(Math.abs(c)<1e-12) return;
    const sgn = s==="" ? (c<0?MINUS:"") : (c<0?" "+MINUS+" ":" + ");
    const ab=Math.abs(c), zahl=(ab===1&&e>0)?"":z(ab);
    s+=sgn+zahl+(e===0?"":(e===1?"x":"x<sup>"+e+"</sup>"));
  });
  return s||"0";
}
function ablCo(co){ const g=co.length-1, out=[]; co.forEach((c,i)=>{ const e=g-i; if(e>0) out.push(c*e); }); return out.length?out:[0]; }
S({fach:"Mathematik", stufe:11, gebiet:"Analysis", titel:"Ableitung ganzrationaler Funktionen",
  kurz:"f(x) = x³ − 2x gehört zu f ′(x) = 3x² − 2", a:"Funktion", b:"Ableitung", max:18,
  make:(n)=>build(n,()=>{
    const g=ri(2,4), co=[];
    for(let i=0;i<=g;i++) co.push(i===0?pick([1,2,3,-1,-2,0.5]):ri(-5,5));
    const ab=ablCo(co);
    const at=polyTerm(ab);
    if(at==="0") return null;
    return {key:"ab"+at, a:tx("f(x) = "+polyTerm(co),"sm"), b:tx("f ′(x) = "+at,"sm"),
      info:"Potenzregel: aus xⁿ wird n · xⁿ⁻¹"};
  })});

S({fach:"Mathematik", stufe:11, gebiet:"Analysis", titel:"Graph und Ableitungsgraph",
  kurz:"Zum Graphen von f den Graphen von f ′ finden", a:"Graph von f", b:"Graph von f ′", max:12,
  make:(n)=>build(n,()=>{
    const g=pick([2,3]), co=[];
    for(let i=0;i<=g;i++) co.push(i===0?pick([0.25,0.5,-0.25,-0.5]):ri(-3,3));
    const ab=ablCo(co);
    const f=x=>co.reduce((y,c)=>y*x+c,0), fs=x=>ab.reduce((y,c)=>y*x+c,0);
    if(Math.abs(f(0))>6) return null;
    return {key:"ag"+co.join(","), a:graph(f,{color:"#2c5fd6"}), b:graph(fs,{color:"#c9513c"}),
      info:"Wo f eine Extremstelle hat, hat f ′ eine Nullstelle"};
  })});

S({fach:"Mathematik", stufe:11, gebiet:"Analysis", titel:"Grenzwerte und Asymptoten",
  kurz:"Funktionsterm und Verhalten im Unendlichen", a:"Funktionsterm", b:"Asymptote", max:12,
  make:(n)=>build(n,()=>{
    const a=ri(1,6), b=ri(1,6), c=ri(-4,4);
    const art=ri(1,2);
    if(art===1){
      const q=Math.round(a/b*1000)/1000;
      return {key:"as1_"+q, a:tx("f(x) = "+frac(z(a)+"x"+(c?(c>0?" + "+c:" "+MINUS+" "+(-c)):""),z(b)+"x + 1"),"sm"),
        b:tx("waagrechte Asymptote<br>y = "+z(q),"sm"),
        info:"Für x → ±∞ zählen nur die höchsten Potenzen: "+a+"x : "+b+"x = "+z(q)};
    }
    return {key:"as2_"+c, a:tx("f(x) = "+frac(z(a),"x"+(c?(c>0?" + "+c:" "+MINUS+" "+(-c)):""))+" + 2","sm"),
      b:tx("senkrecht: x = "+zv(-c)+"<br>waagrecht: y = 2","sm"),
      info:"Nenner null bei x = "+zv(-c)+"; für x → ±∞ geht der Bruch gegen 0"};
  })});

S({fach:"Mathematik", stufe:12, gebiet:"Analysis", titel:"Ableitungsregeln",
  kurz:"Produkt-, Ketten- und Quotientenregel, e und ln", a:"Funktion", b:"Ableitung", max:14,
  make:liste([
    {key:"d1", a:tx("f(x) = x "+MAL+" e<sup>x</sup>","sm"), b:tx("f ′(x) = (x + 1) "+MAL+" e<sup>x</sup>","sm"), info:"Produktregel"},
    {key:"d2", a:tx("f(x) = e<sup>3x</sup>","sm"), b:tx("f ′(x) = 3 "+MAL+" e<sup>3x</sup>","sm"), info:"Kettenregel: innere Ableitung 3"},
    {key:"d3", a:tx("f(x) = ln x","sm"), b:tx("f ′(x) = "+frac(1,"x"),"sm"), info:"Ableitung des natürlichen Logarithmus"},
    {key:"d4", a:tx("f(x) = ln(x²)","sm"), b:tx("f ′(x) = "+frac(2,"x"),"sm"), info:"ln(x²) = 2 · ln x"},
    {key:"d5", a:tx("f(x) = "+frac("x","e<sup>x</sup>"),"sm"), b:tx("f ′(x) = "+frac("1 "+MINUS+" x","e<sup>x</sup>"),"sm"), info:"Quotientenregel"},
    {key:"d6", a:tx("f(x) = sin(2x)","sm"), b:tx("f ′(x) = 2 "+MAL+" cos(2x)","sm"), info:"Kettenregel"},
    {key:"d7", a:tx("f(x) = x² "+MAL+" ln x","sm"), b:tx("f ′(x) = 2x "+MAL+" ln x + x","sm"), info:"Produktregel"},
    {key:"d8", a:tx("f(x) = e<sup>"+MINUS+"x</sup>","sm"), b:tx("f ′(x) = "+MINUS+" e<sup>"+MINUS+"x</sup>","sm"), info:"Kettenregel: innere Ableitung −1"},
    {key:"d9", a:tx("f(x) = (2x + 1)<sup>3</sup>","sm"), b:tx("f ′(x) = 6 "+MAL+" (2x + 1)²","sm"), info:"Kettenregel"},
    {key:"d10", a:tx("f(x) = "+RAD+"x","sm"), b:tx("f ′(x) = "+frac(1,"2"+RAD+"x"),"sm"), info:"√x = x^(1/2)"},
    {key:"d11", a:tx("f(x) = cos x","sm"), b:tx("f ′(x) = "+MINUS+" sin x","sm"), info:"Grundableitung"},
    {key:"d12", a:tx("f(x) = "+frac(1,"x"),"sm"), b:tx("f ′(x) = "+MINUS+frac(1,"x²"),"sm"), info:"x⁻¹ abgeleitet ergibt −x⁻²"},
    {key:"d13", a:tx("f(x) = e<sup>x²</sup>","sm"), b:tx("f ′(x) = 2x "+MAL+" e<sup>x²</sup>","sm"), info:"Kettenregel"},
    {key:"d14", a:tx("f(x) = x "+MAL+" sin x","sm"), b:tx("f ′(x) = sin x + x "+MAL+" cos x","sm"), info:"Produktregel"}
  ])});

S({fach:"Mathematik", stufe:12, gebiet:"Analysis", titel:"Stammfunktionen",
  kurz:"f(x) = 3x² gehört zu F(x) = x³", a:"Funktion", b:"Stammfunktion", max:12,
  make:liste([
    {key:"st1", a:tx("f(x) = 3x²","sm"), b:tx("F(x) = x³","sm"), info:"Umkehrung der Potenzregel"},
    {key:"st2", a:tx("f(x) = x","sm"), b:tx("F(x) = "+frac(1,2)+"x²","sm"), info:"Exponent um 1 erhöhen, durch den neuen Exponenten teilen"},
    {key:"st3", a:tx("f(x) = e<sup>x</sup>","sm"), b:tx("F(x) = e<sup>x</sup>","sm"), info:"die e-Funktion ist ihre eigene Stammfunktion"},
    {key:"st4", a:tx("f(x) = "+frac(1,"x"),"sm"), b:tx("F(x) = ln |x|","sm"), info:"Stammfunktion von 1/x"},
    {key:"st5", a:tx("f(x) = cos x","sm"), b:tx("F(x) = sin x","sm"), info:"Grundintegral"},
    {key:"st6", a:tx("f(x) = sin x","sm"), b:tx("F(x) = "+MINUS+" cos x","sm"), info:"Vorzeichen beachten"},
    {key:"st7", a:tx("f(x) = e<sup>2x</sup>","sm"), b:tx("F(x) = "+frac(1,2)+" e<sup>2x</sup>","sm"), info:"durch die innere Ableitung teilen"},
    {key:"st8", a:tx("f(x) = x³","sm"), b:tx("F(x) = "+frac(1,4)+"x⁴","sm"), info:"Potenzregel rückwärts"},
    {key:"st9", a:tx("f(x) = "+RAD+"x","sm"), b:tx("F(x) = "+frac(2,3)+"x"+RAD+"x","sm"), info:"x^(1/2) → (2/3)·x^(3/2)"},
    {key:"st10", a:tx("f(x) = "+frac(1,"x²"),"sm"), b:tx("F(x) = "+MINUS+frac(1,"x"),"sm"), info:"x⁻² → −x⁻¹"},
    {key:"st11", a:tx("f(x) = 4","sm"), b:tx("F(x) = 4x","sm"), info:"konstante Funktion"},
    {key:"st12", a:tx("f(x) = sin(3x)","sm"), b:tx("F(x) = "+MINUS+frac(1,3)+" cos(3x)","sm"), info:"durch die innere Ableitung teilen"}
  ])});

function vek(a,b,c){ return '<span class="vec">'+a+'<br>'+b+'<br>'+c+'</span>'; }
S({fach:"Mathematik", stufe:12, gebiet:"Geometrie", titel:"Vektoren: Betrag und Skalarprodukt",
  kurz:"Rechnung und Ergebnis im Raum", a:"Rechnung", b:"Ergebnis", max:14,
  make:(n)=>build(n,()=>{
    const art=ri(1,2);
    if(art===1){
      const t=pick([[1,2,2],[2,3,6],[3,4,12],[1,4,8],[2,6,9],[4,4,7],[6,6,7],[2,2,1],[4,0,3],[0,3,4]]);
      const v=shuffle(t.map((x,i)=> i<3 ? x*pick([1,-1]) : x));
      const b=Math.round(Math.hypot(v[0],v[1],v[2]));
      return {key:"v"+b,
        a:tx("| "+vek(zv(v[0]),zv(v[1]),zv(v[2]))+" |","sm"), b:tx(""+b,"lg"),
        info:"√("+v.map(x=>x*x).join(" + ")+") = "+b};
    }
    const u=[ri(-4,5),ri(-4,5),ri(-4,5)], w=[ri(-4,5),ri(-4,5),ri(-4,5)];
    const sp=u[0]*w[0]+u[1]*w[1]+u[2]*w[2];
    return {key:"v"+sp, a:tx(vek(zv(u[0]),zv(u[1]),zv(u[2]))+" "+MAL+" "+vek(zv(w[0]),zv(w[1]),zv(w[2])),"sm"),
      b:tx(zv(sp),"lg"), info:"Skalarprodukt: "+u.map((x,i)=>(x<0?"("+zv(x)+")":x)+MAL+(w[i]<0?"("+zv(w[i])+")":w[i])).join(" + ")+" = "+zv(sp)+(sp===0?" → die Vektoren stehen senkrecht":"")};
  })});

S({fach:"Mathematik", stufe:12, gebiet:"Stochastik", titel:"Binomialverteilung",
  kurz:"Bernoulli-Kette und Wahrscheinlichkeit", a:"Ansatz", b:"Bedeutung", max:10,
  make:liste([
    {key:"bi1", a:tx("P(X = k) = "+'<span style="font-size:1.3em;">(</span>'+frac("n","k")+'<span style="font-size:1.3em;">)</span>'+" p<sup>k</sup> (1"+MINUS+"p)<sup>n"+MINUS+"k</sup>","sm"),
      b:tx("Formel der Binomialverteilung","sm"), info:"n Versuche, k Treffer, Trefferwahrscheinlichkeit p"},
    {key:"bi2", a:tx("E(X) = n "+MAL+" p","sm"), b:tx("Erwartungswert","sm"), info:"durchschnittliche Trefferzahl"},
    {key:"bi3", a:tx("Var(X) = n "+MAL+" p "+MAL+" (1"+MINUS+"p)","sm"), b:tx("Varianz","sm"), info:"Streuungsmaß"},
    {key:"bi4", a:tx("σ = "+RAD+"(n p (1"+MINUS+"p))","sm"), b:tx("Standardabweichung","sm"), info:"Wurzel aus der Varianz"},
    {key:"bi5", a:tx("Bernoulli-Kette","sm"), b:tx("gleiches Zufallsexperiment, immer dieselbe Trefferwahrscheinlichkeit","sm"), info:"Grundlage der Binomialverteilung"},
    {key:"bi6", a:tx("Ziehen <b>mit</b> Zurücklegen","sm"), b:tx("Binomialverteilung passt","sm"), info:"p bleibt gleich"},
    {key:"bi7", a:tx("Ziehen <b>ohne</b> Zurücklegen","sm"), b:tx("keine Bernoulli-Kette","sm"), info:"p ändert sich von Zug zu Zug"},
    {key:"bi8", a:tx("P(X "+"≥"+" 1)","sm"), b:tx("1 "+MINUS+" P(X = 0)","sm"), info:"Gegenereignis „kein Treffer“"},
    {key:"bi9", a:tx("n = 10, p = 0,5: E(X)","sm"), b:tx("5","lg"), info:"10 · 0,5 = 5"},
    {key:"bi10", a:tx("Signifikanztest: Fehler 1. Art","sm"), b:tx("H₀ wird abgelehnt, obwohl H₀ stimmt","sm"), info:"Irrtumswahrscheinlichkeit α"}
  ])});

S({fach:"Mathematik", stufe:13, gebiet:"Analysis", titel:"Bestimmte Integrale",
  kurz:"Integral und Wert", a:"Integral", b:"Wert", max:12,
  make:(n)=>build(n,()=>{
    const art=ri(1,3);
    if(art===1){ const b=ri(1,4), e=ri(1,3);
      const v=Math.pow(b,e+1)/(e+1);
      if(Math.abs(v-Math.round(v*100)/100)>1e-9) return null;
      return {key:"in"+z(v), a:tx("∫<sub>0</sub><sup>"+b+"</sup> "+(e===1?"x":"x<sup>"+e+"</sup>")+" dx","sm"),
        b:tx(z(Math.round(v*1000)/1000),"lg"), info:"Stammfunktion x^"+(e+1)+"/"+(e+1)+", eingesetzt"}; }
    if(art===2){ const b=ri(2,6), k=ri(2,5), v=k*b;
      return {key:"in"+z(v), a:tx("∫<sub>0</sub><sup>"+b+"</sup> "+k+" dx","sm"), b:tx(z(v),"lg"), info:"Rechteck: "+k+" · "+b}; }
    const b=ri(1,3), v=Math.exp(b)-1;
    return {key:"ine"+b, a:tx("∫<sub>0</sub><sup>"+b+"</sup> e<sup>x</sup> dx","sm"),
      b:tx((b===1?"e":"e<sup>"+b+"</sup>")+" "+MINUS+" 1","sm"),
      info:"Stammfunktion e<sup>x</sup>, eingesetzt: e<sup>"+b+"</sup> "+MINUS+" 1"};
  })});

S({fach:"Mathematik", stufe:13, gebiet:"Geometrie", titel:"Geraden, Ebenen und Kugeln",
  kurz:"Gleichung und ihre Bedeutung", a:"Gleichung oder Begriff", b:"Bedeutung", max:10,
  make:liste([
    {key:"ge1", a:tx("X = A + λ "+MAL+" u⃗","sm"), b:tx("Gerade in Parameterform","sm"), info:"Aufpunkt A, Richtungsvektor u"},
    {key:"ge2", a:tx("X = A + λ u⃗ + μ v⃗","sm"), b:tx("Ebene in Parameterform","sm"), info:"zwei Richtungsvektoren spannen die Ebene auf"},
    {key:"ge3", a:tx("n⃗ "+MAL+" (X "+MINUS+" A) = 0","sm"), b:tx("Ebene in Normalenform","sm"), info:"Normalenvektor steht senkrecht auf der Ebene"},
    {key:"ge4", a:tx("2x₁ + 3x₂ "+MINUS+" x₃ = 7","sm"), b:tx("Ebene in Koordinatenform","sm"), info:"Normalenvektor ist (2 | 3 | −1)"},
    {key:"ge5", a:tx("|X "+MINUS+" M| = r","sm"), b:tx("Kugel mit Mittelpunkt M","sm"), info:"alle Punkte im Abstand r"},
    {key:"ge6", a:tx("u⃗ "+MAL+" v⃗ = 0","sm"), b:tx("die Vektoren stehen senkrecht","sm"), info:"Skalarprodukt null"},
    {key:"ge7", a:tx("u⃗ × v⃗","sm"), b:tx("Vektor senkrecht zu beiden","sm"), info:"Vektorprodukt (Kreuzprodukt)"},
    {key:"ge8", a:tx("|u⃗ × v⃗|","sm"), b:tx("Flächeninhalt des Parallelogramms","sm"), info:"Betrag des Vektorprodukts"},
    {key:"ge9", a:tx("windschief","sm"), b:tx("Geraden ohne Schnittpunkt und nicht parallel","sm"), info:"nur im Raum möglich"},
    {key:"ge10", a:tx("d = "+frac("|n⃗ "+MAL+" (P "+MINUS+" A)|","|n⃗|"),"sm"), b:tx("Abstand Punkt – Ebene","sm"), info:"Hesse'sche Normalenform"}
  ])});

/* ======================= Physik ======================= */
/* Diagramm im ersten Quadranten (t-s- und t-v-Diagramme) */
function dia(pts,labY){
  const S=120, m=16;
  const X=t=>m+t*(S-m-10), Y=v=>S-m-v*(S-m-14);
  let d="";
  pts.forEach((p,i)=>{ d+=(i?"L":"M")+X(p[0]).toFixed(1)+" "+Y(p[1]).toFixed(1)+" "; });
  return fig('<line x1="'+m+'" y1="'+(S-m)+'" x2="'+(S-6)+'" y2="'+(S-m)+'" stroke="#7d8694" stroke-width="1.8"/>'+
    '<line x1="'+m+'" y1="'+(S-m)+'" x2="'+m+'" y2="6" stroke="#7d8694" stroke-width="1.8"/>'+
    '<path d="'+d.trim()+'" fill="none" stroke="#2c5fd6" stroke-width="3" stroke-linecap="round"/>'+
    '<text x="'+(S-10)+'" y="'+(S-m+13)+'" text-anchor="end" font-size="13" font-weight="700" fill="#243028">t</text>'+
    '<text x="'+(m-4)+'" y="14" text-anchor="end" font-size="13" font-weight="700" fill="#243028">'+labY+'</text>',S,S);
}
function parab(){ const p=[]; for(let i=0;i<=10;i++){ const t=i/10; p.push([t,t*t]); } return p; }

S({fach:"Physik", stufe:7, gebiet:"Optik", titel:"Licht, Schatten und Sehen",
  kurz:"Begriffe aus der Optik mit Bild und Erklärung", a:"Begriff", b:"Erklärung oder Bild", max:10,
  make:liste([
    {key:"o1", a:tx("Lichtquelle","sm"), b:tx("sendet selbst Licht aus, z. B. Sonne oder Lampe","sm"), info:"Gegenteil: beleuchteter Körper"},
    {key:"o2", a:tx("beleuchteter Körper","sm"), b:tx("wirft Licht zurück, leuchtet aber nicht selbst","sm"), info:"z. B. der Mond"},
    {key:"o3", a:tx("Kernschatten","sm"), b:FIG.optik("schatten"), info:"Bereich, in den gar kein Licht fällt"},
    {key:"o4", a:tx("Halbschatten","sm"), b:tx("Bereich, in den nur ein Teil der Lichtquelle hineinleuchtet","sm"), info:"entsteht bei ausgedehnten Lichtquellen"},
    {key:"o5", a:tx("Reflexionsgesetz","sm"), b:FIG.optik("reflexion"), info:"Einfallswinkel = Reflexionswinkel"},
    {key:"o6", a:tx("geradlinige Ausbreitung","sm"), b:tx("Licht läuft im gleichen Stoff immer geradeaus","sm"), info:"deshalb entstehen scharfe Schatten"},
    {key:"o7", a:tx("Sonnenfinsternis","sm"), b:tx("der Mond steht zwischen Sonne und Erde","sm"), info:"Mondschatten trifft die Erde"},
    {key:"o8", a:tx("Mondfinsternis","sm"), b:tx("die Erde steht zwischen Sonne und Mond","sm"), info:"der Mond läuft in den Erdschatten"},
    {key:"o9", a:tx("Absorption","sm"), b:tx("Licht wird vom Körper geschluckt – er erscheint dunkel","sm"), info:"schwarze Flächen absorbieren fast alles"},
    {key:"o10", a:tx("Streuung","sm"), b:tx("Licht wird an einer rauen Fläche in alle Richtungen zurückgeworfen","sm"), info:"deshalb sieht man ein Blatt Papier von überall"}
  ])});

S({fach:"Physik", stufe:7, gebiet:"Elektrizität", titel:"Magnete und Ladungen",
  kurz:"Grundbegriffe zu Magnetismus und Strom", a:"Begriff", b:"Erklärung oder Bild", max:10,
  make:liste([
    {key:"m1", a:tx("Stabmagnet mit Feldlinien","sm"), b:FIG.magnet("stabmagnet"), info:"Feldlinien verlaufen außen von Nord nach Süd"},
    {key:"m2", a:tx("gleiche Pole","sm"), b:tx("stoßen sich ab","sm"), info:"ungleiche Pole ziehen sich an"},
    {key:"m3", a:tx("Elementarmagnete","sm"), b:tx("winzige Magnete im Material; sind sie geordnet, ist der Körper magnetisch","sm"), info:"Modellvorstellung"},
    {key:"m4", a:tx("Erdmagnetfeld","sm"), b:tx("am geografischen Nordpol liegt der magnetische Südpol","sm"), info:"deshalb zeigt die Kompassnadel dorthin"},
    {key:"m5", a:tx("elektrischer Strom","sm"), b:tx("bewegte Ladungen","sm"), info:"in Metallen bewegen sich Elektronen"},
    {key:"m6", a:tx("Kern-Hülle-Modell","sm"), b:tx("positiver Kern, negative Elektronen in der Hülle","sm"), info:"Grundmodell des Atoms"},
    {key:"m7", a:tx("Reibungselektrizität","sm"), b:tx("beim Reiben wechseln Elektronen den Körper","sm"), info:"ein Körper wird positiv, der andere negativ"},
    {key:"m8", a:tx("Leiter","sm"), b:tx("Stoff mit frei beweglichen Ladungen, z. B. Kupfer","sm"), info:"Metalle leiten gut"},
    {key:"m9", a:tx("Isolator","sm"), b:tx("Stoff ohne frei bewegliche Ladungen, z. B. Kunststoff","sm"), info:"schützt vor Stromschlag"},
    {key:"m10", a:tx("geschlossener Stromkreis","sm"), b:tx("nur dann fließt Strom","sm"), info:"eine Lücke unterbricht den Strom"}
  ])});

S({fach:"Physik", stufe:7, gebiet:"Mechanik", titel:"Dichte von Stoffen",
  kurz:"Stoff und seine Dichte in g/cm³", a:"Stoff oder Formel", b:"Dichte", max:9,
  make:liste([
    {key:"r0", a:tx("Dichte ρ","lg"), b:tx("ρ = "+frac("m","V"),"lg"), info:"Masse je Volumen"},
    {key:"r1", a:tx("Wasser","sm"), b:tx("1,0 "+frac("g","cm³"),"sm"), info:"1 Liter Wasser wiegt 1 kg"},
    {key:"r2", a:tx("Eisen","sm"), b:tx("7,9 "+frac("g","cm³"),"sm"), info:"Stahl liegt knapp darunter"},
    {key:"r3", a:tx("Aluminium","sm"), b:tx("2,7 "+frac("g","cm³"),"sm"), info:"Leichtmetall"},
    {key:"r4", a:tx("Gold","sm"), b:tx("19,3 "+frac("g","cm³"),"sm"), info:"eines der schwersten Alltagsmetalle"},
    {key:"r5", a:tx("Blei","sm"), b:tx("11,3 "+frac("g","cm³"),"sm"), info:"deshalb als Abschirmung beliebt"},
    {key:"r6", a:tx("Kupfer","sm"), b:tx("8,9 "+frac("g","cm³"),"sm"), info:"typisches Leitermaterial"},
    {key:"r7", a:tx("Fichtenholz","sm"), b:tx("0,5 "+frac("g","cm³"),"sm"), info:"schwimmt auf Wasser"},
    {key:"r8", a:tx("Luft","sm"), b:tx("0,0013 "+frac("g","cm³"),"sm"), info:"rund 1,3 Gramm je Liter"}
  ])});

S({fach:"Physik", stufe:8, gebiet:"Elektrizität", titel:"Schaltzeichen",
  kurz:"Bauteil und Symbol im Schaltplan", a:"Bauteil", b:"Schaltzeichen", max:11,
  make:liste([
    bildPaar("Lampe",FIG.schalt("lampe"),"Lampe im Schaltplan"),
    bildPaar("Schalter",FIG.schalt("schalter"),"geöffneter Schalter"),
    bildPaar("Spannungsquelle",FIG.schalt("quelle"),"langer Strich = Pluspol"),
    bildPaar("Widerstand",FIG.schalt("widerstand"),"Rechteck im Stromkreis"),
    bildPaar("Voltmeter",FIG.schalt("voltmeter"),"misst die Spannung – parallel anschließen"),
    bildPaar("Amperemeter",FIG.schalt("ampere"),"misst die Stromstärke – in Reihe anschließen"),
    bildPaar("Elektromotor",FIG.schalt("motor"),"wandelt elektrische Energie in Bewegung"),
    bildPaar("Leuchtdiode (LED)",FIG.schalt("led"),"leitet nur in einer Richtung und leuchtet dabei"),
    bildPaar("Diode",FIG.schalt("diode"),"lässt den Strom nur in eine Richtung durch"),
    bildPaar("Spule",FIG.schalt("spule"),"erzeugt beim Stromfluss ein Magnetfeld"),
    bildPaar("Sicherung",FIG.schalt("sicherung"),"unterbricht bei zu großer Stromstärke")
  ])});

S({fach:"Physik", stufe:8, gebiet:"Elektrizität", titel:"Größen und ihre Einheiten",
  kurz:"Stromstärke gehört zu Ampere", a:"Größe", b:"Einheit", max:12,
  make:liste([
    {key:"e1", a:tx("Stromstärke I","sm"), b:tx("Ampere (A)","sm"), info:"1 A = 1 C je Sekunde"},
    {key:"e2", a:tx("Spannung U","sm"), b:tx("Volt (V)","sm"), info:"Antrieb für den Strom"},
    {key:"e3", a:tx("Widerstand R","sm"), b:tx("Ohm (Ω)","sm"), info:"1 Ω = 1 V je A"},
    {key:"e4", a:tx("Kraft F","sm"), b:tx("Newton (N)","sm"), info:"1 N = 1 kg · m/s²"},
    {key:"e5", a:tx("Masse m","sm"), b:tx("Kilogramm (kg)","sm"), info:"Grundeinheit"},
    {key:"e6", a:tx("Energie E","sm"), b:tx("Joule (J)","sm"), info:"1 J = 1 N · m"},
    {key:"e7", a:tx("Leistung P","sm"), b:tx("Watt (W)","sm"), info:"1 W = 1 J je Sekunde"},
    {key:"e8", a:tx("Geschwindigkeit v","sm"), b:tx("Meter je Sekunde (m/s)","sm"), info:"1 m/s = 3,6 km/h"},
    {key:"e9", a:tx("Beschleunigung a","sm"), b:tx("Meter je Sekunde² (m/s²)","sm"), info:"Geschwindigkeitsänderung je Zeit"},
    {key:"e10", a:tx("Ladung Q","sm"), b:tx("Coulomb (C)","sm"), info:"1 C = 1 A · s"},
    {key:"e11", a:tx("Dichte ρ","sm"), b:tx("Kilogramm je m³ (kg/m³)","sm"), info:"auch g/cm³ üblich"},
    {key:"e12", a:tx("Frequenz f","sm"), b:tx("Hertz (Hz)","sm"), info:"Schwingungen je Sekunde"}
  ])});

S({fach:"Physik", stufe:8, gebiet:"Elektrizität", titel:"Ohm'sches Gesetz rechnen",
  kurz:"U = 12 V und I = 3 A gehören zu R = 4 Ω", a:"gegeben", b:"gesucht", max:14,
  make:(n)=>build(n,()=>{
    const R=pick([2,4,5,8,10,12,20,25,40,50,100,200]), I=pick([0.1,0.2,0.5,1,1.5,2,3]);
    const U=Math.round(R*I*100)/100;
    if(U>240 || U<1) return null;
    const art=ri(1,3);
    if(art===1) return {key:"ohm R"+R, a:tx("U = "+z(U)+" V<br>I = "+z(I)+" A","sm"), b:tx("R = "+z(R)+" Ω","lg"), info:"R = U : I = "+z(U)+" V : "+z(I)+" A"};
    if(art===2) return {key:"ohm I"+I+"_"+R, a:tx("U = "+z(U)+" V<br>R = "+z(R)+" Ω","sm"), b:tx("I = "+z(I)+" A","lg"), info:"I = U : R"};
    return {key:"ohm U"+U, a:tx("R = "+z(R)+" Ω<br>I = "+z(I)+" A","sm"), b:tx("U = "+z(U)+" V","lg"), info:"U = R · I"};
  })});

S({fach:"Physik", stufe:8, gebiet:"Optik", titel:"Linsen, Spiegel und Brechung",
  kurz:"Begriff und Strahlengang", a:"Begriff", b:"Bild oder Erklärung", max:9,
  make:liste([
    bildPaar("Sammellinse",FIG.optik("sammellinse"),"bündelt parallele Strahlen im Brennpunkt"),
    bildPaar("Zerstreuungslinse",FIG.optik("zerstreuung"),"lässt parallele Strahlen auseinanderlaufen"),
    bildPaar("Brechung",FIG.optik("brechung"),"beim Übergang in ein anderes Medium knickt der Strahl"),
    bildPaar("Totalreflexion",FIG.optik("totalreflexion"),"ab dem Grenzwinkel kommt kein Licht mehr heraus"),
    {key:"l5", a:tx("Brennpunkt F","sm"), b:tx("dort treffen sich die gebrochenen Parallelstrahlen","sm"), info:"Abstand zur Linse = Brennweite"},
    {key:"l6", a:tx("virtuelles Bild","sm"), b:tx("scheinbares Bild – man kann es nicht auffangen","sm"), info:"z. B. im ebenen Spiegel"},
    {key:"l7", a:tx("reelles Bild","sm"), b:tx("lässt sich auf einem Schirm auffangen","sm"), info:"entsteht hinter der Sammellinse"},
    {key:"l8", a:tx("Kurzsichtigkeit","sm"), b:tx("Bild entsteht vor der Netzhaut – Zerstreuungslinse hilft","sm"), info:"Augapfel zu lang"},
    {key:"l9", a:tx("Lichtleiter","sm"), b:tx("Licht bleibt durch Totalreflexion in der Faser","sm"), info:"Grundlage der Glasfaser"}
  ])});

S({fach:"Physik", stufe:8, gebiet:"Mechanik", titel:"Kräfte und Bewegung",
  kurz:"Gesetz oder Formel und ihre Bedeutung", a:"Begriff", b:"Formel oder Erklärung", max:10,
  make:liste([
    {key:"k1", a:tx("Gewichtskraft","sm"), b:tx("F = m "+MAL+" g","lg"), info:"g ≈ 9,81 N/kg"},
    {key:"k2", a:tx("Grundgleichung der Mechanik","sm"), b:tx("F = m "+MAL+" a","lg"), info:"zweites Newton'sches Gesetz"},
    {key:"k3", a:tx("Hooke'sches Gesetz","sm"), b:tx("F = D "+MAL+" s","lg"), info:"Federkraft wächst gleichmäßig mit der Dehnung"},
    {key:"k4", a:tx("Trägheitssatz","sm"), b:tx("ohne Kraft bleibt die Geschwindigkeit gleich","sm"), info:"erstes Newton'sches Gesetz"},
    {key:"k5", a:tx("Wechselwirkungsgesetz","sm"), b:tx("Kraft und Gegenkraft sind gleich groß und entgegengesetzt","sm"), info:"drittes Newton'sches Gesetz"},
    {key:"k6", a:tx("Kräftegleichgewicht","sm"), b:tx("alle Kräfte heben sich auf – der Körper wird nicht beschleunigt","sm"), info:"z. B. Buch auf dem Tisch"},
    {key:"k7", a:tx("Reibungskraft","sm"), b:tx("wirkt immer der Bewegung entgegen","sm"), info:"hängt von Material und Anpresskraft ab"},
    {key:"k8", a:tx("Masse","sm"), b:tx("Maß für die Trägheit eines Körpers","sm"), info:"überall gleich, auch auf dem Mond"},
    {key:"k9", a:tx("freier Fall","sm"), b:tx("Bewegung nur unter der Gewichtskraft, a = g","sm"), info:"ohne Luftwiderstand"},
    {key:"k10", a:tx("schiefe Ebene","sm"), b:tx("die Gewichtskraft wird in Hangabtriebs- und Normalkraft zerlegt","sm"), info:"Kräftezerlegung"}
  ])});

S({fach:"Physik", stufe:9, gebiet:"Energie", titel:"Energie, Arbeit und Leistung",
  kurz:"Formel und Größe", a:"Größe", b:"Formel", max:9,
  make:liste([
    {key:"en1", a:tx("kinetische Energie","sm"), b:tx("E = "+frac(1,2)+" m v²","lg"), info:"Bewegungsenergie"},
    {key:"en2", a:tx("Höhenenergie","sm"), b:tx("E = m "+MAL+" g "+MAL+" h","lg"), info:"potentielle Energie im Schwerefeld"},
    {key:"en3", a:tx("Spannenergie","sm"), b:tx("E = "+frac(1,2)+" D s²","lg"), info:"in einer gespannten Feder"},
    {key:"en4", a:tx("mechanische Arbeit","sm"), b:tx("W = F "+MAL+" s","lg"), info:"Kraft mal Weg in Kraftrichtung"},
    {key:"en5", a:tx("Leistung","sm"), b:tx("P = "+frac("E","t"),"lg"), info:"Energie je Zeit"},
    {key:"en6", a:tx("Wirkungsgrad","sm"), b:tx("η = "+frac("E<sub>nutz</sub>","E<sub>zu</sub>"),"lg"), info:"immer kleiner als 1"},
    {key:"en7", a:tx("elektrische Energie","sm"), b:tx("E = U "+MAL+" I "+MAL+" t","lg"), info:"Spannung mal Stromstärke mal Zeit"},
    {key:"en8", a:tx("elektrische Leistung","sm"), b:tx("P = U "+MAL+" I","lg"), info:"Spannung mal Stromstärke"},
    {key:"en9", a:tx("Energieerhaltung","sm"), b:tx("Energie geht nicht verloren, sie wird nur umgewandelt","sm"), info:"Grundprinzip der Physik"}
  ])});

S({fach:"Physik", stufe:9, gebiet:"Energie", titel:"Energieeinheiten umrechnen",
  kurz:"1 kWh gehört zu 3,6 MJ", a:"Größe", b:"gleiche Größe", max:8,
  make:liste([
    {key:"u1", a:tx("1 kWh","lg"), b:tx("3,6 MJ","lg"), info:"1000 W · 3600 s = 3 600 000 J"},
    {key:"u2", a:tx("1 J","lg"), b:tx("1 Ws","lg"), info:"ein Wattsekunde"},
    {key:"u3", a:tx("1 kJ","lg"), b:tx("1000 J","lg"), info:"Kilo = tausend"},
    {key:"u4", a:tx("1 MJ","lg"), b:tx("1000 kJ","lg"), info:"Mega = Million"},
    {key:"u5", a:tx("1 W","lg"), b:tx("1 J je Sekunde","sm"), info:"Leistung ist Energie je Zeit"},
    {key:"u6", a:tx("1 kcal","lg"), b:tx("etwa 4,2 kJ","sm"), info:"Nährwertangaben"},
    {key:"u7", a:tx("1 PS","lg"), b:tx("etwa 735 W","sm"), info:"alte Einheit der Leistung"},
    {key:"u8", a:tx("1 Wh","lg"), b:tx("3600 J","lg"), info:"1 W · 3600 s"}
  ])});

S({fach:"Physik", stufe:9, gebiet:"Wärmelehre", titel:"Wärmelehre",
  kurz:"Begriffe zum Teilchenmodell und zur Wärme", a:"Begriff", b:"Erklärung", max:10,
  make:liste([
    {key:"wl1", a:tx("Temperatur","sm"), b:tx("Maß für die mittlere kinetische Energie der Teilchen","sm"), info:"Teilchenmodell"},
    {key:"wl2", a:tx("absoluter Nullpunkt","sm"), b:tx(MINUS+"273,15 °C = 0 K","lg"), info:"tiefer geht es nicht"},
    {key:"wl3", a:tx("innere Energie","sm"), b:tx("Summe aus kinetischer und potentieller Energie aller Teilchen","sm"), info:"Zustandsgröße"},
    {key:"wl4", a:tx("spezifische Wärmekapazität","sm"), b:tx("Energie, um 1 kg eines Stoffes um 1 K zu erwärmen","sm"), info:"Wasser: 4,2 kJ/(kg·K)"},
    {key:"wl5", a:tx("Wärmeleitung","sm"), b:tx("Energie wandert durch Stöße von Teilchen zu Teilchen","sm"), info:"Metalle leiten gut"},
    {key:"wl6", a:tx("Konvektion","sm"), b:tx("Energie wird mit strömender Flüssigkeit oder Luft transportiert","sm"), info:"Heizkörper im Zimmer"},
    {key:"wl7", a:tx("Wärmestrahlung","sm"), b:tx("Energietransport ohne Materie, auch durchs Vakuum","sm"), info:"so kommt die Sonnenenergie zur Erde"},
    {key:"wl8", a:tx("Treibhauseffekt","sm"), b:tx("Gase lassen Sonnenlicht durch, halten aber Wärmestrahlung zurück","sm"), info:"CO₂, Methan, Wasserdampf"},
    {key:"wl9", a:tx("Verdampfen","sm"), b:tx("Übergang flüssig → gasförmig, dabei wird Energie aufgenommen","sm"), info:"die Temperatur bleibt dabei gleich"},
    {key:"wl10", a:tx("Druck eines Gases","sm"), b:tx("entsteht durch Stöße der Teilchen auf die Wand","sm"), info:"steigt mit der Temperatur"}
  ])});

S({fach:"Physik", stufe:9, gebiet:"Atome", titel:"Licht, Photonen und Spektren",
  kurz:"Begriffe aus dem Lernbereich Atome", a:"Begriff", b:"Erklärung", max:8,
  make:liste([
    {key:"at1", a:tx("Photon","sm"), b:tx("kleinstes Energiepaket des Lichts","sm"), info:"E = h · f"},
    {key:"at2", a:tx("blaues Licht","sm"), b:tx("höhere Photonenenergie als rotes Licht","sm"), info:"kurze Wellenlänge, hohe Frequenz"},
    {key:"at3", a:tx("Linienspektrum","sm"), b:tx("nur einzelne Farben – typisch für einzelne Atome","sm"), info:"Fingerabdruck des Elements"},
    {key:"at4", a:tx("kontinuierliches Spektrum","sm"), b:tx("alle Farben gehen ineinander über","sm"), info:"glühender Körper"},
    {key:"at5", a:tx("Energiestufenmodell","sm"), b:tx("Elektronen dürfen nur bestimmte Energien haben","sm"), info:"erklärt die Linienspektren"},
    {key:"at6", a:tx("Emission","sm"), b:tx("Atom gibt ein Photon ab und springt auf eine tiefere Stufe","sm"), info:"Licht entsteht"},
    {key:"at7", a:tx("Absorption","sm"), b:tx("Atom nimmt ein Photon auf und springt auf eine höhere Stufe","sm"), info:"dunkle Linien im Spektrum"},
    {key:"at8", a:tx("UV-Strahlung","sm"), b:tx("energiereicher als sichtbares Licht – Sonnenbrand","sm"), info:"kürzere Wellenlänge als Violett"}
  ])});

S({fach:"Physik", stufe:10, gebiet:"Elektromagnetismus", titel:"Elektromagnetismus",
  kurz:"Begriff, Bild und Wirkung", a:"Begriff", b:"Bild oder Erklärung", max:9,
  make:liste([
    bildPaar("Magnetfeld einer Spule",FIG.magnet("spulenfeld"),"innen gerade Feldlinien – wie beim Stabmagneten"),
    bildPaar("Lorentzkraft",FIG.magnet("lorentz"),"Kraft auf einen stromdurchflossenen Leiter im Magnetfeld"),
    bildPaar("Transformator",FIG.magnet("trafo"),"zwei Spulen auf einem Eisenkern"),
    {key:"em4", a:tx("Induktion","sm"), b:tx("ändert sich das Magnetfeld in einer Spule, entsteht eine Spannung","sm"), info:"Grundlage von Generator und Trafo"},
    {key:"em5", a:tx("Generator","sm"), b:tx("wandelt Bewegung in elektrische Energie","sm"), info:"Umkehrung des Elektromotors"},
    {key:"em6", a:tx("Elektromotor","sm"), b:tx("wandelt elektrische Energie in Bewegung","sm"), info:"nutzt die Kraft auf stromdurchflossene Leiter"},
    {key:"em7", a:tx("idealer Transformator","sm"), b:tx(frac("U₁","U₂")+" = "+frac("n₁","n₂"),"lg"), info:"Spannungen verhalten sich wie die Windungszahlen"},
    {key:"em8", a:tx("Drei-Finger-Regel","sm"), b:tx("zeigt die Richtung der Lorentzkraft","sm"), info:"rechte Hand bei technischer Stromrichtung"},
    {key:"em9", a:tx("Hochspannung beim Stromtransport","sm"), b:tx("kleine Stromstärke – dadurch geringe Verluste in den Leitungen","sm"), info:"deshalb der Trafo im Umspannwerk"}
  ])});

S({fach:"Physik", stufe:10, gebiet:"Mechanik", titel:"Bewegungsdiagramme lesen",
  kurz:"Diagramm und Bewegung", a:"Diagramm", b:"Bewegung", max:6,
  make:liste([
    {key:"bd1", a:dia([[0,0],[1,0.9]],"s"), b:tx("Der Ort wächst gleichmäßig: konstante Geschwindigkeit","sm"), info:"Steigung im t-s-Diagramm = Geschwindigkeit"},
    {key:"bd2", a:dia([[0,0.5],[1,0.5]],"s"), b:tx("Der Körper bleibt am selben Ort","sm"), info:"waagrechte Linie im t-s-Diagramm"},
    {key:"bd3", a:dia(parab(),"s"), b:tx("Der Ort wächst immer schneller: gleichmäßige Beschleunigung","sm"), info:"Parabel im t-s-Diagramm"},
    {key:"bd4", a:dia([[0,0.6],[1,0.6]],"v"), b:tx("Die Geschwindigkeit bleibt gleich: keine Beschleunigung","sm"), info:"waagrechte Linie im t-v-Diagramm"},
    {key:"bd5", a:dia([[0,0],[1,0.9]],"v"), b:tx("Die Geschwindigkeit wächst gleichmäßig: konstante Beschleunigung","sm"), info:"Steigung im t-v-Diagramm = Beschleunigung"},
    {key:"bd6", a:dia([[0,0.9],[1,0]],"v"), b:tx("Der Körper bremst gleichmäßig ab","sm"), info:"fallende Gerade im t-v-Diagramm"}
  ])});

S({fach:"Physik", stufe:10, gebiet:"Mechanik", titel:"Kinematik und Impuls",
  kurz:"Formel und Bedeutung", a:"Formel", b:"Bedeutung", max:8,
  make:liste([
    {key:"ki1", a:tx("v = "+frac("s","t"),"lg"), b:tx("Geschwindigkeit bei gleichförmiger Bewegung","sm"), info:"Weg je Zeit"},
    {key:"ki2", a:tx("a = "+frac("Δv","Δt"),"lg"), b:tx("Beschleunigung","sm"), info:"Geschwindigkeitsänderung je Zeit"},
    {key:"ki3", a:tx("s = "+frac(1,2)+" a t²","lg"), b:tx("Weg bei konstanter Beschleunigung aus dem Stand","sm"), info:"Parabel im t-s-Diagramm"},
    {key:"ki4", a:tx("v = a "+MAL+" t","lg"), b:tx("Geschwindigkeit bei konstanter Beschleunigung","sm"), info:"Gerade im t-v-Diagramm"},
    {key:"ki5", a:tx("p = m "+MAL+" v","lg"), b:tx("Impuls","sm"), info:"Erhaltungsgröße bei Stößen"},
    {key:"ki6", a:tx("g ≈ 9,81 "+frac("m","s²"),"sm"), b:tx("Fallbeschleunigung auf der Erde","sm"), info:"beim freien Fall"},
    {key:"ki7", a:tx("waagrechter Wurf","sm"), b:tx("gleichförmig waagrecht, frei fallend senkrecht","sm"), info:"beide Richtungen getrennt betrachten"},
    {key:"ki8", a:tx("Impulserhaltung","sm"), b:tx("die Summe der Impulse bleibt beim Stoß gleich","sm"), info:"gilt ohne äußere Kräfte"}
  ])});

S({fach:"Physik", stufe:10, gebiet:"Kernphysik", titel:"Radioaktivität und Atomkern",
  kurz:"Strahlungsart und Eigenschaft", a:"Begriff", b:"Eigenschaft", max:9,
  make:liste([
    {key:"kp1", a:tx("α-Strahlung","lg"), b:tx("Heliumkerne – schon ein Blatt Papier schirmt ab","sm"), info:"stark ionisierend, geringe Reichweite"},
    {key:"kp2", a:tx("β-Strahlung","lg"), b:tx("schnelle Elektronen – einige Millimeter Aluminium schirmen ab","sm"), info:"im Kern wird ein Neutron zum Proton"},
    {key:"kp3", a:tx("γ-Strahlung","lg"), b:tx("energiereiche Photonen – erst dickes Blei schwächt sie deutlich","sm"), info:"keine Ladung, große Reichweite"},
    {key:"kp4", a:tx("Halbwertszeit","sm"), b:tx("Zeit, nach der die Hälfte der Kerne zerfallen ist","sm"), info:"für jedes Isotop fest"},
    {key:"kp5", a:tx("Nukleonen","sm"), b:tx("Protonen und Neutronen im Kern","sm"), info:"bestehen aus Quarks"},
    {key:"kp6", a:tx("Isotope","sm"), b:tx("gleiche Protonenzahl, verschiedene Neutronenzahl","sm"), info:"z. B. C-12 und C-14"},
    {key:"kp7", a:tx("E = m "+MAL+" c²","lg"), b:tx("Äquivalenz von Masse und Energie","sm"), info:"erklärt die Energie beim Zerfall"},
    {key:"kp8", a:tx("Strahlenschutz","sm"), b:tx("Abstand halten, Zeit begrenzen, abschirmen","sm"), info:"drei A-Regeln"},
    {key:"kp9", a:tx("Ionisierende Strahlung","sm"), b:tx("schlägt Elektronen aus Atomen – kann Zellen schädigen","sm"), info:"Grundlage der biologischen Wirkung"}
  ])});

S({fach:"Physik", stufe:11, gebiet:"Mechanik", titel:"Kreisbewegung und Gravitation",
  kurz:"Formel und Bedeutung", a:"Formel", b:"Bedeutung", max:8,
  make:liste([
    {key:"kb1", a:tx("F = "+frac("m v²","r"),"lg"), b:tx("Zentripetalkraft","sm"), info:"zeigt immer zum Kreismittelpunkt"},
    {key:"kb2", a:tx("ω = "+frac("2π","T"),"lg"), b:tx("Winkelgeschwindigkeit","sm"), info:"voller Umlauf in der Zeit T"},
    {key:"kb3", a:tx("v = ω "+MAL+" r","lg"), b:tx("Bahngeschwindigkeit","sm"), info:"außen schneller als innen"},
    {key:"kb4", a:tx("F = G "+frac("m₁ m₂","r²"),"lg"), b:tx("Gravitationsgesetz","sm"), info:"Newton"},
    {key:"kb5", a:tx("T² ~ a³","lg"), b:tx("drittes Kepler'sches Gesetz","sm"), info:"Umlaufzeit und große Halbachse"},
    {key:"kb6", a:tx("Ellipsenbahn mit der Sonne im Brennpunkt","sm"), b:tx("erstes Kepler'sches Gesetz","sm"), info:"Planetenbahnen"},
    {key:"kb7", a:tx("Flächensatz","sm"), b:tx("zweites Kepler'sches Gesetz","sm"), info:"in Sonnennähe schneller"},
    {key:"kb8", a:tx("Schwerelosigkeit in der ISS","sm"), b:tx("freier Fall um die Erde herum","sm"), info:"Gravitation wirkt weiter"}
  ])});

S({fach:"Physik", stufe:11, gebiet:"Wellen", titel:"Schwingungen und Wellen",
  kurz:"Begriff und Erklärung", a:"Begriff", b:"Erklärung oder Formel", max:10,
  make:liste([
    {key:"sw1", a:tx("Amplitude","sm"), b:tx("größte Auslenkung aus der Ruhelage","sm"), info:"bestimmt die Lautstärke beim Ton"},
    {key:"sw2", a:tx("Periodendauer T","sm"), b:tx("Zeit für eine volle Schwingung","sm"), info:"T = 1 : f"},
    {key:"sw3", a:tx("Frequenz f","sm"), b:tx("Zahl der Schwingungen je Sekunde","sm"), info:"Einheit Hertz"},
    {key:"sw4", a:tx("c = λ "+MAL+" f","lg"), b:tx("Zusammenhang von Wellenlänge und Frequenz","sm"), info:"c ist die Ausbreitungsgeschwindigkeit"},
    {key:"sw5", a:tx("Transversalwelle","sm"), b:tx("Teilchen schwingen quer zur Ausbreitungsrichtung","sm"), info:"z. B. Seilwelle"},
    {key:"sw6", a:tx("Longitudinalwelle","sm"), b:tx("Teilchen schwingen längs der Ausbreitungsrichtung","sm"), info:"z. B. Schall in Luft"},
    {key:"sw7", a:tx("Interferenz","sm"), b:tx("Wellen überlagern sich – sie verstärken oder löschen sich aus","sm"), info:"Superpositionsprinzip"},
    {key:"sw8", a:tx("Gangunterschied λ/2","sm"), b:tx("führt zu Auslöschung","sm"), info:"destruktive Interferenz"},
    {key:"sw9", a:tx("stehende Welle","sm"), b:tx("Knoten und Bäuche bleiben an derselben Stelle","sm"), info:"durch Reflexion am Ende"},
    {key:"sw10", a:tx("Beugung","sm"), b:tx("Wellen laufen hinter einem Spalt in den Schattenraum","sm"), info:"stärker bei kleinem Spalt"}
  ])});

S({fach:"Physik", stufe:11, gebiet:"Relativität", titel:"Relativitätstheorie und Weltbilder",
  kurz:"Begriff und Aussage", a:"Begriff", b:"Aussage", max:8,
  make:liste([
    {key:"rt1", a:tx("Einstein'sche Postulate","sm"), b:tx("Lichtgeschwindigkeit ist in jedem Bezugssystem gleich","sm"), info:"dazu: alle Inertialsysteme sind gleichwertig"},
    {key:"rt2", a:tx("Zeitdilatation","sm"), b:tx("bewegte Uhren gehen langsamer","sm"), info:"Myonen erreichen deshalb die Erdoberfläche"},
    {key:"rt3", a:tx("Längenkontraktion","sm"), b:tx("bewegte Körper sind in Bewegungsrichtung kürzer","sm"), info:"nur aus Sicht des ruhenden Beobachters"},
    {key:"rt4", a:tx("Relativität der Gleichzeitigkeit","sm"), b:tx("was gleichzeitig ist, hängt vom Bezugssystem ab","sm"), info:"Folge der konstanten Lichtgeschwindigkeit"},
    {key:"rt5", a:tx("geozentrisches Weltbild","sm"), b:tx("die Erde steht im Mittelpunkt","sm"), info:"Ptolemäus"},
    {key:"rt6", a:tx("heliozentrisches Weltbild","sm"), b:tx("die Sonne steht im Mittelpunkt","sm"), info:"Kopernikus, Galilei"},
    {key:"rt7", a:tx("c ≈ 300 000 "+frac("km","s"),"sm"), b:tx("Lichtgeschwindigkeit im Vakuum","sm"), info:"obere Grenze für jede Signalübertragung"},
    {key:"rt8", a:tx("Rotverschiebung ferner Galaxien","sm"), b:tx("Hinweis auf die Expansion des Universums","sm"), info:"Urknallmodell"}
  ])});

/* ---------- Umwandlung in das Format des Zuordnen-Werkzeugs ---------- */
const HOCH={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
  '+':'⁺','-':'⁻','−':'⁻','(':'⁽',')':'⁾','n':'ⁿ','x':'ˣ','a':'ᵃ','b':'ᵇ','k':'ᵏ','t':'ᵗ','i':'ⁱ'};
const TIEF={'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
  '+':'₊','-':'₋','−':'₋','(':'₍',')':'₎','a':'ₐ','n':'ₙ','x':'ₓ','e':'ₑ','k':'ₖ','t':'ₜ'};
const umschrift=(s,tab)=>{ let out='', rein=true;
  for(const c of String(s)){ const m=tab[c.toLowerCase()]; if(m) out+=m; else { rein=false; out+=c; } }
  return rein?out:('^'+s); };
function istBild(h){ return /^\s*<svg/i.test(String(h||'')); }
/* Die Zeichnungen des Spiels setzen manche Attribute doppelt (etwa fill für Füllung und
   Kontur). Als eingebettetes HTML stört das nicht, als Bildquelle schon: Dort muss das SVG
   sauberes XML sein. Deshalb einmal durch den nachsichtigen HTML-Parser und wieder heraus. */
function alsBild(h){
  let txt=String(h);
  try{
    const d=document.createElement('div'); d.innerHTML=txt;
    const sv=d.querySelector('svg');
    if(sv){ if(!sv.getAttribute('xmlns')) sv.setAttribute('xmlns','http://www.w3.org/2000/svg');
      txt=new XMLSerializer().serializeToString(sv); }
  }catch(e){}
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(txt.replace(/\s+/g,' '));
}
function alsText(h){
  const d=document.createElement('div'); d.innerHTML=String(h||'');
  d.querySelectorAll('span.frac').forEach(f=>{ const n=f.querySelector('.fn'), z=f.querySelector('.fd');
    f.replaceWith(document.createTextNode((n?n.textContent.trim():'')+'/'+(z?z.textContent.trim():''))); });
  d.querySelectorAll('span.vec').forEach(v=>{ const teile=v.innerHTML.split(/<br\s*\/?>/i)
    .map(t=>t.replace(/<[^>]*>/g,'').trim()).filter(Boolean);
    v.replaceWith(document.createTextNode('('+teile.join('; ')+')')); });
  d.querySelectorAll('sup').forEach(s=>s.replaceWith(document.createTextNode(umschrift(s.textContent,HOCH))));
  d.querySelectorAll('sub').forEach(s=>s.replaceWith(document.createTextNode(umschrift(s.textContent,TIEF))));
  const t=(d.textContent||'').replace(/\s+/g,' ').trim();
  /* im Begleittext der Sätze stehen Potenzen bisweilen als x^2 – auch die hochstellen */
  return t.replace(/\^(−?-?\d+)/g,(m,g)=>umschrift(g.replace('-','−'),HOCH));
}
/* Darstellung für den Filter im Auswahlfenster */
function sorte(titel,mitBild){
  if(!mitBild) return 'text';
  if(/graph/i.test(titel)) return 'graph';
  if(/diagramm/i.test(titel)) return 'diagramm';
  return 'figur';
}
/* Fester Zufall: gleiche Sätze bei jedem Öffnen – sonst fände ein geteilter Link sie nicht wieder */
function festerZufall(fn){
  const alt=Math.random; let s=20261003;
  Math.random=()=>{ s=(s*1664525+1013904223)>>>0; return s/4294967296; };
  try{ return fn(); } finally{ Math.random=alt; }
}

const PRO_SATZ=8;
let zwischen=null;
function bauen(){
  const out=[];
  festerZufall(()=>{
    SETS.forEach(s=>{
      let paare=[];
      try{ paare=s.make(Math.min(PRO_SATZ, s.max||PRO_SATZ))||[]; }catch(e){ return; }
      paare.forEach(c=>{
        const links=c.a||'', rechts=c.b||'';
        const lb=istBild(links), rb=istBild(rechts);
        const o={ f:(s.fach==='Physik'?'Ph':'M'), j:s.stufe, g:s.titel, art:sorte(s.titel,lb||rb) };
        if(lb&&rb){
          o.b=alsText(c.info||s.titel); o.e=s.kurz||'';
          const a=alsBild(links), b=alsBild(rechts);
          o.bild=a; o.bild2=b; o.paar=()=>({links:a,rechts:b});
        } else if(rb){
          o.b=alsText(links); o.e=alsText(c.info||s.kurz||''); o.bild=alsBild(rechts);
        } else if(lb){
          o.b=alsText(rechts); o.e=alsText(c.info||s.kurz||''); o.bild=alsBild(links);
        } else {
          o.b=alsText(links); o.e=alsText(rechts);
        }
        if(o.b&&(o.e||o.bild)) out.push(o);
      });
    });
  });
  return out;
}

window.TafelMemory={
  verfuegbar:()=>SETS.length>0,
  anzahl:()=>(zwischen||(zwischen=bauen())).length,
  saetze:()=>SETS.length,
  daten(){ return (zwischen||(zwischen=bauen())).map(o=>Object.assign({},o)); }
};
})();

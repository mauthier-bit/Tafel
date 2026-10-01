/* Fertige Argumentationsketten für das Reihenfolge-Werkzeug
   ---------------------------------------------------------
   Jede Aufgabe ist eine Kette von Schritten in der richtigen Reihenfolge:
   von der Voraussetzung über die Begründungen bis zum Ergebnis.
   Aufbau je Eintrag: { f:Fach, j:Jahrgangsstufe, g:Themenbereich, t:Titel, s:[Schritte] }
*/
(function(){
"use strict";

/* ====================== Veranschaulichungen ======================
   Zu geometrischen Ketten gehören Bilder: bei Konstruktionen je Schritt
   eine Figur, die den Stand nach diesem Schritt zeigt – das jeweils neu
   hinzukommende Element rot. Gezeichnet wird zur Laufzeit auf Canvas,
   damit keine Bilddateien nötig sind.                                  */
const FARB={lin:'#1f2430',hilf:'#94a3b8',neu:'#dc2626',erg:'#2563eb',gru:'#15803d',hell:'#cbd5e1'};
const SW=340, SH=340;
function blatt(w,h){ const c=document.createElement('canvas');
  const dpr=2; c.width=w*dpr; c.height=h*dpr;
  const g=c.getContext('2d'); g.setTransform(dpr,0,0,dpr,0,0);
  g.fillStyle='#fff'; g.fillRect(0,0,w,h); g.lineJoin='round'; g.lineCap='round';
  return {c,g}; }
function L(g,x1,y1,x2,y2,col,bd,dash){ g.save(); g.strokeStyle=col||FARB.lin; g.lineWidth=bd||1.8;
  if(dash) g.setLineDash(dash); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); g.restore(); }
function BOG(g,cx,cy,r,a0,a1,col,bd,dash){ g.save(); g.strokeStyle=col||FARB.hilf; g.lineWidth=bd||1.3;
  if(dash) g.setLineDash(dash); g.beginPath(); g.arc(cx,cy,r,a0,a1); g.stroke(); g.restore(); }
function KREIS(g,cx,cy,r,col,bd,dash){ BOG(g,cx,cy,r,0,Math.PI*2,col,bd,dash); }
function TXT(g,x,y,t,col,gr,al,fett){ g.save(); g.fillStyle=col||FARB.lin;
  g.font=(fett?'700 ':'')+(gr||11.5)+'px -apple-system,Helvetica,sans-serif';
  g.textAlign=al||'center'; g.textBaseline='middle'; g.fillText(t,x,y); g.restore(); }
function PKT(g,x,y,name,dx,dy,col){ g.save(); g.fillStyle=col||FARB.lin;
  g.beginPath(); g.arc(x,y,2.8,0,7); g.fill();
  if(name) TXT(g,x+(dx||0),y+(dy||0),name,col||FARB.lin,12.5,'center',true); g.restore(); }
function STICH(g,x,y,col){ g.save(); g.strokeStyle=col||FARB.neu; g.lineWidth=1.6;
  g.beginPath(); g.arc(x,y,6.5,0,7); g.stroke();
  g.beginPath(); g.moveTo(x-9,y); g.lineTo(x+9,y); g.moveTo(x,y-9); g.lineTo(x,y+9); g.stroke(); g.restore(); }
function WNK(g,cx,cy,r,a0,a1,col,name){
  let d=a1-a0; while(d>Math.PI)d-=2*Math.PI; while(d<-Math.PI)d+=2*Math.PI;  /* immer der innere Winkel */
  const s0=Math.min(a0,a0+d), s1=Math.max(a0,a0+d);
  g.save(); g.strokeStyle=col||FARB.erg; g.lineWidth=1.7;
  g.beginPath(); g.arc(cx,cy,r,s0,s1); g.stroke();
  if(name){ const m=(s0+s1)/2; TXT(g,cx+Math.cos(m)*(r+12),cy+Math.sin(m)*(r+12),name,col||FARB.erg,12.5,'center',true); }
  g.restore(); }
function RECHT(g,x,y,a1,a2,col){ const s=11, p1=[x+Math.cos(a1)*s,y+Math.sin(a1)*s],
  p2=[x+Math.cos(a2)*s,y+Math.sin(a2)*s], p3=[p1[0]+p2[0]-x,p1[1]+p2[1]-y];
  g.save(); g.strokeStyle=col||FARB.erg; g.lineWidth=1.5; g.beginPath();
  g.moveTo(p1[0],p1[1]); g.lineTo(p3[0],p3[1]); g.lineTo(p2[0],p2[1]); g.stroke(); g.restore(); }
/* k Gleichheitsstriche in der Mitte einer Strecke */
function MARK(g,x1,y1,x2,y2,k,col){ const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1;
  const ux=dx/l,uy=dy/l; g.save(); g.strokeStyle=col||FARB.gru; g.lineWidth=1.6;
  for(let i=0;i<(k||1);i++){ const o=(i-((k||1)-1)/2)*4, cx=mx+ux*o, cy=my+uy*o;
    g.beginPath(); g.moveTo(cx-uy*5,cy+ux*5); g.lineTo(cx+uy*5,cy-ux*5); g.stroke(); }
  g.restore(); }
function PFEIL(g,x1,y1,x2,y2,col,bd){ L(g,x1,y1,x2,y2,col,bd||2);
  const a=Math.atan2(y2-y1,x2-x1);
  L(g,x2,y2,x2-Math.cos(a-0.42)*9,y2-Math.sin(a-0.42)*9,col,bd||2);
  L(g,x2,y2,x2-Math.cos(a+0.42)*9,y2-Math.sin(a+0.42)*9,col,bd||2); }
function WOB(g,x1,y1,x2,y2,col,bd,amp){ const mx=(x1+x2)/2,my=(y1+y2)/2,dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1;
  g.save(); g.strokeStyle=col||FARB.hilf; g.lineWidth=bd||1.5; g.beginPath(); g.moveTo(x1,y1);
  g.quadraticCurveTo(mx-dy/l*(amp===undefined?5:amp), my+dx/l*(amp===undefined?5:amp), x2,y2); g.stroke(); g.restore(); }
/* Hilfs-Shortcuts für die Stufenbilder */
const CL=(neu,norm)=>neu?FARB.neu:(norm||FARB.lin);
const BD=neu=>neu?2.7:1.8;
function malen(g,st,liste){ liste.forEach(p=>{ if(st>=p[0]) p[1](st===p[0]); }); }
/* freihändige Planfigur */
function planfigur(g,texte){
  const A=[55,205],B=[250,196],C=[150,78];
  WOB(g,A[0],A[1],B[0],B[1],FARB.neu,1.6,4); WOB(g,A[0],A[1],C[0],C[1],FARB.neu,1.6,-4);
  WOB(g,B[0],B[1],C[0],C[1],FARB.neu,1.6,4);
  TXT(g,A[0]-10,A[1]+4,'A',FARB.lin,12,'center',true); TXT(g,B[0]+11,B[1]+4,'B',FARB.lin,12,'center',true);
  TXT(g,C[0]+2,C[1]-13,'C',FARB.lin,12,'center',true);
  TXT(g,150,218,'c',FARB.lin,12.5,'center',true); TXT(g,88,140,'b',FARB.lin,12.5,'center',true);
  TXT(g,214,140,'a',FARB.lin,12.5,'center',true);
  TXT(g,150,44,'Planfigur: gegebene Stücke markieren',FARB.hilf,11);
  (texte||[]).forEach((t,i)=>TXT(g,150,232+i*14,t,FARB.erg,11.5));
}
/* waagrechte Strecke mit Namen – für „gegebene Stücke“ */
function strecke(g,x,y,len,name,neu){ const col=CL(neu,FARB.lin);
  L(g,x,y,x+len,y,col,BD(neu)); L(g,x,y-5,x,y+5,col,1.6); L(g,x+len,y-5,x+len,y+5,col,1.6);
  TXT(g,x+len/2,y-11,name,col,12.5,'center',true); }
function winkelStueck(g,x,y,grad,name,neu){ const col=CL(neu,FARB.lin), a=-grad*Math.PI/180, len=78;
  L(g,x,y,x+len,y,col,BD(neu)); L(g,x,y,x+Math.cos(a)*len,y+Math.sin(a)*len,col,BD(neu));
  WNK(g,x,y,26,a,0,col,name); }

/* ---------------- Konstruktion: Mittelsenkrechte ---------------- */
const A_=[55,135], B_=[245,135], RMS=110;
function fMs(g,st){ const M=[150,135], d=Math.sqrt(RMS*RMS-95*95), P=[150,135-d], Q=[150,135+d];
  const aP=Math.atan2(P[1]-A_[1],P[0]-A_[0]);
  malen(g,st,[
   [0,neu=>{ L(g,A_[0],A_[1],B_[0],B_[1],CL(neu),BD(neu)); PKT(g,A_[0],A_[1],'A',-12,9); PKT(g,B_[0],B_[1],'B',12,9); }],
   [1,neu=>{ if(neu) STICH(g,A_[0],A_[1],FARB.neu); }],
   [2,neu=>{ if(!neu) return; STICH(g,A_[0],A_[1],FARB.hilf);
             L(g,A_[0],A_[1],A_[0]+Math.cos(-0.55)*RMS,A_[1]+Math.sin(-0.55)*RMS,FARB.neu,1.7,[6,4]);
             TXT(g,A_[0]+Math.cos(-0.55)*RMS/2-9,A_[1]+Math.sin(-0.55)*RMS/2-14,'r > ½·AB',FARB.neu,11.5); }],
   [3,neu=>{ const col=CL(neu,FARB.hilf); BOG(g,A_[0],A_[1],RMS,aP-0.42,aP+0.42,col,neu?2:1.3);
             BOG(g,A_[0],A_[1],RMS,-aP-0.42,-aP+0.42,col,neu?2:1.3); }],
   [4,neu=>{ if(neu) STICH(g,B_[0],B_[1],FARB.neu); }],
   [5,neu=>{ const col=CL(neu,FARB.hilf), b=Math.PI-aP;
             BOG(g,B_[0],B_[1],RMS,b-0.42,b+0.42,col,neu?2:1.3);
             BOG(g,B_[0],B_[1],RMS,-b-0.42,-b+0.42,col,neu?2:1.3); }],
   [6,neu=>{ PKT(g,P[0],P[1],'P',-12,-8,CL(neu,FARB.erg)); PKT(g,Q[0],Q[1],'Q',-12,8,CL(neu,FARB.erg)); }],
   [7,neu=>{ L(g,P[0],P[1]-22,Q[0],Q[1]+22,CL(neu,FARB.erg),neu?2.8:2.2); }],
   [8,neu=>{ const col=CL(neu,FARB.gru); RECHT(g,M[0],M[1],0,-Math.PI/2,col);
             MARK(g,A_[0],A_[1],M[0],M[1],1,col); MARK(g,M[0],M[1],B_[0],B_[1],1,col);
             TXT(g,215,P[1]-6,'Mittelsenkrechte',FARB.erg,11.5); }],
   [9,neu=>{ const col=CL(neu,FARB.hilf);
             L(g,P[0],P[1],A_[0],A_[1],col,1.4,[5,4]); L(g,P[0],P[1],B_[0],B_[1],col,1.4,[5,4]);
             MARK(g,P[0],P[1],A_[0],A_[1],2,col); MARK(g,P[0],P[1],B_[0],B_[1],2,col);
             TXT(g,150,24,'gleicher Abstand von A und B',col,11.5); }]
  ]); }

/* ---------------- Konstruktion: Winkelhalbierende ---------------- */
function fWh(g,st){ const S=[50,180], a1=-1.0, a2=-0.2, len=232, r=85, rr=55;
  const P=[S[0]+Math.cos(a1)*r,S[1]+Math.sin(a1)*r], Q=[S[0]+Math.cos(a2)*r,S[1]+Math.sin(a2)*r];
  const am=(a1+a2)/2, dw=(a2-a1)/2;
  const dd=(2*r*Math.cos(dw)+Math.sqrt(Math.pow(2*r*Math.cos(dw),2)-4*(r*r-rr*rr)))/2;
  const X=[S[0]+Math.cos(am)*dd, S[1]+Math.sin(am)*dd];
  const aPX=Math.atan2(X[1]-P[1],X[0]-P[0]), aQX=Math.atan2(X[1]-Q[1],X[0]-Q[0]);
  malen(g,st,[
   [0,neu=>{ const col=CL(neu); L(g,S[0],S[1],S[0]+Math.cos(a1)*len,S[1]+Math.sin(a1)*len,col,BD(neu));
             L(g,S[0],S[1],S[0]+Math.cos(a2)*len,S[1]+Math.sin(a2)*len,col,BD(neu)); PKT(g,S[0],S[1],'S',-12,8); }],
   [1,neu=>{ if(neu) STICH(g,S[0],S[1],FARB.neu); }],
   [2,neu=>{ BOG(g,S[0],S[1],r,a1-0.12,a2+0.12,CL(neu,FARB.hilf),neu?2:1.3); }],
   [3,neu=>{ PKT(g,P[0],P[1],'P',-6,-12,CL(neu,FARB.erg)); PKT(g,Q[0],Q[1],'Q',2,14,CL(neu,FARB.erg));
             if(neu){ MARK(g,S[0],S[1],P[0],P[1],1,FARB.neu); MARK(g,S[0],S[1],Q[0],Q[1],1,FARB.neu); } }],
   [4,neu=>{ BOG(g,P[0],P[1],rr,aPX-0.5,aPX+0.5,CL(neu,FARB.hilf),neu?2:1.3); }],
   [5,neu=>{ BOG(g,Q[0],Q[1],rr,aQX-0.5,aQX+0.5,CL(neu,FARB.hilf),neu?2:1.3);
             PKT(g,X[0],X[1],'',0,0,CL(neu,FARB.erg)); }],
   [6,neu=>{ L(g,S[0],S[1],X[0],X[1],CL(neu,FARB.erg),neu?2.8:2.2); }],
   [7,neu=>{ const col=CL(neu,FARB.erg); L(g,X[0],X[1],S[0]+Math.cos(am)*len,S[1]+Math.sin(am)*len,col,neu?2.8:2.2,[7,5]);
             WNK(g,S[0],S[1],40,a1,am,FARB.gru,''); WNK(g,S[0],S[1],52,am,a2,FARB.gru,'');
             TXT(g,205,S[1]+Math.sin(am)*len+14,'Winkelhalbierende',FARB.erg,11.5); }],
   [8,neu=>{ const col=CL(neu,FARB.gru);
             MARK(g,S[0]+Math.cos((a1+am)/2)*46,S[1]+Math.sin((a1+am)/2)*46,S[0]+Math.cos((a1+am)/2)*46,S[1]+Math.sin((a1+am)/2)*46,0,col);
             TXT(g,S[0]+Math.cos((a1+am)/2)*64,S[1]+Math.sin((a1+am)/2)*64,'φ',col,12.5,'center',true);
             TXT(g,S[0]+Math.cos((am+a2)/2)*74,S[1]+Math.sin((am+a2)/2)*74,'φ',col,12.5,'center',true); }],
   [9,neu=>{ const col=CL(neu,FARB.hilf); const T=[S[0]+Math.cos(am)*165,S[1]+Math.sin(am)*165];
             const fuss=(a)=>{ const t=(T[0]-S[0])*Math.cos(a)+(T[1]-S[1])*Math.sin(a);
               return [S[0]+Math.cos(a)*t, S[1]+Math.sin(a)*t]; };
             const F1=fuss(a1), F2=fuss(a2);
             L(g,T[0],T[1],F1[0],F1[1],col,1.4,[5,4]); L(g,T[0],T[1],F2[0],F2[1],col,1.4,[5,4]);
             RECHT(g,F1[0],F1[1],a1,Math.atan2(T[1]-F1[1],T[0]-F1[0]),col);
             RECHT(g,F2[0],F2[1],a2,Math.atan2(T[1]-F2[1],T[0]-F2[0]),col);
             MARK(g,T[0],T[1],F1[0],F1[1],2,col); MARK(g,T[0],T[1],F2[0],F2[1],2,col);
             TXT(g,150,22,'gleicher Abstand von beiden Schenkeln',col,11.5); }]
  ]); }

/* ---- Hilfsfunktion: Mittelsenkrechte einer Seite mit Bögen ---- */
function msBogen(g,P,Q,col,bd,lang){ const mx=(P[0]+Q[0])/2,my=(P[1]+Q[1])/2;
  const dx=Q[0]-P[0],dy=Q[1]-P[1],l=Math.hypot(dx,dy), r=l*0.62, h=Math.sqrt(r*r-(l/2)*(l/2));
  const nx=-dy/l, ny=dx/l;
  const S1=[mx+nx*h,my+ny*h], S2=[mx-nx*h,my-ny*h];
  [[P,S1],[P,S2],[Q,S1],[Q,S2]].forEach(([Z,T])=>{ const a=Math.atan2(T[1]-Z[1],T[0]-Z[0]);
    BOG(g,Z[0],Z[1],r,a-0.3,a+0.3,col,bd); });
  const e=lang||26;
  L(g,S1[0]+nx*e,S1[1]+ny*e,S2[0]-nx*e,S2[1]-ny*e,col,bd,[6,4]);
  return [mx,my]; }
function whBogen(g,S,P1,P2,col,bd,lang){
  const a1=Math.atan2(P1[1]-S[1],P1[0]-S[0]);
  let d=Math.atan2(P2[1]-S[1],P2[0]-S[0])-a1;                 /* immer der innere Winkel */
  while(d>Math.PI)d-=2*Math.PI; while(d<-Math.PI)d+=2*Math.PI;
  const r=52, a2=a1+d, am=a1+d/2;
  BOG(g,S[0],S[1],r,Math.min(a1,a2),Math.max(a1,a2),col,bd);
  const P=[S[0]+Math.cos(a1)*r,S[1]+Math.sin(a1)*r], Q=[S[0]+Math.cos(a2)*r,S[1]+Math.sin(a2)*r];
  const rr=42, dw=Math.abs(d)/2, k=2*r*Math.cos(dw);
  const dd=(k+Math.sqrt(Math.max(0,k*k-4*(r*r-rr*rr))))/2;
  const X=[S[0]+Math.cos(am)*dd,S[1]+Math.sin(am)*dd];
  [[P,X],[Q,X]].forEach(z=>{ const a=Math.atan2(z[1][1]-z[0][1],z[1][0]-z[0][0]);
    BOG(g,z[0][0],z[0][1],rr,a-0.45,a+0.45,col,bd); });
  L(g,S[0],S[1],S[0]+Math.cos(am)*(lang||185),S[1]+Math.sin(am)*(lang||185),col,bd,[6,4]); }

/* ---------------- Konstruktion: Umkreis ---------------- */
function fUk(g,st){ const A=[50,150], B=[252,140], C=[150,40];
  const d=2*(A[0]*(B[1]-C[1])+B[0]*(C[1]-A[1])+C[0]*(A[1]-B[1]));
  const q=p=>p[0]*p[0]+p[1]*p[1];
  const M=[(q(A)*(B[1]-C[1])+q(B)*(C[1]-A[1])+q(C)*(A[1]-B[1]))/d,
           (q(A)*(C[0]-B[0])+q(B)*(A[0]-C[0])+q(C)*(B[0]-A[0]))/d];
  const R=Math.hypot(A[0]-M[0],A[1]-M[1]);
  const drei=(neu)=>{ const col=CL(neu); L(g,A[0],A[1],B[0],B[1],col,BD(neu)); L(g,B[0],B[1],C[0],C[1],col,BD(neu));
    L(g,C[0],C[1],A[0],A[1],col,BD(neu)); PKT(g,A[0],A[1],'A',-12,9); PKT(g,B[0],B[1],'B',12,9); PKT(g,C[0],C[1],'C',0,-13); };
  malen(g,st,[
   [0,drei],
   [1,neu=>{ if(!neu) return; KREIS(g,M[0],M[1],R,FARB.neu,1.5,[6,5]);
             [A,B,C].forEach(P=>{ L(g,M[0],M[1],P[0],P[1],FARB.neu,1.3,[4,4]); MARK(g,M[0],M[1],P[0],P[1],1,FARB.neu); });
             TXT(g,150,236,'durch A, B und C – gleicher Abstand',FARB.neu,11.5); }],
   [2,neu=>{ if(!neu) return; const m=[(A[0]+B[0])/2,(A[1]+B[1])/2];
             PKT(g,m[0],m[1],'',0,0,FARB.neu); MARK(g,A[0],A[1],m[0],m[1],1,FARB.neu); MARK(g,m[0],m[1],B[0],B[1],1,FARB.neu);
             TXT(g,150,236,'gleich weit von A und B: Mittelsenkrechte',FARB.neu,11.5); }],
   [3,neu=>{ msBogen(g,A,B,CL(neu,FARB.hilf),neu?2:1.3,34); }],
   [4,neu=>{ msBogen(g,B,C,CL(neu,FARB.hilf),neu?2:1.3,34); }],
   [5,neu=>{ PKT(g,M[0],M[1],'M',-13,-3,CL(neu,FARB.erg)); }],
   [6,neu=>{ msBogen(g,A,C,CL(neu,FARB.hell),neu?2:1.2,30); }],
   [7,neu=>{ if(!neu) return; STICH(g,M[0],M[1],FARB.neu);
             L(g,M[0],M[1],A[0],A[1],FARB.neu,1.7,[6,4]); TXT(g,(M[0]+A[0])/2,(M[1]+A[1])/2-11,'r = MA',FARB.neu,11.5); }],
   [8,neu=>{ KREIS(g,M[0],M[1],R,CL(neu,FARB.erg),neu?2.8:2.2); }],
   [9,neu=>{ if(!neu) return; PKT(g,M[0],M[1],'',0,0,FARB.gru);
             TXT(g,150,236,'spitzwinklig: M innen · stumpfwinklig: M außen',FARB.gru,11.5); }]
  ]); }

/* ---------------- Konstruktion: Inkreis ---------------- */
function fIk(g,st){ const A=[48,200], B=[256,200], C=[140,58];
  const a=Math.hypot(B[0]-C[0],B[1]-C[1]), b=Math.hypot(A[0]-C[0],A[1]-C[1]), c=Math.hypot(A[0]-B[0],A[1]-B[1]);
  const u=a+b+c, M=[(a*A[0]+b*B[0]+c*C[0])/u,(a*A[1]+b*B[1]+c*C[1])/u];
  const fl=Math.abs((B[0]-A[0])*(C[1]-A[1])-(C[0]-A[0])*(B[1]-A[1]))/2, r=2*fl/u;
  const lot=(P,Q)=>{ const dx=Q[0]-P[0],dy=Q[1]-P[1],l2=dx*dx+dy*dy;
    const t=((M[0]-P[0])*dx+(M[1]-P[1])*dy)/l2; return [P[0]+dx*t,P[1]+dy*t]; };
  const F1=lot(A,B), F2=lot(B,C), F3=lot(A,C);
  const drei=(neu)=>{ const col=CL(neu); L(g,A[0],A[1],B[0],B[1],col,BD(neu)); L(g,B[0],B[1],C[0],C[1],col,BD(neu));
    L(g,C[0],C[1],A[0],A[1],col,BD(neu)); PKT(g,A[0],A[1],'A',-12,9); PKT(g,B[0],B[1],'B',12,9); PKT(g,C[0],C[1],'C',0,-13); };
  malen(g,st,[
   [0,drei],
   [1,neu=>{ if(!neu) return; KREIS(g,M[0],M[1],r,FARB.neu,1.5,[6,5]);
             [F1,F2,F3].forEach(F=>{ L(g,M[0],M[1],F[0],F[1],FARB.neu,1.3,[4,4]); MARK(g,M[0],M[1],F[0],F[1],1,FARB.neu); });
             TXT(g,150,236,'berührt alle drei Seiten – gleicher Abstand',FARB.neu,11.5); }],
   [2,neu=>{ if(neu) TXT(g,150,236,'gleicher Abstand von zwei Seiten: Winkelhalbierende',FARB.neu,11.5); }],
   [3,neu=>{ whBogen(g,A,B,C,CL(neu,FARB.hilf),neu?2:1.3,150); }],
   [4,neu=>{ whBogen(g,B,A,C,CL(neu,FARB.hilf),neu?2:1.3,150); }],
   [5,neu=>{ PKT(g,M[0],M[1],'M',-13,-4,CL(neu,FARB.erg)); }],
   [6,neu=>{ const col=CL(neu,FARB.hilf); L(g,M[0],M[1],F1[0],F1[1],col,1.7,[5,4]);
             RECHT(g,F1[0],F1[1],-Math.PI/2,0,col); }],
   [7,neu=>{ const col=CL(neu,FARB.gru); L(g,M[0],M[1],F1[0],F1[1],col,2);
             TXT(g,M[0]+13,(M[1]+F1[1])/2,'r',col,12.5,'left',true); }],
   [8,neu=>{ KREIS(g,M[0],M[1],r,CL(neu,FARB.erg),neu?2.8:2.2); }],
   [9,neu=>{ const col=CL(neu,FARB.gru); [F1,F2,F3].forEach(F=>PKT(g,F[0],F[1],'',0,0,col));
             if(neu) TXT(g,150,236,'jede Seite wird genau einmal berührt',col,11.5); }]
  ]); }

/* ---------------- Dreieckskonstruktionen ---------------- */
const DA=[52,205], DB=[248,205];                        /* c = 196 px */
function seiten(g,A,B,C,neu,ohneC){ const col=CL(neu,FARB.erg);
  if(!ohneC){ L(g,A[0],A[1],C[0],C[1],col,neu?2.8:2.2); L(g,B[0],B[1],C[0],C[1],col,neu?2.8:2.2); } }
function fSss(g,st){ const c=168, b=144, a=122, DA=[66,175], DB=[DA[0]+c,175];
  const x=(c*c+b*b-a*a)/(2*c), y=Math.sqrt(b*b-x*x), C=[DA[0]+x,DA[1]-y];
  const aB=Math.atan2(C[1]-DA[1],C[0]-DA[0]), aA=Math.atan2(C[1]-DB[1],C[0]-DB[0]);
  if(st<=2){ if(st<=1){ strecke(g,58,100,c,'c',st===0); strecke(g,58,145,b,'b',st===0); strecke(g,58,190,a,'a',st===0);
      TXT(g,150,60,'gegeben: drei Seiten',FARB.hilf,11.5);
      if(st===1){ TXT(g,150,226,'a + b > c  und  a + c > b  und  b + c > a  ✓',FARB.neu,12,'center',true); } }
    else planfigur(g); return; }
  malen(g,st,[
   [3,neu=>{ L(g,DA[0],DA[1],DB[0],DB[1],CL(neu),BD(neu)); PKT(g,DA[0],DA[1],'A',-12,9); PKT(g,DB[0],DB[1],'B',12,9);
             TXT(g,150,222,'c',FARB.lin,12.5,'center',true); }],
   [4,neu=>{ if(!neu) return; STICH(g,DA[0],DA[1],FARB.neu);
             L(g,DA[0],DA[1],DA[0]+Math.cos(-0.4)*b,DA[1]+Math.sin(-0.4)*b,FARB.neu,1.6,[6,4]);
             TXT(g,DA[0]+52,DA[1]-42,'r = b',FARB.neu,11.5); }],
   [5,neu=>{ BOG(g,DA[0],DA[1],b,aB-0.45,aB+0.45,CL(neu,FARB.hilf),neu?2:1.3); }],
   [6,neu=>{ if(!neu) return; STICH(g,DB[0],DB[1],FARB.neu);
             L(g,DB[0],DB[1],DB[0]+Math.cos(Math.PI+0.4)*a,DB[1]-Math.sin(0.4)*a,FARB.neu,1.6,[6,4]);
             TXT(g,DB[0]-52,DB[1]-42,'r = a',FARB.neu,11.5); }],
   [7,neu=>{ BOG(g,DB[0],DB[1],a,aA-0.45,aA+0.45,CL(neu,FARB.hilf),neu?2:1.3); }],
   [8,neu=>{ PKT(g,C[0],C[1],'C',4,-13,CL(neu,FARB.erg)); }],
   [9,neu=>seiten(g,DA,DB,C,neu)],
   [10,neu=>{ const col=CL(neu,FARB.gru); MARK(g,DA[0],DA[1],C[0],C[1],1,col); MARK(g,DB[0],DB[1],C[0],C[1],2,col);
              TXT(g,(DA[0]+C[0])/2-15,(DA[1]+C[1])/2,'b',col,12.5,'center',true);
              TXT(g,(DB[0]+C[0])/2+15,(DB[1]+C[1])/2,'a',col,12.5,'center',true); }],
   [11,neu=>{ const col=neu?FARB.neu:FARB.hell, C2=[C[0],2*DA[1]-C[1]];
              L(g,DA[0],DA[1],C2[0],C2[1],col,1.5,[5,4]); L(g,DB[0],DB[1],C2[0],C2[1],col,1.5,[5,4]);
              PKT(g,C2[0],C2[1],'C′',6,12,col);
              if(neu) TXT(g,150,24,'die Lösung unterhalb ist die Spiegelung',FARB.neu,11.5); }]
  ]); }
function fSws(g,st){ const b=168, al=-50*Math.PI/180, C=[DA[0]+Math.cos(al)*b, DA[1]+Math.sin(al)*b];
  if(st<=2){ if(st===0){ strecke(g,52,70,196,'c',true); strecke(g,52,120,b,'b',true);
      winkelStueck(g,70,205,50,'α',true); TXT(g,150,34,'gegeben: b, c und der Winkel α dazwischen',FARB.hilf,11.5); }
    else if(st===1) planfigur(g);
    else { planfigur(g); TXT(g,150,246,'α liegt zwischen b und c  ✓',FARB.neu,12,'center',true); } return; }
  malen(g,st,[
   [3,neu=>{ L(g,DA[0],DA[1],DB[0],DB[1],CL(neu),BD(neu)); PKT(g,DA[0],DA[1],'A',-12,9); PKT(g,DB[0],DB[1],'B',12,9);
             TXT(g,150,222,'c',FARB.lin,12.5,'center',true); }],
   [4,neu=>{ const col=CL(neu,FARB.hilf);
             L(g,DA[0],DA[1],DA[0]+Math.cos(al)*225,DA[1]+Math.sin(al)*225,col,neu?2.2:1.5,[7,5]);
             WNK(g,DA[0],DA[1],34,al,0,neu?FARB.neu:FARB.gru,'α'); }],
   [5,neu=>{ if(!neu) return; STICH(g,DA[0],DA[1],FARB.neu);
             L(g,DA[0],DA[1],DA[0]+Math.cos(al-0.33)*b,DA[1]+Math.sin(al-0.33)*b,FARB.neu,1.6,[6,4]);
             TXT(g,DA[0]+26,DA[1]-62,'r = b',FARB.neu,11.5); }],
   [6,neu=>{ BOG(g,DA[0],DA[1],b,al-0.42,al+0.42,CL(neu,FARB.hilf),neu?2:1.3); }],
   [7,neu=>{ PKT(g,C[0],C[1],'C',6,-12,CL(neu,FARB.erg)); }],
   [8,neu=>{ const col=CL(neu,FARB.erg); L(g,DA[0],DA[1],C[0],C[1],col,2.2);
             L(g,DB[0],DB[1],C[0],C[1],neu?FARB.neu:col,neu?2.8:2.2); }],
   [9,neu=>{ const col=CL(neu,FARB.gru); MARK(g,DA[0],DA[1],C[0],C[1],1,col);
             TXT(g,(DA[0]+C[0])/2-16,(DA[1]+C[1])/2,'b',col,12.5,'center',true); }],
   [10,neu=>{ TXT(g,150,240,'SWS: das Dreieck ist eindeutig bestimmt',CL(neu,FARB.hilf),11.5); }]
  ]); }
function fWsw(g,st){ const al=-52*Math.PI/180, be=Math.PI+40*Math.PI/180;
  const t=(DB[0]-DA[0])*Math.sin(be)/(Math.cos(al)*Math.sin(be)-Math.sin(al)*Math.cos(be));
  const C=[DA[0]+Math.cos(al)*t, DA[1]+Math.sin(al)*t];
  if(st<=2){ if(st===0){ strecke(g,52,80,196,'c',true); winkelStueck(g,60,170,52,'α',true); winkelStueck(g,185,170,40,'β',true);
      TXT(g,150,40,'gegeben: c und die anliegenden Winkel α, β',FARB.hilf,11.5); }
    else if(st===1){ winkelStueck(g,60,120,52,'α',false); winkelStueck(g,185,120,40,'β',false);
      TXT(g,150,180,'α + β = 52° + 40° = 92° < 180°  ✓',FARB.neu,12.5,'center',true);
      TXT(g,150,208,'nur dann schneiden sich die Schenkel',FARB.hilf,11.5); }
    else planfigur(g); return; }
  malen(g,st,[
   [3,neu=>{ L(g,DA[0],DA[1],DB[0],DB[1],CL(neu),BD(neu)); PKT(g,DA[0],DA[1],'A',-12,9); PKT(g,DB[0],DB[1],'B',12,9);
             TXT(g,150,222,'c',FARB.lin,12.5,'center',true); }],
   [4,neu=>{ const col=CL(neu,FARB.hilf); L(g,DA[0],DA[1],DA[0]+Math.cos(al)*t*1.18,DA[1]+Math.sin(al)*t*1.18,col,neu?2.2:1.5,[7,5]);
             WNK(g,DA[0],DA[1],34,al,0,neu?FARB.neu:FARB.gru,'α'); }],
   [5,neu=>{ WNK(g,DB[0],DB[1],34,Math.PI,be,neu?FARB.neu:FARB.gru,'β'); }],
   [6,neu=>{ const col=CL(neu,FARB.hilf); const t2=Math.hypot(C[0]-DB[0],C[1]-DB[1])*1.18;
             L(g,DB[0],DB[1],DB[0]+Math.cos(be)*t2,DB[1]+Math.sin(be)*t2,col,neu?2.2:1.5,[7,5]); }],
   [7,neu=>{ PKT(g,C[0],C[1],'C',0,-13,CL(neu,FARB.erg)); }],
   [8,neu=>seiten(g,DA,DB,C,neu)],
   [9,neu=>{ const col=CL(neu,FARB.gru);
             const cA=Math.atan2(DA[1]-C[1],DA[0]-C[0]), cB=Math.atan2(DB[1]-C[1],DB[0]-C[0]);
             WNK(g,C[0],C[1],30,cA,cB,col,'γ');
             TXT(g,150,240,'α + β + γ = 180°  zur Probe',col,11.5); }],
   [10,neu=>{ TXT(g,150,22,'WSW: eindeutig bestimmt',CL(neu,FARB.hilf),11.5); }]
  ]); }
function fSsw(g,st){ const A=[72,195], B=[218,195], c=146, a=172, al=-40*Math.PI/180;
  const dx=Math.cos(al), dy=Math.sin(al);
  const ex=A[0]-B[0], ey=A[1]-B[1], pb=2*(ex*dx+ey*dy), pc=ex*ex+ey*ey-a*a;
  const t=(-pb+Math.sqrt(pb*pb-4*pc))/2, C=[A[0]+dx*t, A[1]+dy*t];
  if(st<=2){ if(st===0){ strecke(g,52,74,a,'a',true); strecke(g,52,124,c,'c',true); winkelStueck(g,70,200,40,'α',true);
      TXT(g,150,36,'gegeben: a, c und α – mit a > c',FARB.hilf,11.5); }
    else if(st===1){ strecke(g,52,80,a,'a',false); strecke(g,52,125,c,'c',false);
      TXT(g,150,170,'α liegt der längeren Seite a gegenüber  ✓',FARB.neu,12,'center',true);
      TXT(g,150,198,'nur dann ist die Konstruktion eindeutig',FARB.hilf,11.5); }
    else planfigur(g); return; }
  malen(g,st,[
   [3,neu=>{ L(g,A[0],A[1],B[0],B[1],CL(neu),BD(neu)); PKT(g,A[0],A[1],'A',-12,9); PKT(g,B[0],B[1],'B',12,9);
             TXT(g,(A[0]+B[0])/2,212,'c',FARB.lin,12.5,'center',true); }],
   [4,neu=>{ const col=CL(neu,FARB.hilf); L(g,A[0],A[1],A[0]+dx*t*1.14,A[1]+dy*t*1.14,col,neu?2.2:1.5,[7,5]);
             WNK(g,A[0],A[1],32,al,0,neu?FARB.neu:FARB.gru,'α'); }],
   [5,neu=>{ if(!neu) return; STICH(g,B[0],B[1],FARB.neu);
             L(g,B[0],B[1],B[0]+Math.cos(-2.1)*a,B[1]+Math.sin(-2.1)*a,FARB.neu,1.6,[6,4]);
             TXT(g,B[0]-8,B[1]-34,'r = a',FARB.neu,11.5,'left'); }],
   [6,neu=>{ const aB=Math.atan2(C[1]-B[1],C[0]-B[0]); BOG(g,B[0],B[1],a,aB-0.42,aB+0.42,CL(neu,FARB.hilf),neu?2:1.3); }],
   [7,neu=>{ PKT(g,C[0],C[1],'C',8,-11,CL(neu,FARB.erg));
             if(neu) TXT(g,150,24,'genau ein Schnittpunkt',FARB.neu,11.5); }],
   [8,neu=>{ L(g,A[0],A[1],C[0],C[1],FARB.erg,2.2); L(g,B[0],B[1],C[0],C[1],CL(neu,FARB.erg),neu?2.8:2.2); }],
   [9,neu=>{ const col=CL(neu,FARB.gru); MARK(g,B[0],B[1],C[0],C[1],1,col);
             TXT(g,(B[0]+C[0])/2+15,(B[1]+C[1])/2,'a',col,12.5,'left',true); }],
   [10,neu=>{ /* Gegenfall: kürzere Seite gegenüber – zwei Schnittpunkte */
             const col=neu?FARB.neu:FARB.hilf, a2=112;
             const pc2=ex*ex+ey*ey-a2*a2, t1=(-pb-Math.sqrt(pb*pb-4*pc2))/2, t2=(-pb+Math.sqrt(pb*pb-4*pc2))/2;
             const C1=[A[0]+dx*t1,A[1]+dy*t1], C2=[A[0]+dx*t2,A[1]+dy*t2];
             const b1=Math.atan2(C1[1]-B[1],C1[0]-B[0]), b2=Math.atan2(C2[1]-B[1],C2[0]-B[0]);
             BOG(g,B[0],B[1],a2,Math.min(b1,b2)-0.25,Math.max(b1,b2)+0.25,col,1.6,[5,4]);
             PKT(g,C1[0],C1[1],'C₁',-13,-6,col); PKT(g,C2[0],C2[1],'C₂',12,-6,col);
             TXT(g,150,236,'a < c: zwei Lösungen – nicht eindeutig',col,11.5); }]
  ]); }

/* ---------------- Beweis: Satz des Thales ---------------- */
function fThales(g,st){ const M=[150,170], R=112, A=[M[0]-R,M[1]], B=[M[0]+R,M[1]], w=-2.0;
  const C=[M[0]+Math.cos(w)*R, M[1]+Math.sin(w)*R];
  const aA=Math.atan2(C[1]-A[1],C[0]-A[0]), aB=Math.atan2(C[1]-B[1],C[0]-B[0]);
  const cA=Math.atan2(A[1]-C[1],A[0]-C[0]), cM=Math.atan2(M[1]-C[1],M[0]-C[0]), cB=Math.atan2(B[1]-C[1],B[0]-C[0]);
  malen(g,st,[
   [0,neu=>{ const col=CL(neu,FARB.lin); BOG(g,M[0],M[1],R,Math.PI,2*Math.PI,neu?FARB.neu:FARB.hilf,neu?2.4:1.6);
             L(g,A[0],A[1],B[0],B[1],col,BD(neu));
             PKT(g,A[0],A[1],'A',-12,10); PKT(g,B[0],B[1],'B',12,10); PKT(g,M[0],M[1],'M',2,14); PKT(g,C[0],C[1],'C',-6,-13); }],
   [1,neu=>{ const col=CL(neu,FARB.lin); L(g,A[0],A[1],C[0],C[1],col,BD(neu)); L(g,B[0],B[1],C[0],C[1],col,BD(neu));
             RECHT(g,C[0],C[1],cA,cB,neu?FARB.neu:FARB.erg);
             if(neu) TXT(g,C[0]+34,C[1]+24,'90° ?',FARB.neu,12.5,'left',true); }],
   [2,neu=>{ const col=CL(neu,FARB.gru); L(g,M[0],M[1],C[0],C[1],col,neu?2.4:1.7,[6,4]);
             MARK(g,M[0],M[1],A[0],A[1],1,col); MARK(g,M[0],M[1],B[0],B[1],1,col); MARK(g,M[0],M[1],C[0],C[1],1,col);
             if(neu) TXT(g,150,236,'MA = MB = MC = r',col,12); }],
   [3,neu=>{ if(neu){ g.save(); g.fillStyle='rgba(220,38,38,.10)'; g.beginPath();
               g.moveTo(A[0],A[1]); g.lineTo(M[0],M[1]); g.lineTo(C[0],C[1]); g.closePath(); g.fill(); g.restore();
               TXT(g,150,22,'Dreieck AMC ist gleichschenklig',FARB.neu,11.5); } }],
   [4,neu=>{ const col=neu?FARB.neu:FARB.erg; WNK(g,A[0],A[1],32,aA,0,col,'α'); WNK(g,C[0],C[1],26,cA,cM,col,'α'); }],
   [5,neu=>{ const col=neu?FARB.neu:FARB.erg; WNK(g,B[0],B[1],32,Math.PI,aB,col,'β'); WNK(g,C[0],C[1],38,cM,cB,col,'β'); }],
   [6,neu=>{ if(neu) TXT(g,150,22,'Winkel bei C = α + β',FARB.neu,12.5,'center',true); }],
   [7,neu=>{ if(neu) TXT(g,150,236,'α + β + (α + β) = 180°',FARB.neu,12.5,'center',true); }],
   [8,neu=>{ RECHT(g,C[0],C[1],cA,cB,neu?FARB.neu:FARB.gru);
             TXT(g,C[0]+34,C[1]+24,'90°',neu?FARB.neu:FARB.gru,12.5,'left',true); }]
  ]); }

/* ---------------- Beweis: Winkelsumme im Dreieck ---------------- */
function fWsumme(g,st){ const A=[48,200], B=[256,194], C=[138,74];
  const aA=Math.atan2(C[1]-A[1],C[0]-A[0]), aB=Math.atan2(C[1]-B[1],C[0]-B[0]);
  const cA=Math.atan2(A[1]-C[1],A[0]-C[0]), cB=Math.atan2(B[1]-C[1],B[0]-C[0]);
  const ab=Math.atan2(B[1]-A[1],B[0]-A[0]);
  const pL=[C[0]-120*Math.cos(ab),C[1]-120*Math.sin(ab)], pR=[C[0]+140*Math.cos(ab),C[1]+140*Math.sin(ab)];
  malen(g,st,[
   [0,neu=>{ const col=CL(neu); L(g,A[0],A[1],B[0],B[1],col,BD(neu)); L(g,B[0],B[1],C[0],C[1],col,BD(neu));
             L(g,C[0],C[1],A[0],A[1],col,BD(neu));
             PKT(g,A[0],A[1],'A',-12,10); PKT(g,B[0],B[1],'B',12,10); PKT(g,C[0],C[1],'C',0,-13);
             WNK(g,A[0],A[1],32,aA,0,FARB.gru,'α'); WNK(g,B[0],B[1],32,Math.PI,aB,FARB.erg,'β');
             WNK(g,C[0],C[1],28,cA,cB,FARB.lin,'γ'); }],
   [1,neu=>{ if(neu) TXT(g,150,236,'α + β + γ = 180° ?',FARB.neu,12.5,'center',true); }],
   [2,neu=>{ L(g,pL[0],pL[1],pR[0],pR[1],CL(neu,FARB.erg),neu?2.6:1.9,[7,5]);
             TXT(g,pR[0]-4,pR[1]-12,'p',CL(neu,FARB.erg),12.5,'right',true); }],
   [3,neu=>{ const col=CL(neu,FARB.erg);
             MARK(g,C[0],C[1],pR[0],pR[1],2,col); MARK(g,A[0],A[1],B[0],B[1],2,col);
             if(neu) TXT(g,150,236,'p parallel zu AB – Parallelenaxiom',FARB.neu,11.5); }],
   [4,neu=>{ const col=CL(neu,FARB.hilf); L(g,A[0],A[1],C[0]+(C[0]-A[0])*0.30,C[1]+(C[1]-A[1])*0.30,col,neu?2.2:1.4,[6,4]); }],
   [5,neu=>{ const col=neu?FARB.neu:FARB.gru; WNK(g,C[0],C[1],26,Math.atan2(pL[1]-C[1],pL[0]-C[0]),cA,col,'α'); }],
   [6,neu=>{ const col=neu?FARB.neu:FARB.erg; L(g,B[0],B[1],C[0]+(C[0]-B[0])*0.30,C[1]+(C[1]-B[1])*0.30,
               neu?FARB.neu:FARB.hilf,neu?2.2:1.4,[6,4]);
             WNK(g,C[0],C[1],26,cB,Math.atan2(pR[1]-C[1],pR[0]-C[0]),col,'β'); }],
   [7,neu=>{ if(neu) TXT(g,150,236,'bei C liegen α, γ und β nebeneinander',FARB.neu,12,'center',true); }],
   [8,neu=>{ const col=neu?FARB.neu:FARB.gru;
             BOG(g,C[0],C[1],46,Math.atan2(pL[1]-C[1],pL[0]-C[0]),Math.atan2(pR[1]-C[1],pR[0]-C[0]),col,2);
             TXT(g,C[0],C[1]-30,'180°',col,12.5,'center',true); }],
   [9,neu=>{ if(neu) TXT(g,150,236,'α + γ + β = 180° – für jedes Dreieck',FARB.neu,12,'center',true); }]
  ]); }

/* ---------------- Physik: Feld- und Stromsymbole ---------------- */
const MAG={n:'#ea580c', s:'#2563eb', cu:'#b45309'};
function KREUZ(g,x,y,r,col){ g.save(); g.strokeStyle=col||FARB.lin; g.fillStyle='#fff'; g.lineWidth=1.7;
  g.beginPath(); g.arc(x,y,r,0,7); g.fill(); g.stroke(); const d=r*0.68;
  g.beginPath(); g.moveTo(x-d,y-d); g.lineTo(x+d,y+d); g.moveTo(x+d,y-d); g.lineTo(x-d,y+d); g.stroke(); g.restore(); }
function PUNKTF(g,x,y,r,col){ g.save(); g.strokeStyle=col||FARB.lin; g.fillStyle='#fff'; g.lineWidth=1.7;
  g.beginPath(); g.arc(x,y,r,0,7); g.fill(); g.stroke();
  g.fillStyle=col||FARB.lin; g.beginPath(); g.arc(x,y,2.3,0,7); g.fill(); g.restore(); }
function ELL(g,cx,cy,rx,ry,col,bd,dash){ g.save(); g.strokeStyle=col||FARB.hilf; g.lineWidth=bd||1.4;
  if(dash) g.setLineDash(dash); g.beginPath(); g.ellipse(cx,cy,rx,ry,0,0,7); g.stroke(); g.restore(); }
function ELLSPITZE(g,cx,cy,rx,ry,col,nachRechts){ const x=cx, y=cy+ry, d=nachRechts?1:-1;
  L(g,x,y,x-d*10,y-5,col,2.2); L(g,x,y,x-d*10,y+5,col,2.2); }
function LADUNG(g,x,y,col){ g.save(); g.strokeStyle=col||FARB.lin; g.fillStyle='#fff'; g.lineWidth=1.4;
  g.beginPath(); g.arc(x,y,6,0,7); g.fill(); g.stroke(); g.lineWidth=1.6;
  g.beginPath(); g.moveTo(x-3,y); g.lineTo(x+3,y); g.moveTo(x,y-3); g.lineTo(x,y+3); g.stroke(); g.restore(); }
function DURCH(g,x1,y1,x2,y2,col){ L(g,x1,y1,x2,y2,col||FARB.neu,2.4); }   /* Durchstreichen */
function KUGEL(g,cx,cy,r,blass){
  g.save(); g.lineWidth=1.6;
  g.fillStyle=blass?'#fde7d7':'#fdba74'; g.strokeStyle=blass?'#e9c3a8':MAG.n;
  g.beginPath(); g.arc(cx,cy,r,Math.PI,0); g.closePath(); g.fill(); g.stroke();
  g.fillStyle=blass?'#dbe7fb':'#93c5fd'; g.strokeStyle=blass?'#c3d4ee':MAG.s;
  g.beginPath(); g.arc(cx,cy,r,0,Math.PI); g.closePath(); g.fill(); g.stroke(); g.restore();
  TXT(g,cx,cy-r*0.45,'N',blass?'#d9b79a':MAG.n,r*0.62,'center',true);
  TXT(g,cx,cy+r*0.45,'S',MAG.s,r*0.62,'center',true); }

/* ---------------- Kraft zwischen zwei parallelen Leitern ---------------- */
function fLeiter(g,st){
  const x1=92, x2=178, yo=56, yu=268, ym=162;
  const ix1=252, ix2=300, iyo=112, iyu=252, iym=186;     /* Nebenbild: Gegenfall */
  const draht=(x,y0,y1,col,bd)=>L(g,x,y0,x,y1,col,bd||3.2);
  const hinweis=(t)=>TXT(g,150,26,t,FARB.neu,11.5);
  malen(g,st,[
   [0,neu=>{ const col=CL(neu); draht(x1,yo,yu,col); draht(x2,yo,yu,col);
     PFEIL(g,x1,yo+46,x1,yo+6,col,2.4); PFEIL(g,x2,yo+46,x2,yo+6,col,2.4);
     TXT(g,x1-11,yo+26,'I₁',col,13,'right',true); TXT(g,x2+11,yo+26,'I₂',col,13,'left',true); }],
   [1,neu=>{ if(!neu) return; PFEIL(g,x1+9,yu+16,x1+34,yu+16,FARB.neu,2.6);
     PFEIL(g,x2-9,yu+16,x2-34,yu+16,FARB.neu,2.6);
     TXT(g,135,yu+34,'Beobachtung: sie ziehen sich an',FARB.neu,11.5); }],
   [2,neu=>{ const col=CL(neu,FARB.hilf); [30,58,86].forEach(r=>ELL(g,x1,ym,r,r*0.26,col,neu?1.9:1.3));
     TXT(g,x1,ym-32,'B₁',col,12.5,'center',true); }],
   [3,neu=>{ const col=neu?FARB.neu:FARB.hilf;
     PUNKTF(g,x1-58,ym,8,col); KREUZ(g,x1+58,ym,8,col);
     if(neu) hinweis('Rechte-Hand-Regel: Daumen = I₁'); }],
   [4,neu=>{ const col=neu?FARB.neu:FARB.lin; KREUZ(g,x2,ym,9,col);
     TXT(g,x2+15,ym-13,'B₁',col,12.5,'left',true);
     if(neu) hinweis('am zweiten Draht: B₁ senkrecht ins Blatt'); }],
   [5,neu=>{ const col=neu?FARB.neu:FARB.lin; [-58,-34,34].forEach(d=>LADUNG(g,x2,ym+d,col));
     if(neu){ PFEIL(g,x2+22,ym+70,x2+22,ym+44,FARB.neu,2); TXT(g,x2+30,ym+58,'v',FARB.neu,12.5,'left',true);
       hinweis('im zweiten Draht bewegen sich Ladungen'); } }],
   [6,neu=>{ if(!neu) return; PFEIL(g,x2-10,ym-34,x2-44,ym-34,FARB.neu,2.4);
     TXT(g,x2-27,ym-48,'F',FARB.neu,12.5,'center',true); hinweis('Lorentzkraft auf jede bewegte Ladung'); }],
   [7,neu=>{ const col=neu?FARB.neu:FARB.erg; PFEIL(g,x2-7,ym+76,x2-36,ym+76,col,3);
     TXT(g,x2-21,ym+62,'F₂',col,13,'center',true); }],
   [8,neu=>{ const col=neu?FARB.neu:FARB.lin;
     draht(ix1,iyo,iyu,col,2.6); draht(ix2,iyo,iyu,col,2.6);
     PFEIL(g,ix1,iyo+40,ix1,iyo+4,col,2.2); PFEIL(g,ix2,iyu-40,ix2,iyu-4,col,2.2);
     TXT(g,ix1-10,iyo+22,'I₁',col,12,'right',true); TXT(g,ix2+10,iyu-22,'I₂',col,12,'left',true);
     PFEIL(g,ix1-6,iym,ix1-30,iym,col,2.4); PFEIL(g,ix2+6,iym,ix2+30,iym,col,2.4);
     TXT(g,276,iyo-16,'Gegenfall',col,11.5);
     if(neu) hinweis('Richtung: Drei-Finger-Regel'); }],
   [9,neu=>{ const col=neu?FARB.neu:FARB.gru;
     TXT(g,135,yu+52,'gleiche Richtung → Anziehung',col,11.5);
     TXT(g,276,iyu+18,'entgegengesetzt',col,11); TXT(g,276,iyu+32,'→ Abstoßung',col,11); }],
   [10,neu=>{ const col=neu?FARB.neu:FARB.erg; PFEIL(g,x1+7,ym+76,x1+36,ym+76,col,3);
     TXT(g,x1+21,ym+62,'F₁',col,13,'center',true);
     if(neu) hinweis('Wechselwirkung: F₁ = F₂, entgegengesetzt'); }],
   [11,neu=>{ const col=neu?FARB.neu:FARB.hilf;
     PFEIL(g,x1+5,yo+58,x2-5,yo+58,col,1.6); PFEIL(g,x2-5,yo+58,x1+5,yo+58,col,1.6);
     TXT(g,135,yo+46,'r',col,12.5,'center',true);
     if(neu) hinweis('F wächst mit I₁ und I₂ und nimmt mit r ab'); }]
  ]); }

/* ---------------- Magnetkugel fällt durch ein Kupferrohr ---------------- */
function fRohr(g,st){
  const w1=62, w2=170, yo=46, yu=300, cx=(w1+w2)/2;
  const ky=152, kr=22;                                    /* Kugel im Kupferrohr */
  const p1=246, p2=304, py=268, pr=16;                    /* Kunststoffrohr */
  const ru=[cx,214,54,13], ro=[cx,92,54,13];              /* Ringe unten / oben */
  const rohr=(a,b,col,bd)=>{ L(g,a,yo,a,yu,col,bd); L(g,b,yo,b,yu,col,bd); };
  malen(g,st,[
   [0,neu=>{ const col=neu?FARB.neu:MAG.cu; rohr(w1,w2,col,4);
     rohr(p1,p2,neu?FARB.neu:FARB.hilf,2.4);
     KUGEL(g,cx,ky,kr); KUGEL(g,p2-(p2-p1)/2,py,pr);
     TXT(g,cx,yo-14,'Kupfer',MAG.cu,12,'center',true); TXT(g,275,yo-14,'Kunststoff',FARB.hilf,12,'center',true);
     TXT(g,cx,yu+18,'mehrere Sekunden',FARB.lin,11.5); TXT(g,275,yu+18,'Bruchteile',FARB.lin,11.5); }],
   [1,neu=>{ if(!neu) return; const y=ky, mx=(cx+kr+w2)/2;
     PFEIL(g,cx+kr+4,y,w2-6,y,FARB.hilf,2);
     DURCH(g,mx-9,y-9,mx+9,y+9,FARB.neu); DURCH(g,mx+9,y-9,mx-9,y+9,FARB.neu);
     TXT(g,170,yu+36,'Kupfer ist nicht magnetisch – keine Anziehung',FARB.neu,11.5); }],
   [2,neu=>{ const col=neu?FARB.neu:FARB.hilf;
     [1,-1].forEach(s=>{ g.save(); g.strokeStyle=col; g.lineWidth=neu?1.8:1.3; g.setLineDash([5,4]);
       g.beginPath(); g.moveTo(cx+s*2,ky-kr-2);
       g.bezierCurveTo(cx+s*46,ky-kr-26, cx+s*46,ky+kr+26, cx+s*2,ky+kr+2); g.stroke(); g.restore(); });
     PFEIL(g,150,ky-10,150,ky+30,col,2.2); TXT(g,158,ky+12,'v',col,12.5,'left',true); }],
   [3,neu=>{ const col=neu?FARB.neu:FARB.lin; ELL(g,ru[0],ru[1],ru[2],ru[3],col,neu?2.4:1.7);
     if(neu){ [-26,0,26].forEach(d=>PFEIL(g,ru[0]+d,ru[1]-24,ru[0]+d,ru[1]-4,FARB.neu,1.6));
       TXT(g,cx,yu+36,'Fluss durch den Ring ändert sich',FARB.neu,11.5); } }],
   [4,neu=>{ if(!neu) return; TXT(g,ru[0]+ru[2]+8,ru[1]-16,'Uind',FARB.neu,12.5,'left',true);
     TXT(g,cx,yu+36,'Induktionsgesetz: Spannung wird induziert',FARB.neu,11.5); }],
   [5,neu=>{ const col=neu?FARB.neu:FARB.erg; ELL(g,ru[0],ru[1],ru[2],ru[3],col,neu?2.4:1.9);
     ELLSPITZE(g,ru[0],ru[1],ru[2],ru[3],col,true);
     TXT(g,ru[0]-ru[2]-8,ru[1]+2,'Iind',col,12.5,'right',true);
     if(neu) TXT(g,cx,yu+36,'Kupfer leitet: es fließen Wirbelströme',FARB.neu,11.5); }],
   [6,neu=>{ const col=neu?FARB.neu:FARB.hilf; PFEIL(g,ru[0],ru[1]+22,ru[0],ru[1]-22,col,2);
     TXT(g,ru[0]+10,ru[1]+30,'Bind',col,12,'left',true); }],
   [7,neu=>{ if(!neu) return; TXT(g,ru[0]+ru[2]+10,ru[1]+14,'?',FARB.neu,17,'left',true);
     TXT(g,cx,yu+36,'Stromrichtung? Das klärt die Energiebilanz',FARB.neu,11.5); }],
   [8,neu=>{ const col=neu?FARB.neu:FARB.hilf;
     PFEIL(g,208,yo+4,208,yu-4,col,1.6); PFEIL(g,208,yu-4,208,yo+4,col,1.6);
     TXT(g,216,(yo+yu)/2,'h',col,13,'left',true);
     if(neu) TXT(g,170,yu+54,'gleiche Höhe → gleiche Lageenergie',FARB.neu,11.5); }],
   [9,neu=>{ const col=neu?FARB.neu:FARB.lin;
     TXT(g,w1-6,ky+52,'v klein',col,11.5,'right'); TXT(g,275,py-pr-14,'v groß',col,11.5);
     if(neu) TXT(g,170,yu+54,'im Kupferrohr kommt sie langsamer an',FARB.neu,11.5); }],
   [10,neu=>{ if(!neu) return;
     TXT(g,170,yu+54,'fehlende Bewegungsenergie →',FARB.neu,11.5);
     TXT(g,170,yu+70,'elektrische Energie → innere Energie',FARB.neu,11.5); }],
   [11,neu=>{ if(!neu) return; PFEIL(g,w1-18,ky+30,w1-18,ky-18,FARB.hilf,2.2);
     DURCH(g,w1-28,ky+16,w1-8,ky-8,FARB.neu); DURCH(g,w1-8,ky+16,w1-28,ky-8,FARB.neu);
     TXT(g,170,yu+54,'beschleunigt? Dann Energie aus dem Nichts',FARB.neu,11.5); }],
   [12,neu=>{ const col=neu?FARB.neu:FARB.gru; ELL(g,ru[0],ru[1],ru[2],ru[3],col,2.2);
     ELLSPITZE(g,ru[0],ru[1],ru[2],ru[3],col,true);
     if(neu) TXT(g,170,yu+54,'lenzsche Regel: wirkt der Ursache entgegen',FARB.neu,11.5); }],
   [13,neu=>{ const col=neu?FARB.neu:FARB.erg; ELL(g,ro[0],ro[1],ro[2],ro[3],col,2);
     ELLSPITZE(g,ro[0],ro[1],ro[2],ro[3],col,false);
     PFEIL(g,cx-14,ky+kr+32,cx-14,ky+kr+6,col,2.4); PFEIL(g,cx+14,ky-kr-6,cx+14,ky-kr-32,col,2.4);
     TXT(g,ru[0]+ru[2]+8,ru[1]+14,'stößt ab',col,11,'left'); TXT(g,ro[0]+ro[2]+8,ro[1]-14,'zieht an',col,11,'left');
     if(neu) TXT(g,170,yu+54,'beide Kräfte zeigen nach oben',FARB.neu,11.5); }],
   [14,neu=>{ const col=neu?FARB.neu:FARB.gru; const fx=w1+16;
     PFEIL(g,fx,ky-6,fx,ky-50,col,2.8);  TXT(g,fx+8,ky-44,'F',col,12.5,'left',true);
     PFEIL(g,fx,ky+6,fx,ky+50,FARB.lin,2.8); TXT(g,fx+8,ky+44,'Fg',FARB.lin,12.5,'left',true);
     if(neu) TXT(g,170,yu+54,'F = Fg: die Kugel sinkt gleichmäßig',FARB.neu,11.5); }]
  ]); }

/* ---------------- Gesamtfiguren (eine je Aufgabe) ---------------- */
function fPythagoras(g){ const F=[100,200], O=[100,62], W=[268,200];
  L(g,F[0],40,F[0],F[1],FARB.hilf,2.6); L(g,46,F[1],288,F[1],FARB.hilf,2.6);
  TXT(g,62,52,'Wand',FARB.hilf,11,'left'); TXT(g,250,214,'Boden',FARB.hilf,11);
  L(g,F[0],O[1],F[0],F[1],FARB.lin,2); L(g,F[0],F[1],W[0],W[1],FARB.lin,2);
  L(g,W[0],W[1],F[0],O[1],FARB.erg,2.8);
  RECHT(g,F[0],F[1],-Math.PI/2,0,FARB.neu);
  TXT(g,F[0]-10,(O[1]+F[1])/2,'a',FARB.lin,13,'right',true);
  TXT(g,(F[0]+W[0])/2,F[1]+15,'b',FARB.lin,13,'center',true);
  TXT(g,(W[0]+F[0])/2+24,(W[1]+O[1])/2-10,'c',FARB.erg,13,'center',true);
  TXT(g,150,236,'a² + b² = c²  –  c liegt dem rechten Winkel gegenüber',FARB.hilf,11); }
function fStrahlensatz(g){ const Z=[42,206], a1=-0.95, a2=-0.26;
  L(g,Z[0],Z[1],Z[0]+Math.cos(a1)*250,Z[1]+Math.sin(a1)*250,FARB.lin,1.9);
  L(g,Z[0],Z[1],Z[0]+Math.cos(a2)*268,Z[1]+Math.sin(a2)*268,FARB.lin,1.9);
  const t1=98, t2=210;
  const P=t=>[[Z[0]+Math.cos(a1)*t,Z[1]+Math.sin(a1)*t],[Z[0]+Math.cos(a2)*t,Z[1]+Math.sin(a2)*t]];
  const [A,B]=P(t1), [A2,B2]=P(t2);
  L(g,A[0],A[1],B[0],B[1],FARB.erg,2.4); L(g,A2[0],A2[1],B2[0],B2[1],FARB.erg,2.4);
  PKT(g,Z[0],Z[1],'Z',-11,8); PKT(g,A[0],A[1],'A',-12,-4); PKT(g,B[0],B[1],'B',4,14);
  PKT(g,A2[0],A2[1],'A′',-13,-6); PKT(g,B2[0],B2[1],'B′',10,13);
  MARK(g,A[0],A[1],B[0],B[1],2,FARB.erg); MARK(g,A2[0],A2[1],B2[0],B2[1],2,FARB.erg);
  TXT(g,150,238,'ZA : ZA′ = ZB : ZB′ = AB : A′B′',FARB.hilf,11.5); }
function fSchiefe(g){ const Fu=[36,196], Sp=[278,196], Ho=[278,96];
  L(g,Fu[0],Fu[1],Sp[0],Sp[1],FARB.hilf,1.8); L(g,Sp[0],Sp[1],Ho[0],Ho[1],FARB.hilf,1.8);
  L(g,Fu[0],Fu[1],Ho[0],Ho[1],FARB.lin,2.3);
  const al=Math.atan2(Fu[1]-Ho[1],Ho[0]-Fu[0]), t=0.50;
  const K=[Fu[0]+(Ho[0]-Fu[0])*t, Fu[1]-(Fu[1]-Ho[1])*t];
  g.save(); g.translate(K[0],K[1]); g.rotate(-al); g.fillStyle='#dbe3f0'; g.strokeStyle=FARB.lin; g.lineWidth=1.5;
  g.beginPath(); g.rect(-21,-26,42,26); g.fill(); g.stroke(); g.restore();
  const S=[K[0]-Math.sin(al)*13, K[1]-Math.cos(al)*13];
  PFEIL(g,S[0],S[1],S[0],S[1]+66,FARB.lin,2.2);
  const H=[S[0]+Math.cos(Math.PI-al)*50, S[1]-Math.sin(Math.PI-al)*50];
  const N=[S[0]+Math.sin(al)*44, S[1]+Math.cos(al)*44];
  PFEIL(g,S[0],S[1],H[0],H[1],FARB.neu,2.2); PFEIL(g,S[0],S[1],N[0],N[1],FARB.erg,2.2);
  L(g,S[0],S[1]+66,H[0],H[1],FARB.hilf,1.2,[4,3]); L(g,S[0],S[1]+66,N[0],N[1],FARB.hilf,1.2,[4,3]);
  WNK(g,Fu[0],Fu[1],38,-al,0,FARB.gru,'α');
  TXT(g,S[0]+8,S[1]+78,'Fg',FARB.lin,11.5,'left'); TXT(g,H[0]-8,H[1]-10,'FH',FARB.neu,11.5,'right');
  TXT(g,N[0]+9,N[1]+6,'FN',FARB.erg,11.5,'left');
  TXT(g,150,236,'FH = Fg · sin α      FN = Fg · cos α',FARB.hilf,11.5); }
function fLinse(g){ const M=[150,130], f=50, G=[150-112,130];
  L(g,16,M[1],290,M[1],FARB.hilf,1.5);
  g.save(); g.strokeStyle=FARB.erg; g.lineWidth=2.1; g.beginPath(); g.ellipse(M[0],M[1],13,62,0,0,7); g.stroke(); g.restore();
  PKT(g,M[0]-f,M[1],'F',0,14,FARB.hilf); PKT(g,M[0]+f,M[1],'F′',0,14,FARB.hilf);
  const gh=44, Gs=[G[0],M[1]-gh];
  PFEIL(g,G[0],M[1],Gs[0],Gs[1],FARB.lin,2.3);
  const gg=M[0]-G[0], bb=gg*f/(gg-f), B=[M[0]+bb,M[1]], bh=gh*bb/gg, Bs=[B[0],M[1]+bh];
  L(g,Gs[0],Gs[1],M[0],Gs[1],FARB.neu,1.7); L(g,M[0],Gs[1],Bs[0],Bs[1],FARB.neu,1.7);
  L(g,Gs[0],Gs[1],Bs[0],Bs[1],FARB.gru,1.7);
  PFEIL(g,B[0],M[1],Bs[0],Bs[1],FARB.erg,2.3);
  TXT(g,G[0]-7,M[1]+14,'G',FARB.lin,12,'right',true); TXT(g,B[0]+8,M[1]-13,'B',FARB.erg,12,'left',true);
  TXT(g,150,236,'1/f = 1/g + 1/b      Abbildungsmaßstab B/G = b/g',FARB.hilf,11.5); }

/* ---------------- Zuordnung Kette → Figur ---------------- */
const SFIG={ ms:fMs, wh:fWh, uk:fUk, ik:fIk, sss:fSss, sws:fSws, wsw:fWsw, ssw:fSsw, thales:fThales, wsumme:fWsumme,
             leiter:fLeiter, rohr:fRohr };
const SCHRITTBILD={
 'Konstruktion: Mittelsenkrechte einer Strecke':{k:'ms',   z:[0,1,2,3,4,5,6,7,8,9]},
 'Konstruktion: Winkelhalbierende':            {k:'wh',   z:[0,1,2,3,4,5,6,7,8,9]},
 'Konstruktion: Umkreis eines Dreiecks':       {k:'uk',   z:[0,1,2,3,4,5,6,7,8,9]},
 'Konstruktion: Inkreis eines Dreiecks':       {k:'ik',   z:[0,1,2,3,4,5,6,7,8,9]},
 'Konstruktion: Dreieck aus drei Seiten (SSS)':{k:'sss',  z:[0,1,2,3,4,5,6,7,8,9,10,11]},
 'Konstruktion: Dreieck aus zwei Seiten und Zwischenwinkel (SWS)':{k:'sws',z:[0,1,2,3,4,5,6,7,8,9,10]},
 'Konstruktion: Dreieck aus einer Seite und zwei Winkeln (WSW)':  {k:'wsw',z:[0,1,2,3,4,5,6,7,8,9,10]},
 'Konstruktion: Dreieck aus zwei Seiten und Gegenwinkel (SsW)':   {k:'ssw',z:[0,1,2,3,4,5,6,7,8,9,10]},
 'Beweis: Satz des Thales':                    {k:'thales',z:[0,1,2,3,4,5,6,7,7,8]},
 'Beweis: Winkelsumme im Dreieck':             {k:'wsumme',z:[0,1,2,3,4,5,6,7,8,8,9]},
 'Kraft zwischen zwei parallelen Leitern':     {k:'leiter',z:[0,1,2,3,4,5,6,7,8,9,10,11]},
 'Magnetkugel fällt durch ein Kupferrohr':     {k:'rohr',  z:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]}
};
const GESAMTBILD={
 'Vorgehen: Sachaufgabe mit dem Satz des Pythagoras':fPythagoras,
 'Vorgehen: Aufgabe mit dem Strahlensatz':fStrahlensatz,
 'Vorgehen: Kräftezerlegung an der schiefen Ebene':fSchiefe,
 'Vorgehen: Aufgabe mit der Linsengleichung':fLinse
};
const CACHE={};
/* Die Figuren werden auf einer festen Fläche gezeichnet und danach auf den
   tatsächlich bemalten Bereich zugeschnitten – je Kette auf denselben
   Ausschnitt, damit die Bilder der Schritte nicht hin- und herspringen.   */
function rand(c){ const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;
  let x0=c.width,y0=c.height,x1=-1,y1=-1;
  for(let y=0;y<c.height;y++) for(let x=0;x<c.width;x++){ const i=(y*c.width+x)*4;
    if(d[i]<248||d[i+1]<248||d[i+2]<248){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; } }
  return x1<0?null:[x0,y0,x1,y1]; }
function schneiden(c,b,m){ const x0=Math.max(0,b[0]-m), y0=Math.max(0,b[1]-m),
  x1=Math.min(c.width-1,b[2]+m), y1=Math.min(c.height-1,b[3]+m);
  const o=document.createElement('canvas'); o.width=x1-x0+1; o.height=y1-y0+1;
  const g=o.getContext('2d'); g.fillStyle='#fff'; g.fillRect(0,0,o.width,o.height);
  g.drawImage(c,x0,y0,o.width,o.height,0,0,o.width,o.height);
  return o.toDataURL('image/png'); }
function stufenSatz(k,zs){ const id='S#'+k; if(CACHE[id]) return CACHE[id];
  const cs={}, uniq=[]; zs.forEach(st=>{ if(uniq.indexOf(st)<0) uniq.push(st); });
  let bb=null;
  uniq.forEach(st=>{ const b=blatt(SW,SH); SFIG[k](b.g,st); cs[st]=b.c;
    const r=rand(b.c); if(r) bb=bb?[Math.min(bb[0],r[0]),Math.min(bb[1],r[1]),Math.max(bb[2],r[2]),Math.max(bb[3],r[3])]:r; });
  const out={}; uniq.forEach(st=>{ out[st]=bb?schneiden(cs[st],bb,16):cs[st].toDataURL('image/png'); });
  CACHE[id]=out; return out; }
function einzelBild(zeichnen,id){ if(!CACHE[id]){ const b=blatt(SW,SH); zeichnen(b.g);
    const r=rand(b.c); CACHE[id]=r?schneiden(b.c,r,16):b.c.toDataURL('image/png'); }
  return CACHE[id]; }
function gesamtBild(t){ return einzelBild(GESAMTBILD[t],'G#'+t); }
function schrittBilder(t){ const e=SCHRITTBILD[t]; if(!e) return null;
  const satz=stufenSatz(e.k,e.z); return e.z.map(st=>satz[st]||''); }
function vorschau(t){ const e=SCHRITTBILD[t];          /* nur ein Bild für das Auswahlfenster */
  if(e){ const letzt=Math.max.apply(null,e.z); return einzelBild(g=>SFIG[e.k](g,letzt),'V#'+e.k+'#'+letzt); }
  if(GESAMTBILD[t]) return gesamtBild(t);
  return ''; }

const A=[

{f:'M', j:8, g:'Kreis und Satz des Thales', t:'Beweis: Satz des Thales', s:[
 'Gegeben ist ein Halbkreis über der Strecke AB mit dem Mittelpunkt M. Der Punkt C liegt auf dem Halbkreis.',
 'Behauptung: Das Dreieck ABC hat bei C einen rechten Winkel.',
 'Weil M der Mittelpunkt ist, sind MA, MB und MC Radien desselben Kreises und damit gleich lang.',
 'Das Dreieck AMC hat somit zwei gleich lange Seiten, es ist gleichschenklig.',
 'In einem gleichschenkligen Dreieck sind die Basiswinkel gleich groß: Der Winkel bei A ist also so groß wie der Winkel bei C im Teildreieck AMC. Wir nennen ihn Alpha.',
 'Ebenso ist das Dreieck BMC gleichschenklig; der Winkel bei B ist so groß wie der Winkel bei C im Teildreieck BMC. Wir nennen ihn Beta.',
 'Der gesamte Winkel bei C setzt sich aus diesen beiden Teilwinkeln zusammen, er beträgt also Alpha plus Beta.',
 'Die Winkelsumme im Dreieck ABC beträgt 180°, also gilt: Alpha + Beta + (Alpha + Beta) = 180°.',
 'Daraus folgt 2 · (Alpha + Beta) = 180°, also Alpha + Beta = 90°.',
 'Der Winkel bei C misst genau Alpha + Beta und damit 90°: Das Dreieck ist rechtwinklig. Damit ist die Behauptung bewiesen.'
]},

{f:'M', j:9, g:'Quadratwurzeln', t:'Beweis: Wurzel 2 ist irrational', s:[
 'Behauptung: Die Wurzel aus 2 lässt sich nicht als Bruch ganzer Zahlen schreiben.',
 'Wir führen einen Widerspruchsbeweis und nehmen das Gegenteil an.',
 'Annahme: Es gibt ganze Zahlen p und q mit q ungleich 0, sodass Wurzel 2 = p/q gilt und der Bruch vollständig gekürzt ist. p und q haben also keinen gemeinsamen Teiler außer 1.',
 'Quadrieren beider Seiten ergibt 2 = p² / q².',
 'Multiplizieren mit q² liefert p² = 2 · q².',
 'Die rechte Seite ist das Doppelte einer ganzen Zahl, also ist p² eine gerade Zahl.',
 'Das Quadrat einer ungeraden Zahl ist stets ungerade. Weil p² gerade ist, muss daher auch p selbst gerade sein.',
 'Also lässt sich p als p = 2k mit einer ganzen Zahl k schreiben.',
 'Einsetzen ergibt (2k)² = 2 · q², also 4k² = 2q² und damit q² = 2k².',
 'Mit derselben Überlegung wie zuvor folgt: q² ist gerade, also ist auch q gerade.',
 'Damit sind p und q beide gerade und haben den gemeinsamen Teiler 2. Das widerspricht der Annahme, dass der Bruch vollständig gekürzt war.',
 'Die Annahme muss also falsch sein. Die Wurzel aus 2 ist nicht als Bruch darstellbar, sie ist irrational.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Magnetkugel fällt durch ein Kupferrohr', s:[
 'Eine Magnetkugel wird oben in ein senkrechtes Kupferrohr fallen gelassen. Sie braucht für einen Meter mehrere Sekunden, im gleich langen Kunststoffrohr nur Sekundenbruchteile.',
 'Kupfer ist nicht magnetisch. Die Bremsung kann also nicht an einer gewöhnlichen magnetischen Anziehung liegen.',
 'Die Kugel bewegt sich, und mit ihr bewegt sich auch ihr Magnetfeld.',
 'Für jeden gedachten Ring der Rohrwand ändert sich dadurch der magnetische Fluss, der ihn durchsetzt.',
 'Nach dem Induktionsgesetz wird bei jeder Flussänderung eine Spannung induziert.',
 'Kupfer leitet sehr gut, und die Ringe der Rohrwand sind in sich geschlossen. Die induzierte Spannung treibt deshalb sofort einen Strom an: Es fließen Wirbelströme.',
 'Jeder dieser Wirbelströme erzeugt selbst ein Magnetfeld.',
 'In welche Richtung fließt der Strom? Darüber entscheidet die Energiebilanz.',
 'Vergleiche dazu die beiden Rohre: Durch dieselbe Höhe wird in beiden Fällen dieselbe Lageenergie abgegeben.',
 'Im Kupferrohr kommt die Kugel jedoch viel langsamer unten an, sie hat dort also deutlich weniger Bewegungsenergie als beim freien Fall.',
 'Diese fehlende Energie kann nicht verschwunden sein. Sie wurde in elektrische Energie der Wirbelströme umgewandelt und über den Widerstand des Kupfers in innere Energie.',
 'Angenommen, das induzierte Feld würde die Kugel stattdessen beschleunigen: Dann käme sie schneller an als im freien Fall und zusätzlich flösse Strom. Energie entstünde aus dem Nichts.',
 'Das ist unmöglich. Das induzierte Feld muss also seiner Ursache entgegenwirken und die Kugel bremsen. Genau das besagt die lenzsche Regel.',
 'Konkret heißt das: Unterhalb der Kugel wirkt das induzierte Feld abstoßend, oberhalb der Kugel anziehend. Beide Kräfte zeigen nach oben.',
 'Die bremsende Kraft wächst mit der Geschwindigkeit. Sobald sie so groß wie die Gewichtskraft ist, sinkt die Kugel mit nahezu gleichbleibender Geschwindigkeit.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Kraft zwischen zwei parallelen Leitern', s:[
 'Zwei dünne Drähte hängen parallel nebeneinander. Durch beide fließt ein Strom.',
 'Beobachtung: Bei gleicher Stromrichtung ziehen sich die Drähte an, bei entgegengesetzter Stromrichtung stoßen sie sich ab.',
 'Jeder stromdurchflossene Leiter erzeugt ein Magnetfeld.',
 'Die Feldlinien dieses Magnetfeldes verlaufen als konzentrische Kreise um den Draht. Ihre Richtung liefert die Rechte-Hand-Regel, wenn der Daumen in die technische Stromrichtung zeigt.',
 'Am Ort des zweiten Drahtes herrscht deshalb das Magnetfeld des ersten Drahtes, und zwar senkrecht zu dessen Stromrichtung.',
 'Im zweiten Draht bewegen sich Ladungsträger, denn dort fließt ebenfalls ein Strom.',
 'Auf bewegte Ladungen in einem Magnetfeld wirkt die Lorentzkraft.',
 'Die vielen kleinen Kräfte auf die einzelnen Ladungsträger ergeben zusammen eine Kraft auf den gesamten zweiten Draht.',
 'Die Richtung dieser Kraft liefert die Drei-Finger-Regel: Bei gleichgerichteten Strömen zeigt sie zum ersten Draht hin, bei entgegengesetzten von ihm weg.',
 'Damit ist die Beobachtung erklärt: gleiche Stromrichtung bedeutet Anziehung, entgegengesetzte Stromrichtung bedeutet Abstoßung.',
 'Dieselbe Überlegung gilt auch umgekehrt. Nach dem Wechselwirkungsprinzip wirkt auf den ersten Draht eine gleich große Kraft in die Gegenrichtung.',
 'Die Kraft wächst mit beiden Stromstärken und nimmt mit größerem Abstand ab. Über sie war früher die Einheit Ampere festgelegt.'
]},

{f:'M', j:5, g:'Problemlösen', t:'Umschütträtsel: 4 Liter abmessen', s:[
 'Gegeben sind zwei Gefäße ohne Skala: eines fasst 3 Liter, das andere 5 Liter. Beide sind leer. Abgemessen werden sollen genau 4 Liter.',
 'Fülle das 3-Liter-Gefäß am Wasserhahn vollständig.',
 'Schütte diese 3 Liter in das 5-Liter-Gefäß. Darin sind jetzt 3 Liter, das kleine Gefäß ist leer.',
 'Fülle das 3-Liter-Gefäß erneut vollständig.',
 'Gieße daraus in das 5-Liter-Gefäß, bis dieses randvoll ist. Es passen nur noch 2 Liter hinein.',
 'Im 3-Liter-Gefäß bleibt deshalb genau 1 Liter zurück. Das ist der entscheidende Zwischenschritt.',
 'Leere das 5-Liter-Gefäß vollständig aus.',
 'Schütte den einen Liter aus dem kleinen Gefäß in das leere 5-Liter-Gefäß.',
 'Fülle das 3-Liter-Gefäß wieder vollständig.',
 'Schütte diese 3 Liter dazu: 1 Liter plus 3 Liter ergeben genau 4 Liter im 5-Liter-Gefäß.'
]},

{f:'M', j:7, g:'Lineare Gleichungen', t:'Vorgehen: lineare Gleichung lösen', s:[
 'Schreibe die Gleichung auf und prüfe, ob Klammern oder Brüche vorkommen.',
 'Löse zuerst alle Klammern auf, indem du ausmultiplizierst.',
 'Beseitige Brüche, indem du beide Seiten mit dem Hauptnenner multiplizierst.',
 'Fasse auf jeder Seite für sich alles zusammen, was gleichartig ist.',
 'Bringe durch Addieren oder Subtrahieren alle Glieder mit der Variablen auf eine Seite.',
 'Bringe mit demselben Schritt alle reinen Zahlen auf die andere Seite.',
 'Fasse erneut zusammen; es bleibt eine Gleichung der Form a · x = b.',
 'Teile beide Seiten durch den Faktor vor der Variablen. Ist dieser Faktor null, prüfe gesondert, ob die Gleichung keine oder unendlich viele Lösungen hat.',
 'Schreibe die Lösung auf und mache die Probe, indem du sie in die ursprüngliche Gleichung einsetzt.',
 'Gib die Lösungsmenge an und deute das Ergebnis im Sachzusammenhang, falls es eine Textaufgabe war.'
]},

{f:'M', j:9, g:'Quadratische Gleichungen', t:'Vorgehen: quadratische Gleichung lösen', s:[
 'Bringe die Gleichung durch Umformen auf die Normalform, also alles auf eine Seite, sodass rechts null steht.',
 'Ordne die Glieder nach fallenden Potenzen: zuerst das Glied mit x², dann das mit x, dann die Zahl.',
 'Prüfe, ob ein einfacher Weg genügt: Fehlt das absolute Glied, kannst du x ausklammern; fehlt das lineare Glied, genügt Wurzelziehen.',
 'Prüfe außerdem, ob eine binomische Formel oder der Satz von Vieta das Zerlegen erleichtert.',
 'Andernfalls lies die Koeffizienten a, b und c ab.',
 'Berechne die Diskriminante, also den Term unter der Wurzel: b² − 4ac.',
 'Ist die Diskriminante negativ, gibt es keine Lösung; ist sie null, genau eine; ist sie positiv, zwei Lösungen.',
 'Setze die Werte in die Lösungsformel ein und berechne die Lösungen.',
 'Mache die Probe, indem du jede Lösung in die ursprüngliche Gleichung einsetzt.',
 'Gib die Lösungsmenge an und prüfe bei Sachaufgaben, ob beide Lösungen sinnvoll sind.'
]},

{f:'M', j:9, g:'Quadratwurzeln', t:'Vorgehen: Wurzelgleichung lösen', s:[
 'Bestimme zuerst den Definitionsbereich: Der Term unter jeder Wurzel darf nicht negativ werden.',
 'Stelle die Gleichung so um, dass die Wurzel allein auf einer Seite steht.',
 'Quadriere beide Seiten der Gleichung.',
 'Beachte dabei: Quadrieren ist keine Äquivalenzumformung, es können Scheinlösungen entstehen.',
 'Kommt noch eine zweite Wurzel vor, wiederhole das Isolieren und Quadrieren.',
 'Löse die entstandene Gleichung, die nun meist linear oder quadratisch ist.',
 'Prüfe für jede gefundene Zahl, ob sie im Definitionsbereich liegt.',
 'Setze jede verbliebene Zahl in die ursprüngliche Gleichung ein; nur so erkennst du Scheinlösungen sicher.',
 'Streiche alle Zahlen, die die Probe nicht bestehen.',
 'Gib die Lösungsmenge der verbliebenen Zahlen an.'
]},

{f:'M', j:10, g:'Exponentielles Wachstum', t:'Vorgehen: Exponentialgleichung lösen', s:[
 'Schreibe die Gleichung auf und suche die Variable: Sie steht im Exponenten.',
 'Forme so um, dass auf einer Seite nur noch die Potenz mit der Variablen steht; Faktoren und Summanden wandern auf die andere Seite.',
 'Prüfe, ob sich beide Seiten als Potenzen derselben Basis schreiben lassen.',
 'Ist das der Fall, genügt der Vergleich der Exponenten und du erhältst eine einfache Gleichung.',
 'Andernfalls wende auf beide Seiten den Logarithmus an.',
 'Nutze das Logarithmusgesetz, mit dem der Exponent als Faktor vor den Logarithmus gezogen wird.',
 'Löse die nun lineare Gleichung nach der Variablen auf.',
 'Berechne den Wert mit dem Taschenrechner und runde sinnvoll.',
 'Mache die Probe durch Einsetzen in die ursprüngliche Gleichung.',
 'Deute das Ergebnis im Sachzusammenhang, etwa als Zeitpunkt oder als Anzahl von Zeitschritten.'
]},

{f:'M', j:9, g:'Quadratische Funktionen', t:'Vorgehen: Extremwertaufgabe mit quadratischer Funktion', s:[
 'Lies die Aufgabe genau und fertige eine Skizze an. Beschrifte darin die veränderlichen Größen.',
 'Benenne die gesuchte Größe, die größt- oder kleinstmöglich werden soll; sie ist die Zielgröße.',
 'Wähle eine Variable für eine der veränderlichen Größen, zum Beispiel x für eine Seitenlänge.',
 'Stelle die Nebenbedingung auf: die Gleichung, die die gegebene Einschränkung beschreibt, etwa einen festen Umfang.',
 'Löse die Nebenbedingung nach der zweiten Größe auf, sodass sie durch x ausgedrückt wird.',
 'Setze diesen Ausdruck in die Zielgröße ein. So entsteht die Zielfunktion, die nur noch von x abhängt.',
 'Vereinfache den Term; er ist quadratisch und hat die Form a x² + b x + c.',
 'Bestimme den Scheitel, zum Beispiel durch quadratische Ergänzung oder über die Scheitelformel.',
 'Entscheide am Vorzeichen von a, ob der Scheitel ein Maximum oder ein Minimum liefert.',
 'Prüfe, ob der gefundene x-Wert im sinnvollen Bereich liegt, etwa ob die Länge positiv ist.',
 'Berechne mit diesem x die zweite Größe und den Extremwert selbst.',
 'Formuliere einen Antwortsatz mit Einheiten.'
]},

{f:'M', j:11, g:'Differentialrechnung', t:'Vorgehen: Extremwertaufgabe mit Ableitung', s:[
 'Lies die Aufgabe genau und fertige eine beschriftete Skizze an.',
 'Benenne die Zielgröße, die maximal oder minimal werden soll, und stelle die Zielgleichung auf.',
 'Stelle die Nebenbedingung auf, also die Gleichung, die die gegebene Einschränkung beschreibt.',
 'Löse die Nebenbedingung nach einer Variablen auf und setze sie in die Zielgleichung ein.',
 'Du erhältst die Zielfunktion f, die nur noch von einer Variablen abhängt.',
 'Bestimme den sinnvollen Definitionsbereich aus dem Sachzusammenhang.',
 'Bilde die erste Ableitung f Strich.',
 'Setze f Strich gleich null und löse diese Gleichung; die Lösungen sind die Kandidaten für Extremstellen.',
 'Weise mit dem Vorzeichenwechsel von f Strich oder mit der zweiten Ableitung nach, ob dort ein Maximum oder ein Minimum vorliegt.',
 'Untersuche zusätzlich die Ränder des Definitionsbereichs, denn auch dort kann der größte oder kleinste Wert liegen.',
 'Berechne den zugehörigen Funktionswert und die übrigen gesuchten Größen.',
 'Formuliere einen Antwortsatz mit Einheiten und prüfe das Ergebnis auf Plausibilität.'
]},
{f:'M', j:6, g:'Rationale Zahlen', t:'Vorgehen: ungleichnamige Brüche addieren', s:[
 'Schreibe beide Brüche auf und vergleiche die Nenner.',
 'Sind die Nenner verschieden, müssen die Brüche zuerst gleichnamig gemacht werden.',
 'Bestimme den Hauptnenner, also das kleinste gemeinsame Vielfache der beiden Nenner.',
 'Berechne für jeden Bruch, mit welcher Zahl du erweitern musst: Hauptnenner geteilt durch den alten Nenner.',
 'Erweitere jeden Bruch mit dieser Zahl, also Zähler und Nenner damit malnehmen.',
 'Nun haben beide Brüche denselben Nenner; addiere die Zähler und behalte den Nenner bei.',
 'Kürze das Ergebnis so weit wie möglich.',
 'Ist der Zähler größer als der Nenner, schreibe das Ergebnis als gemischte Zahl.',
 'Prüfe das Ergebnis mit einer Überschlagsrechnung: Ist die Summe ungefähr so groß wie erwartet?'
]},

{f:'M', j:7, g:'Lineare Gleichungen', t:'Vorgehen: Textaufgabe in eine Gleichung übersetzen', s:[
 'Lies den Text zweimal und markiere die Zahlenangaben und die Frage.',
 'Benenne die gesuchte Größe und lege fest, wofür die Variable x steht; schreibe das auf.',
 'Drücke die übrigen Größen durch x aus, zum Beispiel die Nachfolgerzahl als x + 1.',
 'Suche im Text die Aussage, die eine Gleichheit beschreibt; sie enthält oft das Wort ist, ergibt oder zusammen.',
 'Stelle mit dieser Aussage die Gleichung auf.',
 'Löse die Gleichung mit Äquivalenzumformungen.',
 'Mache die Probe am Text, nicht nur an der Gleichung: Passt die gefundene Zahl zu allen Angaben?',
 'Prüfe, ob das Ergebnis im Sachzusammenhang sinnvoll ist, etwa ob eine Anzahl ganzzahlig und positiv ist.',
 'Formuliere einen Antwortsatz mit Einheiten.'
]},

{f:'M', j:8, g:'Lineare Funktionen', t:'Vorgehen: Geradengleichung aus zwei Punkten', s:[
 'Schreibe die beiden gegebenen Punkte mit ihren Koordinaten auf.',
 'Die gesuchte Gleichung hat die Form y = m · x + t; gesucht sind also m und t.',
 'Berechne die Steigung m als Quotient aus dem Unterschied der y-Werte und dem Unterschied der x-Werte.',
 'Achte dabei auf die Reihenfolge: In Zähler und Nenner muss derselbe Punkt zuerst stehen.',
 'Setze die berechnete Steigung in die Gleichung ein.',
 'Setze nun die Koordinaten eines der beiden Punkte ein; dadurch entsteht eine Gleichung mit der einzigen Unbekannten t.',
 'Löse diese Gleichung nach t auf.',
 'Schreibe die vollständige Geradengleichung auf.',
 'Mache die Probe mit dem anderen Punkt: Seine Koordinaten müssen die Gleichung ebenfalls erfüllen.'
]},

{f:'M', j:8, g:'Lineare Gleichungssysteme', t:'Vorgehen: Gleichungssystem mit dem Additionsverfahren', s:[
 'Schreibe beide Gleichungen untereinander und ordne sie: links die Glieder mit x und y, rechts die Zahlen.',
 'Entscheide, welche Variable zuerst verschwinden soll.',
 'Multipliziere eine oder beide Gleichungen mit einer passenden Zahl, sodass die Koeffizienten dieser Variablen entgegengesetzt gleich sind.',
 'Addiere die beiden Gleichungen; die gewählte Variable fällt dabei weg.',
 'Löse die entstandene Gleichung mit nur einer Unbekannten.',
 'Setze den gefundenen Wert in eine der ursprünglichen Gleichungen ein.',
 'Berechne daraus die zweite Unbekannte.',
 'Mache die Probe, indem du beide Werte in beide ursprünglichen Gleichungen einsetzt.',
 'Gib die Lösung als Zahlenpaar an und deute sie bei Sachaufgaben, etwa als Schnittpunkt zweier Tarife.'
]},

{f:'M', j:13, g:'Integralrechnung', t:'Vorgehen: Fläche zwischen Graph und x-Achse', s:[
 'Schreibe die Funktion und das gesuchte Intervall auf und fertige eine Skizze des Graphen an.',
 'Berechne die Nullstellen der Funktion im betrachteten Intervall.',
 'Teile das Intervall an diesen Nullstellen in Teilintervalle auf.',
 'Bestimme für jedes Teilintervall, ob der Graph oberhalb oder unterhalb der x-Achse verläuft.',
 'Bestimme eine Stammfunktion F der Funktion f.',
 'Berechne für jedes Teilintervall das bestimmte Integral als F an der oberen Grenze minus F an der unteren Grenze.',
 'Beachte: Unterhalb der x-Achse liefert das Integral einen negativen Wert.',
 'Nimm für den Flächeninhalt von jedem Teilintegral den Betrag.',
 'Addiere die Beträge zum gesuchten Flächeninhalt.',
 'Vergleiche das Ergebnis mit der Skizze: Passt die Größenordnung zu den Kästchen im Bild?'
]},
{f:'Ph', j:7, g:'Arbeitsweisen', t:'Vorgehen: eine Physikaufgabe rechnen', s:[
 'Lies die Aufgabe vollständig und stelle dir den Vorgang vor; fertige wenn möglich eine Skizze an.',
 'Schreibe unter „gegeben" alle bekannten Größen mit Formelzeichen, Zahlenwert und Einheit auf.',
 'Schreibe unter „gesucht" die Größe auf, die berechnet werden soll.',
 'Rechne alle Angaben in zusammenpassende Einheiten um, zum Beispiel Minuten in Sekunden.',
 'Suche die Formel, die die gegebenen und die gesuchte Größe verbindet.',
 'Stelle die Formel nach der gesuchten Größe um, bevor du Zahlen einsetzt.',
 'Setze die Zahlenwerte mit ihren Einheiten ein.',
 'Rechne aus und vereinfache dabei auch die Einheiten; die Einheit des Ergebnisses muss zur gesuchten Größe passen.',
 'Runde sinnvoll und prüfe die Größenordnung: Ist der Wert für die Situation plausibel?',
 'Schreibe einen Antwortsatz mit Zahlenwert und Einheit.'
]},

{f:'Ph', j:8, g:'Optik', t:'Vorgehen: Bildkonstruktion an der Sammellinse', s:[
 'Zeichne die optische Achse als waagerechte Linie und die Linse senkrecht dazu, als Strich mit Doppelpfeilen.',
 'Markiere den Mittelpunkt der Linse und auf beiden Seiten im gleichen Abstand die Brennpunkte.',
 'Zeichne den Gegenstand als senkrechten Pfeil links der Linse, mit dem Fuß auf der optischen Achse.',
 'Zeichne vom Pfeilende den Parallelstrahl: Er läuft parallel zur optischen Achse bis zur Linse.',
 'Hinter der Linse verläuft dieser Strahl als Brennpunktstrahl, also durch den Brennpunkt auf der anderen Seite.',
 'Zeichne vom Pfeilende den Mittelpunktstrahl: Er geht ungebrochen durch die Mitte der Linse.',
 'Der Schnittpunkt der beiden Strahlen hinter der Linse ist die Spitze des Bildes.',
 'Zeichne von dort das Lot auf die optische Achse; das ist das Bild des Gegenstands.',
 'Zeichne zur Kontrolle den Brennpunktstrahl: Er geht vor der Linse durch den Brennpunkt und verläuft dahinter parallel zur Achse. Er muss durch denselben Punkt gehen.',
 'Beschreibe das Bild: Steht es aufrecht oder auf dem Kopf, ist es größer oder kleiner, ist es reell oder virtuell?'
]},

{f:'Ph', j:9, g:'Elektrischer Strom', t:'Vorgehen: Gesamtwiderstand einer gemischten Schaltung', s:[
 'Zeichne den Schaltplan sauber ab und nummeriere die Widerstände.',
 'Suche Teilschaltungen, in denen Widerstände eindeutig in Reihe oder parallel liegen.',
 'Beginne mit der innersten Teilschaltung, also der, die am weitesten von den Anschlussklemmen entfernt ist.',
 'Liegen Widerstände in Reihe, addiere ihre Werte zu einem Ersatzwiderstand.',
 'Liegen sie parallel, addiere die Kehrwerte und bilde vom Ergebnis wieder den Kehrwert.',
 'Zeichne die Schaltung neu und ersetze die berechnete Teilschaltung durch ihren Ersatzwiderstand.',
 'Wiederhole das Zusammenfassen, bis nur noch ein einziger Widerstand übrig ist.',
 'Prüfe das Ergebnis: Eine Parallelschaltung ist stets kleiner als der kleinste Einzelwiderstand, eine Reihenschaltung größer als der größte.',
 'Berechne mit dem ohmschen Gesetz die Gesamtstromstärke aus der angelegten Spannung.',
 'Arbeite dich Schritt für Schritt zurück, um Teilspannungen und Teilströme zu bestimmen.'
]},

{f:'Ph', j:11, g:'Mechanik', t:'Vorgehen: Bewegung mit konstanter Beschleunigung', s:[
 'Lies die Aufgabe und skizziere den Bewegungsablauf; lege fest, wo der Nullpunkt liegt und welche Richtung positiv zählt.',
 'Trage ein, was gegeben ist: Anfangsort, Anfangsgeschwindigkeit, Beschleunigung, Zeit oder Endgeschwindigkeit.',
 'Prüfe, ob die Beschleunigung während des betrachteten Abschnitts wirklich konstant ist; sonst teile die Bewegung in Abschnitte.',
 'Rechne alle Größen in SI-Einheiten um, insbesondere Kilometer je Stunde in Meter je Sekunde.',
 'Wähle die passende Gleichung: Weg-Zeit-Gesetz, Geschwindigkeit-Zeit-Gesetz oder die Beziehung ohne Zeit.',
 'Stelle die gewählte Gleichung nach der gesuchten Größe um.',
 'Setze die Werte ein und berechne das Ergebnis.',
 'Achte bei Bremsvorgängen auf das Vorzeichen: Die Beschleunigung ist dann der Geschwindigkeit entgegengerichtet.',
 'Prüfe das Ergebnis auf Plausibilität, etwa ob ein Bremsweg zur Erfahrung passt.',
 'Zeichne wenn gefordert das Zeit-Geschwindigkeit-Diagramm; die Fläche darunter entspricht dem zurückgelegten Weg.'
]},
{f:'M', j:6, g:'Dreisatz und Proportionalität', t:'Vorgehen: Dreisatz', s:[
 'Lies die Aufgabe und schreibe die beiden zusammengehörenden Größen heraus, zum Beispiel Anzahl und Preis.',
 'Prüfe, ob die Zuordnung proportional ist: Doppelt so viele Teile kosten doppelt so viel. Nur dann ist der Dreisatz erlaubt.',
 'Schreibe die gegebene Zuordnung in eine Zeile, die Größen sauber untereinander und mit Einheiten.',
 'Erster Schritt: Rechne von der gegebenen Menge auf eine Einheit herunter, meist durch Division.',
 'Schreibe diesen Zwischenwert auf; er gibt an, wie viel eine einzige Einheit ausmacht.',
 'Zweiter Schritt: Rechne von einer Einheit auf die gesuchte Menge hoch, meist durch Multiplikation.',
 'Achte bei antiproportionalen Zuordnungen auf die Umkehrung: Dort wird im zweiten Schritt geteilt statt malgenommen.',
 'Runde sinnvoll und schreibe die Einheit dazu.',
 'Prüfe mit einer Überschlagsrechnung, ob das Ergebnis in der richtigen Größenordnung liegt.',
 'Formuliere einen Antwortsatz.'
]},

{f:'M', j:6, g:'Prozentrechnung', t:'Vorgehen: Prozentaufgabe mit gesuchtem Grundwert', s:[
 'Lies die Aufgabe und suche die drei Größen der Prozentrechnung: Grundwert, Prozentsatz und Prozentwert.',
 'Der Grundwert ist das Ganze und entspricht 100 Prozent; er ist hier gesucht.',
 'Der Prozentwert ist der Anteil, der im Text als Betrag genannt wird.',
 'Schreibe auf, welche Angabe zu welcher Größe gehört, und notiere die gesuchte Größe mit einem Fragezeichen.',
 'Vorsicht bei Formulierungen wie „um 20 Prozent reduziert": Der genannte Preis entspricht dann nicht 20, sondern 80 Prozent.',
 'Rechne zuerst von den gegebenen Prozent auf ein Prozent herunter, indem du den Prozentwert durch die Prozentzahl teilst.',
 'Rechne dann von einem Prozent auf hundert Prozent hoch, indem du mit 100 malnimmst.',
 'Alternativ kannst du die Formel Grundwert gleich Prozentwert geteilt durch Prozentsatz verwenden.',
 'Runde auf sinnvolle Genauigkeit, bei Geldbeträgen auf zwei Nachkommastellen.',
 'Mache die Probe: Berechne aus dem gefundenen Grundwert den Prozentwert zurück.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Mittelsenkrechte einer Strecke', s:[
 'Zeichne die Strecke AB und lege das Geodreieck beiseite: Konstruiert wird nur mit Zirkel und Lineal.',
 'Stich mit dem Zirkel in den Punkt A ein.',
 'Wähle eine Zirkelöffnung, die größer als die Hälfte der Strecke AB ist. Sonst schneiden sich die Kreise später nicht.',
 'Zeichne mit dieser Öffnung einen Kreisbogen oberhalb und unterhalb der Strecke.',
 'Stich nun in den Punkt B ein und behalte dieselbe Zirkelöffnung bei.',
 'Zeichne wieder je einen Kreisbogen oberhalb und unterhalb der Strecke.',
 'Die Bögen schneiden sich in zwei Punkten, einem oberhalb und einem unterhalb der Strecke.',
 'Verbinde diese beiden Schnittpunkte mit dem Lineal zu einer Geraden.',
 'Diese Gerade ist die Mittelsenkrechte: Sie steht senkrecht auf AB und halbiert die Strecke.',
 'Begründung: Beide Schnittpunkte haben von A und von B denselben Abstand, nämlich die Zirkelöffnung. Alle Punkte mit dieser Eigenschaft liegen auf der Mittelsenkrechten.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Winkelhalbierende', s:[
 'Zeichne den Winkel mit seinem Scheitel S und den beiden Schenkeln.',
 'Stich mit dem Zirkel in den Scheitel S ein.',
 'Zeichne mit beliebiger Öffnung einen Kreisbogen, der beide Schenkel schneidet.',
 'Benenne die beiden Schnittpunkte, etwa P auf dem ersten und Q auf dem zweiten Schenkel. Beide haben von S denselben Abstand.',
 'Stich nun in P ein und zeichne mit einer Öffnung, die größer als die halbe Strecke PQ ist, einen Bogen im Inneren des Winkels.',
 'Stich in Q ein und zeichne mit derselben Öffnung einen zweiten Bogen, der den ersten schneidet.',
 'Verbinde den Scheitel S mit diesem Schnittpunkt.',
 'Diese Gerade ist die Winkelhalbierende; sie teilt den Winkel in zwei gleich große Teilwinkel.',
 'Prüfe mit dem Geodreieck nach: Beide Teilwinkel müssen gleich groß sein.',
 'Begründung: Alle Punkte der Winkelhalbierenden haben von beiden Schenkeln denselben Abstand.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Umkreis eines Dreiecks', s:[
 'Zeichne das Dreieck ABC.',
 'Überlege zuerst, was der Umkreis leisten muss: Er geht durch alle drei Eckpunkte, sein Mittelpunkt hat also von A, B und C denselben Abstand.',
 'Punkte mit gleichem Abstand von zwei Ecken liegen auf der Mittelsenkrechten der entsprechenden Seite.',
 'Konstruiere die Mittelsenkrechte der Seite AB mit dem Zirkel.',
 'Konstruiere die Mittelsenkrechte der Seite BC auf dieselbe Weise.',
 'Der Schnittpunkt der beiden Mittelsenkrechten ist der Umkreismittelpunkt M.',
 'Die dritte Mittelsenkrechte muss durch denselben Punkt gehen; zeichne sie als Probe.',
 'Stich mit dem Zirkel in M ein und stelle als Radius den Abstand zu einem Eckpunkt ein.',
 'Zeichne den Kreis; er muss durch alle drei Ecken verlaufen.',
 'Beachte die Lage von M: Im spitzwinkligen Dreieck liegt er innen, im rechtwinkligen auf der Hypotenuse, im stumpfwinkligen außerhalb.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Inkreis eines Dreiecks', s:[
 'Zeichne das Dreieck ABC.',
 'Überlege, was der Inkreis leisten muss: Er berührt alle drei Seiten, sein Mittelpunkt hat also von allen Seiten denselben Abstand.',
 'Punkte mit gleichem Abstand von zwei Seiten liegen auf der Winkelhalbierenden des von ihnen eingeschlossenen Winkels.',
 'Konstruiere die Winkelhalbierende des Winkels bei A mit dem Zirkel.',
 'Konstruiere die Winkelhalbierende des Winkels bei B auf dieselbe Weise.',
 'Der Schnittpunkt der beiden Winkelhalbierenden ist der Inkreismittelpunkt M; er liegt immer innerhalb des Dreiecks.',
 'Fälle von M aus das Lot auf eine der Seiten.',
 'Der Abstand von M zu diesem Lotfußpunkt ist der Inkreisradius.',
 'Stich in M ein und zeichne den Kreis mit diesem Radius.',
 'Prüfe: Der Kreis muss jede Seite in genau einem Punkt berühren, nicht schneiden.'
]},
{f:'M', j:9, g:'Satz des Pythagoras', t:'Vorgehen: Sachaufgabe mit dem Satz des Pythagoras', s:[
 'Lies die Aufgabe und fertige eine Skizze der Situation an.',
 'Suche in der Skizze ein rechtwinkliges Dreieck und markiere den rechten Winkel.',
 'Findest du keines, ziehe eine Hilfslinie ein, etwa eine Höhe oder eine Diagonale.',
 'Benenne im Dreieck die Hypotenuse: Sie liegt dem rechten Winkel gegenüber und ist die längste Seite.',
 'Trage die bekannten Längen ein und bezeichne die gesuchte Seite mit einem Buchstaben.',
 'Achte darauf, dass alle Längen in derselben Einheit angegeben sind.',
 'Schreibe den Satz des Pythagoras für dieses Dreieck auf: Die Summe der Kathetenquadrate ist gleich dem Hypotenusenquadrat.',
 'Stelle die Gleichung nach der gesuchten Größe um – je nachdem, ob eine Kathete oder die Hypotenuse gesucht ist.',
 'Setze die Zahlen ein, quadriere zuerst und ziehe erst ganz am Schluss die Wurzel.',
 'Runde sinnvoll und prüfe: Die Hypotenuse muss länger sein als jede Kathete, aber kürzer als deren Summe.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},

{f:'M', j:9, g:'Strahlensätze', t:'Vorgehen: Aufgabe mit dem Strahlensatz', s:[
 'Fertige eine Skizze an und suche das Zentrum, von dem die beiden Strahlen ausgehen.',
 'Prüfe die Voraussetzung: Die beiden geschnittenen Geraden müssen parallel sein. Ohne Parallelität gilt der Strahlensatz nicht.',
 'Markiere die Parallelen und das Zentrum farbig, damit die Figur übersichtlich wird.',
 'Benenne die Punkte und trage die bekannten Längen ein.',
 'Entscheide, welcher Strahlensatz passt: der erste für Abschnitte auf den Strahlen, der zweite für die Parallelstücke.',
 'Stelle die Verhältnisgleichung auf und achte darauf, dass in Zähler und Nenner jeweils zusammengehörende Strecken stehen.',
 'Vorsicht bei den Abschnitten: Wird vom Zentrum aus gemessen oder nur das Teilstück dazwischen? Rechne gegebenenfalls erst die Gesamtlänge aus.',
 'Löse die Verhältnisgleichung durch Überkreuzmultiplizieren nach der gesuchten Länge auf.',
 'Setze die Zahlen ein und berechne das Ergebnis.',
 'Prüfe die Plausibilität an der Skizze: Liegt die gesuchte Strecke näher am Zentrum, muss sie kürzer sein.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},

{f:'M', j:9, g:'Mehrstufige Zufallsexperimente', t:'Vorgehen: Baumdiagramm und Pfadregeln', s:[
 'Lies die Aufgabe und bestimme, aus wie vielen Stufen das Zufallsexperiment besteht.',
 'Kläre, ob mit oder ohne Zurücklegen gezogen wird; davon hängen die Wahrscheinlichkeiten der zweiten Stufe ab.',
 'Zeichne die erste Stufe des Baumdiagramms mit allen möglichen Ergebnissen.',
 'Schreibe an jeden Ast seine Wahrscheinlichkeit; die Summe der Wahrscheinlichkeiten an einer Verzweigung ist immer 1.',
 'Zeichne die zweite Stufe an jedes Ende und beschrifte auch diese Äste.',
 'Markiere die Pfade, die zum gesuchten Ereignis gehören.',
 'Erste Pfadregel: Entlang eines Pfades werden die Wahrscheinlichkeiten multipliziert.',
 'Zweite Pfadregel: Die Wahrscheinlichkeiten mehrerer günstiger Pfade werden addiert.',
 'Prüfe bei Formulierungen wie „mindestens einmal", ob der Umweg über das Gegenereignis kürzer ist.',
 'Rechne aus und gib das Ergebnis als Bruch, Dezimalzahl oder Prozentwert an.',
 'Prüfe zur Kontrolle, ob die Summe aller Pfadwahrscheinlichkeiten 1 ergibt.'
]},

{f:'M', j:12, g:'Signifikanztest', t:'Vorgehen: Signifikanztest durchführen', s:[
 'Lies die Aufgabe und formuliere die Vermutung, die geprüft werden soll.',
 'Lege die Nullhypothese fest; sie beschreibt den bisher angenommenen Zustand.',
 'Lege die Gegenhypothese fest und entscheide, ob einseitig links, einseitig rechts oder zweiseitig getestet wird.',
 'Notiere den Stichprobenumfang n und das Signifikanzniveau, meist 5 Prozent.',
 'Benenne die Testgröße: die Anzahl der Treffer in der Stichprobe; sie ist unter der Nullhypothese binomialverteilt.',
 'Bestimme den Ablehnungsbereich, indem du mit der kumulierten Binomialverteilung die Grenze suchst, ab der die Wahrscheinlichkeit das Niveau unterschreitet.',
 'Schreibe Ablehnungs- und Annahmebereich vollständig auf.',
 'Führe die Stichprobe aus beziehungsweise entnimm der Aufgabe das Ergebnis.',
 'Vergleiche die Testgröße mit dem Ablehnungsbereich.',
 'Entscheide: Liegt sie im Ablehnungsbereich, wird die Nullhypothese verworfen, sonst nicht.',
 'Formuliere die Antwort im Sachzusammenhang und beachte: Nicht verwerfen heißt nicht beweisen.',
 'Benenne auf Nachfrage den Fehler erster Art, also die Nullhypothese fälschlich zu verwerfen.'
]},

{f:'M', j:13, g:'Geraden und Ebenen', t:'Vorgehen: Schnittpunkt von Gerade und Ebene', s:[
 'Schreibe die Gerade in Parameterform und die Ebene in Koordinatenform auf.',
 'Liegt die Ebene in Parameterform vor, wandle sie zuerst in die Koordinatenform um, etwa über den Normalenvektor.',
 'Setze die drei Koordinaten des Geradenpunkts, also die Terme mit dem Parameter, in die Ebenengleichung ein.',
 'Fasse die entstehende Gleichung zusammen; sie enthält nur noch den Parameter.',
 'Löse diese Gleichung nach dem Parameter auf.',
 'Prüfe die Sonderfälle: Bleibt eine wahre Aussage ohne Parameter, liegt die Gerade in der Ebene; bleibt eine falsche Aussage, ist sie echt parallel.',
 'Setze den gefundenen Parameterwert in die Geradengleichung ein.',
 'Berechne daraus die Koordinaten des Schnittpunkts.',
 'Mache die Probe: Die Koordinaten müssen die Ebenengleichung erfüllen.',
 'Gib den Schnittpunkt an und deute ihn, falls die Aufgabe einen Sachzusammenhang hat.'
]},
{f:'Ph', j:8, g:'Arbeitsweisen', t:'Vorgehen: Messwerte auswerten und Proportionalität prüfen', s:[
 'Schreibe vor dem Versuch auf, welche Größe du veränderst und welche du misst.',
 'Halte alle übrigen Größen konstant; sonst lässt sich der Zusammenhang nicht deuten.',
 'Lege eine Wertetabelle an, mit Formelzeichen und Einheit in der Kopfzeile.',
 'Miss jeden Wert mehrmals und trage den Mittelwert ein; so fallen Ausreißer weniger ins Gewicht.',
 'Zeichne ein Diagramm: die veränderte Größe nach rechts, die gemessene nach oben, beide Achsen beschriftet und sinnvoll eingeteilt.',
 'Trage die Messpunkte ein, ohne sie von Punkt zu Punkt zu verbinden.',
 'Lege eine Ausgleichsgerade so durch die Punktwolke, dass die Abweichungen nach oben und unten etwa gleich groß sind.',
 'Prüfe auf Proportionalität: Die Gerade muss durch den Ursprung gehen.',
 'Prüfe es zusätzlich rechnerisch: Bilde für jede Zeile den Quotienten der beiden Größen. Bleibt er im Rahmen der Messgenauigkeit gleich, sind die Größen zueinander proportional.',
 'Bestimme die Steigung der Ausgleichsgeraden aus einem großen Steigungsdreieck und gib ihre Einheit an.',
 'Deute die Steigung physikalisch, zum Beispiel als Widerstand, als Federhärte oder als Geschwindigkeit.',
 'Nenne mögliche Fehlerquellen und schätze ab, wie stark sie das Ergebnis beeinflussen.'
]},

{f:'Ph', j:8, g:'Optik', t:'Vorgehen: Aufgabe mit der Linsengleichung', s:[
 'Fertige eine Skizze mit Linse, Brennpunkten, Gegenstand und Bild an.',
 'Schreibe auf, was gegeben ist: Gegenstandsweite g, Bildweite b, Brennweite f, Gegenstandsgröße oder Bildgröße.',
 'Benenne die gesuchte Größe.',
 'Achte auf einheitliche Einheiten, meist Zentimeter oder Meter.',
 'Schreibe die Linsengleichung auf: Der Kehrwert der Brennweite ist gleich der Summe der Kehrwerte von Gegenstandsweite und Bildweite.',
 'Stelle die Gleichung nach der gesuchten Größe um; beachte dabei, dass du am Ende noch einmal den Kehrwert bilden musst.',
 'Setze die Zahlen ein und berechne das Ergebnis.',
 'Brauchst du die Bildgröße, nutze den Abbildungsmaßstab: Bildgröße zu Gegenstandsgröße verhält sich wie Bildweite zu Gegenstandsweite.',
 'Prüfe das Ergebnis mit der Skizze und mit den bekannten Fällen: Innerhalb der Brennweite entsteht ein virtuelles, aufrechtes und vergrößertes Bild.',
 'Formuliere einen Antwortsatz mit Einheit und beschreibe das Bild.'
]},

{f:'Ph', j:9, g:'Energie', t:'Vorgehen: Sachaufgabe mit dem Energieerhaltungssatz', s:[
 'Lies die Aufgabe und skizziere den Vorgang mit Anfangs- und Endzustand.',
 'Lege das System fest und entscheide, welche Körper dazugehören.',
 'Wähle ein Bezugsniveau für die Lageenergie, meist den tiefsten Punkt der Bewegung.',
 'Schreibe auf, welche Energieformen im Anfangszustand vorliegen, etwa Lageenergie oder Spannenergie.',
 'Schreibe auf, welche Energieformen im Endzustand vorliegen, etwa Bewegungsenergie.',
 'Formuliere den Energieerhaltungssatz: Die Summe der Energien im Anfangszustand ist gleich der Summe im Endzustand.',
 'Berücksichtige Reibung, indem du die dabei entstehende innere Energie als zusätzlichen Term auf der Endseite aufnimmst.',
 'Setze die Formeln der einzelnen Energieformen ein.',
 'Kürze gemeinsame Faktoren; häufig fällt die Masse heraus, was ein gutes Zwischenergebnis ist.',
 'Stelle nach der gesuchten Größe um und setze die Zahlen mit Einheiten ein.',
 'Prüfe die Einheit des Ergebnisses und die Größenordnung.',
 'Formuliere einen Antwortsatz.'
]},

{f:'Ph', j:10, g:'Mechanik', t:'Vorgehen: Kräftezerlegung an der schiefen Ebene', s:[
 'Zeichne die schiefe Ebene mit dem Neigungswinkel und dem Körper darauf.',
 'Zeichne die Gewichtskraft als Pfeil senkrecht nach unten im Schwerpunkt des Körpers.',
 'Lege ein gedrehtes Koordinatensystem fest: eine Achse parallel zur Ebene, die andere senkrecht dazu.',
 'Zerlege die Gewichtskraft in diese beiden Richtungen, indem du vom Pfeilende aus die Parallelen zu den Achsen einzeichnest.',
 'Die Komponente parallel zur Ebene heißt Hangabtriebskraft; sie zieht den Körper hangabwärts.',
 'Die Komponente senkrecht zur Ebene heißt Normalkraft; sie drückt den Körper auf die Unterlage.',
 'Suche den Winkel im Kräftedreieck: Er ist genauso groß wie der Neigungswinkel der Ebene, weil die Schenkel paarweise senkrecht aufeinander stehen.',
 'Berechne die Hangabtriebskraft mit dem Sinus des Neigungswinkels, die Normalkraft mit dem Kosinus.',
 'Prüfe die Grenzfälle: Bei 0 Grad ist die Hangabtriebskraft null, bei 90 Grad gleich der Gewichtskraft.',
 'Vergleiche die Hangabtriebskraft mit der Haftreibungskraft, um zu entscheiden, ob der Körper liegen bleibt oder rutscht.',
 'Formuliere das Ergebnis mit Zahlenwerten und Einheiten.'
]},

{f:'Ph', j:10, g:'Kernphysik', t:'Vorgehen: Altersbestimmung über die Halbwertszeit', s:[
 'Lies die Aufgabe und schreibe auf, welches Isotop verwendet wird und wie groß seine Halbwertszeit ist.',
 'Notiere den Anfangswert, also den Anteil zu Beginn, und den gemessenen Restanteil.',
 'Mache dir das Zerfallsgesetz klar: Nach jeder Halbwertszeit ist nur noch die Hälfte der Kerne vorhanden.',
 'Prüfe, ob der Restanteil ein einfacher Bruchteil ist, etwa ein Halb, ein Viertel oder ein Achtel.',
 'Ist das der Fall, zähle einfach die Halbierungsschritte: Ein Achtel bedeutet drei Halbwertszeiten.',
 'Multipliziere die Anzahl der Schritte mit der Halbwertszeit; das ergibt das gesuchte Alter.',
 'Ist der Restanteil kein einfacher Bruchteil, setze ihn in das Zerfallsgesetz ein.',
 'Löse die Gleichung nach der Zeit auf; weil die Zeit im Exponenten steht, brauchst du dafür den Logarithmus.',
 'Setze die Zahlen ein und berechne das Alter.',
 'Prüfe die Größenordnung: Je weniger übrig ist, desto älter muss der Fund sein.',
 'Beachte die Grenzen des Verfahrens: Ist kaum noch Aktivität messbar, wird die Angabe unsicher.',
 'Formuliere einen Antwortsatz mit Einheit.'
]},
{f:'Ph', j:10, g:'Elektromagnetismus', t:'Wirbelstrombremse', s:[
 'Eine Metallscheibe dreht sich und taucht dabei zwischen die Pole eines starken Magneten ein.',
 'Für jedes Flächenstück der Scheibe ändert sich beim Ein- und Austauchen der magnetische Fluss.',
 'Nach dem Induktionsgesetz wird bei dieser Flussänderung eine Spannung induziert.',
 'Die Scheibe ist aus einem Stück Metall und damit ein geschlossener Leiter; die Spannung treibt deshalb ringförmige Ströme an, die Wirbelströme.',
 'Jeder dieser Wirbelströme erzeugt ein eigenes Magnetfeld.',
 'Die Richtung der Ströme folgt aus der Energiebilanz: Die Scheibe wird messbar langsamer, ihre Rotationsenergie nimmt also ab.',
 'Diese Energie steckt in den Wirbelströmen und wird über den Widerstand des Metalls in innere Energie umgewandelt.',
 'Würde das induzierte Feld die Scheibe stattdessen antreiben, würde sie schneller und zugleich flösse Strom: Energie aus dem Nichts.',
 'Das Feld der Wirbelströme muss der Bewegung also entgegenwirken und bremsen. Genau das besagt die lenzsche Regel.',
 'Die Bremskraft wächst mit der Geschwindigkeit: Bei hoher Drehzahl bremst sie stark, bei kleiner schwach, im Stillstand gar nicht. Deshalb bremst eine Wirbelstrombremse sanft, aber nie bis zum völligen Halt.',
 'Als Gegenprobe schlitzt man die Scheibe radial ein: Die Wirbelströme können sich nicht mehr schließen und die Bremswirkung verschwindet fast völlig.',
 'Weil nichts berührt wird, gibt es keinen Verschleiß und keinen Bremsstaub; genutzt wird das in Zügen, in Lastwagen und in Fitnessgeräten.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Wie der Induktionsherd heizt', s:[
 'Unter der Glaskeramikplatte liegt eine flache Spule aus Kupferdraht.',
 'Durch diese Spule schickt die Elektronik einen hochfrequenten Wechselstrom mit etwa zwanzig- bis fünfzigtausend Schwingungen je Sekunde.',
 'Dadurch entsteht ein sich sehr schnell änderndes Magnetfeld.',
 'Die Glaskeramik ist weder magnetisch noch elektrisch leitend; das Feld geht praktisch ungehindert durch sie hindurch und die Platte selbst bleibt kalt.',
 'Steht ein Topf mit ferromagnetischem Boden darauf, durchsetzt das Wechselfeld diesen Boden.',
 'Der magnetische Fluss im Topfboden ändert sich damit ständig, und nach dem Induktionsgesetz wird in ihm eine Spannung induziert.',
 'Der Boden ist ein geschlossener Leiter, also fließen in ihm Wirbelströme.',
 'Der Boden hat einen elektrischen Widerstand; die Wirbelströme geben dort ihre Energie als innere Energie ab. Dazu kommt die Erwärmung durch das ständige Ummagnetisieren.',
 'Die Wärme entsteht also unmittelbar im Topfboden und nicht in der Kochfläche.',
 'Daraus folgen die bekannten Vorteile: Die Hitze wirkt sofort, lässt sich schnell regeln und es geht wenig Energie an die Umgebung verloren.',
 'Töpfe aus Aluminium oder Kupfer heizen dagegen kaum: Sie sind nicht ferromagnetisch und haben einen zu kleinen Widerstand. Der Magnettest am Topfboden verrät, ob ein Topf geeignet ist.',
 'Fehlt der Topf, erkennt die Elektronik die fehlende Last und schaltet ab; deshalb lässt sich eine leere Platte nicht aufheizen.'
]},

{f:'Ph', j:10, g:'Elektromagnetismus', t:'Wie Nordlichter entstehen', s:[
 'Die Sonne schleudert ständig geladene Teilchen ins All, vor allem Elektronen und Protonen; dieser Strom heißt Sonnenwind.',
 'Bei einem Sonnensturm sind es besonders viele und besonders schnelle Teilchen.',
 'Die Erde besitzt ein Magnetfeld, dessen Feldlinien ähnlich wie bei einem Stabmagneten von einem Pol zum anderen verlaufen.',
 'Auf bewegte Ladungen in einem Magnetfeld wirkt die Lorentzkraft.',
 'Diese Kraft steht immer senkrecht auf der Bewegungsrichtung und senkrecht auf dem Feld; sie lenkt die Teilchen also ab, statt sie abzubremsen.',
 'Deshalb können die Teilchen nicht geradlinig auf die Erde zufliegen: Das Magnetfeld wirkt wie ein Schutzschild.',
 'Die Geschwindigkeitskomponente längs der Feldlinien bleibt dabei erhalten, weil in dieser Richtung keine Kraft wirkt.',
 'Aus beidem zusammen ergibt sich eine Schraubenbahn: Die Teilchen kreisen um eine Feldlinie und wandern zugleich an ihr entlang.',
 'Die Feldlinien laufen an den magnetischen Polen zusammen; die Teilchen werden daher zu den Polargebieten geführt.',
 'Dort dringen sie in etwa hundert bis dreihundert Kilometern Höhe in die Atmosphäre ein.',
 'Beim Zusammenstoß mit Sauerstoff- und Stickstoffatomen geben sie Energie ab und regen diese Atome an, heben also Elektronen auf höhere Energieniveaus.',
 'Fallen die Elektronen kurz darauf zurück, wird die Energie als Licht abgestrahlt. Jede Atomsorte leuchtet dabei in ihrer eigenen Farbe: Sauerstoff grün und rot, Stickstoff blauviolett.',
 'Deshalb erscheinen die Nordlichter als Ringe um die Pole und sind nur bei starken Sonnenstürmen auch weiter südlich zu sehen.'
]},
{f:'M', j:7, g:'Symmetrie und Winkel', t:'Beweis: Winkelsumme im Dreieck', s:[
 'Gegeben ist ein beliebiges Dreieck ABC mit den Innenwinkeln Alpha bei A, Beta bei B und Gamma bei C.',
 'Behauptung: Die Summe der drei Innenwinkel beträgt 180°.',
 'Zeichne durch den Punkt C eine Gerade p, die parallel zur Seite AB verläuft.',
 'Dass es diese Parallele gibt und dass sie eindeutig ist, sichert das Parallelenaxiom.',
 'Die Gerade durch A und C schneidet nun zwei parallele Geraden, nämlich AB und p.',
 'An Parallelen sind Wechselwinkel gleich groß. Der Wechselwinkel zu Alpha liegt bei C auf der einen Seite von Gamma und ist deshalb ebenfalls Alpha groß.',
 'Ebenso schneidet die Gerade durch B und C die beiden Parallelen; der zugehörige Wechselwinkel bei C ist Beta groß.',
 'Am Punkt C liegen damit drei Winkel nebeneinander auf der Geraden p: Alpha, Gamma und Beta.',
 'Winkel, die nebeneinander auf einer Geraden liegen, ergänzen sich zum gestreckten Winkel von 180°.',
 'Also gilt Alpha + Gamma + Beta = 180°.',
 'Da das Dreieck beliebig gewählt war, gilt das für jedes Dreieck. Damit ist die Behauptung bewiesen.'
]},

{f:'M', j:9, g:'Quadratwurzeln', t:'Heron-Verfahren: Wurzel näherungsweise berechnen', s:[
 'Gesucht ist die Wurzel aus einer Zahl a, ohne die Wurzeltaste zu benutzen.',
 'Grundidee: Ein Rechteck mit dem Flächeninhalt a hat die Seiten x und a geteilt durch x. Je quadratischer dieses Rechteck wird, desto näher liegen die Seiten an der gesuchten Wurzel.',
 'Wähle einen Startwert x, zum Beispiel eine nahe liegende ganze Zahl.',
 'Berechne die zweite Rechteckseite, also a geteilt durch x.',
 'Vergleiche beide Werte: Ist x zu klein, so ist a geteilt durch x zu groß – und umgekehrt. Die gesuchte Wurzel liegt also immer zwischen den beiden.',
 'Bilde den Mittelwert der beiden Werte; er ist der neue, bessere Näherungswert.',
 'Berechne mit diesem neuen x wieder a geteilt durch x.',
 'Mittle erneut und wiederhole diesen Schritt.',
 'Jede Wiederholung verdoppelt ungefähr die Zahl der richtigen Stellen; schon nach wenigen Schritten ist die Genauigkeit sehr hoch.',
 'Brich ab, sobald sich die Stellen, auf die es dir ankommt, nicht mehr ändern oder x und a geteilt durch x übereinstimmen.',
 'Mache die Probe, indem du das Ergebnis quadrierst und mit a vergleichst.'
]},

{f:'M', j:11, g:'Differentialrechnung', t:'Newton-Verfahren: Nullstelle näherungsweise bestimmen', s:[
 'Gesucht ist eine Nullstelle der Funktion f, die sich nicht exakt berechnen lässt.',
 'Verschaffe dir zuerst einen Überblick: Zeichne den Graphen oder suche einen Vorzeichenwechsel von f, um die Nullstelle grob einzugrenzen.',
 'Wähle einen Startwert in der Nähe der vermuteten Nullstelle.',
 'Bilde die Ableitung f Strich; sie wird in jedem Schritt gebraucht.',
 'Grundidee: Ersetze den Graphen in der Nähe des Startwerts durch seine Tangente.',
 'Lege die Tangente im Punkt mit dem Startwert an den Graphen an.',
 'Berechne die Nullstelle dieser Tangente; sie liegt in der Regel näher an der gesuchten Nullstelle als der Startwert.',
 'In Formeln: Der neue Wert ist der alte minus f an dieser Stelle geteilt durch f Strich an dieser Stelle.',
 'Wiederhole den Schritt mit dem neuen Wert; das Verfahren ist eine Iteration.',
 'Brich ab, wenn sich die Werte in der geforderten Genauigkeit nicht mehr ändern oder der Funktionswert nahe genug bei null liegt.',
 'Mache die Probe, indem du den gefundenen Wert in f einsetzt.',
 'Beachte die Grenzen: Ist die Ableitung an einer Stelle null oder liegt der Startwert ungünstig, kann das Verfahren scheitern oder zu einer ganz anderen Nullstelle führen.'
]},
{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus drei Seiten (SSS)', s:[
 'Gegeben sind die drei Seitenlängen a, b und c.',
 'Prüfe zuerst die Dreiecksungleichung: Je zwei Seiten zusammen müssen länger sein als die dritte. Sonst gibt es kein Dreieck.',
 'Fertige eine Planfigur an, eine freihändige Skizze mit allen gegebenen Stücken.',
 'Zeichne die längste Seite als Strecke; nenne ihre Endpunkte A und B. Das ist die Seite c.',
 'Stich mit dem Zirkel in A ein und stelle die Länge der Seite b ein.',
 'Zeichne damit einen Kreisbogen oberhalb der Strecke AB.',
 'Stich in B ein und stelle die Länge der Seite a ein.',
 'Zeichne damit einen zweiten Kreisbogen, der den ersten schneidet.',
 'Der Schnittpunkt der beiden Bögen ist der Punkt C.',
 'Verbinde A mit C und B mit C.',
 'Miss zur Probe alle drei Seiten nach; sie müssen mit den Vorgaben übereinstimmen.',
 'Nach dem Kongruenzsatz SSS ist das Dreieck durch die drei Seiten eindeutig festgelegt; die zweite Lösung unterhalb der Strecke ist nur die Spiegelung.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus zwei Seiten und Zwischenwinkel (SWS)', s:[
 'Gegeben sind zwei Seiten und der Winkel, der von ihnen eingeschlossen wird, zum Beispiel b, c und Alpha.',
 'Fertige eine Planfigur an und markiere darin die gegebenen Stücke.',
 'Prüfe, dass der gegebene Winkel wirklich zwischen den beiden gegebenen Seiten liegt. Nur dann gilt der Satz SWS.',
 'Zeichne die Seite c als Strecke AB.',
 'Trage im Punkt A mit dem Geodreieck den Winkel Alpha an die Strecke AB an und zeichne den freien Schenkel.',
 'Stich mit dem Zirkel in A ein und stelle die Länge der Seite b ein.',
 'Schlage einen Kreisbogen, der den freien Schenkel schneidet.',
 'Der Schnittpunkt ist der Punkt C.',
 'Verbinde B mit C; damit ist das Dreieck fertig.',
 'Miss zur Probe die Seite b und den Winkel Alpha nach.',
 'Nach dem Kongruenzsatz SWS ist das Dreieck damit eindeutig bestimmt.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus einer Seite und zwei Winkeln (WSW)', s:[
 'Gegeben sind eine Seite und die beiden Winkel, die an ihr anliegen, zum Beispiel c, Alpha und Beta.',
 'Prüfe, dass die Summe der beiden gegebenen Winkel kleiner als 180° ist. Sonst schneiden sich die Schenkel nicht.',
 'Fertige eine Planfigur an.',
 'Zeichne die Seite c als Strecke AB.',
 'Trage im Punkt A den Winkel Alpha an die Strecke an und zeichne den freien Schenkel.',
 'Trage im Punkt B den Winkel Beta an dieselbe Strecke an, und zwar auf derselben Seite wie Alpha.',
 'Zeichne auch hier den freien Schenkel.',
 'Die beiden freien Schenkel schneiden sich in einem Punkt; das ist der Punkt C.',
 'Zeichne die Seiten bis zu diesem Schnittpunkt aus.',
 'Miss zur Probe den dritten Winkel nach: Alle drei Winkel müssen zusammen 180° ergeben.',
 'Nach dem Kongruenzsatz WSW ist das Dreieck eindeutig bestimmt. Ist statt eines anliegenden Winkels der gegenüberliegende gegeben, rechne ihn zuerst über die Winkelsumme aus.'
]},

{f:'M', j:7, g:'Konstruktionen mit Zirkel und Lineal', t:'Konstruktion: Dreieck aus zwei Seiten und Gegenwinkel (SsW)', s:[
 'Gegeben sind zwei Seiten und der Winkel, der der längeren von beiden gegenüberliegt, zum Beispiel a, c und Alpha mit a größer als c.',
 'Prüfe genau diese Bedingung: Der gegebene Winkel muss der längeren Seite gegenüberliegen. Nur dann ist die Konstruktion eindeutig.',
 'Fertige eine Planfigur an und markiere die gegebenen Stücke.',
 'Zeichne die Seite c als Strecke AB.',
 'Trage im Punkt A den Winkel Alpha an und zeichne den freien Schenkel ausreichend lang.',
 'Stich mit dem Zirkel in B ein und stelle die Länge der Seite a ein.',
 'Schlage einen Kreisbogen um B.',
 'Weil a länger als c ist, schneidet der Bogen den freien Schenkel genau einmal im Bereich des Dreiecks; dieser Schnittpunkt ist C.',
 'Verbinde B mit C.',
 'Miss zur Probe die Seite a und den Winkel Alpha nach.',
 'Liegt der gegebene Winkel dagegen der kürzeren Seite gegenüber, schneidet der Bogen zweimal: Dann gibt es zwei verschiedene Dreiecke, und die Angaben legen die Figur nicht eindeutig fest.'
]},

];

const FA={M:'Mathematik',Ph:'Physik'};
window.TafelReihen={
  verfuegbar:()=>A.length>0,
  anzahl:()=>A.length,
  /* gleiche Struktur wie die anderen Quellen des Auswahlfensters */
  daten(){ return A.map(e=>{
    const o={ f:e.f, j:e.j, g:e.g, b:e.t,
      e:e.s.length+' Schritte · '+e.s[0].slice(0,70)+(e.s[0].length>70?' …':''),
      schritte:e.s.slice() };
    /* Veranschaulichungen: Konstruktionen und geometrische Beweise bekommen
       je Schritt ein Bild, Vorgehensketten eine Gesamtfigur. Erst beim
       Übernehmen gezeichnet, im Auswahlfenster nur die Vorschau.           */
    try{ const v=vorschau(e.t); if(v) o.bild=v; }catch(err){}
    if(SCHRITTBILD[e.t]) o.bilder=()=>schrittBilder(e.t);
    if(GESAMTBILD[e.t])  o.figur =()=>gesamtBild(e.t);
    return o; }); },
  fachName:k=>FA[k]||k
};
})();

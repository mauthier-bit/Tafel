/* Vorlagen für „Bild beschriften".
   Jede Vorlage zeichnet sich selbst in einen 2D-Kontext (Breite W, Höhe H, Seitenverhältnis 4:3).
   Koordinaten sind Bruchteile der Box (x von links, y von oben); Radien werden in W gemessen,
   damit Kreise auch auf einer breiten Box rund bleiben.
   marken: [x, y, lx, ly, Text] – Punkt und Lage des Beschriftungskästchens.                  */
(function(){
"use strict";
function H(g,W,Ht){
  const X=x=>x*W, Y=y=>y*Ht, R=r=>r*W;
  return {
    X,Y,R,
    linie(x1,y1,x2,y2,c,w){ g.strokeStyle=c||'#334155'; g.lineWidth=(w||1.6)*W/600; g.beginPath(); g.moveTo(X(x1),Y(y1)); g.lineTo(X(x2),Y(y2)); g.stroke(); },
    kreis(cx,cy,r,strich,fuell,w){ g.beginPath(); g.arc(X(cx),Y(cy),R(r),0,7);
      if(fuell){ g.fillStyle=fuell; g.fill(); } if(strich!==false){ g.strokeStyle=strich||'#334155'; g.lineWidth=(w||2)*W/600; g.stroke(); } },
    ellipse(cx,cy,rx,ry,strich,fuell,w){ g.beginPath(); g.ellipse(X(cx),Y(cy),R(rx),R(ry),0,0,7);
      if(fuell){ g.fillStyle=fuell; g.fill(); } if(strich!==false){ g.strokeStyle=strich||'#334155'; g.lineWidth=(w||2)*W/600; g.stroke(); } },
    bogen(cx,cy,r,a1,a2,c,w){ g.beginPath(); g.arc(X(cx),Y(cy),R(r),a1,a2); g.strokeStyle=c||'#334155'; g.lineWidth=(w||2)*W/600; g.stroke(); },
    text(t,x,y,px,c,align){ g.fillStyle=c||'#475569'; g.textAlign=align||'center'; g.textBaseline='middle';
      g.font='600 '+Math.round((px||13)*W/600)+'px -apple-system,BlinkMacSystemFont,sans-serif'; g.fillText(t,X(x),Y(y)); },
    pfeil(x1,y1,x2,y2,c,w){ const a=Math.atan2(Y(y2)-Y(y1),X(x2)-X(x1)), L=R(0.028);
      g.strokeStyle=c||'#334155'; g.lineWidth=(w||1.8)*W/600; g.beginPath(); g.moveTo(X(x1),Y(y1)); g.lineTo(X(x2),Y(y2)); g.stroke();
      g.beginPath(); g.moveTo(X(x2),Y(y2)); g.lineTo(X(x2)-L*Math.cos(a-0.4),Y(y2)-L*Math.sin(a-0.4));
      g.lineTo(X(x2)-L*Math.cos(a+0.4),Y(y2)-L*Math.sin(a+0.4)); g.closePath(); g.fillStyle=c||'#334155'; g.fill(); }
  };
}

const V=[
/* ---------------- Auge ---------------- */
{ id:'auge', name:'Das Auge (Querschnitt)', fach:'Biologie / Physik',
  marken:[[0.30,0.50,0.12,0.26,'Hornhaut'],[0.355,0.50,0.11,0.84,'Pupille'],[0.392,0.385,0.26,0.08,'Iris'],
          [0.405,0.50,0.36,0.94,'Linse'],[0.58,0.52,0.63,0.94,'Glaskörper'],[0.745,0.345,0.84,0.30,'Netzhaut'],
          [0.885,0.615,0.87,0.86,'Sehnerv'],[0.56,0.235,0.60,0.07,'Lederhaut']],
  zeichne(g,W,Ht){ const h=H(g,W,Ht);
    h.kreis(0.54,0.50,0.26,'#64748b','#eff6ff',2.6);                       /* Lederhaut + Glaskörper */
    h.bogen(0.54,0.50,0.225,-1.15,1.15,'#f59e0b',2.4);                      /* Netzhaut */
    h.bogen(0.398,0.50,0.122,2.12,4.16,'#0ea5e9',3.2);                      /* Hornhaut */
    h.linie(0.372,0.392,0.405,0.445,'#7c3aed',3);                           /* Iris oben */
    h.linie(0.372,0.608,0.405,0.555,'#7c3aed',3);                           /* Iris unten */
    h.ellipse(0.408,0.50,0.032,0.082,'#2563eb','#dbeafe',2.2);              /* Linse */
    g.save(); g.strokeStyle='#94a3b8'; g.lineWidth=5*W/600; g.lineCap='round';
    g.beginPath(); g.moveTo(h.X(0.775),h.Y(0.575)); g.lineTo(h.X(0.95),h.Y(0.655)); g.stroke(); g.restore();  /* Sehnerv */
    h.linie(0.30,0.50,0.345,0.50,'#cbd5e1',1.2); }                          /* Blickachse */
},
/* ---------------- Ohr ---------------- */
{ id:'ohr', name:'Das Ohr (Querschnitt)', fach:'Biologie / Physik',
  marken:[[0.115,0.295,0.13,0.08,'Ohrmuschel'],[0.33,0.50,0.25,0.92,'Gehörgang'],[0.458,0.505,0.40,0.10,'Trommelfell'],
          [0.54,0.415,0.65,0.08,'Gehörknöchelchen'],[0.70,0.235,0.87,0.13,'Bogengänge'],[0.70,0.565,0.73,0.92,'Schnecke'],
          [0.875,0.685,0.90,0.47,'Hörnerv'],[0.455,0.745,0.17,0.74,'Ohrtrompete']],
  zeichne(g,W,Ht){ const h=H(g,W,Ht);
    h.bogen(0.195,0.50,0.155,1.9,4.38,'#64748b',3.4);                        /* Ohrmuschel */
    h.bogen(0.20,0.50,0.095,2.1,4.18,'#94a3b8',2.2);
    g.save(); g.fillStyle='#f1f5f9'; g.beginPath();                           /* Gehörgang als Röhre */
    g.moveTo(h.X(0.215),h.Y(0.435)); g.lineTo(h.X(0.452),h.Y(0.452));
    g.lineTo(h.X(0.452),h.Y(0.558)); g.lineTo(h.X(0.215),h.Y(0.575)); g.closePath(); g.fill(); g.restore();
    h.linie(0.215,0.435,0.452,0.452,'#64748b',2.2);
    h.linie(0.215,0.575,0.452,0.558,'#64748b',2.2);
    h.ellipse(0.555,0.475,0.085,0.105,'#cbd5e1','rgba(241,245,249,.7)',1.8);  /* Paukenhöhle */
    h.linie(0.449,0.425,0.470,0.585,'#0ea5e9',3.6);                           /* Trommelfell */
    h.linie(0.466,0.505,0.515,0.425,'#b45309',3);                             /* Hammer */
    h.linie(0.515,0.425,0.565,0.405,'#b45309',3);                             /* Amboss */
    h.kreis(0.590,0.425,0.021,'#b45309','#fde68a',2.2);                       /* Steigbügel */
    h.kreis(0.682,0.215,0.047,'#16a34a',null,2.2);                            /* Bogengänge */
    h.kreis(0.737,0.252,0.044,'#16a34a',null,2.2);
    h.kreis(0.686,0.295,0.040,'#16a34a',null,2.2);
    g.save(); g.strokeStyle='#7c3aed'; g.lineWidth=3*W/600; g.beginPath();     /* Schnecke */
    for(let i=0;i<=260;i++){ const t=i/260*11.5, r=(0.010+0.0062*t)*W, a=t-1.2;
      const x=h.X(0.705)+r*Math.cos(a), y=h.Y(0.555)+r*Math.sin(a); i?g.lineTo(x,y):g.moveTo(x,y); }
    g.stroke(); g.restore();
    h.linie(0.615,0.445,0.660,0.470,'#94a3b8',2);                             /* Verbindung Steigbügel–Schnecke */
    g.save(); g.strokeStyle='#94a3b8'; g.lineWidth=5*W/600; g.lineCap='round';
    g.beginPath(); g.moveTo(h.X(0.775),h.Y(0.635)); g.lineTo(h.X(0.955),h.Y(0.725)); g.stroke(); g.restore();  /* Hörnerv */
    g.save(); g.fillStyle='#f8fafc'; g.beginPath();                           /* Ohrtrompete */
    g.moveTo(h.X(0.515),h.Y(0.565)); g.lineTo(h.X(0.375),h.Y(0.835));
    g.lineTo(h.X(0.425),h.Y(0.855)); g.lineTo(h.X(0.565),h.Y(0.585)); g.closePath(); g.fill(); g.restore();
    h.linie(0.515,0.565,0.375,0.835,'#64748b',2.2);
    h.linie(0.565,0.585,0.425,0.855,'#64748b',2.2); }
},
/* ---------------- Zahlbereiche ---------------- */
{ id:'zahlbereiche', name:'Zahlbereiche als Mengenblasen', fach:'Mathematik 5–9',
  marken:[[0.37,0.62,0.16,0.94,'ℕ – natürliche Zahlen'],[0.58,0.70,0.53,0.95,'ℤ – ganze Zahlen'],
          [0.72,0.745,0.81,0.94,'ℚ – rationale Zahlen'],[0.50,0.115,0.50,0.045,'ℝ – reelle Zahlen']],
  zeichne(g,W,Ht){ const h=H(g,W,Ht);
    h.ellipse(0.50,0.50,0.45,0.33,'#2563eb','#eff6ff',2.4);
    h.ellipse(0.46,0.53,0.36,0.26,'#7c3aed','#f5f3ff',2.2);
    h.ellipse(0.42,0.56,0.25,0.175,'#16a34a','#f0fdf4',2.2);
    h.ellipse(0.37,0.59,0.145,0.10,'#ea580c','#fff7ed',2.2);
    h.text('1   2   3',0.37,0.59,15,'#9a3412');
    h.text('−5',0.60,0.555,15,'#166534'); h.text('−12',0.265,0.405,15,'#166534');
    h.text('¾',0.715,0.665,16,'#6d28d9'); h.text('−0,25',0.305,0.265,15,'#6d28d9');
    h.text('√2',0.805,0.285,16,'#1d4ed8'); h.text('π',0.845,0.695,17,'#1d4ed8'); }
},
/* ---------------- Fadenstrahlrohr ---------------- */
{ id:'fadenstrahl', name:'Fadenstrahlrohr', fach:'Physik 10–12',
  marken:[[0.50,0.195,0.52,0.075,'Glaskolben'],[0.135,0.46,0.14,0.90,'Helmholtzspulen'],
          [0.475,0.775,0.33,0.94,'Glühkathode'],[0.475,0.655,0.17,0.70,'Anode'],
          [0.53,0.30,0.72,0.09,'Elektronenstrahl'],[0.70,0.86,0.80,0.93,'Magnetfeld B']],
  zeichne(g,W,Ht){ const h=H(g,W,Ht);
    h.ellipse(0.135,0.46,0.035,0.26,'#b45309','#fde68a',2.4);                 /* Spulen */
    h.ellipse(0.865,0.46,0.035,0.26,'#b45309','#fde68a',2.4);
    h.kreis(0.50,0.46,0.27,'#64748b','rgba(239,246,255,.85)',2.6);            /* Glaskolben */
    g.save(); g.strokeStyle='#16a34a'; g.lineWidth=3.4*W/600;
    g.beginPath(); g.arc(h.X(0.525),h.Y(0.455),h.R(0.145),0,7); g.stroke(); g.restore();   /* Elektronenstrahl */
    h.pfeil(0.525,0.31,0.60,0.325,'#16a34a',2.2);
    g.save(); g.fillStyle='#cbd5e1'; g.strokeStyle='#475569'; g.lineWidth=2*W/600;
    g.beginPath(); g.moveTo(h.X(0.44),h.Y(0.80)); g.lineTo(h.X(0.51),h.Y(0.80));
    g.lineTo(h.X(0.495),h.Y(0.70)); g.lineTo(h.X(0.455),h.Y(0.70)); g.closePath(); g.fill(); g.stroke(); g.restore();
    h.linie(0.452,0.775,0.498,0.775,'#dc2626',3);                             /* Glühwendel */
    h.linie(0.425,0.655,0.525,0.655,'#334155',2.6);                           /* Anode */
    h.linie(0.475,0.70,0.475,0.655,'#94a3b8',1.6);
    g.save(); g.setLineDash([6*W/600,5*W/600]);
    h.pfeil(0.20,0.86,0.80,0.86,'#b45309',1.8); g.restore();
    h.text('B',0.205,0.815,15,'#b45309'); }
}
];
window.TafelBeschriftVorlagen=V;
})();

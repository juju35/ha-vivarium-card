// ---------------------------------------------------------------------------
// The tank: an animated reef or planted freshwater scene, the card's illustrated header
// ---------------------------------------------------------------------------

// Drawn in a 400 × 80 box anchored to the right of the header and standing on its substrate strip; a wider card
// shows more water on the left, a narrower one crops the left part (the texts sit there). Every animation lasts a
// divisor of 8 s, so that a recording of 8 s loops.

// A fish facing right around (0, 0), drawn the same way for every species: a countershaded body (dark back, pale
// belly) with scales, a lateral line, a gill cover and a glint, translucent rayed fins, an eye with its iris and
// highlight. `pattern` is drawn clipped to the body (bars, stripes, spots). The tail (class tf) beats and the
// pectoral fin (class pf) flutters while it swims.
export const FISH_TAILS = {
  fork: (b, p, L, H) => `M${b} ${-p} L${-L / 2} ${-H * 0.46} Q${-L * 0.4} 0 ${-L / 2} ${H * 0.46} L${b} ${p}Z`,
  lyre: (b, p, L, H) => `M${b} ${-p} Q${-L * 0.46} ${-H * 0.3} ${-L * 0.62} ${-H * 0.62} Q${-L * 0.44} 0 ${-L * 0.62} ${H * 0.62} Q${-L * 0.46} ${H * 0.3} ${b} ${p}Z`,
  round: (b, p, L, H) => `M${b} ${-p} Q${-L * 0.52} ${-H * 0.5} ${-L * 0.53} 0 Q${-L * 0.52} ${H * 0.5} ${b} ${p}Z`,
  square: (b, p, L, H) => `M${b} ${-p} L${-L * 0.5} ${-H * 0.4} Q${-L * 0.47} 0 ${-L * 0.5} ${H * 0.4} L${b} ${p}Z`,
  veil: (b, p, L, H) => `M${b} ${-p} Q${-L * 0.55} ${-H * 1.1} ${-L * 0.95} ${-H * 0.5} Q${-L * 0.78} 0 ${-L * 1.0} ${H * 0.7} Q${-L * 0.55} ${H * 1.2} ${b} ${p}Z`,
};
export const f2 = (n) => Math.round(n * 100) / 100;
export const fishArt = ({ id, L = 20, H = 8, top, mid, bot = "#f4f4f0", fin, finOp = 0.75, tail = "fork", dorsal = "low", anal = "low", pattern = "", extra = "", eye = 0.11, iris = "#d9c27a", mouth = 0 }) => {
  const nose = L * 0.5;
  const b = -L * 0.32;
  const p = H * 0.14;
  const hT = H / 2;
  const hB = H * 0.46;
  const body = `M${f2(nose)} ${f2(H * 0.06)} C${f2(nose)} ${f2(-hT * 0.75)} ${f2(L * 0.24)} ${f2(-hT)} ${f2(L * 0.02)} ${f2(-hT)} C${f2(-L * 0.18)} ${f2(-hT)} ${f2(b + L * 0.05)} ${f2(-p * 1.7)} ${f2(b)} ${f2(-p)} L${f2(b)} ${f2(p)} C${f2(b + L * 0.05)} ${f2(p * 1.7)} ${f2(-L * 0.18)} ${f2(hB)} ${f2(L * 0.02)} ${f2(hB)} C${f2(L * 0.24)} ${f2(hB)} ${f2(nose)} ${f2(hB * 0.65)} ${f2(nose)} ${f2(H * 0.06)}Z`;
  const t = FISH_TAILS[tail](f2(b + 0.6), f2(p), L, H);
  const rays = (x0, y0, xs, ys, n) => Array.from({ length: n }, (_, i) => `M${f2(x0)} ${f2(y0)} L${f2(xs[0] + ((xs[1] - xs[0]) * i) / (n - 1))} ${f2(ys[0] + ((ys[1] - ys[0]) * i) / (n - 1))}`).join(" ");
  const dh = { low: 0.28, high: 0.65, sail: 1.1, none: 0, spiny: 0.42 }[dorsal] * H;
  const dorsalFin = dh
    ? dorsal === "spiny"
      ? `<path d="M${f2(L * 0.14)} ${f2(-hT * 0.92)} ${Array.from({ length: 7 }, (_, i) => `L${f2(L * 0.12 - i * L * 0.055)} ${f2(-hT - dh * (0.7 + (i % 2) * 0.3))} L${f2(L * 0.1 - i * L * 0.055)} ${f2(-hT * 0.98)}`).join(" ")} L${f2(-L * 0.28)} ${f2(-p * 2)}Z" fill="${fin}" opacity="${finOp}"/>`
      : `<path d="M${f2(L * 0.1)} ${f2(-hT * 0.96)} Q${f2(-L * 0.02)} ${f2(-hT - dh * 1.1)} ${f2(-L * 0.22)} ${f2(-hT - dh * 0.4)} L${f2(-L * 0.26)} ${f2(-p * 2.4)}Z" fill="${fin}" opacity="${finOp}"/><path d="${rays(-L * 0.02, -hT * 0.9, [L * 0.06, -L * 0.22], [-hT - dh * 0.8, -hT - dh * 0.3], 5)}" stroke="#000" stroke-width=".2" opacity=".25"/>`
    : "";
  const ah = { low: 0.22, high: 0.5, sail: 0.9, none: 0, spiny: 0.3 }[anal] * H;
  const analFin = ah ? `<path d="M${f2(-L * 0.04)} ${f2(hB * 0.94)} Q${f2(-L * 0.14)} ${f2(hB + ah)} ${f2(-L * 0.26)} ${f2(hB * 0.4 + ah * 0.5)} L${f2(-L * 0.27)} ${f2(p * 2)}Z" fill="${fin}" opacity="${finOp}"/>` : "";
  const ex = L * 0.34;
  const ey = -H * 0.1;
  const er = Math.max(0.55, H * eye);
  const g = `fa-${id}`;
  return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".5" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient><clipPath id="${g}-c"><path d="${body}"/></clipPath><pattern id="${g}-s" width="${f2(H * 0.22)}" height="${f2(H * 0.16)}" patternUnits="userSpaceOnUse"><path d="M0 ${f2(H * 0.16)} Q${f2(H * 0.11)} 0 ${f2(H * 0.22)} ${f2(H * 0.16)}" stroke="#000" stroke-width=".14" fill="none" opacity=".12"/></pattern></defs>
<g class="tf"><path d="${t}" fill="${fin}" opacity="${finOp}"/><path d="${rays(b + 0.6, 0, [-L * 0.5, -L * 0.5], [-H * 0.4, H * 0.4], 7)}" stroke="#000" stroke-width=".18" opacity=".25"/></g>
${dorsalFin}${analFin}
<path d="${body}" fill="url(#${g})"/>
<g clip-path="url(#${g}-c)">${pattern}<path d="${body}" fill="url(#${g}-s)"/><ellipse cx="${f2(L * 0.12)}" cy="${f2(-hT * 0.55)}" rx="${f2(L * 0.26)}" ry="${f2(H * 0.12)}" fill="#fff" opacity=".22"/></g>
<path d="M${f2(L * 0.27)} ${f2(-hT * 0.62)} Q${f2(L * 0.21)} 0 ${f2(L * 0.27)} ${f2(hB * 0.62)}" stroke="#000" stroke-width=".3" fill="none" opacity=".3"/>
<path d="M${f2(L * 0.25)} ${f2(-H * 0.18)} Q${f2(0)} ${f2(-H * 0.24)} ${f2(b + 1)} ${f2(-H * 0.02)}" stroke="#fff" stroke-width=".22" fill="none" opacity=".35"/>
<g class="pf"><path d="M${f2(L * 0.2)} ${f2(H * 0.12)} Q${f2(L * 0.06)} ${f2(H * 0.22)} ${f2(L * 0.04)} ${f2(H * 0.38)} Q${f2(L * 0.14)} ${f2(H * 0.34)} ${f2(L * 0.2)} ${f2(H * 0.18)}Z" fill="${fin}" opacity="${finOp * 0.85}"/></g>
${extra}
<circle cx="${f2(ex)}" cy="${f2(ey)}" r="${f2(er)}" fill="${iris}"/><circle cx="${f2(ex + er * 0.12)}" cy="${f2(ey)}" r="${f2(er * 0.68)}" fill="#0b0b0b"/><circle cx="${f2(ex + er * 0.38)}" cy="${f2(ey - er * 0.35)}" r="${f2(er * 0.3)}" fill="#fff"/>
${mouth ? `<path d="M${f2(nose - 0.2)} ${f2(H * 0.08)} l${f2(-L * 0.05)} ${f2(H * 0.04)}" stroke="#000" stroke-width=".3" opacity=".5"/>` : ""}`;
};

// The species of every scene, facing right around (0, 0): fish (fishArt) and the other animals of the water.
export const bars = (L, H, xs, w, c, op = 1) => xs.map((x) => `<rect x="${f2(L * x - (L * w) / 2)}" y="${f2(-H)}" width="${f2(L * w)}" height="${f2(H * 2)}" fill="${c}" opacity="${op}"/>`).join("");
export const FISH_T={
tetra:(red="#E8423B",str="#22B8FF",body="#dfe8f2")=>fishArt({id:`tetra${red.slice(1)}${str.slice(1)}`,L:15,H:4.6,top:"#6f7f86",mid:body,bot:"#f5f7f8",fin:body,finOp:.45,
 pattern:`<path d="M${f2(15*-.3)} 1.5 L${f2(15*.12)} .9 L${f2(15*.12)} 2.6 L${f2(15*-.3)} 2.6Z" fill="${red}"/><rect x="${f2(15*-.3)}" y="-.75" width="${f2(15*.62)}" height=".9" fill="${str}"/><rect x="${f2(15*-.3)}" y="-.75" width="${f2(15*.62)}" height=".35" fill="#fff" opacity=".5"/>`}),
rasbora:fishArt({id:"rasbora",L:16,H:6,top:"#c97b5b",mid:"#f2a07e",bot:"#fde3d6",fin:"#f6a887",finOp:.6,pattern:`<path d="M-1 -3 L4 -3 L-3.4 2 L-5.4 .6Z" fill="#1d1d1d"/>`}),
cich:(b,bar,fin,belly="#ffffff55")=>fishArt({id:`cich${b.slice(1)}`,L:26,H:10,top:bar,mid:b,bot:b,fin,dorsal:"spiny",anal:"spiny",tail:"square",mouth:1,
 pattern:`${bars(26,10,[-.22,-.1,.02,.14,.26],.055,bar,.55)}<ellipse cx="2" cy="4" rx="10" ry="2.4" fill="${belly}"/>`,extra:`<g fill="#ffd54f">${[[-6.6,5.8],[-8.2,6.2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>`}),
betta:(c1,c2,c3)=>{const id=`betta${c1.slice(1)}`;return `<defs><linearGradient id="${id}-f" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient></defs>
<g class="tf"><path d="M-4 -1.6 Q-14 -14 -24 -9 Q-30 -2 -22 4 Q-28 10 -20 14 Q-12 14 -4 2Z" fill="url(#${id}-f)" opacity=".9"/><path d="M-4 0 L-22 -8 M-4 0 L-26 -2 M-4 0 L-24 6 M-4 0 L-18 12" stroke="#000" stroke-width=".25" opacity=".25"/></g>
<path d="M2 -3 Q-4 -12 -12 -11 Q-8 -5 -3 -2.6Z" fill="url(#${id}-f)" opacity=".85"/><path d="M2 2.4 Q-2 12 -12 13 Q-8 6 -3 2.4Z" fill="url(#${id}-f)" opacity=".85"/>`+fishArt({id,L:16,H:6,top:c1,mid:c2,bot:c2,fin:c3,finOp:.8,tail:"round",dorsal:"none",anal:"none",extra:`<path d="M3 2.6 Q2 7 0 9" stroke="${c3}" stroke-width=".8" fill="none"/>`});},
gold:(c="#f7871b",t="#ffb347",hl="#ffd08a")=>fishArt({id:`gold${c.slice(1)}`,L:20,H:12,top:c,mid:c,bot:hl,fin:t,finOp:.75,tail:"veil",dorsal:"high",anal:"low",iris:"#e0a040",
 extra:`<path d="M6 -5 Q10 -8 11 -3 Q9.6 -1 6.4 -2Z" fill="${hl}" opacity=".9"/><g fill="${t}" opacity=".5">${[[6.4,-4.6],[8,-5.2],[9.2,-4],[7.4,-3.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9"/>`).join("")}</g>`}),
koi:(p="#e8442e",b="#fafafa")=>fishArt({id:`koi${p.slice(1)}${b.slice(1)}`,L:28,H:7.4,top:b,mid:b,bot:b,fin:b,finOp:.7,tail:"fork",dorsal:"low",mouth:1,iris:"#bdbdbd",
 pattern:`<path d="M-6 -4 Q-2 -1 4 -4 Q8 -2 6 1 Q0 0 -6 -1Z" fill="${p}"/><ellipse cx="11" cy="-1.6" rx="3" ry="1.8" fill="${p}"/><ellipse cx="-4" cy="-1" rx="2" ry="1.2" fill="#212121" opacity="${b===p?0:.7}"/>`,
 extra:`<path d="M13.8 .6 q1.4 .8 1.4 2 M13.4 1 q.6 1 .2 1.8" stroke="${b}" stroke-width=".4" fill="none"/>`}),
archer:fishArt({id:"archer",L:20,H:9,top:"#8fa3a8",mid:"#e3ebe8",bot:"#ffffff",fin:"#cfd8dc",finOp:.6,tail:"square",dorsal:"low",mouth:1,iris:"#c8e6c9",
 pattern:`<g fill="#1d1d1d">${[[-4.4,-4.6,2.4],[0,-4.2,2.2],[4.2,-4.4,2],[-7.2,-3.8,1.6]].map(([x,y,w])=>`<path d="M${x} ${y} l${w} 0 l-.8 3.6 l-${w-1.4} 0Z"/>`).join("")}</g>`}),
mud:fishArt({id:"mud",L:20,H:6,top:"#6d5a3c",mid:"#8a7552",bot:"#cbb999",fin:"#7a6644",finOp:.85,tail:"round",dorsal:"high",anal:"low",iris:"#a5d6a7",eye:.16,
 pattern:`<g fill="#5bc0eb">${[[-3,-1.2],[0,-.4],[3,-1.6],[-5.6,.2],[1.6,1]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".45"/>`).join("")}</g><g fill="#3f3220" opacity=".5">${[[-1.6,-2.2],[2,-2.6],[5,-1],[-4,-2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>`,
 extra:`<path d="M3 2 Q1 5 -1.6 6 Q2 6 4 3" fill="#7a6644"/>`}),
anthias:fishArt({id:"anthias",L:18,H:7,top:"#f06a6a",mid:"#ff8a65",bot:"#ffccbc",fin:"#ff6e9a",finOp:.85,tail:"lyre",dorsal:"low",iris:"#ff8a80",
 pattern:`<path d="M9 -1 L1 1.4" stroke="#7e57c2" stroke-width=".7"/>`,extra:`<path d="M2.4 -3.6 L2 -7.6" stroke="#ff4081" stroke-width=".6"/>`}),
wrasse:fishArt({id:"wrasse",L:18,H:5,top:"#7e57c2",mid:"#e53935",bot:"#ffcdd2",fin:"#ffd54f",finOp:.8,tail:"round",dorsal:"low",iris:"#ffcc80",
 pattern:`<path d="M-7 -3 L9 -3 L9 -.8 Q2 -1.6 -7 -.4Z" fill="#7e57c2"/><path d="M-7 1.2 Q2 .6 9 1.4" stroke="#ffeb3b" stroke-width=".5" fill="none"/>`}),
goby:fishArt({id:"goby",L:14,H:4.8,top:"#f2c200",mid:"#ffd740",bot:"#fff3b0",fin:"#ffd740",finOp:.85,tail:"round",dorsal:"high",anal:"low",eye:.15,iris:"#ffe082",
 pattern:`<g fill="#29b6f6">${[[-3,-1.2],[0,-.6],[2.6,-1.4],[-1.4,1],[1.6,.8],[4.6,-.2]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".38"/>`).join("")}</g>`}),
cleaner:`<defs><linearGradient id="an-cl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e53935"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#e53935"/></linearGradient></defs>
<g class="lg-a"><path d="M-2 2 l-1 4 M2 2 l1 4.2 M5 1.6 l2 3.6" stroke="#ef9a9a" stroke-width=".5"/></g><g class="lg-b"><path d="M0 2 l0 4.2 M3.6 1.8 l1.4 4" stroke="#ef9a9a" stroke-width=".5"/></g>
<path d="M-12 1 Q-11 -3.6 -3 -4 Q6 -4.4 10 -1 Q8 2.4 0 2.6 Q-8 2.8 -12 1Z" fill="url(#an-cl)"/><path d="M-8 -3 v5 M-4 -3.6 v6 M0 -3.8 v6 M4 -3.4 v5.4" stroke="#b71c1c" stroke-width=".3" opacity=".5"/>
<path d="M-12 1 l-3 -2.6 l1 2.6 l-1 2.6Z" fill="#e53935"/><g fill="#fff"><circle cx="-13.4" cy="-.6" r=".5"/><circle cx="-13.4" cy="2.6" r=".5"/></g>
<path d="M9.4 -1.6 Q16 -10 24 -12 M9.6 -1.2 Q18 -6 26 -5" stroke="#fff" stroke-width=".35" fill="none" class="sway"/><circle cx="8.6" cy="-2" r=".6" fill="#111"/>`,
shrimp:(c,s="#ffffff55")=>`<g class="lg-a"><path d="M-2 1.4 l-.6 2.4 M1 1.4 l.4 2.6" stroke="${c}" stroke-width=".35" opacity=".8"/></g><g class="lg-b"><path d="M-.6 1.4 l0 2.6 M2.4 1.2 l.8 2.2" stroke="${c}" stroke-width=".35" opacity=".8"/></g>
<path d="M-6 .8 Q-5.6 -2.4 -1 -2.6 Q3.6 -2.6 5 -.6 Q4 1.4 0 1.6 Q-4 1.8 -6 .8Z" fill="${c}"/><path d="M-4 -2 v3.2 M-1.6 -2.4 v3.8 M.8 -2.4 v3.8" stroke="${s}" stroke-width=".35"/>
<path d="M-6 .8 l-2.2 -1.6 l.6 1.6 l-.6 1.6Z" fill="${c}"/><path d="M4.4 -1 Q8 -6 11 -6 M4.6 -.8 Q9 -3.6 12 -2.6" stroke="${c}" stroke-width=".25" fill="none" opacity=".8"/><circle cx="4" cy="-1.2" r=".4" fill="#111"/><path d="M-3 -2.4 Q0 -3.2 3 -2.2" stroke="#fff" stroke-width=".35" fill="none" opacity=".5"/>`,
snail:(sc="#8d6e63",bd="#d7ccc8")=>`<path d="M-6 3 Q-2 1.6 5 2 Q8 2.4 9 3.6 Q2 4.6 -6 4Z" fill="${bd}"/><path d="M6.4 2 Q7.4 -1 8.6 -1.6 M7.4 2.2 Q9 0 10 -.2" stroke="${bd}" stroke-width=".55" fill="none" stroke-linecap="round"/>
<circle cx="-.6" cy="-1" r="4.6" fill="${sc}"/><path d="M-.6 -5.6 A4.6 4.6 0 0 1 4 -1 A3.4 3.4 0 0 1 .6 2.4 A2.4 2.4 0 0 1 -1.8 0 A1.4 1.4 0 0 1 -.4 -1.4" stroke="#000" stroke-width=".5" fill="none" opacity=".35"/><path d="M-4 -3 Q-1.6 -5.4 1.4 -5" stroke="#fff" stroke-width=".6" fill="none" opacity=".35"/>`,
horse:(c="#f9a825",d="#f57f17")=>`<path d="M0 -12 Q5 -14 7 -10 Q5.6 -8.6 3.4 -9.2 Q4.4 -6 2.6 -3 Q4.6 2 2 7 Q0 10.4 -2 12 Q-4 14 -2.6 15.4 Q-.6 15.6 -1 14 Q.4 12.6 1 10.6 Q-2 8 -2 3 Q-2.4 -2 -1 -6 Q-2 -9 0 -12Z" fill="${c}"/>
<g stroke="${d}" stroke-width=".55" fill="none">${[-8,-5.4,-2.6,0,2.6,5.2,7.8].map(y=>`<path d="M-1.8 ${y} q2.4 .8 4 -.2"/>`).join("")}</g>
<path d="M7 -10 L10.4 -9.6 L10.4 -8.4 L7 -8.8" fill="${d}"/><path d="M-.4 -12.4 l-.6 -2 l1.2 1 l.4 -1.8 l.8 1.6 l1 -1.4 l.2 1.8" fill="${d}"/>
<path class="pf" d="M-1.6 -1 Q-6 0 -5 3 Q-3 2 -1.8 1Z" fill="${c}" opacity=".7"/><circle cx="3.6" cy="-11" r=".9" fill="#111"/><circle cx="3.9" cy="-11.3" r=".3" fill="#fff"/><path d="M-1 -10 Q1 -12 3 -11" stroke="#fff" stroke-width=".4" fill="none" opacity=".4"/>`,
jelly:(c="#c5cae9",c2="#fff")=>{const id=`jl${c.slice(1)}`;return `<defs><radialGradient id="${id}" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="${c2}" stop-opacity=".95"/><stop offset=".6" stop-color="${c}" stop-opacity=".75"/><stop offset="1" stop-color="${c}" stop-opacity=".35"/></radialGradient></defs>
<g class="hang">${[-6,-3,0,3,6].map((x,i)=>`<path d="M${x} 1 Q${x+2} 8 ${x-1} 14 T${x+1} ${22+i%2*3}" stroke="${c}" stroke-width=".4" fill="none" opacity=".7"/>`).join("")}<path d="M-2 1 Q-3 7 -1 12 Q1 7 2 1" fill="${c}" opacity=".5"/></g>
<path d="M-9 1 Q-9 -9 0 -9 Q9 -9 9 1 Q6 2.6 4.6 1 Q2.6 2.8 0 1 Q-2.6 2.8 -4.6 1 Q-6 2.6 -9 1Z" fill="url(#${id})"/><g fill="none" stroke="${c2}" stroke-width=".5" opacity=".7"><circle cx="-3" cy="-4" r="1.6"/><circle cx="3" cy="-4" r="1.6"/><circle cx="0" cy="-6.2" r="1.4"/></g><path d="M-6 -5 Q-3 -8 1 -8" stroke="#fff" stroke-width=".6" fill="none" opacity=".6"/>`},
lion:fishArt({id:"lion",L:22,H:9,top:"#8d2a1a",mid:"#f3e1d2",bot:"#f6e8dc",fin:"#f3d7c6",finOp:.7,tail:"round",dorsal:"none",anal:"low",iris:"#ffab91",
 pattern:bars(22,9,[-.25,-.16,-.07,.02,.11,.2,.3],.04,"#a52714",.9),
 extra:`<g stroke="#a52714" stroke-width=".7" stroke-linecap="round">${Array.from({length:11},(_,i)=>`<path d="M${f2(5-i*1.4)} -4 L${f2(4-i*1.9)} ${f2(-11-Math.sin(i)*2)}"/>`).join("")}</g><g stroke="#f6e8dc" stroke-width=".3" stroke-dasharray="1 1">${Array.from({length:11},(_,i)=>`<path d="M${f2(5-i*1.4)} -4 L${f2(4-i*1.9)} ${f2(-11-Math.sin(i)*2)}"/>`).join("")}</g>
<g class="pf">${Array.from({length:8},(_,i)=>`<path d="M4 2 Q${f2(-1-i*.5)} ${f2(4+i*.9)} ${f2(-4-i*.9)} ${f2(5+i*1.1)}" stroke="${i%2?"#a52714":"#f3d7c6"}" stroke-width="1" fill="none" opacity=".85"/>`).join("")}</g>`}),
moray:`<defs><linearGradient id="an-mo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d7d1f"/><stop offset="1" stop-color="#9ccc65"/></linearGradient></defs>
<path class="tail" d="M-18 8 Q-12 0 -4 -1.6 Q4 -3.4 12 -3.6 Q16 -2.6 16 .4 Q12 2.4 4 2.4 Q-6 4 -12 10Z" fill="url(#an-mo)"/>
<path d="M-18 8 Q-12 0 -4 -1.6 Q4 -3.4 12 -3.6" stroke="#4e6b1a" stroke-width=".9" fill="none"/><g fill="#33461a" opacity=".55">${[[-10,3],[-6,.6],[-2,-.4],[2,-1.8],[6,-2],[-8,5],[0,1],[5,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g>
<path d="M12.6 .4 L16.6 1.6 L12.6 2.4" fill="#2e3b12"/><g fill="#fff"><path d="M13.4 .6 l.3 .6 l.3 -.6 M14.4 .9 l.3 .6 l.3 -.6"/></g><circle cx="12.4" cy="-1.8" r=".7" fill="#ffe082"/><circle cx="12.5" cy="-1.8" r=".35" fill="#111"/>`,
stingray:`<defs><radialGradient id="an-st" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#a1887f"/><stop offset="1" stop-color="#6d5a4f"/></radialGradient></defs>
<path class="tail" d="M-10 0 Q-22 -1 -34 2" stroke="#6d5a4f" stroke-width=".8" fill="none"/><path d="M-10 0 Q-6 -4.6 4 -4.4 Q14 -3 15 0 Q12 2.4 4 2.8 Q-6 2.6 -10 0Z" fill="url(#an-st)"/>
<g fill="#4fc3f7">${[[-4,-1.6],[0,-2.6],[4,-1.8],[8,-1.2],[-1,.4],[3,.6],[7,.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g><path class="pf" d="M-8 1 Q0 4 12 1" stroke="#5d4a3f" stroke-width=".8" fill="none"/><circle cx="10.2" cy="-1.8" r=".6" fill="#111"/><circle cx="11.6" cy="-1.4" r=".5" fill="#111"/>`,
angler:`<defs><radialGradient id="an-ag" cx=".55" cy=".35" r=".7"><stop offset="0" stop-color="#4a5061"/><stop offset="1" stop-color="#16181f"/></radialGradient><radialGradient id="an-lu" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f4ff81"/><stop offset=".4" stop-color="#c6ff00" stop-opacity=".7"/><stop offset="1" stop-color="#c6ff00" stop-opacity="0"/></radialGradient></defs>
<g class="tf"><path d="M-9 0 L-15 -5 Q-13 0 -15 5Z" fill="#2a2e38"/></g><path d="M-10 0 Q-9 -9 1 -9.4 Q10 -9 11 -1 Q10 6 0 7 Q-8 6.6 -10 0Z" fill="url(#an-ag)"/>
<path d="M2 -9 Q6 -16 12 -14.6" stroke="#2a2e38" stroke-width=".7" fill="none"/><circle cx="12.6" cy="-14.4" r="4.4" fill="url(#an-lu)" class="gl"/><circle cx="12.6" cy="-14.4" r="1.2" fill="#f4ff81"/>
<path d="M11 -1 Q6 1 2 4 Q7 3 11 2Z" fill="#0b0c10"/><path d="M3.6 3.4 l.6 -1.6 l.6 1.2 l.7 -1.6 l.6 1.4 l.7 -1.6 l.6 1.4 l.6 -1.4" stroke="#eceff1" stroke-width=".45" fill="none"/>
<circle cx="5" cy="-4" r="1.3" fill="#cfd8dc"/><circle cx="5.2" cy="-4" r=".7" fill="#111"/><path class="pf" d="M-2 3 Q-6 6 -5 8 Q-2 6 -1 4Z" fill="#2a2e38"/>`,
lantern:fishArt({id:"lantern",L:14,H:4,top:"#1a2a44",mid:"#37507a",bot:"#8aa0c0",fin:"#4b6488",finOp:.6,tail:"fork",dorsal:"low",eye:.2,iris:"#90caf9",
 extra:`<g class="gl" fill="#80d8ff">${[-3.6,-2.2,-.8,.6,2,3.4].map(x=>`<circle cx="${x}" cy="1.3" r=".35"/>`).join("")}<circle cx="5.6" cy="-.2" r=".45"/></g>`}),
cod:fishArt({id:"cod",L:22,H:6,top:"#6b6252",mid:"#c9c3b4",bot:"#f2efe8",fin:"#9b917e",finOp:.75,tail:"square",dorsal:"low",anal:"low",mouth:1,iris:"#cfd8dc",
 pattern:`<g fill="#5d5546" opacity=".5">${[[-4,-2],[-1,-2.4],[2,-2],[5,-2.2],[-6,-1.4],[0,-1.4]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".4"/>`).join("")}</g>`,extra:`<path d="M-2 -3 L-3 -5 L-6 -3.2Z M-6.6 -2.6 L-7.4 -4 L-9.4 -2Z" fill="#9b917e" opacity=".8"/><path d="M10.4 1.6 l.4 1.6" stroke="#6b6252" stroke-width=".3"/>`}),
seal:`<defs><linearGradient id="an-se" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f6d78"/><stop offset=".6" stop-color="#8c9aa5"/><stop offset="1" stop-color="#c4ccd3"/></linearGradient></defs>
<g class="tf"><path d="M-17 0 L-24 -4.4 Q-21 0 -24 4.4Z" fill="#4d5a64"/></g><path d="M-17 0 Q-12 -5 0 -5.4 Q10 -5.6 15 -2 Q17 0 15 2 Q8 4.6 -2 4.4 Q-12 3.6 -17 0Z" fill="url(#an-se)"/>
<g fill="#3f4a53" opacity=".5">${[[-10,-2],[-6,-3],[-2,-2],[2,-3.4],[5,-2],[-8,0],[0,0]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx=".9" ry=".6"/>`).join("")}</g>
<g class="pf"><path d="M4 2.4 Q2 6 -2 7.4 Q2 7.6 6 3.4Z" fill="#4d5a64"/></g><circle cx="11.4" cy="-2.2" r="1.1" fill="#111"/><circle cx="11.7" cy="-2.5" r=".35" fill="#fff"/><path d="M15 0 l3 -.6 M15 .6 l3 .4 M15 .2 l2.8 1.4" stroke="#cfd8dc" stroke-width=".25"/><ellipse cx="15.4" cy="-.4" rx=".6" ry=".4" fill="#222"/>`,
butterfly:fishArt({id:"butterfly",L:20,H:16,top:"#fdd835",mid:"#ffeb3b",bot:"#fff59d",fin:"#fbc02d",finOp:.9,tail:"square",dorsal:"low",anal:"low",iris:"#212121",
 pattern:`<rect x="5.4" y="-9" width="2" height="18" fill="#212121"/><rect x="5" y="-9" width=".6" height="18" fill="#fff"/><path d="M-6 -6 Q0 -4 6 -6 M-6 -2 Q0 0 6 -2 M-6 2 Q0 4 6 2" stroke="#f9a825" stroke-width=".5" fill="none"/>`,
 extra:`<circle cx="-4.4" cy="-4.4" r="1.4" fill="#212121"/><circle cx="-4.4" cy="-4.4" r="1.9" fill="none" stroke="#fff" stroke-width=".4"/><path d="M10 .8 l2.6 .2" stroke="#212121" stroke-width=".8"/>`}),
tang:fishArt({id:"tang",L:30,H:15,top:"#1d4fc0",mid:"#2b6fe8",bot:"#4b8af0",fin:"#1a3f9e",finOp:.95,tail:"square",dorsal:"low",anal:"low",iris:"#0b1f4d",
 pattern:`<path d="M-8 -2.4 Q0 -8.4 12 -3.6 Q5 -2.6 2 2 Q-3 3.4 -8 -2.4Z M-9.6 -1 Q-6 2.4 -2 3.6 Q-6 4.6 -10 1.6Z" fill="#0b1f4d"/>`,
 extra:`<g class="tf"><path d="M${f2(-30*.31)} -2 L-15.2 -6.6 Q-13.6 0 -15.2 6.6 L${f2(-30*.31)} 2Z" fill="#f5c518"/></g><path d="M-6 3.6 l-1.6 1.4 l2.6 -.4Z" fill="#f5c518"/>`}),
clown:fishArt({id:"clown",L:26,H:11,top:"#e8650f",mid:"#f57c1f",bot:"#ff9a3c",fin:"#f57c1f",finOp:.95,tail:"round",dorsal:"low",anal:"low",iris:"#e65100",
 pattern:bars(26,11,[-.25,.0,.22],.09,"#fff")+bars(26,11,[-.25,.0,.22],.09,"none")+["-.295","-.205","-.045",".045",".175",".265"].map(x=>`<rect x="${f2(26*x-.3)}" y="-12" width=".6" height="24" fill="#1e1e1e"/>`).join(""),
 extra:`<path d="M-11.4 -3.4 Q-13.8 0 -11.4 3.4" stroke="#1e1e1e" stroke-width=".6" fill="none"/>`}),
apisto:fishArt({id:"apisto",L:16,H:6,top:"#e6b800",mid:"#ffd54f",bot:"#fff3c4",fin:"#ff7043",finOp:.9,tail:"round",dorsal:"spiny",anal:"low",iris:"#ff8a65",
 pattern:`<path d="M-5 -.4 L7 -.4" stroke="#212121" stroke-width=".5"/><g stroke="#29b6f6" stroke-width=".35"><path d="M3 1.2 q2 -.4 3.4 0 M2.6 2 q2 -.2 3.4 .2"/></g>`}),
angel:`<defs><linearGradient id="an-an" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd2c8"/><stop offset=".5" stop-color="#f4f2ea"/><stop offset="1" stop-color="#e9e6da"/></linearGradient></defs>
<g class="tf"><path d="M-8 -1 L-14 -5.6 Q-12 0 -14 5.6 L-8 1Z" fill="#e9e6da" opacity=".7"/><path d="M-14 -5.6 l-1.6 -2 M-14 5.6 l-1.6 2" stroke="#e9e6da" stroke-width=".4"/></g>
<path d="M-2 -6 Q2 -18 -1 -26 Q6 -16 6 -6Z" fill="#e9e6da" opacity=".85"/><path d="M-2 6 Q2 18 -2 27 Q6 16 6 6Z" fill="#e9e6da" opacity=".85"/>
<path d="M-8 0 Q-4 -8 3 -7.6 Q10 -4 10.6 0 Q10 4 3 7.6 Q-4 8 -8 0Z" fill="url(#an-an)"/>
<path d="M-3 -22 Q-1 0 -3 23" stroke="#3a3328" stroke-width="1.2" fill="none" opacity=".85"/><path d="M3 -7.6 Q1.6 0 3 7.6" stroke="#3a3328" stroke-width="1.5" fill="none"/><path d="M7.6 -5 Q6.6 0 7.6 5" stroke="#3a3328" stroke-width="1" fill="none"/>
<g class="pf"><path d="M5 2 Q8 8 6 14 M5.4 2.4 Q7.6 9 4.6 15" stroke="#e9e6da" stroke-width=".6" fill="none"/></g><circle cx="7.4" cy="-1.6" r="1.1" fill="#b71c1c"/><circle cx="7.6" cy="-1.6" r=".55" fill="#111"/><circle cx="7.9" cy="-1.9" r=".2" fill="#fff"/>`,
ytang:fishArt({id:"ytang",L:28,H:21,top:"#f2c500",mid:"#ffdd2e",bot:"#ffe866",fin:"#f7d21e",finOp:.95,tail:"square",dorsal:"high",anal:"high",iris:"#3e2723",
 extra:`<circle cx="-7.6" cy="0" r=".9" fill="#fff"/><path d="M13.6 1 l2 .4" stroke="#e6b800" stroke-width="1.4" stroke-linecap="round"/>`}),
gramma:fishArt({id:"gramma",L:22,H:9,top:"#7b3fc9",mid:"#8b4fd6",bot:"#9c64e0",fin:"#f5c518",finOp:.9,tail:"fork",dorsal:"low",anal:"low",iris:"#ffd54f",
 pattern:`<path d="M-1 -6 Q-2 0 -1 6 L-12 6 L-12 -6Z" fill="#f5c518"/><path d="M-1 -6 Q-3 0 -1 6" stroke="#f5c518" stroke-width="1.6" fill="none" opacity=".5"/>`,extra:`<path d="M9.6 -1.4 L6 -.6" stroke="#212121" stroke-width=".5"/>`}),
chromis:fishArt({id:"chromis",L:12,H:5.2,top:"#26a69a",mid:"#4fd1c5",bot:"#b2f5ea",fin:"#4fd1c5",finOp:.7,tail:"lyre",dorsal:"low",iris:"#80cbc4"}),
discus:fishArt({id:"discus",L:22,H:19,top:"#c93f2e",mid:"#e2533d",bot:"#f07a5c",fin:"#c93f2e",finOp:.9,tail:"round",dorsal:"high",anal:"high",iris:"#b71c1c",
 pattern:`<path d="M-8 -6 Q-2 -8 2 -6 T10 -4 M-9 -2 Q-3 -4 1 -2 T10 0 M-9 2 Q-3 0 1 2 T10 4 M-8 6 Q-2 4 2 6 T9 6" stroke="#3fa9f5" stroke-width="1" fill="none"/>${bars(22,19,[-.2,.05,.24],.03,"#8e2a1e",.4)}`}),
cory:fishArt({id:"cory",L:16,H:6,top:"#a8977a",mid:"#d9caa9",bot:"#f2ead8",fin:"#cdbb9a",finOp:.8,tail:"fork",dorsal:"high",anal:"low",iris:"#bdbdbd",mouth:1,
 pattern:`<g fill="#5f523f">${[[-3,-1],[0,-1.6],[-1.5,.8],[2,0],[4,-1.2],[-5,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".6"/>`).join("")}</g>`,extra:`<path d="M7.4 1.6 l.6 1.4 M7 1.8 l0 1.4" stroke="#8d7a5a" stroke-width=".3"/>`}),
};

// The fish of the reef and of the planted tank, as symbols the scene places with <use>.
export const symbols = (list) => list.map(([id, art]) => `<g id="aq-${id}">${art}</g>`).join("");
export const REEF_FISH = symbols([
  ["clown", FISH_T.clown],
  ["tang", FISH_T.tang],
  ["ytang", FISH_T.ytang],
  ["gramma", FISH_T.gramma],
  ["chromis", FISH_T.chromis],
]);
export const FRESH_FISH = symbols([
  ["neon", FISH_T.tetra()],
  ["angel", FISH_T.angel],
  ["discus", FISH_T.discus],
  ["cory", FISH_T.cory],
]);

// Bubbles, food flakes and the light rays (fixed places).
export const BUBBLES = [
  [0, 2.2, 0],
  [3, 1.5, -0.7],
  [-3, 1.8, -1.3],
  [1.5, 1.2, -1.8],
];
export const FLAKES = [
  [150, -0.3],
  [166, -2.5],
  [178, -1.9],
  [204, -1.1],
  [218, -3.4],
  [232, -2.7],
  [262, -0.6],
  [276, -3.0],
  [290, -2.2],
  [318, -1.4],
  [332, -0.2],
  [346, -3.1],
];
export const CO2 = [
  [0, 0],
  [2, -0.5],
  [-1.5, -1],
  [1, -1.5],
];

export const lamp = `<rect class="lamp" x="-400" width="800" height="2.5"/>`;
export const rays = (cls) => `<g class="rays${cls}"><path d="M120 0 L150 0 L190 80 L135 80Z"/><path d="M230 0 L250 0 L290 80 L250 80Z"/><path d="M330 0 L345 0 L380 80 L345 80Z"/></g>
  <g class="caustics"><path d="M-400 5 ${"q10 -4 20 0 t20 0 ".repeat(21)}"/></g>`;
export const moon = `<g class="moon"><circle cx="250" cy="12" r="9" class="halo"/><circle cx="250" cy="12" r="5.5" class="disc"/></g>`;
export const bubbles = (x) =>
  `<g class="bubbles">${BUBBLES.map(([dx, r, d]) => `<circle cx="${x + dx}" cy="76" r="${r}" style="animation-delay:${d}s"/>`).join("")}</g>`;
export const co2Bubbles = (x) =>
  `<g class="co2"><rect x="${x - 2.5}" y="64" width="5" height="9" rx="2" class="glass"/>${CO2.map(([dx, d]) => `<circle cx="${x + dx}" cy="64" r=".8" style="animation-delay:${d}s"/>`).join("")}</g>`;
export const flakes = () => `<g class="flakes">${FLAKES.map(([x, d]) => `<rect x="${x}" y="3" width="3.4" height="2.4" rx=".6" style="animation-delay:${d}s"/>`).join("")}</g>`;
export const heater = (x) => `<g class="heater"><rect x="${x}" y="12" width="4.5" height="44" rx="2.2" class="tube"/><rect x="${x + 1}" y="38" width="2.5" height="15" rx="1.2" class="coil"/><rect x="${x - 0.5}" y="9" width="5.5" height="4" rx="1.4" class="cap"/></g>`;
// A fish group: placed at (x, y), pacing (back and forth, turning at each end) with the `pace` animation, and
// bobbing up and down.
export const swim = (href, x, y, pace, bob = "", scale = "") =>
  `<g transform="translate(${x} ${y})"><g class="${bob}"><g class="fish ${pace}"><use href="#${href}"${scale ? ` transform="scale(${scale})"` : ""}/></g></g></g>`;

export const reefScene = () => `<g class="decor">
  <path class="rk2" d="M194 78 Q204 56 229 58 Q249 50 266 60 Q284 52 306 64 Q334 48 362 54 Q389 50 400 56 V78Z"/>
  <path class="rk" d="M204 78 Q216 64 236 66 Q254 60 272 68 L284 78Z"/>
  <path class="rk" d="M44 78 Q52 62 70 64 Q88 58 102 70 L110 78Z"/>
  <g class="rk2"><circle cx="64" cy="70" r="2"/><circle cx="84" cy="66" r="1.6"/></g>
  <g class="sway slow"><path class="fan" d="M384 78 Q382 54 388 34 M384 64 Q376 50 378 38 M386 56 Q394 46 394 36 M380 70 Q370 62 370 52"/><path class="fan thin" d="M378 44 L392 44 M375 52 L392 54 M378 60 L388 62"/></g>
  <g class="glow"><path class="acro" d="M362 78 L362 60 M362 66 L352 52 M362 64 L370 48 M352 52 L346 42 M352 52 L356 40 M370 48 L366 36 M370 48 L378 38 M362 60 L360 44"/>
    <g class="acro-tip"><circle cx="346" cy="42" r="2"/><circle cx="356" cy="40" r="2"/><circle cx="366" cy="36" r="2"/><circle cx="378" cy="38" r="2"/><circle cx="360" cy="44" r="2"/></g></g>
  <g class="glow"><path class="brain" d="M254 78 Q254 60 272 60 Q290 60 290 78Z"/><path class="brain-l" d="M258 74 q4 -6 8 -2 t8 -2 t8 2 M259 68 q5 -5 9 -1 t9 -1 t7 2 M263 63 q4 -3 9 -1 t9 0"/></g>
  <g class="glow"><path class="leather" d="M230 78 Q228 68 222 64 Q230 60 236 66 Q240 58 248 60 Q244 68 242 78Z"/>
    <g class="leather-p"><circle cx="226" cy="64" r=".9"/><circle cx="232" cy="64" r=".9"/><circle cx="241" cy="62" r=".9"/><circle cx="245" cy="61" r=".9"/></g></g>
  <g class="glow zoa"><circle cx="74" cy="62" r="2.6"/><circle cx="80" cy="60" r="2.6"/><circle cx="86" cy="62" r="2.6"/><circle cx="68" cy="64" r="2.4"/><circle cx="92" cy="65" r="2.4"/></g>
  <g class="zoa-c"><circle cx="74" cy="62" r="1"/><circle cx="80" cy="60" r="1"/><circle cx="86" cy="62" r="1"/><circle cx="68" cy="64" r="1"/><circle cx="92" cy="65" r="1"/></g>
  <g class="swimmers">
    ${swim("aq-chromis", 130, 66, "pace-c")}
    ${swim("aq-chromis", 139, 65, "pace-c")}
    ${swim("aq-chromis", 137, 71, "pace-c")}
    ${swim("aq-tang", 250, 46, "pace-a")}
    ${swim("aq-ytang", 382, 38, "pace-b", "bob slow")}
    ${swim("aq-gramma", 276, 52, "", "bob", "-1,1")}
  </g>
  <g class="sway fast-ish glow"><path class="anem" d="M306 78 Q302 68 300 60 M310 78 Q308 66 306 57 M314 78 Q314 66 314 56 M318 78 Q320 66 322 57 M322 78 Q326 68 328 60 M304 78 Q296 72 294 64 M326 78 Q334 72 336 64"/>
    <g class="anem-tip"><circle cx="300" cy="60" r="1.6"/><circle cx="306" cy="57" r="1.6"/><circle cx="314" cy="56" r="1.6"/><circle cx="322" cy="57" r="1.6"/><circle cx="328" cy="60" r="1.6"/><circle cx="294" cy="64" r="1.6"/><circle cx="336" cy="64" r="1.6"/></g></g>
  <g class="swimmers">
    ${swim("aq-clown", 314, 58, "", "bob quick", ".85")}
    ${swim("aq-clown", 296, 68, "", "bob", "-.7,.7")}
  </g></g>
  <path class="sd" d="M-400 76 Q-300 73 -200 75 T0 76 Q50 72 110 75 T230 74 T400 75 V80 H-400Z"/>
  <g class="sd2"><circle cx="134" cy="78" r="1.2"/><circle cx="184" cy="79" r="1"/><circle cx="244" cy="78" r="1.2"/><circle cx="344" cy="79" r="1"/></g>
  <g class="decor"><path class="star" d="M156 75 l2 -3 l2 3 l3 0 l-2 2 l1 3 l-4 -1.5 l-4 1.5 l1 -3 l-2 -2z"/><path class="shell" d="M210 78 q3 -4 6 0z"/></g>`;

export const freshScene = () => `<g class="decor">
  <g class="sway slow"><path class="val" d="M384 78 Q378 50 386 24 Q390 12 385 2 M390 78 Q386 46 392 22 Q396 10 392 0 M396 78 Q392 52 398 30 Q402 18 398 6 M379 78 Q374 56 378 36 Q380 24 376 14"/></g>
  <path class="wood" d="M298 78 Q310 62 332 54 Q348 48 370 32 M330 55 Q326 42 316 32 M350 47 Q362 50 376 52"/>
  <path class="wood2" d="M304 74 Q314 62 332 56 M352 46 Q362 40 370 33"/>
  <g class="sway"><path class="fern" d="M332 52 Q326 44 330 38 Q336 44 332 52Z M336 50 Q338 40 344 38 Q344 46 336 50Z M326 54 Q318 50 316 44 Q324 46 326 54Z"/></g>
  <ellipse class="rk" cx="290" cy="77" rx="16" ry="7"/><ellipse class="rk2" cx="300" cy="78" rx="8" ry="4"/>
  <ellipse class="rk" cx="196" cy="78" rx="10" ry="4.5"/>
  <g class="sway"><path class="sword" d="M262 78 Q248 62 252 44 Q262 58 262 78Z M264 78 Q262 56 270 40 Q274 58 264 78Z M266 78 Q278 62 288 54 Q282 70 266 78Z M260 78 Q246 72 238 62 Q252 64 260 78Z"/>
    <path class="sword-v" d="M262 78 Q254 62 252 46 M264 78 Q266 58 270 42 M266 78 Q276 66 286 56"/></g>
  <g class="sway slow"><path class="lud" d="M222 78 Q220 60 224 40 M228 78 Q230 58 228 44 M234 78 Q236 64 240 50"/>
    <g class="lud-l"><ellipse cx="221" cy="62" rx="3" ry="1.4" transform="rotate(-30 221 62)"/><ellipse cx="226" cy="54" rx="3" ry="1.4" transform="rotate(25 226 54)"/><ellipse cx="222" cy="46" rx="3" ry="1.4" transform="rotate(-25 222 46)"/><ellipse cx="231" cy="60" rx="3" ry="1.4" transform="rotate(30 231 60)"/><ellipse cx="226" cy="50" rx="2.6" ry="1.2" transform="rotate(-30 226 50)"/><ellipse cx="238" cy="58" rx="3" ry="1.4" transform="rotate(-20 238 58)"/><ellipse cx="241" cy="52" rx="2.6" ry="1.2" transform="rotate(30 241 52)"/><ellipse cx="224" cy="42" rx="2.4" ry="1.2" transform="rotate(20 224 42)"/></g></g>
  <g class="anubias"><path d="M66 78 Q58 70 62 64 Q70 66 66 78Z M70 78 Q72 66 80 64 Q80 72 70 78Z M68 78 Q64 70 70 62 Q74 70 68 78Z"/></g>
  <path class="moss" d="M110 78 ${"q4 -4 8 0 ".repeat(17)}"/>
  <g class="swimmers">
    ${swim("aq-neon", 120, 66, "pace-c")}
    ${swim("aq-neon", 132, 63, "pace-c")}
    ${swim("aq-neon", 129, 69, "pace-c")}
    ${swim("aq-neon", 141, 66, "pace-c")}
    ${swim("aq-neon", 113, 62, "pace-c")}
    ${swim("aq-discus", 282, 48, "pace-d", "bob slow")}
    ${swim("aq-angel", 380, 44, "pace-b", "bob", ".85")}
    ${swim("aq-cory", 170, 72, "pace-e")}
  </g></g>
  <path class="sd" d="M-400 76 Q-300 73 -200 75 T0 76 Q50 73 110 75 T230 74 T400 75 V80 H-400Z"/>
  <g class="sd2"><ellipse cx="124" cy="78" rx="2" ry="1.2"/><ellipse cx="160" cy="79" rx="1.6" ry="1"/><ellipse cx="214" cy="78" rx="2" ry="1.2"/><ellipse cx="256" cy="79" rx="1.6" ry="1"/><ellipse cx="336" cy="78" rx="2" ry="1.2"/></g>`;


// ---------------------------------------------------------------------------
// Themed tanks: 18 scenes beyond the reef and the planted tank, drawn once per theme (a seeded random generator
// places their plants, stones and corals the same way every time) and cached
// ---------------------------------------------------------------------------

export const THEME_ART = (() => {
  // What a scene sets while it is drawn: its water colours and light, and its substrate strip.
  let CUR = {};
let seed=1;const R=()=>{seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const rr=(a,b)=>a+R()*(b-a);const ri=(a,b)=>Math.floor(rr(a,b+1));const pick=(a)=>a[Math.floor(R()*a.length)];
const f1=(n)=>Math.round(n*10)/10;
let gid=0;const uid=(p)=>p+(++gid);
const lin=(stops,v=1)=>{const id=uid("l");return{id,def:`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</linearGradient>`}};
const rad=(stops)=>{const id=uid("r");return{id,def:`<radialGradient id="${id}">${stops.map(([o,c,a=1])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</radialGradient>`}};
/* water: background gradient, surface line, caustic net, rays, suspended particles */
const water=(top,mid,bot,{rays:rc="#ffffff",ro=.28,lampC="#fff3c4",caus=.35,parts="#ffffff",surface=1}={})=>{
 CUR.water=[top,mid,bot];CUR.opts={rc,ro,lampC,caus,surface};
 return parts?`<g class="part" fill="${parts}">${Array.from({length:22},()=>`<circle cx="${f1(rr(100,400))}" cy="${f1(rr(8,74))}" r="${f1(rr(.3,.8))}" opacity="${f1(rr(.25,.7))}" style="animation-delay:${f1(-rr(0,8))}s"/>`).join("")}</g>`:"";};
/* distant silhouettes for depth */
const backdrop=(kind,c,o=.35)=>{let s=`<g opacity="${o}" fill="${c}" stroke="${c}">`;
 if(kind==="rock"){s+=`<path d="M100 82 Q130 58 160 64 Q190 48 220 60 Q260 40 300 56 Q340 44 370 52 Q392 46 400 50 V82Z" stroke="none"/>`;}
 if(kind==="plant"){for(let i=0;i<26;i++){const x=rr(110,400),h=rr(30,62);s+=`<path d="M${f1(x)} 82 Q${f1(x+rr(-8,8))} ${f1(82-h/2)} ${f1(x+rr(-6,6))} ${f1(82-h)}" stroke-width="${f1(rr(1.5,3))}" fill="none" stroke-linecap="round"/>`;}}
 if(kind==="coral"){for(let i=0;i<10;i++){const x=rr(140,400),y=rr(56,70);s+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rr(10,22))}" ry="${f1(rr(8,14))}" stroke="none"/>`;}s+=`<rect x="100" y="66" width="300" height="16" stroke="none"/>`;}
 return s+"</g>";};
/* substrate: dune, ripples, pebbles, ground strip */
const sandBed=(c,c2,dots=["#e0c58e","#f7e7c4"],strip)=>{let s=`<path d="M-400 76 Q-200 72 0 75 Q60 71 120 74 T240 73 T400 74 V82 H-400Z" fill="${c}"/>`;
 s+=`<g stroke="${c2}" stroke-width=".6" fill="none" opacity=".7">${Array.from({length:8},(_,i)=>`<path d="M${f1(110+i*38)} ${f1(78+(i%2))} q6 -1.5 12 0 t12 0"/>`).join("")}</g>`;
 s+=`<g>${Array.from({length:40},()=>`<circle cx="${f1(rr(0,400))}" cy="${f1(rr(75,81))}" r="${f1(rr(.4,1.2))}" fill="${pick(dots)}"/>`).join("")}</g>`;
 return s+groundStrip(strip||c2,dots);};
const gravelBed=(cols,strip)=>{let s=`<path d="M-400 76 Q0 72 120 74 T400 74 V82 H-400Z" fill="${cols[0]}"/>`;
 s+=Array.from({length:110},()=>`<ellipse cx="${f1(rr(-60,400))}" cy="${f1(rr(73.5,81))}" rx="${f1(rr(1,2.4))}" ry="${f1(rr(.7,1.5))}" fill="${pick(cols)}"/>`).join("");
 return s+groundStrip(strip,cols);};
const groundStrip=(c,dots)=>{CUR.ground={c,dots};return "";};
/* rock with highlight, shadow, cracks */
const rock=(x,y,w,h,[c1,c2,c3])=>{const n=7,pts=[];for(let i=0;i<=n;i++){const t=i/n;pts.push([x-w/2+w*t,y-h*Math.sin(Math.PI*t) ** .7*rr(.75,1)]);}
 pts[0][1]=y;pts[n][1]=y;const P=pts.map(p=>p.map(f1).join(" ")).join(" L");
 const pk=pts.reduce((a,b)=>b[1]<a[1]?b:a);const right=pts.filter(p=>p[0]>=pk[0]);
 const hl=pts.filter(p=>p[0]<=pk[0]+w*.1).map(([a,b])=>[a+(pk[0]-a)*.25,b+(y-b)*.12]);
 return `<path d="M${P}Z" fill="${c1}"/><path d="M${right.map(p=>p.map(f1).join(" ")).join(" L")} L${f1(pk[0]+w*.05)} ${y}Z" fill="${c3}" opacity=".55"/><path d="M${hl.map(p=>p.map(f1).join(" ")).join(" L")} L${f1(pk[0])} ${f1(pk[1]+h*.45)}Z" fill="${c2}" opacity=".55"/><g stroke="${c3}" stroke-width=".6" fill="none" opacity=".6"><path d="M${f1(x-w*.15)} ${f1(y-h*.55)} l${f1(rr(3,6))} ${f1(rr(4,8))} l${f1(rr(-2,3))} ${f1(rr(3,6))}"/><path d="M${f1(x+w*.2)} ${f1(y-h*.4)} l${f1(rr(-5,-2))} ${f1(rr(3,6))}"/></g>`;};
/* plants */
const blades=(x0,x1,n,hmin,hmax,cols,w=2.2,cls="sway")=>`<g class="${cls}">${Array.from({length:n},()=>{const x=rr(x0,x1),h=rr(hmin,hmax),b=rr(-10,10);return `<path d="M${f1(x)} 80 Q${f1(x+b*.3)} ${f1(80-h*.5)} ${f1(x+b)} ${f1(80-h)}" stroke="${pick(cols)}" stroke-width="${f1(rr(w*.7,w*1.2))}" fill="none" stroke-linecap="round"/>`;}).join("")}</g>`;
const carpet=(x0,x1,y,cols,dens=3)=>{const by={};for(let i=0;i<Math.round((x1-x0)*dens);i++){const x=rr(x0,x1),h=rr(3,7.5),c=pick(cols);by[c]=(by[c]||"")+`M${f1(x)} ${y} q${f1(rr(-1.5,1.5))} ${f1(-h/2)} ${f1(rr(-2,2))} ${f1(-h)}`;}return `<g>${Object.entries(by).map(([c,d])=>`<path d="${d}" stroke="${c}" stroke-width=".9" fill="none" stroke-linecap="round"/>`).join("")}</g>`;};
const stem=(x,y,h,sc,lc,n=7,lw=3.2)=>{let s=`<path d="M${x} ${y} Q${f1(x+rr(-4,4))} ${f1(y-h/2)} ${f1(x+rr(-3,3))} ${f1(y-h)}" stroke="${sc}" stroke-width="1.2" fill="none"/>`;
 for(let i=1;i<=n;i++){const yy=y-h*i/(n+1),xx=x+rr(-1.5,1.5);s+=`<ellipse cx="${f1(xx-lw*.8)}" cy="${f1(yy)}" rx="${lw}" ry="${f1(lw*.38)}" transform="rotate(${f1(rr(-35,-15))} ${f1(xx)} ${f1(yy)})" fill="${lc}"/><ellipse cx="${f1(xx+lw*.8)}" cy="${f1(yy-1)}" rx="${lw}" ry="${f1(lw*.38)}" transform="rotate(${f1(rr(15,35))} ${f1(xx)} ${f1(yy)})" fill="${lc}"/>`;}
 return `<g class="sway" style="animation-duration:${pick([4,8])}s">${s}</g>`;};
const rosette=(x,y,s,c1,c2,n=7,len=22)=>`<g class="sway slow">${Array.from({length:n},(_,i)=>{const a=-80+i*(160/(n-1))+rr(-8,8),L=len*rr(.75,1.1)*s,rad=a*Math.PI/180,ex=x+Math.sin(rad)*L,ey=y-Math.cos(rad)*L,mx=x+Math.sin(rad)*L*.5,my=y-Math.cos(rad)*L*.5,px=Math.cos(rad)*3.2*s,py=Math.sin(rad)*3.2*s;return `<path d="M${x} ${y} Q${f1(mx-px)} ${f1(my-py)} ${f1(ex)} ${f1(ey)} Q${f1(mx+px)} ${f1(my+py)} ${x} ${y}Z" fill="${i%2?c1:c2}"/><path d="M${x} ${y} L${f1(ex)} ${f1(ey)}" stroke="#00000030" stroke-width=".5"/>`;}).join("")}</g>`;
const moss=(x,y,r,n,cols)=>`<g>${Array.from({length:n},()=>`<circle cx="${f1(x+rr(-r,r))}" cy="${f1(y+rr(-r*.45,r*.45))}" r="${f1(rr(1,2.2))}" fill="${pick(cols)}"/>`).join("")}</g>`;
const branch=(d,c,w,hl)=>`<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${hl}" stroke-width="${f1(w*.25)}" fill="none" stroke-linecap="round" transform="translate(-${f1(w*.2)} -${f1(w*.2)})" opacity=".6"/>`;
/* corals */
const acro=(x,y,s,c,tip,depth=3)=>{let out="";const go=(x0,y0,a,l,d)=>{const r=a*Math.PI/180,x1=x0+Math.sin(r)*l,y1=y0-Math.cos(r)*l;out+=`<path d="M${f1(x0)} ${f1(y0)} L${f1(x1)} ${f1(y1)}" stroke="${c}" stroke-width="${f1((d+1.2)*1.1*s)}" stroke-linecap="round"/>`;if(d>0){go(x1,y1,a-rr(18,32),l*.72,d-1);go(x1,y1,a+rr(18,32),l*.72,d-1);if(R()>.5)go(x1,y1,a+rr(-6,6),l*.6,d-1);}else out+=`<circle cx="${f1(x1)}" cy="${f1(y1)}" r="${f1(1.4*s)}" fill="${tip}"/>`;};
 go(x,y,rr(-8,8),12*s,depth);return `<g>${out}</g>`;};
const table=(x,y,w,c,c2)=>`<path d="M${x-2} ${y} L${x-2} ${y-8} L${x+2} ${y-8} L${x+2} ${y}Z" fill="${c2}"/><path d="M${x-w/2} ${y-8} Q${x} ${y-15} ${x+w/2} ${y-8} Q${x} ${y-10} ${x-w/2} ${y-8}Z" fill="${c}"/><g stroke="${c2}" stroke-width=".5" opacity=".7">${Array.from({length:9},(_,i)=>`<path d="M${x} ${y-11} L${f1(x-w/2+i*w/8)} ${f1(y-8.5-Math.sin(Math.PI*i/8)*3.5)}"/>`).join("")}</g>`;
const brain=(x,y,r,c,l)=>`<path d="M${x-r} ${y} Q${x-r} ${y-r*1.1} ${x} ${y-r*1.1} Q${x+r} ${y-r*1.1} ${x+r} ${y}Z" fill="${c}"/><g stroke="${l}" stroke-width=".9" fill="none">${Array.from({length:Math.round(r/3)},(_,i)=>{const yy=y-2-i*2.8;const ww=r*Math.sqrt(Math.max(0,1-((y-yy)/(r*1.1)) ** 2))*.9;return `<path d="M${f1(x-ww)} ${f1(yy)} ${`q2 -2 4 0 t4 0 `.repeat(Math.max(1,Math.round(ww/4)))}"/>`;}).join("")}</g>`;
const fan=(x,y,h,c)=>{let o="";const go=(x0,y0,a,l,d)=>{const r=a*Math.PI/180,x1=x0+Math.sin(r)*l,y1=y0-Math.cos(r)*l;o+=`<path d="M${f1(x0)} ${f1(y0)} Q${f1((x0+x1)/2+rr(-2,2))} ${f1((y0+y1)/2)} ${f1(x1)} ${f1(y1)}" stroke="${c}" stroke-width="${f1(.4+d*.45)}" fill="none" stroke-linecap="round"/>`;if(d>0){go(x1,y1,a-rr(14,26),l*.75,d-1);go(x1,y1,a+rr(14,26),l*.75,d-1);}};go(x,y,0,h*.32,4);return `<g class="sway slow">${o}</g>`;};
const zoas=(x,y,n,c,ring,cen)=>`<g>${Array.from({length:n},()=>{const cx=x+rr(-9,9),cy=y+rr(-3,3);return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="2.6" fill="${ring}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="1.8" fill="${c}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r=".7" fill="${cen}"/>`;}).join("")}</g>`;
const anemone=(x,y,s,c,tip,n=14)=>`<g class="sway">${Array.from({length:n},(_,i)=>{const a=-70+i*140/(n-1)+rr(-5,5),r=a*Math.PI/180,L=rr(10,15)*s,ex=x+Math.sin(r)*L,ey=y-Math.cos(r)*L;return `<path d="M${x+rr(-4,4)*s} ${y} Q${f1(x+Math.sin(r)*L*.4+rr(-3,3))} ${f1(y-Math.cos(r)*L*.5)} ${f1(ex)} ${f1(ey)}" stroke="${c}" stroke-width="${f1(2.4*s)}" fill="none" stroke-linecap="round"/><circle cx="${f1(ex)}" cy="${f1(ey)}" r="${f1(1.3*s)}" fill="${tip}"/>`;}).join("")}</g>`;
/* animation wrappers */
const F=(sh,x,y,s=1,a="pa",d=8,dl=0,flip=false,extra="")=>`<g transform="translate(${x} ${y})"><g class="${extra}"><g class="fish t-${a}" style="animation-delay:${dl}s"><g transform="scale(${flip?-s:s} ${s})">${sh}</g></g></g></g>`;
const S=(sh,x,y,s=1,cls="bob",dl=0,flip=false)=>`<g transform="translate(${x} ${y})"><g class="${cls}" style="animation-delay:${dl}s"><g transform="scale(${flip?-s:s} ${s})">${sh}</g></g></g>`;
const school=(sh,x,y,n,s,a,d,flip)=>Array.from({length:n},(_,i)=>F(sh,f1(x+(i%4)*8.5-(i>3?4:0)+rr(-2,2)),f1(y+((i*7)%12)-6),s,a,d,f1(-rr(0,.4)),flip)).join("");
const bub=(x,y=76,n=5)=>`<g class="bub">${Array.from({length:n},(_,i)=>`<circle cx="${f1(x+rr(-3,3))}" cy="${y}" r="${f1(rr(.8,2.2))}" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width=".4" style="animation-delay:${f1(-i*.45)}s"/>`).join("")}</g>`;
/* fish (facing right, around 0,0): fins, gill, belly light, eye with highlight */
const eye=(x,y,r=1.2)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#111"/><circle cx="${f1(x+r*.35)}" cy="${f1(y-r*.35)}" r="${f1(r*.35)}" fill="#fff"/>`;
const gill=(x,r=3,c="#00000033")=>`<path d="M${x} ${-r} Q${x+1.4} 0 ${x} ${r}" stroke="${c}" stroke-width=".55" fill="none"/>`;
const T=FISH_T;


  const TH = [];
TH.push(
{seed:3,svg:()=>water("#dcf3ec","#a9dccb","#7dbfa9")+backdrop("rock","#6f9c8f",.3)+
 rock(258,79,44,36,["#9aa1a6","#c3c8cb","#6c7378"])+rock(318,79,58,50,["#8f969b","#bcc2c6","#62696e"])+rock(372,79,34,26,["#9aa1a6","#c3c8cb","#6c7378"])+rock(222,79,18,10,["#a3a9ad","#c9cdd0","#757b80"])+
 `<path d="M110 80 Q200 74 300 76 T400 75 V80Z" fill="#4f9a2e"/>`+carpet(110,400,79,["#5fae3a","#78c24f","#4b9a2e","#8fd062"],4)+carpet(140,400,76.5,["#6bbf45","#8fd062","#9ade6e"],2.4)+
 school(T.rasbora,262,30,8,.95,"pb",8,true)+S(T.shrimp("#e3efe9","#ffffff88"),200,76,1.1)+sandBed("#ddd3bb","#cbbf9f",["#c2b591","#efe7d2","#b0a27e"],"#cfc4a6")},
{dark:1,seed:5,svg:()=>water("#b98a42","#7a531f","#432a0e",{rays:"#ffe2a6",ro:.22,lampC:"#ffd27a",caus:.18,parts:"#ffe9c2"})+backdrop("plant","#2f1d0b",.4)+
 branch("M296 0 Q298 28 286 56 Q280 70 288 80","#3b2414",6,"#6b4423")+branch("M332 0 Q338 26 356 46 Q368 60 364 80","#3b2414",5,"#6b4423")+branch("M298 22 Q318 30 328 52","#4a2e18",3,"#6b4423")+branch("M352 42 Q374 40 396 30","#4a2e18",2.6,"#6b4423")+branch("M310 8 Q300 14 286 12","#4a2e18",2,"#6b4423")+
 `<g class="hang">${[[300,30],[320,46],[360,44],[388,32]].map(([x,y])=>`<path d="M${x} ${y} q-3 8 0 16 M${x} ${y} q4 6 2 12" stroke="#5a3a1c" stroke-width=".6" fill="none"/>`).join("")}</g>`+
 `<g>${Array.from({length:16},(_,i)=>{const x=rr(110,400),y=rr(76,80),a=rr(-30,30);return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><path d="M-7 0 Q0 -3.4 7 0 Q0 3 -7 0Z" fill="${pick(["#6b3e17","#8a5426","#5a3313","#a0632e"])}"/><path d="M-6 0 L6 0" stroke="#3a210b" stroke-width=".4"/></g>`;}).join("")}</g>`+
 rosette(232,79,.8,"#3f6b2a","#4f7f34",6,18)+
 school(T.tetra("#e53935","#40c4ff","#e53935"),252,40,7,1,"pb",8,true)+F(T.apisto,200,66,1,"pc",10)+F(T.angel,366,36,.85,"",8,0,true,"bob")+
 sandBed("#4a2f14","#3a240f",["#5c3a1c","#2e1c0a","#6b4423"],"#2e1c0a")},
{seed:9,svg:()=>water("#95d4f3","#4ea6dd","#2c7cbe")+backdrop("rock","#2a6aa0",.35)+
 rock(300,79,70,30,["#8f8a83","#b5b0a8","#68635d"])+rock(352,79,52,42,["#99938b","#bdb7ae","#6f6a63"])+rock(390,79,40,32,["#8f8a83","#b5b0a8","#68635d"])+rock(326,52,34,20,["#a39d95","#c6c1b9","#77726b"])+rock(250,79,34,14,["#99938b","#bdb7ae","#6f6a63"])+rock(372,46,22,14,["#a39d95","#c6c1b9","#77726b"])+
 `<g fill="#6a8f3a" opacity=".55">${[[310,50],[340,40],[360,62],[385,48]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4" ry="1.3"/>`).join("")}</g>`+
 F(T.cich("#3d6fe0","#122a66","#5aa0ff"),220,36,1,"pa",8)+F(T.cich("#ffd21f","#e0b000","#ffe066","#fff6c255"),372,28,1,"pb",8,-2,true)+F(T.cich("#ff8c42","#c45a1a","#ffb27a"),262,58,.9,"pc",10,-1)+F(T.cich("#3d6fe0","#122a66","#5aa0ff"),300,20,.8,"pc",10,-4,true)+F(T.cich("#7e57c2","#4527a0","#b39ddb"),214,58,.75,"pa",8,-5)+
 sandBed("#f3ead6","#e2d6b8",["#e9dcc0","#ffffff","#d8c9a6"])},
{seed:11,svg:()=>water("#93d8f2","#55b0de","#2f82c0")+backdrop("rock","#2a77a8",.3)+
 rock(382,79,44,36,["#8f8a83","#b5b0a8","#68635d"])+rock(344,79,26,16,["#99938b","#bdb7ae","#6f6a63"])+
 `<g>${Array.from({length:14},(_,i)=>{const x=rr(150,330),y=rr(74,79),a=rr(-60,60),s=rr(.8,1.3);return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${f1(s)})"><path d="M-5 0 Q-5.4 -6 0 -7 Q6 -6 6 0 Q3 3 0 3 Q-4 3 -5 0Z" fill="${pick(["#c9ad84","#b59a72","#d8c3a0"])}" stroke="#8a714f" stroke-width=".6"/><path d="M-2.6 -1 Q0 -5 2.6 -1 M-1.2 -.6 Q0 -2.8 1.2 -.6" stroke="#8a714f" stroke-width=".5" fill="none"/><ellipse cx="0" cy="1.4" rx="2" ry="1" fill="#5d4a33"/></g>`;}).join("")}</g>`+
 S(T.cich("#e8dcc2","#a8987a","#f3ead7"),232,71,.42,"bob",-.5)+S(T.cich("#e8dcc2","#a8987a","#f3ead7"),296,70,.42,"bob",-1.2,true)+S(T.cich("#e8dcc2","#a8987a","#f3ead7"),262,72,.4,"bob",-2)+
 school(T.cich("#efe4cc","#c4b392","#ffeccf"),262,34,5,.6,"pa",8)+F(T.cich("#f7d26a","#c9a23b","#fff1a8"),380,26,.7,"pb",8,0,true)+
 sandBed("#efe3c8","#dfd0ae",["#e2d3b2","#fff8e8","#cdbb93"])},
{seed:13,svg:()=>water("#dff4e8","#ade0c7","#83c4a6")+backdrop("plant","#4f8f6f",.3)+
 `<g transform="translate(0 0)"><path d="M240 80 Q256 54 300 48 Q340 44 374 26 L380 30 Q346 50 302 54 Q262 60 250 80Z" fill="#b39a7d"/>${Array.from({length:10},(_,i)=>`<ellipse cx="${f1(258+i*12)}" cy="${f1(66-i*3.4)}" rx="1.8" ry="1.1" fill="#6d5a45"/>`).join("")}</g>`+
 moss(270,60,12,40,["#4f8f34","#6aa84f","#3d7a28"])+moss(320,50,14,46,["#4f8f34","#6aa84f","#3d7a28"])+moss(362,36,10,30,["#4f8f34","#6aa84f"])+
 rosette(388,79,.7,"#2f6f2a","#3f8a35",5,16)+carpet(110,240,79,["#4f8f34","#6aa84f","#3d7a28"],1.6)+
 F(T.shrimp("#e53935"),234,76,1.3,"pc",10)+F(T.shrimp("#e53935"),318,46,1.2,"pc",10,-3)+F(T.shrimp("#1e88e5","#bbdefb88"),368,74,1.2,"pc",10,-6,true)+F(T.shrimp("#e53935"),286,76,1.1,"pc",10,-2,true)+F(T.shrimp("#ffb300"),350,30,1,"pc",10,-7,true)+
 S(T.snail("#5d4037"),206,76,1)+S(T.snail("#e0a96d","#f3e0c5"),340,62,.8,"bob",-1)+gravelBed(["#4b3b2c","#3a2d22","#5a4836","#2e241b"],"#3a2d22")},
{seed:17,svg:()=>water("#d3ece2","#a0d0bd","#79b49e",{ro:.22})+backdrop("plant","#3f7a5f",.25)+
 `<g>${[[196,4,9],[222,3,8],[250,5,10],[292,3,8],[344,4,9],[376,3,8],[150,4,7]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="2.6" fill="#6aa84f"/><ellipse cx="${x-2}" cy="${y-.6}" rx="${f1(r*.5)}" ry="1" fill="#8bc34a"/>`).join("")}</g>`+
 `<g class="hang" stroke="#4c7f35" stroke-width=".45">${[196,250,344].map(x=>`<path d="M${x} 6 v10 M${x-2} 6 v8 M${x+2} 6 v9 M${x+1} 6 v12"/>`).join("")}</g>`+
 `<g transform="translate(318 5) rotate(12)"><path d="M-12 0 Q0 -5 12 0 Q0 4 -12 0Z" fill="#a0522d"/><path d="M-11 0 L11 0 M-6 0 l3 -2 M-2 0 l3 -2.4 M2 0 l3 -2 M-6 0 l3 2 M-2 0 l3 2.2" stroke="#6d3a1c" stroke-width=".5"/></g>`+
 rosette(378,79,.9,"#2e7d32","#388e3c",7,20)+stem(214,79,40,"#5d8a3a","#7cb342",6,2.6)+
 F(T.betta("#b71c1c","#e53935","#ff8a80"),280,42,1.3,"pc",10,0,false,"bob")+S(T.snail("#3e2723","#bcaaa4"),234,76,1)+
 gravelBed(["#5a4a3a","#47392c","#6b5846","#3a2e23"],"#47392c")},
{seed:19,svg:()=>water("#c4e8f8","#86c8ec","#58a7da")+
 `<g transform="translate(346 80)"><rect x="-18" y="-26" width="36" height="26" fill="#b0bec5"/><rect x="-22" y="-34" width="10" height="34" fill="#a7b6bd"/><rect x="12" y="-34" width="10" height="34" fill="#a7b6bd"/><rect x="-7" y="-46" width="14" height="22" fill="#b8c6cc"/><path d="M-22 -34 h2.5 v-3 h2.5 v3 h2.5 v-3 h2.5 v3 M12 -34 h2.5 v-3 h2.5 v3 h2.5 v-3 h2.5 v3" stroke="#90a4ae" stroke-width="1" fill="none"/><path d="M-7 -46 L0 -56 L7 -46Z" fill="#e57373"/><path d="M0 -56 v-4 l4 1.4 l-4 1.4" fill="#ffca28" stroke="#ffca28" stroke-width=".4"/><rect x="-4" y="-14" width="8" height="14" rx="4" fill="#455a64"/><rect x="-3" y="-38" width="6" height="7" rx="3" fill="#455a64"/><g stroke="#90a4ae" stroke-width=".4">${[-10,-4,4,10].map(y=>`<path d="M-18 ${y-12} h36"/>`).join("")}</g><g fill="#6aa84f">${Array.from({length:8},(_,i)=>`<circle cx="${-20+i*5.6}" cy="${-2-(i%2)*2}" r="1.6"/>`).join("")}</g></g>`+
 `<rect x="226" y="75" width="12" height="4" rx="2" fill="#78909c"/><path d="M232 75 Q240 60 236 40" stroke="#ffffff55" stroke-width=".4" fill="none"/>`+bub(232,74,7)+
 stem(398,79,46,"#4f8a2a","#7cb342",7,2.8)+stem(200,79,34,"#4f8a2a","#8bc34a",5,2.6)+
 F(T.gold(),262,40,1.1,"pa",8)+F(T.gold("#fafafa","#ff7043","#ffffff"),382,30,1,"pb",8,-3,true)+F(T.gold("#212121","#424242","#616161"),300,60,.8,"pc",10,-5)+
 `<path d="M-400 76 Q0 72 120 74 T400 74 V82 H-400Z" fill="#7e57c2"/>${Array.from({length:120},()=>`<ellipse cx="${f1(rr(-60,400))}" cy="${f1(rr(73.5,81))}" rx="${f1(rr(1.2,2.4))}" ry="${f1(rr(.9,1.6))}" fill="${pick(["#ef5350","#42a5f5","#ffee58","#66bb6a","#ab47bc","#ff7043"])}"/>`).join("")}`+groundStrip("#5e35b1",["#ef5350","#42a5f5","#ffee58","#66bb6a"])},
{seed:23,svg:()=>water("#b2cdac","#7da37e","#4f7356",{ro:.2,parts:"#e8f0d8"})+backdrop("plant","#3f5f44",.3)+
 [["M262 0 Q264 28 252 80",4],["M264 18 Q282 40 288 80",3],["M264 18 Q240 44 230 80",3],["M264 30 Q270 50 266 80",2],["M352 0 Q356 30 346 80",4],["M354 24 Q376 44 384 80",3],["M354 24 Q332 50 318 80",3],["M354 40 Q362 60 360 80",2]].map(([d,w])=>branch(d,"#5d4037",w,"#8d6e63")).join("")+
 `<g fill="#6d8f3a">${[[262,4],[352,6],[300,3]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="14" ry="3"/>`).join("")}</g>`+
 `<path d="M286 80 Q300 64 326 68 Q344 70 358 80Z" fill="#6d5c45"/><path d="M292 76 Q310 68 330 71" stroke="#8a7658" stroke-width="1" fill="none"/>`+
 `<g fill="#7a6a4c">${Array.from({length:6},()=>`<circle cx="${f1(rr(296,350))}" cy="${f1(rr(72,78))}" r="${f1(rr(.5,1.1))}"/>`).join("")}</g>`+
 F(T.archer,302,12,1.1,"pc",10)+F(T.archer,374,18,.9,"pc",10,-4,true)+S(T.mud,318,66,1.15)+school(T.tetra("#c0ca33","#9e9d24","#e6ee9c"),190,56,4,.8,"pc",10,false)+
 sandBed("#5b4a35","#4a3b29",["#6b5a42","#3e3020","#7a6a4c"],"#3e3020")},
{dark:1,seed:29,svg:()=>water("#2f6b62","#255a52","#1a463f",{ro:0,caus:.22,parts:"#cfe8e0",surface:0})+
 `<g opacity=".35" fill="#123a33">${Array.from({length:12},()=>`<ellipse cx="${f1(rr(120,400))}" cy="${f1(rr(10,76))}" rx="${f1(rr(6,16))}" ry="${f1(rr(3,7))}"/>`).join("")}</g>`+
 [[232,20,11],[304,62,13],[374,22,12],[182,68,8],[394,68,10],[340,44,7]].map(([x,y,r])=>`<path d="M${x} ${y} L${f1(x+r*.98)} ${f1(y-r*.2)} A${r} ${r} 0 1 1 ${f1(x+r*.6)} ${f1(y-r*.8)}Z" fill="#3f8f4a"/><path d="M${x} ${y} L${f1(x+r*.98)} ${f1(y-r*.2)} A${r} ${r} 0 0 1 ${f1(x+r*.4)} ${f1(y+r*.9)}Z" fill="#4caf50" opacity=".6"/><g stroke="#2e6b36" stroke-width=".4">${[30,90,150,210,270].map(a=>`<path d="M${x} ${y} l${f1(Math.cos(a*Math.PI/180)*r*.85)} ${f1(Math.sin(a*Math.PI/180)*r*.85)}"/>`).join("")}</g>`).join("")+
 `<g transform="translate(304 62)">${[0,60,120,180,240,300].map(a=>`<path d="M0 0 Q${f1(Math.cos(a*Math.PI/180)*4-2)} ${f1(Math.sin(a*Math.PI/180)*4-2)} ${f1(Math.cos(a*Math.PI/180)*7)} ${f1(Math.sin(a*Math.PI/180)*7)} Q${f1(Math.cos(a*Math.PI/180)*4+2)} ${f1(Math.sin(a*Math.PI/180)*4+2)} 0 0Z" fill="#f8bbd0"/>`).join("")}${[30,90,150,210,270,330].map(a=>`<path d="M0 0 L${f1(Math.cos(a*Math.PI/180)*4.6)} ${f1(Math.sin(a*Math.PI/180)*4.6)}" stroke="#f06292" stroke-width="2.2" stroke-linecap="round"/>`).join("")}<circle r="1.8" fill="#ffee58"/></g>`+
 F(T.koi(),236,44,1.05,"pa",8)+F(T.koi("#f57c00","#fff8e1"),372,50,.95,"pb",8,-3,true)+F(T.koi("#212121","#e0e0e0"),292,30,.85,"pc",10,-5)+F(T.koi("#ffd54f","#ffd54f"),210,24,.7,"pc",10,-2)+
 `<g>${Array.from({length:44},(_,i)=>`<ellipse cx="${f1(-110+i*12+rr(-2,2))}" cy="${f1(86+rr(-1.5,1.5))}" rx="${f1(rr(5,8))}" ry="${f1(rr(3,4.6))}" fill="${pick(["#8d8a80","#a19e94","#77746b","#b6b2a7"])}" stroke="#5f5c54" stroke-width=".4"/>`).join("")}</g>`},
);
const rockReef=(x,y,w,h)=>rock(x,y,w,h,["#8a8178","#ada39a","#665e57"]);
TH.push(
{seed:31,svg:()=>water("#86d6f7","#3ea0e0","#2272c0",{lampC:"#fff8e1"})+backdrop("coral","#1f5f9a",.35)+
 rockReef(300,79,200,26)+rockReef(380,79,50,36)+
 acro(214,70,.9,"#ab47bc","#f48fb1")+acro(250,64,1.05,"#26c6da","#e0f7fa")+acro(282,62,.95,"#66bb6a","#c5e1a5")+acro(388,52,.9,"#7e57c2","#80deea")+acro(232,72,.6,"#ec407a","#fff59d")+
 table(334,58,44,"#ff8a65","#e0603a")+table(362,70,26,"#26a69a","#00796b")+
 `<g>${Array.from({length:6},(_,i)=>`<path d="M${300+i*5} 72 q4 -6 8 0" fill="${pick(["#ffca28","#ff7043","#ab47bc"])}" opacity=".9"/>`).join("")}</g>`+
 zoas(270,74,8,"#ff7043","#00e5ff","#ffee58")+
 school(T.anthias,262,22,6,.9,"pa",8)+F(T.wrasse,372,34,.95,"pb",8,-2,true)+F(T.anthias,224,44,.8,"pc",10,-3)+
 sandBed("#f5e3bd","#e2c99a")},
{seed:37,svg:()=>water("#8dcdef","#4d9ed6","#2c78ba",{lampC:"#fff8e1"})+backdrop("coral","#1f5f9a",.3)+
 rockReef(312,79,190,24)+rockReef(388,79,40,34)+
 [[236,64],[258,66],[352,58],[380,46],[274,62]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><path d="M0 0 L0 -13" stroke="#f3e5f5" stroke-width="2.4" stroke-linecap="round"/>${[-12,-9].map(sy=>`<path d="M0 ${sy} l${i%2?-3:3} -2" stroke="#f3e5f5" stroke-width="1.4"/>`).join("")}<g class="pulse" style="animation-delay:${f1(-i*.55)}s;animation-duration:2s">${[-60,-35,-12,12,35,60].map(a=>`<g transform="translate(0 -13) rotate(${a})"><path d="M0 0 L0 -6" stroke="#e1bee7" stroke-width="1.8" stroke-linecap="round"/><g stroke="#f8bbd0" stroke-width=".5">${[-2,-3.6,-5].map(t=>`<path d="M0 ${t} l-1.2 -.8 M0 ${t} l1.2 -.8"/>`).join("")}</g></g>`).join("")}</g></g>`).join("")+
 `<g transform="translate(306 66)"><path d="M-4 0 Q-5 -8 -3 -11 L3 -11 Q5 -8 4 0Z" fill="#ffe0b2"/><path d="M-16 -11 Q-14 -17 0 -18 Q14 -17 16 -11 Q8 -9 0 -9.6 Q-8 -9 -16 -11Z" fill="#ffcc80"/><g fill="#fff3e0">${Array.from({length:22},()=>`<circle cx="${f1(rr(-13,13))}" cy="${f1(rr(-16.5,-11))}" r=".75"/>`).join("")}</g></g>`+
 [[380,74,"#43a047","#2e7d32"],[220,77,"#ef5350","#c62828"],[338,76,"#5c6bc0","#3949ab"]].map(([x,y,c,c2])=>`<ellipse cx="${x}" cy="${y}" rx="7.4" ry="2.8" fill="${c}"/><g stroke="${c2}" stroke-width=".4">${[0,30,60,90,120,150].map(a=>`<path d="M${x} ${y} l${f1(Math.cos(a*Math.PI/180)*7)} ${f1(Math.sin(a*Math.PI/180)*2.6)} M${x} ${y} l${f1(-Math.cos(a*Math.PI/180)*7)} ${f1(-Math.sin(a*Math.PI/180)*2.6)}"/>`).join("")}</g><circle cx="${x}" cy="${y}" r="1" fill="${c2}"/>`).join("")+
 zoas(250,74,9,"#00e676","#ff4081","#ffeb3b")+
 F(T.clown,332,42,.85,"pc",10)+F(T.clown,346,48,.7,"pc",10,-.6)+S(T.goby,200,75,1)+
 sandBed("#f5e3bd","#e2c99a")},
{seed:41,svg:()=>water("#90d2f1","#56a8dc","#307fc2",{lampC:"#fff8e1"})+backdrop("coral","#1f5f9a",.25)+
 rockReef(318,79,96,34)+rockReef(374,79,46,46)+rockReef(260,79,30,14)+
 `<g transform="translate(300 52)">${[[-8,-10],[-3,-14],[3,-13],[9,-9],[0,-8]].map(([dx,dy])=>`<path d="M0 0 L${dx} ${dy}" stroke="#a1887f" stroke-width="1.8" stroke-linecap="round"/><g class="sway" style="animation-duration:2s"><circle cx="${dx}" cy="${dy}" r="3.4" fill="#80deea"/><circle cx="${dx-1.2}" cy="${dy-1.4}" r="1.4" fill="#b2ebf2"/><circle cx="${dx}" cy="${dy}" r="1.2" fill="#00838f"/></g>`).join("")}</g>`+
 anemone(352,48,.8,"#f7b3c9","#f06a9b",12)+zoas(232,74,6,"#ff7043","#7c4dff","#ffee58")+acro(392,34,.6,"#ab47bc","#f48fb1",2)+
 S(T.cleaner,330,30,1)+F(T.clown,248,40,.9,"pc",10)+F(T.clown,262,46,.75,"pc",10,-.6)+S(T.goby,214,75,1,"bob",-1)+
 sandBed("#f5e3bd","#e2c99a")},
{seed:43,svg:()=>water("#a0d9ea","#5fb2cf","#3889b0",{lampC:"#fff8e1"})+backdrop("plant","#2c6e8a",.3)+
 blades(200,400,26,30,74,["#6b8e23","#7cb342","#558b2f","#8bc34a"],2.4)+
 fan(284,79,58,"#ef6c00")+fan(372,79,48,"#d84315")+fan(232,79,36,"#fbc02d")+
 S(T.horse(),250,44,1.25)+S(T.horse("#ef6c00","#bf360c"),352,38,1.15,"bob",-1.5,true)+S(T.horse("#fdd835","#f9a825"),306,58,.8,"bob",-.8)+
 `<g>${Array.from({length:5},()=>`<path d="M${f1(rr(210,390))} 79 q2 -2 4 0" fill="${pick(["#fff3e0","#ffe0b2"])}"/>`).join("")}</g>`+
 sandBed("#efe0bd","#dfc99c")},
{dark:1,seed:47,svg:()=>water("#2a3584","#161e58","#0b0f33",{ro:0,caus:0,lampC:"#7c4dff",parts:"#b39ddb"})+
 (()=>{const a=rad([[0,"#ce93d8",.45],[1,"#ce93d8",0]]),b=rad([[0,"#4dd0e1",.4],[1,"#4dd0e1",0]]),c=rad([[0,"#ffb74d",.35],[1,"#ffb74d",0]]);return `<defs>${a.def}${b.def}${c.def}</defs><g class="gl"><circle cx="268" cy="30" r="40" fill="url(#${a.id})"/><circle cx="360" cy="56" r="34" fill="url(#${b.id})"/><circle cx="214" cy="60" r="26" fill="url(#${c.id})"/></g>`;})()+
 [[250,26,"#f8bbd0",0,1],[300,52,"#80deea",-1,1.1],[350,20,"#ce93d8",-2,.9],[388,58,"#f8bbd0",-3,.8],[212,58,"#ffcc80",-4,.75],[330,70,"#b2ebf2",-5,.6]].map(([x,y,c,d,s])=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="rise" style="animation-delay:${d}s"><g class="pulse" style="animation-delay:${d/2}s">${T.jelly(c)}</g></g></g>`).join("")+
 `<rect x="-400" y="84" width="800" height="6" fill="#07091c"/><rect x="-400" y="84" width="800" height=".6" fill="#7c4dff" opacity=".5"/>`},
{seed:53,svg:()=>water("#86cbe9","#4a9cc8","#2c74a5",{lampC:"#fff8e1"})+backdrop("rock","#255f86",.35)+
 `<path d="M326 80 Q330 40 366 34 Q400 32 400 46 V80Z" fill="#7d746b"/><path d="M326 80 Q330 40 366 34 L370 40 Q340 46 336 80Z" fill="#a0968c" opacity=".6"/><ellipse cx="358" cy="62" rx="13" ry="10" fill="#2a2522"/><ellipse cx="358" cy="62" rx="9" ry="6.4" fill="#1a1715"/>`+
 rockReef(214,79,52,18)+fan(244,66,26,"#ad1457")+acro(392,32,.55,"#ab47bc","#f48fb1",2)+
 S(T.moray,350,62,1.05,"bob",0,true)+F(T.lion,282,34,1.15,"pc",10,0,false,"bob")+F(T.stingray,280,76,1,"pc",10,-3)+school(T.anthias,220,26,3,.6,"pa",8)+
 sandBed("#efe0bd","#dfc99c")},
);
TH.push(
{seed:61,svg:()=>water("#74c1e6","#3c90c8","#236aa6",{ro:.24,lampC:"#fff8e1"})+backdrop("rock","#1e5a8c",.3)+
 `<g transform="rotate(-9 330 72)"><path d="M262 80 L276 50 L388 47 L404 76Z" fill="#6d4c33"/>${[0,1,2,3].map(i=>`<path d="M${268+i*2} ${66-i*5} L${396-i*1} ${62-i*5}" stroke="#4e3423" stroke-width=".8"/>`).join("")}<path d="M276 50 L388 47 L384 54 L278 57Z" fill="#8d6748"/><path d="M276 50 L388 47" stroke="#a1795a" stroke-width="1.2"/>${[296,318,340,362].map(x=>`<rect x="${x}" y="58" width="7" height="5" rx="1" fill="#2e1f14"/>`).join("")}<path d="M312 74 Q318 66 326 74Z" fill="#1d140d"/><path d="M330 48 L328 10" stroke="#5d4037" stroke-width="3"/><path d="M314 22 L344 22" stroke="#5d4037" stroke-width="2"/><path d="M330 14 Q348 20 340 34 L330 32Z" fill="#d7ccc8" opacity=".75"/><path d="M330 14 Q348 20 340 34" stroke="#a1887f" stroke-width=".5" fill="none"/><path d="M372 48 L380 30" stroke="#5d4037" stroke-width="2"/></g>`+
 `<g class="sway">${blades(270,320,6,10,22,["#7cb342","#558b2f"],1.6,"")}</g>`+zoas(300,74,5,"#ff7043","#7c4dff","#ffee58")+
 (()=>{const g=rad([[0,"#ffd54f",.85],[1,"#ffd54f",0]]);return `<defs>${g.def}</defs><g transform="translate(226 75)"><circle class="gl" cx="0" cy="-8" r="16" fill="url(#${g.id})"/><rect x="-10" y="-6" width="20" height="11" rx="1.5" fill="#8d5524"/><path d="M-10 -6 Q0 -18 10 -6Z" fill="#a0632e"/><path d="M-10 -1 h20 M-10 3 h20" stroke="#5d3a17" stroke-width=".8"/><rect x="-2" y="-4" width="4" height="4" fill="#ffca28"/><g fill="#ffca28"><circle cx="-5" cy="-7" r="1.8"/><circle cx="-1" cy="-8.4" r="1.8"/><circle cx="3.4" cy="-7.4" r="1.8"/><circle cx="6" cy="-6" r="1.4"/></g><path d="M-6 -9 l1 -2 M2 -10 l1 -2" stroke="#fff59d" stroke-width=".6"/><g fill="#ffca28">${[[-14,4],[13,4],[16,5]].map(([a,b])=>`<ellipse cx="${a}" cy="${b}" rx="1.8" ry=".8"/>`).join("")}</g></g>`;})()+bub(230,62,5)+
 F(T.butterfly,256,34,1,"pa",8)+F(T.tang,384,26,.8,"pb",8,-3,true)+F(T.butterfly,300,20,.7,"pc",10,-4,true)+
 sandBed("#efe0bd","#dfc99c")},
{dark:1,seed:67,svg:()=>water("#0e1628","#070b17","#02040a",{ro:0,caus:0,surface:0,parts:"#90a4ae"})+
 `<g class="snow" fill="#cfd8dc">${Array.from({length:22},(_,i)=>`<circle cx="${f1(rr(110,400))}" cy="${f1(rr(0,30))}" r="${f1(rr(.5,1.1))}" style="animation-delay:${f1(-i*.37)}s"/>`).join("")}</g>`+
 `<g opacity=".7"><path d="M330 80 Q334 60 340 58 Q346 60 350 80Z" fill="#1b1f2a"/><g class="gl"><path d="M340 58 Q336 46 342 36 Q346 46 340 58" fill="#263238" opacity=".8"/></g><g fill="#ff7043" class="gl">${[[336,74],[344,70],[348,76]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".8"/>`).join("")}</g></g>`+
 `<g>${Array.from({length:5},()=>{const x=rr(200,390);return `<path d="M${f1(x)} 80 L${f1(x)} 72" stroke="#cfd8dc" stroke-width=".5" opacity=".6"/><circle cx="${f1(x)}" cy="71.5" r="1" fill="#e57373" opacity=".7"/>`;}).join("")}</g>`+
 F(T.angler,296,46,1.25,"pc",10)+F(T.lantern,232,22,1,"pa",8)+F(T.lantern,384,62,.9,"pb",8,-3,true)+F(T.lantern,254,64,.8,"pa",8,-5)+F(T.lantern,360,26,.7,"pb",8,-1,true)+
 `<path d="M-400 78 Q0 75 200 77 T400 76 V82 H-400Z" fill="#0b0e17"/><rect x="-400" y="82" width="800" height="8" fill="#05070d"/>`},
{seed:71,svg:()=>water("#e3f3f9","#a9d3e8","#73a8ce",{rays:"#ffffff",ro:.35,caus:.3,lampC:"#ffffff"})+
 `<path d="M-400 0 H400 V12 Q384 18 368 11 Q350 20 330 10 Q312 16 292 9 Q270 18 250 10 Q228 15 206 9 Q180 14 160 9 Q140 16 120 10 Q96 16 72 10 Q40 15 0 10 L-400 10Z" fill="#fafdff"/><path d="M160 8 Q180 14 206 9 Q228 15 250 10 Q270 18 292 9 Q312 16 330 10 Q350 20 368 11 Q384 18 400 12" stroke="#b3d9ec" stroke-width="1.2" fill="none"/><g fill="#e1f2fb">${[[214,11,9],[262,15,12],[300,11,7],[354,17,13],[388,15,8]].map(([x,y,h])=>`<path d="M${x-2.4} ${y-2} l2.4 ${h} l2.4 ${-h}Z"/>`).join("")}</g>`+
 `<g fill="#cfe7f3" opacity=".7"><path d="M300 30 l6 -4 l8 2 l-2 6 l-9 1Z"/><path d="M220 40 l5 -3 l6 2 l-2 4 l-7 1Z"/></g>`+
 F(T.seal,300,36,1.15,"pc",10)+school(T.cod,246,56,6,.9,"pa",8)+S(T.jelly("#e1f5fe","#ffffff"),382,40,.65)+
 rock(352,79,60,14,["#90a4ae","#b0bec5","#607d8b"])+rock(222,79,30,8,["#9eb0b9","#c5d1d7","#6d828c"])+
 `<g>${Array.from({length:9},()=>`<circle cx="${f1(rr(200,400))}" cy="${f1(rr(76,79))}" r="${f1(rr(.6,1.2))}" fill="#ffffff"/>`).join("")}</g>`+
 sandBed("#cfd8dc","#b0bec5",["#b0bec5","#eceff1","#90a4ae"])},
);

// Terrariums, vivariums and turtle tanks.
/* air (terrarium): its colours and lamp, and the parts that follow the equipment, drawn by the card: the basking
   spot's cone and glow, the UVB tube and the mist */
const air=(top,mid,bot,{lamp="#fff3c4",spot=null,mist=0,uv=0}={})=>{CUR.water=[top,mid,bot];CUR.opts={ro:0,caus:0,lampC:lamp,surface:1};
 const live={mist,uv,spot:"",tube:`<rect x="140" y="3" width="260" height="2.2" rx="1" fill="#f3eeff"/><rect x="140" y="5" width="260" height="1" fill="#b39ddb" opacity=".6"/>`};
 if(spot){const[x,y]=spot;const c=lin([[0,"#ffcc66",.55],[1,"#ffcc66",0]]),r=rad([[0,"#ffd27a",.65],[1,"#ffb74d",0]]);live.spot=`<defs>${c.def}${r.def}</defs><path d="M${x-7} 6 L${x+7} 6 L${x+34} ${y} L${x-34} ${y}Z" fill="url(#${c.id})" class="gl slow"/><ellipse cx="${x}" cy="${y}" rx="36" ry="10" fill="url(#${r.id})" class="gl slow"/>`;live.fixture=`<path d="M${x-9} 0 L${x+9} 0 L${x+7} 6 L${x-7} 6Z" fill="#455a64"/><rect x="${x-6}" y="5.4" width="12" height="1.6" rx=".8" class="bulb"/>`;}
 live.fog=`<g class="mist" fill="#ffffff">${Array.from({length:7},(_,i)=>`<ellipse cx="${140+i*42+((i*37)%17)-8}" cy="${12+((i*53)%19)}" rx="${18+((i*29)%15)}" ry="${4+((i*7)%5)}" opacity="${f1(.12+((i*31)%13)/100)}" style="animation-delay:${f1(-i*1.1)}s"/>`).join("")}</g>`;
 CUR.air=live;return "";};
const glass=()=>`<path d="M392 6 L398 6 L398 80 L392 80Z" fill="#ffffff" opacity=".08"/><path d="M150 8 L170 8 L120 80 L100 80Z" fill="#ffffff" opacity=".05"/>`;
const soil=(c,dots,ground)=>{CUR.ground={c:ground,dots};return `<path d="M-400 76 Q-200 72 0 75 Q80 70 160 74 T300 72 T400 74 V82 H-400Z" fill="${c}"/>${Array.from({length:70},()=>`<ellipse cx="${f1(rr(-40,400))}" cy="${f1(rr(73,81))}" rx="${f1(rr(.6,1.6))}" ry="${f1(rr(.4,1))}" fill="${pick(dots)}"/>`).join("")}`;};
const cactus=(x,y,h,c="#5b8c3a",c2="#3f6b28")=>`<g><path d="M${x-4} ${y} L${x-4} ${y-h+4} Q${x} ${y-h-2} ${x+4} ${y-h+4} L${x+4} ${y}Z" fill="${c}"/><path d="M${x-4} ${y-h*.45} L${x-10} ${y-h*.45} L${x-10} ${y-h*.75} Q${x-7} ${y-h*.85} ${x-6} ${y-h*.75} L${x-6} ${y-h*.55} L${x-4} ${y-h*.55}Z" fill="${c}"/><path d="M${x+4} ${y-h*.6} L${x+9} ${y-h*.6} L${x+9} ${y-h*.85} Q${x+11.5} ${y-h*.95} ${x+12} ${y-h*.85} L${x+12} ${y-h*.52} L${x+4} ${y-h*.52}Z" fill="${c}"/><path d="M${x} ${y} L${x} ${y-h+2} M${x-2} ${y} L${x-2} ${y-h+4} M${x+2} ${y} L${x+2} ${y-h+4}" stroke="${c2}" stroke-width=".5"/><g stroke="#f1f8e9" stroke-width=".4">${Array.from({length:Math.round(h/3)},(_,i)=>`<path d="M${x-4} ${y-2-i*3} l-1.4 -.6 M${x+4} ${y-3-i*3} l1.4 -.6"/>`).join("")}</g><circle cx="${x}" cy="${y-h-1}" r="1.8" fill="#f06292"/></g>`;
const brom=(x,y,s,c,c2)=>`<g class="sway slow">${Array.from({length:9},(_,i)=>{const a=-75+i*150/8,r=a*Math.PI/180,L=(i%2?14:18)*s;return `<path d="M${x} ${y} Q${f1(x+Math.sin(r)*L*.6-1)} ${f1(y-Math.cos(r)*L*.6)} ${f1(x+Math.sin(r)*L)} ${f1(y-Math.cos(r)*L)} Q${f1(x+Math.sin(r)*L*.6+1.6)} ${f1(y-Math.cos(r)*L*.5)} ${x} ${y}Z" fill="${Math.abs(a)<30?c2:c}"/>`;}).join("")}</g>`;
const vine=(x,y,len,c="#4caf50")=>`<g class="hang"><path d="M${x} ${y} Q${x+4} ${y+len/2} ${x-2} ${y+len}" stroke="#5d4037" stroke-width=".8" fill="none"/>${Array.from({length:Math.round(len/5)},(_,i)=>`<ellipse cx="${f1(x+(i%2?2.4:-2.4)+Math.sin(i)*1.5)}" cy="${f1(y+4+i*5)}" rx="2.4" ry="1.3" transform="rotate(${i%2?30:-30} ${f1(x)} ${f1(y+4+i*5)})" fill="${c}"/>`).join("")}</g>`;
const hide=(x,y,w,c="#6d4c33",c2="#4e3423")=>`<path d="M${x-w/2} ${y} Q${x-w/2} ${y-w*.55} ${x} ${y-w*.6} Q${x+w/2} ${y-w*.55} ${x+w/2} ${y}Z" fill="${c}"/><path d="M${x-w*.25} ${y} Q${x-w*.25} ${y-w*.3} ${x} ${y-w*.3} Q${x+w*.25} ${y-w*.3} ${x+w*.25} ${y}Z" fill="#1d140d"/><g stroke="${c2}" stroke-width=".6" fill="none">${[.15,.3,.45].map(k=>`<path d="M${f1(x-w/2+w*k)} ${f1(y-w*.4)} q4 -2 8 0"/>`).join("")}</g>`;
const bowl=(x,y,w=22,water="#7ec8e3")=>`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="3.6" fill="#78909c"/><ellipse cx="${x}" cy="${y-1.4}" rx="${w/2-2}" ry="2.4" fill="${water}"/><path d="M${x-w/2+4} ${y-1.6} q3 -1 6 0" stroke="#fff" stroke-width=".5" fill="none" opacity=".7"/>`;
const drip=(x,y)=>`<g class="drip"><circle cx="${x}" cy="${y}" r="1" fill="#b3e5fc"/></g>`;
const leaf=(x,y,s,a,c="#2e7d32",v="#1b5e20")=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0 Q8 -6 20 0 Q8 6 0 0Z" fill="${c}"/><path d="M0 0 L19 0 M6 0 l3 -2 M10 0 l3 -2 M6 0 l3 2 M10 0 l3 2" stroke="${v}" stroke-width=".5"/></g>`;
const waterPart=(x0,x1,y,c1,c2)=>{CUR.wet=1;const g=lin([[0,c1,.85],[1,c2,.95]]);return `<defs>${g.def}</defs><rect x="${x0}" y="${y}" width="${x1-x0}" height="${80-y}" fill="url(#${g.id})"/><path d="M${x0} ${y} ${`q4 -1.4 8 0 t8 0 `.repeat(Math.ceil((x1-x0)/16))}" stroke="#ffffff" stroke-width=".7" fill="none" opacity=".7" class="caus"/><rect x="${x0}" y="${y}" width="${x1-x0}" height="1" fill="#fff" opacity=".35"/>`;};
const A={
/* Bearded dragon: sprawled on the basking rock, spiny beard and flanks, banded tail. */
dragon:`<defs><linearGradient id="an-dr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6be86"/><stop offset=".55" stop-color="#cf9658"/><stop offset="1" stop-color="#a06a35"/></linearGradient></defs>
<g class="tail"><path d="M-12 1.5 Q-24 1 -44 5.4 Q-26 5.8 -12 5Z" fill="url(#an-dr)"/><path d="M-18 1.6 v3.6 M-24 1.8 v3.4 M-30 2.4 v2.8 M-36 3.4 v2" stroke="#9a6532" stroke-width="1.1" opacity=".6"/></g>
<g class="lg-b"><path d="M-8 3 Q-11 6 -15 8.4" stroke="#9a6532" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-15 8.4 l-2.2 .2 M-15 8.4 l-1.6 1.4 M-15 8.4 l-.4 1.6" stroke="#7d5129" stroke-width=".6"/></g>
<g class="lg-b"><path d="M8 3 Q10 6 13 8.4" stroke="#9a6532" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M13 8.4 l2 .4 M13 8.4 l1.4 1.4 M13 8.4 l0 1.7" stroke="#7d5129" stroke-width=".6"/></g>
<path d="M-14 1.6 Q-13 -5.6 -3 -7 Q8 -8.4 13 -4.4 Q15.4 -.4 11 3.6 Q0 6.6 -12.4 4.8Z" fill="url(#an-dr)"/>
<path d="M-11 4.6 Q0 6.2 10 3.6 Q0 4.6 -11 3.2Z" fill="#f0d3a3" opacity=".7"/>
<g fill="#b47b40">${[-11,-8,-5,-2,1,4,7].map(x=>`<path d="M${x} 4.4 l1.3 2.4 l1.2 -2.2Z"/>`).join("")}</g>
<g fill="#f3d7a6">${[-9,-5,-1,3,7].map((x,i)=>`<path d="M${x} -6.2 l1 -1.8 l1 1.8Z M${x+1.4} -3.6 l.8 -1.4 l.8 1.4Z"/>`).join("")}</g>
<g fill="#b98048" opacity=".55">${[-8,-3,2,6].map(x=>`<ellipse cx="${x}" cy="-1.6" rx="2.2" ry="1.4"/>`).join("")}</g>
<g class="lg-a"><path d="M-6 3.4 Q-8 7 -11.6 8.8" stroke="#b47b40" stroke-width="2.9" fill="none" stroke-linecap="round"/><path d="M-11.6 8.8 l-2.4 .2 M-11.6 8.8 l-1.8 1.5 M-11.6 8.8 l-.5 1.8 M-11.6 8.8 l.8 1.4" stroke="#8d5c2c" stroke-width=".7"/></g>
<g class="head"><path d="M9.6 -4.2 Q14 -8.6 20.4 -5.8 Q24.4 -3.6 23.6 -.6 Q21 2.8 12 3.2Z" fill="url(#an-dr)"/>
<path d="M11 3 l1.2 2.4 l1 -2 l1.3 2.6 l1 -2.4 l1.3 2.4 l1 -2.2 l1.3 2 l.8 -2" stroke="#7d5129" stroke-width=".8" fill="#a06a35"/>
<path d="M12 -6 l.8 -1.6 l.6 1.6 M15 -7 l.8 -1.6 l.6 1.6 M18 -6.6 l.8 -1.4 l.6 1.4" fill="#f3d7a6"/>
<path d="M17 .4 Q20.6 1.4 23.4 -.4" stroke="#6d4524" stroke-width=".5" fill="none"/>
<circle cx="18.6" cy="-3.2" r="1.25" fill="#2b1a0e"/><circle cx="19" cy="-3.6" r=".38" fill="#fff"/><circle cx="22.4" cy="-2.6" r=".3" fill="#4e2f16"/><ellipse cx="14.6" cy="-2" rx=".7" ry=".9" fill="#5c3a1d"/></g>
<g class="lg-a"><path d="M9 3.4 Q12 7 15 8.8" stroke="#b47b40" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M15 8.8 l2.2 .5 M15 8.8 l1.6 1.6 M15 8.8 l.2 1.9 M15 8.8 l-.9 1.4" stroke="#8d5c2c" stroke-width=".7"/></g>`,
/* Leopard gecko: plump spotted body, fat ringed tail, big lidded eyes, pale belly. */
leo:`<defs><linearGradient id="an-lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d65a"/><stop offset=".7" stop-color="#eebb36"/><stop offset="1" stop-color="#fff1c9"/></linearGradient><linearGradient id="an-lgt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c3e6"/><stop offset="1" stop-color="#f4ead0"/></linearGradient></defs>
<g class="tail"><path d="M-9 -1.4 Q-16 -3.6 -23 -2 Q-29 -.4 -28.6 2 Q-24 4.4 -9 4.2Z" fill="url(#an-lg)"/><path d="M-14 -2.4 Q-13 1 -14 4 M-19.4 -2.6 Q-18.4 1 -19.4 3.8 M-24.4 -1.6 Q-23.4 1 -24.4 3.4" stroke="#c9b3e0" stroke-width="2" fill="none" opacity=".75"/><g fill="#3d2b1f">${[[-16.4,-.6],[-21.6,.8],[-26.4,.6],[-17,2.4],[-11.6,.8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".7"/>`).join("")}</g></g>
<g class="lg-b"><path d="M-7 2.6 Q-10 5 -12 6.6" stroke="#d9a531" stroke-width="2" fill="none" stroke-linecap="round"/></g>
<g class="lg-b"><path d="M6 2.6 Q8 5 10 6.6" stroke="#d9a531" stroke-width="1.9" fill="none" stroke-linecap="round"/></g>
<path d="M-11 1 Q-10 -4.6 -2 -5 Q6 -5.4 9 -3 Q10.6 0 8 3 Q0 5 -10 4Z" fill="url(#an-lg)"/>
<g fill="#3d2b1f">${[[-8,-3],[-5,-1.2],[-2,-3.6],[1,-1.6],[4,-3.4],[6.4,-1],[-7,.6],[-1,.2],[3,.8]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${(.55+((x*7+y*3)%3+3)%3*.12).toFixed(2)}"/>`).join("")}</g>
<path d="M-9 3.6 Q0 4.8 8 2.6" stroke="#fff6dc" stroke-width="1" fill="none" opacity=".8"/>
<g class="lg-a"><path d="M-5 2.8 Q-7 5.6 -9.6 7" stroke="#eebb36" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M-9.6 7 l-1.8 .2 M-9.6 7 l-1.2 1.2 M-9.6 7 l-.2 1.4" stroke="#c99a2a" stroke-width=".55"/></g>
<g class="head"><path d="M7.6 -3 Q11 -6.2 16 -4.6 Q19.2 -3 18.6 -.4 Q17 2.4 9 2.8Z" fill="url(#an-lg)"/><g fill="#3d2b1f"><circle cx="12" cy="-4.4" r=".5"/><circle cx="14.6" cy="-4.6" r=".45"/><circle cx="10.4" cy="-2" r=".5"/></g>
<ellipse cx="14.4" cy="-2" rx="1.6" ry="1.3" fill="#e6d4a8"/><ellipse cx="14.4" cy="-2" rx="1.3" ry="1.05" fill="#4a3a2c"/><path d="M14.4 -3 v2" stroke="#111" stroke-width=".4"/><circle cx="14.8" cy="-2.5" r=".3" fill="#fff"/>
<path d="M12 1 Q15.6 1.6 18.4 -.2" stroke="#8a6a2a" stroke-width=".45" fill="none"/><circle cx="18" cy="-1.6" r=".25" fill="#3d2b1f"/></g>
<g class="lg-a"><path d="M7 2.8 Q9.6 5.6 12.2 7" stroke="#eebb36" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M12.2 7 l1.8 .4 M12.2 7 l1.2 1.3 M12.2 7 l.1 1.5" stroke="#c99a2a" stroke-width=".55"/></g>`,
/* Crested gecko: tan-orange, eyelash crests, fringed back, round toe pads, curled tail tip. */
crested:`<defs><linearGradient id="an-cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a14a"/><stop offset=".6" stop-color="#d27c2a"/><stop offset="1" stop-color="#f4c58c"/></linearGradient></defs>
<g class="tail"><path d="M-9 .4 Q-18 2 -21 7 Q-23 10.4 -20 11 Q-18 11 -18.6 9.4 Q-18 6 -9 3.6Z" fill="url(#an-cg)"/></g>
<g class="lg-b"><path d="M-6 2 Q-9 4.4 -11 6.4" stroke="#b9661f" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="-11.4" cy="6.8" r=".9" fill="#b9661f"/></g>
<g class="lg-b"><path d="M5 2 Q7 4.4 9 6.4" stroke="#b9661f" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="9.4" cy="6.8" r=".85" fill="#b9661f"/></g>
<path d="M-10 .6 Q-8 -4 0 -4.2 Q6 -4.4 8 -2 Q9 1 6 2.8 Q-2 4 -9.6 3.4Z" fill="url(#an-cg)"/>
<path d="M-9 -1.2 ${Array.from({length:9},(_,i)=>`l1 -1.3 l1 1.3`).join(" ")}" stroke="#f7d7a6" stroke-width=".6" fill="none"/>
<path d="M-8 1 Q-1 2.4 6 1" stroke="#a8561a" stroke-width=".8" fill="none" opacity=".5"/>
<g class="lg-a"><path d="M-4 2.4 Q-6 5 -8.4 6.8" stroke="#d27c2a" stroke-width="1.8" fill="none" stroke-linecap="round"/><g fill="#d27c2a"><circle cx="-9.4" cy="7" r=".7"/><circle cx="-8.6" cy="7.8" r=".7"/><circle cx="-7.6" cy="7.4" r=".65"/></g></g>
<g class="head"><path d="M6.6 -2.4 Q9 -5.6 13.6 -4.6 Q17.6 -3.2 17 -.4 Q15.4 2.4 8 2.6Z" fill="url(#an-cg)"/>
<path d="M9.6 -5 l.8 -1.6 l.8 1.2 l.8 -1.6 l.8 1.2 l.8 -1.6 l.8 1.4" stroke="#f7d7a6" stroke-width=".55" fill="none"/>
<ellipse cx="13" cy="-2.3" rx="1.55" ry="1.35" fill="#c07a2c"/><ellipse cx="13" cy="-2.3" rx=".35" ry="1.1" fill="#111"/><circle cx="13.5" cy="-2.9" r=".3" fill="#fff"/>
<path d="M10.6 1 Q14 1.8 16.8 -.2" stroke="#8a4510" stroke-width=".45" fill="none"/></g>
<g class="lg-a"><path d="M6 2.4 Q8.4 5 10.6 6.8" stroke="#d27c2a" stroke-width="1.7" fill="none" stroke-linecap="round"/><g fill="#d27c2a"><circle cx="11.6" cy="7.2" r=".7"/><circle cx="10.8" cy="7.9" r=".7"/><circle cx="9.8" cy="7.5" r=".65"/></g></g>`,
/* Panther chameleon: tall flat body, casque, turret eye, gripping feet, curled tail; its colours shift. */
cham:`<defs><linearGradient id="an-ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fa36b"/><stop offset=".55" stop-color="#43b97a"/><stop offset="1" stop-color="#9be3b5"/></linearGradient></defs>
<g class="tail"><path d="M-10 3 Q-17 5 -16 11 Q-15 15.4 -11.2 14.4 Q-9 13.4 -10 11.4 Q-11 10 -12.4 11 Q-12.8 8 -9 6Z" fill="#2f9a5f"/><path d="M-13.6 7 l2 .8 M-15 9.4 l2 .4 M-14.6 12.4 l1.8 -.4" stroke="#1d7044" stroke-width=".8"/></g>
<g class="lg-b"><path d="M-6 4 L-8 9 L-9.6 9.6" stroke="#278553" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>
<g class="lg-b"><path d="M5 4 L7 9 L8.6 9.6" stroke="#278553" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
<path class="cham" d="M-11 3.6 Q-12 -5.6 -1 -7.4 Q9 -8 12 -1.4 Q11 4.4 2 6 Q-6 6.6 -11 3.6Z" fill="url(#an-ch)"/>
<path d="M-11 3.6 Q-12 -5.6 -1 -7.4 Q9 -8 12 -1.4" stroke="#1d7044" stroke-width=".9" fill="none" stroke-dasharray="1 .9"/>
<g fill="#2a8fd6" opacity=".55">${[-7,-3,1,5].map(x=>`<path d="M${x} -5.6 q1.6 4 0 9.4 q2.4 -4.4 1.4 -9.6Z"/>`).join("")}</g>
<path d="M-9 2.6 Q0 4 9 .6" stroke="#f4fff6" stroke-width="1.1" fill="none" opacity=".85"/>
<g class="lg-a"><path d="M-4 4.6 L-6 9.2" stroke="#36a86a" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-6 9.2 l-1.6 .8 M-6 9.2 l1.2 .9" stroke="#36a86a" stroke-width="1.3" stroke-linecap="round"/></g>
<g class="head"><path d="M9.4 -3.4 Q10 -10 15 -9.6 Q19.4 -7.6 20 -2.4 Q19.6 1.6 15 2.6 Q10.6 3 9.4 -3.4Z" fill="url(#an-ch)" class="cham"/>
<path d="M11 -8.6 Q13 -11.4 16 -9.8" stroke="#1d7044" stroke-width=".8" fill="none"/>
<path d="M14 1.2 Q17.4 1.6 19.8 -1" stroke="#e8553c" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<circle cx="15.4" cy="-3.6" r="2.4" fill="#5fc184" stroke="#1d7044" stroke-width=".4"/><circle cx="15.4" cy="-3.6" r="1.6" fill="#8fd6a6"/><circle cx="16" cy="-3.6" r=".8" fill="#111" class="eyeroll"/>
<path class="tongue" d="M20 -1.6 Q26 -2.4 30 -2" stroke="#f48fb1" stroke-width=".9" fill="none"/></g>
<g class="lg-a"><path d="M6 4.6 L8.4 9.2" stroke="#36a86a" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M8.4 9.2 l1.6 .8 M8.4 9.2 l-1.2 .9" stroke="#36a86a" stroke-width="1.3" stroke-linecap="round"/></g>`,
/* Ball python: thick coils with the brown and tan saddles of the species, the head raised, its tongue flicking. */
python:`${[[0,6,24,6.6],[1,.6,18,5.4]].map(([dx,dy,rx,ry],i)=>`<ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#2b1c12" stroke-width="7.6"/><ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#5a3b22" stroke-width="6.4"/><ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#c9a06a" stroke-width="5.2" stroke-dasharray="${i?"5 4.2":"6.4 5"}" stroke-dashoffset="${i*3}"/><ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="none" stroke="#e8cfa2" stroke-width="1.2" stroke-dasharray="${i?"2 7.2":"2.6 8.8"}" stroke-dashoffset="${i*3-1.6}" opacity=".9"/><ellipse cx="${dx}" cy="${dy-1.6}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width=".7" opacity=".18"/>`).join("")}
<path d="M14 0 Q20 -6 18 -12 Q17 -16 21 -17" stroke="#2b1c12" stroke-width="6.6" fill="none" stroke-linecap="round"/><path d="M14 0 Q20 -6 18 -12 Q17 -16 21 -17" stroke="#5a3b22" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M15.6 -3 Q19.4 -7 18.2 -11.4" stroke="#c9a06a" stroke-width="4" fill="none" stroke-dasharray="3 3"/>
<g class="head"><path d="M19 -18.6 Q24 -21.4 29.4 -19 Q31 -17.6 29.6 -16 Q24.6 -14 19.6 -15.4Z" fill="#5a3b22"/><path d="M20 -18.6 Q24.4 -20.6 28.6 -18.8 L26 -17.6 Q23 -17 20.4 -17.6Z" fill="#c9a06a" opacity=".8"/><path d="M22 -17.2 L29 -17.6" stroke="#2b1c12" stroke-width=".7"/>
<circle cx="25.6" cy="-18.4" r=".85" fill="#111"/><circle cx="25.9" cy="-18.7" r=".25" fill="#fff"/>
<path class="tongue" d="M29.6 -16.6 l3 .2 l1.2 -.9 M32.6 -16.4 l1.2 .7" stroke="#d81b60" stroke-width=".5" fill="none"/></g>`,
/* Red-knee tarantula: hairy abdomen and legs, orange knee bands; walks on alternate legs. */
spider:`${[[1,"#241812",1.4,2.6,1],[0,"#3a2a20",1.8,0,0]].map(([far,col,w,dx,dy])=>[[-1,-9,-18],[1,-3.6,-9],[3,6,10.4],[5,12,19]].map(([ax,kx,tx],i)=>`<g class="${(i+far)%2?"lg-a":"lg-b"}"><path d="M${ax+dx} ${-1+dy} L${kx+dx} ${-9+dy} L${tx+dx} ${8.6}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${kx+dx} ${-9+dy} L${(kx+(tx-kx)*.18+dx).toFixed(1)} ${(-9+17.6*.18+dy).toFixed(1)}" stroke="#ff7a1a" stroke-width="${w*.85}" stroke-linecap="round"/><path d="M${ax+dx} ${-1+dy} L${kx+dx} ${-9+dy} L${tx+dx} ${8.6}" stroke="#a08870" stroke-width=".3" stroke-dasharray=".3 .7" fill="none"/></g>`).join("")).join("")}
<ellipse cx="-9" cy="-1" rx="7.4" ry="6" fill="#2b1d16"/><ellipse cx="-9.4" cy="-2.4" rx="5.6" ry="3.8" fill="#3e2a1f"/>
<g stroke="#b0907a" stroke-width=".35" opacity=".85">${Array.from({length:30},(_,i)=>{const t=i/30*Math.PI*2;return `<path d="M${(-9+Math.cos(t)*7).toFixed(1)} ${(-1+Math.sin(t)*5.6).toFixed(1)} l${(Math.cos(t)*1.5).toFixed(1)} ${(Math.sin(t)*1.5).toFixed(1)}"/>`}).join("")}</g>
<ellipse cx="2.6" cy="-1.4" rx="4.8" ry="3.6" fill="#2b1d16"/><path d="M-.6 -3.2 Q2.6 -5.4 5.8 -3.2" stroke="#e8a35a" stroke-width=".8" fill="none"/><circle cx="3.2" cy="-3.6" r=".6" fill="#111"/><circle cx="3.4" cy="-3.8" r=".18" fill="#fff"/>
<path d="M6.4 -.2 q2.6 1 3.4 3.4 M6.6 -1.6 q3 -.2 4.4 2" stroke="#2b1d16" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
/* Dart frog: glossy, spotted, folded legs, big dark eye; its throat pulses. */
dart:(c="#1e5bd8",spot="#0b1a3a",leg="#163f9e")=>`<path d="M-6 3 Q-11 3 -12.4 6.6 L-9 6.8 M-12.4 6.6 l-1.6 .6 M-12.4 6.6 l-.6 1.2" stroke="${leg}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
<path d="M-8 2.4 Q-9 -4.4 -1 -5 Q6 -5.6 8 -1 Q9 2.4 6 4.6 Q-2 5.6 -8 2.4Z" fill="${c}"/>
<path d="M-6 -2.6 Q-1 -5.4 5 -3.4" stroke="#ffffff" stroke-width="1.2" fill="none" opacity=".35" stroke-linecap="round"/>
<g fill="${spot}">${[[-5,-1],[-1,-2.8],[2.6,-1.6],[-3,1.6],[1,1.4],[4.6,1.2],[-6.2,1.4]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${(.9+i%3*.3).toFixed(1)}" ry="${(.7+i%2*.3).toFixed(1)}"/>`).join("")}</g>
<ellipse class="throat" cx="5" cy="3.8" rx="2.2" ry="1.2" fill="${c}" opacity=".9"/>
<circle cx="5.2" cy="-3" r="1.9" fill="#0b0b0b"/><circle cx="5.8" cy="-3.6" r=".55" fill="#fff"/>
<path d="M3 2.8 L4.6 6.6 l1.8 .2 M4.6 6.6 l.8 1" stroke="${leg}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
/* Red-eyed tree frog: bright green, red eyes with a slit pupil, blue flanks barred yellow, orange sticky toes. */
treefrog:`<path d="M-6 3 Q-12 3.4 -13 7.6 L-10 8" stroke="#3c9a3c" stroke-width="2" fill="none" stroke-linecap="round"/><g fill="#ff7a2a"><circle cx="-13.6" cy="8.2" r=".9"/><circle cx="-11.8" cy="8.8" r=".9"/><circle cx="-10" cy="8.6" r=".85"/></g>
<path d="M-8 2.6 Q-8.6 -4.4 0 -5 Q7 -5.4 9 -1.6 Q10 2 7 4 Q-1 5.6 -8 2.6Z" fill="#4cbf4a"/>
<path d="M-7 2.4 Q-1 4.4 6 3" stroke="#2f7ad1" stroke-width="2" fill="none"/><path d="M-5 1.8 l.4 2 M-2 2.4 l.3 2 M1 2.6 l.2 1.8 M4 2.4 l0 1.6" stroke="#ffd54f" stroke-width=".7"/>
<path d="M-6 -2.8 Q0 -5.6 6 -3.6" stroke="#b9f6a6" stroke-width=".9" fill="none" opacity=".6"/>
<ellipse class="throat" cx="6" cy="3.4" rx="2" ry="1" fill="#e9f7d9"/>
<circle cx="5" cy="-4.4" r="2.4" fill="#e3261f"/><circle cx="5" cy="-4.4" r="2.4" fill="none" stroke="#3c9a3c" stroke-width=".4"/><ellipse cx="5" cy="-4.4" rx=".45" ry="1.6" fill="#111"/><circle cx="5.7" cy="-5.2" r=".45" fill="#fff"/>
<path d="M3 2.8 Q4.6 5.4 6.6 7" stroke="#3c9a3c" stroke-width="1.6" fill="none" stroke-linecap="round"/><g fill="#ff7a2a"><circle cx="7.4" cy="7.4" r=".85"/><circle cx="6.2" cy="8" r=".85"/><circle cx="5" cy="7.6" r=".8"/></g>`,
/* Stick insect: a twig body with joints, long angled legs and antennae. */
stick:`<g stroke-linecap="round" fill="none"><path d="M-6 0 L-10 7 L-12 8 M-2 0 L-4 7.6 L-6 8.6 M4 0 L7 7.4 L9 8.4 M-12 0 L-16 6 M8 0 L13 6.6 L15 7.2" stroke="#7a5a3a" stroke-width=".7"/><path d="M-24 .4 Q-6 -.6 16 0 L21 -.6" stroke="#8d6a46" stroke-width="2.4"/><path d="M-24 .4 Q-6 -.6 16 0" stroke="#b08a60" stroke-width=".7"/><path d="M-12 -.4 v1 M-4 -.4 v1 M4 -.3 v1 M10 -.2 v1" stroke="#5d4430" stroke-width=".6"/><path d="M21 -.6 l7 -4 M21 -.6 l8 -1.4" stroke="#7a5a3a" stroke-width=".45"/><path d="M14 0 L18 -5 L22 -6 M10 0 L14 -4.6" stroke="#7a5a3a" stroke-width=".7"/><circle cx="20.4" cy="-.8" r=".4" fill="#2b1d16"/></g>`,
/* Praying mantis: raptorial forelegs folded, long prothorax, wings over the abdomen, triangular head. */
mantis:`<defs><linearGradient id="an-mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ccc65"/><stop offset="1" stop-color="#558b2f"/></linearGradient></defs>
<g stroke="#558b2f" stroke-linecap="round" fill="none"><path d="M-6 1 l-5 7.6 M-3 1 l-2 8.6 M-1 1 l5 7.4" stroke-width=".8"/></g>
<path d="M-20 2.6 Q-12 -2.4 -1 -.4 Q-9 4.4 -20 2.6Z" fill="url(#an-mt)"/><path d="M-18 1.6 Q-10 -1.4 -2 -.2" stroke="#c5e1a5" stroke-width=".5" fill="none"/><path d="M-19 2.4 Q-10 1.6 -2 0" stroke="#33691e" stroke-width=".4" fill="none"/>
<path d="M-1 -.4 L8 -7.6" stroke="#7cb342" stroke-width="1.6" stroke-linecap="round"/>
<g class="head"><path d="M7.4 -8.4 L12.4 -9.6 L10 -6 Z" fill="#8bc34a"/><circle cx="11.8" cy="-9.4" r=".9" fill="#c0ca33"/><circle cx="12" cy="-9.5" r=".3" fill="#33691e"/><path d="M8.6 -9 l2 -5 M9.6 -8.8 l4.6 -4" stroke="#558b2f" stroke-width=".35"/></g>
<path d="M6 -6 L9 -1.4 L7 -3.6 L10 -6 L12.4 -4.2" stroke="#7cb342" stroke-width="1.3" fill="none" stroke-linejoin="round"/><path d="M9 -1.4 l.6 -1 M8.4 -2.4 l.8 -.6" stroke="#33691e" stroke-width=".4"/>`,
/* Hermit crab: a spiralled shell, eyestalks, a big purple claw and red walking legs. */
hermit:(sc="#d9b38c",sl="#a47a50",body="#c2185b")=>`<g class="lg-b"><path d="M2 2 L6 6.4 L7.6 6.6 M0 2.4 L2.6 7 L4 7.4" stroke="${body}" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M-14 3 Q-15 -10 -3 -11.4 Q8 -11 8.6 -2 Q9 4 0 5.6 Q-11 6 -14 3Z" fill="${sc}"/>
<path d="M-3 -11.4 Q-12 -9.4 -11 -2 Q-10 3.6 -3 3.4 Q3 3 2.6 -2.6 Q2.2 -7 -2 -6.6 Q-5.6 -6 -5 -2.6 Q-4.4 .2 -2 -.2" stroke="${sl}" stroke-width="1.1" fill="none"/>
<path d="M-12 -3 Q-6 -10 3 -9" stroke="#fff" stroke-width=".8" fill="none" opacity=".35"/><path d="M-13 2.4 Q-2 6.4 8 1" stroke="#000" stroke-width=".8" fill="none" opacity=".15"/>
<path d="M4 1.6 Q8 0 10 2.4 Q9.6 5 6 5Z" fill="${body}"/>
<path d="M8 1 L9 -6 M9.6 1.4 L11.6 -5.2" stroke="${body}" stroke-width=".8"/><circle cx="9" cy="-6.4" r=".9" fill="#111"/><circle cx="11.7" cy="-5.6" r=".85" fill="#111"/>
<path d="M10 0 Q14 -6 17 -4 M10.4 .6 Q15 -3 18 -.6" stroke="#ff8a65" stroke-width=".35" fill="none"/>
<g class="lg-a"><path d="M5 3.6 L8 7.4 L9.8 7.6 M7 3.6 L11 7 L12.6 7" stroke="${body}" stroke-width="1.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
<path d="M8.4 2.6 Q12.6 1.4 14 4 Q13.4 6.6 9.6 6 Z" fill="#7b1fa2"/><path d="M13.4 3.6 L15.6 4.2 L13.6 5.4" fill="#6a1b9a"/><g fill="#e1bee7" opacity=".7"><circle cx="11" cy="3.6" r=".4"/><circle cx="12.4" cy="4.4" r=".35"/></g>`,
/* Axolotl: wide smiling head, three pairs of feathery gills, small eyes, a finned tail and stubby limbs. */
axolotl:(c="#f8bbd0",g="#ec407a")=>`<g class="tail"><path d="M-10 -1 Q-20 -4 -32 0 Q-20 3 -10 3.4Z" fill="${c}"/><path d="M-10 -1.4 Q-20 -6.4 -32 0 Q-20 4.6 -10 4" fill="${c}" opacity=".45"/></g>
<g class="lg-b"><path d="M-7 3 L-9 6 M-9 6 l-1.2 .4 M-9 6 l-.4 1" stroke="${c}" stroke-width="1.4" fill="none" stroke-linecap="round" filter="brightness(.9)"/></g>
<path d="M-12 1 Q-11 -4 -2 -4.2 Q6 -4.4 9 -2.6 Q10 1.6 6 3.6 Q-2 4.6 -12 3.4Z" fill="${c}"/>
<path d="M-10 -2.6 Q-1 -4.2 7 -3" stroke="#fff" stroke-width=".8" fill="none" opacity=".45"/>
<g class="lg-a"><path d="M-4 3 L-6.4 6.6 M-6.4 6.6 l-1.3 .3 M-6.4 6.6 l-.6 1.1 M-6.4 6.6 l.4 1" stroke="${c}" stroke-width="1.5" fill="none" stroke-linecap="round"/></g>
<g class="head"><path d="M7 -3.6 Q12 -6 17 -3.4 Q19 0 17 2.4 Q12 4.6 6.4 3.2Z" fill="${c}"/>
<g class="gills">${[[-2.6,-150],[-3.6,-118],[-2.8,-85]].flatMap(([dy,ang])=>[[0,ang],[1,-ang-180+360]].slice(0,1).map(()=>[dy,ang])).map(([dy,ang])=>`<g transform="translate(9.6 ${dy}) rotate(${ang})"><path d="M0 0 L7 0" stroke="${g}" stroke-width="1.1" stroke-linecap="round"/>${[1.6,3,4.4,5.8].map(t=>`<path d="M${t} 0 l.9 -1.7 M${t} 0 l.9 1.7" stroke="${g}" stroke-width=".6" stroke-linecap="round"/>`).join("")}</g>`).join("")}</g>
<circle cx="14.6" cy="-1.6" r=".75" fill="#2b1d22"/><circle cx="14.8" cy="-1.8" r=".22" fill="#fff"/><path d="M13.6 1.4 Q16 2.4 18 .8" stroke="#c2185b" stroke-width=".45" fill="none"/></g>
<g class="lg-a"><path d="M8 3 L10.4 6.4 M10.4 6.4 l1.3 .2 M10.4 6.4 l.5 1.1 M10.4 6.4 l-.5 1" stroke="${c}" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`,
/* Red-eared slider: olive scutes with yellow lines, a yellow-rimmed shell, striped head with the red ear patch. */
slider:`<defs><linearGradient id="an-sl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b8e3a"/><stop offset="1" stop-color="#3f5f22"/></linearGradient></defs>
<g class="lg-b"><path d="M-8 2 Q-12 4 -14 6.8 l-1.6 .4" stroke="#4e6b2a" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
<g class="lg-b"><path d="M6 2 Q10 3.6 12 6.4 l1.6 .2" stroke="#4e6b2a" stroke-width="2.3" fill="none" stroke-linecap="round"/></g>
<path d="M-13 2.6 Q-12.4 -9.4 0 -9.8 Q12 -9.4 13 2.6Z" fill="url(#an-sl)"/>
<path d="M-6 -8.8 Q-7 -3 -6 2.4 M0 -9.8 V2.6 M6 -8.8 Q7 -3 6 2.4 M-12.4 -2 Q0 -4 12.4 -2" stroke="#2d4416" stroke-width=".7" fill="none"/>
<g stroke="#f2d64b" stroke-width=".5" fill="none" opacity=".8"><path d="M-9 -4 q1 2 0 4 M-3 -7 q1 3 0 6 M3 -7 q-1 3 0 6 M9 -4 q-1 2 0 4"/></g>
<path d="M-13 2.6 Q0 4.6 13 2.6" stroke="#e6c84a" stroke-width="1.6" fill="none"/>
<path d="M-12 -4 Q-6 -9 4 -9.2" stroke="#fff" stroke-width=".8" fill="none" opacity=".25"/>
<g class="lg-a"><path d="M-6 3 Q-8 6 -11 7.6 l-1.4 .2" stroke="#5d7d32" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-7 4.4 l-2 2" stroke="#e6c84a" stroke-width=".4"/></g>
<g class="head"><path d="M11 -1 Q14 -4.4 19 -3.6 Q22 -2.4 21.4 0 Q19 2.2 12 2Z" fill="#5d7d32"/><path d="M13 -2.6 Q17 -3.6 20 -2 M12.6 .6 Q16.6 1.6 20.8 .4 M14 -1 Q17 -1 19.6 -.6" stroke="#f2d64b" stroke-width=".5" fill="none"/><ellipse cx="15.6" cy="-1.2" rx="1.8" ry=".8" fill="#e53935"/><circle cx="18.4" cy="-2.2" r=".75" fill="#111"/><circle cx="18.6" cy="-2.4" r=".22" fill="#fff"/></g>
<g class="lg-a"><path d="M8 3 Q11 5.6 13.6 7.4 l1.4 .2" stroke="#5d7d32" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M10 5 l2 1.6" stroke="#e6c84a" stroke-width=".4"/></g>`,
/* Hermann's tortoise: high dome of yellow scutes bordered black, scaly pillar legs, beaked head. */
tortoise:`<defs><radialGradient id="an-tt" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#e8c56a"/><stop offset="1" stop-color="#b48a3a"/></radialGradient></defs>
<g class="lg-b"><path d="M-8 1 L-9.6 7.4" stroke="#8d7552" stroke-width="3" stroke-linecap="round"/></g><g class="lg-b"><path d="M6 1 L7.4 7.4" stroke="#8d7552" stroke-width="3" stroke-linecap="round"/></g>
<g class="tail"><path d="M-14 1.6 l-3 1.4 l3 .2Z" fill="#a08a64"/></g>
<path d="M-14.4 3 Q-14 -13 0 -13.4 Q14 -13 14.4 3Z" fill="url(#an-tt)"/>
<g stroke="#2b1f12" stroke-width=".9" fill="none" stroke-linejoin="round"><path d="M-4.4 -12.8 L-5 -6 L5 -6 L4.4 -12.8 M-5 -6 L-7 -.6 L7 -.6 L5 -6 M-7 -.6 L-8 2.8 M7 -.6 L8 2.8 M-13.6 -2 L-7 -.6 M13.6 -2 L7 -.6 M-11.4 -8.6 L-5 -6 M11.4 -8.6 L5 -6"/></g>
<g fill="#2b1f12" opacity=".75"><path d="M-2.6 -11 h5.2 l-.6 3.4 h-4Z M-3.2 -4.4 h6.4 l-.8 2.6 h-4.8Z M-11 -5.6 l3.4 -1.4 l.4 3.6 l-3.6 .4Z M11 -5.6 l-3.4 -1.4 l-.4 3.6 l3.6 .4Z"/></g>
<path d="M-14.4 3 Q0 5.2 14.4 3" stroke="#6b5126" stroke-width="1.2" fill="none"/><path d="M-10 -9 Q-4 -13 4 -12.4" stroke="#fff3c4" stroke-width="1" fill="none" opacity=".4"/>
<g class="lg-a"><path d="M-6 2 L-7 8" stroke="#a08a64" stroke-width="3.4" stroke-linecap="round"/><path d="M-8.4 8.4 h3" stroke="#6b5a40" stroke-width=".8"/><path d="M-6.6 3.6 l1 .6 M-6.8 5.4 l1 .6" stroke="#7d6a4a" stroke-width=".5"/></g>
<g class="head"><path d="M12 -1.6 Q16 -4.8 20.6 -2.6 Q22.2 -.6 20.6 1.4 Q16 2.6 12.4 1.6Z" fill="#a08a64"/><path d="M19.6 -.4 L22 .4 L20.4 1.2" fill="#6b5a40"/><circle cx="18" cy="-1.6" r=".8" fill="#111"/><circle cx="18.2" cy="-1.8" r=".22" fill="#fff"/><path d="M14 0 Q16 .8 18 0" stroke="#7d6a4a" stroke-width=".4" fill="none"/></g>
<g class="lg-a"><path d="M8 2 L9.4 8" stroke="#a08a64" stroke-width="3.4" stroke-linecap="round"/><path d="M8 8.4 h3" stroke="#6b5a40" stroke-width=".8"/></g>`,
/* Musk turtle: small high dark shell with a keel, long neck, two yellow stripes on the head. */
musk:`<g class="lg-b"><path d="M-6 1.6 l-3 4.6" stroke="#3e3a33" stroke-width="1.8" stroke-linecap="round"/></g><g class="lg-b"><path d="M5 1.6 l3 4.4" stroke="#3e3a33" stroke-width="1.8" stroke-linecap="round"/></g>
<path d="M-10 2.4 Q-9.4 -7.6 0 -8 Q9.4 -7.6 10 2.4Z" fill="#3b3730"/><path d="M-6 -6.4 Q0 -9 6 -6.4" stroke="#57514a" stroke-width="1.2" fill="none"/><path d="M0 -8 V2" stroke="#26231e" stroke-width=".6"/><path d="M-9 -2 Q0 -4 9 -2" stroke="#26231e" stroke-width=".5" fill="none"/>
<path d="M-10 2.4 Q0 3.8 10 2.4" stroke="#6d6458" stroke-width="1" fill="none"/>
<g class="lg-a"><path d="M-4 2.4 l-2.6 4.4" stroke="#4a453c" stroke-width="2" stroke-linecap="round"/></g>
<g class="head"><path d="M8.4 0 Q12 -3 15.4 -2 Q17 -.6 15.6 1 Q12 2.2 8.6 1.8Z" fill="#4a453c"/><path d="M10 -1.6 Q13 -2.8 16 -1.2 M10 .6 Q13 1.4 15.8 .4" stroke="#e6c84a" stroke-width=".45" fill="none"/><circle cx="13.6" cy="-1.1" r=".55" fill="#111"/><path d="M15.4 1 l.6 .8 M14.8 1.2 l.3 .9" stroke="#4a453c" stroke-width=".4"/></g>
<g class="lg-a"><path d="M6 2.4 l2.6 4.2" stroke="#4a453c" stroke-width="2" stroke-linecap="round"/></g>`,
};
TH.push(
{seed:101,svg:()=>air("#fbe9c8","#f3d59a","#e7bd73",{lamp:"#fff3c4",spot:[318,62]})+glass()+
 `<path d="M100 82 Q160 60 230 66 Q300 56 400 62 V82Z" fill="#e4b46c" opacity=".6"/>`+rock(320,79,64,26,["#b98a5a","#d7aa78","#8d6440"])+rock(366,79,40,18,["#c49a6c","#ddb88a","#97704c"])+rock(232,79,22,10,["#c49a6c","#ddb88a","#97704c"])+
 cactus(388,78,30)+cactus(206,78,18,"#6a9a45","#4a7a2c")+`<path d="M262 79 q6 -10 10 0 M266 79 q2 -8 6 -2 M270 79 q-2 -6 2 -9" stroke="#a5a35a" stroke-width=".9" fill="none"/>`+
 S(A.dragon,306,44,1.45,"nod")+F(A.leo,246,71,1.2,"pd",8,-2,true)+
 soil("#f0cc8a",["#d9ae64","#fbe2b3","#c79b54"],"#d9ae64")},
{seed:103,svg:()=>air("#cfe9d6","#8fc7a2","#4f8f68",{lamp:"#f1f8e9",mist:1.2})+glass()+
 backdrop("plant","#2e6b44",.4)+`<path d="M330 6 L352 6 L350 80 L334 80Z" fill="#5d4c3e"/><path d="M336 10 L346 10 L344 78 L338 78Z" fill="#a7d8ef" opacity=".8" class="caus"/><g fill="#e1f5fe" opacity=".8">${[20,34,48,62].map(y=>`<path d="M338 ${y} q3 4 6 0" stroke="#fff" stroke-width=".5" fill="none"/>`).join("")}</g>`+bowl(342,79,28,"#81d4fa")+
 branch("M220 80 Q240 50 290 40 Q320 34 360 20","#5d4037",4,"#8d6e63")+moss(270,46,14,40,["#558b2f","#7cb342","#33691e"])+moss(318,34,12,30,["#558b2f","#7cb342"])+
 brom(244,79,1,"#2e7d32","#e53935")+brom(372,79,.9,"#388e3c","#ff7043")+brom(300,40,.6,"#43a047","#d81b60")+vine(380,6,40)+vine(226,6,30,"#66bb6a")+
 leaf(196,70,1,-40)+leaf(392,58,.9,-150,"#388e3c")+carpet(110,400,79,["#33691e","#558b2f","#7cb342"],2)+
 S(A.dart(),262,70,1.4,"hop")+S(A.dart("#fdd835","#111","#212121"),298,32,1.2,"hop",-1)+S(A.dart("#1e5bd8","#0b1a3a","#163f9e"),366,70,1.2,"hop",-2,true)+
 soil("#3e2a1c",["#5d4037","#2b1d14","#6d4c33"],"#2b1d14")},
{seed:107,svg:()=>air("#f4e6cf","#e6cfa6","#cdae7c",{spot:[352,60]})+glass()+
 rock(352,79,70,18,["#7d7a76","#a19e99","#5b5955"])+rock(352,62,46,10,["#8a8782","#adaaa5","#666460"])+hide(392,79,26)+bowl(220,79,20)+
 `<g fill="#9e8a5a" stroke="#7a6a44" stroke-width=".5">${Array.from({length:4},()=>{const x=rr(280,320);return `<path d="M${f1(x)} 79 l${f1(rr(-2,2))} -6 l2 0Z"/>`;}).join("")}</g>`+
 F(A.leo,272,70,1.8,"pc",8)+F(A.leo,350,52,1.35,"",8,-4,true,"breathe")+
 soil("#d8b77f",["#c29e62","#e8cfa1","#a88550"],"#b8955a")},
{seed:109,svg:()=>air("#e2f2e6","#b9dfc4","#86c39b",{lamp:"#fff3c4",spot:[300,40],mist:.6})+glass()+
 branch("M200 80 Q230 56 280 52 Q330 48 380 30 Q394 24 400 26","#6d4c33",4.4,"#a1795a")+branch("M290 52 Q300 36 318 26","#6d4c33",2.6,"#a1795a")+branch("M250 54 Q246 40 236 30","#6d4c33",2,"#a1795a")+
 leaf(236,30,1.1,-120)+leaf(318,26,1,-40,"#388e3c")+leaf(330,40,.9,20)+leaf(372,30,1.2,-20,"#43a047")+leaf(262,46,.8,160)+leaf(210,70,1,-100,"#2e7d32")+leaf(390,22,.8,-80)+
 `<path d="M260 4 L260 10" stroke="#90a4ae" stroke-width="1.6"/><rect x="256" y="0" width="8" height="5" rx="1.4" fill="#cfd8dc"/>`+drip(260,12)+
 F(A.cham,300,38,1.7,"pe",8)+rosette(388,79,.9,"#2e7d32","#43a047",7,20)+
 soil("#5d4632",["#7a5c42","#3e2c1e","#8d6e50"],"#3e2c1e")},
{seed:113,svg:()=>air("#efe2cf","#d9c2a0","#b99b72",{spot:[350,58]})+glass()+
 branch("M380 80 Q372 50 340 40 Q300 30 260 34","#7a5638",5,"#a1795a")+hide(232,79,36,"#5d4632","#3e2c1e")+bowl(392,79,26,"#80cbc4")+
 S(A.python,306,64,1,"breathe",0)+vine(300,6,24,"#6d8f3a")+
 `<g fill="#8d6e50">${Array.from({length:12},()=>`<path d="M${f1(rr(200,400))} ${f1(rr(75,79))} l2 -1.2 l1.6 1.2Z"/>`).join("")}</g>`+
 soil("#7a5a3c",["#94704c","#5d4430","#a8845a"],"#5d4430")},
{dark:1,seed:127,svg:()=>air("#5a4637","#3e2f24","#2a1f17",{lamp:"#ffe0b2"})+glass()+
 `<path d="M300 80 Q304 56 330 50 Q360 46 380 56 Q392 64 392 80Z" fill="#6d5644"/><g stroke="#4e3c2e" stroke-width=".8" fill="none">${Array.from({length:6},(_,i)=>`<path d="M${306+i*14} 78 q2 -12 6 -22"/>`).join("")}</g><ellipse cx="346" cy="70" rx="12" ry="8" fill="#1d140d"/>`+
 `<g stroke="#ffffff" stroke-width=".35" opacity=".45" fill="none"><path d="M330 50 Q346 60 360 52 M334 54 Q346 64 356 56 M338 46 L346 66 M354 48 L346 66 M346 66 L320 64"/></g>`+
 rosette(220,79,.6,"#3e6b2a","#4f7f34",5,16)+
 F(A.spider,262,70,1.9,"pd",8)+
 soil("#4e3a2a",["#6d5340","#3a2b1f","#7f644c"],"#2e2218")},
{seed:131,svg:()=>air("#eef5e4","#d5e8c3","#b3d39a",{lamp:"#fffde7"})+glass()+
 branch("M210 80 Q250 54 310 46 Q350 42 398 20","#7a5c3e",3,"#a1795a")+branch("M300 48 Q296 30 284 16","#7a5c3e",2,"#a1795a")+
 [[230,64,-130],[262,52,-40],[284,16,-110],[300,30,20],[330,40,-20],[356,34,-60],[378,26,10],[398,20,-150],[248,58,30]].map(([x,y,a])=>leaf(x,y,1,a,pick(["#689f38","#7cb342","#558b2f"]),"#33691e")).join("")+
 `<g fill="#c0ca33" opacity=".6">${[[268,54],[340,40]].map(([x,y])=>`<path d="M${x} ${y} q3 -2 6 0 q-3 2 -6 0Z"/>`).join("")}</g>`+
 S(A.stick,316,42,1.3,"rock",0)+S(A.mantis,368,20,1.6,"rock slow",-2,true)+
 soil("#8a6e4c",["#a3875f","#6d5438","#bfa57a"],"#6d5438")},
{seed:137,svg:()=>air("#dcefe2","#a9d7b8","#6fb38a",{mist:.8})+glass()+
 `<g><path d="M330 80 L338 20 L352 20 L346 80Z" fill="#8d6e50"/><path d="M338 20 L352 20" stroke="#5d4430" stroke-width="2"/><g stroke="#6d5340" stroke-width=".8">${[30,40,52,64].map(y=>`<path d="M${338} ${y} q4 2 8 0"/>`).join("")}</g></g>`+
 vine(260,6,52)+vine(300,6,40,"#4caf50")+vine(372,6,58,"#66bb6a")+rosette(240,79,1,"#2e7d32","#43a047",7,24)+rosette(376,79,.8,"#388e3c","#2e7d32",6,20)+
 `<g transform="translate(384 48)"><g class="climb"><g transform="rotate(-90) scale(1.4)">${A.crested}</g></g></g>`+F(A.crested,346,20,1.3,"pe",8,-3,true)+
 moss(320,79,16,30,["#558b2f","#7cb342"])+
 soil("#4a3a2c",["#6b5440","#33281e","#7f6650"],"#33281e")},
{seed:139,svg:()=>air("#d5ece0","#9fd0b5","#62a882",{mist:.7})+glass()+
 `<path d="M240 80 L240 40 Q270 30 300 38 L310 80Z" fill="#5d4632"/><path d="M240 40 Q270 30 300 38" stroke="#7a5c42" stroke-width="2" fill="none"/>`+moss(270,36,18,46,["#558b2f","#7cb342","#33691e"])+
 brom(262,34,.7,"#2e7d32","#e53935")+leaf(296,30,.9,-50)+
 waterPart(300,400,52,"#7ec8e3","#3d8ab3")+waterPart(100,240,62,"#7ec8e3","#3d8ab3")+
 `<path d="M300 38 L312 38 L314 52 L302 52Z" fill="#b3e5fc" opacity=".8"/>`+
 school(T.tetra(),330,64,4,.8,"pa",8)+S(A.treefrog,274,26,1.4,"hop")+F(T.tetra("#ff7043","#4fc3f7"),170,70,.8,"pc",8)+
 blades(320,400,10,10,24,["#43a047","#2e7d32"],1.6)+
 soil("#4e3a2a",["#6d5340","#3a2b1f"],"#3a2b1f")},
{seed:149,svg:()=>air("#fbeedd","#f1d9b6","#e0bd8c",{spot:[300,62]})+glass()+
 `<g transform="translate(352 79)"><path d="M-20 0 Q-20 -20 0 -22 Q20 -20 20 0Z" fill="#6d4c33"/><path d="M-12 0 Q-12 -10 0 -11 Q12 -10 12 0Z" fill="#2b1d14"/><g stroke="#4e3423" stroke-width=".7">${Array.from({length:8},(_,i)=>`<path d="M${-18+i*5} -6 l2 -8"/>`).join("")}</g></g>`+
 bowl(232,79,22,"#81d4fa")+bowl(262,79,22,"#b2ebf2")+
 [[296,77],[316,78],[388,78]].map(([x,y])=>`<g transform="translate(${x} ${y}) scale(.8)"><path d="M-6 0 Q-7 -7 0 -8 Q6 -7 6 0Z" fill="${pick(["#e0c3a0","#f5e1c5","#c9a27a"])}" stroke="#a47a50" stroke-width=".5"/><path d="M-3 -1 Q0 -5 3 -1" stroke="#a47a50" stroke-width=".5" fill="none"/></g>`).join("")+
 F(A.hermit(),284,72,1.7,"pc",8)+F(A.hermit("#f5e1c5","#c9a27a","#c62828"),340,73,1.5,"pc",8,-4,true)+
 soil("#f2d9a8",["#dfc08a","#fff2d6","#c9a46c"],"#dcbc84")},
{seed:151,svg:()=>water("#d5ecf3","#9ccde0","#6aa8c4",{ro:.22})+backdrop("plant","#4f8fa6",.3)+
 rock(360,79,46,20,["#8a9298","#aeb5ba","#666e74"])+rosette(250,79,.9,"#3f8a4a","#4f9a58",7,22)+blades(370,400,6,30,60,["#5aa05f","#3f8a4a"],2)+
 `<g transform="translate(210 79)"><path d="M-8 0 Q-8 -8 0 -9 Q8 -8 8 0Z" fill="#8d6e63"/><path d="M-4 0 Q-4 -4 0 -4.4 Q4 -4 4 0Z" fill="#3e2723"/></g>`+
 F(A.axolotl(),290,62,1.5,"pc",8)+F(A.axolotl("#f6d38a","#e6a23c"),362,42,1.25,"pc",8,-4,true)+
 sandBed("#e9e1cf","#d6cbb1",["#d6cbb1","#f6f0e2"])},
{seed:157,svg:()=>air("#e6f2f6","#c8e2ea","#a7d0dd",{uv:1,spot:[332,44]})+glass()+
 waterPart(100,400,46,"#7fb9cc","#3f7f96")+
 `<path d="M290 50 Q292 42 310 40 L372 38 Q384 40 382 48 L298 54Z" fill="#7a5638"/><path d="M296 46 L380 42" stroke="#a1795a" stroke-width="1.4"/><g stroke="#5d3f28" stroke-width=".6">${[310,330,350,368].map(x=>`<path d="M${x} 41 l2 8"/>`).join("")}</g><path d="M300 54 L296 80 M372 46 L378 80" stroke="#7a5638" stroke-width="2.4"/>`+
 rock(250,79,40,16,["#7d8a8f","#a3afb4","#5b666b"])+blades(200,240,8,14,32,["#4f8a3a","#3f7a2e"],1.6)+
 S(A.slider,338,30,1.3,"breathe",0)+F(A.slider,236,62,1.4,"pc",8)+F(A.slider,368,68,1.1,"pb",8,-3,true)+
 gravelBed(["#8a8a80","#6f6f66","#a3a399","#5b5b54"],"#5b5b54")},
{seed:163,svg:()=>air("#f6ead2","#e8d4ad","#d3b98a",{uv:1,spot:[320,64]})+glass()+
 hide(372,79,40,"#7a5638","#5d3f28")+bowl(220,79,22,"#90caf9")+
 `<g stroke="#c9b26a" stroke-width=".7" fill="none">${Array.from({length:40},()=>{const x=rr(180,400);return `<path d="M${f1(x)} 79 q${f1(rr(-6,6))} -${f1(rr(2,5))} ${f1(rr(-10,10))} -${f1(rr(0,2))}"/>`;}).join("")}</g>`+
 [[262,74],[282,76],[244,77]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0 0 l-6 -2 M0 0 l6 -3 M0 0 l-4 -5 M0 0 l3 -6" stroke="#558b2f" stroke-width="1.6" stroke-linecap="round"/><circle cy="-8" r="2.4" fill="#fdd835"/><circle cy="-8" r="1" fill="#f9a825"/></g>`).join("")+
 `<g fill="#9ccc65">${[[300,77],[306,76]].map(([x,y])=>`<path d="M${x} ${y} q4 -6 8 0 q-4 2 -8 0Z"/>`).join("")}</g>`+
 F(A.tortoise,290,66,1.9,"pc",8)+
 soil("#8a6a44",["#a3825a","#6d5234","#b89870"],"#6d5234")},
{seed:167,svg:()=>water("#cfe0c4","#94b08a","#5f7e5a",{rays:"#fff6d6",ro:.2,parts:"#e8f0d8"})+backdrop("plant","#3f5a3a",.35)+
 branch("M260 80 Q280 60 320 56 Q350 54 380 40","#4e3423",4,"#7a5638")+branch("M320 56 Q326 70 330 80","#4e3423",2.6,"#7a5638")+
 `<g>${Array.from({length:14},()=>{const x=rr(150,400),y=rr(76,80),a=rr(-30,30);return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><path d="M-6 0 Q0 -3 6 0 Q0 2.6 -6 0Z" fill="${pick(["#6b3e17","#8a5426","#5a3313"])}"/></g>`;}).join("")}</g>`+
 blades(360,400,6,20,46,["#6b8e23","#556b2f"],1.8)+
 F(A.musk,254,70,1.8,"pc",8)+F(A.musk,352,62,1.5,"pc",8,-4,true)+
 sandBed("#6b5440","#54412f",["#7a6248","#4a3828"],"#4a3828")},
);

  const KEYS = ["iwagumi", "blackwater", "malawi", "tanganyika", "shrimp", "betta", "goldfish", "mangrove", "pond", "sps", "soft_coral", "nano_reef", "seahorse", "jellyfish", "predator", "wreck", "abyss", "arctic", "desert", "rainforest", "leopard_gecko", "chameleon", "ball_python", "tarantula", "insects", "crested_gecko", "paludarium", "hermit_crab", "axolotl", "turtle", "tortoise", "musk_turtle"];
  const cache = new Map();
  return (key) => {
    const i = KEYS.indexOf(key);
    if (i < 0) return null;
    if (!cache.has(key)) {
      CUR = {};
      seed = TH[i].seed || 7;
      gid = 0;
      const art = TH[i].svg();
      cache.set(key, { art, water: CUR.water, opts: CUR.opts || {}, ground: CUR.ground, air: CUR.air, wet: !!CUR.wet, ink: TH[i].dark ? "light" : "dark" });
    }
    return cache.get(key);
  };
})();

// The svg of the scene, and what goes over the decor whatever the scene: the current (the filter running), the
// food and the clouded water.
export const SVG_OPEN = '<svg class="scene" viewBox="0 0 400 80" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">';
export const overlay = (st) =>
  `${st.filter ? `<g class="drift">${[18, 34, 52, 26, 44].map((y, i) => `<circle cx="400" cy="${y}" r=".9" style="animation-delay:${(-i * 1.6).toFixed(1)}s"/>`).join("")}</g>` : ""}
    ${st.feeding ? flakes() : ""}
    ${st.murky ? `<rect class="murk ${st.murky}" x="-400" width="800" height="80"/>` : ""}`;

// A themed tank: the light and the water of the theme, its decor and animals, then the parts that follow the
// equipment (heater, bubbles, CO₂, current, food) and the night.
export const NIGHT_VEIL = { jellyfish: 0.15, abyss: 0 };
export const themedRays = (o, color) =>
  `<g class="rays">${["M120 0 L150 0 L190 80 L135 80Z", "M230 0 L250 0 L290 80 L250 80Z", "M330 0 L345 0 L380 80 L345 80Z"]
    .map((d) => `<path d="${d}" style="fill:${color || o.rc || "#ffffff"};opacity:${o.ro ?? 0.28}"/>`)
    .join("")}</g>`;
export const themedSvg = (st, th) => {
  if (th.air) return airSvg(st, th);
  const o = th.opts;
  const surface = o.surface !== 0;
  const pond = st.scene === "pond";
  const veil = NIGHT_VEIL[st.scene] ?? 0.5;
  return `${SVG_OPEN}
    ${!st.dark && (o.ro ?? 0.28) > 0 ? themedRays(o, st.color) : ""}
    ${surface && (o.caus ?? 0.35) > 0 && !st.dark ? `<g class="caustics"><path style="opacity:${o.caus ?? 0.35}" d="M-400 5 ${"q10 -4 20 0 t20 0 ".repeat(21)}"/></g>` : ""}
    ${surface ? `<rect class="lamp" x="-400" width="800" height="2.5"${st.dark ? "" : ` style="fill:${o.lampC || "#fff3c4"}"`}/>` : ""}
    <g class="decor">${th.art}</g>
    ${st.dark && veil ? `<rect class="veil" x="-400" width="800" height="80" style="opacity:${veil}"/>` : ""}
    ${st.dark && surface ? moon : ""}
    ${st.heat !== null && !pond ? heater(388) : ""}
    ${st.bubbles && !pond ? bubbles(206) : ""}
    ${st.co2 && !pond ? co2Bubbles(186) : ""}
    ${overlay(st)}
  </svg>`;
};
// A terrarium: its lamp bar and UVB tube, the basking spot's cone and glow while the lamp is on, the mist while the
// mister runs (else the theme's own mist in daytime), the night; the water parts of a paludarium or a turtle tank.
export const airSvg = (st, th) => {
  const a = th.air;
  const veil = NIGHT_VEIL[st.scene] ?? 0.5;
  const mist = st.mist ?? (a.mist > 0 && !st.dark);
  return `${SVG_OPEN}
    <rect class="lamp" x="-400" width="800" height="3"${st.dark ? "" : ` style="fill:${th.opts.lampC}"`}/>
    ${st.uvb && !st.dark ? `<g class="uvb">${a.tube}</g>` : ""}
    <g class="decor">${th.art}</g>
    ${st.spot && a.spot ? `<g class="spot">${a.spot}</g>` : ""}
    ${a.fixture ? `<g class="fixture${st.spot ? " on" : ""}">${a.fixture}</g>` : ""}
    ${mist ? a.fog : ""}
    ${st.dark && veil ? `<rect class="veil" x="-400" width="800" height="80" style="opacity:${veil}"/>` : ""}
    ${st.dark ? moon : ""}
    ${th.wet ? overlay(st) : ""}
  </svg>`;
};
// The colours of a themed header: its water (darkened at night) and its substrate strip.
export const GROUND_DEFAULTS = {
  pond: { c: "#8d8a80", dots: ["#a19e94", "#77746b", "#b6b2a7"] },
  jellyfish: { c: "#07091c" },
  abyss: { c: "#05070d" },
};
export const themedStyle = (st, th) => {
  const night = (c) => (st.dark ? `color-mix(in srgb, ${c} 38%, #061026)` : c);
  const [w1, w2, w3] = th.water || ["#8ccdee", "#4ea2da", "#2f7fc0"];
  const g = th.ground || GROUND_DEFAULTS[st.scene] || { c: "#e2c28a" };
  const dots = g.dots?.length ? g.dots : [g.c, g.c];
  return {
    banner: `--aq-w1:${night(w1)};--aq-w2:${night(w2)};--aq-w3:${night(w3)}`,
    ground: `background-color:${night(g.c)};box-shadow:inset 0 1px 0 color-mix(in srgb, ${night(g.c)} 80%, #000);background-image:radial-gradient(circle, ${night(dots[0])} 0 .9px, transparent 1.3px), radial-gradient(circle, ${night(dots[1])} 0 .8px, transparent 1.2px)`,
  };
};

// The scene of a state: { kind, dark, moon, color, filter, bubbles, co2, heat, feeding, waves, still, murky }.
// `key` changes with the parts drawn, so that a part appearing gets fresh nodes (its animation starts at once).
export const sceneSvg = (st) => {
  const th = st.scene && THEME_ART(st.scene);
  if (th) return themedSvg(st, th);
  const reef = st.kind === "reef";
  const rayStyle = st.color ? ` tinted" style="fill:${st.color}` : "";
  return `${SVG_OPEN}
    <defs>${reef ? REEF_FISH : FRESH_FISH}</defs>
    ${st.dark ? "" : rays(rayStyle)}
    ${lamp}
    ${st.dark ? moon : ""}
    ${st.heat !== null ? heater(388) : ""}
    ${reef ? reefScene() : freshScene()}
    ${st.bubbles ? bubbles(reef ? 200 : 206) : ""}
    ${st.co2 ? co2Bubbles(reef ? 186 : 248) : ""}
    ${overlay(st)}
  </svg>`;
};

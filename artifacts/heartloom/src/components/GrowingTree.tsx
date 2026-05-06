import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_FEATURES = [
  { index: 0, title: "Future Letters",  sub: "Write to loved ones for milestones years away",   icon: "✉" },
  { index: 2, title: "Document Vault",  sub: "Wills, trusts, DNRs — organized and accessible",  icon: "🗂" },
  { index: 4, title: "Life Timeline",   sub: "Your story told beautifully, chapter by chapter", icon: "📖" },
];
const RIGHT_FEATURES = [
  { index: 1, title: "Memory Vault",    sub: "Capture stories, photos and audio recordings",    icon: "🏺" },
  { index: 3, title: "Legacy Concierge",sub: "A dedicated guide walks you through everything",  icon: "🤝" },
  { index: 5, title: "Family Sharing",  sub: "Gift your legacy to the people you love most",    icon: "🌿" },
];

/* ─────────────────────────────────────────────────────
   Single organic leaf with veins
───────────────────────────────────────────────────── */
function Leaf({ cx, cy, w, h, rot, fill, vein }: {
  cx: number; cy: number; w: number; h: number; rot: number; fill: string; vein: string;
}) {
  const hw = w * 0.5, hh = h * 0.5;
  const d = [
    `M 0,${-hh}`,
    `C ${hw*.72},${-hh*1.1} ${hw*1.02},${-hh*.18} ${hw*.96},0`,
    `C ${hw*1.02},${hh*.22} ${hw*.68},${hh*1.08} 0,${hh}`,
    `C ${-hw*.68},${hh*1.08} ${-hw*1.02},${hh*.22} ${-hw*.96},0`,
    `C ${-hw*1.02},${-hh*.18} ${-hw*.72},${-hh*1.1} 0,${-hh} Z`,
  ].join(" ");
  return (
    <g className="gs-leaf" transform={`translate(${cx},${cy}) rotate(${rot})`}>
      <path d={d} fill={fill} opacity="0.94" />
      <line x1={-hw*.9} y1={0} x2={hw*.9} y2={0} stroke={vein} strokeWidth="0.8" opacity="0.38" />
      {([-0.54,-0.26,0.04,0.32,0.58] as number[]).map((t, i) => (
        <line key={i} x1={hw*t} y1={0} x2={hw*t+(t<0?-4.5:4.5)} y2={hh*.42}
          stroke={vein} strokeWidth="0.6" opacity="0.26" />
      ))}
    </g>
  );
}

/* ─────────────────────────────────────────────────────
   Leaf cluster — 12 overlapping organic leaves
───────────────────────────────────────────────────── */
const LP = [
  { fill:"#8ab86a", vein:"#507838" }, { fill:"#9dcb7c", vein:"#60883e" },
  { fill:"#b5d896", vein:"#74984e" }, { fill:"#76a254", vein:"#486830" },
  { fill:"#a5c882", vein:"#679248" }, { fill:"#c2dc9e", vein:"#82a85a" },
  { fill:"#6d9448", vein:"#426228" }, { fill:"#97bb70", vein:"#5c8038" },
  { fill:"#b0d08a", vein:"#70983e" }, { fill:"#82ae60", vein:"#507834" },
  { fill:"#ccdfaa", vein:"#8aae58" }, { fill:"#748e50", vein:"#4e6e30" },
];
const CL = [
  { dx:0,   dy:-13, w:28,h:16, dr:0   },{ dx:-12, dy:-8,  w:24,h:14, dr:-42 },
  { dx:12,  dy:-8,  w:24,h:14, dr:42  },{ dx:-8,  dy:5,   w:21,h:12, dr:-68 },
  { dx:8,   dy:5,   w:21,h:12, dr:68  },{ dx:-18, dy:-16, w:18,h:10, dr:-22 },
  { dx:18,  dy:-16, w:18,h:10, dr:22  },{ dx:0,   dy:13,  w:18,h:10, dr:90  },
  { dx:-14, dy:7,   w:17,h:9,  dr:-85 },{ dx:14,  dy:7,   w:17,h:9,  dr:85  },
  { dx:-3,  dy:-22, w:15,h:9,  dr:-8  },{ dx:3,   dy:-22, w:15,h:9,  dr:8   },
];
function LeafCluster({ cx, cy, r=1, br=0, pi=0 }: {
  cx:number; cy:number; r?:number; br?:number; pi?:number;
}) {
  return (
    <>
      {CL.map((l, i) => {
        const pal = LP[(i + pi) % LP.length];
        return (
          <Leaf key={i}
            cx={cx+l.dx*r} cy={cy+l.dy*r}
            w={l.w*r} h={l.h*r}
            rot={br+l.dr} fill={pal.fill} vein={pal.vein} />
        );
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────
   Dense dome canopy — clusters packed in ellipse
───────────────────────────────────────────────────── */
// Each entry: [cx, cy, r, br, pi]  — carefully chosen for a full dome look
const DOME: Array<[number,number,number,number,number]> = [
  // ── Bottom fringe of canopy (y ≈ -35 to -80) ──
  [-125,-42, 0.80, 5, 0],  [-85,-52, 0.82,  -8, 2], [-45,-60, 0.84, 3, 4],
  [ -10,-64, 0.84, -2, 6], [ 30,-62, 0.84,  4, 8],  [ 68,-54, 0.82, -6, 1],
  [ 108,-44, 0.80,  7, 3],

  // ── Lower canopy (y ≈ -80 to -130) ──
  [-158,-88, 0.86,-12, 5], [-118,-102,0.90, 6, 7],  [-78,-112,0.92, -4, 9],
  [ -38,-118,0.94, 2, 2],  [   2,-121,0.94, -1,11], [ 42,-117,0.93,  5, 0],
  [  82,-110,0.92,-5, 3],  [ 122,-100,0.90, 7, 6],  [162,-86, 0.86, 10, 8],

  // ── Mid-lower (y ≈ -120 to -160) ──
  [-172,-132,0.84,-18, 1], [-132,-148,0.90, 8, 4],  [-92,-158,0.94, -6,7],
  [ -52,-164,0.96, 3,10],  [  -8,-167,0.97, -2, 2], [ 36,-165,0.96,  4, 5],
  [  76,-158,0.94,-5,  8], [ 116,-147,0.90,  9, 0],  [156,-130,0.85, 14, 3],

  // ── Mid canopy (y ≈ -160 to -200) ──
  [-175,-168,0.82,-22, 6], [-135,-182,0.88,10, 9],  [-95,-192,0.93, -7, 1],
  [ -55,-198,0.96, 4, 4],  [-12,-201, 0.97, -3, 7], [ 32,-199,0.96,  5, 0],
  [  72,-192,0.93,-6, 3],  [112,-180, 0.88, 11, 6],  [152,-166,0.83, 16,10],

  // ── Upper mid (y ≈ -195 to -235) ──
  [-155,-208,0.80,-15, 2], [-115,-222,0.86, 8, 5],  [-75,-232,0.90, -5, 8],
  [ -35,-238,0.94, 3,11],  [   5,-240,0.95, -2, 1], [ 45,-237,0.93,  6, 4],
  [  85,-228,0.90,-6, 7],  [125,-218, 0.86, 10, 0],  [162,-204,0.80, 14, 3],

  // ── Upper canopy (y ≈ -230 to -265) ──
  [-125,-252,0.78,-10, 5], [-85,-262, 0.84,  6,8],  [-45,-270,0.88, -4,11],
  [ -5,-273,  0.90, -1,2], [ 35,-270, 0.88,  5, 5], [ 75,-261,0.84, -6, 8],
  [ 115,-250, 0.78, 9,1],

  // ── Top crown (y ≈ -260 to -300) ──
  [-75,-284, 0.74, -8, 3], [-38,-294,0.78,  4, 6],  [ 0,-298, 0.80, -2, 9],
  [  38,-293,0.78,  5,0],  [ 75,-282,0.74, -7, 3],

  // ── Very tip ──
  [-30,-310, 0.68, -3,4],  [  5,-314,0.70,  2, 7],  [ 40,-308,0.68,  4, 1],

  // ── Left shoulder fill ──
  [-188,-110,0.78,-25, 4], [-192,-148,0.76,-28, 7], [-185,-185,0.74,-30,10],
  [-170,-220,0.70,-24, 2],

  // ── Right shoulder fill ──
  [ 188,-108,0.78, 25, 4], [ 192,-146,0.76, 28, 7], [ 185,-183,0.74, 30,10],
  [ 170,-218,0.70, 24, 2],

  // ── Interior fill — darker clusters ──
  [-90,-135, 0.88, -3, 4], [-45,-140, 0.90,  5, 7], [  0,-143,0.91, -2,10],
  [  45,-139,0.90,  4, 2], [ 90,-133, 0.88, -4, 5],
  [-60,-173, 0.90,  2, 8], [ -5,-177,0.92, -3, 1],  [ 55,-172,0.90,  3, 6],
];

/* ─────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────── */
export function GrowingTree() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    // only dash-animate stroke paths that carry a class
    svgRef.current.querySelectorAll("path[class]").forEach((p) => {
      try {
        const len = (p as SVGPathElement).getTotalLength();
        (p as SVGPathElement).style.strokeDasharray  = String(len);
        (p as SVGPathElement).style.strokeDashoffset = String(len);
      } catch (_) {}
    });

    const ctx = gsap.context(() => {
      gsap.set(".gs-seed",    { opacity:0, scale:0, transformOrigin:"50% 50%" });
      gsap.set(".gs-leaf",    { opacity:0, scale:0 });
      gsap.set(".gs-label",   { opacity:0, y:14 });
      gsap.set(".gs-heading", { opacity:0, y:24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:"top top", end:"+=4000",
          pin:true, scrub:1.5,
        },
      });

      tl.to(".gs-seed",        { opacity:1, scale:1, duration:0.6, ease:"back.out(2)" });
      tl.to(".gs-root",        { strokeDashoffset:0, stagger:0.10, duration:1.4 }, "-=0.2");
      tl.to(".gs-trunk",       { strokeDashoffset:0, duration:1.0 }, "-=0.5");
      tl.to(".gs-heart",       { strokeDashoffset:0, stagger:0.08, duration:0.9 });
      tl.to(".gs-trunk-upper", { strokeDashoffset:0, duration:0.8 }, "-=0.3");
      tl.to(".gs-bough-wide",  { strokeDashoffset:0, stagger:0.20, duration:1.3 }, "-=0.2");
      tl.to('[data-lbl="0"],[data-lbl="1"]', { opacity:1, y:0, stagger:0.12, duration:0.5 }, "-=0.3");
      tl.to(".gs-bough-upper", { strokeDashoffset:0, stagger:0.18, duration:1.1 }, "-=0.2");
      tl.to(".gs-branch-sub",  { strokeDashoffset:0, stagger:0.07, duration:1.1 }, "-=0.4");
      tl.to('[data-lbl="2"],[data-lbl="3"]', { opacity:1, y:0, stagger:0.12, duration:0.5 }, "-=0.4");
      tl.to(".gs-branch-top",  { strokeDashoffset:0, stagger:0.06, duration:1.0 }, "-=0.3");
      tl.to(".gs-branch-tip",  { strokeDashoffset:0, stagger:0.05, duration:0.8 }, "-=0.3");
      tl.to(".gs-leaf",        { opacity:1, scale:1, stagger:0.008, duration:0.28, ease:"back.out(1.6)" }, "-=0.4");
      tl.to('[data-lbl="4"],[data-lbl="5"]', { opacity:1, y:0, stagger:0.12, duration:0.5 }, "-=0.2");
      tl.to(".gs-heading",     { opacity:1, y:0, duration:0.8 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height:"100dvh", background:"linear-gradient(160deg,#faf9f5 0%,#f0ece0 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage:"radial-gradient(circle,#9CAF8830 1px,transparent 1px)", backgroundSize:"38px 38px" }} />

      <p className="relative z-10 text-xs font-sans font-semibold tracking-[0.22em] uppercase mb-4" style={{ color:"#9CAF88" }}>
        Scroll to grow your legacy
      </p>

      <div className="relative z-10 flex items-center gap-2 w-full max-w-6xl px-4">

        {/* Left labels */}
        <div className="flex-col gap-10 flex-1 items-end pr-4 hidden md:flex">
          {LEFT_FEATURES.map((f) => (
            <div key={f.index} className="gs-label text-right max-w-[190px]" data-lbl={f.index}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color:"#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color:"#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>

        {/* ── SVG Tree ── */}
        <div className="flex-shrink-0" style={{ width:500, height:580 }}>
          <svg ref={svgRef} viewBox="-250 -360 500 580" width="500" height="580"
            fill="none" style={{ overflow:"visible" }}>
            <defs>
              {/* Bark gradients — dark edges, warm cylinder highlight */}
              <linearGradient id="trunkG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#2e1204"/>
                <stop offset="18%"  stopColor="#6a3410"/>
                <stop offset="48%"  stopColor="#b06828"/>
                <stop offset="80%"  stopColor="#6a3410"/>
                <stop offset="100%" stopColor="#220e02"/>
              </linearGradient>
              <linearGradient id="heartG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#5e2c0c"/>
                <stop offset="42%"  stopColor="#b46420"/>
                <stop offset="100%" stopColor="#5e2c0c"/>
              </linearGradient>
              <linearGradient id="boughG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#2e4416"/>
                <stop offset="40%"  stopColor="#6e9048"/>
                <stop offset="100%" stopColor="#283c12"/>
              </linearGradient>
              <linearGradient id="subG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#283c10"/>
                <stop offset="46%"  stopColor="#608040"/>
                <stop offset="100%" stopColor="#243808"/>
              </linearGradient>
              <linearGradient id="tipG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#223208"/>
                <stop offset="50%"  stopColor="#527638"/>
                <stop offset="100%" stopColor="#1e2c06"/>
              </linearGradient>
              <linearGradient id="rootG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#8a4e18"/>
                <stop offset="60%"  stopColor="#5e3010"/>
                <stop offset="100%" stopColor="#3e1e08"/>
              </linearGradient>
              <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#2e1406" stopOpacity="0.30"/>
                <stop offset="100%" stopColor="#2e1406" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="0" cy="185" rx="100" ry="16" fill="url(#groundShadow)"/>

            {/* ── SEED ── */}
            <circle className="gs-seed" cx="0" cy="170" r="9"  fill="#b06018"/>
            <circle className="gs-seed" cx="0" cy="170" r="5"  fill="#e89c38" opacity="0.7"/>
            <circle className="gs-seed" cx="0" cy="169" r="2"  fill="#fff4d0" opacity="0.5"/>

            {/* ── ROOTS ── */}
            <path className="gs-root" d="M 0,170 Q -44,184 -96,176"     stroke="url(#rootG)" strokeWidth="9"   strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M -96,176 Q -136,183 -170,168"  stroke="url(#rootG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M -96,176 Q -106,198 -115,216"  stroke="url(#rootG)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M -170,168 Q -194,164 -210,154" stroke="url(#rootG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M 0,170 Q  44,184  96,176"     stroke="url(#rootG)" strokeWidth="9"   strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M  96,176 Q  136,183  170,168"  stroke="url(#rootG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M  96,176 Q  106,198  115,216"  stroke="url(#rootG)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M  170,168 Q  194,164  210,154" stroke="url(#rootG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-root" d="M 0,170 Q 2,196 4,222"          stroke="url(#rootG)" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
            {/* root texture */}
            <path className="gs-root" d="M -22,174 Q -58,184 -84,180"   stroke="#1e0c04" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.38"/>
            <path className="gs-root" d="M  22,174 Q  58,184  84,180"   stroke="#1e0c04" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.38"/>

            {/* ── MAIN TRUNK — short, thick, reference-like ── */}
            <path className="gs-trunk" d="M 0,170 C -9,132 9,92 0,52"   stroke="url(#trunkG)" strokeWidth="28" strokeLinecap="round" fill="none"/>
            {/* Bark fissure lines */}
            <path className="gs-trunk" d="M -3,155 Q 5,124 -2,90"        stroke="#1a0a02" strokeWidth="2"   strokeLinecap="round" fill="none" opacity="0.48"/>
            <path className="gs-trunk" d="M  6,142 Q -4,114  5,84"       stroke="#1a0a02" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.34"/>
            <path className="gs-trunk" d="M -7,134 Q  3,108 -5,76"       stroke="#3a1e08" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.28"/>
            {/* trunk highlight */}
            <path className="gs-trunk" d="M  3,158 Q  2,120  3,76"       stroke="#c88040" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.16"/>

            {/* ── HEART — brand signature on trunk ── */}
            <path className="gs-heart" d="M 0,52 C -26,44 -35,16 -15,2 C -5,-6 0,-18 0,-18"  stroke="url(#heartG)" strokeWidth="10" strokeLinecap="round" fill="none"/>
            <path className="gs-heart" d="M 0,52 C  26,44  35,16  15,2 C  5,-6 0,-18 0,-18"  stroke="url(#heartG)" strokeWidth="10" strokeLinecap="round" fill="none"/>
            <path className="gs-heart" d="M 0,46 C -15,40 -22,22 -10,11 C -3,5 0,-3 0,-3"    stroke="#e0a040" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.5"/>
            <path className="gs-heart" d="M 0,46 C  15,40  22,22  10,11 C  3,5 0,-3 0,-3"    stroke="#e0a040" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.5"/>

            {/* ── UPPER TRUNK — narrows into canopy ── */}
            <path className="gs-trunk-upper" d="M 0,-18 C -4,-55 4,-88 0,-118" stroke="url(#boughG)" strokeWidth="16" strokeLinecap="round" fill="none"/>
            <path className="gs-trunk-upper" d="M -2,-34 Q 3,-70 -1,-104"      stroke="#1e3208" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.3"/>
            <path className="gs-trunk-upper" d="M  3,-30 Q -2,-66  3,-100"     stroke="#7ab050" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.15"/>

            {/* ── WIDE BOUGHS — left & right primary arms curving upward ── */}
            {/* Left arm: sweeps out then curves up into canopy */}
            <path className="gs-bough-wide" d="M 0,32 C -45,10 -100,-18 -148,-52" stroke="url(#boughG)" strokeWidth="13" strokeLinecap="round" fill="none"/>
            {/* Right arm mirror */}
            <path className="gs-bough-wide" d="M 0,32 C  45,10  100,-18  148,-52" stroke="url(#boughG)" strokeWidth="13" strokeLinecap="round" fill="none"/>
            {/* highlight */}
            <path className="gs-bough-wide" d="M -10,28 C -55,6 -112,-16 -145,-50" stroke="#90c060" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.18"/>
            <path className="gs-bough-wide" d="M  10,28 C  55,6  112,-16  145,-50" stroke="#90c060" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.18"/>

            {/* ── UPPER BOUGHS — arching up into dome ── */}
            <path className="gs-bough-upper" d="M 0,-38 C -38,-72 -76,-118 -108,-168"  stroke="url(#boughG)" strokeWidth="10" strokeLinecap="round" fill="none"/>
            <path className="gs-bough-upper" d="M 0,-38 C  38,-72  76,-118  108,-168"  stroke="url(#boughG)" strokeWidth="10" strokeLinecap="round" fill="none"/>
            <path className="gs-bough-upper" d="M 0,-72 C -2,-110 2,-150 0,-192"       stroke="url(#boughG)" strokeWidth="8"  strokeLinecap="round" fill="none"/>

            {/* ── SUB BRANCHES — from primary boughs upward ── */}
            {/* from left bough */}
            <path className="gs-branch-sub" d="M -148,-52 Q -170,-98 -172,-148"   stroke="url(#subG)" strokeWidth="7"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M -148,-52 Q -156,-26 -160,8"      stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M -108,-28 Q -125,-72 -124,-120"   stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  -68,-10 Q  -80,-54  -78,-100"   stroke="url(#subG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            {/* from right bough (mirrors) */}
            <path className="gs-branch-sub" d="M  148,-52 Q  170,-98  172,-148"   stroke="url(#subG)" strokeWidth="7"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  148,-52 Q  156,-26  160,8"      stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  108,-28 Q  125,-72  124,-120"   stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M   68,-10 Q   80,-54   78,-100"   stroke="url(#subG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            {/* from upper boughs */}
            <path className="gs-branch-sub" d="M -108,-168 Q -148,-185 -185,-195" stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M -108,-168 Q -112,-210 -104,-248" stroke="url(#subG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  -72,-130 Q  -96,-160  -92,-200" stroke="url(#subG)" strokeWidth="5"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  -38,-102 Q  -56,-135  -52,-172" stroke="url(#subG)" strokeWidth="5"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  108,-168 Q  148,-185  185,-195" stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M  108,-168 Q  112,-210  104,-248" stroke="url(#subG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M   72,-130 Q   96,-160   92,-200" stroke="url(#subG)" strokeWidth="5"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-sub" d="M   38,-102 Q   56,-135   52,-172" stroke="url(#subG)" strokeWidth="5"   strokeLinecap="round" fill="none"/>

            {/* ── TOP BRANCHES — filling upper dome ── */}
            <path className="gs-branch-top" d="M 0,-192 C -2,-228 2,-258 0,-290"    stroke="url(#subG)" strokeWidth="6"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-top" d="M 0,-215 Q -52,-240 -95,-255"         stroke="url(#subG)" strokeWidth="5"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-top" d="M 0,-215 Q  52,-240  95,-255"         stroke="url(#subG)" strokeWidth="5"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-top" d="M 0,-250 Q -30,-272 -42,-296"         stroke="url(#subG)" strokeWidth="4"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-top" d="M 0,-250 Q  30,-272  42,-296"         stroke="url(#subG)" strokeWidth="4"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-top" d="M -172,-148 Q -190,-175 -192,-208"    stroke="url(#subG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-top" d="M  172,-148 Q  190,-175  192,-208"    stroke="url(#subG)" strokeWidth="5.5" strokeLinecap="round" fill="none"/>

            {/* ── TIP BRANCHES ── */}
            <path className="gs-branch-tip" d="M -185,-195 Q -200,-220 -196,-250"   stroke="url(#tipG)" strokeWidth="4"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M -185,-195 Q -205,-215 -208,-244"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M -104,-248 Q -115,-270 -108,-298"   stroke="url(#tipG)" strokeWidth="4"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M -104,-248 Q  -88,-266  -82,-294"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  -92,-200 Q -108,-226 -102,-258"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  -52,-172 Q  -66,-200  -60,-232"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  -95,-255 Q -105,-278  -98,-305"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  -95,-255 Q  -76,-272  -70,-300"   stroke="url(#tipG)" strokeWidth="3"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  -42,-296 Q  -50,-314  -44,-336"   stroke="url(#tipG)" strokeWidth="3"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M    0,-290 Q  -12,-312   -6,-338"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M    0,-290 Q   12,-312    6,-338"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M   42,-296 Q   50,-314   44,-336"   stroke="url(#tipG)" strokeWidth="3"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M   95,-255 Q  105,-278   98,-305"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M   95,-255 Q   76,-272   70,-300"   stroke="url(#tipG)" strokeWidth="3"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M   52,-172 Q   66,-200   60,-232"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M   92,-200 Q  108,-226  102,-258"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  104,-248 Q  115,-270  108,-298"   stroke="url(#tipG)" strokeWidth="4"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  104,-248 Q   88,-266   82,-294"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  185,-195 Q  200,-220  196,-250"   stroke="url(#tipG)" strokeWidth="4"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  185,-195 Q  205,-215  208,-244"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  192,-208 Q  206,-232  202,-262"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M -192,-208 Q -206,-232 -202,-262"   stroke="url(#tipG)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M  -160,8   Q -168,26  -164,48"      stroke="url(#tipG)" strokeWidth="3"   strokeLinecap="round" fill="none"/>
            <path className="gs-branch-tip" d="M   160,8   Q  168,26   164,48"      stroke="url(#tipG)" strokeWidth="3"   strokeLinecap="round" fill="none"/>

            {/* ══ DENSE DOME LEAF CANOPY ══ */}
            {DOME.map(([cx, cy, r, br, pi], i) => (
              <LeafCluster key={i} cx={cx} cy={cy} r={r} br={br} pi={pi} />
            ))}
          </svg>
        </div>

        {/* Right labels */}
        <div className="flex-col gap-10 flex-1 items-start pl-4 hidden md:flex">
          {RIGHT_FEATURES.map((f) => (
            <div key={f.index} className="gs-label text-left max-w-[190px]" data-lbl={f.index}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color:"#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color:"#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Headline */}
      <div className="gs-heading relative z-10 text-center mt-6 px-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-serif mb-2" style={{ color:"#2d1a08" }}>
          Your legacy grows with every story you share.
        </h2>
        <p className="text-sm font-sans" style={{ color:"#6b7c5a" }}>
          From a single memory to a full family history — Heartloom grows with you.
        </p>
      </div>
    </div>
  );
}

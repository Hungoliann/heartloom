import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_FEATURES = [
  { index: 0, title: "Future Letters", sub: "Write to loved ones for milestones years away", icon: "✉" },
  { index: 2, title: "Document Vault", sub: "Wills, trusts, DNRs — organized and accessible", icon: "🗂" },
  { index: 4, title: "Life Timeline", sub: "Your story told beautifully, chapter by chapter", icon: "📖" },
];

const RIGHT_FEATURES = [
  { index: 1, title: "Memory Vault", sub: "Capture stories, photos and audio recordings", icon: "🏺" },
  { index: 3, title: "Legacy Concierge", sub: "A dedicated guide walks you through everything", icon: "🤝" },
  { index: 5, title: "Family Sharing", sub: "Gift your legacy to the people you love most", icon: "🌿" },
];

/* ──────────────────────────────────────────────────────────
   Single organic leaf: pointed Bezier shape with midrib vein
────────────────────────────────────────────────────────── */
function Leaf({
  cx, cy, w = 22, h = 13, rot = 0, fill, veinColor,
}: {
  cx: number; cy: number; w?: number; h?: number; rot?: number;
  fill: string; veinColor: string;
}) {
  const hw = w * 0.5;
  const hh = h * 0.5;
  // Organic pointed leaf — asymmetric Bezier curves for a natural feel
  const path = [
    `M 0,${-hh}`,
    `C ${hw * 0.7},${-hh * 1.1} ${hw * 1.0},${-hh * 0.2} ${hw * 0.95},0`,
    `C ${hw * 1.0},${hh * 0.25} ${hw * 0.65},${hh * 1.05} 0,${hh}`,
    `C ${-hw * 0.65},${hh * 1.05} ${-hw * 1.0},${hh * 0.25} ${-hw * 0.95},0`,
    `C ${-hw * 1.0},${-hh * 0.2} ${-hw * 0.7},${-hh * 1.1} 0,${-hh} Z`,
  ].join(" ");

  return (
    <g
      className="gs-leaf"
      transform={`translate(${cx},${cy}) rotate(${rot})`}
    >
      <path d={path} fill={fill} opacity="0.92" />
      {/* Central midrib vein */}
      <line
        x1={-hw * 0.88} y1={0}
        x2={ hw * 0.88} y2={0}
        stroke={veinColor} strokeWidth="0.9" opacity="0.45"
      />
      {/* Lateral veins — slightly curved feel via short lines */}
      {([-0.55, -0.28, 0.05, 0.32, 0.55] as number[]).map((t, i) => (
        <g key={i}>
          <line
            x1={hw * t} y1={0}
            x2={hw * t + (i % 2 === 0 ? 5 : 4)} y2={hh * 0.45}
            stroke={veinColor} strokeWidth="0.65" opacity="0.30"
          />
          <line
            x1={hw * t} y1={0}
            x2={hw * t - (i % 2 === 0 ? 5 : 4)} y2={hh * 0.45}
            stroke={veinColor} strokeWidth="0.65" opacity="0.30"
          />
        </g>
      ))}
    </g>
  );
}

/* ──────────────────────────────────────────────────────────
   Leaf cluster: many overlapping leaves at a branch tip
────────────────────────────────────────────────────────── */
const LEAF_PALETTE = [
  { fill: "#87ac67", vein: "#4e6e2c" },
  { fill: "#9abf7c", vein: "#608644" },
  { fill: "#b0cc94", vein: "#72924e" },
  { fill: "#78985a", vein: "#4a6830" },
  { fill: "#a3c285", vein: "#6a8c48" },
  { fill: "#c0d8a4", vein: "#82a860" },
  { fill: "#6d8e4e", vein: "#466230" },
  { fill: "#95b872", vein: "#5e7e3a" },
];

const CLUSTER_LAYOUT = [
  { dx:  0,   dy: -12, w: 26, h: 15, drot:   0, pi: 0 },
  { dx: -11,  dy:  -7, w: 22, h: 13, drot: -42, pi: 1 },
  { dx:  11,  dy:  -7, w: 22, h: 13, drot:  42, pi: 2 },
  { dx:  -7,  dy:   5, w: 20, h: 12, drot: -68, pi: 3 },
  { dx:   7,  dy:   5, w: 20, h: 12, drot:  68, pi: 4 },
  { dx: -17,  dy: -15, w: 17, h: 10, drot: -22, pi: 5 },
  { dx:  17,  dy: -15, w: 17, h: 10, drot:  22, pi: 6 },
  { dx:   0,  dy:  12, w: 17, h: 10, drot:  90, pi: 7 },
  { dx: -13,  dy:   7, w: 16, h:  9, drot: -85, pi: 0 },
  { dx:  13,  dy:   7, w: 16, h:  9, drot:  85, pi: 1 },
  { dx:  -3,  dy: -20, w: 15, h:  9, drot:  -8, pi: 2 },
  { dx:   3,  dy: -20, w: 15, h:  9, drot:   8, pi: 3 },
];

function LeafCluster({ cx, cy, r = 1, baseRot = 0 }: {
  cx: number; cy: number; r?: number; baseRot?: number;
}) {
  return (
    <>
      {CLUSTER_LAYOUT.map((l, i) => {
        const pal = LEAF_PALETTE[l.pi];
        return (
          <Leaf
            key={i}
            cx={cx + l.dx * r}
            cy={cy + l.dy * r}
            w={l.w * r}
            h={l.h * r}
            rot={baseRot + l.drot}
            fill={pal.fill}
            veinColor={pal.vein}
          />
        );
      })}
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   Main component
────────────────────────────────────────────────────────── */
export function GrowingTree() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const paths = Array.from(svgRef.current.querySelectorAll("path[class]"));
    paths.forEach((p) => {
      try {
        const len = (p as SVGPathElement).getTotalLength();
        (p as SVGPathElement).style.strokeDasharray  = String(len);
        (p as SVGPathElement).style.strokeDashoffset = String(len);
      } catch (_) {}
    });

    const ctx = gsap.context(() => {
      gsap.set(".gs-seed",    { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(".gs-leaf",    { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(".gs-label",   { opacity: 0, y: 14 });
      gsap.set(".gs-heading", { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1.5,
        },
      });

      tl.to(".gs-seed",         { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" });
      tl.to(".gs-root",         { strokeDashoffset: 0, stagger: 0.1,  duration: 1.4 }, "-=0.2");
      tl.to(".gs-trunk",        { strokeDashoffset: 0, duration: 1.0 }, "-=0.5");
      tl.to(".gs-heart",        { strokeDashoffset: 0, stagger: 0.08, duration: 0.9 });
      tl.to(".gs-trunk-upper",  { strokeDashoffset: 0, duration: 0.8 }, "-=0.3");
      tl.to(".gs-bough-wide",   { strokeDashoffset: 0, stagger: 0.2,  duration: 1.3 }, "-=0.2");
      tl.to('[data-lbl="0"],[data-lbl="1"]', { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, "-=0.3");
      tl.to(".gs-bough-upper",  { strokeDashoffset: 0, stagger: 0.18, duration: 1.1 }, "-=0.2");
      tl.to(".gs-branch-sub",   { strokeDashoffset: 0, stagger: 0.07, duration: 1.1 }, "-=0.4");
      tl.to('[data-lbl="2"],[data-lbl="3"]', { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, "-=0.4");
      tl.to(".gs-branch-top",   { strokeDashoffset: 0, stagger: 0.06, duration: 1.0 }, "-=0.3");
      tl.to(".gs-branch-tip",   { strokeDashoffset: 0, stagger: 0.05, duration: 0.8 }, "-=0.3");
      tl.to(".gs-leaf",         { opacity: 1, scale: 1, stagger: 0.010, duration: 0.28, ease: "back.out(1.8)" }, "-=0.4");
      tl.to('[data-lbl="4"],[data-lbl="5"]', { opacity: 1, y: 0, stagger: 0.12, duration: 0.5 }, "-=0.2");
      tl.to(".gs-heading",      { opacity: 1, y: 0, duration: 0.8 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100dvh", background: "linear-gradient(160deg, #faf9f5 0%, #f0ece0 100%)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #9CAF8830 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <p className="relative z-10 text-xs font-sans font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: "#9CAF88" }}>
        Scroll to grow your legacy
      </p>

      {/* Layout row */}
      <div className="relative z-10 flex items-center gap-2 w-full max-w-6xl px-4">

        {/* Left labels */}
        <div className="flex-col gap-10 flex-1 items-end pr-4 hidden md:flex">
          {LEFT_FEATURES.map((f) => (
            <div key={f.index} className="gs-label text-right max-w-[190px]" data-lbl={f.index}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>

        {/* SVG Tree */}
        <div className="flex-shrink-0" style={{ width: 500, height: 560 }}>
          <svg
            ref={svgRef}
            viewBox="-250 -360 500 560"
            width="500"
            height="560"
            fill="none"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* ── Bark: warm cylinder shading (dark edges, highlight centre) ── */}
              <linearGradient id="barkTrunk" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#4a2406" />
                <stop offset="18%"  stopColor="#7a4418" />
                <stop offset="48%"  stopColor="#c47830" />
                <stop offset="80%"  stopColor="#7a4418" />
                <stop offset="100%" stopColor="#3e1c04" />
              </linearGradient>
              <linearGradient id="barkHeart" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#6a3812" />
                <stop offset="42%"  stopColor="#c07228" />
                <stop offset="100%" stopColor="#6a3812" />
              </linearGradient>
              <linearGradient id="barkBough" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#3d5a28" />
                <stop offset="42%"  stopColor="#82a85a" />
                <stop offset="100%" stopColor="#374e22" />
              </linearGradient>
              <linearGradient id="barkSub" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#365020" />
                <stop offset="45%"  stopColor="#70944c" />
                <stop offset="100%" stopColor="#304818" />
              </linearGradient>
              <linearGradient id="barkTip" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#304018" />
                <stop offset="50%"  stopColor="#628440" />
                <stop offset="100%" stopColor="#2e3c16" />
              </linearGradient>
              <linearGradient id="rootGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#9a5a20" />
                <stop offset="60%"  stopColor="#6a3810" />
                <stop offset="100%" stopColor="#4e2a08" />
              </linearGradient>
              {/* Ground ambient shadow */}
              <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#3a1e06" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#3a1e06" stopOpacity="0"   />
              </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="0" cy="182" rx="90" ry="14" fill="url(#groundShadow)" />

            {/* ── SEED ── */}
            <circle className="gs-seed" cx="0" cy="168" r="9"  fill="#c07018" />
            <circle className="gs-seed" cx="0" cy="168" r="5"  fill="#f0a840" opacity="0.75" />
            <circle className="gs-seed" cx="0" cy="167" r="2"  fill="#fff8e0" opacity="0.5" />

            {/* ── ROOTS — gnarled, rounded ── */}
            <path className="gs-root" d="M 0,168 Q -42,182 -92,173"    stroke="url(#rootGrad)" strokeWidth="8"   strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M -92,173 Q -130,180 -164,165" stroke="url(#rootGrad)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M -92,173 Q -102,196 -110,212" stroke="url(#rootGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M -164,165 Q -188,162 -202,152" stroke="url(#rootGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M 0,168 Q 42,182 92,173"     stroke="url(#rootGrad)" strokeWidth="8"   strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M 92,173 Q 130,180 164,165"   stroke="url(#rootGrad)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M 92,173 Q 102,196 110,212"   stroke="url(#rootGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M 164,165 Q 188,162 202,152"  stroke="url(#rootGrad)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-root" d="M 0,168 Q 2,194 3,218"        stroke="url(#rootGrad)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Root shadow edges */}
            <path className="gs-root" d="M -20,172 Q -54,182 -80,178"  stroke="#2e1204" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />
            <path className="gs-root" d="M  20,172 Q  54,182  80,178"  stroke="#2e1204" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.4" />

            {/* ── MAIN TRUNK — thick cylindrical bark ── */}
            <path className="gs-trunk" d="M 0,168 C -7,128 7,88 0,48"  stroke="url(#barkTrunk)" strokeWidth="20" strokeLinecap="round" fill="none" />
            {/* Bark crack / fissure lines */}
            <path className="gs-trunk" d="M -2,152 Q 4,122 -1,88"      stroke="#3a1c06" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.45" />
            <path className="gs-trunk" d="M  5,140 Q -3,113  4,82"      stroke="#3a1c06" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.32" />
            <path className="gs-trunk" d="M -6,132 Q  2,110 -4,76"      stroke="#5a2e0e" strokeWidth="1.0" strokeLinecap="round" fill="none" opacity="0.28" />
            {/* Trunk highlight */}
            <path className="gs-trunk" d="M  2,155 Q  1,118  2,72"      stroke="#d8904c" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.18" />

            {/* ── HEART — amber, glowing inner line ── */}
            <path className="gs-heart" d="M 0,50 C -25,42 -33,15 -14,2 C -4,-6 0,-17 0,-17"  stroke="url(#barkHeart)" strokeWidth="9"   strokeLinecap="round" fill="none" />
            <path className="gs-heart" d="M 0,50 C  25,42  33,15  14,2 C  4,-6 0,-17 0,-17"  stroke="url(#barkHeart)" strokeWidth="9"   strokeLinecap="round" fill="none" />
            {/* Inner glow highlight */}
            <path className="gs-heart" d="M 0,44 C -14,38 -19,20 -9,10 C -3,4 0,-4 0,-4"    stroke="#f0b060" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.52" />
            <path className="gs-heart" d="M 0,44 C  14,38  19,20  9,10 C  3,4 0,-4 0,-4"    stroke="#f0b060" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.52" />

            {/* ── UPPER TRUNK — sage transition ── */}
            <path className="gs-trunk-upper" d="M 0,-17 C -4,-52 4,-82 0,-110"  stroke="url(#barkBough)" strokeWidth="13" strokeLinecap="round" fill="none" />
            <path className="gs-trunk-upper" d="M -1,-32 Q 3,-65 -1,-97"        stroke="#2e4a18" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.28" />
            <path className="gs-trunk-upper" d="M  2,-28 Q -1,-60  2,-92"       stroke="#8ab860" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.18" />

            {/* ── WIDE MAIN BOUGHS ── */}
            <path className="gs-bough-wide" d="M 0,26 C -62,8 -130,-8 -202,-16"  stroke="url(#barkBough)" strokeWidth="11" strokeLinecap="round" fill="none" />
            <path className="gs-bough-wide" d="M 0,26 C  62,8  130,-8  202,-16"  stroke="url(#barkBough)" strokeWidth="11" strokeLinecap="round" fill="none" />
            {/* Highlight ridge */}
            <path className="gs-bough-wide" d="M -10,22 C -72,6 -142,-6 -199,-14"  stroke="#98c460" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.2" />
            <path className="gs-bough-wide" d="M  10,22 C  72,6  142,-6  199,-14"  stroke="#98c460" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.2" />

            {/* ── UPPER BOUGHS ── */}
            <path className="gs-bough-upper" d="M 0,-34 C -46,-58 -92,-74 -132,-90"  stroke="url(#barkBough)" strokeWidth="8.5" strokeLinecap="round" fill="none" />
            <path className="gs-bough-upper" d="M 0,-34 C  46,-58  92,-74  132,-90"  stroke="url(#barkBough)" strokeWidth="8.5" strokeLinecap="round" fill="none" />

            {/* ── SUB BRANCHES ── */}
            <path className="gs-branch-sub" d="M -202,-16 Q -220,-48 -224,-82"    stroke="url(#barkSub)" strokeWidth="6"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M -202,-16 Q -224,5  -234,26"      stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M -157,-9  Q -172,-44 -177,-78"    stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M -112,3   Q -124,-30 -130,-62"    stroke="url(#barkSub)" strokeWidth="5"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  -72,11  Q  -82,-20  -88,-50"    stroke="url(#barkSub)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  202,-16 Q  220,-48  224,-82"    stroke="url(#barkSub)" strokeWidth="6"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  202,-16 Q  224,5   234,26"      stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  157,-9  Q  172,-44  177,-78"    stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  112,3   Q  124,-30  130,-62"    stroke="url(#barkSub)" strokeWidth="5"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M   72,11  Q   82,-20   88,-50"    stroke="url(#barkSub)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M -132,-90 Q -167,-104 -198,-114"  stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M -132,-90 Q -130,-122 -124,-154"  stroke="url(#barkSub)" strokeWidth="5"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  -90,-72 Q -100,-106  -98,-140"  stroke="url(#barkSub)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  -54,-54 Q  -62,-86   -60,-118"  stroke="url(#barkSub)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  132,-90 Q  167,-104  198,-114"  stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M  132,-90 Q  130,-122  124,-154"  stroke="url(#barkSub)" strokeWidth="5"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M   90,-72 Q  100,-106   98,-140"  stroke="url(#barkSub)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-sub" d="M   54,-54 Q   62,-86    60,-118"  stroke="url(#barkSub)" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            {/* ── TOP BRANCHES ── */}
            <path className="gs-branch-top" d="M 0,-110 C -2,-142 2,-167 0,-198"   stroke="url(#barkSub)" strokeWidth="7"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-top" d="M 0,-132 Q -49,-157 -90,-170"       stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-top" d="M 0,-132 Q  49,-157  90,-170"       stroke="url(#barkSub)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-top" d="M 0,-160 Q -29,-180 -39,-204"       stroke="url(#barkSub)" strokeWidth="4"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-top" d="M 0,-160 Q  29,-180  39,-204"       stroke="url(#barkSub)" strokeWidth="4"   strokeLinecap="round" fill="none" />

            {/* ── TIP BRANCHES ── */}
            <path className="gs-branch-tip" d="M -224,-82 Q -234,-110 -230,-138"   stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -224,-82 Q -240,-96  -246,-118"   stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -198,-114 Q -212,-142 -208,-172"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -198,-114 Q -220,-132 -230,-160"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -177,-78  Q -186,-110 -182,-144"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -124,-154 Q -134,-178 -127,-206"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -124,-154 Q -106,-172 -100,-200"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  -98,-140 Q -104,-166  -97,-194"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  -60,-118 Q  -67,-146  -60,-174"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  -90,-170 Q  -98,-192  -90,-216"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  -90,-170 Q  -74,-188  -67,-212"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  224,-82 Q  234,-110  230,-138"   stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  224,-82 Q  240,-96   246,-118"   stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  198,-114 Q  212,-142  208,-172"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  198,-114 Q  220,-132  230,-160"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  177,-78  Q  186,-110  182,-144"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  124,-154 Q  134,-178  127,-206"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  124,-154 Q  106,-172  100,-200"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M   98,-140 Q  104,-166   97,-194"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M   60,-118 Q   67,-146   60,-174"  stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M   90,-170 Q   98,-192   90,-216"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M   90,-170 Q   74,-188   67,-212"  stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M 0,-198 Q -13,-218  -9,-242"       stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M 0,-198 Q  13,-218   9,-242"       stroke="url(#barkTip)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M 0,-198 Q  -2,-222   0,-250"       stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -39,-204 Q -47,-224 -41,-250"     stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  39,-204 Q  47,-224  41,-250"     stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M -234,26 Q -242,40 -237,58"        stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />
            <path className="gs-branch-tip" d="M  234,26 Q  242,40  237,58"        stroke="url(#barkTip)" strokeWidth="3"   strokeLinecap="round" fill="none" />

            {/* ══ REALISTIC ORGANIC LEAF CLUSTERS ══ */}
            {/* Wide outer left */}
            <LeafCluster cx={-230} cy={-138} r={0.84} baseRot={-20} />
            <LeafCluster cx={-246} cy={-118} r={0.74} baseRot={-35} />
            <LeafCluster cx={-208} cy={-172} r={0.84} baseRot={-15} />
            <LeafCluster cx={-230} cy={-160} r={0.74} baseRot={-28} />
            <LeafCluster cx={-182} cy={-144} r={0.80} baseRot={-22} />
            <LeafCluster cx={-237} cy={58}   r={0.70} baseRot={15}  />
            <LeafCluster cx={-234} cy={26}   r={0.65} baseRot={10}  />

            {/* Upper left */}
            <LeafCluster cx={-127} cy={-206} r={0.82} baseRot={-10} />
            <LeafCluster cx={-100} cy={-200} r={0.74} baseRot={5}   />
            <LeafCluster cx={-97}  cy={-194} r={0.77} baseRot={-8}  />
            <LeafCluster cx={-60}  cy={-174} r={0.77} baseRot={2}   />
            <LeafCluster cx={-90}  cy={-216} r={0.70} baseRot={-12} />
            <LeafCluster cx={-67}  cy={-212} r={0.70} baseRot={8}   />

            {/* Centre canopy */}
            <LeafCluster cx={-9}   cy={-242} r={0.88} baseRot={0}   />
            <LeafCluster cx={9}    cy={-242} r={0.88} baseRot={5}   />
            <LeafCluster cx={0}    cy={-250} r={0.80} baseRot={-3}  />
            <LeafCluster cx={-41}  cy={-250} r={0.77} baseRot={-8}  />
            <LeafCluster cx={41}   cy={-250} r={0.77} baseRot={8}   />
            <LeafCluster cx={-90}  cy={-170} r={0.82} baseRot={-5}  />
            <LeafCluster cx={90}   cy={-170} r={0.82} baseRot={5}   />
            <LeafCluster cx={-39}  cy={-204} r={0.74} baseRot={-5}  />
            <LeafCluster cx={39}   cy={-204} r={0.74} baseRot={5}   />

            {/* Wide outer right */}
            <LeafCluster cx={230}  cy={-138} r={0.84} baseRot={20}  />
            <LeafCluster cx={246}  cy={-118} r={0.74} baseRot={35}  />
            <LeafCluster cx={208}  cy={-172} r={0.84} baseRot={15}  />
            <LeafCluster cx={230}  cy={-160} r={0.74} baseRot={28}  />
            <LeafCluster cx={182}  cy={-144} r={0.80} baseRot={22}  />
            <LeafCluster cx={237}  cy={58}   r={0.70} baseRot={-15} />
            <LeafCluster cx={234}  cy={26}   r={0.65} baseRot={-10} />

            {/* Upper right */}
            <LeafCluster cx={127}  cy={-206} r={0.82} baseRot={10}  />
            <LeafCluster cx={100}  cy={-200} r={0.74} baseRot={-5}  />
            <LeafCluster cx={97}   cy={-194} r={0.77} baseRot={8}   />
            <LeafCluster cx={60}   cy={-174} r={0.77} baseRot={-2}  />
            <LeafCluster cx={90}   cy={-216} r={0.70} baseRot={12}  />
            <LeafCluster cx={67}   cy={-212} r={0.70} baseRot={-8}  />

            {/* Mid-branch accents */}
            <LeafCluster cx={-130} cy={-62}  r={0.64} baseRot={-15} />
            <LeafCluster cx={-88}  cy={-50}  r={0.60} baseRot={-5}  />
            <LeafCluster cx={130}  cy={-62}  r={0.64} baseRot={15}  />
            <LeafCluster cx={88}   cy={-50}  r={0.60} baseRot={5}   />
          </svg>
        </div>

        {/* Right labels */}
        <div className="flex-col gap-10 flex-1 items-start pl-4 hidden md:flex">
          {RIGHT_FEATURES.map((f) => (
            <div key={f.index} className="gs-label text-left max-w-[190px]" data-lbl={f.index}>
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Headline */}
      <div className="gs-heading relative z-10 text-center mt-6 px-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-serif mb-2" style={{ color: "#2d1a08" }}>
          Your legacy grows with every story you share.
        </h2>
        <p className="text-sm font-sans" style={{ color: "#6b7c5a" }}>
          From a single memory to a full family history — Heartloom grows with you.
        </p>
      </div>
    </div>
  );
}

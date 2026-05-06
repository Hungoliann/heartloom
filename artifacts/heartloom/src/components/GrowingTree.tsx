import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LEFT_FEATURES = [
  { index: 0, title: "Future Letters",   sub: "Write to loved ones for milestones years away",   icon: "✉" },
  { index: 2, title: "Document Vault",   sub: "Wills, trusts, DNRs — organized and accessible",  icon: "🗂" },
  { index: 4, title: "Life Timeline",    sub: "Your story told beautifully, chapter by chapter", icon: "📖" },
];
const RIGHT_FEATURES = [
  { index: 1, title: "Memory Vault",     sub: "Capture stories, photos and audio recordings",    icon: "🏺" },
  { index: 3, title: "Legacy Concierge", sub: "A dedicated guide walks you through everything",  icon: "🤝" },
  { index: 5, title: "Family Sharing",   sub: "Gift your legacy to the people you love most",    icon: "🌿" },
];

// ─── Canvas utilities ────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function mapP(v: number, a: number, b: number) { return clamp((v - a) / (b - a), 0, 1); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function qb(t: number, p0: number, p1: number, p2: number) {
  return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2;
}
function cb(t: number, p0: number, p1: number, p2: number, p3: number) {
  return (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3;
}

type Ctx = CanvasRenderingContext2D;
type Col = string | CanvasGradient;

/** Horizontal bark gradient — cylindrical shading */
function barkGrad(ctx: Ctx, x: number, r: number): CanvasGradient {
  const g = ctx.createLinearGradient(x - r, 0, x + r, 0);
  g.addColorStop(0,    "#0c0402");
  g.addColorStop(0.10, "#3c1808");
  g.addColorStop(0.32, "#7a3c14");
  g.addColorStop(0.50, "#b05a22");
  g.addColorStop(0.68, "#7a3c14");
  g.addColorStop(0.90, "#381608");
  g.addColorStop(1,    "#0c0402");
  return g;
}

/** Branch (sage-green) gradient */
function branchGrad(ctx: Ctx, x: number, r: number): CanvasGradient {
  const g = ctx.createLinearGradient(x - r, 0, x + r, 0);
  g.addColorStop(0,    "#1a2808");
  g.addColorStop(0.30, "#4a6c22");
  g.addColorStop(0.55, "#6a9030");
  g.addColorStop(0.80, "#4a6c22");
  g.addColorStop(1,    "#182408");
  return g;
}

/** Root gradient — warm brown, lit from above */
function rootGrad(ctx: Ctx, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0,    "#6a3814");
  g.addColorStop(0.45, "#3e1c08");
  g.addColorStop(1,    "#1c0c04");
  return g;
}

/**
 * Draw a TAPERED cubic bezier stroke.
 * Width transitions smoothly from w0 (at start) to w1 (at end).
 * Only draws the first `progress` fraction of the path.
 */
function cubicTaper(
  ctx: Ctx,
  x0: number, y0: number, cx1: number, cy1: number,
  cx2: number, cy2: number, x3: number, y3: number,
  progress: number, w0: number, w1: number, col: Col
) {
  if (progress <= 0) return;
  const steps = 48;
  const N = Math.ceil(progress * steps);
  let px = x0, py = y0;
  ctx.lineCap = "round";
  for (let i = 1; i <= N; i++) {
    const t = i / steps;
    const bx = cb(t, x0, cx1, cx2, x3);
    const by = cb(t, y0, cy1, cy2, y3);
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.lineWidth = lerp(w0, w1, t);
    ctx.moveTo(px, py);
    ctx.lineTo(bx, by);
    ctx.stroke();
    px = bx; py = by;
  }
}

/**
 * Draw a TAPERED quadratic bezier stroke.
 */
function quadTaper(
  ctx: Ctx,
  x0: number, y0: number, qx: number, qy: number, x2: number, y2: number,
  progress: number, w0: number, w1: number, col: Col
) {
  if (progress <= 0) return;
  const steps = 36;
  const N = Math.ceil(progress * steps);
  let px = x0, py = y0;
  ctx.lineCap = "round";
  for (let i = 1; i <= N; i++) {
    const t = i / steps;
    const bx = qb(t, x0, qx, x2);
    const by = qb(t, y0, qy, y2);
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.lineWidth = lerp(w0, w1, t);
    ctx.moveTo(px, py);
    ctx.lineTo(bx, by);
    ctx.stroke();
    px = bx; py = by;
  }
}

// ─── Leaf rendering ───────────────────────────────────────────────────────────

const LEAF_PAL = [
  { f: "#5ea83a", v: "#347020" }, { f: "#76bc4e", v: "#488828" },
  { f: "#8ccc64", v: "#5a9838" }, { f: "#52983a", v: "#2e6820" },
  { f: "#68b046", v: "#3c7a28" }, { f: "#a0d472", v: "#68a040" },
  { f: "#4a8e32", v: "#286018" }, { f: "#80c258", v: "#4e8e30" },
];
const CLUSTER_OFFSETS = [
  [0,-13,27,16,0],[-12,-8,23,14,-42],[12,-8,23,14,42],
  [-8,6,20,12,-68],[8,6,20,12,68],[-17,-16,18,11,-22],
  [17,-16,18,11,22],[0,13,18,11,90],[-14,8,16,10,-85],
  [14,8,16,10,85],[-3,-22,15,9,-8],[3,-22,15,9,8],
];

function drawLeaf(ctx: Ctx, cx: number, cy: number, w: number, h: number, rot: number, f: string, v: string, a: number) {
  if (a <= 0) return;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot * Math.PI / 180);
  ctx.globalAlpha = a;
  const hw = w / 2, hh = h / 2;
  ctx.beginPath();
  ctx.moveTo(0, -hh);
  ctx.bezierCurveTo(hw * .72, -hh * 1.1, hw * 1.02, -hh * .18, hw * .96, 0);
  ctx.bezierCurveTo(hw * 1.02, hh * .22, hw * .68, hh * 1.08, 0, hh);
  ctx.bezierCurveTo(-hw * .68, hh * 1.08, -hw * 1.02, hh * .22, -hw * .96, 0);
  ctx.bezierCurveTo(-hw * 1.02, -hh * .18, -hw * .72, -hh * 1.1, 0, -hh);
  ctx.fillStyle = f;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-hw * .88, 0); ctx.lineTo(hw * .88, 0);
  ctx.strokeStyle = v; ctx.lineWidth = 0.8;
  ctx.globalAlpha = a * 0.35;
  ctx.stroke();
  ctx.restore();
}

function drawCluster(ctx: Ctx, cx: number, cy: number, r: number, br: number, pi: number, a: number) {
  if (a <= 0) return;
  CLUSTER_OFFSETS.forEach(([dx, dy, lw, lh, dr], i) => {
    const pal = LEAF_PAL[(i + pi) % LEAF_PAL.length];
    drawLeaf(ctx, cx + dx * r, cy + dy * r, lw * r, lh * r, br + dr, pal.f, pal.v, a * 0.93);
  });
}

// ─── Tree drawing ─────────────────────────────────────────────────────────────

// Canvas coords: 500×580, CX=250, ground at y=508
// SVG → canvas: x+250, y+340
const CX = 250;

// DOME clusters: [canvas_cx, canvas_cy, r, baseRot, paletteOffset]
// Converted from SVG: cx+250, cy+340
const DOME: [number, number, number, number, number][] = [
  [125,298,0.80, 5, 0],[165,288,0.82,-8, 2],[205,280,0.84, 3, 4],
  [240,276,0.84,-2, 6],[280,278,0.84, 4, 8],[318,286,0.82,-6, 1],
  [358,296,0.80, 7, 3],
  [92,252,0.86,-12,5],[132,238,0.90, 6, 7],[172,228,0.92,-4, 9],
  [212,222,0.94, 2, 2],[250,219,0.94,-1,11],[288,223,0.93, 5, 0],
  [328,230,0.92,-5, 3],[368,240,0.90, 7, 6],[408,254,0.86,10, 8],
  [75,212,0.84,-18,1],[118,192,0.90, 8, 4],[158,182,0.94,-6, 7],
  [198,176,0.96, 3,10],[238,173,0.97,-2, 2],[278,175,0.96, 4, 5],
  [318,178,0.94,-5, 8],[358,193,0.90, 9, 0],[402,210,0.85,14, 3],
  [75,172,0.82,-22,6],[115,158,0.88,10, 9],[155,148,0.93,-7, 1],
  [195,142,0.96, 4, 4],[238,139,0.97,-3, 7],[278,141,0.96, 5, 0],
  [318,148,0.93,-6, 3],[358,160,0.88,11, 6],[402,174,0.83,16,10],
  [95,132,0.80,-15,2],[135,118,0.86, 8, 5],[175,108,0.90,-5, 8],
  [215,102,0.94, 3,11],[250,100,0.95,-2, 1],[290,103,0.93, 6, 4],
  [330,110,0.90,-6, 7],[370,120,0.86,10, 0],[408,136,0.80,14, 3],
  [125,88,0.78,-10,5],[165,78,0.84, 6, 8],[205,70,0.88,-4,11],
  [245,67,0.90,-1, 2],[285,70,0.88, 5, 5],[325,80,0.84,-6, 8],
  [365,92,0.78, 9, 1],
  [175,56,0.74,-8, 3],[212,46,0.78, 4, 6],[250,42,0.80,-2, 9],
  [288,47,0.78, 5, 0],[325,58,0.74,-7, 3],
  [220,30,0.68,-3, 4],[250,26,0.70, 2, 7],[280,32,0.68, 4, 1],
  [62,230,0.78,-25,4],[58,192,0.76,-28,7],[65,155,0.74,-30,10],
  [80,120,0.70,-24,2],
  [438,228,0.78,25, 4],[442,190,0.76,28, 7],[435,153,0.74,30,10],
  [420,118,0.70,24, 2],
  [160,205,0.88,-3, 4],[205,200,0.90, 5, 7],[250,197,0.91,-2,10],
  [295,201,0.90, 4, 2],[340,207,0.88,-4, 5],
  [190,167,0.90, 2, 8],[250,163,0.92,-3, 1],[310,168,0.90, 3, 6],
];

function drawTree(ctx: Ctx, progress: number) {
  // Phase computations
  const pSeed     = mapP(progress, 0.00, 0.06);
  const pRoots    = mapP(progress, 0.05, 0.22);
  const pTrunk    = mapP(progress, 0.19, 0.36);
  const pHeart    = mapP(progress, 0.33, 0.42);
  const pUpper    = mapP(progress, 0.38, 0.50);
  const pBW       = mapP(progress, 0.46, 0.62); // bough wide
  const pBU       = mapP(progress, 0.55, 0.68); // bough upper
  const pBS       = mapP(progress, 0.62, 0.76); // branch sub
  const pBT       = mapP(progress, 0.72, 0.84); // branch top
  const pBTip     = mapP(progress, 0.80, 0.90); // branch tip
  const pLeaves   = mapP(progress, 0.86, 1.00);

  // Ground shadow
  const gs = ctx.createRadialGradient(CX, 518, 5, CX, 516, 118);
  gs.addColorStop(0, "rgba(24,10,2,0.38)");
  gs.addColorStop(0.55, "rgba(24,10,2,0.14)");
  gs.addColorStop(1, "rgba(24,10,2,0)");
  ctx.fillStyle = gs;
  ctx.beginPath(); ctx.ellipse(CX, 518, 118, 18, 0, 0, Math.PI * 2); ctx.fill();

  // ── Seed ──
  if (pSeed > 0) {
    const sr = pSeed * 9;
    const sg = ctx.createRadialGradient(CX, 506, 0, CX, 506, sr * 1.1);
    sg.addColorStop(0, "#f0b848"); sg.addColorStop(0.5, "#b86020"); sg.addColorStop(1, "#7a3e10");
    ctx.beginPath(); ctx.arc(CX, 506, sr, 0, Math.PI * 2);
    ctx.fillStyle = sg; ctx.fill();
  }

  // ── Roots ──
  if (pRoots > 0) {
    const rg = rootGrad(ctx, CX, 490, CX - 180, 510);
    const rg2 = rootGrad(ctx, CX, 490, CX + 180, 510);

    // Left main root — thick S-curve
    const lp1 = mapP(pRoots, 0, 0.35);
    const lp2 = mapP(pRoots, 0.20, 0.65);
    const lp3 = mapP(pRoots, 0.42, 0.80);
    const lp4 = mapP(pRoots, 0.60, 1.00);
    const lpf1 = mapP(pRoots, 0.30, 0.85);
    const lpf2 = mapP(pRoots, 0.55, 1.00);

    // Segment 1: trunk base → mid-left
    cubicTaper(ctx, 244,505, 218,512, 195,516, 170,514, lp1, 16, 10, rg);
    // Segment 2: mid-left → far left
    cubicTaper(ctx, 170,514, 142,510, 115,504, 88,498,  lp2, 10, 6,  rg);
    // Segment 3: far → tip
    quadTaper( ctx, 88,498, 62,492, 38,488,                lp3, 6,  3,  rg);
    // Fork 1 — droops down from mid-root
    cubicTaper(ctx, 170,514, 168,524, 164,538, 158,550,  lpf1, 7, 3.5, rootGrad(ctx,170,514,158,550));
    // Fork 2 — from inner root
    quadTaper( ctx, 88,498, 82,514, 76,530,               lpf2, 5, 2.5, rootGrad(ctx,88,498,76,530));
    // Shadow underline for depth
    if (lp1 > 0) {
      ctx.globalAlpha = 0.30;
      quadTaper(ctx, 246,510, 192,522, 142,518,           lp1, 5, 2.5, "#0c0402");
      ctx.globalAlpha = 1;
    }

    // Right (mirrored)
    const r = (x: number) => CX + (CX - x); // mirror x
    cubicTaper(ctx, r(244),505, r(218),512, r(195),516, r(170),514, lp1, 16,10, rg2);
    cubicTaper(ctx, r(170),514, r(142),510, r(115),504, r(88),498,  lp2, 10, 6,  rg2);
    quadTaper( ctx, r(88),498, r(62),492, r(38),488,                 lp3, 6,  3,  rg2);
    cubicTaper(ctx, r(170),514, r(168),524, r(164),538, r(158),550, lpf1, 7, 3.5, rootGrad(ctx,r(170),514,r(158),550));
    quadTaper( ctx, r(88),498, r(82),514, r(76),530,                lpf2, 5, 2.5, rootGrad(ctx,r(88),498,r(76),530));
    if (lp1 > 0) {
      ctx.globalAlpha = 0.30;
      quadTaper(ctx, r(246),510, r(192),522, r(142),518, lp1, 5, 2.5, "#0c0402");
      ctx.globalAlpha = 1;
    }

    // Centre forward root
    cubicTaper(ctx, 252,506, 254,520, 258,538, 262,552, lp2, 8, 3.5, rootGrad(ctx,252,506,262,552));
  }

  // ── Trunk — rich tapered bark ──
  if (pTrunk > 0) {
    const bg = barkGrad(ctx, CX, 24);

    // Wide base flare (extra thick at ground)
    cubicTaper(ctx, CX,504, CX-10,474, CX+10,448, CX,410, pTrunk, 48, 28, bg);
    // Upper trunk body continuing upward
    cubicTaper(ctx, CX,414, CX-8, 395, CX+8, 378, CX,388, pTrunk, 28, 22, bg);

    // Bark fissure 1 — primary vertical crack
    if (pTrunk > 0.25) {
      const fp = mapP(pTrunk, 0.25, 1.0);
      ctx.globalAlpha = 0.42;
      cubicTaper(ctx, CX-2,498, CX+6,468, CX-4,438, CX+2,408, fp, 1.8, 1.2, "#080402");
      ctx.globalAlpha = 0.28;
      cubicTaper(ctx, CX+7,486, CX-5,456, CX+5,426, CX-2,400, fp, 1.4, 0.9, "#080402");
      ctx.globalAlpha = 0.22;
      cubicTaper(ctx, CX-8,474, CX+3,448, CX-4,420, CX+1,396, fp, 1.2, 0.8, "#180a04");
      ctx.globalAlpha = 1;
    }

    // Warm highlight ridge — centre of cylinder, gives 3D pop
    if (pTrunk > 0.35) {
      const hp = mapP(pTrunk, 0.35, 1.0);
      ctx.globalAlpha = 0.13;
      cubicTaper(ctx, CX+2,496, CX+2,462, CX+2,432, CX+2,400, hp, 3.5, 2, "#d09050");
      ctx.globalAlpha = 1;
    }
  }

  // ── Heart — amber brand signature ──
  if (pHeart > 0) {
    const hg = ctx.createLinearGradient(CX - 22, 390, CX + 22, 390);
    hg.addColorStop(0, "#5e2c0c"); hg.addColorStop(0.45, "#c07028"); hg.addColorStop(1, "#5e2c0c");

    // Left lobe of heart
    cubicTaper(ctx, CX,388, CX-26,376, CX-32,354, CX-14,343,  pHeart, 10, 8, hg);
    cubicTaper(ctx, CX-14,343, CX-4,336, CX,325, CX,325,       pHeart, 8,  6, hg);
    // Right lobe
    cubicTaper(ctx, CX,388, CX+26,376, CX+32,354, CX+14,343,  pHeart, 10, 8, hg);
    cubicTaper(ctx, CX+14,343, CX+4,336, CX,325, CX,325,       pHeart, 8,  6, hg);
    // Inner highlight
    if (pHeart > 0.5) {
      const ha = mapP(pHeart, 0.5, 1.0) * 0.5;
      ctx.globalAlpha = ha;
      cubicTaper(ctx, CX,384, CX-14,376, CX-18,362, CX-6,353, pHeart, 2.5, 2, "#f0b060");
      cubicTaper(ctx, CX,384, CX+14,376, CX+18,362, CX+6,353, pHeart, 2.5, 2, "#f0b060");
      ctx.globalAlpha = 1;
    }
  }

  // ── Upper trunk — sage transition ──
  if (pUpper > 0) {
    const ug = branchGrad(ctx, CX, 12);
    cubicTaper(ctx, CX,326, CX-4,296, CX+4,264, CX,230, pUpper, 16, 10, ug);
    if (pUpper > 0.4) {
      const up2 = mapP(pUpper, 0.4, 1.0);
      ctx.globalAlpha = 0.12;
      cubicTaper(ctx, CX+2,318, CX+2,292, CX+2,262, CX+2,230, up2, 2, 1.2, "#98cc50");
      ctx.globalAlpha = 1;
    }
  }

  // ── Wide main boughs ──
  if (pBW > 0) {
    const bg = branchGrad(ctx, CX, 14);
    const lp = mapP(pBW, 0, 0.55);
    const rp2 = mapP(pBW, 0.12, 0.65);
    // Left bough
    cubicTaper(ctx, CX,368, CX-50,348, CX-110,312, CX-158,280, lp,  15, 8, bg);
    // Right bough
    cubicTaper(ctx, CX,368, CX+50,348, CX+110,312, CX+158,280, rp2, 15, 8, bg);
    // Subtle highlights
    if (lp > 0.3) {
      ctx.globalAlpha = 0.10;
      cubicTaper(ctx, CX-6,362, CX-56,342, CX-115,308, CX-155,278, lp, 2, 1, "#98cc50");
      cubicTaper(ctx, CX+6,362, CX+56,342, CX+115,308, CX+155,278, rp2,2, 1, "#98cc50");
      ctx.globalAlpha = 1;
    }
  }

  // ── Upper boughs ──
  if (pBU > 0) {
    const bg = branchGrad(ctx, CX, 10);
    const lp = mapP(pBU, 0, 0.60);
    const rp2 = mapP(pBU, 0.12, 0.72);
    const cp = mapP(pBU, 0.05, 0.55);
    cubicTaper(ctx, CX,280, CX-38,240, CX-78,204, CX-108,168, lp,  11, 6,  bg);
    cubicTaper(ctx, CX,280, CX+38,240, CX+78,204, CX+108,168, rp2, 11, 6,  bg);
    cubicTaper(ctx, CX,252, CX-2, 210, CX+2, 178, CX,   148,  cp,  10, 5.5,bg);
  }

  // ── Sub-branches ──
  if (pBS > 0) {
    const sg = branchGrad(ctx, CX, 8);
    const p = (i: number) => mapP(pBS, i * 0.045, i * 0.045 + 0.65);

    // From left wide bough (CX-158, 280)
    cubicTaper(ctx, CX-158,280, CX-178,252, CX-178,218, CX-174,186,  p(0),  8, 4.5, sg);
    cubicTaper(ctx, CX-158,280, CX-164,298, CX-168,318, CX-166,338,  p(1),  7, 4,   sg);
    cubicTaper(ctx, CX-120,300, CX-138,270, CX-138,240, CX-132,208,  p(2),  7, 4,   sg);
    cubicTaper(ctx, CX-80, 320, CX-96, 292, CX-96, 264, CX-90, 234,  p(3),  6.5,3.5,sg);
    // From right (mirrored)
    const mr = (x: number) => CX + (CX - x);
    cubicTaper(ctx, mr(CX-158),280, mr(CX-178),252, mr(CX-178),218, mr(CX-174),186, p(0),8,4.5,sg);
    cubicTaper(ctx, mr(CX-158),280, mr(CX-164),298, mr(CX-168),318, mr(CX-166),338, p(1),7,4,  sg);
    cubicTaper(ctx, mr(CX-120),300, mr(CX-138),270, mr(CX-138),240, mr(CX-132),208, p(2),7,4,  sg);
    cubicTaper(ctx, mr(CX-80),320,  mr(CX-96),292,  mr(CX-96),264,  mr(CX-90),234,  p(3),6.5,3.5,sg);
    // From upper boughs
    cubicTaper(ctx, CX-108,168, CX-148,158, CX-180,148, CX-195,138,  p(4),  7, 3.5, sg);
    cubicTaper(ctx, CX-108,168, CX-112,138, CX-108,106, CX-100,76,   p(5),  6, 3,   sg);
    cubicTaper(ctx, CX-72, 200, CX-92, 172, CX-92, 142, CX-86, 110,  p(6),  6, 3,   sg);
    cubicTaper(ctx, CX-38, 230, CX-56, 202, CX-54, 174, CX-48, 142,  p(7),  5.5,3, sg);
    cubicTaper(ctx, mr(CX-108),168, mr(CX-148),158, mr(CX-180),148, mr(CX-195),138, p(4),7,3.5,sg);
    cubicTaper(ctx, mr(CX-108),168, mr(CX-112),138, mr(CX-108),106, mr(CX-100),76,  p(5),6,3,  sg);
    cubicTaper(ctx, mr(CX-72),200,  mr(CX-92),172,  mr(CX-92),142,  mr(CX-86),110,  p(6),6,3,  sg);
    cubicTaper(ctx, mr(CX-38),230,  mr(CX-56),202,  mr(CX-54),174,  mr(CX-48),142,  p(7),5.5,3,sg);
  }

  // ── Top branches ──
  if (pBT > 0) {
    const sg = branchGrad(ctx, CX, 6);
    const p = (i: number) => mapP(pBT, i * 0.06, i * 0.06 + 0.62);
    cubicTaper(ctx, CX,148, CX-2,118, CX+2,85, CX,58,             p(0), 7, 3.5, sg);
    cubicTaper(ctx, CX,170, CX-52,142, CX-92,120, CX-104,92,       p(1), 6, 3,   sg);
    cubicTaper(ctx, CX,170, CX+52,142, CX+92,120, CX+104,92,       p(2), 6, 3,   sg);
    cubicTaper(ctx, CX,100, CX-28,78, CX-38,58, CX-40,40,          p(3), 4.5,2.5,sg);
    cubicTaper(ctx, CX,100, CX+28,78, CX+38,58, CX+40,40,          p(4), 4.5,2.5,sg);
    cubicTaper(ctx, CX-174,186, CX-192,170, CX-202,148, CX-200,122, p(5), 6, 3,   sg);
    cubicTaper(ctx, CX+174,186, CX+192,170, CX+202,148, CX+200,122, p(6), 6, 3,   sg);
  }

  // ── Tip branches ──
  if (pBTip > 0) {
    const tg = branchGrad(ctx, CX, 4);
    const p = (i: number) => mapP(pBTip, i * 0.05, i * 0.05 + 0.60);
    const pts: [number,number,number,number,number,number][] = [
      [CX-174,186, CX-196,162, CX-194,138],[CX-174,186, CX-208,168, CX-214,142],
      [CX-100,76,  CX-112,54,  CX-108,32], [CX-100,76,  CX-86, 56,  CX-78, 34],
      [CX-86, 110, CX-100,88,  CX-96, 62], [CX-48, 142, CX-62, 118, CX-58, 90],
      [CX-104,92,  CX-110,72,  CX-104,52], [CX-104,92,  CX-88, 74,  CX-80, 56],
      [CX-40, 40,  CX-48, 22,  CX-42, 6],  [CX,58,      CX-12, 38,  CX-8,  18],
      [CX,58,      CX+12, 38,  CX+8,  18], [CX+40, 40,  CX+48, 22,  CX+42, 6],
    ];
    pts.forEach(([x0,y0, qx,qy, x2,y2], i) => {
      quadTaper(ctx, x0,y0, qx,qy, x2,y2, p(i), 3.5, 1.8, tg);
      // Mirror
      const mr = (x: number) => CX + (CX - x);
      quadTaper(ctx, mr(x0),y0, mr(qx),qy, mr(x2),y2, p(i), 3.5, 1.8, tg);
    });
  }

  // ── Leaf clusters — dome ──
  if (pLeaves > 0) {
    DOME.forEach(([cx, cy, r, br, pi], i) => {
      // Stagger the leaf appearance
      const a = clamp((pLeaves - i * 0.009) / 0.35, 0, 1);
      drawCluster(ctx, cx, cy, r, br, pi, a);
    });
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GrowingTree() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const progressRef  = useRef(0);
  const labelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = 500, H = 580;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    // Initial states
    gsap.set(labelRefs.current.filter(Boolean), { opacity: 0, y: 14 });
    gsap.set(headingRef.current, { opacity: 0, y: 24 });

    function paint() {
      ctx.clearRect(0, 0, W, H);
      drawTree(ctx, progressRef.current);
    }

    function syncLabels(p: number) {
      const show = (idx: number, threshold: number) => {
        const el = labelRefs.current[idx];
        if (!el) return;
        const on = p >= threshold;
        gsap.to(el, { opacity: on ? 1 : 0, y: on ? 0 : 14, duration: 0.35, overwrite: true });
      };
      show(0, 0.53); show(1, 0.53);
      show(2, 0.68); show(3, 0.68);
      show(4, 0.88); show(5, 0.88);
      if (headingRef.current)
        gsap.to(headingRef.current, { opacity: p >= 0.93 ? 1 : 0, y: p >= 0.93 ? 0 : 24, duration: 0.45, overwrite: true });
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=4000",
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        paint();
        syncLabels(self.progress);
      },
    });

    paint();
    return () => st.kill();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100dvh", background: "linear-gradient(160deg,#faf9f5 0%,#f0ece0 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle,#9CAF8830 1px,transparent 1px)", backgroundSize: "38px 38px" }} />

      <p className="relative z-10 text-xs font-sans font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: "#9CAF88" }}>
        Scroll to grow your legacy
      </p>

      <div className="relative z-10 flex items-center gap-2 w-full max-w-6xl px-4">

        {/* Left labels */}
        <div className="flex-col gap-10 flex-1 items-end pr-4 hidden md:flex">
          {LEFT_FEATURES.map((f) => (
            <div key={f.index}
              ref={el => { labelRefs.current[f.index] = el; }}
              className="text-right max-w-[190px]">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Canvas tree */}
        <div className="flex-shrink-0">
          <canvas ref={canvasRef} style={{ width: 500, height: 580, display: "block" }} />
        </div>

        {/* Right labels */}
        <div className="flex-col gap-10 flex-1 items-start pl-4 hidden md:flex">
          {RIGHT_FEATURES.map((f) => (
            <div key={f.index}
              ref={el => { labelRefs.current[f.index] = el; }}
              className="text-left max-w-[190px]">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Heading */}
      <div ref={headingRef} className="relative z-10 text-center mt-6 px-6 max-w-2xl">
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

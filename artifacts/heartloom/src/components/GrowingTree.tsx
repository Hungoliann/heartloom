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
function barkGrad(ctx: Ctx, cx: number, r: number): CanvasGradient {
  const g = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
  g.addColorStop(0,    "#0a0402");
  g.addColorStop(0.10, "#3a1608");
  g.addColorStop(0.30, "#7a3c14");
  g.addColorStop(0.50, "#b05a22");
  g.addColorStop(0.70, "#7a3c14");
  g.addColorStop(0.90, "#361408");
  g.addColorStop(1,    "#0a0402");
  return g;
}

/** Branch sage gradient */
function branchGrad(ctx: Ctx, cx: number, r: number): CanvasGradient {
  const g = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
  g.addColorStop(0,    "#182608");
  g.addColorStop(0.28, "#48680e");
  g.addColorStop(0.55, "#68922e");
  g.addColorStop(0.80, "#486c1a");
  g.addColorStop(1,    "#162208");
  return g;
}

/** Root gradient — warm earth tones, lit from above */
function rootGrad(ctx: Ctx, x1: number, y1: number, x2: number, y2: number): CanvasGradient {
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0,    "#8a5020");
  g.addColorStop(0.35, "#5a2e0e");
  g.addColorStop(0.75, "#3a1a08");
  g.addColorStop(1,    "#1a0a02");
  return g;
}

/** Tapered cubic bezier stroke — width from w0 at start to w1 at end */
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

/** Tapered quadratic bezier stroke */
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
  { f: "#92ca60", v: "#5a9038" }, { f: "#b8dc8c", v: "#78b055" },
];
const CLUSTER_OFFSETS = [
  [0,-14,28,17,0],  [-13,-9,24,14,-42],[13,-9,24,14,42],
  [-9,6,21,13,-68], [9,6,21,13,68],   [-18,-17,19,12,-22],
  [18,-17,19,12,22],[0,14,19,12,90],  [-15,9,17,10,-85],
  [15,9,17,10,85],  [-4,-23,16,9,-8], [4,-23,16,9,8],
  [-7,-6,13,8,-55], [7,-6,13,8,55],
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
  ctx.globalAlpha = a * 0.32;
  ctx.stroke();
  ctx.restore();
}

function drawCluster(ctx: Ctx, cx: number, cy: number, r: number, br: number, pi: number, a: number) {
  if (a <= 0) return;
  CLUSTER_OFFSETS.forEach(([dx, dy, lw, lh, dr], i) => {
    const pal = LEAF_PAL[(i + pi) % LEAF_PAL.length];
    drawLeaf(ctx, cx + dx * r, cy + dy * r, lw * r, lh * r, br + dr, pal.f, pal.v, a * 0.94);
  });
}

// ─── Tree structure ───────────────────────────────────────────────────────────

const CX = 250;

// DOME clusters: [cx, cy, r, baseRot, paletteIdx]
const DOME: [number, number, number, number, number][] = [
  // ── Bottom fringe (y 290–322) ──
  [108,312,0.78,  8, 0],[140,302,0.80, -5, 2],[172,294,0.82,  3, 4],
  [205,288,0.83, -2, 6],[238,285,0.83, -1, 8],[272,286,0.83,  2, 1],
  [304,290,0.82, -4, 3],[336,298,0.80,  6, 5],[368,308,0.78, -7, 7],
  [398,322,0.76,  9, 9],[ 96,328,0.76, 12, 0],

  // ── Lower canopy (y 255–285) ──
  [ 80,270,0.84,-14, 1],[118,256,0.87,  7, 3],[158,245,0.90, -5, 5],
  [198,238,0.92,  2, 7],[238,234,0.93, -2, 9],[272,235,0.93,  3, 2],
  [312,240,0.92, -5, 4],[352,248,0.90,  7, 6],[390,258,0.87,-10, 8],
  [425,272,0.84, 12, 0],[ 62,286,0.82,-18, 3],

  // ── Mid canopy (y 210–248) ──
  [ 68,228,0.86,-20, 5],[108,214,0.90,  9, 7],[150,202,0.93, -6, 9],
  [190,194,0.95,  3, 2],[232,190,0.96, -2, 4],[268,191,0.96,  3, 6],
  [308,196,0.95, -5, 8],[348,204,0.93,  8, 1],[390,215,0.90,-11, 3],
  [428,228,0.86, 14, 5],[ 55,245,0.84,-22, 7],[445,244,0.84, 20, 9],

  // ── Mid-upper canopy (y 168–205) ──
  [ 60,188,0.84,-24, 2],[100,174,0.88, 10, 4],[142,162,0.92, -7, 6],
  [184,154,0.95,  3, 8],[228,149,0.97, -2, 1],[268,150,0.97,  4, 3],
  [310,156,0.95, -5, 5],[352,164,0.92, 10, 7],[394,175,0.88,-12, 9],
  [432,190,0.85, 16, 2],[ 48,205,0.82,-26, 4],[452,210,0.82, 24, 6],

  // ── Upper canopy (y 128–162) ──
  [ 72,155,0.82,-22, 8],[112,140,0.86,  9, 1],[154,128,0.90, -6, 3],
  [196,120,0.93,  3, 5],[240,116,0.95, -2, 7],[278,118,0.94,  4, 9],
  [318,124,0.91, -6, 2],[358,132,0.88, 10, 4],[398,144,0.85,-12, 6],
  [436,160,0.82, 16, 8],[ 58,168,0.80,-26, 1],[448,172,0.80, 25, 3],

  // ── Upper-mid crown (y 88–125) ──
  [ 92,122,0.80,-18, 5],[130,108,0.84,  7, 7],[170,96,0.87,  -5, 9],
  [212,88,0.90,   2, 2],[248,84,0.91,  -1, 4],[284,86,0.91,   4, 6],
  [322,92,0.89,  -5, 8],[360,102,0.86,  9, 1],[398,116,0.83,-12, 3],
  [432,132,0.80, 15, 5],

  // ── Top crown (y 48–88) ──
  [138,80,0.78,  -8, 7],[174,68,0.82,   5, 9],[212,58,0.86,  -3, 2],
  [248,54,0.88,  -1, 4],[282,56,0.87,   4, 6],[318,64,0.84,  -6, 8],
  [354,76,0.80,  10, 1],[388,92,0.77, -14, 3],

  // ── Peak (y 20–50) ──
  [188,42,0.74,  -6, 5],[218,30,0.77,   3, 7],[248,24,0.79,  -1, 9],
  [278,28,0.77,   4, 2],[308,38,0.74,  -7, 4],

  // ── Interior fill ──
  [170,220,0.90,  2, 8],[210,214,0.92,  4, 1],[248,211,0.93, -2, 3],
  [286,215,0.92,  3, 5],[324,222,0.90, -4, 7],
  [190,178,0.92, -3, 9],[248,174,0.94,  2, 2],[306,180,0.92,  3, 4],
  [230,138,0.90, -4, 6],[268,140,0.90,  3, 8],
];

// ─── Main draw function ───────────────────────────────────────────────────────

function drawTree(ctx: Ctx, progress: number) {
  const pSeed   = mapP(progress, 0.00, 0.06);
  const pRoots  = mapP(progress, 0.05, 0.22);
  const pTrunk  = mapP(progress, 0.18, 0.35);
  const pHeart  = mapP(progress, 0.32, 0.44);
  const pUpper  = mapP(progress, 0.38, 0.52);
  const pBW     = mapP(progress, 0.46, 0.62);
  const pBU     = mapP(progress, 0.54, 0.68);
  const pBS     = mapP(progress, 0.62, 0.76);
  const pBT     = mapP(progress, 0.72, 0.84);
  const pBTip   = mapP(progress, 0.80, 0.90);
  const pLeaves = mapP(progress, 0.86, 1.00);

  // Ground shadow
  const gs = ctx.createRadialGradient(CX, 518, 5, CX, 516, 125);
  gs.addColorStop(0,   "rgba(24,10,2,0.42)");
  gs.addColorStop(0.5, "rgba(24,10,2,0.18)");
  gs.addColorStop(1,   "rgba(24,10,2,0)");
  ctx.fillStyle = gs;
  ctx.beginPath(); ctx.ellipse(CX, 518, 125, 20, 0, 0, Math.PI * 2); ctx.fill();

  // ── Seed ──
  if (pSeed > 0) {
    const sr = pSeed * 9;
    const sg = ctx.createRadialGradient(CX, 506, 0, CX, 506, sr * 1.2);
    sg.addColorStop(0, "#f0b848"); sg.addColorStop(0.5, "#b86020"); sg.addColorStop(1, "#7a3e10");
    ctx.beginPath(); ctx.arc(CX, 506, sr, 0, Math.PI * 2);
    ctx.fillStyle = sg; ctx.fill();
  }

  // ══════════════════════════════════════════
  // ROOTS — organic buttress roots
  // ══════════════════════════════════════════
  if (pRoots > 0) {
    const mir = (x: number) => CX + (CX - x);
    const rp = (s: number, e: number) => mapP(pRoots, s, e);

    // Junction glow
    if (rp(0.05, 0.40) > 0) {
      const jg = ctx.createRadialGradient(CX, 505, 0, CX, 505, 52);
      jg.addColorStop(0,   "rgba(160,80,20,0.45)");
      jg.addColorStop(0.5, "rgba(120,55,12,0.20)");
      jg.addColorStop(1,   "rgba(100,40,8,0)");
      ctx.fillStyle = jg; ctx.globalAlpha = rp(0.05, 0.40);
      ctx.beginPath(); ctx.ellipse(CX, 505, 52, 22, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Left main root
    const rg_L = rootGrad(ctx, 240, 498, 52, 506);
    cubicTaper(ctx, 240,500, 210,508, 180,514, 152,512, rp(0,0.32),   22,14, rg_L);
    cubicTaper(ctx, 152,512, 120,510,  92,505,  68,499, rp(0.18,0.60),14, 8, rg_L);
    quadTaper( ctx,  68,499,  46,494,  30,490,           rp(0.40,0.80), 8, 4, rg_L);
    quadTaper( ctx,  30,490,  16,486,   5,484,           rp(0.60,1.00), 4, 2, rg_L);
    // Left fork
    const rf_L = rootGrad(ctx, 152,512, 140,545);
    cubicTaper(ctx, 152,512, 148,522, 144,535, 140,548, rp(0.28,0.78),10,5, rf_L);
    quadTaper( ctx, 140,548, 136,558, 130,565,           rp(0.52,0.92), 5,2, rf_L);
    // Left secondary
    const rs_L = rootGrad(ctx, 245,504, 95,512);
    cubicTaper(ctx, 244,503, 215,510, 175,516, 144,514, rp(0.08,0.50),12,7, rs_L);
    quadTaper( ctx, 144,514, 118,512,  96,508,           rp(0.30,0.72), 7,4, rs_L);
    // Surface highlight
    if (rp(0,0.35) > 0) {
      ctx.globalAlpha = 0.38;
      quadTaper(ctx, 240,498, 188,506, 142,504, rp(0,0.35), 7,3.5, "#a06020");
      ctx.globalAlpha = 1;
    }
    // Shadow underline
    if (rp(0,0.30) > 0) {
      ctx.globalAlpha = 0.28;
      quadTaper(ctx, 244,510, 188,520, 140,518, rp(0,0.30), 6,3, "#0a0402");
      ctx.globalAlpha = 1;
    }

    // Right (mirror)
    const rg_R = rootGrad(ctx, mir(240), 498, mir(52), 506);
    cubicTaper(ctx, mir(240),500, mir(210),508, mir(180),514, mir(152),512, rp(0,0.32),   22,14, rg_R);
    cubicTaper(ctx, mir(152),512, mir(120),510, mir(92),505,  mir(68),499,  rp(0.18,0.60),14, 8, rg_R);
    quadTaper( ctx, mir(68),499,  mir(46),494,  mir(30),490,               rp(0.40,0.80), 8, 4, rg_R);
    quadTaper( ctx, mir(30),490,  mir(16),486,  mir(5),484,                rp(0.60,1.00), 4, 2, rg_R);
    const rf_R = rootGrad(ctx, mir(152),512, mir(140),545);
    cubicTaper(ctx, mir(152),512, mir(148),522, mir(144),535, mir(140),548, rp(0.28,0.78),10,5, rf_R);
    quadTaper( ctx, mir(140),548, mir(136),558, mir(130),565,               rp(0.52,0.92), 5,2, rf_R);
    const rs_R = rootGrad(ctx, mir(245),504, mir(95),512);
    cubicTaper(ctx, mir(244),503, mir(215),510, mir(175),516, mir(144),514, rp(0.08,0.50),12,7, rs_R);
    quadTaper( ctx, mir(144),514, mir(118),512, mir(96),508,                rp(0.30,0.72), 7,4, rs_R);
    if (rp(0,0.35) > 0) {
      ctx.globalAlpha = 0.38;
      quadTaper(ctx, mir(240),498, mir(188),506, mir(142),504, rp(0,0.35), 7,3.5, "#a06020");
      ctx.globalAlpha = 1;
    }
    if (rp(0,0.30) > 0) {
      ctx.globalAlpha = 0.28;
      quadTaper(ctx, mir(244),510, mir(188),520, mir(140),518, rp(0,0.30), 6,3, "#0a0402");
      ctx.globalAlpha = 1;
    }

    // Centre forward root
    const rc = rootGrad(ctx, 252,502, 260,555);
    cubicTaper(ctx, 252,502, 254,518, 258,536, 260,554, rp(0.14,0.65),10,5, rc);
    quadTaper( ctx, 260,554, 262,566, 258,574,           rp(0.40,0.85), 5,2, rc);
  }

  // ══════════════════════════════════════════
  // TRUNK — one single smooth motion,
  // ground to heart junction (y 504 → 372)
  // ══════════════════════════════════════════
  if (pTrunk > 0) {
    const bg = barkGrad(ctx, CX, 26);
    // One continuous tapered stroke — wide flare at base narrows smoothly to crown
    cubicTaper(ctx, CX,504, CX-16,456, CX+10,408, CX,372, pTrunk, 50, 22, bg);

    // Bark fissures for texture
    if (pTrunk > 0.22) {
      const fp = mapP(pTrunk, 0.22, 1.0);
      ctx.globalAlpha = 0.44;
      cubicTaper(ctx, CX-3,496, CX+7,462, CX-5,430, CX+2,398, fp, 2.0, 1.3, "#080402");
      ctx.globalAlpha = 0.30;
      cubicTaper(ctx, CX+9,480, CX-6,450, CX+6,420, CX-3,392, fp, 1.5, 0.9, "#080402");
      ctx.globalAlpha = 0.22;
      cubicTaper(ctx, CX-10,468, CX+4,440, CX-4,414, CX+1,384, fp, 1.2, 0.8, "#180a04");
      ctx.globalAlpha = 1;
    }
    // Centre highlight
    if (pTrunk > 0.32) {
      const hp = mapP(pTrunk, 0.32, 1.0);
      ctx.globalAlpha = 0.14;
      cubicTaper(ctx, CX+3,492, CX+3,458, CX+3,428, CX+3,394, hp, 4.2, 2.2, "#d09050");
      ctx.globalAlpha = 1;
    }
  }

  // ══════════════════════════════════════════
  // HEART — formed by two branch curves
  // The trunk forks; branches arc outward and
  // back together, outlining a heart in the
  // negative space between them.
  // ══════════════════════════════════════════
  if (pHeart > 0) {
    const hbg = barkGrad(ctx, CX, 20);
    // Phase 1: lower arc — branches sweep outward
    const ph1 = mapP(pHeart, 0,    0.56);
    // Phase 2: upper arc — branches curl back to meet at top
    const ph2 = mapP(pHeart, 0.44, 1.00);

    // Left branch — traces left half of heart outline
    cubicTaper(ctx, CX,390, CX-6,374, CX-44,360, CX-44,340, ph1, 13, 8, hbg);
    cubicTaper(ctx, CX-44,340, CX-44,318, CX-24,312, CX,321, ph2,  8, 5, hbg);

    // Right branch — mirror
    cubicTaper(ctx, CX,390, CX+6,374, CX+44,360, CX+44,340, ph1, 13, 8, hbg);
    cubicTaper(ctx, CX+44,340, CX+44,318, CX+24,312, CX,321, ph2,  8, 5, hbg);

    // Subtle warm glow in the heart space as it completes
    if (pHeart > 0.72) {
      const ga = mapP(pHeart, 0.72, 1.0) * 0.5;
      const glow = ctx.createRadialGradient(CX, 354, 0, CX, 354, 42);
      glow.addColorStop(0,   `rgba(220,140,20,${ga * 0.45})`);
      glow.addColorStop(0.5, `rgba(200,110,15,${ga * 0.20})`);
      glow.addColorStop(1,   "rgba(180,90,10,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.ellipse(CX, 354, 42, 36, 0, 0, Math.PI * 2); ctx.fill();
    }
  }

  // ══════════════════════════════════════════
  // UPPER TRUNK — sage-green, rising from
  // heart junction to canopy base
  // ══════════════════════════════════════════
  if (pUpper > 0) {
    const ug = branchGrad(ctx, CX, 12);
    cubicTaper(ctx, CX,322, CX-5,292, CX+5,264, CX,232, pUpper, 16, 10, ug);
    if (pUpper > 0.38) {
      const up2 = mapP(pUpper, 0.38, 1.0);
      ctx.globalAlpha = 0.11;
      cubicTaper(ctx, CX+3,314, CX+3,288, CX+3,260, CX+3,232, up2, 2.2, 1.2, "#a0cc58");
      ctx.globalAlpha = 1;
    }
  }

  // ══════════════════════════════════════════
  // CANOPY BRANCHES — all clipped to the leaf
  // dome silhouette so nothing pokes outside
  // ══════════════════════════════════════════
  ctx.save();
  // Clip path follows the approximate silhouette of the DOME leaf clusters
  ctx.beginPath();
  ctx.moveTo(72, 342);
  ctx.bezierCurveTo(38, 274, 30, 200, 38, 148);
  ctx.bezierCurveTo(46, 96,  72,  38, 250,  14);
  ctx.bezierCurveTo(428, 38, 454, 96, 462, 148);
  ctx.bezierCurveTo(470, 200, 462, 274, 428, 342);
  ctx.bezierCurveTo(386, 362, 322, 372, 250, 374);
  ctx.bezierCurveTo(178, 372, 114, 362,  72, 342);
  ctx.closePath();
  ctx.clip();

  // ── Wide main boughs ──
  if (pBW > 0) {
    const bg = branchGrad(ctx, CX, 15);
    // Left bough — asymmetric origin, sweeps wide
    cubicTaper(ctx, CX-5,374, CX-55,352, CX-108,315, CX-152,284, mapP(pBW,0,0.56),    16, 9, bg);
    // Right bough
    cubicTaper(ctx, CX+5,368, CX+58,346, CX+112,308, CX+155,280, mapP(pBW,0.10,0.64), 16, 9, bg);
    // Lower drooping boughs
    cubicTaper(ctx, CX-8,392, CX-52,398, CX-96,392, CX-128,382, mapP(pBW,0.20,0.70), 12, 7, bg);
    cubicTaper(ctx, CX+8,388, CX+52,394, CX+96,388, CX+128,378, mapP(pBW,0.26,0.76), 12, 7, bg);
    if (mapP(pBW,0,0.56) > 0.28) {
      ctx.globalAlpha = 0.09;
      cubicTaper(ctx, CX-8,370, CX-58,350, CX-112,312, CX-150,282, mapP(pBW,0,0.56),    2.2,1, "#b0d860");
      cubicTaper(ctx, CX+8,364, CX+62,342, CX+116,305, CX+153,278, mapP(pBW,0.10,0.64), 2.2,1, "#b0d860");
      ctx.globalAlpha = 1;
    }
  }

  // ── Upper boughs ──
  if (pBU > 0) {
    const bg = branchGrad(ctx, CX, 11);
    cubicTaper(ctx, CX,280, CX-40,240, CX-78,204, CX-108,170, mapP(pBU,0,0.62),    12,6.5,bg);
    cubicTaper(ctx, CX,280, CX+40,240, CX+78,204, CX+108,170, mapP(pBU,0.10,0.72), 12,6.5,bg);
    cubicTaper(ctx, CX,254, CX-2, 212, CX+2, 178, CX,   148,  mapP(pBU,0.05,0.58), 11,6,  bg);
    // Side upper boughs from wide bough tips
    cubicTaper(ctx, CX-152,284, CX-162,252, CX-170,218, CX-168,180, mapP(pBU,0.12,0.68), 8,4.5,bg);
    cubicTaper(ctx, CX+152,280, CX+162,248, CX+170,215, CX+168,178, mapP(pBU,0.18,0.74), 8,4.5,bg);
    cubicTaper(ctx, CX-128,382, CX-138,350, CX-148,312, CX-158,274, mapP(pBU,0.22,0.75), 8,4.5,bg);
    cubicTaper(ctx, CX+128,378, CX+138,346, CX+148,308, CX+158,270, mapP(pBU,0.28,0.80), 8,4.5,bg);
  }

  // ── Sub-branches ──
  if (pBS > 0) {
    const sg = branchGrad(ctx, CX, 9);
    const mir = (x: number) => CX + (CX - x);
    const p = (i: number) => mapP(pBS, i * 0.038, i * 0.038 + 0.66);

    // From left wide bough tip
    cubicTaper(ctx, CX-152,284, CX-172,255, CX-174,222, CX-170,190, p(0),  9, 5, sg);
    cubicTaper(ctx, CX-152,284, CX-160,304, CX-164,326, CX-162,348, p(1),  8,4.5,sg);
    cubicTaper(ctx, CX-152,284, CX-168,272, CX-184,262, CX-198,254, p(2),  7, 4, sg);
    // From mid-bough
    cubicTaper(ctx, CX-116,306, CX-136,276, CX-136,248, CX-130,216, p(3),  8, 4, sg);
    cubicTaper(ctx, CX-80, 326, CX-98, 294, CX-96, 266, CX-90, 234, p(4), 7.5,4, sg);
    cubicTaper(ctx, CX-42, 356, CX-54, 328, CX-52, 298, CX-46, 268, p(5),  7,3.5,sg);
    // From lower bough
    cubicTaper(ctx, CX-128,382, CX-140,356, CX-144,328, CX-140,298, p(6),  8,4.5,sg);
    cubicTaper(ctx, CX-128,382, CX-150,364, CX-164,344, CX-172,322, p(7),  7, 4, sg);

    // Right mirrors
    cubicTaper(ctx, mir(CX-152),284, mir(CX-172),255, mir(CX-174),222, mir(CX-170),190, p(0), 9, 5, sg);
    cubicTaper(ctx, mir(CX-152),284, mir(CX-160),304, mir(CX-164),326, mir(CX-162),348, p(1), 8,4.5,sg);
    cubicTaper(ctx, mir(CX-152),284, mir(CX-168),272, mir(CX-184),262, mir(CX-198),254, p(2), 7, 4, sg);
    cubicTaper(ctx, mir(CX-116),306, mir(CX-136),276, mir(CX-136),248, mir(CX-130),216, p(3), 8, 4, sg);
    cubicTaper(ctx, mir(CX-80),326,  mir(CX-98),294,  mir(CX-96),266,  mir(CX-90),234,  p(4),7.5,4, sg);
    cubicTaper(ctx, mir(CX-42),356,  mir(CX-54),328,  mir(CX-52),298,  mir(CX-46),268,  p(5), 7,3.5,sg);
    cubicTaper(ctx, mir(CX-128),382, mir(CX-140),356, mir(CX-144),328, mir(CX-140),298, p(6), 8,4.5,sg);
    cubicTaper(ctx, mir(CX-128),382, mir(CX-150),364, mir(CX-164),344, mir(CX-172),322, p(7), 7, 4, sg);

    // From upper boughs
    cubicTaper(ctx, CX-108,170, CX-148,160, CX-178,150, CX-192,140, p(8),  8, 4, sg);
    cubicTaper(ctx, CX-108,170, CX-112,138, CX-108,108, CX-102,78,  p(9),  7,3.5,sg);
    cubicTaper(ctx, CX-76, 200, CX-96, 172, CX-94, 142, CX-88, 110, p(10), 6.5,3.5,sg);
    cubicTaper(ctx, CX-38, 228, CX-56, 200, CX-52, 172, CX-46, 142, p(11), 6, 3, sg);
    cubicTaper(ctx, mir(CX-108),170, mir(CX-148),160, mir(CX-178),150, mir(CX-192),140, p(8),  8, 4,  sg);
    cubicTaper(ctx, mir(CX-108),170, mir(CX-112),138, mir(CX-108),108, mir(CX-102),78,  p(9),  7, 3.5,sg);
    cubicTaper(ctx, mir(CX-76),200,  mir(CX-96),172,  mir(CX-94),142,  mir(CX-88),110,  p(10),6.5,3.5,sg);
    cubicTaper(ctx, mir(CX-38),228,  mir(CX-56),200,  mir(CX-52),172,  mir(CX-46),142,  p(11), 6, 3,  sg);
    // Far-side upper boughs
    cubicTaper(ctx, CX-168,180, CX-186,162, CX-202,142, CX-208,120, p(12), 6,3, sg);
    cubicTaper(ctx, mir(CX-168),180, mir(CX-186),162, mir(CX-202),142, mir(CX-208),120, p(12),6,3,sg);
  }

  // ── Top branches ──
  if (pBT > 0) {
    const sg = branchGrad(ctx, CX, 7);
    const p = (i: number) => mapP(pBT, i * 0.055, i * 0.055 + 0.62);
    const mir = (x: number) => CX + (CX - x);
    cubicTaper(ctx, CX,148, CX-2,118, CX+2,84,  CX,55,             p(0), 8, 4,  sg);
    cubicTaper(ctx, CX,170, CX-55,142, CX-96,118, CX-106,90,        p(1), 7,3.5, sg);
    cubicTaper(ctx, CX,170, CX+55,142, CX+96,118, CX+106,90,        p(2), 7,3.5, sg);
    cubicTaper(ctx, CX,100, CX-28,78,  CX-38,58,  CX-40,38,         p(3), 5,2.8, sg);
    cubicTaper(ctx, CX,100, CX+28,78,  CX+38,58,  CX+40,38,         p(4), 5,2.8, sg);
    cubicTaper(ctx, CX-168,180, CX-186,162, CX-196,142, CX-194,114, p(5), 7,3.5, sg);
    cubicTaper(ctx, mir(CX-168),180, mir(CX-186),162, mir(CX-196),142, mir(CX-194),114, p(6),7,3.5,sg);
    cubicTaper(ctx, CX-192,140, CX-208,122, CX-210,100, CX-204,76,  p(7), 6, 3,  sg);
    cubicTaper(ctx, mir(CX-192),140, mir(CX-208),122, mir(CX-210),100, mir(CX-204),76, p(8),6,3,sg);
  }

  // ── Tip branches ──
  if (pBTip > 0) {
    const tg = branchGrad(ctx, CX, 5);
    const p = (i: number) => mapP(pBTip, i * 0.045, i * 0.045 + 0.58);
    const mir = (x: number) => CX + (CX - x);
    const tips: [number,number,number,number,number,number][] = [
      [CX-168,180, CX-190,158, CX-188,134],[CX-168,180, CX-204,162, CX-208,136],
      [CX-106,90,  CX-118,68,  CX-112,44], [CX-106,90,  CX-90, 70,  CX-82, 48],
      [CX-88, 110, CX-104,88,  CX-100,62], [CX-46, 142, CX-60, 118, CX-56, 90],
      [CX-40, 38,  CX-48, 22,  CX-42,  6], [CX,55,      CX-12, 34,  CX-8,  14],
      [CX,55,      CX+12, 34,  CX+8,  14], [CX+40,38,   CX+48, 22,  CX+42,  6],
      [CX-204,76,  CX-212,56,  CX-206, 36],[CX-194,114, CX-202, 92, CX-196, 70],
      [CX-158,274, CX-178,256, CX-180,234],[CX-172,322, CX-196,304, CX-200,280],
    ];
    tips.forEach(([x0,y0, qx,qy, x2,y2], i) => {
      quadTaper(ctx, x0,y0, qx,qy, x2,y2,         p(i), 4, 2, tg);
      quadTaper(ctx, mir(x0),y0, mir(qx),qy, mir(x2),y2, p(i), 4, 2, tg);
    });
  }

  ctx.restore(); // end canopy clip

  // ══════════════════════════════════════════
  // LEAF CLUSTERS — drawn outside clip so they
  // form the visible canopy boundary
  // ══════════════════════════════════════════
  if (pLeaves > 0) {
    DOME.forEach(([cx, cy, r, br, pi], i) => {
      const a = clamp((pLeaves - i * 0.008) / 0.30, 0, 1);
      drawCluster(ctx, cx, cy, r, br, pi, a);
    });
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GrowingTree() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const labelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef  = useRef<HTMLDivElement>(null);

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

    gsap.set(labelRefs.current.filter(Boolean), { opacity: 0, y: 14 });
    gsap.set(headingRef.current, { opacity: 0, y: 24 });

    function paint() {
      ctx.clearRect(0, 0, W, H);
      drawTree(ctx, progressRef.current);
    }

    function syncLabels(p: number) {
      const show = (idx: number, t: number) => {
        const el = labelRefs.current[idx];
        if (!el) return;
        gsap.to(el, { opacity: p >= t ? 1 : 0, y: p >= t ? 0 : 14, duration: 0.35, overwrite: true });
      };
      show(0, 0.52); show(1, 0.52);
      show(2, 0.67); show(3, 0.67);
      show(4, 0.87); show(5, 0.87);
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
            <div key={f.index} ref={el => { labelRefs.current[f.index] = el; }} className="text-right max-w-[190px]">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-shrink-0">
          <canvas ref={canvasRef} style={{ width: 500, height: 580, display: "block" }} />
        </div>

        {/* Right labels */}
        <div className="flex-col gap-10 flex-1 items-start pl-4 hidden md:flex">
          {RIGHT_FEATURES.map((f) => (
            <div key={f.index} ref={el => { labelRefs.current[f.index] = el; }} className="text-left max-w-[190px]">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "#D27F14" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "#6b7c5a" }}>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>

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

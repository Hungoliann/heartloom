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
  g.addColorStop(0.28, "#48680e");  // actually use a warmer green to transition
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

/** Draw a TAPERED cubic bezier — width from w0 at start → w1 at end */
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

/** Draw a TAPERED quadratic bezier */
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

// ─── Heart drawing ────────────────────────────────────────────────────────────

function traceHeart(ctx: Ctx, hs: number) {
  ctx.beginPath();
  ctx.moveTo(0, hs);
  ctx.bezierCurveTo(-hs * 0.08, hs * 0.72, -hs * 0.95, hs * 0.28, -hs, -hs * 0.12);
  ctx.bezierCurveTo(-hs, -hs * 0.64, -hs * 0.50, -hs, 0, -hs * 0.52);
  ctx.bezierCurveTo(hs * 0.50, -hs, hs, -hs * 0.64, hs, -hs * 0.12);
  ctx.bezierCurveTo(hs * 0.95, hs * 0.28, hs * 0.08, hs * 0.72, 0, hs);
  ctx.closePath();
}

function drawHeart(ctx: Ctx, cx: number, cy: number, progress: number) {
  if (progress <= 0) return;
  const a = progress;
  ctx.save();
  ctx.translate(cx, cy);

  const hs = 38; // half-size of heart — determines scale

  // ── 1. Ambient warm glow behind the heart ──
  if (a > 0.2) {
    const ga = mapP(a, 0.2, 1.0);
    const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, hs * 2.2);
    glow.addColorStop(0,    `rgba(230, 140, 20, ${ga * 0.55})`);
    glow.addColorStop(0.35, `rgba(200, 110, 15, ${ga * 0.28})`);
    glow.addColorStop(0.65, `rgba(180, 90,  10, ${ga * 0.12})`);
    glow.addColorStop(1,    "rgba(160, 70,   5, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.ellipse(0, 0, hs * 2.2, hs * 2.0, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = a;

  // ── 2. Shadow / depth behind heart (carved-in effect) ──
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 3;
  traceHeart(ctx, hs + 2);
  ctx.fillStyle = "#3a1408";
  ctx.fill();
  ctx.restore();

  // ── 3. Filled heart — radial gradient, golden centre ──
  traceHeart(ctx, hs);
  const hg = ctx.createRadialGradient(-hs * 0.15, -hs * 0.05, 0, 0, hs * 0.1, hs * 1.3);
  hg.addColorStop(0,    "#f8d060");  // bright gold core
  hg.addColorStop(0.20, "#e8a030");  // warm amber
  hg.addColorStop(0.48, "#c87020");  // rich amber
  hg.addColorStop(0.75, "#9a4e14");  // deeper
  hg.addColorStop(1,    "#6a2c08");  // dark edge
  ctx.fillStyle = hg;
  ctx.fill();

  // ── 4. Top-left highlight sheen ──
  if (a > 0.5) {
    const shine = mapP(a, 0.5, 1.0);
    ctx.save();
    ctx.globalAlpha = shine * 0.55;
    ctx.beginPath();
    ctx.ellipse(-hs * 0.30, -hs * 0.22, hs * 0.42, hs * 0.28, -0.5, 0, Math.PI * 2);
    const sg = ctx.createRadialGradient(-hs * 0.30, -hs * 0.22, 0, -hs * 0.30, -hs * 0.22, hs * 0.42);
    sg.addColorStop(0, "rgba(255,245,180,0.95)");
    sg.addColorStop(1, "rgba(255,220,100,0)");
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.restore();
  }

  // ── 5. Amber outline for definition ──
  traceHeart(ctx, hs);
  ctx.strokeStyle = "#7a3808";
  ctx.lineWidth = 1.8;
  ctx.globalAlpha = a * 0.7;
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.restore();
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
  // midrib
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

// Canvas: 500×580, CX=250, ground≈y=508
const CX = 250;

// DOME: [cx, cy, r, baseRot, paletteIdx]  — ~100 clusters for dense canopy
const DOME: [number, number, number, number, number][] = [
  // ── Bottom fringe (y 290-320) ──
  [108,312,0.78,  8, 0],[140,302,0.80, -5, 2],[172,294,0.82,  3, 4],
  [205,288,0.83, -2, 6],[238,285,0.83, -1, 8],[272,286,0.83,  2, 1],
  [304,290,0.82, -4, 3],[336,298,0.80,  6, 5],[368,308,0.78, -7, 7],
  [398,322,0.76,  9, 9],[ 96,328,0.76, 12, 0],

  // ── Lower canopy (y 255-285) ──
  [ 80,270,0.84,-14, 1],[118,256,0.87,  7, 3],[158,245,0.90, -5, 5],
  [198,238,0.92,  2, 7],[238,234,0.93, -2, 9],[272,235,0.93,  3, 2],
  [312,240,0.92, -5, 4],[352,248,0.90,  7, 6],[390,258,0.87,-10, 8],
  [425,272,0.84, 12, 0],[ 62,286,0.82,-18, 3],

  // ── Mid canopy (y 210-248) ──
  [ 68,228,0.86,-20, 5],[108,214,0.90,  9, 7],[150,202,0.93, -6, 9],
  [190,194,0.95,  3, 2],[232,190,0.96, -2, 4],[268,191,0.96,  3, 6],
  [308,196,0.95, -5, 8],[348,204,0.93,  8, 1],[390,215,0.90,-11, 3],
  [428,228,0.86, 14, 5],[ 55,245,0.84,-22, 7],[445,244,0.84, 20, 9],

  // ── Mid-upper canopy (y 168-205) ──
  [ 60,188,0.84,-24, 2],[100,174,0.88, 10, 4],[142,162,0.92, -7, 6],
  [184,154,0.95,  3, 8],[228,149,0.97, -2, 1],[268,150,0.97,  4, 3],
  [310,156,0.95, -5, 5],[352,164,0.92, 10, 7],[394,175,0.88,-12, 9],
  [432,190,0.85, 16, 2],[ 48,205,0.82,-26, 4],[452,210,0.82, 24, 6],

  // ── Upper canopy (y 128-162) ──
  [ 72,155,0.82,-22, 8],[112,140,0.86,  9, 1],[154,128,0.90, -6, 3],
  [196,120,0.93,  3, 5],[240,116,0.95, -2, 7],[278,118,0.94,  4, 9],
  [318,124,0.91, -6, 2],[358,132,0.88, 10, 4],[398,144,0.85,-12, 6],
  [436,160,0.82, 16, 8],[ 58,168,0.80,-26, 1],[448,172,0.80, 25, 3],

  // ── Upper-mid crown (y 88-125) ──
  [ 92,122,0.80,-18, 5],[130,108,0.84,  7, 7],[170,96,0.87,  -5, 9],
  [212,88,0.90,   2, 2],[248,84,0.91,  -1, 4],[284,86,0.91,   4, 6],
  [322,92,0.89,  -5, 8],[360,102,0.86, 9, 1],[398,116,0.83,-12, 3],
  [432,132,0.80, 15, 5],

  // ── Top crown (y 48-88) ──
  [138,80,0.78,  -8, 7],[174,68,0.82,   5, 9],[212,58,0.86,  -3, 2],
  [248,54,0.88,  -1, 4],[282,56,0.87,   4, 6],[318,64,0.84,  -6, 8],
  [354,76,0.80,  10, 1],[388,92,0.77, -14, 3],

  // ── Peak (y 20-50) ──
  [188,42,0.74,  -6, 5],[218,30,0.77,   3, 7],[248,24,0.79,  -1, 9],
  [278,28,0.77,   4, 2],[308,38,0.74,  -7, 4],

  // ── Interior fill — darker depth clusters ──
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
  // ROOTS — organic, buttress-style, warm
  // ══════════════════════════════════════════
  if (pRoots > 0) {
    const mir = (x: number) => CX + (CX - x);

    // Sub-progress stagger
    const rp = (start: number, end: number) => mapP(pRoots, start, end);

    // Warm junction glow where roots meet trunk
    if (rp(0.05, 0.40) > 0) {
      const jg = ctx.createRadialGradient(CX, 505, 0, CX, 505, 52);
      jg.addColorStop(0,   "rgba(160, 80, 20, 0.45)");
      jg.addColorStop(0.5, "rgba(120, 55, 12, 0.20)");
      jg.addColorStop(1,   "rgba(100, 40,  8, 0)");
      ctx.fillStyle = jg;
      ctx.globalAlpha = rp(0.05, 0.40);
      ctx.beginPath(); ctx.ellipse(CX, 505, 52, 22, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ── LEFT roots ──
    // Main left: arcs outward with gentle S-curve
    const rg_L = rootGrad(ctx, 240, 498, 52, 506);
    cubicTaper(ctx, 240,500, 210,508, 180,514, 152,512, rp(0,0.32),   22, 14, rg_L);
    cubicTaper(ctx, 152,512, 120,510, 92, 505, 68, 499,  rp(0.18,0.60), 14, 8,  rg_L);
    quadTaper( ctx,  68,499,  46,494,  30,490,            rp(0.40,0.80),  8, 4,  rg_L);
    quadTaper( ctx,  30,490,  16,486,   5,484,            rp(0.60,1.00),  4, 2,  rg_L);

    // Left fork — droops into soil near mid-root
    const rf_L = rootGrad(ctx, 152,512, 140,545);
    cubicTaper(ctx, 152,512, 148,522, 144,535, 140,548, rp(0.28,0.78), 10, 5, rf_L);
    quadTaper( ctx, 140,548, 136,558, 130,565,           rp(0.52,0.92),  5, 2, rf_L);

    // Left secondary root — shorter, shallower arc
    const rs_L = rootGrad(ctx, 245,504, 95,512);
    cubicTaper(ctx, 244,503, 215,510, 175,516, 144,514, rp(0.08,0.50), 12, 7, rs_L);
    quadTaper( ctx, 144,514, 118,512,  96,508,           rp(0.30,0.72),  7, 4, rs_L);

    // Left surface highlight (lit top)
    if (rp(0, 0.35) > 0) {
      ctx.globalAlpha = 0.38;
      quadTaper(ctx, 240,498, 188,506, 142,504, rp(0,0.35), 7, 3.5, "#a06020");
      ctx.globalAlpha = 1;
    }
    // Shadow underline
    if (rp(0, 0.30) > 0) {
      ctx.globalAlpha = 0.28;
      quadTaper(ctx, 244,510, 188,520, 140,518, rp(0,0.30), 6, 3, "#0a0402");
      ctx.globalAlpha = 1;
    }

    // ── RIGHT roots (mirrored) ──
    const rg_R = rootGrad(ctx, mir(240), 498, mir(52), 506);
    cubicTaper(ctx, mir(240),500, mir(210),508, mir(180),514, mir(152),512, rp(0,0.32),   22,14, rg_R);
    cubicTaper(ctx, mir(152),512, mir(120),510, mir(92),505,  mir(68),499,  rp(0.18,0.60), 14, 8, rg_R);
    quadTaper( ctx, mir(68),499,  mir(46),494,  mir(30),490,               rp(0.40,0.80),  8, 4, rg_R);
    quadTaper( ctx, mir(30),490,  mir(16),486,  mir(5),484,                rp(0.60,1.00),  4, 2, rg_R);

    const rf_R = rootGrad(ctx, mir(152),512, mir(140),545);
    cubicTaper(ctx, mir(152),512, mir(148),522, mir(144),535, mir(140),548, rp(0.28,0.78),10, 5, rf_R);
    quadTaper( ctx, mir(140),548, mir(136),558, mir(130),565,               rp(0.52,0.92), 5, 2, rf_R);

    const rs_R = rootGrad(ctx, mir(245),504, mir(95),512);
    cubicTaper(ctx, mir(244),503, mir(215),510, mir(175),516, mir(144),514, rp(0.08,0.50),12, 7, rs_R);
    quadTaper( ctx, mir(144),514, mir(118),512, mir(96),508,                rp(0.30,0.72),  7, 4, rs_R);

    if (rp(0, 0.35) > 0) {
      ctx.globalAlpha = 0.38;
      quadTaper(ctx, mir(240),498, mir(188),506, mir(142),504, rp(0,0.35), 7, 3.5, "#a06020");
      ctx.globalAlpha = 1;
    }
    if (rp(0, 0.30) > 0) {
      ctx.globalAlpha = 0.28;
      quadTaper(ctx, mir(244),510, mir(188),520, mir(140),518, rp(0,0.30), 6, 3, "#0a0402");
      ctx.globalAlpha = 1;
    }

    // ── Center front root ──
    const rc = rootGrad(ctx, 252,502, 260,555);
    cubicTaper(ctx, 252,502, 254,518, 258,536, 260,554, rp(0.14,0.65), 10, 5, rc);
    quadTaper( ctx, 260,554, 262,566, 258,574,           rp(0.40,0.85),  5, 2, rc);
  }

  // ══════════════════════════════════════════
  // TRUNK — thick, flared, dark oak bark
  // ══════════════════════════════════════════
  if (pTrunk > 0) {
    const bg = barkGrad(ctx, CX, 26);

    // Wide base flare — trunk meets ground with a natural swell
    cubicTaper(ctx, CX,502, CX-12,472, CX+12,444, CX,408, pTrunk, 50, 30, bg);
    // Upper trunk body
    cubicTaper(ctx, CX,412, CX-8,396,  CX+8,382,  CX,370, pTrunk, 30, 24, bg);

    // Bark fissures — organic vertical cracks
    if (pTrunk > 0.22) {
      const fp = mapP(pTrunk, 0.22, 1.0);
      ctx.globalAlpha = 0.44;
      cubicTaper(ctx, CX-3,496, CX+7,465, CX-5,436, CX+2,404, fp, 2.0, 1.3, "#080402");
      ctx.globalAlpha = 0.30;
      cubicTaper(ctx, CX+9,482, CX-6,454, CX+6,424, CX-3,396, fp, 1.5, 0.9, "#080402");
      ctx.globalAlpha = 0.22;
      cubicTaper(ctx, CX-10,470, CX+4,445, CX-4,418, CX+1,390, fp, 1.2, 0.8, "#180a04");
      ctx.globalAlpha = 1;
    }
    // Warm highlight ridge
    if (pTrunk > 0.32) {
      const hp = mapP(pTrunk, 0.32, 1.0);
      ctx.globalAlpha = 0.14;
      cubicTaper(ctx, CX+3,494, CX+3,462, CX+3,432, CX+3,400, hp, 4, 2.2, "#d09050");
      ctx.globalAlpha = 1;
    }
  }

  // ══════════════════════════════════════════
  // HEART — glowing amber, brand centrepiece
  // ══════════════════════════════════════════
  drawHeart(ctx, CX, 355, pHeart);

  // ══════════════════════════════════════════
  // UPPER TRUNK — sage-green, narrowing
  // ══════════════════════════════════════════
  if (pUpper > 0) {
    const ug = branchGrad(ctx, CX, 12);
    cubicTaper(ctx, CX,320, CX-5,292, CX+5,264, CX,232, pUpper, 17, 10, ug);
    if (pUpper > 0.38) {
      const up2 = mapP(pUpper, 0.38, 1.0);
      ctx.globalAlpha = 0.11;
      cubicTaper(ctx, CX+3,314, CX+3,288, CX+3,260, CX+3,232, up2, 2.2, 1.2, "#a0cc58");
      ctx.globalAlpha = 1;
    }
  }

  // ══════════════════════════════════════════
  // WIDE MAIN BOUGHS — sweep out from trunk
  // Emerge at different trunk heights for realism
  // ══════════════════════════════════════════
  if (pBW > 0) {
    const bg = branchGrad(ctx, CX, 15);
    // Left bough — emerges slightly lower, sweeps wide
    const lp = mapP(pBW, 0, 0.58);
    cubicTaper(ctx, CX-5,378, CX-55,355, CX-112,318, CX-162,285, lp, 16, 9, bg);
    // Right bough — slightly higher origin, asymmetric sweep
    const rp = mapP(pBW, 0.10, 0.65);
    cubicTaper(ctx, CX+5,370, CX+58,348, CX+116,310, CX+165,280, rp, 16, 9, bg);
    // Third bough — sweeps back/down left for organic feel
    const p3 = mapP(pBW, 0.20, 0.72);
    cubicTaper(ctx, CX-8,395, CX-55,405, CX-100,398, CX-138,385, p3, 12, 7, bg);
    const p4 = mapP(pBW, 0.25, 0.76);
    cubicTaper(ctx, CX+8,390, CX+55,400, CX+100,395, CX+138,382, p4, 12, 7, bg);

    if (lp > 0.28) {
      ctx.globalAlpha = 0.09;
      cubicTaper(ctx, CX-8,374, CX-58,352, CX-115,315, CX-160,283, lp, 2.2, 1, "#b0d860");
      cubicTaper(ctx, CX+8,366, CX+62,344, CX+119,307, CX+163,278, rp, 2.2, 1, "#b0d860");
      ctx.globalAlpha = 1;
    }
  }

  // ══════════════════════════════════════════
  // UPPER BOUGHS — arch into crown
  // ══════════════════════════════════════════
  if (pBU > 0) {
    const bg = branchGrad(ctx, CX, 11);
    cubicTaper(ctx, CX,282, CX-40,242, CX-80,205, CX-112,170, mapP(pBU,0,0.62),    12, 6.5, bg);
    cubicTaper(ctx, CX,282, CX+40,242, CX+80,205, CX+112,170, mapP(pBU,0.10,0.72), 12, 6.5, bg);
    cubicTaper(ctx, CX,255, CX-2, 212, CX+2, 178, CX,   148,  mapP(pBU,0.05,0.58), 11, 6,   bg);
    // Additional upper boughs for fuller crown
    cubicTaper(ctx, CX-162,285, CX-172,252, CX-178,215, CX-176,178, mapP(pBU,0.12,0.68), 8,4.5,bg);
    cubicTaper(ctx, CX+162,280, CX+172,248, CX+178,212, CX+176,175, mapP(pBU,0.18,0.74), 8,4.5,bg);
    cubicTaper(ctx, CX-138,385, CX-148,355, CX-158,315, CX-168,275, mapP(pBU,0.22,0.75), 8,4.5,bg);
    cubicTaper(ctx, CX+138,382, CX+148,352, CX+158,312, CX+168,272, mapP(pBU,0.28,0.80), 8,4.5,bg);
  }

  // ══════════════════════════════════════════
  // SUB-BRANCHES — from bough tips/midpoints
  // Many more than before, varied origins
  // ══════════════════════════════════════════
  if (pBS > 0) {
    const sg = branchGrad(ctx, CX, 9);
    const mir = (x: number) => CX + (CX - x);
    const p = (i: number) => mapP(pBS, i * 0.038, i * 0.038 + 0.66);

    // From left main bough tip (CX-162, 285)
    cubicTaper(ctx, CX-162,285, CX-182,256, CX-184,222, CX-180,188, p(0),  9, 5, sg);
    cubicTaper(ctx, CX-162,285, CX-170,305, CX-174,328, CX-172,350, p(1),  8,4.5,sg);
    cubicTaper(ctx, CX-162,285, CX-178,272, CX-196,262, CX-212,254, p(2),  7, 4, sg);
    // From mid-bough (CX-112, 300)
    cubicTaper(ctx, CX-118,308, CX-138,278, CX-140,248, CX-136,216, p(3),  8, 4, sg);
    cubicTaper(ctx, CX-82, 328, CX-100,296, CX-100,266, CX-94, 234, p(4), 7.5,4, sg);
    cubicTaper(ctx, CX-42, 358, CX-56,330,  CX-58,298,  CX-52, 268, p(5),  7,3.5,sg);

    // From lower left bough (CX-138, 385)
    cubicTaper(ctx, CX-138,385, CX-150,360, CX-155,330, CX-152,300, p(6),  8,4.5,sg);
    cubicTaper(ctx, CX-138,385, CX-162,368, CX-178,348, CX-188,325, p(7),  7, 4, sg);

    // Right mirrors
    cubicTaper(ctx, mir(CX-162),285, mir(CX-182),256, mir(CX-184),222, mir(CX-180),188, p(0), 9, 5, sg);
    cubicTaper(ctx, mir(CX-162),285, mir(CX-170),305, mir(CX-174),328, mir(CX-172),350, p(1), 8,4.5,sg);
    cubicTaper(ctx, mir(CX-162),285, mir(CX-178),272, mir(CX-196),262, mir(CX-212),254, p(2), 7, 4, sg);
    cubicTaper(ctx, mir(CX-118),308, mir(CX-138),278, mir(CX-140),248, mir(CX-136),216, p(3), 8, 4, sg);
    cubicTaper(ctx, mir(CX-82),328,  mir(CX-100),296, mir(CX-100),266, mir(CX-94),234,  p(4),7.5,4, sg);
    cubicTaper(ctx, mir(CX-42),358,  mir(CX-56),330,  mir(CX-58),298,  mir(CX-52),268,  p(5), 7,3.5,sg);
    cubicTaper(ctx, mir(CX-138),385, mir(CX-150),360, mir(CX-155),330, mir(CX-152),300, p(6), 8,4.5,sg);
    cubicTaper(ctx, mir(CX-138),385, mir(CX-162),368, mir(CX-178),348, mir(CX-188),325, p(7), 7, 4, sg);

    // From upper boughs
    cubicTaper(ctx, CX-112,170, CX-152,160, CX-185,152, CX-200,144, p(8),  8,4, sg);
    cubicTaper(ctx, CX-112,170, CX-116,138, CX-112,106, CX-106,76,  p(9),  7,3.5,sg);
    cubicTaper(ctx, CX-78, 202, CX-98, 172, CX-98, 140, CX-92, 108, p(10), 6.5,3.5,sg);
    cubicTaper(ctx, CX-40, 230, CX-58, 202, CX-56, 172, CX-50, 142, p(11), 6, 3, sg);
    cubicTaper(ctx, mir(CX-112),170, mir(CX-152),160, mir(CX-185),152, mir(CX-200),144, p(8),  8, 4,  sg);
    cubicTaper(ctx, mir(CX-112),170, mir(CX-116),138, mir(CX-112),106, mir(CX-106),76,  p(9),  7, 3.5,sg);
    cubicTaper(ctx, mir(CX-78),202,  mir(CX-98),172,  mir(CX-98),140,  mir(CX-92),108,  p(10),6.5,3.5,sg);
    cubicTaper(ctx, mir(CX-40),230,  mir(CX-58),202,  mir(CX-56),172,  mir(CX-50),142,  p(11), 6, 3,  sg);

    // From far left upper (CX-176, 178)
    cubicTaper(ctx, CX-176,178, CX-198,162, CX-216,144, CX-225,122, p(12), 6,3, sg);
    cubicTaper(ctx, mir(CX-176),178, mir(CX-198),162, mir(CX-216),144, mir(CX-225),122, p(12),6,3,sg);
  }

  // ══════════════════════════════════════════
  // TOP BRANCHES — fill the crown
  // ══════════════════════════════════════════
  if (pBT > 0) {
    const sg = branchGrad(ctx, CX, 7);
    const p = (i: number) => mapP(pBT, i * 0.055, i * 0.055 + 0.62);
    const mir = (x: number) => CX + (CX - x);
    cubicTaper(ctx, CX,148, CX-2,118, CX+2,84,  CX,55,            p(0), 8, 4, sg);
    cubicTaper(ctx, CX,170, CX-55,142, CX-96,118, CX-108,90,       p(1), 7, 3.5, sg);
    cubicTaper(ctx, CX,170, CX+55,142, CX+96,118, CX+108,90,       p(2), 7, 3.5, sg);
    cubicTaper(ctx, CX,100, CX-30,78, CX-42,58,  CX-44,38,         p(3), 5, 2.8, sg);
    cubicTaper(ctx, CX,100, CX+30,78, CX+42,58,  CX+44,38,         p(4), 5, 2.8, sg);
    cubicTaper(ctx, CX-180,188, CX-198,170, CX-208,148, CX-206,120, p(5), 7, 3.5, sg);
    cubicTaper(ctx, mir(CX-180),188, mir(CX-198),170, mir(CX-208),148, mir(CX-206),120, p(6), 7,3.5,sg);
    cubicTaper(ctx, CX-200,144, CX-218,124, CX-222,100, CX-215,76,  p(7), 6, 3,  sg);
    cubicTaper(ctx, mir(CX-200),144, mir(CX-218),124, mir(CX-222),100, mir(CX-215),76, p(8),6,3,sg);
  }

  // ── Tip branches ──
  if (pBTip > 0) {
    const tg = branchGrad(ctx, CX, 5);
    const p = (i: number) => mapP(pBTip, i * 0.045, i * 0.045 + 0.58);
    const mir = (x: number) => CX + (CX - x);
    const tips: [number,number,number,number,number,number][] = [
      [CX-180,188, CX-204,165, CX-202,140],[CX-180,188, CX-216,170, CX-222,145],
      [CX-108,90,  CX-120,68,  CX-116,44], [CX-108,90,  CX-94, 70,  CX-86, 48],
      [CX-92, 108, CX-108,86,  CX-104,62], [CX-50, 142, CX-66, 118, CX-62, 90],
      [CX-44, 38,  CX-52, 20,  CX-46,  4], [CX,55,      CX-14, 34,  CX-10, 14],
      [CX,55,      CX+14, 34,  CX+10,  14],[CX+44,38,   CX+52, 20,  CX+46,  4],
      [CX-225,122, CX-236,100, CX-228, 78],[CX-215,76,  CX-224, 56,  CX-218, 36],
      [CX-168,275, CX-188,258, CX-192,236],[CX-188,325, CX-210,308, CX-215,285],
    ];
    tips.forEach(([x0,y0, qx,qy, x2,y2], i) => {
      quadTaper(ctx, x0,y0, qx,qy, x2,y2, p(i), 4, 2, tg);
      quadTaper(ctx, mir(x0),y0, mir(qx),qy, mir(x2),y2, p(i), 4, 2, tg);
    });
  }

  // ══════════════════════════════════════════
  // LEAF CLUSTERS — dense dome canopy
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

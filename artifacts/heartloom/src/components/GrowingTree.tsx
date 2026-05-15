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

/** Branch sage gradient — low contrast so vertical & angled strokes match */
function branchGrad(ctx: Ctx, _cx: number, _r: number): CanvasGradient {
  // Use a diagonal gradient aligned with the typical branch direction (upper-left → lower-right)
  // so the shading is depth-based rather than position-based, giving consistent colour everywhere.
  const g = ctx.createLinearGradient(0, 580, 500, 0);
  g.addColorStop(0,   "#2e4c10");
  g.addColorStop(0.4, "#486818");
  g.addColorStop(0.7, "#527c20");
  g.addColorStop(1,   "#3c5c14");
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
  // heart removed — shift subsequent windows earlier by ~0.12
  const pUpper  = mapP(progress, 0.26, 0.40);
  const pBW     = mapP(progress, 0.34, 0.50);
  const pBU     = mapP(progress, 0.42, 0.56);
  const pBS     = mapP(progress, 0.50, 0.64);
  const pBT     = mapP(progress, 0.60, 0.72);
  const pBTip   = mapP(progress, 0.68, 0.78);
  const pLeaves = mapP(progress, 0.74, 1.00);

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
  // ground to upper-trunk junction (y 504 → 332) — extended ~30% upward
  // ══════════════════════════════════════════
  if (pTrunk > 0) {
    const bg = barkGrad(ctx, CX, 26);
    // One continuous tapered stroke — wide flare at base narrows smoothly upward
    // endpoint y moved from 372 → 332 to extend trunk upward by ~0.3
    cubicTaper(ctx, CX,504, CX-16,456, CX+10,408, CX,332, pTrunk, 50, 22, bg);

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

  // HEART removed — trunk now continues directly to upper trunk

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

  // ── Wide main boughs (~20% shorter than before) ──
  // Named anchor constants so sub-branches reference the same endpoints
  const LB  = { x: CX-118, y: 294 }; // left main bough tip
  const RB  = { x: CX+118, y: 290 }; // right main bough tip
  const LLB = { x: CX-96,  y: 390 }; // left lower bough tip
  const RLB = { x: CX+96,  y: 386 }; // right lower bough tip

  if (pBW > 0) {
    const bg = branchGrad(ctx, CX, 15);
    cubicTaper(ctx, CX-5,374, CX-44,356, CX-88,320, LB.x,LB.y,    mapP(pBW,0,0.56),    16,8.5,bg);
    cubicTaper(ctx, CX+5,368, CX+46,350, CX+90,316, RB.x,RB.y,    mapP(pBW,0.10,0.64), 16,8.5,bg);
    cubicTaper(ctx, CX-8,392, CX-40,398, CX-72,396, LLB.x,LLB.y,  mapP(pBW,0.20,0.70), 12,6.5,bg);
    cubicTaper(ctx, CX+8,388, CX+40,394, CX+72,392, RLB.x,RLB.y,  mapP(pBW,0.26,0.76), 12,6.5,bg);
  }

  // ── Upper boughs (~20% shorter) ──
  const LUB = { x: CX-86,  y: 182 }; // left upper bough tip
  const RUB = { x: CX+86,  y: 180 }; // right upper bough tip
  const CTR = { x: CX,     y: 156 }; // centre top

  if (pBU > 0) {
    const bg = branchGrad(ctx, CX, 11);
    cubicTaper(ctx, CX,282, CX-32,246, CX-62,210, LUB.x,LUB.y,    mapP(pBU,0,0.62),    12,6, bg);
    cubicTaper(ctx, CX,282, CX+32,246, CX+62,210, RUB.x,RUB.y,    mapP(pBU,0.10,0.72), 12,6, bg);
    cubicTaper(ctx, CX,256, CX-2, 216, CX+2,182,  CTR.x,CTR.y,    mapP(pBU,0.05,0.58), 11,6, bg);
    // Side boughs from wide tip — arc upward naturally
    cubicTaper(ctx, LB.x,LB.y, CX-128,264, CX-138,224, CX-136,188, mapP(pBU,0.12,0.68), 8,4, bg);
    cubicTaper(ctx, RB.x,RB.y, CX+128,260, CX+138,220, CX+136,186, mapP(pBU,0.18,0.74), 8,4, bg);
    // From lower bough — rise inward
    cubicTaper(ctx, LLB.x,LLB.y, CX-106,360, CX-116,320, CX-120,286, mapP(pBU,0.22,0.75), 8,4, bg);
    cubicTaper(ctx, RLB.x,RLB.y, CX+106,356, CX+116,316, CX+120,282, mapP(pBU,0.28,0.80), 8,4, bg);
  }

  // ── Sub-branches — shorter, steeper angles for naturalism ──
  if (pBS > 0) {
    const sg = branchGrad(ctx, CX, 9);
    const mir = (x: number) => CX + (CX - x);
    const p = (i: number) => mapP(pBS, i * 0.04, i * 0.04 + 0.62);

    // From left main bough tip
    cubicTaper(ctx, LB.x,LB.y, LB.x-14,270, LB.x-16,242, LB.x-12,212, p(0), 8,4.5,sg);
    cubicTaper(ctx, LB.x,LB.y, LB.x-8, 314, LB.x-10,334, LB.x-8, 352, p(1), 7,4,  sg);
    cubicTaper(ctx, LB.x,LB.y, LB.x-22,276, LB.x-36,264, LB.x-46,254, p(2), 6,3.5,sg);
    // From mid-bough (about 60% along the left main bough)
    cubicTaper(ctx, CX-88,312, CX-102,284, CX-102,256, CX-96,228,    p(3), 7,4,  sg);
    cubicTaper(ctx, CX-58,332, CX-70, 304, CX-68, 276, CX-62,248,    p(4), 6.5,3.5,sg);
    cubicTaper(ctx, CX-32,356, CX-42, 330, CX-40, 302, CX-36,276,    p(5), 6,3,  sg);
    // From lower bough
    cubicTaper(ctx, LLB.x,LLB.y, LLB.x-12,366, LLB.x-14,342, LLB.x-10,316, p(6), 7,4, sg);
    cubicTaper(ctx, LLB.x,LLB.y, LLB.x-22,372, LLB.x-32,356, LLB.x-38,338, p(7), 6,3.5,sg);

    // Right mirrors
    cubicTaper(ctx, mir(LB.x),LB.y, mir(LB.x-14),270, mir(LB.x-16),242, mir(LB.x-12),212, p(0), 8,4.5,sg);
    cubicTaper(ctx, mir(LB.x),LB.y, mir(LB.x-8), 314, mir(LB.x-10),334, mir(LB.x-8), 352, p(1), 7,4,  sg);
    cubicTaper(ctx, mir(LB.x),LB.y, mir(LB.x-22),276, mir(LB.x-36),264, mir(LB.x-46),254, p(2), 6,3.5,sg);
    cubicTaper(ctx, mir(CX-88),312, mir(CX-102),284, mir(CX-102),256, mir(CX-96),228,    p(3), 7,4,  sg);
    cubicTaper(ctx, mir(CX-58),332, mir(CX-70), 304, mir(CX-68), 276, mir(CX-62),248,    p(4), 6.5,3.5,sg);
    cubicTaper(ctx, mir(CX-32),356, mir(CX-42), 330, mir(CX-40), 302, mir(CX-36),276,    p(5), 6,3,  sg);
    cubicTaper(ctx, mir(LLB.x),LLB.y, mir(LLB.x-12),366, mir(LLB.x-14),342, mir(LLB.x-10),316, p(6), 7,4, sg);
    cubicTaper(ctx, mir(LLB.x),LLB.y, mir(LLB.x-22),372, mir(LLB.x-32),356, mir(LLB.x-38),338, p(7), 6,3.5,sg);

    // From upper boughs
    cubicTaper(ctx, LUB.x,LUB.y, LUB.x-24,166, LUB.x-38,152, LUB.x-44,138, p(8), 7,3.5,sg);
    cubicTaper(ctx, LUB.x,LUB.y, LUB.x-8, 158, LUB.x-6, 130, LUB.x,  104,  p(9), 6,3,  sg);
    cubicTaper(ctx, CX-60,204, CX-76,180, CX-74,154, CX-70,126,               p(10),6,3,  sg);
    cubicTaper(ctx, CX-30,232, CX-44,208, CX-40,182, CX-36,156,               p(11),5.5,3,sg);
    cubicTaper(ctx, mir(LUB.x),LUB.y, mir(LUB.x-24),166, mir(LUB.x-38),152, mir(LUB.x-44),138, p(8), 7,3.5,sg);
    cubicTaper(ctx, mir(LUB.x),LUB.y, mir(LUB.x-8), 158, mir(LUB.x-6), 130, mir(LUB.x),  104,  p(9), 6,3,  sg);
    cubicTaper(ctx, mir(CX-60),204, mir(CX-76),180, mir(CX-74),154, mir(CX-70),126,         p(10),6,3,  sg);
    cubicTaper(ctx, mir(CX-30),232, mir(CX-44),208, mir(CX-40),182, mir(CX-36),156,         p(11),5.5,3,sg);
    // Far upper sub-branch
    cubicTaper(ctx, CX-136,188, CX-148,170, CX-156,152, CX-154,130, p(12), 5.5,2.8,sg);
    cubicTaper(ctx, mir(CX-136),188, mir(CX-148),170, mir(CX-156),152, mir(CX-154),130, p(12),5.5,2.8,sg);
  }

  // ── Top branches — rise toward apex ──
  if (pBT > 0) {
    const sg = branchGrad(ctx, CX, 7);
    const p = (i: number) => mapP(pBT, i * 0.055, i * 0.055 + 0.60);
    const mir = (x: number) => CX + (CX - x);
    cubicTaper(ctx, CTR.x,CTR.y, CX-2,128,  CX+2,98,  CX,68,               p(0), 7,3.5,sg);
    cubicTaper(ctx, CX,182, CX-44,158, CX-78,132, CX-88,106,                p(1), 6.5,3,sg);
    cubicTaper(ctx, CX,182, CX+44,158, CX+78,132, CX+88,106,                p(2), 6.5,3,sg);
    cubicTaper(ctx, CX,108, CX-20,88,  CX-28,70,  CX-30,52,                 p(3), 4.5,2.5,sg);
    cubicTaper(ctx, CX,108, CX+20,88,  CX+28,70,  CX+30,52,                 p(4), 4.5,2.5,sg);
    cubicTaper(ctx, CX-136,188, CX-148,168, CX-154,146, CX-150,122,          p(5), 6,3,  sg);
    cubicTaper(ctx, mir(CX-136),188, mir(CX-148),168, mir(CX-154),146, mir(CX-150),122, p(6),6,3,sg);
    cubicTaper(ctx, LUB.x-50,190, LUB.x-58,172, LUB.x-60,152, LUB.x-56,128, p(7), 5,2.5,sg);
    cubicTaper(ctx, mir(LUB.x-50),190, mir(LUB.x-58),172, mir(LUB.x-60),152, mir(LUB.x-56),128, p(8),5,2.5,sg);
  }

  // ── Tip branches — fine twigs, very thin taper ──
  if (pBTip > 0) {
    const tg = branchGrad(ctx, CX, 5);
    const p = (i: number) => mapP(pBTip, i * 0.05, i * 0.05 + 0.55);
    const mir = (x: number) => CX + (CX - x);
    const tips: [number,number,number,number,number,number][] = [
      [CX-136,188, CX-148,170, CX-144,150],[CX-136,188, CX-158,172, CX-160,152],
      [CX-88,106,  CX-96, 86,  CX-90, 68], [CX-88,106,  CX-76, 86,  CX-70, 68],
      [CX-70,126,  CX-80, 106, CX-76, 88], [CX-36,156,  CX-46, 134, CX-42,114],
      [CX-30,52,   CX-36, 36,  CX-32, 22], [CX,68,      CX-10, 48,  CX-6,  32],
      [CX,68,      CX+10, 48,  CX+6,  32], [CX+30,52,   CX+36, 36,  CX+32, 22],
      [CX-150,122, CX-156,104, CX-150,86], [CX-104,104, CX-112,84,  CX-106,66],
      [LB.x-12,212, LB.x-18,196, LB.x-14,180],
      [LLB.x-10,316, LLB.x-16,300, LLB.x-12,282],
    ];
    tips.forEach(([x0,y0, qx,qy, x2,y2], i) => {
      quadTaper(ctx, x0,y0, qx,qy, x2,y2,         p(i), 3,1.4,tg);
      quadTaper(ctx, mir(x0),y0, mir(qx),qy, mir(x2),y2, p(i), 3,1.4,tg);
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
  const featureList = [...LEFT_FEATURES, ...RIGHT_FEATURES].sort((a, b) => a.index - b.index);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const aspect = 580 / 500;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.round(Math.min(rect.width, 520));
      const height = Math.round(width * aspect);
      const scale = width / 500;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0);
      drawTree(ctx, progressRef.current);
    };

    gsap.set(labelRefs.current.filter(Boolean), { opacity: 0, y: 14 });
    gsap.set(headingRef.current, { opacity: 0, y: 24 });

    function paint() {
      resizeCanvas();
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

      // Mobile feature cards - show them progressively during animation
      const mobileCards = document.querySelectorAll('.mobile-feature-card');
      mobileCards.forEach((card, idx) => {
        const thresholds = [0.52, 0.52, 0.67, 0.67, 0.87, 0.87];
        const threshold = thresholds[idx] || 0.5;
        gsap.to(card, {
          opacity: p >= threshold ? 1 : 0,
          y: p >= threshold ? 0 : 20,
          duration: 0.35,
          overwrite: true
        });
      });
    }

    const createdTriggers: any[] = [];

    ScrollTrigger.matchMedia({
      "(min-width: 768px)": () => {
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
        createdTriggers.push(st);
      },
      "(max-width: 767px)": () => {
        const mobileEnd = Math.max(window.innerHeight * 2.5, 3000);
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${Math.round(mobileEnd)}`,
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            paint();
            syncLabels(self.progress);
          },
        });
        createdTriggers.push(st);
      },
    });

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(canvas);

    paint();
    return () => {
      resizeObserver.disconnect();
      createdTriggers.forEach((trigger) => trigger?.kill?.());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${"var(--parchment)"} 0%, ${"var(--parchment-2)"} 100%)` }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle,var(--brand-sage-30) 1px,transparent 1px)", backgroundSize: "38px 38px" }} />

      <p className="relative z-10 text-xs font-sans font-semibold tracking-[0.22em] uppercase mb-4" style={{ color: "var(--brand-sage)" }}>
        Scroll to grow your legacy
      </p>

      <div className="relative z-10 flex items-center gap-2 w-full max-w-6xl px-4">
        {/* Left labels */}
        <div className="flex-col gap-10 flex-1 items-end pr-4 hidden md:flex">
          {LEFT_FEATURES.map((f) => (
            <div key={f.index} ref={el => { labelRefs.current[f.index] = el; }} className="text-right max-w-[190px]">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "var(--brand-amber)" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "var(--muted-text)" }}>{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-shrink-0 w-full max-w-[520px] relative">
          <canvas
            ref={canvasRef}
            style={{ width: "100%", maxWidth: "520px", aspectRatio: "500 / 580", display: "block" }}
          />

          {/* Mobile feature cards overlay */}
          <div className="absolute inset-0 md:hidden pointer-events-none">
            {featureList.map((f, idx) => (
              <div
                key={f.index}
                className="mobile-feature-card absolute rounded-3xl border border-[color:var(--border-warm)] bg-white/95 backdrop-blur-sm p-3 shadow-lg opacity-0 transform translate-y-5"
                style={{
                  left: idx % 2 === 0 ? '10%' : 'auto',
                  right: idx % 2 === 1 ? '10%' : 'auto',
                  top: `${20 + (idx * 15)}%`,
                  maxWidth: '140px'
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[color:var(--brand-amber)]/15 text-xl flex-shrink-0">
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-sm font-semibold leading-tight" style={{ color: "var(--brand-amber)" }}>{f.title}</p>
                    <p className="text-xs text-[color:var(--muted-text)] leading-tight mt-0.5 line-clamp-2">{f.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right labels */}
        <div className="flex-col gap-10 flex-1 items-start pl-4 hidden md:flex">
          {RIGHT_FEATURES.map((f) => (
            <div key={f.index} ref={el => { labelRefs.current[f.index] = el; }} className="text-left max-w-[190px]">
              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="font-serif text-base font-semibold leading-snug" style={{ color: "var(--brand-amber)" }}>{f.title}</p>
              <p className="text-xs font-sans leading-snug mt-0.5" style={{ color: "var(--muted-text)" }}>{f.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={headingRef} className="relative z-10 text-center mt-12 md:mt-6 px-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-serif mb-2" style={{ color: "var(--charcoal)" }}>
          Your legacy grows with every story you share.
        </h2>
        <p className="text-sm font-sans" style={{ color: "var(--muted-text)" }}>
          From a single memory to a full family history — Heartloom grows with you.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ── Experience data ────────────────────────────────────────
const experience = [
  {
    role: "VP of Creative Design",
    org: "Michigan Advertising & Marketing",
    period: "Sep 2025 — Present",
    details:
      "Lead creative direction for Michigan's premier student advertising and marketing organization. Oversee brand strategy, campaign design, and mentor a team of designers across multiple client accounts.",
  },
  {
    role: "Graphic Designer",
    org: "ArtsEngine",
    period: "Aug 2025 — Present",
    details:
      "Design visual assets, print materials, and digital communications for ArtsEngine's cross-disciplinary arts programs at the University of Michigan.",
  },
  {
    role: "Instructional Aide",
    org: "UMSI",
    period: "Jan 2026 — Present",
    details:
      "Support course instruction at the School of Information, helping students develop design thinking, research methodology, and UX fundamentals.",
  },
  {
    role: "UX/UI Intern",
    org: "Paytm India",
    period: "May — Jul 2025",
    details:
      "Redesigned the micro-merchant loan application flow, reducing drop-off friction and improving accessibility for India's informal economy. Shipped to production within 6 weeks.",
  },
];

// ── Pinboard constants ─────────────────────────────────────
const BOARD_W = 1100;
const BOARD_H = 760;

type PinType = "photo-main" | "photo-2" | "photo-3" | "vinyl" | "camera" | "pantone" | "latte" | "suits";

interface PinItem {
  id: string;
  type: PinType;
  x: number;
  y: number;
  rot: number;
  z: number;
}

interface PillItem {
  id: string;
  x: number;
  y: number;
  rot: number;
  text: string;
  z: number;
}

const INIT_PINS: PinItem[] = [
  { id: "photo-main", type: "photo-main", x: 28,  y: 80,  rot: -4, z: 1 },
  { id: "photo-2",    type: "photo-2",    x: 300, y: 45,  rot:  6, z: 2 },
  { id: "photo-3",    type: "photo-3",    x: 820, y: 390, rot: -7, z: 3 },
  { id: "vinyl",      type: "vinyl",      x: 418, y: 440, rot:  3, z: 4 },
  { id: "camera",     type: "camera",     x: 638, y: 82,  rot: -6, z: 5 },
  { id: "pantone",    type: "pantone",    x: 198, y: 430, rot:  5, z: 6 },
  { id: "latte",      type: "latte",      x: 512, y: 58,  rot: -3, z: 7 },
  { id: "suits",      type: "suits",      x: 868, y: 58,  rot:  4, z: 8 },
];

const INIT_PILLS: PillItem[] = [
  { id: "pill-film",  x: 98,  y: 345, rot: -2, text: "Film photography", z: 9  },
  { id: "pill-harry", x: 372, y: 238, rot:  3, text: "Harry Styles",     z: 10 },
  { id: "pill-edit",  x: 648, y: 360, rot: -4, text: "Editorial design", z: 11 },
  { id: "pill-typo",  x: 730, y: 518, rot:  2, text: "Typography",       z: 12 },
  { id: "pill-figma", x: 288, y: 578, rot: -3, text: "Figma",            z: 13 },
];

function pinDims(type: PinType): { w: number; h: number } {
  switch (type) {
    case "photo-main": return { w: 200, h: 248 };
    case "photo-2":    return { w: 160, h: 204 };
    case "photo-3":    return { w: 160, h: 204 };
    case "vinyl":      return { w: 140, h: 172 };
    case "camera":     return { w: 130, h: 144 };
    case "pantone":    return { w: 100, h: 152 };
    case "latte":      return { w: 120, h: 152 };
    case "suits":      return { w: 130, h: 162 };
  }
}

// ── Thumbtack ──────────────────────────────────────────────
function Thumbtack() {
  return (
    <svg
      width="20" height="28" viewBox="0 0 20 28"
      aria-hidden
      style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 10 }}
    >
      <circle cx="10" cy="9" r="8" fill="#c0392b" />
      <circle cx="8"  cy="7" r="3" fill="rgba(255,255,255,0.3)" />
      <rect x="9" y="16" width="2.5" height="12" rx="1.2" fill="#922b21" />
    </svg>
  );
}

// ── Card visuals ───────────────────────────────────────────
function PolaroidCard({
  src, alt, label, w, photoH,
}: { src?: string; alt?: string; label?: string; w: number; photoH: number }) {
  return (
    <div style={{ width: w, background: "#FFFFFF", padding: "10px 10px 40px" }}>
      <div style={{
        width: "100%", height: photoH,
        background: "#ede9e3",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {src ? (
          <Image
            src={src} alt={alt ?? ""} width={w} height={photoH}
            style={{ objectFit: "cover", objectPosition: "center 35%", width: "100%", height: "100%" }}
          />
        ) : (
          <span style={{ fontSize: 10, color: "#AEADA9", fontFamily: "var(--font-lato)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

function VinylCard() {
  return (
    <div style={{ width: 140, height: 172, position: "relative", overflow: "hidden", flexShrink: 0 }}>
      <Image src="/music.jpeg" alt="Now playing" fill style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 10,
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ width: 92, height: 92, borderRadius: "50%", background: "rgba(10,10,10,0.85)", position: "relative" }}
        >
          {[40, 32, 24, 16].map(r => (
            <div key={r} style={{
              position: "absolute",
              left: `calc(50% - ${r}px)`, top: `calc(50% - ${r}px)`,
              width: r * 2, height: r * 2,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
            }} />
          ))}
          <div style={{
            position: "absolute", inset: "30%", borderRadius: "50%",
            background: "#c0392b",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#111" }} />
          </div>
        </motion.div>
        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-lato)", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
          Now Playing
        </p>
      </div>
    </div>
  );
}

function FilmCameraCard() {
  return (
    <div style={{
      width: 130, height: 144,
      background: "#fafaf8",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8, padding: 14,
    }}>
      <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
        <rect x="4" y="22" width="82" height="44" rx="6" fill="#2d2d2d" />
        <rect x="28" y="14" width="22" height="12" rx="3" fill="#2d2d2d" />
        <rect x="68" y="16" width="14" height="8" rx="2" fill="#2d2d2d" />
        <rect x="0"  y="28" width="8"  height="10" rx="2" fill="#444" />
        <rect x="82" y="28" width="8"  height="10" rx="2" fill="#444" />
        <circle cx="37" cy="44" r="16" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
        <circle cx="37" cy="44" r="12" fill="#222" stroke="#555" strokeWidth="0.8" />
        <circle cx="37" cy="44" r="7"  fill="#111" />
        <circle cx="37" cy="44" r="3"  fill="#0a0a0a" />
        <circle cx="33" cy="40" r="2.2" fill="rgba(255,255,255,0.18)" />
        <circle cx="68" cy="26" r="4" fill="#c0392b" />
        <circle cx="68" cy="26" r="2.5" fill="#e74c3c" />
      </svg>
      <p style={{ fontSize: 9, color: "#AEADA9", fontFamily: "var(--font-lato)", textTransform: "uppercase", letterSpacing: "0.14em", margin: 0 }}>
        35mm
      </p>
    </div>
  );
}

function PantoneCard() {
  return (
    <div style={{ width: 100, height: 152, background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, background: "#6E2334" }} />
      <div style={{ padding: "6px 8px 8px" }}>
        <p style={{ fontSize: 7, fontFamily: "var(--font-lato)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", margin: "0 0 2px" }}>
          PANTONE®
        </p>
        <p style={{ fontSize: 7, fontFamily: "var(--font-lato)", color: "#3D3D3C", margin: 0, letterSpacing: "0.04em" }}>
          19-1664 TCX
        </p>
        <p style={{ fontSize: 6, fontFamily: "var(--font-lato)", color: "#AEADA9", margin: "1px 0 0", letterSpacing: "0.04em" }}>
          Maroon
        </p>
      </div>
    </div>
  );
}

function IcedLatteCard() {
  return (
    <div style={{
      width: 120, height: 152,
      background: "#fdfaf6",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8, padding: 14,
    }}>
      <svg width="50" height="78" viewBox="0 0 50 78" fill="none">
        <path d="M7 12 L5 70 Q5 74 9 74 L41 74 Q45 74 45 70 L43 12 Z" fill="rgba(200,180,150,0.22)" stroke="#c8b896" strokeWidth="1.5" />
        <path d="M7 12 L43 12 L41 24 L9 24 Z" fill="rgba(101,67,33,0.72)" />
        <path d="M7 12 Q25 8 43 12" fill="rgba(255,245,230,0.88)" stroke="rgba(200,180,150,0.5)" strokeWidth="0.8" />
        <rect x="13" y="29" width="10" height="10" rx="2" fill="rgba(220,240,255,0.72)" stroke="rgba(180,210,240,0.8)" strokeWidth="0.8" />
        <rect x="27" y="31" width="9"  height="9"  rx="2" fill="rgba(220,240,255,0.65)" stroke="rgba(180,210,240,0.8)" strokeWidth="0.8" />
        <rect x="17" y="43" width="11" height="10" rx="2" fill="rgba(220,240,255,0.60)" stroke="rgba(180,210,240,0.7)" strokeWidth="0.8" />
        <rect x="31" y="2" width="3.5" height="54" rx="1.5" fill="#c0392b" opacity="0.85" />
      </svg>
      <p style={{ fontSize: 9, color: "#AEADA9", fontFamily: "var(--font-lato)", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
        iced latte
      </p>
    </div>
  );
}

function SuitsCard() {
  return (
    <div style={{
      width: 130, height: 162,
      background: "#0d0d0f",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 6, padding: 16,
    }}>
      <p style={{
        fontSize: 26, fontFamily: "var(--font-playfair)", fontWeight: 400, fontStyle: "italic",
        color: "#FFFFFF", margin: 0, letterSpacing: "0.14em",
      }}>
        SUITS
      </p>
      <div style={{ width: 40, height: 1, background: "#333" }} />
      <p style={{ fontSize: 7, color: "#555", fontFamily: "var(--font-lato)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", margin: 0 }}>
        USA Network
      </p>
    </div>
  );
}

function PinCardContent({ type }: { type: PinType }) {
  switch (type) {
    case "photo-main":
      return (
        <PolaroidCard
          src="/E1EE2EA8-D7F0-4821-B036-DD6E8EFA5C56_1_105_c.jpeg"
          alt="Neha Jaitly"
          w={200} photoH={208}
        />
      );
    case "photo-2":  return <PolaroidCard label="photo 2" w={160} photoH={164} />;
    case "photo-3":  return <PolaroidCard label="photo 3" w={160} photoH={164} />;
    case "vinyl":    return <VinylCard />;
    case "camera":   return <FilmCameraCard />;
    case "pantone":  return <PantoneCard />;
    case "latte":    return <IcedLatteCard />;
    case "suits":    return <SuitsCard />;
  }
}

// ── Pinboard canvas ────────────────────────────────────────
function Pinboard() {
  const [pins, setPins]   = useState<PinItem[]>(INIT_PINS);
  const [pills, setPills] = useState<PillItem[]>(INIT_PILLS);
  const [maxZ, setMaxZ]   = useState(INIT_PILLS[INIT_PILLS.length - 1].z);
  const [dragging, setDragging] = useState<string | null>(null);
  const [hovered, setHovered]   = useState<string | null>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);
  const dragRef  = useRef<{
    id: string; isPin: boolean;
    offX: number; offY: number;
    itemW: number; itemH: number;
  } | null>(null);

  useEffect(() => {
    const obs = new ResizeObserver(([e]) => {
      const s = Math.min(1, e.contentRect.width / BOARD_W);
      scaleRef.current = s;
      setScale(s);
    });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current || !wrapRef.current) return;
      e.preventDefault();
      const cx = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const cy = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const rect = wrapRef.current.getBoundingClientRect();
      const s = scaleRef.current;
      const x = Math.max(0, Math.min(BOARD_W - dragRef.current.itemW, (cx - rect.left) / s - dragRef.current.offX));
      const y = Math.max(0, Math.min(BOARD_H - dragRef.current.itemH, (cy - rect.top)  / s - dragRef.current.offY));
      const { id, isPin } = dragRef.current;
      if (isPin)  setPins(prev  => prev.map(p => p.id === id ? { ...p, x, y } : p));
      else        setPills(prev => prev.map(p => p.id === id ? { ...p, x, y } : p));
    };
    const up = () => { dragRef.current = null; setDragging(null); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup",   up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend",  up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend",  up);
    };
  }, []);

  const startDragPin = (p: PinItem, cx: number, cy: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const s = scaleRef.current;
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setDragging(p.id);
    setPins(prev => prev.map(i => i.id === p.id ? { ...i, z: newZ } : i));
    const dim = pinDims(p.type);
    dragRef.current = { id: p.id, isPin: true, offX: (cx - rect.left) / s - p.x, offY: (cy - rect.top) / s - p.y, itemW: dim.w, itemH: dim.h };
  };

  const startDragPill = (pill: PillItem, cx: number, cy: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const s = scaleRef.current;
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setDragging(pill.id);
    setPills(prev => prev.map(p => p.id === pill.id ? { ...p, z: newZ } : p));
    dragRef.current = { id: pill.id, isPin: false, offX: (cx - rect.left) / s - pill.x, offY: (cy - rect.top) / s - pill.y, itemW: 160, itemH: 36 };
  };

  return (
    <div ref={wrapRef} style={{ width: "100%", minHeight: "80vh", height: BOARD_H * scale + 32, position: "relative" }}>
      <div style={{ width: BOARD_W, height: BOARD_H, position: "relative", transform: `scale(${scale})`, transformOrigin: "top left" }}>

        {/* Pinned cards */}
        {pins.map(p => {
          const dim = pinDims(p.type);
          const active  = dragging === p.id;
          const isHover = hovered === p.id && !active;
          return (
            <div
              key={p.id}
              onMouseDown={e => { e.preventDefault(); startDragPin(p, e.clientX, e.clientY); }}
              onTouchStart={e => startDragPin(p, e.touches[0].clientX, e.touches[0].clientY)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position:  "absolute",
                left:      p.x,
                top:       p.y,
                width:     dim.w,
                height:    dim.h,
                transform: `rotate(${p.rot}deg) scale(${active ? 1.06 : isHover ? 1.04 : 1}) translateY(${active || isHover ? "-4px" : "0"})`,
                transformOrigin: "50% 0%",
                zIndex:    p.z,
                cursor:    active ? "grabbing" : "grab",
                transition: active ? "box-shadow 0.12s" : "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: active
                  ? "0 22px 52px rgba(0,0,0,0.26), 0 6px 18px rgba(0,0,0,0.12)"
                  : isHover
                  ? "0 12px 32px rgba(0,0,0,0.18), 0 3px 10px rgba(0,0,0,0.09)"
                  : "0 4px 18px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)",
                userSelect: "none",
              }}
            >
              <Thumbtack />
              <PinCardContent type={p.type} />
            </div>
          );
        })}

        {/* Pill tags — no thumbtack */}
        {pills.map(pill => {
          const active  = dragging === pill.id;
          const isHover = hovered === pill.id && !active;
          return (
            <div
              key={pill.id}
              onMouseDown={e => { e.preventDefault(); startDragPill(pill, e.clientX, e.clientY); }}
              onTouchStart={e => startDragPill(pill, e.touches[0].clientX, e.touches[0].clientY)}
              onMouseEnter={() => setHovered(pill.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position:  "absolute",
                left:      pill.x,
                top:       pill.y,
                transform: `rotate(${pill.rot}deg) scale(${active || isHover ? 1.04 : 1}) translateY(${active || isHover ? "-2px" : "0"})`,
                zIndex:    pill.z,
                cursor:    active ? "grabbing" : "grab",
                transition: "transform 0.2s ease",
                userSelect: "none",
              }}
            >
              <div style={{
                padding:      "7px 14px",
                border:       "1.5px solid #c8c7c2",
                borderRadius: 20,
                background:   "rgba(255,255,255,0.82)",
                fontSize:     12,
                fontFamily:   "var(--font-lato)",
                color:        "#3D3D3C",
                whiteSpace:   "nowrap",
                letterSpacing: "0.02em",
              }}>
                {pill.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Experience horizontal cards ────────────────────────────
function ExperienceCard({ item }: { item: typeof experience[0] }) {
  return (
    <div style={{
      minWidth:     280,
      padding:      "24px 28px",
      border:       "1px solid #d8d5cf",
      borderRadius: 4,
      background:   "rgba(255,255,255,0.55)",
      flexShrink:   0,
      display:      "flex",
      flexDirection: "column",
      gap:           8,
    }}>
      <p style={{ fontSize: 10, fontFamily: "var(--font-lato)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#AEADA9", margin: 0 }}>
        {item.period}
      </p>
      <p style={{ fontSize: 16, fontFamily: "var(--font-inter)", fontWeight: 400, color: "#111110", margin: 0, lineHeight: 1.3 }}>
        {item.role}
      </p>
      <p style={{ fontSize: 13, color: "#787774", fontFamily: "var(--font-inter)", margin: 0 }}>
        {item.org}
      </p>
      <p style={{ fontSize: 12, color: "#AEADA9", fontFamily: "var(--font-lato)", fontWeight: 300, lineHeight: 1.65, margin: "4px 0 0" }}>
        {item.details}
      </p>
    </div>
  );
}

// ── Polaroid rack (Section 4 — unchanged) ──────────────────
const RACK_W    = 900;
const RACK_H    = 500;
const GRID_STEP = 45;
const POLAROID_W = 160;
const POLAROID_H = 200;

type PolaroidData = { id: number; x: number; y: number; rot: number; z: number };

const INIT_POLAROIDS_1: PolaroidData[] = [
  { id: 1, x: 35,  y: 61,  rot: -5, z: 1 },
  { id: 2, x: 580, y: 61,  rot:  6, z: 2 },
  { id: 3, x: 230, y: 106, rot:  3, z: 3 },
  { id: 4, x: 490, y: 106, rot: -3, z: 4 },
  { id: 5, x: 100, y: 196, rot: -7, z: 5 },
  { id: 6, x: 370, y: 196, rot:  4, z: 6 },
];

const GRID_LINES = (() => {
  const lines: { key: string; d: string }[] = [];
  let i = 0;
  for (let y = GRID_STEP; y < RACK_H; y += GRID_STEP) {
    const a = Math.sin(i * 1.9 + 0.4) * 3.5;
    const b = Math.sin(i * 3.1 + 1.7) * 3.5;
    const c = Math.sin(i * 2.3 + 3.2) * 3.5;
    lines.push({ key: `h${y}`, d: `M -3,${y + a} Q ${RACK_W / 2},${y + b} ${RACK_W + 3},${y + c}` });
    i++;
  }
  for (let x = GRID_STEP; x < RACK_W; x += GRID_STEP) {
    const a = Math.sin(i * 1.9 + 0.4) * 3.5;
    const b = Math.sin(i * 3.1 + 1.7) * 3.5;
    const c = Math.sin(i * 2.3 + 3.2) * 3.5;
    lines.push({ key: `v${x}`, d: `M ${x + a},-3 Q ${x + b},${RACK_H / 2} ${x + c},${RACK_H + 3}` });
    i++;
  }
  return lines;
})();

function ClipSVG() {
  return (
    <svg
      width="24" height="22" viewBox="0 0 24 22"
      style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}
    >
      <rect x="3"    y="0" width="3.5" height="11" rx="1.5" fill="#7A5C2E" />
      <rect x="17.5" y="0" width="3.5" height="11" rx="1.5" fill="#7A5C2E" />
      <rect x="0"    y="9" width="24"  height="11" rx="2.5" fill="#C4956A" />
      <rect x="3"    y="13" width="18" height="2.5" rx="1.2" fill="#A0784A" opacity="0.5" />
    </svg>
  );
}

function PolaroidRack({ initialPolaroids }: { initialPolaroids: PolaroidData[] }) {
  const [polaroids, setPolaroids] = useState<PolaroidData[]>(initialPolaroids);
  const [maxZ, setMaxZ]           = useState(initialPolaroids.length);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [scale, setScale]         = useState(1);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const scaleRef  = useRef(1);
  const dragState = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      const s = Math.min(1, entry.contentRect.width / RACK_W);
      scaleRef.current = s;
      setScale(s);
    });
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragState.current || !wrapRef.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const rect = wrapRef.current.getBoundingClientRect();
      const s = scaleRef.current;
      const x = Math.max(0, Math.min(RACK_W - POLAROID_W, (clientX - rect.left) / s - dragState.current.offsetX));
      const y = Math.max(0, Math.min(RACK_H - POLAROID_H, (clientY - rect.top)  / s - dragState.current.offsetY));
      const id = dragState.current.id;
      setPolaroids(prev => prev.map(p => p.id === id ? { ...p, x, y } : p));
    };
    const onUp = () => { dragState.current = null; setDraggingId(null); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend",  onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend",  onUp);
    };
  }, []);

  const startDrag = (p: PolaroidData, clientX: number, clientY: number) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const s = scaleRef.current;
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setDraggingId(p.id);
    setPolaroids(prev => prev.map(po => po.id === p.id ? { ...po, z: newZ } : po));
    dragState.current = {
      id: p.id,
      offsetX: (clientX - rect.left) / s - p.x,
      offsetY: (clientY - rect.top)  / s - p.y,
    };
  };

  return (
    <div ref={wrapRef} className="w-full" style={{ height: RACK_H * scale + 24 }}>
      <div style={{ width: RACK_W, height: RACK_H, position: "relative", transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <svg
          width={RACK_W} height={RACK_H}
          style={{ position: "absolute", inset: 0, borderRadius: 6, boxShadow: "0 4px 28px rgba(0,0,0,0.09)" }}
        >
          <rect width={RACK_W} height={RACK_H} fill="#FAF8F5" rx="4" />
          {GRID_LINES.map(({ key, d }) => (
            <path key={key} d={d} stroke="#1a1a1a" strokeWidth="1.5" strokeOpacity="0.78" fill="none" strokeLinecap="round" />
          ))}
          <rect x="1" y="1" width={RACK_W - 2} height={RACK_H - 2} fill="none" stroke="#1a1a1a" strokeWidth="2" strokeOpacity="0.82" rx="4" />
        </svg>
        {polaroids.map(p => {
          const active = draggingId === p.id;
          return (
            <div
              key={p.id}
              onMouseDown={e => { e.preventDefault(); startDrag(p, e.clientX, e.clientY); }}
              onTouchStart={e => startDrag(p, e.touches[0].clientX, e.touches[0].clientY)}
              style={{
                position:      "absolute",
                left:          p.x,
                top:           p.y,
                width:         POLAROID_W,
                height:        POLAROID_H,
                background:    "#FFFFFF",
                transformOrigin: "50% 0%",
                transform:     `rotate(${p.rot}deg) scale(${active ? 1.06 : 1})`,
                zIndex:        p.z,
                cursor:        active ? "grabbing" : "grab",
                boxShadow:     active
                  ? "0 18px 44px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)"
                  : "0 3px 12px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.07)",
                transition:    active
                  ? "box-shadow 0.12s ease, transform 0.12s ease"
                  : "box-shadow 0.22s ease, transform 0.22s ease",
                userSelect:    "none",
              }}
            >
              <ClipSVG />
              <div style={{
                position: "absolute",
                top: 12, left: 12, right: 12, bottom: 44,
                background: "#f0ede8",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "10px", color: "#AEADA9", fontFamily: "var(--font-lato)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Photo {p.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImageRack() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: `${RACK_W} / ${RACK_H}` }}>
      <svg
        viewBox={`0 0 ${RACK_W} ${RACK_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 6, boxShadow: "0 4px 28px rgba(0,0,0,0.09)" }}
      >
        <rect width={RACK_W} height={RACK_H} fill="#FAF8F5" rx="4" />
        {GRID_LINES.map(({ key, d }) => (
          <path key={key} d={d} stroke="#1a1a1a" strokeWidth="1.5" strokeOpacity="0.78" fill="none" strokeLinecap="round" />
        ))}
        <rect x="1" y="1" width={RACK_W - 2} height={RACK_H - 2} fill="none" stroke="#1a1a1a" strokeWidth="2" strokeOpacity="0.82" rx="4" />
      </svg>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div style={{ background: "#f5f0ea", minHeight: "100vh", position: "relative" }}>

      {/* Crumpled paper texture overlay */}
      <div
        aria-hidden
        style={{
          position:   "fixed",
          inset:      0,
          pointerEvents: "none",
          zIndex:     0,
          opacity:    0.11,
          mixBlendMode: "multiply" as const,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.045 0.055' numOctaves='5' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "600px 600px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── Section 1: Pinboard hero ───────────────────── */}
        <section className="px-6 md:px-12" style={{ paddingTop: "clamp(32px, 5vw, 64px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}>
          <h1 style={{
            fontFamily:  "var(--font-atma)",
            fontWeight:  600,
            fontSize:    "clamp(2rem, 5vw, 4rem)",
            color:       "#111110",
            lineHeight:  1.1,
            marginBottom: 40,
          }}>
            Hi, I&apos;m Neha
          </h1>
          <Pinboard />
        </section>

        {/* ── Section 2: More about me ───────────────────── */}
        <section className="px-6 md:px-12" style={{ background: "#FAFAF8", paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)", borderTop: "1px solid #E3E2DE" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <h2 style={{
              fontFamily:   "var(--font-atma)",
              fontWeight:   600,
              fontSize:     "clamp(1.5rem, 3vw, 2.5rem)",
              color:        "#111110",
              marginBottom: 32,
              lineHeight:   1.1,
            }}>
              A little more about me
            </h2>
            <p style={{
              fontFamily:   "var(--font-lato)",
              fontSize:     18,
              fontWeight:   300,
              color:        "#3D3D3C",
              lineHeight:   1.7,
              marginBottom: 24,
            }}>
              A graphic and UX designer. I enjoy designing experiences that balance aesthetics and usability,
              combining strong visual systems with thoughtful interaction design. Whether working on branding,
              interfaces, or digital products, I focus on creating designs that feel intentional, clear, and engaging.
            </p>
            <p style={{
              fontFamily: "var(--font-lato)",
              fontSize:   18,
              fontWeight: 300,
              color:      "#787774",
              lineHeight: 1.7,
            }}>
              Fueled by the small details in design and a constant curiosity to keep learning :)
            </p>
          </div>
        </section>

        {/* ── Section 3: Experience horizontal ──────────── */}
        <section className="px-6 md:px-12" style={{ background: "transparent", paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(48px, 6vw, 80px)", borderTop: "1px solid #E3E2DE" }}>
          <span style={{
            display:       "block",
            fontSize:      11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "#AEADA9",
            fontFamily:    "var(--font-lato)",
            marginBottom:  32,
          }}>
            Experience
          </span>
          <>
            <style>{`.exp-scroll::-webkit-scrollbar { display: none; }`}</style>
            <div
              className="exp-scroll"
              style={{
                display:         "flex",
                flexDirection:   "row",
                gap:             24,
                overflowX:       "auto",
                paddingBottom:   8,
                scrollbarWidth:  "none",
                msOverflowStyle: "none" as const,
              }}
            >
              {experience.map(item => (
                <ExperienceCard key={item.org} item={item} />
              ))}
            </div>
          </>
        </section>

        {/* ── Section 4: Behind the Screen (unchanged) ──── */}
        <div
          className="border-t border-[var(--border)]"
          style={{ background: "#ffffff", padding: "48px 0", overflow: "hidden" }}
        >
          <div className="max-w-[1800px] mx-auto px-4 md:px-8">
            <h2
              className="text-center mb-10 text-[var(--ink)]"
              style={{ fontFamily: "var(--font-atma)", fontWeight: 600, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1 }}
            >
              Behind the Screen
            </h2>
            <div className="flex flex-col md:flex-row items-end justify-center" style={{ gap: "40px" }}>
              <div className="w-full md:w-[38vw]">
                <PolaroidRack initialPolaroids={INIT_POLAROIDS_1} />
              </div>
              <div className="w-full md:w-[38vw]">
                <ImageRack />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

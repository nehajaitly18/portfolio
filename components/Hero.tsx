"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const;

const DISPLAY: React.CSSProperties = {
  fontFamily:    "Georgia, serif",
  fontSize:      "clamp(40px, 5.2vw, 74px)",
  fontStyle:     "italic",
  fontWeight:    400,
  lineHeight:    1.1,
  letterSpacing: "-0.025em",
  color:         "var(--ink)",
  display:       "block",
};

function LineReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, ease: EXPO, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

type DoodlePos = { left: number; top: number };
type CircleBox = { left: number; top: number; w: number; h: number };

const SPARKLE_LINES = [
  { x1: 6,  y1: 20, x2: 22, y2: 13, w: 3.2, delay: 1.15 },
  { x1: 30, y1: 6,  x2: 34, y2: 22, w: 3.0, delay: 1.21 },
  { x1: 47, y1: 2,  x2: 41, y2: 18, w: 2.5, delay: 1.27 },
  { x1: 60, y1: 12, x2: 69, y2: 25, w: 3.0, delay: 1.33 },
  { x1: 76, y1: 5,  x2: 82, y2: 19, w: 2.2, delay: 1.39 },
  { x1: 14, y1: 38, x2: 28, y2: 32, w: 2.2, delay: 1.44 },
  { x1: 54, y1: 32, x2: 59, y2: 45, w: 2.5, delay: 1.49 },
  { x1: 72, y1: 36, x2: 84, y2: 30, w: 2.0, delay: 1.54 },
];

export default function Hero() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const hiRef          = useRef<HTMLSpanElement>(null);
  const designerWhoRef = useRef<HTMLSpanElement>(null);

  const [heartPos,  setHeartPos]  = useState<DoodlePos | null>(null);
  const [circleBox, setCircleBox] = useState<CircleBox | null>(null);

  useEffect(() => {
    const measure = () => {
      const c  = containerRef.current;
      const hi = hiRef.current;
      const dw = designerWhoRef.current;
      if (!c || !hi || !dw) return;

      const cR  = c.getBoundingClientRect();
      const hR  = hi.getBoundingClientRect();
      const dwR = dw.getBoundingClientRect();

      setHeartPos({
        left: hR.right - cR.left + 6,
        top:  hR.top   - cR.top  - 16,
      });

      const hPad = 40, vPad = 24;
      setCircleBox({
        left: dwR.left - cR.left - hPad,
        top:  dwR.top  - cR.top  - vPad,
        w:    dwR.width  + hPad * 2,
        h:    dwR.height + vPad * 2,
      });
    };

    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      className="relative flex items-center justify-center min-h-[70vh]"
      style={{ background: "#FFFFFF" }}
    >
      <div
        ref={containerRef}
        className="relative text-center px-6 md:px-16"
        style={{ maxWidth: "1100px", width: "100%" }}
      >

        {/* ── Sparkle dashes: each line draws itself ─────── */}
        <svg
          aria-hidden
          style={{ position: "absolute", top: "-6%", right: "0%", pointerEvents: "none" }}
          width="88" height="66" viewBox="0 0 92 72" fill="none"
        >
          {SPARKLE_LINES.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="#3DB88A"
              strokeWidth={line.w}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.38, ease: EXPO, delay: line.delay }}
            />
          ))}
        </svg>

        {/* ── Line 1 ──────────────────────────────────────── */}
        <LineReveal delay={0.1}>
          <span style={DISPLAY}>
            <span ref={hiRef}>Hi,</span>{" "}I&apos;m Neha
          </span>
        </LineReveal>

        {/* ── Line 2 ──────────────────────────────────────── */}
        <LineReveal delay={0.22}>
          <span style={DISPLAY}>
            I&apos;m a visual{" "}
            <span ref={designerWhoRef}>designer who</span>
          </span>
        </LineReveal>

        {/* ── Line 3 ──────────────────────────────────────── */}
        <LineReveal delay={0.34}>
          <span style={DISPLAY}>
            makes{" "}
            <span className="hl-yellow">thoughtful</span>
            {" "}design
          </span>
        </LineReveal>

        {/* ── Line 4 ──────────────────────────────────────── */}
        <LineReveal delay={0.46}>
          <span style={DISPLAY}>
            feel{" "}
            <span className="hl-teal">effortless</span>
          </span>
        </LineReveal>

        {/* ── Tagline ─────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.72 }}
          style={{
            fontFamily:    "var(--font-lato)",
            fontSize:      "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color:         "var(--ink-4)",
            marginTop:     "clamp(20px, 3vw, 32px)",
          }}
        >
          UX + Graphic Design · University of Michigan
        </motion.p>

        {/* ── Heart doodle: stroke draws itself ───────────── */}
        {heartPos && (
          <svg
            aria-hidden
            style={{
              position:      "absolute",
              left:          heartPos.left,
              top:           heartPos.top,
              pointerEvents: "none",
            }}
            width="44" height="40" viewBox="0 0 46 42" fill="none"
          >
            {/* Fill fades in after stroke finishes drawing */}
            <motion.path
              d="M23,12 C22.5,8 19.5,5 15.5,5.5 C10,6.4 7.5,10.5 8.4,15.2
                 C9.4,21 15.5,27 23,34.5 C30.5,27 36.6,21 37.6,15.2
                 C38.5,10.5 36,6.4 30.5,5.5 C26.5,5 23.5,8 23,12 Z"
              fill="rgba(255,107,149,0.1)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.5 }}
            />
            {/* Stroke draws around the heart */}
            <motion.path
              d="M23,12 C22.5,8 19.5,5 15.5,5.5 C10,6.4 7.5,10.5 8.4,15.2
                 C9.4,21 15.5,27 23,34.5 C30.5,27 36.6,21 37.6,15.2
                 C38.5,10.5 36,6.4 30.5,5.5 C26.5,5 23.5,8 23,12 Z"
              stroke="#FF6B95"
              strokeWidth="2.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: EXPO, delay: 0.85 }}
            />
          </svg>
        )}

        {/* ── Circle scribble: path draws itself ──────────── */}
        {circleBox && (
          <svg
            aria-hidden
            style={{
              position:      "absolute",
              left:          circleBox.left,
              top:           circleBox.top,
              pointerEvents: "none",
              overflow:      "visible",
            }}
            width={circleBox.w}
            height={circleBox.h}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M 10,50 C 8,4 92,-6 92,50 C 92,106 8,104 10,50 Z"
              stroke="#FF85A8"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.05, ease: EXPO, delay: 1.0 }}
            />
            {/* Overlap tail — hand-drawn overlap detail */}
            <motion.path
              d="M 10,50 C 9,35 12,18 22,8"
              stroke="#FF85A8"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 0.4, ease: EXPO, delay: 1.9 }}
            />
          </svg>
        )}

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EXPO   = [0.16, 1, 0.3, 1] as const;
const BOUNCE = { type: "spring" as const, stiffness: 260, damping: 20 };

const DISPLAY: React.CSSProperties = {
  fontFamily:    "var(--font-playfair)",
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

export default function Hero() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const hiRef           = useRef<HTMLSpanElement>(null);
  const designerWhoRef  = useRef<HTMLSpanElement>(null);

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
      {/* Text container — all doodles are positioned relative to this */}
      <div
        ref={containerRef}
        className="relative text-center px-6 md:px-16"
        style={{ maxWidth: "1100px", width: "100%" }}
      >

        {/* ── Sparkle dashes: top-right of block ────────────── */}
        <motion.svg
          aria-hidden
          style={{ position: "absolute", top: "-6%", right: "0%", pointerEvents: "none" }}
          width="88" height="66" viewBox="0 0 92 72" fill="none"
          initial={{ opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...BOUNCE, delay: 1.15 }}
        >
          <line x1="6"  y1="20" x2="22" y2="13" stroke="#3DB88A" strokeWidth="3.2" strokeLinecap="round"/>
          <line x1="30" y1="6"  x2="34" y2="22" stroke="#3DB88A" strokeWidth="3"   strokeLinecap="round"/>
          <line x1="47" y1="2"  x2="41" y2="18" stroke="#3DB88A" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="60" y1="12" x2="69" y2="25" stroke="#3DB88A" strokeWidth="3"   strokeLinecap="round"/>
          <line x1="76" y1="5"  x2="82" y2="19" stroke="#3DB88A" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="14" y1="38" x2="28" y2="32" stroke="#3DB88A" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="54" y1="32" x2="59" y2="45" stroke="#3DB88A" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="72" y1="36" x2="84" y2="30" stroke="#3DB88A" strokeWidth="2"   strokeLinecap="round"/>
        </motion.svg>

        {/* ── Line 1 ─────────────────────────────────────────── */}
        <LineReveal delay={0.1}>
          <span style={DISPLAY}>
            <span ref={hiRef}>Hi,</span>{" "}I'm Neha
          </span>
        </LineReveal>

        {/* ── Line 2 ─────────────────────────────────────────── */}
        <LineReveal delay={0.22}>
          <span style={DISPLAY}>
            I'm a visual{" "}
            <span ref={designerWhoRef}>designer who</span>
          </span>
        </LineReveal>

        {/* ── Line 3 ─────────────────────────────────────────── */}
        <LineReveal delay={0.34}>
          <span style={DISPLAY}>
            makes{" "}
            <span className="hl-yellow">thoughtful</span>
            {" "}design
          </span>
        </LineReveal>

        {/* ── Line 4 ─────────────────────────────────────────── */}
        <LineReveal delay={0.46}>
          <span style={DISPLAY}>
            feel{" "}
            <span className="hl-teal">effortless</span>
          </span>
        </LineReveal>

        {/* ── Heart doodle ──────────────────────────────────── */}
        {heartPos && (
          <motion.svg
            aria-hidden
            style={{
              position: "absolute",
              left: heartPos.left,
              top:  heartPos.top,
              pointerEvents: "none",
            }}
            width="44" height="40" viewBox="0 0 46 42" fill="none"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...BOUNCE, delay: 0.85 }}
          >
            <path
              d="M23,12 C22.5,8 19.5,5 15.5,5.5 C10,6.4 7.5,10.5 8.4,15.2
                 C9.4,21 15.5,27 23,34.5 C30.5,27 36.6,21 37.6,15.2
                 C38.5,10.5 36,6.4 30.5,5.5 C26.5,5 23.5,8 23,12 Z"
              stroke="#FF6B95" strokeWidth="2.3"
              fill="rgba(255,107,149,0.1)"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </motion.svg>
        )}

        {/* ── Circle scribble around "designer who" ─────────── */}
        {circleBox && (
          <motion.svg
            aria-hidden
            style={{
              position: "absolute",
              left: circleBox.left,
              top:  circleBox.top,
              pointerEvents: "none",
              overflow: "visible",
            }}
            width={circleBox.w}
            height={circleBox.h}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...BOUNCE, delay: 1.0 }}
          >
            {/* vector-effect keeps stroke width constant regardless of SVG stretching */}
            <path
              d="M 10,50 C 8,4 92,-6 92,50 C 92,106 8,104 10,50 Z"
              stroke="#FF85A8" strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Hand-drawn overlap detail at start of stroke */}
            <path
              d="M 10,50 C 9,35 12,18 22,8"
              stroke="#FF85A8" strokeWidth="4" strokeOpacity="0.35"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          </motion.svg>
        )}

      </div>
    </section>
  );
}

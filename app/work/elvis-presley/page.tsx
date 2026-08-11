"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// ── Crossfade carousel ────────────────────────────────────────
const LOOP_IMAGES = [
  "/loop 1.png",
  "/loop 2.png",
  "/loop 3.png",
  "/loop 4.png",
  "/loop 5.png",
];

function CrossfadeCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % LOOP_IMAGES.length;
      });
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
      {LOOP_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Loop image ${i + 1}`}
          style={{
            position:   "absolute",
            inset:      0,
            width:      "100%",
            height:     "100%",
            objectFit:  "contain",
            opacity:    i === current ? 1 : 0,
            transition: i === current || i === prev
              ? "opacity 900ms ease-in-out"
              : "none",
          }}
        />
      ))}
    </div>
  );
}

// ── Typography ────────────────────────────────────────────────
const T = {
  projectTitle: {
    fontFamily:    "Georgia, serif",
    fontStyle:     "normal",
    fontWeight:    400,
    fontSize:      "clamp(16px, 2.5vw, 26px)",
    lineHeight:    1.06,
    letterSpacing: "-0.02em",
    color:         "var(--ink)",
  } as React.CSSProperties,

  body: {
    fontFamily: "var(--font-lato)",
    fontWeight: 400,
    fontStyle:  "normal",
    fontSize:   "16px",
    lineHeight: 1.75,
    color:      "var(--ink-2)",
  } as React.CSSProperties,
};

// ── Page ──────────────────────────────────────────────────────
export default function ElvisPresleyPage() {
  const controls = useAnimation();
  const router   = useRouter();

  const handleBack = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await controls.start({
      opacity: 0,
      y: 10,
      transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1] },
    });
    router.push("/#projects");
  };

  return (
    <motion.div className="bg-[var(--bg)]" animate={controls} style={{ marginTop: "-64px" }}>

      {/* ── 1. Hero Image — full-bleed ───────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.png"
        alt="Through the Cover — hero"
        style={{
          display:  "block",
          width:    "100%",
          height:   "auto",
          maxWidth: "100vw",
          paddingTop: "64px",
        }}
      />

      {/* ── 2. Title + Text Section ───────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 pb-16">

        <h1 style={{ ...T.projectTitle, marginBottom: "10px" }}>
          Elvis Presley&rsquo;s Albums and the Stories They Told
        </h1>

        <p
          style={{
            fontFamily:    '"proxima-nova", sans-serif',
            fontWeight:    400,
            fontSize:      "13px",
            lineHeight:    1.4,
            letterSpacing: "0.04em",
            color:         "var(--ink-3)",
            marginBottom:  "48px",
          }}
        >
          2025 &middot; Publication &middot; Adobe InDesign
        </p>

        <div style={{ display: "flex", gap: "64px", alignItems: "flex-start" }}>

          {/* Left: section heading */}
          <div style={{ flexShrink: 0, width: "200px" }}>
            <h2
              style={{
                fontFamily:    "Georgia, serif",
                fontWeight:    400,
                fontSize:      "24px",
                lineHeight:    1.3,
                letterSpacing: "-0.01em",
                color:         "var(--ink)",
              }}
            >
              About the Project
            </h2>
          </div>

          {/* Right: body paragraphs */}
          <div style={{ flex: 1 }}>
            <p style={T.body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p style={{ ...T.body, marginTop: "24px" }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit.
            </p>

            <p style={{ ...T.body, marginTop: "24px" }}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
          </div>

        </div>
      </div>

      {/* ── 3. Spread 1 & 2 — full-bleed, side by side ──────── */}
      <div style={{ display: "flex", width: "100%", maxWidth: "100vw", gap: "24px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/comeback.png"
          alt="Publication spread 1"
          style={{
            display:    "block",
            width:      "calc(50% - 12px)",
            height:     "auto",
            flexShrink: 0,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/spread 2.png"
          alt="Publication spread 2"
          style={{
            display:    "block",
            width:      "calc(50% - 12px)",
            height:     "auto",
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── 4. Second Text Section ───────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div style={{ display: "flex", gap: "64px", alignItems: "flex-start" }}>

          <div style={{ flexShrink: 0, width: "200px" }}>
            <h2
              style={{
                fontFamily:    "Georgia, serif",
                fontWeight:    400,
                fontSize:      "24px",
                lineHeight:    1.3,
                letterSpacing: "-0.01em",
                color:         "var(--ink)",
              }}
            >
              Section Heading
            </h2>
          </div>

          <div style={{ flex: 1 }}>
            <p style={T.body}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p style={{ ...T.body, marginTop: "24px" }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>

        </div>
      </div>

      {/* ── 5. Loop — 50/50 full-bleed split ─────────────────── */}
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "50vw 50vw",
          width:               "100vw",
          minHeight:           "600px",
        }}
      >
        {/* Left: crossfade carousel */}
        <div style={{ width: "100%", overflow: "hidden" }}>
          <CrossfadeCarousel />
        </div>

        {/* Right: placeholder on clean white */}
        <div
          style={{
            background:     "#FFFFFF",
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "center",
            padding:        "64px 48px",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-geist-mono)",
              fontSize:      "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         "var(--ink-4)",
              marginBottom:  "24px",
            }}
          >
            Publication Details
          </p>
          <p style={T.body}>Placeholder content goes here.</p>
        </div>
      </div>

    </motion.div>
  );
}

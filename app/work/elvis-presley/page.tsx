"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import BackButton from "@/components/BackButton";

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
    fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
    lineHeight:    1.15,
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
    router.push("/#work");
  };

  return (
    <>
    <style>{`@media (max-width: 767px) { .elvis-page { margin-top: -56px !important; } }`}</style>
    <motion.div className="elvis-page bg-[var(--bg)]" animate={controls} style={{ marginTop: "-64px" }}>
      <BackButton />

      {/* ── 1. Hero Image — full-bleed ───────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/intro page.png"
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
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-16">

        <h1 style={{ ...T.projectTitle, marginBottom: "10px" }}>
          Elvis Presley&rsquo;s Albums and the Stories They Told
        </h1>

        <p
          style={{
            fontFamily:    "var(--font-lato)",
            fontStyle:     "italic",
            fontWeight:    400,
            fontSize:      "15px",
            lineHeight:    1.6,
            letterSpacing: "-0.028em",
            color:         "var(--ink-4)",
            marginBottom:  "48px",
          }}
        >
          2025 &middot; Publication &middot; Adobe InDesign
        </p>

        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16">

          {/* Left: section heading */}
          <div className="md:shrink-0 md:w-[200px]">
            <h2
              style={{
                fontFamily:    "Georgia, serif",
                fontWeight:    400,
                fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
                lineHeight:    1.1,
                letterSpacing: "-0.02em",
                color:         "var(--ink)",
              }}
            >
              About the Project
            </h2>
          </div>

          {/* Right: body paragraphs */}
          <div style={{ flex: 1 }}>
            <p style={T.body}>
              Through the Cover is an editorial book exploring Elvis Presley&rsquo;s 1970s albums as a cultural time capsule. Organized into four thematic chapters — Cinema and Song, Rock &apos;n&apos; Roll, Pop Appeal, and Glamour of the Disco. The book pairs his albums with the cultural moments they reflected, treating his music and image as a visual record of the decade.
            </p>

          </div>

        </div>
      </div>

      {/* ── 3. Spread 1 & 2 — full-bleed, side by side ──────── */}
      <div style={{ display: "flex", width: "100%", maxWidth: "100vw", gap: "24px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/loop 2.png"
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
          src="/elvis disco gallery.jpg"
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
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16">

          <div className="md:shrink-0 md:w-[200px]">
            <h2
              style={{
                fontFamily:    "Georgia, serif",
                fontWeight:    400,
                fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
                lineHeight:    1.1,
                letterSpacing: "-0.02em",
                color:         "var(--ink)",
              }}
            >
              The Story
            </h2>
          </div>

          <div style={{ flex: 1 }}>
            <p style={T.body}>
              The project asks a simple question: what can an album cover tell us about the moment it was made in? Each chapter pairs select Elvis albums with the cultural currents of the time — from his rock &apos;n&apos; roll rebellion to his global reach with Aloha from Hawaii. In the disco chapter, for instance, the book connects his glam stage looks to the era&rsquo;s culture of spectacle and escapism. Across the book, each album becomes less a catalog entry and more a marker of what was happening in Elvis&rsquo;s life and the world around him.
            </p>
          </div>

        </div>
      </div>

      {/* ── 5. Spread Gallery — 2 × 3 grid ──────────────────── */}
      <div className="px-[6vw] py-16" style={{ display: "none" }}>
        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "16px" }}>
          {[
            "/elvis 1.png",
            "/elvis 2.png",
            "/elvis 3.png",
            "/elvis 4.png",
            "/elvis 5.png",
            "/elvis 6.png",
          ].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`Publication spread ${i + 1}`}
              style={{
                display:   "block",
                width:     "100%",
                height:    "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── 6. Visual Identity ───────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-4">
        <h2
          style={{
            fontFamily:    "Georgia, serif",
            fontWeight:    400,
            fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
            lineHeight:    1.1,
            letterSpacing: "-0.02em",
            color:         "var(--ink)",
            marginBottom:  "32px",
          }}
        >
          Visual Identity
        </h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/elvis visual identity.- large png.png"
          alt="Visual identity — typeface and colour palette"
          style={{ display: "block", width: "100%", height: "auto", marginLeft: "-12px" }}
        />
      </div>

      {/* ── 7. Three images — grid, equal height ────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", width: "100%", background: "#ffffff" }}>
        {[
          { src: "/loop 1.png",     alt: "Loop image 1" },
          { src: "/loop 3.png",     alt: "Loop image 3" },
          { src: "/elvis flap.png", alt: "Elvis flap"   },
        ].map(({ src, alt }) => (
          <div key={src} style={{ height: "400px", background: "#ffffff" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

    </motion.div>
    </>
  );
}

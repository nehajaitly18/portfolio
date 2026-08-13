"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

const T = {
  body: {
    fontFamily: "var(--font-lato)",
    fontWeight: 400,
    fontStyle:  "normal",
    fontSize:   "16px",
    lineHeight: 1.75,
    color:      "var(--ink-2)",
  } as React.CSSProperties,

  sectionHeading: {
    fontFamily:    "Georgia, serif",
    fontStyle:     "normal",
    fontWeight:    400,
    fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
    lineHeight:    1.1,
    letterSpacing: "-0.02em",
    color:         "var(--ink)",
  } as React.CSSProperties,
};

function IconCycler() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % 2), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        {["/icon%201.png", "/icon%202.png"].map((src, i) => (
          <div
            key={src}
            style={{
              position:   i === 0 ? "relative" : "absolute",
              inset:      i === 0 ? undefined : 0,
              opacity:    i === idx ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Icon set ${i + 1}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "16px" }}>
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Icon set ${i + 1}`}
            style={{
              width:        "8px",
              height:       "8px",
              borderRadius: "50%",
              border:       "1.5px solid var(--ink-3)",
              background:   i === idx ? "var(--ink-3)" : "transparent",
              padding:      0,
              cursor:       "pointer",
              transition:   "background 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PennyStampsPage() {
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
    <style>{`
      @media (max-width: 767px) {
        .penny-page { margin-top: -56px !important; }
        .penny-img-pair img { height: 260px !important; }
      }
    `}</style>
    <motion.div className="penny-page bg-[var(--bg)]" animate={controls} style={{ marginTop: "-64px" }}>
      <BackButton />

      {/* ── 1. Hero Image — full-bleed ───────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/1.png"
        alt="Stamps Wayfinding — hero"
        style={{
          display:         "block",
          width:           "100%",
          height:          "85vh",
          maxHeight:       "85vh",
          objectFit:       "cover",
          objectPosition:  "center",
        }}
      />

      {/* ── 2. Title + Subtitle ───────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-12 pb-0">
        <a
          href="/"
          onClick={handleBack}
          style={{
            fontFamily:     "var(--font-lato)",
            fontSize:       "15px",
            letterSpacing:  "0.12em",
            textTransform:  "uppercase" as const,
            color:          "var(--ink-4)",
            opacity:        0.38,
            display:        "inline-block",
            textDecoration: "none",
            marginBottom:   "32px",
          }}
          className="lg:hidden hover:opacity-70 transition-opacity duration-200"
        >
          ← Work
        </a>

        <h1 style={{
          fontFamily:    "Georgia, serif",
          fontStyle:     "normal",
          fontWeight:    400,
          fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
          lineHeight:    1.15,
          letterSpacing: "-0.02em",
          color:         "var(--ink)",
        }}>
          Penny W. Stamps Wayfinding
        </h1>

        <p style={{
          fontFamily:    "var(--font-lato)",
          fontStyle:     "italic",
          fontSize:      "15px",
          fontWeight:    400,
          letterSpacing: "-0.028em",
          color:         "var(--ink-4)",
          lineHeight:    1.6,
          marginTop:     "8px",
        }}>
          Illustrator, Photoshop
        </p>
      </div>

      {/* ── 3. Overview ──────────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-12 pb-10">
        <h2 style={{ ...T.sectionHeading, marginBottom: "24px" }}>Overview</h2>
        <p style={T.body}>
          This project focused on redesigning the school&apos;s wayfinding system to establish
          visual consistency, improve clarity, and create a cohesive navigation.
        </p>
      </div>

      {/* ── 4. Problem ───────────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pb-24">
        <h2 style={{ ...T.sectionHeading, marginBottom: "24px" }}>Problem</h2>
        <p style={T.body}>
          The Penny W. Stamps School of Art and Design struggles with an outdated and
          inconsistent signage and wayfinding system. The lack of a clear visual and structural
          system makes navigation confusing, particularly for new students and visitors. As a
          result, users often rely on trial and error rather than intuitive cues, creating
          friction in how people experience and move through the school.
        </p>

        {/* Problem image: phone version on mobile, full version on desktop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/stamps problem.png"
          alt="Problem — existing signage"
          className="hidden md:block"
          style={{ width: "calc(100% + 20px)", height: "auto", marginTop: "40px", marginLeft: "-20px" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/stamps problem phone.png"
          alt="Problem — existing signage"
          className="block md:hidden w-full"
          style={{ height: "auto", marginTop: "40px" }}
        />
      </div>

      {/* ── 5. Color Palette ─────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pb-24">
        <h2 style={{ ...T.sectionHeading, marginBottom: "40px" }}>Color Palette</h2>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16 items-start">

          {/* Primary Colors */}
          <div>
            <p style={{
              fontFamily:    "var(--font-lato)",
              fontSize:      "11px",
              fontWeight:    400,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color:         "var(--ink-4)",
              textAlign:     "center",
              marginBottom:  "20px",
            }}>
              Primary Colors
            </p>
            <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-5">
              {[
                { hex: "#e2758d", label: "Studios" },
                { hex: "#dd813f", label: "Resources" },
                { hex: "#ffc808", label: "Common Spaces" },
                { hex: "#026f98", label: "Admin" },
                { hex: "#66bdc1", label: "Utility" },
                { hex: "#6f8994", label: "Taubman" },
              ].map(({ hex, label }) => (
                <div key={hex} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width:          "88px",
                    height:         "88px",
                    borderRadius:   "50%",
                    background:     hex,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily:    "var(--font-lato)",
                      fontSize:      "9px",
                      fontWeight:    400,
                      letterSpacing: "0.04em",
                      color:         "#ffffff",
                    }}>
                      {hex}
                    </span>
                  </div>
                  <span style={{
                    fontFamily:    "var(--font-lato)",
                    fontSize:      "11px",
                    fontWeight:    400,
                    color:         "var(--ink-3)",
                    textAlign:     "center",
                    letterSpacing: "0.02em",
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div>
            <p style={{
              fontFamily:    "var(--font-lato)",
              fontSize:      "11px",
              fontWeight:    400,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color:         "var(--ink-4)",
              textAlign:     "center",
              marginBottom:  "20px",
            }}>
              Secondary Colors
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {[
                { hex: "#ffeee2", dark: true },
                { hex: "#373838", dark: false },
              ].map(({ hex, dark }) => (
                <div key={hex} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width:          "88px",
                    height:         "88px",
                    borderRadius:   "50%",
                    background:     hex,
                    border:         dark ? "1px solid var(--border)" : "none",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily:    "var(--font-lato)",
                      fontSize:      "9px",
                      fontWeight:    400,
                      letterSpacing: "0.04em",
                      color:         dark ? "var(--ink-2)" : "#ffffff",
                    }}>
                      {hex}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── 6. Wayfinding & Signage Icons ────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 pb-24">
        <h2 style={{ ...T.sectionHeading, marginBottom: "80px" }}>
          Wayfinding &amp; Signage Icons
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Left: static icons image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons labelled.png"
            alt="Wayfinding icons labelled"
            className="w-full md:w-1/2"
            style={{ height: "auto", display: "block" }}
          />

          {/* Right: icon loop */}
          <div className="w-full md:w-1/2">
            <IconCycler />
          </div>
        </div>
      </div>

      {/* ── 7. Full-width image pair ──────────────────────────── */}
      <div className="penny-img-pair flex flex-col md:flex-row" style={{ gap: "8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon final.png"
          alt="Icon final"
          className="w-full md:w-1/2"
          style={{ height: "560px", objectFit: "cover", display: "block" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/abc.png"
          alt="ABC signage"
          className="w-full md:w-1/2"
          style={{ height: "560px", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* ── 8. Full-width map ────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/after map.png"
        alt="Wayfinding map"
        style={{ display: "block", width: "100%", height: "auto" }}
      />

      {/* ── 9. Full-width image pair ──────────────────────────── */}
      <div className="penny-img-pair flex flex-col md:flex-row" style={{ gap: "8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Building Staircase Mockup.png"
          alt="Building staircase mockup"
          className="w-full md:w-1/2"
          style={{ height: "560px", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/texture.png"
          alt="Signage texture detail"
          className="w-full md:w-1/2"
          style={{ height: "560px", objectFit: "cover", display: "block" }}
        />
      </div>

    </motion.div>
    </>
  );
}

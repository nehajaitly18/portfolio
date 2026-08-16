"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";

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

  sectionHeading: {
    fontFamily:    "Georgia, serif",
    fontStyle:     "normal",
    fontWeight:    400,
    fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
    lineHeight:    1.1,
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

  mono: {
    fontFamily:    "var(--font-lato)",
    fontSize:      "10px",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color:         "var(--ink-4)",
  } as React.CSSProperties,
};

// Circle centers measured from raw pixel data (3399×1728 source image)
// x = center_x / 3399, y = center_y / 1728
const CIRCLE_POS = [
  { x: 28.2, y: 42.4 },
  { x: 42.7, y: 42.4 },
  { x: 57.3, y: 42.4 },
  { x: 71.8, y: 42.4 },
  { x: 28.5, y: 70.5 },
  { x: 43.1, y: 70.5 },
  { x: 57.6, y: 70.5 },
  { x: 72.1, y: 70.5 },
];

const TOTAL_ITEMS = 8;   // 7 stamps + 1 free-drink circle
const STAMPED_COUNT = 7; // circles 0–6 get the stamp icon

// ms before first stamp fires after the front card appears
const STAMP_OFFSET = 250;

function LoyaltyCardSection() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const [frontVisible, setFrontVisible] = useState(false);
  const [stamped,      setStamped]      = useState<boolean[]>(Array(TOTAL_ITEMS).fill(false));
  const hasAnimated   = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          // Front card pops in immediately
          setFrontVisible(true);
          // Stamps stagger in after the front card settles
          for (let i = 0; i < TOTAL_ITEMS; i++) {
            setTimeout(() => {
              setStamped((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, STAMP_OFFSET + i * 140);
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      hasAnimated.current = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="steamy-loyalty-section"
      style={{
        position:        "relative",
        width:           "100%",
        minHeight:       "90vh",
        overflow:        "hidden",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "64px 32px",
      }}
    >
      <style>{`
        @keyframes steamy-tilt {
          0%, 100% { transform: rotate(-2deg); }
          50%       { transform: rotate(2deg);  }
        }
        @media (max-width: 640px) {
          .steamy-card-pair {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .steamy-loyalty-section {
            padding: 48px 20px !important;
          }
        }
      `}</style>

      {/* Background — full-bleed espresso photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/espresso.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position:       "absolute",
          inset:          0,
          width:          "100%",
          height:         "100%",
          objectFit:      "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />

      {/* Card pair — front left, stamp right */}
      <div
        className="steamy-card-pair"
        style={{
          position:       "relative",
          zIndex:         1,
          display:        "flex",
          flexDirection:  "row",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "32px",
          width:          "100%",
          maxWidth:       "1100px",
        }}
      >
        {/* Front card — outer: idle tilt, inner: entrance scale/fade */}
        <div
          style={{
            flex:             "1 1 0",
            minWidth:         0,
            maxWidth:         "520px",
            animation:        frontVisible
              ? "steamy-tilt 3.5s ease-in-out 0.5s infinite"
              : "none",
          }}
        >
          <div
            style={{
              opacity:    frontVisible ? 1 : 0,
              transform:  `scale(${frontVisible ? 1 : 0.85})`,
              transition: "opacity 400ms ease-out, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/loyalty frot.png"
              alt="Steamy Sips loyalty card — front"
              style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Stamp card — outer: idle tilt (starts 350ms after front), inner: content */}
        <div
          style={{
            flex:      "1 1 0",
            minWidth:  0,
            maxWidth:  "520px",
            animation: frontVisible
              ? "steamy-tilt 3.8s ease-in-out 0.85s infinite"
              : "none",
          }}
        >
        <div style={{ position: "relative" }}>
          {/* Card background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/loyalty card.png"
            alt="Steamy Sips loyalty card — buy 7 and the 8th is on us"
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {/* Circles 0–6: stamp icon. Circle 7: FREE DRINK! text. */}
          {/* Diameter = 12.1% of card width (412px / 3399px source) */}
          {CIRCLE_POS.map((pos, i) => {
            const sharedStyle: React.CSSProperties = {
              position:      "absolute",
              left:          `${pos.x}%`,
              top:           `${pos.y}%`,
              width:         "12.1%",
              transform:     `translate(-50%, -50%) scale(${stamped[i] ? 1 : 0.7})`,
              opacity:       stamped[i] ? 1 : 0,
              transition:    "opacity 350ms ease-out, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              borderRadius:  "50%",
              overflow:      "hidden",
              pointerEvents: "none",
            };

            if (i < STAMPED_COUNT) {
              return (
                <div key={i} style={sharedStyle}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/stamp.png"
                    alt={`Stamp ${i + 1}`}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              );
            }

            // Circle 7 — "ON US!" image badge (loyalty font.png, same dims as stamp)
            return (
              <div key={i} style={sharedStyle}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/loyalty font.png"
                  alt="On us!"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}

export default function SteamySipsPage() {
  const router = useRouter();

  const handleBack = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/#work");
  };

  return (
    <div className="bg-[var(--bg)]">
      <BackButton />

      {/* Hero — full width, natural proportions */}
      <div className="w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/plastic cup hero.png"
          alt="Steamy Sips — plastic cup hero"
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain", marginTop: "-5%" }}
        />
      </div>

      {/* Content */}
      <div
        className="mx-auto px-6 md:px-10 pt-12 pb-32"
        style={{ maxWidth: "960px" }}
      >
        {/* Title section */}
        <div className="pb-10">
          <a
            href="/"
            onClick={handleBack}
            style={{ ...T.mono, textDecoration: "none", paddingTop: "10px", paddingBottom: "10px" }}
            className="inline-flex items-center gap-2 mb-8 lg:hidden hover:text-[var(--ink-3)] transition-colors cursor-pointer"
          >
            ← Work
          </a>

          <h1 style={T.projectTitle}>Steamy Sips</h1>

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
            Adobe Illustrator, Photoshop · 2024
          </p>
        </div>

        {/* The Concept section */}
        <section className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
          <h2 style={T.sectionHeading} className="mb-6">The Concept</h2>
          <p style={T.body} className="mt-5">
            Steamy Sips is a self-directed coffee shop identity built around bold lettering and a dark olive and cream palette. The name plays on steam rising off a fresh cup, which became the starting point for the logo mark. The goal was a brand that felt strong and confident but still warm.
          </p>
        </section>

        {/* Logo Ideation section */}
        <section className="mt-16 pt-2" style={{ scrollMarginTop: "100px" }}>
          <h2 style={T.sectionHeading} className="mb-8">Ideation</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo 1.png"
              alt="Steamy Sips logo sketches"
              className="w-full sm:w-2/5"
              style={{ height: "auto", display: "block" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/color-1.png"
              alt="Steamy Sips colour explorations"
              className="w-full sm:w-3/5"
              style={{ height: "auto", display: "block" }}
            />
          </div>
        </section>

        {/* Brand Identity section */}
        <section className="mt-16 pt-2" style={{ scrollMarginTop: "100px" }}>
          <h2 style={T.sectionHeading} className="mb-8">Brand Identity</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo variations.png"
            alt="Steamy Sips logo variations"
            style={{ width: "90%", height: "auto", display: "block" }}
          />
          <div className="flex flex-col sm:flex-row gap-6 mt-10" style={{ alignItems: "stretch" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/color code.png"
              alt="Steamy Sips colour palette"
              className="w-full sm:w-[52%]"
              style={{ height: "auto", display: "block" }}
            />
            <div className="w-full sm:w-[48%]" style={{ display: "flex", alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/font type.png"
                alt="Steamy Sips typography"
                className="w-full sm:w-auto sm:h-full"
                style={{ display: "block", maxWidth: "100%" }}
              />
            </div>
          </div>
          <p style={T.body} className="mt-8">
            Olive green became the palette's base because it felt earthy and grounded rather than sweet, and held up cleanly against cream across every application. The wordmark started from an existing display font however modified it to feel more custom.
          </p>
        </section>
      </div>

      {/* Cup duo — 50/50, full width, no gap */}
      <div className="flex flex-col sm:flex-row w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/paper cup.png"
          alt="Steamy Sips paper cup"
          className="w-full sm:w-1/2"
          style={{ height: "auto", display: "block", objectFit: "cover" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/coffee plastic cup.png"
          alt="Steamy Sips plastic cup"
          className="w-full sm:w-1/2"
          style={{ height: "auto", display: "block", objectFit: "cover" }}
        />
      </div>

      {/* Loyalty card — full-bleed espresso section */}
      <LoyaltyCardSection />

      {/* Menu mockup duo — 50/50, full width, no gap */}
      <div className="flex flex-col sm:flex-row w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/menu mockup- front face.png"
          alt="Steamy Sips menu mockup front face"
          className="w-full sm:w-1/2"
          style={{ height: "auto", display: "block", objectFit: "cover" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cup  menu.png"
          alt="Steamy Sips cup and menu"
          className="w-full sm:w-1/2"
          style={{ height: "auto", display: "block", objectFit: "cover" }}
        />
      </div>

      {/* Menu — full width */}
      <div className="w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/menu on image.png"
          alt="Steamy Sips menu cards"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Front sign + cup holder — 50/50, full width */}
      <div className="flex flex-col sm:flex-row w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/front sign.png"
          alt="Steamy Sips front sign"
          className="w-full sm:w-1/2"
          style={{ height: "auto", display: "block" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cup holder.png"
          alt="Steamy Sips cup holder"
          className="w-full sm:w-1/2"
          style={{ height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}

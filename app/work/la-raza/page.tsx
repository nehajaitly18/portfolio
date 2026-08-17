"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import BackButton from "@/components/BackButton";

// ── Spread images ─────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  "/zine front loop.png",
  "/zine loop 1.jpg",
  "/loop 2.webp",
  "/zine loop 3.jpg",
  "/zine loop 4 .png",
  "/zine loop 5.png",
  "/zine back loop.png",
];

const SPREAD_IMAGES = [
  "/zine loop 1.jpg",
  "/loop 2.webp",
  "/zine loop 3.jpg",
  "/zine loop 4 .png",
  "/zine loop 5.png",
];

// ── Crossfade carousel ────────────────────────────────────────
function CrossfadeCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrev(c);
        return (c + 1) % CAROUSEL_IMAGES.length;
      });
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
      {CAROUSEL_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Zine spread ${i + 1}`}
          style={{
            position:  "absolute",
            inset:     0,
            width:     "100%",
            height:    "100%",
            objectFit: "contain",
            opacity:   i === current ? 1 : 0,
            transition:
              i === current || i === prev
                ? "opacity 500ms ease-in-out"
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

// ── Font reveal — two-column ──────────────────────────────────
function FontReveal() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = "revealLTR 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "#111110", width: "100%" }}>
      <style>{`
        @keyframes revealLTR {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
      `}</style>
      <div
        className="max-w-[960px] mx-auto px-6 md:px-10"
        style={{ paddingTop: "64px", paddingBottom: "64px" }}
      >

        {/* Heading */}
        <h2
          style={{
            fontFamily:    "Georgia, serif",
            fontWeight:    400,
            fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
            lineHeight:    1.1,
            letterSpacing: "-0.02em",
            color:         "#FFFFFF",
            margin:        "0 0 20px 0",
            padding:       0,
          }}
        >
          Process
        </h2>

        {/* Body text — constrained reading width */}
        <p
          style={{
            ...T.body,
            fontSize:     "16px",
            lineHeight:   1.6,
            maxWidth:     "860px",
            margin:       "0 0 48px 0",
            padding:      0,
            color:        "rgba(255,255,255,0.65)",
          }}
        >
          The intention for the font was to feel organic for which it was created by hand
          sketched fonts to give an organic feel to the zine. The final was printed on the
          risograph which is why the zine contains 2 colors; Green and Pink. We wanted colors
          that added to the images used for the movement and something that emphasized the
          feeling of the movement.
        </p>

        {/* Font image — LTR reveal */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/font.png"
          alt="Zine typeface — full alphabet"
          style={{
            display:  "block",
            width:    "100%",
            height:   "auto",
            margin:   0,
            padding:  0,
            clipPath: "inset(0 100% 0 0)",
          }}
        />

      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function LaRazaPage() {
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
    <style>{`@media (max-width: 767px) { .la-raza-page { margin-top: -56px !important; } }`}</style>
    <motion.div className="la-raza-page bg-[#111110]" animate={controls} style={{ marginTop: "-64px", isolation: "isolate" }}>
      <BackButton />

      {/* ── 1. Hero Image — full-bleed ───────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/zine front %2B spread.png"
        alt="ABC's of Chicano Movement — hero"
        style={{
          display:    "block",
          width:      "100%",
          height:     "auto",
          maxWidth:   "100vw",
          paddingTop: "64px",
        }}
      />

      {/* ── 2. Title + About — stacked ───────────────────────── */}
      <div style={{ background: "#111110", width: "100%" }}>
        <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-12 pb-12">

          {/* Mobile back link */}
          <a
            href="/"
            onClick={handleBack}
            style={{
              fontFamily:     "var(--font-lato)",
              fontSize:       "15px",
              letterSpacing:  "0.12em",
              textTransform:  "uppercase" as const,
              color:          "rgba(255,255,255,0.38)",
              display:        "inline-block",
              textDecoration: "none",
              marginBottom:   "32px",
              paddingTop:     "8px",
              paddingBottom:  "8px",
            }}
            className="lg:hidden hover:opacity-70 transition-opacity duration-200"
          >
            ← Work
          </a>

          {/* Title */}
          <h1 style={{
            fontFamily:    "Georgia, serif",
            fontStyle:     "normal",
            fontWeight:    400,
            fontSize:      "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight:    1.15,
            letterSpacing: "-0.02em",
            color:         "#FFFFFF",
          }}>
            ABC&rsquo;s of Chicano Movement
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily:    "var(--font-lato)",
            fontStyle:     "italic",
            fontSize:      "15px",
            fontWeight:    400,
            letterSpacing: "-0.028em",
            color:         "rgba(255,255,255,0.4)",
            lineHeight:    1.6,
            marginTop:     "8px",
          }}>
            Illustrator, Risograph, Procreate
          </p>

          {/* About section */}
          <div style={{ marginTop: "48px" }}>
            <h2 style={{
              fontFamily:    "Georgia, serif",
              fontStyle:     "normal",
              fontWeight:    400,
              fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
              lineHeight:    1.1,
              letterSpacing: "-0.02em",
              color:         "#FFFFFF",
              marginBottom:  "24px",
            }}>
              About The Zine
            </h2>

            <p style={{ ...T.body, color: "rgba(255,255,255,0.65)" }}>
              ABC&rsquo;s of Chicano Movement was created for the Raza Arts and Media Collective
              1975–Today Exhibition for the University of Michigan Art Museum. The Raza Arts Media
              Collective was founded by a group of Latina students at the University of Michigan to
              create a platform for expression for the Latin and Hispanic communities.
            </p>

            <p style={{ ...T.body, color: "rgba(255,255,255,0.65)", marginTop: "24px" }}>
              This zine was inspired by a glossary of Chicano terminology found in the Ted DeLeon
              papers, 1975–2006 Box 1 from our research at the Bentley Historical Library. We took
              inspiration from this list to create an alphabet book with these words and the images
              used in this zine depict key figures and events for the Chicano movement since its
              inception up until present time.
            </p>
          </div>

        </div>
      </div>

      {/* ── 4. Looping Crossfade Section ─────────────────────── */}
      <div
        className="px-6 md:px-[120px]"
        style={{
          background:    "#111110",
          width:         "100%",
          paddingTop:    "48px",
          paddingBottom: "96px",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <CrossfadeCarousel />
        </div>
      </div>

      {/* ── Font showcase — scroll-reveal ────────────────────── */}
      <FontReveal />

      {/* ── 5. All Spreads — horizontal gallery strip ─────────── */}
      <style>{`
        @media (max-width: 430px) {
          .spreads-strip { padding-top: 20px !important; padding-bottom: 20px !important; }
          .spreads-inner { display: grid !important; grid-template-columns: 1fr 1fr; gap: 6px !important; flex-direction: unset !important; }
          .spreads-inner img { flex: unset !important; width: 100% !important; min-width: unset !important; }
        }
      `}</style>
      <div
        className="spreads-strip"
        style={{
          background:    "#111110",
          width:         "100%",
          paddingTop:    "48px",
          paddingBottom: "48px",
          display:       "flex",
          alignItems:    "center",
          overflow:      "hidden",
        }}
      >
        <div
          className="spreads-inner px-6 md:px-12"
          style={{
            display: "flex",
            gap:     "8px",
            width:   "100%",
          }}
        >
          {[...SPREAD_IMAGES, "/front back.png"].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`Zine spread ${i + 1}`}
              style={{
                display:   "block",
                flex:      "1 1 0",
                minWidth:  0,
                width:     0,
                height:    "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── White gap before footer ───────────────────────────── */}
      <div style={{ background: "#111110", height: "96px" }} />

    </motion.div>
    </>
  );
}

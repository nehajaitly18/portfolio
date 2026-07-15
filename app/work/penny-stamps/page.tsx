"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";

// ── Typography (matches case study design system) ─────────────
const T = {
  projectTitle: {
    fontFamily:    "var(--font-playfair)",
    fontStyle:     "normal",
    fontWeight:    600,
    fontSize:      "clamp(24px, 5vw, 40px)",
    lineHeight:    1.06,
    letterSpacing: "-0.02em",
    color:         "var(--ink)",
  } as React.CSSProperties,

  sectionHeading: {
    fontFamily:    "var(--font-playfair)",
    fontStyle:     "normal",
    fontWeight:    400,
    fontSize:      "26px",
    lineHeight:    1.1,
    letterSpacing: "-0.02em",
    color:         "var(--ink)",
  } as React.CSSProperties,

  subheading: {
    fontFamily: "var(--font-lato)",
    fontWeight: 700,
    fontStyle:  "normal",
    fontSize:   "17px",
    lineHeight: 1.4,
    color:      "var(--ink)",
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

  caption: {
    fontFamily: "var(--font-lato)",
    fontStyle:  "italic",
    fontSize:   "12px",
    color:      "var(--ink-4)",
    lineHeight: 1.5,
  } as React.CSSProperties,
};

// ── TOC sections ──────────────────────────────────────────────
const TOC_SECTIONS = [
  { id: "problem",         label: "Problem" },
  { id: "design-solution", label: "Design Solution" },
  { id: "map",             label: "Map" },
  { id: "application",     label: "Application" },
];

// ── Active section via IntersectionObserver ───────────────────
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

// ── Sticky TOC ────────────────────────────────────────────────
function TableOfContents({
  activeId,
  onBack,
}: {
  activeId: string;
  onBack: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <nav
      aria-label="Case study contents"
      className="hidden lg:block w-[160px] shrink-0 sticky top-[88px] self-start"
    >
      <div className="mb-5 pb-5 border-b border-[var(--border)]">
        <a
          href="/"
          onClick={onBack}
          style={{
            ...T.mono,
            fontFamily:  "var(--font-atma)",
            fontSize:    "15px",
            opacity:     0.38,
            display:     "inline-block",
            cursor:      "pointer",
            textDecoration: "none",
          }}
          className="hover:opacity-70 transition-opacity duration-200"
        >
          ← Work
        </a>
      </div>

      <p
        style={{ ...T.mono, fontFamily: "var(--font-atma)", fontSize: "15px" }}
        className="mb-4"
      >
        Contents
      </p>

      <ul className="space-y-0.5">
        {TOC_SECTIONS.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="flex items-center gap-3 py-1.5 group"
                style={{ textDecoration: "none" }}
              >
                <span
                  className="shrink-0 rounded-full transition-all duration-300"
                  style={{
                    width:      "1.5px",
                    height:     isActive ? "18px" : "8px",
                    background: isActive ? "var(--ink)" : "var(--border-strong)",
                  }}
                />
                <span
                  className="text-[15px] leading-snug transition-colors duration-200 group-hover:text-[var(--ink-2)]"
                  style={{
                    fontFamily: "var(--font-atma)",
                    color:      isActive ? "var(--ink)" : "var(--ink-4)",
                  }}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ── Image placeholder ─────────────────────────────────────────
function ImgPlaceholder({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full rounded-[3px] border border-[var(--border)] bg-[var(--bg-warm)] flex flex-col items-center justify-center gap-2 px-6"
      style={{ aspectRatio: aspect }}
    >
      <span style={{ ...T.mono, textAlign: "center" }}>{label}</span>
    </div>
  );
}

// ── Before / After map slider ─────────────────────────────────
function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef            = useRef<HTMLDivElement>(null);
  const hintRan                 = useRef(false);

  // Hint animation on mount: 50 → 40 → 50 over 1.2s
  useEffect(() => {
    if (hintRan.current) return;
    hintRan.current = true;
    const t1 = setTimeout(() => setPosition(40), 300);
    const t2 = setTimeout(() => setPosition(50), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const getPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e: MouseEvent)  => setPosition(getPos(e.clientX));
    const onMouseUp   = ()               => setDragging(false);
    const onTouchMove = (e: TouchEvent)  => { e.preventDefault(); setPosition(getPos(e.touches[0].clientX)); };
    const onTouchEnd  = ()               => setDragging(false);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    onMouseUp);
    window.addEventListener("touchmove",  onTouchMove, { passive: false });
    window.addEventListener("touchend",   onTouchEnd);
    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",    onMouseUp);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
    };
  }, [dragging, getPos]);

  const transition = dragging ? "none" : "left 0.6s ease-in-out, clip-path 0.6s ease-in-out";

  return (
    <figure style={{ width: "100%", maxWidth: "100%" }}>
      {/* Slider container */}
      <div
        ref={containerRef}
        style={{
          position:     "relative",
          width:        "100%",
          height:       "clamp(250px, 65vw, 500px)",
          overflow:     "hidden",
          borderRadius: "8px",
          border:       "1px solid var(--border)",
          cursor:       dragging ? "ew-resize" : "ew-resize",
          userSelect:   "none",
        }}
      >
        {/* ── After image — base layer ── */}
        <div style={{ position: "absolute", inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/after map.png" alt="After — redesigned wayfinding map" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>

        {/* ── Before image — clipped to left of handle ── */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            clipPath:   `inset(0 ${100 - position}% 0 0)`,
            transition,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "#EFEDE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...T.mono, textAlign: "center" }}>[Before map]</span>
          </div>
        </div>

        {/* ── Divider line + handle ── */}
        <div
          style={{
            position:       "absolute",
            top:            0,
            bottom:         0,
            left:           `${position}%`,
            transform:      "translateX(-50%)",
            zIndex:         10,
            cursor:         "ew-resize",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            transition:     dragging ? "none" : "left 0.6s ease-in-out",
          }}
          onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
          onTouchStart={() => setDragging(true)}
        >
          {/* Vertical rule */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)", width: "2px", background: "white" }} />
          {/* Circular grab handle */}
          <div
            style={{
              position:       "relative",
              zIndex:         2,
              width:          "48px",
              height:         "48px",
              borderRadius:   "50%",
              background:     "white",
              border:         "2px solid #333",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
              boxShadow:      "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            <span style={{ fontSize: "16px", color: "#111", lineHeight: 1, letterSpacing: 0 }}>↔</span>
          </div>
        </div>

        {/* ── Pill labels ── */}
        <span
          style={{
            position:      "absolute",
            top:           "14px",
            left:          "14px",
            zIndex:        5,
            pointerEvents: "none",
            fontFamily:    "var(--font-lato)",
            fontSize:      "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "white",
            background:    "rgba(0,0,0,0.5)",
            padding:       "4px 12px",
            borderRadius:  "20px",
          }}
        >
          Before
        </span>
        <span
          style={{
            position:      "absolute",
            top:           "14px",
            right:         "14px",
            zIndex:        5,
            pointerEvents: "none",
            fontFamily:    "var(--font-lato)",
            fontSize:      "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color:         "white",
            background:    "rgba(0,0,0,0.5)",
            padding:       "4px 12px",
            borderRadius:  "20px",
          }}
        >
          After
        </span>
      </div>

      <figcaption style={{ ...T.caption, marginTop: "8px" }}>
        Drag the handle to compare the existing and redesigned wayfinding maps.
      </figcaption>
    </figure>
  );
}

// ── Page ──────────────────────────────────────────────────────
const sectionIds = TOC_SECTIONS.map((s) => s.id);

export default function PennyStampsPage() {
  const controls  = useAnimation();
  const router    = useRouter();
  const activeId  = useActiveSection(sectionIds);

  const handleBack = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await controls.start({
      opacity: 0,
      y: 10,
      transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1] },
    });
    router.push("/#projects");
  };

  const stampsIdx  = projects.findIndex((p) => p.id === "penny-stamps");
  const nextProject = projects[(stampsIdx + 1) % projects.length];

  return (
    <motion.div className="bg-[var(--bg)]" animate={controls} style={{ marginTop: "-64px" }}>

      {/* ── Hero image ──────────────────────────────────── */}
      <div style={{ width: "100%", maxWidth: "100vw", height: "calc(100svh + 64px)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/1.png"
          alt="Penny W. Stamps Wayfinding — hero overview"
          style={{ width: "100%", maxWidth: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>

      {/* ── Two-column: TOC left · content right ────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 flex items-start gap-12 pt-12 pb-32">

        <TableOfContents activeId={activeId} onBack={handleBack} />

        <div className="flex-1 min-w-0">

          {/* ── Title block ────────────────────────────── */}
          <div className="pb-10">
            {/* Back — mobile only */}
            <a
              href="/"
              onClick={handleBack}
              style={{ ...T.mono, textDecoration: "none" }}
              className="inline-flex items-center gap-2 mb-8 lg:hidden hover:text-[var(--ink-3)] transition-colors cursor-pointer"
            >
              ← Work
            </a>

            <h1 style={T.projectTitle}>Penny W. Stamps Wayfinding</h1>

            <p className="mt-2.5" style={{ ...T.body, color: "var(--ink-3)", fontSize: "18px" }}>
              This project focused on redesigning the school's wayfinding system to establish visual consistency, improve clarity, and create a cohesive navigation.
            </p>

            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-lato)",
                fontStyle:  "italic",
                fontSize:   "15px",
                color:      "var(--ink-4)",
                lineHeight: 1.6,
              }}
            >
              2024 · Wayfinding &amp; Branding · Adobe Illustrator, Photoshop
            </p>
          </div>

          {/* ── Problem ───────────────────────────────── */}
          <section id="problem" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">Problem</h2>

            <p style={T.body}>
              The Penny W. Stamps School of Art and Design struggles with an{" "}
              <strong style={{ fontWeight: 700, color: "var(--ink)" }}>outdated</strong> and{" "}
              <strong style={{ fontWeight: 700, color: "var(--ink)" }}>inconsistent</strong> signage
              and wayfinding system. The{" "}
              <strong style={{ fontWeight: 700, color: "var(--ink)" }}>lack of a clear visual</strong>{" "}
              and structural system makes navigation{" "}
              <strong style={{ fontWeight: 700, color: "var(--ink)" }}>confusing</strong>,
              particularly for new students and visitors. As a result, users often{" "}
              <strong style={{ fontWeight: 700, color: "var(--ink)" }}>rely on trial and error</strong>{" "}
              rather than intuitive cues,{" "}
              <strong style={{ fontWeight: 700, color: "var(--ink)" }}>creating friction</strong> in
              how people experience and move through the school.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 mt-8" style={{ gap: '16px' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '320px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/way 1.jpg" alt="Existing signage — inconsistency example 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '320px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/way 2.png" alt="Existing signage — inconsistency example 2" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '320px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/way 3.1.jpg" alt="Existing signage 3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }} />
              </div>
            </div>
          </section>

          {/* ── Design Solution ───────────────────────── */}
          <section id="design-solution" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">Design Solution</h2>

            <h3 style={T.subheading} className="mt-10 mb-1">Color</h3>
            <div className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/colors.png"
                alt="Color system"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            <h3 style={T.subheading} className="mt-10 mb-1">Iconography</h3>
            <p style={T.body}>
              The icons were designed based on my font, DINousar. I took inspiration from the
              roundness and boldness to make them visible from distance as well.
            </p>
            <div className="mt-8 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Neha Jaitly- Wayfinding.png"
                alt="Iconography system — DINousar-based icon set"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </section>

          {/* ── Map ───────────────────────────────────── */}
          <section id="map" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">Map</h2>

            <p style={T.body}>
              The map is to help locate your position in the building and to also navigate to a
              specific area in the building. The map is placed at large scale near the building
              entrance as well as in a small size. The map is color coded just like the signs to
              help the wayfinding system be consistent all around the building.
            </p>

            <div className="mt-8">
              <BeforeAfterSlider />
            </div>

            <div className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/map in context.png"
                alt="Map in situ — large-scale entrance placement"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
          </section>

          {/* ── Application ───────────────────────────── */}
          <section id="application" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">Application</h2>

            <h3 style={T.subheading} className="mt-10 mb-1">Utility</h3>
            <div className="grid gap-2 mt-8 mb-8 grid-cols-1 sm:grid-cols-[1fr_1.8fr] sm:items-stretch sm:h-[480px]">
              {/* Left column — two stacked images */}
              <div className="flex flex-col gap-2">
                <div style={{ overflow: "hidden", borderRadius: "8px", minHeight: "180px", flex: 1 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon grid.png" alt="Icon construction grid" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ overflow: "hidden", borderRadius: "8px", minHeight: "180px", flex: 1 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icon teal.png" alt="Icon on teal background" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              {/* Right column — single tall image */}
              <div style={{ overflow: "hidden", borderRadius: "8px", border: "1.5px solid #e0e0e0", minHeight: "300px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon final.png" alt="Final icon set" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>

            <h3 style={T.subheading} className="mt-10 mb-1">Signage — Locational</h3>
            <p style={T.body}>
              For the resources and shared areas, first is the room name, room number and braille.
              For the studios and classroom, first is the room number followed by name and braille.
              Underneath will be the schedule of classes running. Pink is for studios, orange for
              resources, blue for administration, grey is for taubman and yellow is for shared spaces.
            </p>
            <div className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Free_Glass_Sign_Mockup_3.png"
                alt="Locational signage mockup"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>

            <h3 style={T.subheading} className="mt-10 mb-1">Signage — Directional</h3>
            <p style={T.body}>
              For the directional signage, first is the hall signage which acts like smaller
              individual signs for that specific part of the building. Stair signage is to provide
              information for where the stairs are leading and what rooms will come. Overhead signs
              for transitional information in the major corridors of the building.
            </p>
            <div className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Free Horizontal Signage PSD Mockup.png"
                alt="Directional signage mockup"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Building Staircase Mockup.png"
                alt="Staircase directional signage mockup"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/texture.png"
                alt="Directional signage texture detail"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
          </section>

        </div>
      </div>

      {/* ── Next project ──────────────────────────────── */}
      <div className="border-t border-[var(--border)] section-warm">
        <div className="max-w-[960px] mx-auto px-6 md:px-10 py-14">
          <Link href={nextProject.href} className="group block">
            <span style={T.mono} className="block mb-4">Next</span>
            <div className="flex items-baseline gap-4">
              <h3
                className="transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  fontFamily:    "var(--font-playfair)",
                  fontStyle:     "italic",
                  fontWeight:    400,
                  fontSize:      "clamp(30px, 4.5vw, 48px)",
                  lineHeight:    1.0,
                  letterSpacing: "-0.025em",
                  color:         "var(--ink)",
                }}
              >
                {nextProject.title}
              </h3>
              <span className="text-[var(--ink-3)] text-xl transition-transform duration-300 group-hover:translate-x-2 inline-block">
                →
              </span>
            </div>
            <p
              className="mt-2 text-[11px] text-[var(--ink-4)]"
              style={{
                fontFamily:    "var(--font-lato)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {nextProject.category}
            </p>
          </Link>
        </div>
      </div>

    </motion.div>
  );
}

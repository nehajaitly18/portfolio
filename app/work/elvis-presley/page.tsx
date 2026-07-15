"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import ElvisFlipbook from "./ElvisFlipbook";

// ── Typography ────────────────────────────────────────────────
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
  { id: "overview",          label: "Overview" },
  { id: "the-story",         label: "The Story" },
  { id: "shaping-the-story", label: "Shaping the Story" },
  { id: "publication",       label: "The Publication" },
];

// ── Active section tracking ───────────────────────────────────
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
            fontFamily:     "var(--font-atma)",
            fontSize:       "15px",
            opacity:        0.38,
            display:        "inline-block",
            cursor:         "pointer",
            textDecoration: "none",
          }}
          className="hover:opacity-70 transition-opacity duration-200"
        >
          ← Work
        </a>
      </div>

      <p style={{ ...T.mono, fontFamily: "var(--font-atma)", fontSize: "15px" }} className="mb-4">
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

// ── Page ──────────────────────────────────────────────────────
const sectionIds = TOC_SECTIONS.map((s) => s.id);

export default function ElvisPresleyPage() {
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

  const idx         = projects.findIndex((p) => p.id === "elvis-presley");
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <motion.div className="bg-[var(--bg)]" animate={controls} style={{ marginTop: "-64px" }}>

      {/* ── Hero ────────────────────────────────────────── */}
      <div style={{ width: "100%", maxWidth: "100vw", height: "calc(100svh + 64px)", overflow: "hidden" }}>
        <img
          src="/1234.png"
          alt="Through the Cover — opening spread"
          style={{ width: "100%", maxWidth: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>

      {/* ── Two-column layout ────────────────────────────── */}
      <div className="max-w-[960px] mx-auto px-6 md:px-10 flex items-start gap-12 pt-12 pb-32">

        <TableOfContents activeId={activeId} onBack={handleBack} />

        <div className="flex-1 min-w-0">

          {/* ── Title block ──────────────────────────────── */}
          <div className="pb-10">
            <a
              href="/"
              onClick={handleBack}
              style={{ ...T.mono, textDecoration: "none" }}
              className="inline-flex items-center gap-2 mb-8 lg:hidden hover:text-[var(--ink-3)] transition-colors cursor-pointer"
            >
              ← Work
            </a>

            <h1 style={T.projectTitle}>Through the Cover: Elvis Presley's Albums and the Stories They Told</h1>

            <p className="mt-2.5" style={{ ...T.body, color: "var(--ink-3)", fontSize: "18px" }}>
              This publication explores how album covers tell stories beyond music.
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
              2024 · Publication Design · [SECTION PLACEHOLDER — add tools here]
            </p>
          </div>

          {/* ── Project Overview ─────────────────────────── */}
          <section id="overview" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">Project Overview</h2>

            <p style={T.body}>
              This publication explores how album covers tell stories beyond music. Using Elvis Presley's
              final decade as a lens, it examines how his music reflect shifts in identity, performance,
              and culture during the 1970s.
            </p>

            <div className="mt-8">
              <img
                src="/comeback.png"
                alt="Publication cover and spreads overview"
                className="w-full rounded-[3px] border border-[var(--border)]"
                style={{ display: "block" }}
              />
            </div>
          </section>

          {/* ── The Story ────────────────────────────────── */}
          <section id="the-story" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">The Story</h2>

            <p style={T.body}>
              Across the 1970s, Elvis's work sits alongside major cultural changes, from the rise of pop
              culture to the influence of counterculture and disco. These covers form the set used across
              the book, bringing together different moments from the decade in one place.
            </p>

            <div className="mt-8">
              <img
                src="/flipbook/spread-6.png"
                alt="Album covers from the 1970s decade"
                className="w-full rounded-[3px] border border-[var(--border)]"
                style={{ display: "block" }}
              />
            </div>
          </section>

          {/* ── Shaping the Story ────────────────────────── */}
          <section id="shaping-the-story" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">Shaping the Story</h2>

            <p style={T.body}>
              It is organized into sections that reflect different moments across the decade, shaped by
              both the albums and the cultural shifts around them.
            </p>

            <p style={T.body} className="mt-5">
              Album covers are paired with performance images across each spread, showing the music
              alongside how it was performed. This brings in not just the music element the visual
              identity around it especially through his stage presence and outfits which played a key
              role in how he was perceived.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              <img
                src="/flipbook/spread-10.png"
                alt="Spread — album cover paired with performance image"
                className="w-full rounded-[3px] border border-[var(--border)]"
                style={{ display: "block" }}
              />
              <img
                src="/flipbook/spread-13.png"
                alt="Spread — stage presence and outfit detail"
                className="w-full rounded-[3px] border border-[var(--border)]"
                style={{ display: "block" }}
              />
            </div>

            <div className="mt-3">
              <img
                src="/flipbook/spread-17.png"
                alt="Full spread — section divider"
                className="w-full rounded-[3px] border border-[var(--border)]"
                style={{ display: "block" }}
              />
            </div>
          </section>

          {/* ── The Publication ──────────────────────────── */}
          <section id="publication" className="mt-14 pt-2" style={{ scrollMarginTop: "100px" }}>
            <h2 style={T.sectionHeading} className="mb-6">The Publication</h2>

            <p style={T.body}>
              Browse the full 20-page publication below. Click the cover to open, then use the arrows
              or your keyboard's left and right keys to turn pages.
            </p>

            <div style={{ width: "100%", marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <ElvisFlipbook />
            </div>
          </section>

        </div>
      </div>

      {/* ── Next project ──────────────────────────────────── */}
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
              style={{ fontFamily: "var(--font-lato)", letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              {nextProject.category}
            </p>
          </Link>
        </div>
      </div>

    </motion.div>
  );
}

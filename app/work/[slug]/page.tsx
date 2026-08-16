"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { caseStudies, type Block, type TocSection } from "@/data/case-studies";
import { ImageLightbox } from "./ImageLightbox";
import BackButton from "@/components/BackButton";

const SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

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

  sectionHeading: {
    fontFamily:    "Georgia, serif",
    fontStyle:     "normal",
    fontWeight:    400,
    fontSize:      "clamp(1.1rem, 2.5vw, 1.625rem)",
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

// ── TOC — sticky, left column ──────────────────────────────────
function TableOfContents({
  sections,
  activeId,
  onBack,
  visible,
  contentMaxWidth = 960,
}: {
  sections: TocSection[];
  activeId: string;
  onBack: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  visible: boolean;
  contentMaxWidth?: number;
}) {
  return (
    <>
      {/* spacer preserves the 200px column in the flex layout */}
      <div className="hidden md:block" style={{ width: 200, flexShrink: 0 }} aria-hidden="true" />
      <nav
        aria-label="Case study contents"
        className="hidden md:block"
        style={{
          width: 200,
          flexShrink: 0,
          position: "fixed",
          top: 80,
          left: `max(40px, calc((100vw - ${contentMaxWidth}px) / 2 + 40px))`,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
      <div className="mb-5 pb-5 border-b border-[var(--border)]">
        <a
          href="/"
          onClick={onBack}
          style={{ ...T.mono, fontFamily: "var(--font-lato)", fontSize: "15px", opacity: 0.38, display: "inline-block", cursor: "pointer", textDecoration: "none" }}
          className="hover:!opacity-100 hover:text-[var(--ink)] transition-all duration-200"
        >
          ← Work
        </a>
      </div>

      <p style={{ ...T.mono, fontFamily: "var(--font-lato)", fontSize: "15px", textTransform: "none" }} className="mb-4">Contents</p>
      <ul className="space-y-0.5">
        {sections.map((s) => {
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
                  className={`text-[15px] leading-snug transition-colors duration-200 hover:text-[var(--ink)] ${isActive ? "text-[var(--ink)]" : "text-[var(--ink-4)]"}`}
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
    </>
  );
}

// ── Image slot — uses native <img> to avoid Next.js optimization issues ──
function ImgSlot({ label, aspect, caption, src }: { label: string; aspect: string; caption?: string; src?: string }) {
  return (
    <figure className="w-full">
      {src ? (
        <div className="w-full rounded-[3px] overflow-hidden" style={{ aspectRatio: aspect }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={label}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
      ) : (
        <div
          className="w-full rounded-[3px] border border-[var(--border)] bg-[var(--bg-warm)] flex flex-col items-center justify-center gap-2 px-6"
          style={{ aspectRatio: aspect }}
        >
          <span style={{ ...T.mono, textAlign: "center" }}>{label}</span>
        </div>
      )}
      {caption && <figcaption className="mt-2" style={T.caption}>{caption}</figcaption>}
    </figure>
  );
}

// ── Image carousel ────────────────────────────────────────────
function CarouselBlock({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(idx); setFading(false); }, 175);
  };

  const btn = (side: "left" | "right"): React.CSSProperties => ({
    position:        "absolute",
    [side]:          "12px",
    top:             "50%",
    transform:       "translateY(-50%)",
    width:           "36px",
    height:          "36px",
    borderRadius:    "50%",
    background:      "white",
    border:          "1px solid #ddd",
    fontSize:        "18px",
    cursor:          "pointer",
    display:         "flex",
    alignItems:      "center",
    justifyContent:  "center",
    zIndex:          1,
  });

  return (
    <div style={{ width: "100%", position: "relative", marginTop: "24px" }}>
      <div style={{ position: "relative", width: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current].src}
          alt={images[current].alt}
          style={{ width: "100%", height: "auto", objectFit: "contain", display: "block", opacity: fading ? 0 : 1, transition: "opacity 0.35s ease" }}
        />
        <button onClick={() => goTo((current - 1 + images.length) % images.length)} style={btn("left")} aria-label="Previous">‹</button>
        <button onClick={() => goTo((current + 1) % images.length)} style={btn("right")} aria-label="Next">›</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to image ${idx + 1}`}
            style={{ width: "7px", height: "7px", borderRadius: "50%", background: idx === current ? "#333" : "#ccc", border: "none", cursor: "pointer", padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Video placeholder ─────────────────────────────────────────
function VideoSlot({ label, aspect = "9/19.5", caption }: { label: string; aspect?: string; caption?: string }) {
  return (
    <figure className="w-full">
      <div
        className="w-full rounded-[3px] bg-[#1A1A18] flex flex-col items-center justify-center gap-3 px-4"
        style={{ aspectRatio: aspect }}
      >
        <div className="w-8 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center">
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
            <path d="M1.5 1L7.5 5L1.5 9V1Z" fill="white" fillOpacity="0.85" />
          </svg>
        </div>
        <span style={{ ...T.mono, color: "rgba(255,255,255,0.35)", textAlign: "center", fontSize: "9px" }}>
          {label}
        </span>
      </div>
      {caption && <figcaption className="mt-2" style={T.caption}>{caption}</figcaption>}
    </figure>
  );
}

// ── iPhone frame shell ────────────────────────────────────────
function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0a0a",
        borderRadius: "44px",
        border: "10px solid #1c1c1e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic island */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "34px",
          background: "#0a0a0a",
          borderRadius: "20px",
          zIndex: 10,
        }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: "34px", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ── Scales a 390×844 phone to `scale`, reserving exact layout height ──
function PhoneWrapper({ children, scale = 0.5 }: { children: React.ReactNode; scale?: number }) {
  return (
    <div style={{ height: `${Math.round(844 * scale)}px`, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 390,
          height: 844,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── Scroll-driven sticky phone column ────────────────────────
function ScrollPhoneColumn({
  phoneSections,
}: {
  phoneSections: Array<{ id: string; videoSrc: string | null; threshold?: number }>;
}) {
  const [displayedVideo, setDisplayedVideo] = useState<string | null>(
    "/overview-video.mp4.mov"
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const sections = [
      { id: "overview",         video: "/overview-video.mp4.mov" },
      { id: "the-problem",      video: null },
      { id: "research",         video: null },
      { id: "discovery",        video: null },
      { id: "mobile-first",     video: "/mobile-first-video.mp4.mov" },
      { id: "design-decisions", video: null },
      { id: "photo-gallery",    video: null },
      { id: "user-testing",     video: null },
      { id: "final-delivery",   video: null },
      { id: "reflections",      video: null },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let activeVideo: string | null = null;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          activeVideo = section.video;
          break;
        }
      }
      setDisplayedVideo(activeVideo);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { videoRef.current?.load(); }, [displayedVideo]);

  const phoneVisible = displayedVideo !== null;

  return (
    <div
      className={phoneVisible ? "hidden md:block" : "hidden"}
      style={{
        flexShrink: 0,
        width:     290,
        position:  "sticky",
        top:       "120px",
        alignSelf: "flex-start",
      }}
    >
      <PhoneWrapper>
        <IPhoneFrame>
          <div style={{ width: "100%", height: "100%" }}>
            {displayedVideo ? (
              <video
                ref={videoRef}
                autoPlay loop muted playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src={displayedVideo} type="video/quicktime" />
              </video>
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#111" }} />
            )}
          </div>
        </IPhoneFrame>
      </PhoneWrapper>
    </div>
  );
}

// ── Before / After phone toggle ───────────────────────────────
function BeforeAfterToggle({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
}: {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [mode, setMode]     = useState<"before" | "after">("before");
  const [fading, setFading] = useState(false);

  const toggle = (next: "before" | "after") => {
    if (next === mode) return;
    setFading(true);
    setTimeout(() => { setMode(next); setFading(false); }, 150);
  };

  const activeSrc = mode === "before" ? beforeSrc : afterSrc;

  return (
    <div className="mt-8 flex flex-col items-center gap-5">
      <PhoneWrapper scale={0.6}>
        <IPhoneFrame>
          <div style={{ width: "100%", height: "100%", opacity: fading ? 0 : 1, transition: "opacity 0.15s ease" }}>
            {activeSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeSrc}
                alt={mode === "before" ? beforeLabel : afterLabel}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#111" }} />
            )}
          </div>
        </IPhoneFrame>
      </PhoneWrapper>

      <div style={{ display: "flex", gap: 12 }}>
        {(["before", "after"] as const).map((m) => (
          <button
            key={m}
            onClick={() => toggle(m)}
            style={{
              padding:    "8px 20px",
              borderRadius: 999,
              border:     "1.5px solid var(--ink)",
              background: mode === m ? "var(--ink)" : "transparent",
              color:      mode === m ? "#fff" : "var(--ink)",
              cursor:     "pointer",
              fontFamily: "var(--font-lato)",
              fontSize:   14,
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {m === "before" ? "Before testing" : "After testing"}
          </button>
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-lato)", fontSize: 13, color: "var(--ink-3)", textAlign: "center" }}>
        {mode === "before" ? beforeLabel : afterLabel}
      </p>
    </div>
  );
}

// ── Render blocks ─────────────────────────────────────────────
function renderBlocks(blocks: Block[]) {
  const output: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const b = blocks[i];

    // YouTube comments — replaced with image
    if (b.type === "youtube-comments") {
      output.push(
        <div key={i} style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/youtube.png"
            alt="YouTube comments — translated from Hindi"
            style={{
              width:     "75vw",
              height:    "auto",
              objectFit: "contain",
            }}
          />
        </div>
      );
      i++;
      continue;
    }

    // Iteration cards
    if (b.type === "iteration-cards") {
      output.push(
        <div key={i} className="mt-10">
          {/* Section heading */}
          <p style={{ ...T.subheading, marginBottom: "20px" }}>Iterations</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {b.cards.map((card, ci) => (
              <div key={ci}>
                {/* Card */}
                <div style={{ borderRadius: "16px", border: "1px solid #e8e8e8", background: "#fff", padding: "32px" }}>
                  {/* Pill + title row */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ borderRadius: "20px", background: "#f0f0f0", padding: "4px 12px", fontFamily: "var(--font-lato)", fontSize: "12px", fontWeight: 600, color: "#666", whiteSpace: "nowrap" }}>
                      {card.pill}
                    </span>
                    <span style={{ fontFamily: "var(--font-lato)", fontWeight: 700, fontSize: "17px", lineHeight: 1.4, color: "var(--ink)" }}>
                      {card.title}
                    </span>
                  </div>
                  {/* Divider */}
                  <div style={{ height: "1px", background: "#e8e8e8", margin: "20px 0" }} />
                  {/* Content — single image layout */}
                  {card.image && (
                    <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
                      {/* Image — left side */}
                      <div style={{ flex: "3 1 0", minWidth: "200px" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.image.src} alt={card.image.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }} />
                      </div>
                      {/* Annotations — right side */}
                      <div style={{ flex: "2 1 0", minWidth: "200px", display: "flex", flexDirection: "column", gap: "20px", paddingTop: "8px" }}>
                        {card.annotations.map((ann, ai) => (
                          <div key={ai} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#DAE7F3", color: "#5A8FA8", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-lato)" }}>
                              {ai + 1}
                            </div>
                            <p style={{ fontFamily: "var(--font-lato)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-2)", margin: 0, paddingTop: "3px" }}>
                              {ann.text}{ann.boldSuffix && <strong style={{ fontWeight: 700, color: "var(--ink)" }}>{ann.boldSuffix}</strong>}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Content — two images layout */}
                  {card.images && (
                    <div>
                      {/* Two images side by side, natural proportions aligned at top */}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", alignItems: "start" }}>
                        {card.images.map((img, ii) => (
                          <div key={ii} style={{ borderRadius: "4px", overflow: "visible" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.src} alt={img.alt} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
                          </div>
                        ))}
                      </div>
                      {/* Divider */}
                      <div style={{ height: "1px", background: "#e8e8e8", margin: "24px 0" }} />
                      {/* Annotations */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {card.annotations.map((ann, ai) => (
                          <div key={ai} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#DAE7F3", color: "#5A8FA8", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-lato)" }}>
                              {ai + 1}
                            </div>
                            <p style={{ fontFamily: "var(--font-lato)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-2)", margin: 0, paddingTop: "3px" }}>
                              {ann.text}{ann.boldSuffix && <strong style={{ fontWeight: 700, color: "var(--ink)" }}>{ann.boldSuffix}</strong>}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Bridge callout — matches global callout style with blue left border */}
                {card.bridgeAfter && (
                  <div className="mt-3 mb-3 py-5 px-6 rounded-r-[3px]" style={{ borderLeft: "2px solid #5A8FA8" }}>
                    <p style={{ ...T.body, fontStyle: "normal", color: "var(--ink)", lineHeight: 1.65, margin: 0 }}>
                      {card.bridgeAfter}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Image row (phone screens side by side, no warm bg)
    if (b.type === "image-row") {
      const outerStyle: React.CSSProperties = b.fullWidth
        ? { display: "flex", gap: "8px", width: "92vw", position: "relative", left: "50%", transform: "translateX(-50%)" }
        : { width: "100%", display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "stretch" };
      output.push(
        <div key={i} style={{ ...outerStyle, marginTop: "24px" }}>
          {b.images.map((img, ii) => (
            <figure key={ii} style={b.fullWidth ? { flex: "1 1 0", minWidth: 0 } : { width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
              {img.src ? (
                img.aspect ? (
                  <div className="rounded-[3px] overflow-hidden" style={{ width: "100%", aspectRatio: img.aspect }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.label}
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                    />
                  </div>
                ) : (
                  <div className="rounded-[3px]" style={{ width: "100%", flex: "1 1 auto" }}>
                    <ImageLightbox
                      src={img.src}
                      alt={img.label}
                      imgStyle={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                    />
                  </div>
                )
              ) : (
                <div
                  className="w-full rounded-[3px] border border-[var(--border)] bg-[var(--bg-warm)] flex items-center justify-center px-3"
                  style={{ aspectRatio: img.aspect }}
                >
                  <span style={{ ...T.mono, textAlign: "center", fontSize: "9px" }}>{img.label}</span>
                </div>
              )}
              {img.caption && <figcaption className="mt-1.5" style={T.caption}>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
      i++;
      continue;
    }

    // Mixed media row (images + video)
    if (b.type === "media-row") {
      output.push(
        <div
          key={i}
          className="mt-8 grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {b.items.map((item, ii) =>
            item.kind === "image" ? (
              <figure key={ii} className="w-full">
                {item.src ? (
                  <div className="w-full rounded-[3px] overflow-hidden" style={{ aspectRatio: b.aspect }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.label}
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full rounded-[3px] border border-[var(--border)] bg-[var(--bg-warm)] flex items-center justify-center px-3"
                    style={{ aspectRatio: b.aspect }}
                  >
                    <span style={{ ...T.mono, fontSize: "9px", textAlign: "center" }}>{item.label}</span>
                  </div>
                )}
                {item.caption && <figcaption className="mt-1.5" style={T.caption}>{item.caption}</figcaption>}
              </figure>
            ) : item.src ? (
              <figure key={ii} className="w-full">
                <div className="w-full rounded-[3px] overflow-hidden" style={{ aspectRatio: b.aspect }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  >
                    <source src={item.src} type="video/quicktime" />
                    <source src={item.src} type="video/mp4" />
                  </video>
                </div>
                {item.caption && <figcaption className="mt-1.5" style={T.caption}>{item.caption}</figcaption>}
              </figure>
            ) : (
              <VideoSlot key={ii} label={item.label} aspect={b.aspect} caption={item.caption} />
            )
          )}
        </div>
      );
      i++;
      continue;
    }

    // Target + Goals inline pills
    if (b.type === "target-goals-pills") {
      const pill = (text: string, idx: number) => (
        <span
          key={idx}
          style={{
            border:       "1.5px solid #333",
            borderRadius: "999px",
            padding:      "8px 20px",
            fontSize:     "15px",
            color:        "var(--ink)",
            fontFamily:   "var(--font-lato)",
          }}
        >
          {text}
        </span>
      );
      const label = (text: string) => (
        <span
          style={{
            fontSize:      "12px",
            fontWeight:    500,
            letterSpacing: "0.08em",
            color:         "var(--ink-3)",
            textTransform: "uppercase",
            fontFamily:    "var(--font-lato)",
            minWidth:      "120px",
          }}
        >
          {text}
        </span>
      );
      output.push(
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px", margin: "24px 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            {label("Target group")}
            {pill(b.target, 0)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            {label("Design goals")}
            {b.goals.map((g, gi) => pill(g, gi + 1))}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Target + Goals split panel
    if (b.type === "target-goals") {
      output.push(
        <div key={i} className="mt-8 grid grid-cols-1 sm:grid-cols-2 border border-[var(--border)] rounded-[3px] overflow-hidden">
          <div className="p-6 bg-[var(--bg-warm)]">
            <p style={T.mono} className="mb-4">Target Group</p>
            <p style={{ ...T.body, color: "var(--ink)", fontSize: "15px", lineHeight: 1.6 }}>{b.target}</p>
          </div>
          <div className="p-6 border-l border-[var(--border)]">
            <p style={T.mono} className="mb-4">Design Goals</p>
            <ul className="space-y-2.5">
              {b.goals.map((g, gi) => (
                <li key={gi} className="flex items-start gap-3">
                  <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-[var(--ink-4)] shrink-0" />
                  <span style={{ ...T.body, fontSize: "14px", lineHeight: 1.6 }}>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Callout block — non-italic, distinct background
    if (b.type === "callout") {
      output.push(
        <div key={i} className="mt-6 py-5 px-6 rounded-r-[3px]" style={{ background: b.bg ?? "#C6DCF2", borderLeft: "2px solid #5A8FA8" }}>
          <p style={{ ...T.body, fontStyle: "normal", color: "var(--ink)", lineHeight: 1.65 }}>{b.text}</p>
        </div>
      );
      i++;
      continue;
    }

    // Pair adjacent cols=2 images side by side
    if (b.type === "image" && b.cols === 2) {
      const next = blocks[i + 1];
      if (next?.type === "image" && next.cols === 2) {
        const pairItems = [
          { label: b.label, aspect: b.aspect, caption: b.caption, src: b.src },
          { label: next.label, aspect: next.aspect, caption: next.caption, src: next.src },
        ];
        output.push(
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "start", marginTop: "32px" }}>
            {pairItems.map((img, ii) => (
              <div key={ii}>
                {img.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "8px", display: "block" }}
                  />
                ) : (
                  <div
                    className="w-full rounded-[3px] border border-[var(--border)] bg-[var(--bg-warm)] flex flex-col items-center justify-center gap-2 px-6"
                    style={{ aspectRatio: img.aspect }}
                  >
                    <span style={{ ...T.mono, textAlign: "center" }}>{img.label}</span>
                  </div>
                )}
                {img.caption && (
                  <p style={{ fontSize: "13px", fontStyle: "italic", color: "#999", textAlign: "center", marginTop: "8px", fontFamily: "var(--font-lato)" }}>
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        );
        i += 2;
        continue;
      }
      output.push(
        <div key={i} className="mt-8">
          <ImgSlot label={b.label} aspect={b.aspect} caption={b.caption} src={b.src} />
        </div>
      );
      i++;
      continue;
    }

    // Full-width image (cols:1 or unset)
    if (b.type === "image") {
      output.push(
        <div key={i} className="mt-8">
          <ImgSlot label={b.label} aspect={b.aspect} caption={b.caption} src={b.src} />
        </div>
      );
      i++;
      continue;
    }

    // Video row
    if (b.type === "video-row") {
      const hasRealVideos = b.videos.some((v) => v.src);
      output.push(
        hasRealVideos ? (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "24px", width: "100%", maxWidth: "800px" }}>
            {b.videos.map((v, vi) =>
              v.src ? (
                v.phoneFrame ? (
                  <div key={vi} style={{ position: "relative", background: "#0a0a0a", borderRadius: "44px", border: "10px solid #1c1c1e", overflow: "hidden", display: "block" }}>
                    {/* Dynamic island */}
                    <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", width: "72px", height: "22px", background: "#0a0a0a", borderRadius: "12px", zIndex: 10 }} />
                    <video autoPlay loop muted playsInline style={{ width: "100%", height: "auto", display: "block" }}>
                      <source src={v.src} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <video key={vi} autoPlay loop muted playsInline style={{ width: "100%", height: "auto", borderRadius: "8px", display: "block" }}>
                    <source src={v.src} type={v.src.endsWith(".mp4") ? "video/mp4" : "video/quicktime"} />
                  </video>
                )
              ) : (
                <VideoSlot key={vi} label={v.label} aspect={b.aspect} caption={v.caption} />
              )
            )}
          </div>
        ) : (
          <div key={i} className="mt-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", width: "100%", maxWidth: "800px" }}>
            {b.videos.map((v, vi) => (
              <VideoSlot key={vi} label={v.label} aspect={b.aspect} caption={v.caption} />
            ))}
          </div>
        )
      );
      i++;
      continue;
    }

    // Single video
    if (b.type === "video") {
      output.push(
        <div key={i} className="mt-8">
          {b.src ? (
            <div className="cs-single-video" style={{ maxWidth: "70%", margin: "0 auto" }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              >
                <source src={b.src} type="video/quicktime" />
                <source src={b.src} type="video/mp4" />
              </video>
            </div>
          ) : (
            <VideoSlot label={b.label} aspect={b.aspect} caption={b.caption} />
          )}
        </div>
      );
      i++;
      continue;
    }

    // Image carousel
    if (b.type === "carousel") {
      output.push(<CarouselBlock key={i} images={b.images} />);
      i++;
      continue;
    }

    // External link
    if (b.type === "external-link") {
      output.push(
        <a
          key={i}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6"
          style={{
            fontFamily:    "var(--font-lato)",
            fontSize:      "14px",
            fontWeight:    400,
            color:         "var(--ink)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {b.label}
        </a>
      );
      i++;
      continue;
    }

    // Before / After toggle
    if (b.type === "before-after-toggle") {
      output.push(
        <BeforeAfterToggle
          key={i}
          beforeSrc={b.beforeSrc}
          afterSrc={b.afterSrc}
          beforeLabel={b.beforeLabel}
          afterLabel={b.afterLabel}
        />
      );
      i++;
      continue;
    }

    // Centered image
    if (b.type === "centered-image") {
      output.push(
        <figure key={i} className="mt-12 mb-4 centered-img-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <style>{`.centered-img-wrap img { width: ${b.maxWidth ?? "65%"}; } @media (max-width: 767px) { .centered-img-wrap img { width: 100% !important; } }`}</style>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={b.src}
            alt={b.label}
            style={{
              maxWidth:  "100%",
              height:    "auto",
              display:   "block",
              objectFit: "contain",
            }}
          />
          {b.caption && <figcaption className="mt-2 text-center" style={T.caption}>{b.caption}</figcaption>}
        </figure>
      );
      i++;
      continue;
    }

    // Problem cards — sticky note style
    if (b.type === "problem-cards") {
      output.push(
        <div key={i} className="mt-6">
          <style>{`@media (max-width: 767px) { .problem-cards-row { flex-direction: column !important; } }`}</style>
          <div className="problem-cards-row" style={{ display: "flex", gap: "16px", alignItems: "stretch" }}>
            {b.cards.map((card, ci) => (
              <div
                key={ci}
                style={{
                  flex:          "1 1 0",
                  background:    b.cardBg ?? "#FFFBEA",
                  borderRadius:  "14px",
                  boxShadow:     "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
                  padding:       "24px 20px",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "10px",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-lato)",
                  fontWeight: 700,
                  fontSize:   "15px",
                  lineHeight: 1.35,
                  color:      "#1D2B3A",
                  margin:     0,
                }}>
                  {card.heading}
                </p>
                <p style={{
                  fontFamily: "var(--font-lato)",
                  fontWeight: 400,
                  fontSize:   "14px",
                  lineHeight: 1.65,
                  color:      "#4A5568",
                  margin:     0,
                }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Competitor cards — horizontal row, sticky-note style, icon + heading + body
    if (b.type === "competitor-cards") {
      output.push(
        <div key={i} className="mt-6">
          <style>{`@media (max-width: 767px) { .competitor-cards-row { flex-direction: column !important; } }`}</style>
          <div className="competitor-cards-row" style={{ display: "flex", gap: "16px", alignItems: "stretch" }}>
            {b.cards.map((card, ci) => (
              <div
                key={ci}
                style={{
                  flex:          "1 1 0",
                  background:    b.cardBg ?? "#FAE8E4",
                  borderRadius:  "14px",
                  boxShadow:     "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
                  padding:       "24px 20px",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {card.logoSrc && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={card.logoSrc} alt="" width={20} height={20} style={{ borderRadius: "4px", flexShrink: 0, display: "block" }} />
                  )}
                  <p style={{
                    fontFamily: "var(--font-lato)",
                    fontWeight: 700,
                    fontSize:   "15px",
                    lineHeight: 1.2,
                    color:      "#1D2B3A",
                    margin:     0,
                  }}>
                    {card.title}
                  </p>
                </div>
                <p style={{
                  fontFamily: "var(--font-lato)",
                  fontWeight: 400,
                  fontSize:   "14px",
                  lineHeight: 1.65,
                  color:      "#4A5568",
                  margin:     0,
                }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Quote cards — sticky-note style quote blocks
    if (b.type === "quote-cards") {
      output.push(
        <div key={i} className="mt-6">
          <style>{`@media (max-width: 767px) { .quote-cards-row { flex-direction: column !important; } }`}</style>
          <div className="quote-cards-row" style={{ display: "flex", gap: "16px", alignItems: "stretch" }}>
            {b.cards.map((card, ci) => (
              <div
                key={ci}
                style={{
                  flex:          "1 1 0",
                  background:    b.cardBg ?? "#EAE6FA",
                  borderRadius:  "14px",
                  boxShadow:     "0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
                  padding:       "24px 20px",
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "12px",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-lato)",
                  fontStyle:  "italic",
                  fontWeight: 400,
                  fontSize:   "15px",
                  lineHeight: 1.55,
                  color:      "#1D2B3A",
                  margin:     0,
                }}>
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p style={{
                  fontFamily: "var(--font-lato)",
                  fontWeight: 400,
                  fontSize:   "13px",
                  lineHeight: 1.4,
                  color:      "#6B7280",
                  margin:     0,
                }}>
                  {card.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Revision rows — alternating text/image two-column layout
    if (b.type === "revision-rows") {
      output.push(
        <div key={i}>
          <style>{`
            @media (max-width: 767px) {
              .revision-row { flex-direction: column !important; gap: 24px !important; }
              .revision-row-img { order: -1 !important; }
            }
          `}</style>
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {b.rows.map((row, ri) => (
              <div
                key={ri}
                className="revision-row"
                style={{
                  display:     "flex",
                  alignItems:  "center",
                  gap:         "48px",
                  flexDirection: row.imageLeft ? "row-reverse" : "row",
                }}
              >
                {/* Text column */}
                <div style={{ flex: "0 1 30%" }}>
                  <p style={{ ...T.body, fontSize: "14px", lineHeight: 1.65 }}>{row.text}</p>
                </div>
                {/* Image column */}
                <div
                  className="revision-row-img"
                  style={{ flex: "0 1 80%" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.imageSrc}
                    alt={`Revision ${ri + 1}`}
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Feature split — large heading + body left, video right
    if (b.type === "feature-split") {
      output.push(
        <div key={i}>
          <style>{`
            @media (max-width: 767px) {
              .feature-split-row { flex-direction: column !important; }
              .feature-split-row .feature-split-video { width: 100% !important; align-items: center !important; }
            }
          `}</style>
          <div
            className="feature-split-row"
            style={{ display: "flex", alignItems: "flex-start", gap: "48px" }}
          >
            {/* Left — text */}
            <div style={{ flex: "0 0 42%" }}>
              <h2 style={{ ...T.sectionHeading, marginBottom: "20px" }}>
                {b.heading}
              </h2>
              <p style={T.body}>{b.body}</p>
            </div>

            {/* Right — video card */}
            <div
              className="feature-split-video"
              style={{
                flex:           "1 1 0",
                display:        "flex",
                justifyContent: "center",
                alignItems:     "center",
                background:     "#F2F2F0",
                borderRadius:   "24px",
                padding:        "52px 48px",
              }}
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", maxWidth: "260px", height: "auto", display: "block", borderRadius: "8px", background: "transparent" }}
              >
                <source src={b.videoSrc} type="video/quicktime" />
                <source src={b.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Text blocks
    if (b.type === "paragraph") {
      output.push(
        <p key={i} style={T.body} className="mt-5">
          {b.boldPrefix && (
            <strong style={{ fontWeight: 700, color: "var(--ink)" }}>{b.boldPrefix}</strong>
          )}
          {b.text}
          {b.link && (
            <> <a
              href={b.link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >{b.link.label}</a></>
          )}
        </p>
      );
    } else if (b.type === "subheading") {
      output.push(<h3 key={i} id={b.id} style={T.subheading} className="mt-10 mb-1">{b.text}</h3>);
    } else if (b.type === "list") {
      output.push(
        <ul key={i} className="mt-5 space-y-2.5">
          {b.items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3">
              <span className="mt-[9px] w-[3px] h-[3px] rounded-full bg-[var(--ink-4)] shrink-0" />
              <span style={T.body}>{item}</span>
            </li>
          ))}
        </ul>
      );
    } else if (b.type === "finding") {
      output.push(
        <div
          key={i}
          className="mt-5 relative"
          style={{
            borderLeft:    b.bg ? "3px solid #5A8FA8" : `2px solid ${b.borderColor ?? "var(--border-strong)"}`,
            paddingLeft:   "16px",
            paddingTop:    b.bg ? "24px" : "4px",
            paddingBottom: b.bg ? "24px" : "4px",
            paddingRight:  b.bg ? "24px" : "0px",
            background:    b.bg,
          }}
        >
          {b.num && (
            <span
              aria-hidden
              style={{
                position:   "absolute",
                top:        "12px",
                right:      "16px",
                fontSize:   "32px",
                fontWeight: 700,
                fontFamily: "var(--font-lato)",
                color:      "#5A8FA8",
                opacity:    0.25,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {b.num}
            </span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            {b.logoSrc && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={b.logoSrc} alt="" width={20} height={20} style={{ borderRadius: "4px", flexShrink: 0, display: "block" }} />
            )}
            <p style={{ ...T.subheading, fontSize: "15px", fontWeight: 900, margin: 0, lineHeight: 1.2 }}>{b.title}</p>
          </div>
          <p style={{ ...T.body, fontSize: "14px", color: "var(--ink)", margin: 0 }}>{b.body}</p>
          {b.reasoning && (
            <p style={{ fontFamily: "var(--font-lato)", fontStyle: "italic", fontWeight: 300, fontSize: "14px", color: b.bg ? "var(--ink)" : "#666", lineHeight: 1.6, marginTop: "8px" }}>
              {b.reasoning}
            </p>
          )}
        </div>
      );
    } else if (b.type === "quote") {
      output.push(
        <blockquote key={i} className="mt-8 pl-6 border-l-2 border-[var(--ink)] py-1">
          <p style={{
            fontFamily:    "Georgia, serif",
            fontStyle:     "normal",
            fontWeight:    400,
            fontSize:      "18px",
            lineHeight:    1.5,
            letterSpacing: "-0.015em",
            color:         "var(--ink)",
          }}>
            &ldquo;{b.text}&rdquo;
          </p>
          <cite
            className="block mt-3 not-italic text-[13px] text-[var(--ink-4)]"
            style={{ fontFamily: "var(--font-lato)", letterSpacing: "0.04em" }}
          >
            — {b.attribution}
          </cite>
        </blockquote>
      );
    }

    i++;
  }

  return output;
}

// ─────────────────────────────────────────────────────────────
export default function WorkPage() {
  const { slug }   = useParams();
  const project    = projects.find((p) => p.id === slug);
  const caseStudy  = caseStudies[slug as string];
  const controls   = useAnimation();
  const router     = useRouter();

  const sectionIds = caseStudy?.sections.map((s) => s.id) ?? [];
  const activeId   = useActiveSection(sectionIds);

  const heroRef = useRef<HTMLDivElement>(null);
  const [tocVisible, setTocVisible] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setTocVisible(entry.boundingClientRect.top < 0);
        } else {
          setTocVisible(false);
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smooth exit animation on "back" navigation
  const handleBack = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await controls.start({
      opacity: 0,
      y: 0,
      transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1] },
    });
    router.push("/#work");
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p style={T.mono} className="mb-4">404</p>
          <Link href="/" className="text-[var(--ink)] underline text-sm">Back to work</Link>
        </div>
      </div>
    );
  }

  const nextProject = projects[(projects.findIndex((p) => p.id === slug) + 1) % projects.length];

  if (!caseStudy) {
    return (
      <div className="bg-[var(--bg)]">
        <div className="max-w-[680px] mx-auto px-6 pt-16 pb-32">
          <Link href="/" style={T.mono} className="block mb-12 hover:text-[var(--ink-3)] transition-colors">← Work</Link>
          <h1 style={T.projectTitle}>{project.title}</h1>
          <p className="mt-6 text-[18px] text-[var(--ink-3)] font-light leading-relaxed">{project.description}</p>
          <p className="mt-24 text-[var(--ink-4)] text-sm">Case study coming soon.</p>
        </div>
      </div>
    );
  }

  const hasScrollPhone  = !!caseStudy.scrollPhone;
  const contentMaxWidth = hasScrollPhone ? 1100 : 960;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
    <motion.div className="bg-[var(--bg)]" animate={controls}>
      <style>{`@media (max-width: 767px) { .cs-single-video { max-width: 90% !important; } }`}</style>

      {/* ── Hero image — full width ───────────────────────────── */}
      {caseStudy.heroImage.src ? (
        <div className="w-full overflow-hidden slug-hero-wrap" style={{ aspectRatio: caseStudy.heroImage.aspect ?? "21/9" }}>
          <style>{`@media (max-width: 767px) { .slug-hero-wrap { aspect-ratio: 4/3 !important; } }`}</style>
          <Image
            src={caseStudy.heroImage.src}
            alt={caseStudy.title}
            width={1600}
            height={900}
            className="w-full h-full block"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
            priority
          />
        </div>
      ) : (
        <div
          className="w-full bg-[var(--bg-warm)] border-b border-[var(--border)] flex items-center justify-center"
          style={{ height: "65vh", minHeight: "400px" }}
        >
          <span style={T.mono}>{caseStudy.heroImage.label}</span>
        </div>
      )}

      {/* sentinel: TOC appears when this crosses the viewport top */}
      <div ref={heroRef} aria-hidden="true" />

      {/* ── TOC + content ─────────────────────────────────────── */}
      <div
        className="mx-auto px-6 md:px-10 flex items-start gap-12 pt-12 pb-32"
        style={{ maxWidth: `${contentMaxWidth}px` }}
      >

        <TableOfContents
          sections={caseStudy.sections}
          activeId={activeId}
          onBack={handleBack}
          visible={tocVisible}
          contentMaxWidth={contentMaxWidth}
        />

        <div className="flex-1 min-w-0">
          <div className={hasScrollPhone ? "flex gap-8" : undefined}>

            {/* ── Main text column ───────────────────────── */}
            <div className={hasScrollPhone ? "flex-1 min-w-0" : undefined}>

              {/* ── Title section ────────────────────────── */}
              <div className="pb-10">

                {/* Back link (mobile only) */}
                <a
                  href="/"
                  onClick={handleBack}
                  style={{ ...T.mono, textDecoration: "none", paddingTop: "10px", paddingBottom: "10px" }}
                  className="inline-flex items-center gap-2 mb-8 lg:hidden hover:text-[var(--ink-3)] transition-colors cursor-pointer"
                >
                  ← Work
                </a>


                <h1 style={T.projectTitle}>{caseStudy.title}</h1>

                <p className="mt-2.5" style={{ ...T.body, fontFamily: "var(--font-lato)", letterSpacing: "-0.028em", color: "var(--ink-3)", fontSize: "18px" }}>
                  {caseStudy.subtitle}
                </p>

                <p
                  className="mt-2"
                  style={{ fontFamily: "var(--font-lato)", fontStyle: "italic", fontSize: "15px", letterSpacing: "-0.028em", color: "var(--ink-4)", lineHeight: 1.6 }}
                >
                  {caseStudy.context} · {caseStudy.tools.join(", ")}
                </p>
              </div>

              {/* ── Content sections ─────────────────────── */}
              {caseStudy.sections.map((section) => {
                const phoneEntry = caseStudy.scrollPhone?.sections.find((s) => s.id === section.id);
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="mt-14 pt-2"
                    style={{ scrollMarginTop: "100px" }}
                  >
                    {/* Mobile-only inline phone video */}
                    {hasScrollPhone && phoneEntry !== undefined && (
                      <div className="md:hidden mb-8">
                        <PhoneWrapper scale={0.5}>
                          <IPhoneFrame>
                            {phoneEntry.videoSrc ? (
                              <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                                <source src={phoneEntry.videoSrc} type="video/quicktime" />
                              </video>
                            ) : (
                              <div style={{ width: "100%", height: "100%", background: "#111" }} />
                            )}
                          </IPhoneFrame>
                        </PhoneWrapper>
                      </div>
                    )}
                    {section.heading && (
                      <h2 style={T.sectionHeading} className="mb-6">
                        {section.heading}
                      </h2>
                    )}
                    {renderBlocks(section.blocks)}
                  </section>
                );
              })}

            </div>

            {/* ── Sticky phone column (desktop only) ─────── */}
            {hasScrollPhone && (
              <ScrollPhoneColumn phoneSections={caseStudy.scrollPhone!.sections} />
            )}

          </div>
        </div>
      </div>


    </motion.div>
    </motion.div>
  );
}

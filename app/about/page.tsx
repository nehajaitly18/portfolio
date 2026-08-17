"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

const EXPO = [0.16, 1, 0.3, 1] as const;

const experience = [
  {
    role: "VP of Creative Design",
    org: "Michigan Advertising & Marketing",
    period: "Sep 2025 — Present",
    details:
      "Lead creative direction for Michigan's premier student advertising and marketing organization. Oversee brand strategy, campaign design, and mentor a team of designers across multiple client accounts.",
  },
  {
    role: "Graphic Designer",
    org: "ArtsEngine",
    period: "Aug 2025 — Present",
    details:
      "Design visual assets, print materials, and digital communications for ArtsEngine's cross-disciplinary arts programs at the University of Michigan.",
  },
  {
    role: "Instructional Aide",
    org: "UMSI",
    period: "Jan 2026 — Present",
    details:
      "Support course instruction at the School of Information, helping students develop design thinking, research methodology, and UX fundamentals.",
  },
  {
    role: "UX/UI Intern",
    org: "Paytm India",
    period: "May — Jul 2025",
    details:
      "Redesigned the micro-merchant loan application flow, reducing drop-off friction and improving accessibility for India's informal economy. Shipped to production within 6 weeks.",
  },
];

// ── Interest card components ───────────────────────────────

function FilmCameraCard() {
  return (
    <div style={{
      width: 130, height: 144,
      background: "#fafaf8",
      border: "1px solid var(--border)",
      borderRadius: 3,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8, padding: 14,
    }}>
      <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
        <rect x="4"  y="22" width="82" height="44" rx="6" fill="#2d2d2d" />
        <rect x="28" y="14" width="22" height="12" rx="3" fill="#2d2d2d" />
        <rect x="68" y="16" width="14" height="8"  rx="2" fill="#2d2d2d" />
        <rect x="0"  y="28" width="8"  height="10" rx="2" fill="#444" />
        <rect x="82" y="28" width="8"  height="10" rx="2" fill="#444" />
        <circle cx="37" cy="44" r="16" fill="#1a1a1a" stroke="#444" strokeWidth="1.5" />
        <circle cx="37" cy="44" r="12" fill="#222"   stroke="#555" strokeWidth="0.8" />
        <circle cx="37" cy="44" r="7"  fill="#111" />
        <circle cx="37" cy="44" r="3"  fill="#0a0a0a" />
        <circle cx="33" cy="40" r="2.2" fill="rgba(255,255,255,0.18)" />
        <circle cx="68" cy="26" r="4" fill="#c0392b" />
        <circle cx="68" cy="26" r="2.5" fill="#e74c3c" />
      </svg>
      <p style={{ fontSize: 9, color: "var(--ink-4)", fontFamily: "var(--font-lato)", textTransform: "uppercase", letterSpacing: "0.14em", margin: 0 }}>
        35mm
      </p>
    </div>
  );
}

function VinylCard() {
  return (
    <div style={{
      width: 140, height: 172,
      position: "relative", overflow: "hidden", flexShrink: 0,
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 3,
      isolation: "isolate",
    }}>
      <Image src="/music.jpeg" alt="Now playing" fill sizes="140px" priority style={{ objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 10,
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ width: 92, height: 92, borderRadius: "50%", background: "rgba(10,10,10,0.85)", position: "relative" }}
        >
          {[40, 32, 24, 16].map(r => (
            <div key={r} style={{
              position: "absolute",
              left: `calc(50% - ${r}px)`, top: `calc(50% - ${r}px)`,
              width: r * 2, height: r * 2,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
            }} />
          ))}
          <div style={{
            position: "absolute", inset: "30%", borderRadius: "50%",
            background: "#c0392b",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#111" }} />
          </div>
        </motion.div>
        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-lato)", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
          Now Playing
        </p>
      </div>
    </div>
  );
}

function PantoneCard() {
  return (
    <div style={{
      width: 100, height: 152,
      background: "#FFFFFF",
      border: "1px solid var(--border)",
      borderRadius: 3,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ flex: 1, background: "#6E2334" }} />
      <div style={{ padding: "6px 8px 8px" }}>
        <p style={{ fontSize: 7, fontFamily: "var(--font-lato)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#111", margin: "0 0 2px" }}>
          PANTONE®
        </p>
        <p style={{ fontSize: 7, fontFamily: "var(--font-lato)", color: "var(--ink-2)", margin: 0, letterSpacing: "0.04em" }}>
          19-1664 TCX
        </p>
        <p style={{ fontSize: 6, fontFamily: "var(--font-lato)", color: "var(--ink-4)", margin: "1px 0 0", letterSpacing: "0.04em" }}>
          Maroon
        </p>
      </div>
    </div>
  );
}

function IcedLatteCard() {
  return (
    <div style={{
      width: 120, height: 152,
      background: "#fdfaf6",
      border: "1px solid var(--border)",
      borderRadius: 3,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8, padding: 14,
    }}>
      <svg width="50" height="78" viewBox="0 0 50 78" fill="none">
        <path d="M7 12 L5 70 Q5 74 9 74 L41 74 Q45 74 45 70 L43 12 Z" fill="rgba(200,180,150,0.22)" stroke="#c8b896" strokeWidth="1.5" />
        <path d="M7 12 L43 12 L41 24 L9 24 Z" fill="rgba(101,67,33,0.72)" />
        <path d="M7 12 Q25 8 43 12" fill="rgba(255,245,230,0.88)" stroke="rgba(200,180,150,0.5)" strokeWidth="0.8" />
        <rect x="13" y="29" width="10" height="10" rx="2" fill="rgba(220,240,255,0.72)" stroke="rgba(180,210,240,0.8)" strokeWidth="0.8" />
        <rect x="27" y="31" width="9"  height="9"  rx="2" fill="rgba(220,240,255,0.65)" stroke="rgba(180,210,240,0.8)" strokeWidth="0.8" />
        <rect x="17" y="43" width="11" height="10" rx="2" fill="rgba(220,240,255,0.60)" stroke="rgba(180,210,240,0.7)" strokeWidth="0.8" />
        <rect x="31" y="2" width="3.5" height="54" rx="1.5" fill="#c0392b" opacity="0.85" />
      </svg>
      <p style={{ fontSize: 9, color: "var(--ink-4)", fontFamily: "var(--font-lato)", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>
        iced latte
      </p>
    </div>
  );
}

function SuitsCard() {
  return (
    <div style={{
      width: 130, height: 162,
      background: "#0d0d0f",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 3,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 6, padding: 16,
    }}>
      <p style={{
        fontSize: 26, fontFamily: "Georgia, serif", fontWeight: 400, fontStyle: "italic",
        color: "#FFFFFF", margin: 0, letterSpacing: "0.14em",
      }}>
        SUITS
      </p>
      <div style={{ width: 40, height: 1, background: "#333" }} />
      <p style={{ fontSize: 7, color: "#555", fontFamily: "var(--font-lato)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", margin: 0 }}>
        USA Network
      </p>
    </div>
  );
}

type InterestCard = { id: string; rot: number; El: React.FC };

const INTEREST_CARDS: InterestCard[] = [
  { id: "camera",  rot: -2, El: FilmCameraCard },
  { id: "vinyl",   rot:  3, El: VinylCard      },
  { id: "pantone", rot: -1, El: PantoneCard    },
  { id: "latte",   rot:  2, El: IcedLatteCard  },
  { id: "suits",   rot: -2, El: SuitsCard      },
];

// ── Experience expanding row ───────────────────────────────

function ExperienceRow({
  item, index, isLast, inView,
}: {
  item: typeof experience[0];
  index: number;
  isLast: boolean;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EXPO, delay: 0.1 + index * 0.07 }}
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width:      "100%",
          display:    "flex",
          alignItems: "baseline",
          gap:        16,
          padding:    "24px 0",
          background: "none",
          border:     "none",
          cursor:     "pointer",
          textAlign:  "left",
        }}
      >
        <span style={{
          fontFamily:    "var(--font-lato)",
          fontSize:      11,
          letterSpacing: "0.18em",
          color:         "var(--ink-4)",
          textTransform: "uppercase" as const,
          minWidth:      28,
          flexShrink:    0,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{
          fontFamily: "var(--font-lato)",
          fontSize:   16,
          fontWeight: 400,
          color:      "var(--ink)",
          flex:       1,
        }}>
          {item.role}
        </span>
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: "var(--font-lato)",
            fontSize:   13,
            color:      "var(--ink-3)",
            minWidth:   140,
            flexShrink: 0,
          }}
        >
          {item.org}
        </span>
        <span
          className="hidden md:inline"
          style={{
            fontFamily:    "var(--font-lato)",
            fontSize:      11,
            color:         "var(--ink-4)",
            letterSpacing: "0.04em",
            minWidth:      140,
            flexShrink:    0,
          }}
        >
          {item.period}
        </span>
        <span
          style={{
            fontFamily:  "var(--font-lato)",
            fontSize:    18,
            color:       "var(--ink-3)",
            transition:  "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            display:     "inline-block",
            transform:   open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink:  0,
            lineHeight:  1,
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EXPO }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: 24, paddingLeft: 44 }}>
              {/* Org + period on mobile (hidden on md+) */}
              <p style={{
                fontFamily:    "var(--font-lato)",
                fontSize:      12,
                color:         "var(--ink-4)",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                marginBottom:  8,
              }}
                className="sm:hidden"
              >
                {item.org} · {item.period}
              </p>
              <p style={{
                fontFamily: "var(--font-lato)",
                fontSize:   14,
                fontWeight: 300,
                color:      "var(--ink-3)",
                lineHeight: 1.7,
                maxWidth:   640,
              }}>
                {item.details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

  const interestsRef = useRef<HTMLElement>(null);
  const interestsInView = useInView(interestsRef, { once: true, margin: "-80px" });

  const expRef = useRef<HTMLElement>(null);
  const expInView = useInView(expRef, { once: true, margin: "-60px" });

  const [imgReady, setImgReady] = useState(false);
  const pathname = usePathname();

  // Reset + preload on every navigation to /about so wipe re-triggers
  useEffect(() => {
    setImgReady(false);
    const img = new window.Image();
    img.src = "/about me hero updated.png";
    const show = () => requestAnimationFrame(() => requestAnimationFrame(() => setImgReady(true)));
    if (img.complete) {
      show();
    } else {
      img.onload = show;
    }
  }, [pathname]);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Full-screen hero image ─────────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .about-hero-wrap { padding-left: 0 !important; padding-right: 0 !important; }
          .about-hero-img  { width: 90% !important; }
        }
      `}</style>
      <div className="about-hero-wrap" style={{ display: "flex", justifyContent: "center", padding: "32px 24px 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          // eslint-disable-next-line react/no-unknown-property
          fetchPriority="high"
          key={pathname}
          src="/about me hero updated.png"
          alt=""
          className="about-hero-img"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={imgReady ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          style={{ width: "55%", height: "auto", display: "block" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", paddingTop: "16px", paddingBottom: "0" }}>
        <p style={{
          fontFamily:    '"bogart", serif',
          fontWeight:    700,
          fontSize:      "clamp(1.5rem, 3.5vw, 2.75rem)",
          color:         "var(--ink)",
          letterSpacing: "-0.03em",
          lineHeight:    1,
          margin:        0,
        }}>
          Hi There &lt;3
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left", padding: "32px 24px 0", maxWidth: "640px", margin: "0 auto" }}>
        <p style={{
          fontFamily: "var(--font-lato)",
          fontSize:   "17px",
          fontWeight: 300,
          color:      "var(--ink-2)",
          lineHeight: 1.7,
          margin:     "0 0 16px 0",
        }}>
          A graphic and UX designer. I enjoy designing experiences that balance aesthetics and usability — combining strong visual systems with thoughtful interaction design.
        </p>
        <p style={{
          fontFamily: "var(--font-lato)",
          fontSize:   "16px",
          fontWeight: 300,
          color:      "var(--ink-3)",
          lineHeight: 1.7,
          margin:     0,
        }}>
          Fueled by the small details in design and a constant curiosity to keep learning.
        </p>
      </div>

      {/* ── Section 3: Experience ─────────────────────────── */}
      <section
        ref={expRef}
        style={{
          paddingTop:    "clamp(64px, 8vw, 96px)",
          paddingBottom: "clamp(64px, 8vw, 96px)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">

          <motion.span
            initial={{ opacity: 0 }}
            animate={expInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-label"
            style={{ display: "block", marginBottom: 48 }}
          >
            Experience
          </motion.span>

          {/* Expanding list */}
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {experience.map((item, i) => (
              <ExperienceRow
                key={item.org}
                item={item}
                index={i}
                isLast={i === experience.length - 1}
                inView={expInView}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

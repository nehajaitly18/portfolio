"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#FFFFFF", borderTop: "1px solid var(--border)" }}>
      <div
        style={{
          maxWidth:       "1200px",
          margin:         "0 auto",
          padding:        "72px 80px",
          display:        "flex",
          flexWrap:       "wrap",
          alignItems:     "flex-start",
          justifyContent: "space-between",
          gap:            "40px",
        }}
        className="px-6 md:px-20"
      >

        {/* ── Left ───────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", flex: "1 1 280px" }}>

          <span
            style={{
              fontFamily: '"bogart", serif',
              fontWeight: 700,
              fontSize:   "clamp(28px, 2.5vw, 36px)",
              color:      "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            Thanks for being here &lt;3
          </span>

          <span
            style={{
              fontFamily: "var(--font-lato)",
              fontWeight: 400,
              fontSize:   "18px",
              color:      "var(--ink-3)",
              marginTop:  "20px",
            }}
          >
            Get in touch
          </span>

          {/* Icons + Resume row */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center", marginTop: "14px" }}>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/neha-jaitly18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                color:      "var(--ink-2)",
                transition: "color 0.15s, transform 0.15s",
                display:    "flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
                <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            </a>

            {/* Mail */}
            <a
              href="mailto:jaitly.neha1@gmail.com"
              aria-label="Email"
              style={{
                color:      "var(--ink-2)",
                transition: "color 0.15s, transform 0.15s",
                display:    "flex",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Resume */}
            <a
              href="https://drive.google.com/file/d/15KAo-F76DlpTJd1CSJuGZXczB2D-Dntl/view?usp=share_link"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:     "var(--font-lato)",
                fontWeight:     400,
                fontSize:       "15px",
                color:          "var(--ink-2)",
                textDecoration: "none",
                transition:     "color 0.15s, transform 0.15s",
                display:        "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Resume
            </a>

          </div>

          {/* Copyright */}
          <div
            style={{
              display:    "flex",
              alignItems: "baseline",
              gap:        "5px",
              marginTop:  "32px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-lato)",
                fontWeight: 300,
                fontSize:   "14px",
                color:      "var(--ink-4)",
              }}
            >
              2026 All rights reserved.
            </span>
            <span
              style={{
                fontFamily: '"bogart", serif',
                fontWeight: 700,
                fontSize:   "17px",
                color:      "var(--ink)",
                display:    "inline-flex",
                alignItems: "center",
                gap:        "4px",
              }}
            >
              neha
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/star.png" alt="" aria-hidden="true" style={{ width: "28px", height: "28px", objectFit: "contain", display: "block", flexShrink: 0 }} />
            </span>
          </div>

        </div>

        {/* ── Right ──────────────────────────────────────────── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            alignItems:    "flex-start",
            gap:           "16px",
            flex:          "0 0 auto",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-lato)",
              fontWeight: 400,
              fontSize:   "13px",
              color:      "var(--ink-4)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Links
          </span>

          <nav style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
            {[
              { label: "Home",  href: "/" },
              { label: "About", href: "/about" },
              { label: "Work",  href: "/#work" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontFamily:     "var(--font-lato)",
                  fontWeight:     400,
                  fontSize:       "15px",
                  color:          "var(--ink-3)",
                  textDecoration: "none",
                  transition:     "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}

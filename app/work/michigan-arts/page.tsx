"use client";

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

const INITIATIVES = [
  "Michigan Arts",
  "Arts Initiative",
  "Passport to the Arts",
  "Arts Outta Town",
  "State of the Arts",
  "Arts RX",
];

export default function MichiganArtsPage() {
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
      <style>{`@media (max-width: 767px) { .michigan-page { margin-top: -56px !important; } }`}</style>
      <motion.div className="michigan-page bg-[var(--bg)]" animate={controls} style={{ marginTop: "-64px" }}>
        <BackButton />

        {/* ── 1. Hero Image ─────────────────────────────────── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/arts hero.png"
          alt="Michigan Arts Initiative — hero"
          style={{
            display:   "block",
            width:     "100%",
            height:    "auto",
          }}
        />

        {/* ── 2. Title + Subtitle ───────────────────────────── */}
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
            Michigan Arts Initiative
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
            Adobe Illustrator, Photoshop · 2024
          </p>
        </div>

        {/* ── 3. Client's Mission ───────────────────────────── */}
        <div className="max-w-[960px] mx-auto px-6 md:px-10 pt-12 pb-10">
          <h2 style={{ ...T.sectionHeading, marginBottom: "24px" }}>Client&apos;s Mission</h2>
          <p style={T.body}>
            To elevate the role of the arts on campus, but also bring them to bear on research
            focused on solving some of our greatest challenges. We acknowledge the university&apos;s
            long interest in the arts, from its very beginnings, and commitment to making the arts
            accessible and available to all students and the wider community.
          </p>
        </div>

        {/* ── 4. Overview ──────────────────────────────────── */}
        <div className="max-w-[960px] mx-auto px-6 md:px-10 pb-16">
          <h2 style={{ ...T.sectionHeading, marginBottom: "24px" }}>Overview</h2>
          <p style={T.body}>
            To create 6 posters for the initiative and to make it appealing across all majors and
            schools in Michigan. The goal is to create more interest within the arts. The 6 initiatives:
          </p>
          <ol style={{ marginTop: "20px", paddingLeft: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {INITIATIVES.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "baseline", gap: "16px", ...T.body, marginTop: 0 }}>
                <span style={{
                  fontFamily:    "var(--font-lato)",
                  fontSize:      "12px",
                  fontWeight:    400,
                  color:         "var(--ink-4)",
                  letterSpacing: "0.06em",
                  minWidth:      "20px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* ── 5. Two spread images with gap ────────────────── */}
        <div className="flex flex-col md:flex-row" style={{ gap: "8px", paddingBottom: "8px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arts 2.png"
            alt="Michigan Arts poster spread 1"
            className="w-full md:w-1/2"
            style={{ height: "auto", display: "block", objectFit: "contain" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/arts 3.png"
            alt="Michigan Arts poster spread 2"
            className="w-full md:w-1/2"
            style={{ height: "auto", display: "block", objectFit: "contain" }}
          />
        </div>

        {/* ── 6. Two images with no gap ─────────────────────── */}
        <style>{`@media (max-width: 767px) { .michigan-no-gap img { height: 260px !important; } }`}</style>
        <div className="michigan-no-gap flex flex-col md:flex-row" style={{ gap: "0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/first 3 mockup.png"
            alt="Michigan Arts posters 1–3 mockup"
            className="w-full md:w-1/2"
            style={{ height: "560px", objectFit: "cover", display: "block" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/last 3.png"
            alt="Michigan Arts posters 4–6 mockup"
            className="w-full md:w-1/2"
            style={{ height: "560px", objectFit: "cover", display: "block" }}
          />
        </div>

      </motion.div>
    </>
  );
}

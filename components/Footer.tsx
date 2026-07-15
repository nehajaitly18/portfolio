"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative bg-[var(--bg-dark)] text-[#FAFAF7] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">

        {/* Availability — small, specific, honest */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[10px] tracking-[0.2em] uppercase text-[#555] mb-10"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          Available for Summer 2026 internships
        </motion.p>

        {/* CTA in Playfair italic — the same voice as the hero */}
        <div className="mb-14 md:mb-20">
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: EXPO, delay: 0.1 }}
              style={{
                fontFamily:    "var(--font-playfair)",
                fontStyle:     "italic",
                fontWeight:    400,
                fontSize:      "clamp(44px, 6.5vw, 92px)",
                lineHeight:    1.08,
                letterSpacing: "-0.025em",
                color:         "#FAFAF7",
              }}
            >
              Let&rsquo;s find
            </motion.h2>
          </div>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: "108%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: EXPO, delay: 0.18 }}
              style={{
                fontFamily:    "var(--font-playfair)",
                fontStyle:     "italic",
                fontWeight:    400,
                fontSize:      "clamp(44px, 6.5vw, 92px)",
                lineHeight:    1.08,
                letterSpacing: "-0.025em",
                color:         "#FAFAF7",
              }}
            >
              the right problem.
            </motion.h2>
          </div>
        </div>

        {/* Email — the actual action, unhidden */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          href="mailto:jaitly.neha1@gmail.com"
          className="group inline-flex items-baseline gap-2"
        >
          <span
            className="border-b border-[#333] pb-0.5 text-[#AEADA9] transition-colors duration-300 group-hover:text-white group-hover:border-[#666]"
            style={{
              fontSize:   "clamp(15px, 1.5vw, 20px)",
              fontFamily: "var(--font-lato)",
              letterSpacing: "0.02em",
            }}
          >
            jaitly.neha1@gmail.com
          </span>
          <span className="text-[#555] text-[12px] transition-colors duration-300 group-hover:text-[#999]">
            ↗
          </span>
        </motion.a>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 md:mt-24 pt-7 border-t border-[#1E1E1D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <span
            className="text-[11px] text-[#444]"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            © 2026 Neha Jaitly
          </span>

          <div className="flex items-center gap-6">
            {[
              { label: "Work",     href: "/" },
              { label: "About",    href: "/about" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/nehajaitly", external: true },
            ].map(({ label, href, external }) => (
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#444] hover:text-[#888] transition-colors duration-200 tracking-wide"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {label} ↗
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  className="text-[11px] text-[#444] hover:text-[#888] transition-colors duration-200 tracking-wide"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {label}
                </Link>
              )
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

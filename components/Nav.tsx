"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/ui/cn";

const LETTERS = ['n', 'e', 'h', 'a'];

const BOGART: React.CSSProperties = {
  fontFamily:    '"bogart", serif',
  fontWeight:    700,
  fontSize:      '26px',
  color:         'var(--ink)',
  display:       'inline-block',
  lineHeight:    1,
  userSelect:    'none',
  letterSpacing: '-0.03em',
};

function NavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "tracking-normal relative group transition-colors duration-200",
        active
          ? "text-[var(--ink)]"
          : "text-[var(--ink-3)] hover:text-[var(--ink)]"
      )}
      style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '16px' }}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-[var(--ink)] transition-all duration-300",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname                  = usePathname();
  const nameRef                   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Staggered bounce-in on first intersection */
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('[data-animate]'));
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('letter-bounce-in');
          span.addEventListener('animationend', () => span.classList.remove('letter-bounce-in'), { once: true });
        }, i * 50);
      });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500",
          scrolled && "backdrop-blur-md bg-white/92"
        )}
      >
        {/* Mobile */}
        <div className="md:hidden relative px-5 h-14 flex items-center">
          {/* Logo — absolutely centered */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-end" aria-label="Neha Jaitly — home">
            {LETTERS.map((letter) => (
              <span key={letter} style={{ ...BOGART, fontSize: '20px' }}>{letter}</span>
            ))}
          </Link>
          {/* Hamburger — right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={cn("block h-px bg-[var(--ink)] transition-all duration-300", menuOpen ? "w-6 translate-y-[5px] rotate-45" : "w-6")} />
            <span className={cn("block h-px bg-[var(--ink)] transition-all duration-300", menuOpen ? "opacity-0 w-4" : "w-4")} />
            <span className={cn("block h-px bg-[var(--ink)] transition-all duration-300", menuOpen ? "w-6 -translate-y-[5px] -rotate-45" : "w-6")} />
          </button>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center justify-center gap-8 h-16">
          <NavLink href="/#work" active={pathname === "/"}>Work</NavLink>
          <span
            data-cursor-label="Coming soon"
            style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '16px', color: 'var(--ink-4)', cursor: 'none', userSelect: 'none' }}
          >
            About
          </span>

          <span ref={nameRef}>
            <Link href="/" className="flex items-end" aria-label="Neha Jaitly — home">
              {LETTERS.map((letter) => (
                <span
                  key={letter}
                  data-animate
                  style={{
                    ...BOGART,
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.transform = 'translateY(-8px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.transform = 'translateY(0)'; }}
                >
                  {letter}
                </span>
              ))}
            </Link>
          </span>

          <a
            href="https://drive.google.com/file/d/15KAo-F76DlpTJd1CSJuGZXczB2D-Dntl/view?usp=share_link"
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-normal relative group transition-colors duration-200 text-[var(--ink-3)] hover:text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-lato)', fontWeight: 400, fontSize: '16px' }}
          >
            Resume
            <span className="absolute -bottom-0.5 left-0 h-px bg-[var(--ink)] transition-all duration-300 w-0 group-hover:w-full" />
          </a>
        </nav>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[45] bg-white flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {[
                { href: "/#work", label: "Work"  },
              ].map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-light tracking-tight not-italic"
                    style={{ fontFamily: 'var(--font-lato)', fontStyle: 'normal' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06, duration: 0.4 }}
              >
                <span
                  className="text-4xl font-light tracking-tight not-italic"
                  style={{ fontFamily: 'var(--font-lato)', fontStyle: 'normal', color: 'var(--ink-4)', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  About
                  <span style={{ fontFamily: 'var(--font-lato)', fontSize: '13px', fontWeight: 400, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>Coming soon</span>
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
              >
                <a
                  href="https://drive.google.com/file/d/15KAo-F76DlpTJd1CSJuGZXczB2D-Dntl/view?usp=share_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl font-light tracking-tight not-italic"
                  style={{ fontFamily: 'var(--font-lato)', fontStyle: 'normal' }}
                >
                  Resume ↗
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

</>
  );
}

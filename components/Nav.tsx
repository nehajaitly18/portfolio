"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/components/ui/cn";

const LETTERS = ['n', 'e', 'h', 'a'];

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
        "text-[13px] tracking-wide relative group transition-colors duration-200",
        active
          ? "text-[var(--ink)]"
          : "text-[var(--ink-3)] hover:text-[var(--ink)]"
      )}
      style={{ fontFamily: 'var(--font-atma)', fontWeight: 400, fontSize: '16px' }}
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        {/* Mobile layout: hamburger | name | empty */}
        <div className="md:hidden max-w-[1200px] mx-auto px-6 h-16 pt-3 grid grid-cols-3 items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex flex-col justify-center items-start gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={cn("block h-px bg-[var(--ink)] transition-all duration-300", menuOpen ? "w-6 translate-y-[5px] rotate-45" : "w-6")} />
            <span className={cn("block h-px bg-[var(--ink)] transition-all duration-300", menuOpen ? "opacity-0 w-4" : "w-4")} />
            <span className={cn("block h-px bg-[var(--ink)] transition-all duration-300", menuOpen ? "w-6 -translate-y-[5px] -rotate-45" : "w-6")} />
          </button>
          <Link href="/" className="flex items-end justify-center" aria-label="Neha Jaitly — home">
            {LETTERS.map((letter) => (
              <span
                key={letter}
                style={{
                  fontFamily: 'var(--font-atma)',
                  fontWeight: 600,
                  fontSize: '36px',
                  color: 'var(--ink)',
                  display: 'inline-block',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {letter}
              </span>
            ))}
          </Link>
          <div />
        </div>

        {/* Desktop layout: centered cluster — Work · About · name · Resume */}
        <nav className="hidden md:flex items-center justify-center gap-8 h-16 pt-3">
          <NavLink href="/#projects" active={pathname === "/"}>Work</NavLink>
          <NavLink href="/about" active={pathname === "/about"}>About</NavLink>

          <span ref={nameRef}>
            <Link
              href="/"
              className="flex items-end"
              aria-label="Neha Jaitly — home"
            >
              {LETTERS.map((letter) => (
                <span
                  key={letter}
                  data-animate
                  style={{
                    fontFamily: 'var(--font-atma)',
                    fontWeight: 600,
                    fontSize: '36px',
                    color: 'var(--ink)',
                    display: 'inline-block',
                    lineHeight: 1,
                    userSelect: 'none',
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
            href="https://drive.google.com/your-resume-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] tracking-wide relative group transition-colors duration-200 text-[var(--ink-3)] hover:text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-atma)', fontWeight: 400, fontSize: '16px' }}
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
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {[
                { href: "/#projects", label: "Work" },
                { href: "/about", label: "About"  },
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
                    className="text-5xl font-light tracking-tight not-italic"
                    style={{ fontFamily: 'var(--font-lato)', fontStyle: 'normal' }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
              >
                <a
                  href="https://drive.google.com/your-resume-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-5xl font-light tracking-tight not-italic"
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

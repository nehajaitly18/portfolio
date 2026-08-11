"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [label, setLabel]     = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const pill = pillRef.current;
    if (!dot || !pill) return;

    const onMove = (e: MouseEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      dot.style.left = x;
      dot.style.top = y;
      pill.style.left = x;
      pill.style.top = y;
      setVisible(true);
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      setLabel(el.dataset.cursorLabel ?? null);
    };
    const onLeave = () => setLabel(null);
    const onClick = () => setLabel(null);

    const bind = () => {
      document.querySelectorAll("[data-cursor-label]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("mousedown", onClick);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousedown", onClick);
      });
    };

    document.addEventListener("mousemove", onMove);
    bind();

    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  const hasLabel = !!label;

  return (
    <>
      {/* Default dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ top: "-200px", left: "-200px" }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full bg-[#111110] transition-all duration-200"
          style={{
            opacity: !visible || hasLabel ? 0 : 1,
            transform: hasLabel ? "scale(0)" : "scale(1)",
          }}
        />
      </div>

      {/* Label pill */}
      <div
        ref={pillRef}
        className="fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ top: "-200px", left: "-200px" }}
      >
        <div
          className="flex items-center justify-center px-4 h-8 rounded-full bg-[#111110] whitespace-nowrap transition-all duration-250"
          style={{
            opacity: hasLabel ? 1 : 0,
            transform: hasLabel ? "scale(1)" : "scale(0.6)",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <span className="text-white text-[12px] font-medium tracking-[0.06em]" style={{ fontFamily: "var(--font-lato)" }}>
            {label ?? ""}
          </span>
        </div>
      </div>
    </>
  );
}

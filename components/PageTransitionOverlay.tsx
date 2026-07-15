"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { pageTransitionStore } from "@/stores/pageTransitionStore";

type Phase = "idle" | "start" | "expand" | "exit";

export default function PageTransitionOverlay() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [src, setSrc] = useState<string | null>(null);
  const [rect, setRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const phaseRef = useRef<Phase>("idle");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Listen for transition triggers
  useEffect(() => {
    return pageTransitionStore.subscribe((payload) => {
      if (!payload) return;
      setRect(payload.rect);
      setSrc(payload.src);
      setPhase("start");
      // Two rAFs so "start" position paints before we animate
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("expand"))
      );
    });
  }, []);

  // When the route changes, fade the overlay out
  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    const p = phaseRef.current;
    // If we're still expanding, wait for the animation to finish before fading
    const delay = p === "start" ? 500 : p === "expand" ? 240 : 0;

    let t2: ReturnType<typeof setTimeout>;
    const t1 = setTimeout(() => {
      setPhase("exit");
      t2 = setTimeout(() => {
        setPhase("idle");
        setSrc(null);
        setRect(null);
        pageTransitionStore.clear();
      }, 650);
    }, delay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  if (phase === "idle" || !rect || !src) return null;

  const expanded = phase === "expand" || phase === "exit";

  const transition =
    phase === "start"
      ? "none"
      : phase === "exit"
      ? "opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      : [
          "top 500ms cubic-bezier(0.76, 0, 0.24, 1)",
          "left 500ms cubic-bezier(0.76, 0, 0.24, 1)",
          "width 500ms cubic-bezier(0.76, 0, 0.24, 1)",
          "height 500ms cubic-bezier(0.76, 0, 0.24, 1)",
          "border-radius 500ms cubic-bezier(0.76, 0, 0.24, 1)",
        ].join(", ");

  return (
    <div
      aria-hidden="true"
      style={{
        position:     "fixed",
        top:          expanded ? 0          : rect.top,
        left:         expanded ? 0          : rect.left,
        width:        expanded ? "100vw"    : rect.width,
        height:       expanded ? "100vh"    : rect.height,
        zIndex:       9999,
        overflow:     "hidden",
        pointerEvents:"none",
        opacity:      phase === "exit" ? 0 : 1,
        borderRadius: expanded ? 0 : "3px",
        transition,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

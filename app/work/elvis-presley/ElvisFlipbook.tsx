"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { PageFlip } from "page-flip";

// cover(0) + [left-N, right-N] × 20 + back(41) = 42 pages
// page-flip landscape showCover: pairs are (1,2), (3,4)… → spread-N = pages 2N-1, 2N
const TOTAL_SPREADS = 20;

export default function ElvisFlipbook() {
  const bookRef      = useRef<HTMLDivElement>(null);
  const flipRef      = useRef<PageFlip | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState<number | "cover" | "end">("cover");
  const [gen, setGen]       = useState(0);
  const [flipScale, setFlipScale] = useState(0.85);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;

    const pages = el.querySelectorAll(".ef-page");
    if (!pages.length) {
      // pf.destroy() cleared the .ef-page nodes and removed el from its parent.
      // Re-insert el so React can cleanly swap the keyed div, then bump gen.
      const pfParent = (el as any)._pfParent as { parent: Element; nextSibling: Node | null } | undefined;
      if (!el.parentNode && pfParent) {
        const { parent, nextSibling } = pfParent;
        if (nextSibling && nextSibling.parentNode === parent) {
          parent.insertBefore(el, nextSibling);
        } else {
          parent.appendChild(el);
        }
      }
      setGen(g => g + 1);
      return;
    }

    const pf = new PageFlip(el, {
      width:               380,
      height:              532,
      showCover:           true,
      usePortrait:         false,
      drawShadow:          true,
      flippingTime:        700,
      mobileScrollSupport: true,
      maxShadowOpacity:    0.45,
      clickEventForward:   true,
      autoSize:            true,
    });

    pf.loadFromHTML(pages as NodeListOf<HTMLElement>);

    pf.on("flip", (e: any) => {
      const idx = e.data as number;
      if (idx === 0)                      setSpread("cover");
      else if (idx >= TOTAL_SPREADS * 2 + 1) setSpread("end");
      else                                setSpread(Math.ceil(idx / 2));
    });

    flipRef.current = pf;
    return () => {
      // Save parent position before pf.destroy() removes el from DOM,
      // so the next effect run can re-insert it for React's reconciler.
      (el as any)._pfParent = { parent: el.parentNode, nextSibling: el.nextSibling };
      pf.destroy();
      flipRef.current = null;
    };
  }, [gen]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setFlipScale(Math.min(0.85, available / 760));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prev = useCallback(() => flipRef.current?.flipPrev(), []);
  const next = useCallback(() => flipRef.current?.flipNext(), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const label =
    spread === "cover" ? "Cover" :
    spread === "end"   ? "End"   :
    `${spread} / ${TOTAL_SPREADS}`;

  return (
    <div
      ref={containerRef}
      style={{
        position:       "relative",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "flex-start",
        padding:        "clamp(24px, 4vw, 56px) 0 40px",
        width:          "100%",
      }}
    >
      {/* page-flip mount point — explicit 760×532 so page-flip doesn't autoSize to container */}
      <div style={{ width: "fit-content", maxWidth: "100%", overflow: "hidden", height: `calc(532px * ${flipScale})`, alignSelf: "flex-start", marginLeft: 0, paddingLeft: 0 }}>

      <div key={gen} ref={bookRef} style={{ position: "relative", width: "760px", height: "532px", transform: `scale(${flipScale})`, transformOrigin: "top left" }}>

        {/* Center binding gutter — inside bookRef so left:50% = 380px = exact page join, scales with the book */}
        <div style={{ position: "absolute", left: "50%", top: 0, width: "4px", height: "100%", transform: "translateX(-50%)", background: "linear-gradient(to right, rgba(0,0,0,0.15), rgba(0,0,0,0.08), rgba(0,0,0,0.15))", boxShadow: "0 0 8px rgba(0,0,0,0.12)", zIndex: 10, pointerEvents: "none" }} />

        {/* Cover */}
        <div className="ef-page" data-density="hard">
          <img
            src="/flipbook/cover.png"
            alt="Through the Cover — publication cover"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            draggable={false}
          />
        </div>

        {/* 20 spreads: left-N then right-N */}
        {Array.from({ length: TOTAL_SPREADS }, (_, i) => {
          const n = i + 1;
          return [
            <div className="ef-page" key={`L${n}`}>
              <img
                src={`/flipbook/left-${n}.png`}
                alt={`Spread ${n} left`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                draggable={false}
              />
            </div>,
            <div className="ef-page" key={`R${n}`}>
              <img
                src={`/flipbook/right-${n}.png`}
                alt={`Spread ${n} right`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                draggable={false}
              />
            </div>,
          ];
        })}

        {/* Back cover */}
        <div className="ef-page" data-density="hard">
          <div style={{ width: "100%", height: "100%", background: "#111110" }} />
        </div>

      </div>
      </div>

      {/* Book shadow */}
      <div style={{ position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)", width: "85%", height: "20px", background: "radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)", filter: "blur(6px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Controls */}
      <div
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        "28px",
          marginTop:  "28px",
        }}
      >
        <button
          onClick={prev}
          aria-label="Previous spread"
          style={{
            width:          "36px",
            height:         "36px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            background:     "none",
            border:         "1px solid var(--border)",
            borderRadius:   "2px",
            cursor:         "pointer",
            color:          "var(--ink-3)",
            fontSize:       "16px",
            transition:     "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-3)";
          }}
        >
          ←
        </button>

        <span
          style={{
            fontFamily:    "var(--font-lato)",
            fontSize:      "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color:         "var(--ink-4)",
            minWidth:      "56px",
            textAlign:     "center",
          }}
        >
          {label}
        </span>

        <button
          onClick={next}
          aria-label="Next spread"
          style={{
            width:          "36px",
            height:         "36px",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            background:     "none",
            border:         "1px solid var(--border)",
            borderRadius:   "2px",
            cursor:         "pointer",
            color:          "var(--ink-3)",
            fontSize:       "16px",
            transition:     "border-color 150ms, color 150ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-3)";
          }}
        >
          →
        </button>
      </div>

      <a
        href="/with%20cover.pdf"
        download="Elvis-Presley-Publication.pdf"
        style={{
          marginTop:     "20px",
          fontFamily:    "var(--font-lato)",
          fontSize:      "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "var(--ink-4)",
          textDecoration:"none",
          transition:    "color 150ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-4)")}
      >
        Download PDF →
      </a>

      <p
        style={{
          marginTop:     "10px",
          fontFamily:    "var(--font-lato)",
          fontSize:      "10px",
          letterSpacing: "0.12em",
          color:         "var(--ink-4)",
          opacity:       0.55,
        }}
      >
        Click pages · drag · or use ← →
      </p>
    </div>
  );
}

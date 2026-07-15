"use client";

import { useState, useEffect, useRef } from "react";

const MAGNIFY_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='13' cy='13' r='9' fill='%23111' /%3E%3Ccircle cx='13' cy='13' r='7' fill='white' /%3E%3Cline x1='10' y1='13' x2='16' y2='13' stroke='%23111' stroke-width='2'/%3E%3Cline x1='13' y1='10' x2='13' y2='16' stroke='%23111' stroke-width='2'/%3E%3Cline x1='19.5' y1='19.5' x2='26' y2='26' stroke='%23111' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E") 16 16, zoom-in`;

interface Props {
  src: string;
  alt: string;
  imgStyle?: React.CSSProperties;
  imgClassName?: string;
}

export function ImageLightbox({ src, alt, imgStyle, imgClassName }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  // Force custom cursor via DOM so !important wins over body { cursor: none }
  useEffect(() => {
    const els = [containerRef.current, thumbRef.current];
    els.forEach((el) => {
      if (el) el.style.setProperty("cursor", MAGNIFY_CURSOR, "important");
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div
        ref={containerRef}
        onClick={() => setOpen(true)}
        className="img-lightbox-thumb"
        style={{ cursor: MAGNIFY_CURSOR }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={thumbRef}
          src={src}
          alt={alt}
          style={{ ...imgStyle, cursor: MAGNIFY_CURSOR }}
          className={`img-lightbox-thumb${imgClassName ? ` ${imgClassName}` : ""}`}
        />
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "default",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      )}
    </>
  );
}

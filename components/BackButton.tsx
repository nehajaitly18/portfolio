"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/#work"
      style={{
        position:       "fixed",
        top:            "90px",
        left:           "50px",
        zIndex:         100,
        display:        "inline-flex",
        alignItems:     "center",
        gap:            "6px",
        fontFamily:     '"bogart", serif',
        fontWeight:     700,
        fontSize:       "17px",
        color:          "#888884",
        textDecoration: "none",
        transition:     "color 0.15s",
        letterSpacing:  "0",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#111110")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#888884")}
    >
      ← Back
    </Link>
  );
}

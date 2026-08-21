export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes hero-rock {
          0%, 100% { transform: rotate(-2deg); }
          50%       { transform: rotate(2deg);  }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; transform: rotate(-2deg) translateY(20px); }
          to   { opacity: 1; transform: rotate(-2deg) translateY(0); }
        }
        .hero-img {
          animation: hero-fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                     hero-rock 4.5s ease-in-out 0.9s infinite;
        }
        @media (max-width: 767px) {
          .hero-img {
            width: 88vw !important;
          }
          .hero-subtitle {
            margin-top: 16px !important;
            font-size: clamp(18px, 5vw, 22px) !important;
            padding-bottom: 40px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .hero-subtitle br {
            display: none;
          }
        }
      `}</style>

      <section
        style={{
          width:          "100%",
          background:     "#FFFFFF",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          paddingTop:     "0",
          paddingBottom:  "0",
          overflow:       "hidden",
          isolation:      "isolate",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/new hero.png"
          alt="Hi! I'm Neha — visual designer"
          fetchPriority="high"
          className="hero-img"
          style={{
            width:        "clamp(300px, 52vw, 680px)",
            height:       "auto",
            display:      "block",
            objectFit:    "contain",
            marginBottom: "0",
          }}
        />
        <p
          className="hero-subtitle"
          style={{
            fontFamily:    "lato, sans-serif",
            fontStyle:     "normal",
            fontWeight:    300,
            fontSize:      "clamp(17px, 1.8vw, 25px)",
            color:         "#3d3d3c",
            textAlign:     "center",
            letterSpacing: "-0.01em",
            lineHeight:    "1.25",
            margin:        "0",
            marginTop:     "-24px",
            paddingBottom: "56px",
            paddingLeft:   "24px",
            paddingRight:  "24px",
            position:      "relative",
            zIndex:        1,
          }}
        >
          I&apos;m a visual designer who makes thoughtful design feel effortless
        </p>
      </section>
    </>
  );
}

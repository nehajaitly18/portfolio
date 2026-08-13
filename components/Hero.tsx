export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes hero-rock {
          0%, 100% { transform: rotate(-2deg); }
          50%       { transform: rotate(2deg);  }
        }
        .hero-img {
          animation: hero-rock 4.5s ease-in-out infinite;
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about me hero - updated.png"
          alt="Hi! I'm Neha — visual designer"
          className="hero-img"
          style={{
            width:        "clamp(320px, 55vw, 720px)",
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
            fontWeight:    100,
            fontSize:      "clamp(17px, 1.8vw, 25px)",
            color:         "#3d3d3c",
            textAlign:     "center",
            letterSpacing: "-0.01em",
            lineHeight:    "1.25",
            margin:        "0",
            marginTop:     "-150px",
            paddingBottom: "56px",
            paddingLeft:   "24px",
            paddingRight:  "24px",
            position:      "relative",
            zIndex:        1,
          }}
        >
          I&apos;m a visual designer who makes<br />thoughtful design feel effortless
        </p>
      </section>
    </>
  );
}

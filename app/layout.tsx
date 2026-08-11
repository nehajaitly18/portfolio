import type { Metadata } from "next";
import { Inter, Instrument_Serif, Playfair_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});


export const metadata: Metadata = {
  title: "Neha Jaitly — Visual Designer",
  description:
    "Portfolio of Neha Jaitly, a visual designer balancing aesthetics and usability across branding, interfaces, and digital products.",
  openGraph: {
    title: "Neha Jaitly — Visual Designer",
    description: "Portfolio of Neha Jaitly, visual designer.",
    url: "https://nehajaitly.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="stylesheet" href="https://use.typekit.net/zsw4dlb.css" />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)]">
        <PageTransitionOverlay />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <main className="flex-1 pt-14 md:pt-16">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}

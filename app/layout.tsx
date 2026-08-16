import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import PageTransitionOverlay from "@/components/PageTransitionOverlay";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";


export const metadata: Metadata = {
  title: "Neha Jaitly — Visual Designer",
  description: "Design Portfolio",
  openGraph: {
    title: "Neha Jaitly — Visual Designer",
    description: "Design Portfolio",
    url: "https://nehajaitly.com",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Neha Jaitly — Visual Designer",
    description: "Design Portfolio",
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
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#111110" />
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

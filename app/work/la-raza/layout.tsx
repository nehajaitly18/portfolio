import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Raza Arts — UI/UX Case Study",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

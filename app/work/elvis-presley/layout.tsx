import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elvis Presley's Albums — UI/UX Case Study",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

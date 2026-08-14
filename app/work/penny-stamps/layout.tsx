import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penny W. Stamps — UI/UX Case Study",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

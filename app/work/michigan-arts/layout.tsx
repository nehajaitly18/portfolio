import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Michigan Arts Initiative — UI/UX Case Study",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

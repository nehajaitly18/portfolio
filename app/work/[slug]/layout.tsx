import type { Metadata } from "next";
import { projects } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  const name = project ? project.title : "Case Study";
  return { title: `${name} — UI/UX Case Study` };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

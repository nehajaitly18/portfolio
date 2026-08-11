"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";

const EXPO = [0.16, 1, 0.3, 1] as const;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(project.href);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % 2) * 0.08,
        duration: 0.7,
        ease: EXPO,
      }}
    >
      <Link
        href={project.href}
        className="group block"
        data-cursor-label={project.category}
        onClick={handleClick}
      >
        {/* Thumbnail — natural aspect ratio, rounded, full column width */}
        {project.image && (
          <div style={{ overflow: "hidden", borderRadius: "14px" }}>
            <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        )}

        {/* Meta: name left · category · year right */}
        <div
          style={{
            display:        "flex",
            alignItems:     "baseline",
            justifyContent: "space-between",
            gap:            "16px",
            marginTop:      "12px",
          }}
        >
          <span
            className="transition-opacity duration-300 group-hover:opacity-50"
            style={{
              fontFamily: (project.id === "midorm" || project.id === "elvis-presley") ? "Georgia, serif" : "var(--font-playfair)",
              fontSize:   "24px",
              fontWeight: 500,
              lineHeight: 1.3,
              color:      "var(--ink)",
            }}
          >
            {project.title}
          </span>

          <span
            style={{
              fontFamily:  "proxima-nova, sans-serif",
              fontSize:    "15px",
              fontWeight:  300,
              color:       "var(--ink-3)",
              letterSpacing: "-0.028em",
              whiteSpace:  "nowrap",
            }}
          >
            {project.category}&nbsp;&middot;&nbsp;{project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectList() {
  return (
    <section id="projects" style={{ background: "var(--bg)" }}>
      <div className="px-4 md:px-8 lg:px-10 max-w-[1200px] mx-auto pt-8 pb-16 md:pt-10 md:pb-20">

        {/* 2-column grid with generous row spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 md:gap-x-6 gap-y-16 md:gap-y-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
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
        {/* Thumbnail — full column width, no crop, no rounded corners */}
        {project.image && (
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" style={{ borderRadius: "8px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                width:     "100%",
                height:    "auto",
                display:   "block",
                objectFit: "contain",
                transform: project.imageScale ? `scale(${project.imageScale})` : undefined,
              }}
            />
          </div>
        )}

        {/* Meta: name on first line, category · year on second line */}
        <div style={{ marginTop: "12px" }}>
          <div
            className="transition-opacity duration-300 group-hover:opacity-50"
            style={{
              fontFamily: "Georgia, serif",
              fontSize:   "clamp(18px, 2.5vw, 24px)",
              fontWeight: 500,
              lineHeight: 1.3,
              color:      "var(--ink)",
            }}
          >
            {project.title}
          </div>

          <div
            style={{
              fontFamily:    "var(--font-lato)",
              fontSize:      "clamp(13px, 1.5vw, 17px)",
              fontWeight:    300,
              color:         "var(--ink-3)",
              letterSpacing: "0.01em",
              marginTop:     "4px",
            }}
          >
            {project.category}&nbsp;&middot;&nbsp;{project.year}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectList() {
  return (
    <section id="work" style={{ background: "var(--bg)" }}>
      <div className="px-6 md:px-10 lg:px-14 pt-2 pb-16 md:pt-4 md:pb-20">

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-10 gap-y-16 md:gap-y-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";

const IMAGE_HEIGHTS = [420, 320, 370, 400];

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

  const imageHeight = IMAGE_HEIGHTS[index % IMAGE_HEIGHTS.length];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(project.href);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (index % 2) * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={project.href}
        className="group block"
        data-cursor-label={project.category}
        onClick={handleClick}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden mb-3"
          style={{ height: `${imageHeight}px`, borderRadius: "12px", width: "100%" }}
        >
          {project.image ? (
            <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]" style={{ width: "100%", height: "100%" }}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div
              className={`absolute inset-0 ${project.thumbClass} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]`}
            />
          )}
        </div>

        {/* Title */}
        <h3
          className="text-[var(--ink)] mb-1.5 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "22px",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Category */}
        <span
          className="text-[var(--ink-3)]"
          style={{
            fontFamily: "var(--font-lato)",
            fontSize: "16px",
            fontWeight: 300,
          }}
        >
          {project.category}
        </span>
      </Link>
    </motion.div>
  );
}

export default function ProjectList() {
  const ruleRef = useRef<HTMLDivElement>(null);
  const ruleInView = useInView(ruleRef, { once: true, margin: "-40px" });

  return (
    <section id="projects">
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto py-16 md:py-24">

        {/* Editorial section rule */}
        <div ref={ruleRef} className="mb-10 md:mb-14">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={ruleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-[var(--border-strong)] w-full mb-4"
          />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

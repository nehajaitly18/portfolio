"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <Hero />
      <ProjectList />
    </motion.div>
  );
}

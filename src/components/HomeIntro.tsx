"use client";

import { motion } from "framer-motion";

export default function HomeIntro({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="max-w-4xl mx-auto text-center bg-[#faf8f3] border border-[#b7b2a5] p-8 md:p-12 relative"
    >
      {children}
    </motion.div>
  );
}
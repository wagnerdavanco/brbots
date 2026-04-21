"use client";
import { motion } from "framer-motion";

export function GradientBlob({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={className}
      initial={{ scale: 0.9, opacity: 0.6 }}
      animate={{ scale: [0.9, 1.05, 0.95, 1], opacity: [0.6, 0.8, 0.7, 0.75] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(6,182,212,0.25) 60%, transparent 75%)",
        filter: "blur(40px)",
      }}
    />
  );
}

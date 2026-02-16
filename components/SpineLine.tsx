"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export function SpineLine() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const spineScale = useTransform(scrollYProgress, [0, 1], [0.14, 1]);
  const smoothScale = useSpring(spineScale, {
    damping: 34,
    stiffness: 140,
    mass: 0.28
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 z-10" style={{ left: "var(--spine-x)" }}>
      <div className="h-full w-px bg-white/12">
        <motion.div
          className="h-full w-px origin-top bg-white/45"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: reduceMotion ? 1 : 0.14 }}
          style={{ scaleY: reduceMotion ? 1 : smoothScale }}
          transition={{
            duration: reduceMotion ? 0 : 1.05,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

const identityLines = ["TPM Leader", "AI Enthusiast", "Systems Thinker"];

export function IdentityReveal() {
  return (
    <section className="signal-section signal-section-reveal" aria-label="Identity reveal">
      <div className="signal-content">
        <div className="signal-reveal-group">
          {identityLines.map((line, index) => (
            <motion.p
              key={line}
              className="signal-identity-line"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.65, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          className="signal-quote"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          I design clarity inside complex systems.
        </motion.p>
      </div>
    </section>
  );
}

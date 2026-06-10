"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionVideo } from "@/components/motion-video";

export function MotionStudySection() {
  const shouldReduceMotion = useReducedMotion();

  const copyInitial = shouldReduceMotion ? false : { opacity: 0, x: -34 };
  const videoInitial = shouldReduceMotion ? false : { opacity: 0, x: 38, scale: 0.985 };
  const lineInitial = shouldReduceMotion ? false : { scaleX: 0 };
  const transition = { duration: 0.72, ease: [0.22, 1, 0.36, 1] } as const;

  return (
    <section className="motion-section">
      <div className="container motion-grid">
        <motion.div
          className="motion-copy"
          initial={copyInitial}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.38 }}
          transition={transition}
        >
          <motion.p
            className="mono-label accent"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...transition, delay: 0.08 }}
          >
            Motion study
          </motion.p>
          <h2>Presence is evaluated in movement.</h2>
          <motion.span
            className="motion-rule"
            aria-hidden="true"
            initial={lineInitial}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...transition, delay: 0.2 }}
          />
          <p>
            Static condition matters, but the registry is built around the way a
            numbered car carries itself in motion: stance, proportion, sound,
            surface reflection, and control.
          </p>
          <p>
            This preview section is a visual study only. It supports the build
            language without making performance claims, availability claims, or
            public purchase offers.
          </p>
        </motion.div>
        <motion.div
          className="motion-video-panel"
          aria-label="Burakorn motion study video"
          initial={videoInitial}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.36 }}
          transition={{ ...transition, delay: 0.14 }}
          whileHover={shouldReduceMotion ? undefined : { y: -6 }}
        >
          <MotionVideo />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Every heavy asset on the home page. The preloader will not dismiss until
// each of these is fully fetched (images) or buffered enough to play through
// without stalling (videos).
const IMAGE_ASSETS = [
  "/visuals/burakorn-founder-card.png",
  "/visuals/burakorn-moray-card.png",
  "/visuals/burakorn-black-current-card.png",
  "/visuals/burakorn-krait-card.png",
  "/visuals/burakorn-obsidian-card.png",
];

const VIDEO_ASSETS = [
  "/visuals/burakorn-performance-hero-video.mp4",
  "/visuals/burakorn-motion-study.mp4",
];

const TOTAL_ASSETS = IMAGE_ASSETS.length + VIDEO_ASSETS.length;
const MIN_VISIBLE_MS = 900;

function preloadImage(src: string, onDone: () => void) {
  const img = new Image();
  img.onload = onDone;
  img.onerror = onDone;
  img.src = src;
  // Cached images may resolve synchronously without firing load.
  if (img.complete) {
    onDone();
  }
}

function preloadVideo(src: string, onProgress: (ratio: number) => void, onDone: () => void) {
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    onProgress(1);
    onDone();
  };

  const video = document.createElement("video");
  video.muted = true;
  video.preload = "auto";
  video.src = src;

  const update = () => {
    try {
      if (video.duration && video.buffered.length > 0) {
        const end = video.buffered.end(video.buffered.length - 1);
        onProgress(Math.min(end / video.duration, 1));
      }
    } catch {
      // buffered access can throw before metadata is ready
    }
  };

  video.addEventListener("progress", update);
  video.addEventListener("canplaythrough", finish, { once: true });
  video.addEventListener("error", finish, { once: true });
  // Safety: don't block the experience forever on a stubborn buffer.
  const timeout = window.setTimeout(finish, 15000);
  video.addEventListener("canplaythrough", () => window.clearTimeout(timeout), {
    once: true,
  });

  video.load();
}

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    let active = true;
    // Per-asset completion (0 or 1 for images, fractional for videos).
    const ratios = new Array<number>(TOTAL_ASSETS).fill(0);

    const commit = () => {
      if (!active) return;
      const sum = ratios.reduce((a, b) => a + b, 0);
      setProgress(Math.round((sum / TOTAL_ASSETS) * 100));
    };

    let remaining = TOTAL_ASSETS;
    const markDone = () => {
      remaining -= 1;
      if (remaining <= 0 && active) {
        const elapsed = Date.now() - startRef.current;
        const wait = Math.max(MIN_VISIBLE_MS - elapsed, 0);
        window.setTimeout(() => {
          if (active) {
            setProgress(100);
            setDone(true);
          }
        }, wait);
      }
    };

    IMAGE_ASSETS.forEach((src, i) => {
      preloadImage(src, () => {
        ratios[i] = 1;
        commit();
        markDone();
      });
    });

    VIDEO_ASSETS.forEach((src, i) => {
      const index = IMAGE_ASSETS.length + i;
      preloadVideo(
        src,
        (ratio) => {
          ratios[index] = ratio;
          commit();
        },
        markDone,
      );
    });

    return () => {
      active = false;
    };
  }, []);

  // Lock scroll while the preloader is visible.
  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="site-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading Burakorn Performance Registry"
          initial={{ opacity: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: "-100%" }
          }
          transition={{
            duration: shouldReduceMotion ? 0.3 : 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div className="site-preloader-inner">
            <motion.div
              className="site-preloader-brand"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="site-preloader-wordmark">BURAKORN</span>
              <span className="site-preloader-sub">Performance Registry</span>
            </motion.div>

            <div className="site-preloader-meter" aria-hidden="true">
              <motion.span
                className="site-preloader-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ ease: "easeOut", duration: 0.35 }}
              />
            </div>

            <div className="site-preloader-status">
              <span className="site-preloader-label">Loading registry assets</span>
              <span className="site-preloader-count">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

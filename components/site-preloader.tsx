"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

declare global {
  interface Window {
    __burakornLoaded?: boolean;
  }
}

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

// Each asset counts equally toward progress so the counter always advances,
// even on slow connections where byte-level streaming of the large hero video
// would otherwise dominate (and stall) the bar.
const ALL_ASSETS = [...IMAGE_ASSETS, ...VIDEO_ASSETS];
const TOTAL_ASSETS = ALL_ASSETS.length;
const MIN_VISIBLE_MS = 900;
// Videos should never trap the visitor: we wait only until they can play, or
// until this per-video cap elapses, then count them as ready.
const VIDEO_TIMEOUT_MS = 4000;

// Resolves once an image has finished loading (or errored — we never want a
// missing asset to trap the visitor on the loader).
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

// Resolves once a video has buffered enough to play through, or after a short
// timeout. Warms the cache without blocking the reveal on a full download.
function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.src = src;
    video.oncanplaythrough = finish;
    video.onloadeddata = finish;
    video.onerror = finish;
    window.setTimeout(finish, VIDEO_TIMEOUT_MS);
  });
}

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    let active = true;
    let completed = 0;

    const commit = () => {
      if (!active) return;
      completed += 1;
      const ratio = TOTAL_ASSETS > 0 ? completed / TOTAL_ASSETS : 1;
      setProgress((prev) => {
        const next = Math.min(Math.round(ratio * 100), 100);
        // Monotonic — never let the bar visually move backwards.
        return next > prev ? next : prev;
      });
    };

    const finishAll = () => {
      if (!active) return;
      const elapsed = Date.now() - startRef.current;
      const wait = Math.max(MIN_VISIBLE_MS - elapsed, 0);
      window.setTimeout(() => {
        if (active) {
          setProgress(100);
          setDone(true);
          // Tell media components the site is being revealed so they can
          // restart playback cleanly from the first frame.
          window.__burakornLoaded = true;
          window.dispatchEvent(new Event("burakorn:loaded"));
        }
      }, wait);
    };

    // Global safety net: reveal the site after 8s no matter what so a slow
    // or stalled connection can never trap the visitor on the loader.
    const safety = window.setTimeout(finishAll, 8000);

    Promise.all(
      ALL_ASSETS.map((src) => {
        const loader = VIDEO_ASSETS.includes(src)
          ? preloadVideo(src)
          : preloadImage(src);
        return loader.then(commit);
      }),
    ).then(() => {
      window.clearTimeout(safety);
      finishAll();
    });

    return () => {
      active = false;
      window.clearTimeout(safety);
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

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

// Each asset is warmed in the background, but the visible counter is driven by
// a time-based animation so it can NEVER freeze waiting on a slow/stalled
// download (e.g. the large hero video on a poor connection).
const ALL_ASSETS = [...IMAGE_ASSETS, ...VIDEO_ASSETS];
const MIN_VISIBLE_MS = 900;
// How long the counter takes to crawl to ~90% on its own. Once assets finish
// (or the cap below elapses) it accelerates to 100 and the site is revealed.
const RAMP_MS = 2200;
// Hard cap: the site is always revealed by this point, no matter what.
const MAX_VISIBLE_MS = 6000;

// Warm an image into the HTTP cache. Never rejects.
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

// Warm a video into the HTTP cache. Never rejects.
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
    window.setTimeout(finish, 3000);
  });
}

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    let active = true;
    let raf = 0;
    let assetsReady = false;
    let finished = false;
    const start = startRef.current;

    const reveal = () => {
      if (!active || finished) return;
      finished = true;
      setProgress(100);
      setDone(true);
      // Tell media components the site is being revealed so they can
      // restart playback cleanly from the first frame.
      window.__burakornLoaded = true;
      window.dispatchEvent(new Event("burakorn:loaded"));
    };

    // Warm the HTTP cache in the background. This never blocks the counter.
    Promise.all(
      ALL_ASSETS.map((src) =>
        VIDEO_ASSETS.includes(src) ? preloadVideo(src) : preloadImage(src),
      ),
    ).then(() => {
      assetsReady = true;
    });

    // Time-based counter that always advances and always completes.
    const tick = () => {
      if (!active) return;
      const elapsed = Date.now() - start;

      // Ease toward ~90% over RAMP_MS, then hold until assets are ready
      // (or the hard cap elapses) before snapping to 100.
      const ramp = Math.min(elapsed / RAMP_MS, 1);
      const eased = 1 - Math.pow(1 - ramp, 3); // easeOutCubic
      let value = Math.round(eased * 90);

      const readyToFinish =
        elapsed >= MIN_VISIBLE_MS &&
        (assetsReady || elapsed >= MAX_VISIBLE_MS);

      if (readyToFinish) {
        value = 100;
      }

      setProgress((prev) => (value > prev ? value : prev));

      if (value >= 100) {
        reveal();
        return;
      }
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.cancelAnimationFrame(raf);
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

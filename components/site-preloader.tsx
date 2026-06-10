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

const ALL_ASSETS = [...IMAGE_ASSETS, ...VIDEO_ASSETS];
const TOTAL_ASSETS = ALL_ASSETS.length;
const MIN_VISIBLE_MS = 900;
// Approximate byte sizes used to weight progress before the real
// Content-Length arrives. Keeps the bar from jumping unrealistically.
const FALLBACK_BYTES: Record<string, number> = {
  "/visuals/burakorn-performance-hero-video.mp4": 50_000_000,
  "/visuals/burakorn-motion-study.mp4": 2_800_000,
};
const DEFAULT_IMAGE_BYTES = 810_000;

// Fully downloads an asset via fetch (streaming) so we can report real
// byte-level progress. This warms the HTTP cache, so the <img>/<video>
// elements on the page reuse the bytes instead of re-fetching them.
async function fetchAsset(
  src: string,
  onBytes: (loaded: number, total: number) => void,
): Promise<void> {
  try {
    const res = await fetch(src, { cache: "force-cache" });
    if (!res.ok || !res.body) {
      onBytes(1, 1);
      return;
    }

    const headerTotal = Number(res.headers.get("Content-Length")) || 0;
    const total =
      headerTotal ||
      FALLBACK_BYTES[src] ||
      DEFAULT_IMAGE_BYTES;

    const reader = res.body.getReader();
    let loaded = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      loaded += value?.length ?? 0;
      onBytes(loaded, Math.max(total, loaded));
    }
    onBytes(Math.max(loaded, total), Math.max(loaded, total));
  } catch {
    // Network/abort errors should not trap the user on the loader.
    onBytes(1, 1);
  }
}

export function SitePreloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    let active = true;

    // Weight each asset by its (estimated) byte size so the bar reflects the
    // real download. Images count for very little next to the hero video.
    const weights = ALL_ASSETS.map(
      (src) => FALLBACK_BYTES[src] ?? DEFAULT_IMAGE_BYTES,
    );
    const loadedBytes = new Array<number>(TOTAL_ASSETS).fill(0);

    const commit = () => {
      if (!active) return;
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      const loadedWeight = loadedBytes.reduce((a, b) => a + b, 0);
      const ratio = totalWeight > 0 ? loadedWeight / totalWeight : 1;
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
        }
      }, wait);
    };

    // Global safety net: reveal the site after 12s no matter what so a slow
    // or stalled connection can never trap the visitor on the loader.
    const safety = window.setTimeout(finishAll, 12000);

    Promise.all(
      ALL_ASSETS.map((src, i) =>
        fetchAsset(src, (loaded, total) => {
          // Re-weight to the real Content-Length once we know it.
          if (total > 0) weights[i] = total;
          loadedBytes[i] = loaded;
          commit();
        }),
      ),
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

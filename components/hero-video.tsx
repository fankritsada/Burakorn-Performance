"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;

    // Restart from the first frame and play. Called once the preloader
    // reveals the site so the hero begins at the very start of the clip.
    const startFromBeginning = () => {
      try {
        video.currentTime = 0;
      } catch {
        // Seeking before metadata is ready can throw; ignore and retry on play.
      }
      void video.play().catch(() => {
        // Muted autoplay can still be delayed by some browser states.
      });
    };

    // If the preloader already finished (cached/fast loads), start now.
    // Otherwise wait for its "loaded" signal so the clip starts in sync
    // with the reveal instead of mid-sequence behind the loading screen.
    if (window.__burakornLoaded) {
      startFromBeginning();
    } else {
      window.addEventListener("burakorn:loaded", startFromBeginning, {
        once: true,
      });
    }

    return () => {
      window.removeEventListener("burakorn:loaded", startFromBeginning);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      loop
      muted
      playsInline
      preload="auto"
    >
      <source
        src="/visuals/burakorn-performance-hero-video.mp4"
        type="video/mp4"
      />
    </video>
  );
}

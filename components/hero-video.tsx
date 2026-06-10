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
    const play = () => {
      void video.play().catch(() => {
        // Muted autoplay can still be delayed by some browser states.
      });
    };

    play();
    video.addEventListener("canplay", play, { once: true });

    return () => {
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      autoPlay
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

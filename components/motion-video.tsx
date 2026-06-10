"use client";

import { useEffect, useRef } from "react";

export function MotionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = true;
    let isVisible = true;

    const play = () => {
      void video.play().catch(() => {
        // Some browsers delay muted autoplay until the media can play.
      });
    };
    const handleCanPlay = () => {
      if (isVisible) {
        play();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.24 },
    );

    play();
    observer.observe(video);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="motion-video"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src="/visuals/burakorn-motion-study.mp4" type="video/mp4" />
    </video>
  );
}

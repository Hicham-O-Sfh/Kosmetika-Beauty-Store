"use strict";

/**
 * Deferred playback for the decorative background videos of the home page.
 *
 * Markup contract: `<video data-lazy preload="none" poster="…"><source data-src="…"></video>`.
 * The file is only downloaded once the video enters the viewport, and playback is
 * paused as soon as it leaves. Visitors who asked for reduced motion keep the poster
 * and never download the video at all.
 */

function loadAndPlay(video) {
  const source = video.querySelector("source[data-src]");
  if (source) {
    source.src = source.dataset.src;
    source.removeAttribute("data-src");
    video.load();
  }

  const started = video.play();
  if (started) {
    // Autoplay refused by the browser: the poster simply stays visible.
    started.catch(() => {});
  }
}

export function setupLazyVideos() {
  const videos = document.querySelectorAll("video[data-lazy]");
  if (!videos.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (!("IntersectionObserver" in window)) {
    videos.forEach(loadAndPlay);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadAndPlay(entry.target);
        } else {
          entry.target.pause();
        }
      });
    },
    { threshold: 0.25 },
  );

  videos.forEach((video) => observer.observe(video));
}

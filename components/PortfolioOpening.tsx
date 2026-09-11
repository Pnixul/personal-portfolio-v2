"use client";

import { useEffect, useRef } from "react";
import { ChibiMoment } from "./ChibiMoment";

export function PortfolioOpening({ label }: { label: string }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = panel.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || window.location.hash || document.hidden) return;
    // Per-tab suppression also covers language switches and returning from a project.
    try {
      if (sessionStorage.getItem("pon-portfolio-opened")) return;
    } catch { /* Storage can be disabled; the short, dismissible opening still works. */ }

    let timeout: number | undefined;
    // Start on the next paint so a Strict Mode setup/cleanup cannot consume a visit.
    const frame = window.requestAnimationFrame(() => {
      try { sessionStorage.setItem("pon-portfolio-opened", "1"); } catch { /* Optional storage. */ }
      element.hidden = false;
      timeout = window.setTimeout(dismiss, 1650);
    });
    const dismiss = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      element.hidden = true;
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("pagehide", dismiss);
      motion.removeEventListener("change", dismiss);
    };
    window.addEventListener("pointerdown", dismiss, { passive: true });
    window.addEventListener("keydown", dismiss);
    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("pagehide", dismiss);
    motion.addEventListener("change", dismiss);
    return dismiss;
  }, []);

  return (
    <div ref={panel} className="portfolio-opening" hidden aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.hidden = true;
      }}>
      <div className="shell portfolio-opening-inner">
        <p>{label}</p>
        <ChibiMoment pose="opening" />
      </div>
    </div>
  );
}

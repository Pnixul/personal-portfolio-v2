import type { ReactNode } from "react";

export function SketchFrame({ children }: { children: ReactNode }) {
  return (
    <div className="sketch-frame">
      {children}
      <svg className="project-frame" viewBox="0 0 1000 640" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M2 150 L4 5 Q380 2 737 5 M823 4 L997 6 995 185 M998 274 L996 635 Q630 638 290 635 M177 637 L3 634 5 443" />
        <path className="frame-pencil" d="M13 3 L145 1 M998 502 L1000 623 M12 638 L97 640" />
      </svg>
    </div>
  );
}

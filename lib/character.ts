// Dedicated artwork derived from the identity reference, never a reference-sheet crop.
// Replacement artwork: 2:3 ratio, with the entire silhouette inside the canvas.
export const character = {
  src: "/illustrations/pangpond-coding.webp" as string | null,
  width: 1024,
  height: 1536,
  alt: {
    th: "ภาพวาดปอน ผมหยิกสั้นมีความยาวเล็กน้อยที่ท้ายทอย นั่งทำงานกับแล็ปท็อปในเสื้อโทนกลาง",
    en: "Ink illustration of Pon with defined short curls and a short mullet, seated working on a laptop in neutral casual clothing",
  },
};

export type ChibiPose = "opening" | "footer" | "review-layout" | "review-code" | "notes";
type ChibiAsset = { src: string; width: number; height: number };

// Identity reference: .design-references/chibi-character-reference.png.
// Use standalone approved art, never the sheet or a crop. Dense 3A/3B ringlets,
// short developing curly mullet, neutral casual clothing; props are contextual.
// Supply actual image dimensions. Null renders a small sketch stroke, not empty space.
export const chibi: Record<ChibiPose, ChibiAsset | null> = {
  opening: { src: "/illustrations/chibi-loading.png", width: 1536, height: 1024 },
  footer: { src: "/illustrations/chibi-footer.png", width: 2005, height: 784 },
  "review-layout": { src: "/illustrations/chibi-cp-department.png", width: 1536, height: 1024 },
  "review-code": { src: "/illustrations/chibi-botnoi.png", width: 1536, height: 1024 },
  notes: { src: "/illustrations/chibi-personal-portfolio.png", width: 1536, height: 1024 },
};

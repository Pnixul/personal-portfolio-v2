// Code-native construction marks. Character artwork is kept separate.
export function SketchMark({
  kind = "underline",
  className = "",
}: {
  kind?: "underline" | "arrow" | "loop";
  className?: string;
}) {
  const paths = {
    underline: "M5 34 Q95 17 288 20 M25 40 Q159 27 275 29",
    arrow: "M7 14 C72 5 49 85 117 81 Q167 81 185 39 M166 48 L187 35 191 59",
    loop: "M254 24 C143 -9 9 16 9 55 C9 101 282 90 290 49 C296 12 179 7 84 22",
  };
  return (
    <svg
      className={`sketch-mark ${className}`}
      viewBox={kind === "arrow" ? "0 0 200 100" : "0 0 300 100"}
      fill="none"
      aria-hidden="true"
    >
      <path d={paths[kind]} pathLength="1" />
    </svg>
  );
}

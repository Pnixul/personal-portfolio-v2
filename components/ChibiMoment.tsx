import Image from "next/image";
import { chibi, type ChibiPose } from "@/lib/character";
import { SketchMark } from "./SketchMark";

export function ChibiMoment({ pose }: { pose: ChibiPose }) {
  const asset = chibi[pose];
  return (
    <span className="chibi-moment" data-pose={pose} data-art={Boolean(asset)} aria-hidden="true">
      {asset ? (
        <Image src={asset.src} width={asset.width} height={asset.height} alt=""
          loading={pose === "opening" ? "eager" : "lazy"}
          sizes={pose === "opening" ? "320px" : pose === "footer" ? "360px" : "220px"} />
      ) : (
        <SketchMark />
      )}
    </span>
  );
}

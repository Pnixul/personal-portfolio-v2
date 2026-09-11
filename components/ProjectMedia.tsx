import Image from "next/image";
import { ImageOff } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { SketchFrame } from "./SketchFrame";
export function ProjectMedia({
  project,
  locale,
  eager = false,
  collage = false,
}: {
  project: Project;
  locale: Locale;
  eager?: boolean;
  collage?: boolean;
}) {
  const t = getMessages(locale);
  if (collage && project.media?.approved && project.samples) {
    return (
      <div className="botnoi-collage">
        <div className="collage-anchor">
          <ProjectMedia project={project} locale={locale} />
        </div>
        {project.samples.map((sample, index) => (
          <div key={sample.src} className={`collage-fragment fragment-${index}`}>
            <SketchFrame>
              <Image src={sample.src} width={sample.width} height={sample.height}
                alt={sample.caption[locale]} sizes={index === 0 ? "(max-width: 767px) 75vw, 420px" : "160px"} />
            </SketchFrame>
          </div>
        ))}
      </div>
    );
  }
  if (project.media?.approved)
    return (
      <SketchFrame>
        <div className="project-media project-preview" data-project={project.slug}>
        <Image
          src={project.media.src[locale]}
          alt={project.media.alt[locale]}
          width={1440}
          height={960}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 767px) calc(100vw - 52px), (max-width: 1023px) 85vw, 860px"
        />
        </div>
      </SketchFrame>
    );
  return (
    <div
      className={`project-media media-placeholder ${project.category === "personal" ? "media-personal" : ""}`}
    >
      <div className="media-meta">
        <span>{project.organization ?? "chitipat."}</span>
      </div>
      <div className="media-title" aria-hidden="true">
        {project.title}
        <span className="media-rule" />
      </div>
      <div className="media-caption">
        <ImageOff size={16} aria-hidden="true" />
        <span>
          {project.category === "internship" ? t.privateMedia : t.inProgress}
        </span>
      </div>
    </div>
  );
}

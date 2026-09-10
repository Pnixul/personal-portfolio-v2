import Image from "next/image";
import { ImageOff } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
export function ProjectMedia({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = getMessages(locale);
  if (project.media?.approved)
    return (
      <div className="project-media">
        <Image
          src={project.media.src[locale]}
          alt={project.media.alt[locale]}
          width={1440}
          height={960}
          className="h-full w-full object-contain"
          sizes="(max-width: 767px) 100vw, 60vw"
        />
      </div>
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

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";
export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <section id="work" className="section shell" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t.workEyebrow}</p>
          <h2 id="work-title">{t.workTitle}</h2>
        </div>
        <p className="section-description">{t.workIntro}</p>
      </div>
      <div className="project-list">
        {projects.map((project) => {
          const content = project.content[locale];
          return (
            <article key={project.slug} className="project-row">
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="project-image-link"
                tabIndex={-1}
                aria-hidden="true"
              >
                <ProjectMedia project={project} locale={locale} />
              </Link>
              <div className="project-summary">
                <p className="eyebrow flex flex-wrap items-center gap-3">
                  {t[project.category]}
                  {project.organization && (
                    <span className="text-muted">/ {project.organization}</span>
                  )}
                </p>
                <h3>
                  <Link href={`/${locale}/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="leading-relaxed text-muted">{content.summary}</p>
                <dl className="my-6">
                  <dt className="text-xs text-muted">{t.responsibility}</dt>
                  <dd className="mt-2 text-sm leading-relaxed">
                    {content.contribution}
                  </dd>
                </dl>
                <p className="project-technologies">
                  {project.technologies.join(" / ")}
                </p>
                <Link
                  className="text-link mt-7"
                  href={`/${locale}/projects/${project.slug}`}
                >
                  {project.status === "inProgress"
                    ? t.projectNotes
                    : t.caseStudy}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";
import { homeStory } from "@/lib/home-story";
export function SelectedWork({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const story = homeStory[locale];
  // Keep the internship next to its reflection; the portfolio is a smaller interlude.
  const rank = { lead: 0, note: 1, feature: 2 };
  const editorialProjects = [...projects].sort(
    (a, b) => rank[a.homeLayout] - rank[b.homeLayout],
  );
  return (
    <section id="work" className="section shell" aria-labelledby="work-title">
      <div className="section-heading">
        <div>
          <h2 id="work-title">{story.workTitle}</h2>
        </div>
        <p className="section-description">{story.workIntro}</p>
      </div>
      <div className="project-list">
        {editorialProjects.map((project) => {
          const content = project.content[locale];
          return (
            <article
              key={project.slug}
              id={project.category === "internship" ? "experience" : undefined}
              className={`project-row ${project.homeLayout === "lead" ? "project-featured" : project.homeLayout === "note" ? "project-note" : "project-editorial"}`}
            >
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="project-image-link"
                tabIndex={-1}
                aria-hidden="true"
              >
                <ProjectMedia project={project} locale={locale} collage />
              </Link>
              <div className="project-summary">
                <div className="project-heading">
                  <p className="eyebrow flex flex-wrap items-center gap-3">
                    {t[project.category]}
                    {project.organization && (
                      <span className="text-muted">
                        / {project.organization}
                      </span>
                    )}
                  </p>
                  <h3>
                    <Link href={`/${locale}/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                </div>
                <div className="project-details">
                  <p className="leading-relaxed text-muted">
                    {content.summary}
                  </p>
                  <dl className="my-6">
                    <dt className="project-detail-label">{t.responsibility}</dt>
                    <dd className="mt-2 leading-relaxed">
                      {content.contribution}
                    </dd>
                    {content.challenge && project.category !== "internship" && (
                      <>
                        <dt className="project-detail-label mt-5">{t.challenge}</dt>
                        <dd className="mt-2 leading-relaxed">{content.challenge}</dd>
                      </>
                    )}
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

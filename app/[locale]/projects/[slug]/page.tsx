import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectMedia } from "@/components/ProjectMedia";
type Props = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!isLocale(locale) || !project) return {};
  return { title: project.title, description: project.content[locale].summary };
}
export default async function CaseStudy({ params }: Props) {
  const { locale, slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!isLocale(locale) || !project) notFound();
  const t = getMessages(locale);
  const story = project.content[locale];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <main id="main" className="shell case-study">
      <Link href={`/${locale}#work`} className="text-link text-sm">
        <ArrowLeft size={17} aria-hidden="true" />
        {t.backWork}
      </Link>
      <header className="case-header">
        <p className="eyebrow">
          {t[project.category]}
          {project.organization && ` / ${project.organization}`}
        </p>
        <h1>
          {project.title}
          <span className="text-accent">.</span>
        </h1>
        <p className="case-summary">{story.summary}</p>
        <p className="project-technologies">
          {project.technologies.join(" / ")}
        </p>
        {project.status === "inProgress" && (
          <p className="draft-label">{t.draft}</p>
        )}
      </header>
      {project.media?.approved ? (
        <div className="case-media">
          <ProjectMedia project={project} locale={locale} />
        </div>
      ) : project.category === "internship" ? (
        <p className="mb-10 max-w-3xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
          {t.privateNote}
        </p>
      ) : null}
      <div className="case-section">
        <h2>{t.overview}</h2>
        <p>{story.overview}</p>
      </div>
      <div className="case-section">
        <h2>{t.role}</h2>
        <p>{story.role}</p>
      </div>
      <div className="case-section">
        <h2>{t.decisions}</h2>
        <ul className="decision-list" role="list">
          {story.decisions.map((decision) => (
            <li key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="case-section">
        <h2>{t.challenge}</h2>
        <p className={!story.challenge ? "pending-copy" : undefined}>
          {story.challenge ?? t.pending}
        </p>
      </div>
      <div className="case-section learning-section">
        <h2>{t.learning}</h2>
        <p className={!story.learning ? "pending-copy" : undefined}>
          {story.learning ?? t.pending}
        </p>
      </div>
      <div className="case-section">
        <h2>{t.outcome}</h2>
        <p>{story.outcome}</p>
      </div>
      <Link href={`/${locale}/projects/${next.slug}`} className="next-project">
        <div>
          <p className="eyebrow">{t.nextProject}</p>
          <p className="mt-3 text-2xl font-medium">{next.title}</p>
        </div>
        <ArrowUpRight size={28} aria-hidden="true" />
      </Link>
    </main>
  );
}

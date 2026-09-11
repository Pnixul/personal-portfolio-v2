import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ChibiMoment } from "@/components/ChibiMoment";
import { SketchFrame } from "@/components/SketchFrame";
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
    <main id="main" className={`shell case-study case-${project.slug}`}>
      <Link href={`/${locale}#work`} className="text-link case-back">
        <ArrowLeft size={17} aria-hidden="true" />
        {t.backWork}
      </Link>
      <div className="case-opening">
        <header className="case-header">
        <p className="eyebrow">
          {t[project.category]}
          {project.organization && ` / ${project.organization}`}
        </p>
        <h1 lang="en">{project.title}</h1>
        <p className="case-summary">{story.summary}</p>
        <dl className="case-contribution">
          <dt>{t.responsibility}</dt>
          <dd>{story.contribution}</dd>
        </dl>
        <p className="project-technologies">
          {project.technologies.join(" / ")}
        </p>
        {project.status === "inProgress" && (
          <p className="draft-label">{t.draft}</p>
        )}
        </header>
      {project.media?.approved ? (
        <figure className="case-media">
          <ProjectMedia project={project} locale={locale} eager />
          {project.slug === "cp-department" && <ChibiMoment pose="review-layout" />}
        </figure>
      ) : project.category === "internship" ? (
        <aside className="case-private">
          <p className="eyebrow">{t.privateMedia}</p>
          <p>
          {t.privateNote}
          </p>
        </aside>
      ) : null}
      </div>
      <div className="case-context">
      <section className="case-section" aria-labelledby="context-title">
        <h2 id="context-title">{t.overview}</h2>
        <p>{story.overview}</p>
      </section>
      <section className="case-section" aria-labelledby="role-title">
        <h2 id="role-title">{t.role}</h2>
        <p>{story.role}</p>
      </section>
      </div>
      {project.samples && (
        <section className="case-work-samples" aria-labelledby="samples-title">
          <h2 id="samples-title">{t.workSamples}</h2>
          <div className="work-samples-layout">
            {project.samples.map((sample) => (
              <figure key={sample.src}>
                <SketchFrame>
                  <Image src={sample.src} width={sample.width} height={sample.height}
                    alt={sample.caption[locale]} sizes={sample.width < 300 ? "265px" : "(max-width: 767px) 90vw, 850px"} />
                </SketchFrame>
                <figcaption>{sample.caption[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className="case-decisions" aria-labelledby="decisions-title">
        <div className="case-section-heading">
          <h2 id="decisions-title">{story.decisionsLabel ?? t.decisions}</h2>
        </div>
        <ul className="decision-list" role="list">
          {story.decisions.map((decision) => (
            <li key={decision.title}>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
            </li>
          ))}
        </ul>
      </section>
      {story.challenge || story.learning ? (
      <div className="case-experience">
      <section className="case-section" aria-labelledby="challenge-title">
        <h2 id="challenge-title">{t.challenge}</h2>
        <p className={!story.challenge ? "pending-copy" : undefined}>
          {story.challenge ?? t.pending}
        </p>
      </section>
      <section className="case-section learning-section" aria-labelledby="learning-title">
        <div className="case-section-heading">
          <h2 id="learning-title">{t.learning}</h2>
        </div>
        <p className={!story.learning ? "pending-copy" : undefined}>
          {story.learning ?? t.pending}
        </p>
        {project.slug === "gemini-tts" && <ChibiMoment pose="review-code" />}
      </section>
      </div>
      ) : (
        <section className="case-pending" aria-labelledby="pending-title">
          {project.slug === "portfolio-v2" && <ChibiMoment pose="notes" />}
          <div>
          <h2 id="pending-title">{t.challenge} / {t.learning}</h2>
          <p>{t.pending}</p>
          </div>
        </section>
      )}
      <section className="case-outcome" aria-labelledby="outcome-title">
        <h2 id="outcome-title">{t.outcome}</h2>
        <p>{story.outcome}</p>
      </section>
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

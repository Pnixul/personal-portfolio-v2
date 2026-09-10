import { ArrowDown, ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { getMessages, isLocale } from "@/lib/i18n";
import { contactEmail } from "@/lib/projects";
import { SelectedWork } from "@/components/SelectedWork";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  return (
    <main id="main">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-kicker">
          <p className="eyebrow">{t.portfolio}</p>
        </div>
        <h1 id="hero-title" className="hero-name">
          {t.name}
          <span className="text-accent">.</span>
        </h1>
        <div className="hero-body">
          <div className="hero-statement">
            <p>
              {t.heroLine}
              <br />
              <span>{t.heroAccent}</span>
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#work">
                {t.viewWork}
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href="#journey">
                {t.aboutLink}
                <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-intro">
            <p>{t.intro}</p>
            <p className="nickname">{t.nickname}</p>
          </div>
        </div>
        <div className="hero-context">
          <div>
            <span className="context-marker" />
            <p className="context-label">{t.currentLabel}</p>
            <p>
              {t.current}
              <span>{t.currentDetail}</span>
            </p>
          </div>
          <div>
            <ArrowUpRight
              size={19}
              className="text-accent"
              aria-hidden="true"
            />
            <p className="context-label">{t.nextLabel}</p>
            <p>
              {t.next}
              <span>{t.nextDetail}</span>
            </p>
          </div>
        </div>
      </section>
      <SelectedWork locale={locale} />
      <section
        className="journey-band"
        id="journey"
        aria-labelledby="journey-title"
      >
        <div className="shell section">
          <div className="journey-intro">
            <div>
              <h2 id="journey-title" className="whitespace-pre-line">
                {t.journeyTitle}
              </h2>
            </div>
            <p className="text-muted leading-relaxed">{t.journeyIntro}</p>
          </div>
          <ol className="journey-stages">
            {t.stages.map((stage, index) => (
              <li key={stage.label}>
                <div className="stage-top">
                  <span className="mono">{index + 1}</span>
                  <span>{stage.label}</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </li>
            ))}
          </ol>
          <div className="practice">
            <div>
              <h3>{t.practiceTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t.practiceIntro}
              </p>
            </div>
            <dl>
              {t.practice.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="shell closing"
        aria-labelledby="contact-title"
      >
        <div className="closing-body">
          <h2 id="contact-title" className="whitespace-pre-line">
            {t.closingTitle}
          </h2>
          <div>
            <p className="text-muted leading-relaxed">{t.closingText}</p>
            {contactEmail ? (
              <a className="text-link mt-7" href={`mailto:${contactEmail}`}>
                <Mail size={18} aria-hidden="true" />
                {contactEmail}
              </a>
            ) : (
              <p className="contact-pending">
                <Mail size={17} aria-hidden="true" />
                {t.contactPending}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

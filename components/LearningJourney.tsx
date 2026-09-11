import { getMessages, type Locale } from "@/lib/i18n";
import { homeStory } from "@/lib/home-story";

export function LearningJourney({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const story = homeStory[locale];
  return (
    <section
      className="journey-band"
      id="journey"
      aria-labelledby="journey-title"
    >
      <div className="shell journey-layout">
        <div className="journey-intro">
          <h2 id="journey-title">{story.journeyTitle}</h2>
        </div>
        <div className="journey-progression">
          <svg
            className="journey-thread"
            viewBox="0 0 80 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="thread-guide"
              d="M24 2 C-12 125 65 160 32 305 S76 474 33 604 S-4 820 41 997"
              pathLength="1"
            />
            <path
              className="thread-ink"
              d="M24 2 C-12 125 65 160 32 305 S76 474 33 604 S-4 820 41 997"
              pathLength="1"
            />
          </svg>
          <ol className="journey-stages">
            {t.stages.map((stage, index) => (
              <li key={stage.label} id={index === 2 ? "direction" : undefined}>
                <p className="stage-label">{stage.label}</p>
                <h3>{stage.title}</h3>
                <p className="stage-copy">{stage.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

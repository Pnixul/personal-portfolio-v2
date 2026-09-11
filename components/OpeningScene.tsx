import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import { homeStory } from "@/lib/home-story";
import { character } from "@/lib/character";
import { SketchMark } from "./SketchMark";
import { PortfolioOpening } from "./PortfolioOpening";

export function OpeningScene({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const story = homeStory[locale];
  return (
    <>
      <PortfolioOpening label={t.portfolio} />
    <section className="hero shell" aria-labelledby="hero-title">
      <p className="eyebrow">{t.portfolio}</p>
      <div className="opening-scene">
        <div className="opening-copy">
          <h1 id="hero-title" className="hero-name">
            {story.greeting}
          </h1>
          <SketchMark className="hero-sketch" />
          <div className="hero-identity">
            <p className="hero-byline">{t.name}</p>
            <p>{story.student}</p>
            <p>{story.college}</p>
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="#work">
              {t.viewWork}
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <figure className="character-scene">
          <div className="character-construction" aria-hidden="true">
            <span />
            <span />
          </div>
          {character.src ? (
            <div className="portrait-plate">
              <Image
                className="character-art character-study"
                src={character.src}
                alt=""
                aria-hidden="true"
                width={character.width}
                height={character.height}
                sizes="(max-width: 600px) 85vw, (max-width: 1023px) 45vw, 540px"
              />
              <Image
                className="character-art character-ink"
                src={character.src}
                alt={character.alt[locale]}
                width={character.width}
                height={character.height}
                sizes="(max-width: 600px) 85vw, (max-width: 1023px) 45vw, 540px"
                preload
              />
            </div>
          ) : (
            <div className="character-placeholder">{story.characterPending}</div>
          )}
        </figure>
      </div>
    </section>
    </>
  );
}

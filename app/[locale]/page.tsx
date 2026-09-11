import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { homeStory } from "@/lib/home-story";
import { SelectedWork } from "@/components/SelectedWork";
import { OpeningScene } from "@/components/OpeningScene";
import { LearningJourney } from "@/components/LearningJourney";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const story = homeStory[locale];
  return (
    <main id="main">
      <OpeningScene locale={locale} />
      <SelectedWork locale={locale} />
      <section className="shell reflection" aria-labelledby="reflection-title">
        <h2 id="reflection-title">{story.reflectionTitle}</h2>
        <div className="reflection-body">
          {story.reflection.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <LearningJourney locale={locale} />
    </main>
  );
}

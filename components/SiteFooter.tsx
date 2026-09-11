import { ArrowUp, Mail } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
import { contactEmail } from "@/lib/projects";
import { ChibiMoment } from "./ChibiMoment";
import { homeStory } from "@/lib/home-story";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <footer id="contact" className="site-footer" aria-labelledby="closing-title">
      <div className="shell">
        <div className="footer-closing">
          <h2 id="closing-title">{t.closingTitle}{" "}
            <svg className="closing-smile" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <path d="M31 5C15 3 5 15 6 31c0 14 12 24 25 23 15-1 24-12 23-26C53 14 43 5 29 6M9 18C4 28 7 42 17 49" />
              <path d="m21 22 .5 4M38 21l-.5 4M19 34c5 11 17 13 24-1" />
            </svg>
          </h2>
          <ChibiMoment pose="footer" />
        </div>
        <div className="footer-details">
          <p>{t.name}</p>
          {contactEmail ? (
            <a className="text-link footer-contact" href={`mailto:${contactEmail}`}>
              <Mail size={18} aria-hidden="true" />
              {contactEmail}
            </a>
          ) : (
            <p className="footer-institution">{homeStory[locale].college}</p>
          )}
          <a href="#main" className="text-link">
            {t.backTop}
            <ArrowUp size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

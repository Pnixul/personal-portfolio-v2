import { ArrowUp } from "lucide-react";
import { getMessages, type Locale } from "@/lib/i18n";
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <footer className="shell site-footer">
      <div>
        <p className="font-medium">
          {t.name}
          <span className="text-accent">.</span>
        </p>
        <p className="mt-2 text-sm text-muted">{t.footerNote}</p>
      </div>
      <a href="#main" className="text-link text-sm">
        {t.backTop}
        <ArrowUp size={17} aria-hidden="true" />
      </a>
    </footer>
  );
}

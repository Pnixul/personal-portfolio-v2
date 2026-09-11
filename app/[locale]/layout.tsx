import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getMessages(locale);
  return {
    title: { default: t.meta, template: `%s · ${t.name}` },
    description: t.description,
    icons: { icon: "/icon" },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  return (
    <html lang={locale}>
      <head>
        <link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {locale === "th" && <>
          <link rel="preload" href="/fonts/anuphan-thai.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/anuphan-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        </>}
      </head>
      <body>
        <div className="story-progress" aria-hidden="true">
          <span />
        </div>
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <SiteHeader
          locale={locale}
          messages={{
            name: t.name,
            home: t.home,
            nav: t.nav,
            work: t.work,
            journey: t.journey,
            contact: t.contact,
            language: t.language,
            menu: t.menu,
            close: t.close,
          }}
        />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}

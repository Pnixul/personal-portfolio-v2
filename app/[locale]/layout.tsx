import type { Metadata } from "next";
import { Anuphan, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getMessages, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});
const anuphan = Anuphan({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});
const mono = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});
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
    <html
      lang={locale}
      className={`${geist.variable} ${anuphan.variable} ${mono.variable}`}
    >
      <body>
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

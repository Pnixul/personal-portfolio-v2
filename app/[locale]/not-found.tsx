"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getMessages, isLocale } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams();
  const locale =
    typeof params.locale === "string" && isLocale(params.locale)
      ? params.locale
      : "th";
  const t = getMessages(locale);
  return (
    <main id="main" className="shell py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-3xl font-medium">{t.notFound}</h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted">
        {t.notFoundText}
      </p>
      <Link className="text-link mt-8" href={`/${locale}#work`}>
        <ArrowLeft size={18} aria-hidden="true" />
        {t.backWork}
      </Link>
    </main>
  );
}

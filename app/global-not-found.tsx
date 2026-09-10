import { Anuphan } from "next/font/google";
import Link from "next/link";
import { messages } from "@/lib/i18n";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  variable: "--font-thai",
});
export const metadata = { title: messages.th.notFound };
export default function GlobalNotFound() {
  const t = messages.th;
  return (
    <html lang="th" className={anuphan.variable}>
      <body style={{ fontFamily: anuphan.style.fontFamily }}>
        <main className="shell py-24">
          <p className="eyebrow">404</p>
          <h1 className="mt-5 text-3xl font-medium">{t.notFound}</h1>
          <p className="mt-5 text-muted">{t.notFoundText}</p>
          <Link className="text-link mt-8" href="/th">
            {t.home}
          </Link>
        </main>
      </body>
    </html>
  );
}

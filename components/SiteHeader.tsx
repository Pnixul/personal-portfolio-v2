"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { getMessages, Locale } from "@/lib/i18n";

type HeaderMessages = Pick<
  ReturnType<typeof getMessages>,
  | "name"
  | "home"
  | "nav"
  | "work"
  | "journey"
  | "contact"
  | "language"
  | "menu"
  | "close"
>;

export function SiteHeader({
  locale,
  messages: t,
}: {
  locale: Locale;
  messages: HeaderMessages;
}) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const links = [
    { id: "work", label: t.work },
    { id: "journey", label: t.journey },
    { id: "contact", label: t.contact },
  ];
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <nav className="shell header-inner" aria-label={t.nav}>
        <Link
          href={`/${locale}`}
          className="wordmark"
          aria-label={`${t.name} · ${t.home}`}
          onClick={() => setOpen(false)}
        >
          chitipat<span>.</span>
        </Link>
        <div className="desktop-nav">
          {links.map(({ id, label }) => (
            <Link className="nav-link" href={`/${locale}#${id}`} key={id}>
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="language-switch" aria-label={t.language} role="group">
            {(["th", "en"] as const).map((value) => (
              <a
                key={value}
                lang={value}
                hrefLang={value}
                href={pathname.replace(/^\/(th|en)(?=\/|$)/, `/${value}`)}
                aria-label={value === "th" ? "ภาษาไทย" : "English"}
                aria-current={value === locale ? "true" : undefined}
                onClick={(event) => {
                  event.currentTarget.hash = window.location.hash;
                }}
              >
                {value === "th" ? "ไทย" : "EN"}
              </a>
            ))}
          </div>
          <button
            ref={menuButton}
            type="button"
            className="menu-button icon-button"
            aria-label={open ? t.close : t.menu}
            title={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
      <div id="mobile-navigation" className="mobile-nav shell" hidden={!open}>
        {links.map(({ id, label }) => (
          <Link
            href={`/${locale}#${id}`}
            key={id}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}

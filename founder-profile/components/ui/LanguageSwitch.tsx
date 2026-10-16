"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, type MouseEvent } from "react";
import { locales, localePath, type Locale } from "@/content/home";

type LanguageSwitchProps = {
  locale: Locale;
  label: string;
  className?: string;
};

// Switching language lands on the section being read; plain links remain the no-JS path.
export default function LanguageSwitch({ locale, label, className }: LanguageSwitchProps) {
  const router = useRouter();

  function switchTo(event: MouseEvent<HTMLAnchorElement>, target: Locale) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = [...document.querySelectorAll<HTMLElement>("main section[id]")]
      .findLast((element) => element.getBoundingClientRect().top <= innerHeight / 2);
    if (!section) return;
    event.preventDefault();
    router.push(`${localePath(target)}#${section.id}`);
  }

  return (
    <nav className={className} aria-label={label}>
      {locales.map((target, index) => (
        <Fragment key={target}>
          {index > 0 && <span aria-hidden="true">/</span>}
          <Link
            href={localePath(target)}
            lang={target}
            hrefLang={target}
            aria-current={locale === target ? "page" : undefined}
            onClick={(event) => switchTo(event, target)}
          >
            {target.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}

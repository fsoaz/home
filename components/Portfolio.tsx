"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { capabilities, copy, projects, type Locale } from "@/app/content";
import { BlackHole } from "./BlackHole";
import { Mark } from "./Mark";

const STORAGE_KEY = "fm-portfolio-locale-v1";
const sections = ["about", "expertise", "work", "contact"];

function Arrow() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5"/></svg>; }
function External() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4h9v9M16 4 6 14M14 10v6H4V6h6"/></svg>; }

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  const t = copy[locale];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial: Locale = saved === "en" || saved === "pt-BR" ? saved : navigator.language.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
    queueMicrotask(() => setLocale(initial));
    document.documentElement.lang = initial;
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const switchLocale = () => { const next = locale === "en" ? "pt-BR" : "en"; setLocale(next); localStorage.setItem(STORAGE_KEY, next); document.documentElement.lang = next; };
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  return (
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <a className="brand-link" href="#top" aria-label="Francisco Micael — home"><Mark /></a>
        <nav className="desktop-nav" aria-label="Primary">{sections.map((id, i) => <a key={id} href={`#${id}`}>{t.nav[i]}</a>)}</nav>
        <div className="header-actions">
          <button className="language" onClick={switchLocale} aria-label={t.language}><span className={locale === "en" ? "active" : ""}>EN</span><i>/</i><span className={locale === "pt-BR" ? "active" : ""}>PT</span></button>
          <button ref={menuButton} className="menu-button" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? t.menuClose : t.menuOpen}><span/><span/></button>
        </div>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile" aria-hidden={!menuOpen}>
          {sections.map((id, i) => <a ref={i === 0 ? (node) => { firstMenuLink.current = node; if (node && menuOpen) node.focus(); } : undefined} tabIndex={menuOpen ? 0 : -1} key={id} href={`#${id}`} onClick={closeMenu}><span>0{i + 1}</span>{t.nav[i]}</a>)}
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <BlackHole />
          <div className="hero-copy">
            <p className="availability"><span/>{t.available}</p>
            <h1 id="hero-title">Francisco <em>Micael</em></h1>
            <div className="hero-details">
              <p className="role">{t.role}</p>
              <p className="hero-intro">{t.hero}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="mailto:fmsoaz@gmail.com">{t.email}<Arrow /></a>
                <a className="button button-ghost" href="https://github.com/fsoaz" target="_blank" rel="noreferrer">{t.github}<External /></a>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>{t.scroll}</span><i/></a>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="section-label"><span>01</span>{t.aboutLabel}</div>
          <div className="about-content"><h2 id="about-title">{t.aboutTitle}</h2><p>{t.aboutBody}</p>
            <ol>{t.principles.map((principle, i) => <li key={principle}><span>0{i + 1}</span>{principle}</li>)}</ol>
          </div>
        </section>

        <section id="expertise" className="section expertise" aria-labelledby="expertise-title">
          <div className="section-label"><span>02</span>{t.expertiseLabel}</div>
          <h2 id="expertise-title">{t.expertiseTitle}</h2>
          <div className="capabilities">{capabilities.map((item) => <article key={item.number}><span className="cap-number">{item.number}</span><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p><ul>{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></article>)}</div>
        </section>

        <section id="work" className="section work" aria-labelledby="work-title">
          <div className="section-label"><span>03</span>{t.workLabel}</div>
          <h2 id="work-title">{t.workTitle}</h2>
          <div className="project-list">{projects.map((project) => <article className="project" key={project.slug}>
            <div className="project-visual"><Image src={project.image} alt={project.alt[locale]} fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
            <div className="project-copy"><div className="project-meta"><span>{project.number}</span><span>{project.eyebrow[locale]}</span></div><h3>{project.title}</h3>
              <dl><div><dt>{t.problem}</dt><dd>{project.problem[locale]}</dd></div><div><dt>{t.approach}</dt><dd>{project.approach[locale]}</dd></div></dl>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={project.repository} target="_blank" rel="noreferrer">{t.source}<External /></a>
            </div>
          </article>)}</div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="section-label"><span>04</span>{t.contactLabel}</div>
          <div className="contact-inner"><p className="contact-kicker">{t.available}</p><h2 id="contact-title">{t.contactTitle}</h2><p>{t.contactBody}</p><a className="email-link" href="mailto:fmsoaz@gmail.com">fmsoaz@gmail.com<Arrow /></a></div>
        </section>
      </main>
      <footer><Mark compact/><p>{t.location}</p><div><a href="mailto:fmsoaz@gmail.com">Email</a><a href="https://github.com/fsoaz" target="_blank" rel="noreferrer">GitHub</a></div><span>© {new Date().getFullYear()} Francisco Micael</span></footer>
    </>
  );
}

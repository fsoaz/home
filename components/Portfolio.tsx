"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { capabilities, copy, projects, type Locale } from "@/app/content";
import { BlackHole } from "./BlackHole";
import { Mark } from "./Mark";

const STORAGE_KEY = "fm-portfolio-locale-v1";
const CONTACT_URL = "https://formspree.io/f/mzezzywp";
const sections = ["about", "expertise", "work", "contact"];

function Arrow() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5"/></svg>; }
function External() { return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 4h9v9M16 4 6 14M14 10v6H4V6h6"/></svg>; }

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [headerPastHero, setHeaderPastHero] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMenuLink = useRef<HTMLAnchorElement>(null);
  const hero = useRef<HTMLElement>(null);
  const t = copy[locale];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial: Locale = saved === "en" || saved === "pt-BR" ? saved : navigator.language.toLowerCase().startsWith("pt") ? "pt-BR" : "en";
    queueMicrotask(() => setLocale(initial));
    document.documentElement.lang = initial;
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 961px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    const heroNode = hero.current;
    if (!heroNode) return;

    const heroObserver = new IntersectionObserver(([entry]) => {
      setHeaderPastHero(!entry.isIntersecting);
    }, { rootMargin: "-82px 0px 0px", threshold: 0 });

    heroObserver.observe(heroNode);
    return () => heroObserver.disconnect();
  }, []);

  useEffect(() => {
    const nodes = sections.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      if (!entering.length) return;
      const marker = window.innerHeight * 0.275;
      const current = entering.sort((a, b) => Math.abs(a.boundingClientRect.top - marker) - Math.abs(b.boundingClientRect.top - marker))[0];
      setActiveSection((current.target as HTMLElement).id);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const pendingNodes = revealNodes.filter((node) => node.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (!pendingNodes.length) return;

    pendingNodes.forEach((node) => node.classList.add("reveal-pending"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.12 });
    pendingNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const backgroundNodes = Array.from(document.querySelectorAll<HTMLElement>("#main, footer, .skip-link, .brand-link, .desktop-nav, .language"));
    const previousInert = backgroundNodes.map((node) => node.inert);

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    backgroundNodes.forEach((node) => { node.inert = true; });

    const focusFrame = requestAnimationFrame(() => firstMenuLink.current?.focus());
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => menuButton.current?.focus());
        return;
      }

      if (event.key === "Tab") {
        const focusable = [menuButton.current, ...Array.from(document.querySelectorAll<HTMLAnchorElement>("#mobile-menu a"))].filter((node): node is HTMLButtonElement | HTMLAnchorElement => Boolean(node));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!focusable.includes(document.activeElement as HTMLButtonElement | HTMLAnchorElement)) {
          event.preventDefault();
          firstMenuLink.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyboard);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
      backgroundNodes.forEach((node, index) => { node.inert = previousInert[index]; });
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
      <header className={`site-header ${headerPastHero ? "is-scrolled" : ""}`}>
        <a className="brand-link" href="#top" aria-label="Francisco Micael — home"><Mark /></a>
        <nav className="desktop-nav" aria-label="Primary">{sections.map((id, i) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{t.nav[i]}</a>)}</nav>
        <div className="header-actions">
          <button className="language" onClick={switchLocale} aria-label={t.language}><span className={locale === "en" ? "active" : ""}>EN</span><i>/</i><span className={locale === "pt-BR" ? "active" : ""}>PT</span></button>
          <button ref={menuButton} className="menu-button" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? t.menuClose : t.menuOpen}><span/><span/></button>
        </div>
        <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label="Mobile" aria-hidden={!menuOpen}>
          {sections.map((id, i) => <a ref={i === 0 ? firstMenuLink : undefined} tabIndex={menuOpen ? 0 : -1} key={id} href={`#${id}`} onClick={closeMenu} aria-current={activeSection === id ? "location" : undefined}><span>0{i + 1}</span>{t.nav[i]}</a>)}
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section ref={hero} id="top" className="hero" aria-labelledby="hero-title">
          <BlackHole />
          <div className="hero-copy">
            <p className="availability"><span/>{t.available}</p>
            <h1 id="hero-title">Francisco <em>Micael</em></h1>
            <div className="hero-details">
              <p className="role">{t.role}</p>
              <p className="hero-intro">{t.hero}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">{t.email}<Arrow /></a>
                <a className="hero-github" href="https://github.com/fsoaz" target="_blank" rel="noreferrer">{t.github}<External /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="section-label" data-reveal><span>01</span>{t.aboutLabel}</div>
          <div className="about-content" data-reveal><h2 id="about-title">{t.aboutTitle}</h2><p>{t.aboutBody}</p>
            <ol>{t.principles.map((principle, i) => <li key={principle}><span>0{i + 1}</span>{principle}</li>)}</ol>
          </div>
        </section>

        <section id="expertise" className="section expertise" aria-labelledby="expertise-title">
          <div className="section-label" data-reveal><span>02</span>{t.expertiseLabel}</div>
          <h2 id="expertise-title" data-reveal>{t.expertiseTitle}</h2>
          <div className="capabilities" data-reveal>{capabilities.map((item) => <article key={item.number}><span className="cap-number">{item.number}</span><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p><ul>{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></article>)}</div>
        </section>

        <section id="work" className="section work" aria-labelledby="work-title">
          <div className="section-label" data-reveal><span>03</span>{t.workLabel}</div>
          <h2 id="work-title" data-reveal>{t.workTitle}</h2>
          <div className="project-list">{projects.map((project) => <article className="project" key={project.slug} data-reveal>
            <div className="project-visual"><Image src={project.image} alt={project.alt[locale]} fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
            <div className="project-copy"><div className="project-meta"><span>{project.number}</span><span>{project.eyebrow[locale]}</span></div><h3>{project.title}</h3>
              <dl><div><dt>{t.problem}</dt><dd>{project.problem[locale]}</dd></div><div><dt>{t.approach}</dt><dd>{project.approach[locale]}</dd></div></dl>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={project.repository} target="_blank" rel="noreferrer">{t.source}<External /></a>
            </div>
          </article>)}</div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="section-label" data-reveal><span>04</span>{t.contactLabel}</div>
          <div className="contact-inner" data-reveal>
            <div className="contact-copy">
              <h2 id="contact-title">{t.contactTitle}</h2>
              <p>{t.contactBody}</p>
            </div>
            <form id="contact-form" className="contact-form" action={CONTACT_URL} method="POST" acceptCharset="UTF-8">
              <label className="contact-field" htmlFor="contact-name"><span>{t.formName}</span><input id="contact-name" name="name" type="text" autoComplete="name" required /></label>
              <label className="contact-field" htmlFor="contact-email"><span>{t.formEmail}</span><input id="contact-email" name="email" type="email" autoComplete="email" required /></label>
              <label className="contact-field contact-field-message" htmlFor="contact-message"><span>{t.formMessage}</span><textarea id="contact-message" name="message" rows={6} required /></label>
              <input className="form-honeypot" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="button button-primary contact-submit" type="submit">{t.formSubmit}<Arrow /></button>
            </form>
          </div>
        </section>
      </main>
      <footer><Mark compact/><p>{t.location}</p><div><a href="#contact">{t.contactLabel}</a><a href="https://github.com/fsoaz" target="_blank" rel="noreferrer">GitHub</a></div><span>© {new Date().getFullYear()} Francisco Micael</span></footer>
    </>
  );
}

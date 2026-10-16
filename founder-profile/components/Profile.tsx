import Image from "next/image";
import { homeCopy, links, type Locale } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import Tag from "@/components/ui/Tag";
import LanguageSwitch from "@/components/ui/LanguageSwitch";
import portrait from "@/public/francisco-micael.png";
import styles from "./Profile.module.css";

export default function Profile({ locale }: { locale: Locale }) {
  const t = homeCopy[locale];
  return (
    <>
      <a className={styles.skip} href="#main">{t.skip}</a>
      <div className={styles.shell} id="top">
        <header className={styles.header}>
          <a className={styles.wordmark} href="#top" aria-label="Francisco Micael">FM<span aria-hidden="true">.</span></a>
          <LanguageSwitch locale={locale} label={t.languageNavigation} className={styles.languages} />
        </header>
        <main id="main" tabIndex={-1}>
          <section className={styles.hero} aria-labelledby="name" id="intro">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{t.role}</p>
              <h1 id="name">Francisco<br /><em>Micael.</em></h1>
              <p className={styles.intro}>{t.intro}</p>
              <nav className={styles.actions} aria-label={t.navigation}>
                <CtaLink href="#ventures" label={t.venturesLink} />
                <a className={styles.textLink} href="#contact">{t.contactLink} <span aria-hidden="true">↗</span></a>
              </nav>
            </div>
            <figure className={styles.portrait}>
              <Image src={portrait} alt={t.portraitAlt} priority sizes="(max-width: 760px) 90vw, 36vw" />
              <figcaption><span>Francisco Micael</span><span>{t.location}</span></figcaption>
            </figure>
          </section>
          <section className={styles.section} id="about" aria-labelledby="about-title">
            <SectionHeading id="about-title" number="01 /" title={t.aboutTitle} />
            <div className={styles.sectionBody}><p>{t.about}</p><div className={styles.tags}>{t.disciplines.map(label => <Tag key={label} label={label} />)}</div></div>
          </section>
          <section className={styles.section} id="ventures" aria-labelledby="ventures-title">
            <SectionHeading id="ventures-title" number="02 /" title={t.venturesTitle} />
            <div className={styles.ventures}>
              <article className={styles.venture}>
                <h3>Black Hole Company<span className={styles.gold} aria-hidden="true"> ↗</span></h3>
                <p>{t.companyDescription}</p>
                <a className={styles.textLink} href={links.company}>{t.companyLink} <span aria-hidden="true">↗</span></a>
              </article>
              <article className={styles.venture}>
                <h3 className={styles.upcoming}>quote-normalizer-web</h3>
                <Tag label={t.soon} />
              </article>
            </div>
          </section>
          <section className={styles.section} id="writing" aria-labelledby="writing-title">
            <SectionHeading id="writing-title" number="03 /" title={t.writingTitle} />
            <p className={styles.empty}>{t.writingEmpty}</p>
          </section>
          <section className={`${styles.section} ${styles.contact}`} id="contact" aria-labelledby="contact-title">
            <SectionHeading id="contact-title" number="04 /" title={t.contactTitle} />
            <div className={styles.sectionBody}><p>{t.contactBody}</p><div className={styles.actions}><CtaLink href={links.contact} label={t.contactCta} /><a className={styles.textLink} href={links.github}>GitHub <span aria-hidden="true">↗</span></a></div></div>
          </section>
        </main>
        <footer className={styles.footer}><span>Francisco Micael</span><a href="#top">{t.backToTop} <span aria-hidden="true">↑</span></a></footer>
      </div>
    </>
  );
}

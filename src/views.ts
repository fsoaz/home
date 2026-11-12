import { copy, projects, skills, type Language } from './content';

type Copy = typeof copy.en;
const assetBase = import.meta.env.BASE_URL;

export function renderHeader(c: Copy, language: Language): string {
  const en = language === 'en';
  return `<a class="skip" href="#work">${c.work}</a><header><a class="brand" href="#" aria-label="Francisco Soares — home"><span class="brand-mark">f.</span><span class="brand-name">Francisco Soares</span></a><span class="brand-edition">Event Horizon</span><nav aria-label="${en ? 'Main navigation' : 'Navegação principal'}"><a href="#work">${en ? 'Work' : 'Projetos'}</a><a href="#expertise">${en ? 'Expertise' : 'Competências'}</a><a href="#about">${en ? 'About' : 'Sobre'}</a><a href="#contact">${en ? 'Contact' : 'Contato'}</a></nav><button id="language" aria-label="${en ? 'Mudar para português' : 'Switch to English'}"><span class="${en ? 'active' : ''}">EN</span><span class="language-divider">/</span><span class="${en ? '' : 'active'}">PT</span></button></header>`;
}

export function renderHero(c: Copy): string {
  return `<section class="hero" aria-labelledby="hero-title"><div class="orbital-scale" aria-hidden="true"><i></i></div><div class="hero-content"><p class="availability"><span class="dot" aria-hidden="true"></span>${c.available}</p><h1 id="hero-title">${c.headline}</h1><p class="intro">${c.intro}</p><div class="actions"><a class="button" href="#work">${c.view} <span aria-hidden="true">↗</span></a><a class="resume" href="${assetBase}francisco-soares-cv.pdf" download>${c.resume}<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3v13m-5-5 5 5 5-5M3 16v5h18v-5"/></svg></a></div></div><div class="hero-bottom"><span>01 / ${c === copy.en ? 'INTRODUCTION' : 'INTRODUÇÃO'}</span><span class="section-rule"></span><button id="motion-toggle" type="button" hidden aria-pressed="false" data-pause-label="${c === copy.en ? 'Pause motion' : 'Pausar animação'}" data-play-label="${c === copy.en ? 'Resume motion' : 'Retomar animação'}"></button><a href="#work">${c.scroll} <span aria-hidden="true">↓</span></a></div></section>`;
}

function renderProject(project: typeof projects[number], index: number, c: Copy): string {
  const stack = project.stack.split(' / ').slice(0, 3).join(' · ');
  return `<article class="project"><details><summary><span class="project-meta"><span class="project-index">${project.n}</span><span>${project.type[index]}</span></span><span class="project-title">${project.name}<span class="project-arrow" aria-hidden="true">↗</span></span><span class="stack">${stack}</span><span class="sr-only"> — ${c.detail}</span></summary><div class="project-body"><p>${project.desc[index]}</p><strong>${project.metric[index]}</strong><p>${project.detail[index]}</p></div></details></article>`;
}

export function renderWork(c: Copy, language: Language): string {
  const index = language === 'en' ? 0 : 1;
  return `<section id="work" class="work-section" aria-labelledby="work-title"><div class="work-heading"><div><p class="eyebrow">${c.work}</p><h2 id="work-title">${c.projects}</h2></div><button id="all-projects" aria-expanded="false" aria-controls="more-projects">${language === 'en' ? 'View all projects' : 'Ver todos os projetos'} <span aria-hidden="true">↗</span></button></div><div class="projects">${projects.slice(0, 3).map(project => renderProject(project, index, c)).join('')}</div><div id="more-projects" hidden><div class="projects more-projects">${projects.slice(3).map(project => renderProject(project, index, c)).join('')}</div><p class="note">${c.note}</p></div></section>`;
}

export function renderAbout(c: Copy, language: Language): string {
  return `<section id="about" class="section about"><div><p class="eyebrow">02 / ${c.about}</p><h2>${c.bio}</h2><p>${c.bioText}</p><div id="expertise" class="expertise"><h3>${language === 'en' ? 'Technical expertise' : 'Competências técnicas'}</h3><div class="skills">${skills.map(skill => `<span>${skill}</span>`).join('')}</div></div></div><div class="timeline"><article><small>2026 — ${language === 'en' ? 'PRESENT' : 'ATUAL'}</small><h3>${c.now}</h3><p>Condoasa · ${language === 'en' ? 'Independent projects' : 'Projetos próprios'}</p></article><article><small>2024 — 2026</small><h3>${c.past}</h3><p>Telefônica Brasil · Vivo</p></article><article><small>${c.education}</small><p>${c.edu}</p></article></div></section>`;
}

export function renderContact(c: Copy, language: Language): string {
  return `<section id="contact" class="section contact"><p class="eyebrow">03 / ${c.contact}</p><h2>${c.end}</h2><p>${c.endText}</p><div id="email-contact" aria-live="polite"><button class="email" id="reveal-email" type="button">${language === 'en' ? 'Show email' : 'Mostrar e-mail'} ↗</button></div><div class="social"><a href="https://github.com/fsoaz">GitHub ↗</a><a href="https://www.linkedin.com/in/francisco-soares-b89299427/">LinkedIn ↗</a></div></section>`;
}

export function renderFooter(c: Copy): string {
  return `<footer><span>© ${new Date().getFullYear()} Francisco Soares</span><span>${c.footer}</span><a href="#">↑ TOP</a></footer>`;
}

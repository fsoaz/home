import { copy, projects, skills, type Language } from './content';

type Copy = typeof copy.en;
const assetBase = import.meta.env.BASE_URL;

export function renderHeader(c: Copy, language: Language): string {
  return `<a class="skip" href="#work">${c.work}</a><header><a class="brand" href="#">fs<span>✳</span></a><nav><a href="#work">${c.work}</a><a href="#about">${c.about}</a><a href="#contact">${c.contact} ↗</a></nav><button id="language" aria-label="${language === 'en' ? 'Mudar para português' : 'Switch to English'}">${language === 'en' ? 'EN / PT' : 'PT / EN'}</button></header>`;
}

export function renderHero(c: Copy): string {
  return `<section class="hero"><div id="space" aria-hidden="true"></div><div class="hero-content"><p class="eyebrow">${c.label}</p><h1>${c.headline}</h1><p class="intro">${c.intro}</p><div class="actions"><a class="button" href="#work">${c.view} <span>↗</span></a><a class="resume" href="${assetBase}francisco-soares-cv.pdf" download>${c.resume}</a></div></div><div class="hero-bottom"><span><b class="dot"></b>${c.available}</span><span>01 — ${c.scroll} ↓</span></div><span class="coordinate">CURITIBA, BR · 25.43° S / 49.27° W</span></section>`;
}

function renderProject(project: typeof projects[number], index: number, c: Copy): string {
  return `<article class="project"><div class="project-index">${project.n} /</div><div><p class="eyebrow">${project.type[index]}</p><h3>${project.name}</h3><p>${project.desc[index]}</p><div class="stack">${project.stack}</div><details><summary>${c.detail} <span aria-hidden="true">+</span></summary><p>${project.detail[index]}</p></details></div><div class="project-metric"><span>↗</span><strong>${project.metric[index]}</strong></div></article>`;
}

export function renderWork(c: Copy, language: Language): string {
  const index = language === 'en' ? 0 : 1;
  return `<section id="work" class="section"><div class="section-top"><p class="eyebrow">01 / ${c.work}</p><span>2026 — ∞</span></div><div class="section-heading"><h2>${c.projects}</h2><p>${c.projectIntro}</p></div><div class="projects">${projects.map(project => renderProject(project, index, c)).join('')}</div><p class="note">${c.note}</p></section>`;
}

export function renderAbout(c: Copy, language: Language): string {
  return `<section id="about" class="section about"><div><p class="eyebrow">02 / ${c.about}</p><h2>${c.bio}</h2><p>${c.bioText}</p><div class="skills">${skills.map(skill => `<span>${skill}</span>`).join('')}</div></div><div class="timeline"><article><small>2026 — ${language === 'en' ? 'PRESENT' : 'ATUAL'}</small><h3>${c.now}</h3><p>Condoasa · ${language === 'en' ? 'Independent projects' : 'Projetos próprios'}</p></article><article><small>2024 — 2026</small><h3>${c.past}</h3><p>Telefônica Brasil · Vivo</p></article><article><small>${c.education}</small><p>${c.edu}</p></article></div></section>`;
}

export function renderContact(c: Copy, language: Language): string {
  return `<section id="contact" class="section contact"><p class="eyebrow">03 / ${c.contact}</p><h2>${c.end}</h2><p>${c.endText}</p><div id="email-contact" aria-live="polite"><button class="email" id="reveal-email" type="button">${language === 'en' ? 'Show email' : 'Mostrar e-mail'} ↗</button></div><div class="social"><a href="https://github.com/fsoaz">GitHub ↗</a><a href="https://www.linkedin.com/in/francisco-soares-b89299427/">LinkedIn ↗</a></div></section>`;
}

export function renderFooter(c: Copy): string {
  return `<footer><span>© ${new Date().getFullYear()} Francisco Soares</span><span>${c.footer}</span><a href="#">↑ TOP</a></footer>`;
}

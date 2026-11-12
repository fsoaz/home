import './style.css';
import { copy, type Language } from './content';
import { renderAbout, renderContact, renderFooter, renderHeader, renderHero, renderWork } from './views';

function readLanguage(): Language {
  try { return localStorage.getItem('language') === 'pt' ? 'pt' : 'en'; }
  catch { return 'en'; }
}

let language = readLanguage();
let stopScene = () => {};

function render(): void {
  stopScene();
  const content = copy[language];
  document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
  document.title = `Francisco Soares — ${language === 'en' ? 'Backend Engineer' : 'Desenvolvedor Backend'}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', content.intro);
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = [
    renderHeader(content, language),
    '<main><div class="opening"><div id="space" aria-hidden="true"></div>',
    renderHero(content),
    renderWork(content, language),
    '</div>',
    renderAbout(content, language),
    renderContact(content, language),
    '</main>',
    renderFooter(content),
  ].join('');

  document.querySelector('#language')!.addEventListener('click', () => {
    language = language === 'en' ? 'pt' : 'en';
    try { localStorage.setItem('language', language); } catch { /* Keep the selection for this session. */ }
    render();
    document.querySelector<HTMLButtonElement>('#language')?.focus();
  });

  document.querySelector('#reveal-email')!.addEventListener('click', () => {
    const address = ['francisco', 'micael'].join('') + '@' + ['hotmail', 'com'].join('.');
    const link = document.createElement('a');
    link.className = 'email';
    link.href = `mailto:${address}`;
    link.textContent = `${address} ↗`;
    document.querySelector('#email-contact')!.replaceChildren(link);
    link.focus();
  });

  const host = document.querySelector<HTMLElement>('#space')!;
  const toggle = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
  let cancelled = false;
  stopScene = () => { cancelled = true; };
  import('./scene').then(({ startScene }) => {
    if (!cancelled && host.isConnected) stopScene = startScene(host, toggle);
  }).catch(() => { /* The static backdrop remains available. */ });

  document.querySelector('#all-projects')!.addEventListener('click', (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    document.querySelector<HTMLElement>('#more-projects')!.hidden = !expanded;
    button.innerHTML = `${language === 'en' ? (expanded ? 'Show selected projects' : 'View all projects') : (expanded ? 'Mostrar destaques' : 'Ver todos os projetos')} <span aria-hidden="true">${expanded ? '−' : '↗'}</span>`;
  });
}

render();

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
    '<main>',
    renderHero(content),
    renderWork(content, language),
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

  const host = document.querySelector('#space')!;
  let cancelled = false;
  stopScene = () => { cancelled = true; };
  import('./scene').then(({ startScene }) => {
    if (!cancelled && host.isConnected) stopScene = startScene(host);
  });
}

render();

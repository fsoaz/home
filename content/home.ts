export const locales = ["pt-BR", "en-US"] as const;
export type Locale = (typeof locales)[number];
export const localePath = (locale: Locale) => locale === "pt-BR" ? "/" : "/en";
export const links = {
  company: "https://blackholeco.com.br",
  contact: "#contact-form",
  github: "https://github.com/fsoaz",
};

type Copy = {
  title: string; description: string; languageNavigation: string; navigation: string;
  skip: string; role: string; intro: string; venturesLink: string; contactLink: string;
  portraitAlt: string; aboutTitle: string; about: string; disciplines: readonly string[];
  venturesTitle: string; companyDescription: string; companyLink: string; soon: string;
  writingTitle: string; writingEmpty: string; contactTitle: string; contactBody: string;
  formName: string; formEmail: string; formMessage: string; formSubmit: string;
  contactCta: string; location: string; backToTop: string;
};

export const homeCopy: Record<Locale, Copy> = {
  "pt-BR": {
    title: "Francisco Micael — Fundador da Black Hole Company",
    description: "Sou fundador da Black Hole Company. Construo software prático para problemas complexos de negócio.",
    languageNavigation: "Idioma", navigation: "Navegação principal", skip: "Pular para o conteúdo",
    role: "Fundador · Black Hole Company",
    intro: "Fundador da Black Hole Company. Construo software prático para problemas complexos de negócio.",
    venturesLink: "Conheça os projetos", contactLink: "Vamos conversar",
    portraitAlt: "Avatar do perfil de Francisco Micael no GitHub",
    aboutTitle: "Da complexidade ao que funciona.",
    about: "Sou Francisco Micael, engenheiro no Brasil e fundador da Black Hole Company. Trabalho com sistemas backend, IA aplicada e interfaces para transformar problemas complexos em software útil e sustentável. Meu trabalho começa no problema de negócio e nas pessoas que vão usar a solução.",
    disciplines: ["Sistemas backend", "IA aplicada", "Engenharia de produto"],
    venturesTitle: "O que estou construindo.",
    companyDescription: "Na Black Hole Company, automatizamos processos, integramos sistemas e desenvolvemos software sob medida para pequenas e médias empresas.",
    companyLink: "Conheça a empresa", soon: "Em breve",
    writingTitle: "Textos & conversas.", writingEmpty: "Nada publicado por aqui ainda.",
    contactTitle: "Vamos resolver um problema?",
    contactBody: "Conte o que você está construindo e onde está a dificuldade. Vamos conversar sobre como posso ajudar.",
    formName: "Nome", formEmail: "E-mail", formMessage: "Mensagem", formSubmit: "Enviar mensagem",
    contactCta: "Entre em contato", location: "Brasil", backToTop: "Voltar ao topo",
  },
  "en-US": {
    title: "Francisco Micael — Founder of Black Hole Company",
    description: "I'm the founder of Black Hole Company. I build practical software for complex business problems.",
    languageNavigation: "Language", navigation: "Main navigation", skip: "Skip to content",
    role: "Founder · Black Hole Company",
    intro: "Founder of Black Hole Company. I build practical software for complex business problems.",
    venturesLink: "Explore the ventures", contactLink: "Let's talk",
    portraitAlt: "Avatar from Francisco Micael’s GitHub profile",
    aboutTitle: "From complexity to working software.",
    about: "I'm Francisco Micael, an engineer in Brazil and founder of Black Hole Company. I work across backend systems, applied AI, and interfaces to turn complex problems into useful, maintainable software. My work starts with the business problem and the people who will use the solution.",
    disciplines: ["Backend systems", "Applied AI", "Product engineering"],
    venturesTitle: "What I'm building.",
    companyDescription: "At Black Hole Company, we automate processes, integrate systems, and build custom software for small and medium-sized businesses.",
    companyLink: "Explore the company", soon: "Coming soon",
    writingTitle: "Writing & talks.", writingEmpty: "Nothing published here yet.",
    contactTitle: "Have a problem worth solving?",
    contactBody: "Tell me what you're building and where it gets difficult. Let's talk about how I can help.",
    formName: "Name", formEmail: "Email", formMessage: "Message", formSubmit: "Send message",
    contactCta: "Get in touch", location: "Brazil", backToTop: "Back to top",
  },
};

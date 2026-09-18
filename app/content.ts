export type Locale = "en" | "pt-BR";
export type LocalizedText = Record<Locale, string>;

export type Capability = {
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  tools: string[];
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  eyebrow: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedText;
  stack: string[];
  repository: string;
  image: string;
  alt: LocalizedText;
};

export const capabilities: Capability[] = [
  { number: "01", title: { en: "Backend systems", "pt-BR": "Sistemas backend" }, description: { en: "APIs and services shaped around clear boundaries, reliable data flows, and maintainable code.", "pt-BR": "APIs e serviços com limites claros, fluxos de dados confiáveis e código sustentável." }, tools: ["Python", "FastAPI", "PostgreSQL", "REST"] },
  { number: "02", title: { en: "AI & data", "pt-BR": "IA & dados" }, description: { en: "Applied AI, retrieval workflows, and data products designed for useful, explainable outcomes.", "pt-BR": "IA aplicada, fluxos de recuperação e produtos de dados pensados para resultados úteis e explicáveis." }, tools: ["LLMs", "RAG", "Pandas", "ML"] },
  { number: "03", title: { en: "Frontend", "pt-BR": "Frontend" }, description: { en: "Focused interfaces that make complex systems legible, responsive, and pleasant to use.", "pt-BR": "Interfaces focadas que tornam sistemas complexos claros, responsivos e agradáveis de usar." }, tools: ["Next.js", "React", "TypeScript", "CSS"] },
  { number: "04", title: { en: "Mobile", "pt-BR": "Mobile" }, description: { en: "Native Android experiences with durable local data and dependable background behavior.", "pt-BR": "Experiências Android nativas com dados locais duráveis e comportamento confiável em segundo plano." }, tools: ["Kotlin", "Android", "Room", "Material"] },
  { number: "05", title: { en: "Delivery", "pt-BR": "Entrega" }, description: { en: "Containerized, tested, observable software with a pragmatic path from repository to production.", "pt-BR": "Software conteinerizado, testado e observável, com um caminho pragmático do repositório à produção." }, tools: ["Docker", "CI/CD", "Git", "Testing"] },
];

export const projects: Project[] = [
  { number: "01", slug: "dental-radar", title: "Dental Radar", eyebrow: { en: "Lead intelligence", "pt-BR": "Inteligência comercial" }, problem: { en: "Sales teams need a better way to identify dental clinics most likely to purchase and prioritize outreach.", "pt-BR": "Times de vendas precisam identificar clínicas odontológicas com maior probabilidade de compra e priorizar o contato." }, approach: { en: "A data pipeline and scoring workflow turn public business signals into a reviewable, prioritized prospect list.", "pt-BR": "Um pipeline de dados e um fluxo de pontuação transformam sinais públicos de negócio em uma lista priorizada e revisável de prospects." }, stack: ["Python", "FastAPI", "PostgreSQL", "Docker"], repository: "https://github.com/fsoaz/dental-radar", image: "/home/projects/dental-radar.svg", alt: { en: "Abstract radar interface mapping dental clinic prospects", "pt-BR": "Interface abstrata de radar mapeando prospects de clínicas odontológicas" } },
  { number: "02", slug: "wiki", title: "WikiAI", eyebrow: { en: "Evidence-first knowledge", "pt-BR": "Conhecimento baseado em evidências" }, problem: { en: "AI-assisted publishing needs transparent sources and human review to earn trust.", "pt-BR": "Publicação assistida por IA precisa de fontes transparentes e revisão humana para conquistar confiança." }, approach: { en: "An encyclopedia MVP combines AI-assisted drafting with evidence, citations, and distinct contributor, reviewer, and admin workflows.", "pt-BR": "Um MVP de enciclopédia combina escrita assistida por IA com evidências, citações e fluxos distintos para colaboradores, revisores e administradores." }, stack: ["FastAPI", "Next.js", "PostgreSQL", "TypeScript"], repository: "https://github.com/fsoaz/wiki", image: "/home/projects/wiki.svg", alt: { en: "Layered knowledge cards connected to an evidence graph", "pt-BR": "Cartões de conhecimento conectados a um grafo de evidências" } },
  { number: "03", slug: "financial-market-dashboard", title: "Financial Market Dashboard", eyebrow: { en: "Market data", "pt-BR": "Dados de mercado" }, problem: { en: "Financial data from multiple sources is difficult to compare when signals live in disconnected views.", "pt-BR": "Dados financeiros de múltiplas fontes são difíceis de comparar quando os sinais vivem em visões desconectadas." }, approach: { en: "A production-minded dashboard retrieves, analyzes, and visualizes market data in one coherent analytical workspace.", "pt-BR": "Um dashboard voltado à produção recupera, analisa e visualiza dados de mercado em um espaço analítico coerente." }, stack: ["Python", "Streamlit", "Pandas", "Docker"], repository: "https://github.com/fsoaz/financial-market-dashboard", image: "/home/projects/market.svg", alt: { en: "Dark financial dashboard with gold market charts", "pt-BR": "Dashboard financeiro escuro com gráficos dourados de mercado" } },
  { number: "04", slug: "trial-reminder", title: "Trial Reminder", eyebrow: { en: "Android utility", "pt-BR": "Utilitário Android" }, problem: { en: "Free trials are easy to forget, turning small subscriptions into surprise charges.", "pt-BR": "Testes gratuitos são fáceis de esquecer e pequenas assinaturas viram cobranças inesperadas." }, approach: { en: "A private, local-first Android app tracks trial periods and schedules timely reminders without unnecessary complexity.", "pt-BR": "Um app Android privado e local-first acompanha períodos de teste e agenda lembretes no momento certo, sem complexidade desnecessária." }, stack: ["Kotlin", "Android", "Room", "AlarmManager"], repository: "https://github.com/fsoaz/TrialReminderApp", image: "/home/projects/trial.svg", alt: { en: "Mobile trial tracker with a reminder timeline", "pt-BR": "Rastreador mobile de testes com uma linha do tempo de lembretes" } },
];

export const copy = {
  en: {
    nav: ["About", "Expertise", "Work", "Contact"],
    available: "Available for selected projects",
    role: "Backend & AI Engineer",
    hero: "I build dependable systems where backend engineering, applied AI, and thoughtful interfaces meet.",
    email: "Start a conversation", github: "Explore GitHub", scroll: "Scroll to explore",
    aboutLabel: "About", aboutTitle: "Engineering for clarity, not spectacle.",
    aboutBody: "I’m Francisco Micael, an engineer in Brazil focused on turning complex problems into useful, maintainable software. My work moves from data and backend architecture to the interface—always grounded in evidence, explicit tradeoffs, and the people who use the result.",
    principles: ["Useful before impressive", "Evidence over assumptions", "Simple systems that endure"],
    expertiseLabel: "Expertise", expertiseTitle: "Across the full path from idea to working product.",
    workLabel: "Selected work", workTitle: "Systems built around real problems.", problem: "Problem", approach: "Approach", source: "View repository",
    contactLabel: "Contact", contactTitle: "Have a hard problem worth solving?", contactBody: "I’m open to backend, AI, and product engineering opportunities. Tell me what you’re building and where it gets difficult.", location: "Brazil · Available remotely", sayHello: "Say hello",
    menuOpen: "Open menu", menuClose: "Close menu", language: "Mudar para português", skip: "Skip to content",
  },
  "pt-BR": {
    nav: ["Sobre", "Expertise", "Projetos", "Contato"],
    available: "Disponível para projetos selecionados",
    role: "Engenheiro Backend & IA",
    hero: "Construo sistemas confiáveis onde engenharia backend, IA aplicada e interfaces bem pensadas se encontram.",
    email: "Iniciar conversa", github: "Explorar GitHub", scroll: "Role para explorar",
    aboutLabel: "Sobre", aboutTitle: "Engenharia para clareza, não espetáculo.",
    aboutBody: "Sou Francisco Micael, engenheiro no Brasil focado em transformar problemas complexos em software útil e sustentável. Meu trabalho vai dos dados e da arquitetura backend à interface—sempre guiado por evidências, trade-offs explícitos e pelas pessoas que usam o resultado.",
    principles: ["Útil antes de impressionante", "Evidências acima de suposições", "Sistemas simples que perduram"],
    expertiseLabel: "Expertise", expertiseTitle: "Por todo o caminho, da ideia ao produto funcionando.",
    workLabel: "Projetos selecionados", workTitle: "Sistemas construídos em torno de problemas reais.", problem: "Problema", approach: "Abordagem", source: "Ver repositório",
    contactLabel: "Contato", contactTitle: "Tem um problema difícil que vale resolver?", contactBody: "Estou aberto a oportunidades em backend, IA e engenharia de produto. Conte o que você está construindo e onde está a dificuldade.", location: "Brasil · Disponível remotamente", sayHello: "Diga olá",
    menuOpen: "Abrir menu", menuClose: "Fechar menu", language: "Switch to English", skip: "Pular para o conteúdo",
  },
} as const;

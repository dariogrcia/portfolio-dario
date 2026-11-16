export const ui = {
  en: {
    pageTitle: 'Darío García Aguilera — Software Engineer',
    pageDescription:
      'I build reliable software for real businesses — from enterprise insurance platforms to AI assistants for local companies.',
    skipToContent: 'Skip to content',
    languageNavigation: 'Language',
    switchLanguage: 'Español',
    mainNavigation: 'Main navigation',
    hero: 'Introduction',
    experience: 'Experience',
    projects: 'Projects',
    aiWorkflow: 'How I work with AI',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
    downloadCv: 'Download CV',
    contactAction: 'Get in touch',
    viewCase: 'View case study',
    technologyStack: 'Technology stack',
    languages: 'Spoken languages',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
  es: {
    pageTitle: 'Darío García Aguilera — Ingeniero de software',
    pageDescription:
      'Construyo software fiable para negocios reales: desde plataformas de seguros a escala empresarial hasta asistentes de IA para empresas locales.',
    skipToContent: 'Saltar al contenido',
    languageNavigation: 'Idioma',
    switchLanguage: 'English',
    mainNavigation: 'Navegación principal',
    hero: 'Presentación',
    experience: 'Experiencia',
    projects: 'Proyectos',
    aiWorkflow: 'Cómo trabajo con IA',
    skills: 'Habilidades',
    education: 'Formación',
    contact: 'Contacto',
    downloadCv: 'Descargar CV',
    contactAction: 'Contactar',
    viewCase: 'Ver caso de estudio',
    technologyStack: 'Tecnologías',
    languages: 'Idiomas',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
} as const satisfies Record<'en' | 'es', Record<string, string>>;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)['en'];

// Both languages must expose the same interface strings.
const translations: Record<Lang, Record<TranslationKey, string>> = ui;
export default translations;

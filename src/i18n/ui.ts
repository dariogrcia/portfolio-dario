export const ui = {
  en: {
    pageTitle: 'portfolio-dario',
    pageDescription:
      'I build reliable software for real businesses — from enterprise insurance platforms to AI assistants for local companies.',
    skipToContent: 'Skip to content',
    languageNavigation: 'Language',
    switchLanguage: 'Español',
  },
  es: {
    pageTitle: 'portfolio-dario',
    pageDescription:
      'Construyo software fiable para negocios reales: desde plataformas de seguros a escala empresarial hasta asistentes de IA para empresas locales.',
    skipToContent: 'Saltar al contenido',
    languageNavigation: 'Idioma',
    switchLanguage: 'English',
  },
} as const satisfies Record<'en' | 'es', Record<string, string>>;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)['en'];

// Both languages must expose the same interface strings.
const translations: Record<Lang, Record<TranslationKey, string>> = ui;
export default translations;

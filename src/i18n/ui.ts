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
    role: 'My role',
    problem: 'Problem',
    solution: 'Solution',
    highlights: 'Highlights',
    visitWebsite: 'Visit website',
    privateRepository: 'Private repository',
    screenshots: 'Screenshots',
    desktop: 'Desktop view',
    mobile: 'Mobile view',
    architecture: 'Architecture',
    backToProjects: 'Back to projects',
    notFoundTitle: 'Page not found',
    notFoundBody: 'This address does not exist or has moved.',
    backHome: 'Go to the home page',
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
    role: 'Mi rol',
    problem: 'Problema',
    solution: 'Solución',
    highlights: 'Aspectos destacados',
    visitWebsite: 'Visitar web',
    privateRepository: 'Repositorio privado',
    screenshots: 'Capturas',
    desktop: 'Vista de escritorio',
    mobile: 'Vista móvil',
    architecture: 'Arquitectura',
    backToProjects: 'Volver a proyectos',
    notFoundTitle: 'Página no encontrada',
    notFoundBody: 'Esta dirección no existe o ha cambiado.',
    backHome: 'Ir a la portada',
    technologyStack: 'Tecnologías',
    languages: 'Idiomas',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  },
} as const satisfies Record<'en' | 'es', Record<string, string>>;

export type Lang = keyof typeof ui;
export type TranslationKey = keyof (typeof ui)['en'];

// Labels only describe the flows approved in docs/contenido.md.
// Descriptions reproduce the approved solution, including its planning status.
export const projectDiagrams = {
  en: {
    ipso: {
      title: 'IPSO — Architecture (in development)',
      description:
        'A no-install web app opens from a QR, holds a voice conversation, runs admin actions on the machine (unlock door, retry cycle) through the IPSO Connect integration, logs every incident and emails the owner, who reviews details and transcripts in a dashboard.',
      nodes: [
        ['Customer', 'QR on the machine'],
        ['Web app', 'Voice conversation'],
        ['IPSO Connect', 'Unlock door / retry cycle'],
        ['Incident log', 'Details and transcripts'],
        ['Owner', 'Email and dashboard'],
      ],
    },
    nenufar: {
      title: 'Nenúfar — Planned architecture',
      description:
        'Planned: an assistant on the WhatsApp Business API that books into Google Calendar, recognises new and returning customers, lets two admins step in, and sends promotions only to customers who opted in, in line with GDPR and Meta template rules.',
      nodes: [
        ['Customers', 'New and returning'],
        ['WhatsApp assistant', 'WhatsApp Business API'],
        ['Appointments', 'Google Calendar API'],
        ['Two administrators', 'Human intervention'],
        ['Promotions', 'Opt-in customers only'],
      ],
    },
  },
  es: {
    ipso: {
      title: 'IPSO — Arquitectura (en desarrollo)',
      description:
        'Una web sin instalación se abre desde un QR, mantiene una conversación por voz, ejecuta acciones de administrador sobre la máquina (desbloquear puerta, reintentar ciclo) mediante la integración con IPSO Connect, audita cada incidencia y avisa al dueño por email, que la revisa con su transcripción en un panel.',
      nodes: [
        ['Cliente', 'QR en la máquina'],
        ['Aplicación web', 'Conversación por voz'],
        ['IPSO Connect', 'Desbloquear / reintentar ciclo'],
        ['Registro de incidencias', 'Detalles y transcripciones'],
        ['Dueño', 'Email y panel'],
      ],
    },
    nenufar: {
      title: 'Nenúfar — Arquitectura prevista',
      description:
        'Previsto: un asistente sobre la API de WhatsApp Business que agenda en Google Calendar, distingue clientes nuevos y habituales, permite intervenir a dos administradores y envía promociones solo a quien lo ha aceptado, cumpliendo el RGPD y las normas de plantillas de Meta.',
      nodes: [
        ['Clientes', 'Nuevos y habituales'],
        ['Asistente de WhatsApp', 'API de WhatsApp Business'],
        ['Citas', 'API de Google Calendar'],
        ['Dos administradores', 'Intervención humana'],
        ['Promociones', 'Solo con consentimiento'],
      ],
    },
  },
} as const;

// Both languages must expose the same interface strings.
const translations: Record<Lang, Record<TranslationKey, string>> = ui;
export default translations;

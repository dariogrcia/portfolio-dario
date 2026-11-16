import type {
  Education,
  Experience,
  Localized,
  Profile,
  Project,
  SkillGroup,
} from './types';

// Copy approved text from docs/contenido.md without translating or rewriting it.
// Missing bilingual project fields are omitted under decision D11.

export const profile: Profile = {
  name: 'Darío Jesús García Aguilera',
  title: {
    en: 'Software Engineer',
    es: 'Ingeniero de software',
  },
  location: {
    en: 'Antequera (Málaga), Spain · Open to remote or hybrid in Málaga',
    es: 'Antequera (Málaga) · Abierto a remoto o híbrido en Málaga',
  },
  email: 'dariojesusgarcia6@gmail.com',
  linkedin: 'https://www.linkedin.com/in/darío-garcía-aguilera-ba5078275',
  github: 'https://github.com/dariogrcia',
  headline: {
    en: 'I build reliable software for real businesses — from enterprise insurance platforms to AI assistants for local companies.',
    es: 'Construyo software fiable para negocios reales: desde plataformas de seguros a escala empresarial hasta asistentes de IA para empresas locales.',
  },
  summary: {
    en: 'Software engineer combining enterprise configuration, full-stack web development and AI-driven workflows. At Solera I configure business rules in Qapter for international insurers, test them manually and with Playwright, and work in English every day with Australian teams. Outside work I run Vertex Studio, where I ship websites and AI automations for local businesses end to end.',
    es: 'Ingeniero de software que combina configuración empresarial, desarrollo web full-stack y flujos de trabajo con IA. En Solera configuro reglas de negocio en Qapter para aseguradoras internacionales, las pruebo a mano y con Playwright, y trabajo en inglés a diario con equipos australianos. Fuera del trabajo llevo Vertex Studio, donde entrego de principio a fin webs y automatizaciones con IA para negocios locales.',
  },
  languages: [
    {
      en: 'Spanish: native',
      es: 'Español: nativo',
    },
    {
      en: 'English: full professional proficiency (Cambridge B2), used daily with Australian clients',
      es: 'Inglés: profesional completo (Cambridge B2), uso diario con clientes australianos',
    },
  ],
};

export const experience: Experience[] = [
  {
    company: 'Solera Holdings',
    title: 'Configurator Engineer',
    dates: {
      en: 'Sep 2025 – Present',
      es: 'Sep 2025 – actualidad',
    },
    location: {
      en: 'Seville, Spain · Professional Services',
      es: 'Sevilla',
    },
    stack: ['Qapter', 'XML', 'JavaScript', 'Java', 'Playwright'],
    description: {
      en: [
        "Configure business rules and process logic in Qapter, Solera's estimating platform, using XML, JavaScript and Java.",
        'Contribute to client implementations for insurers such as QBE, Suncorp and Hollard, turning functional requirements into production-ready configurations.',
        'Daily English communication with Australian clients and teams: technical meetings, requirement clarification and follow-ups.',
        'Manual and automated QA with Playwright, writing end-to-end tests that validate configurations before production.',
      ],
      es: [
        'Configuro reglas de negocio y lógica de procesos en Qapter, la plataforma de peritación de Solera, con XML, JavaScript y Java.',
        'Participo en implantaciones para aseguradoras como QBE, Suncorp y Hollard, convirtiendo requisitos funcionales en configuraciones listas para producción.',
        'Comunicación diaria en inglés con clientes y equipos australianos: reuniones técnicas, aclaración de requisitos y seguimiento.',
        'QA manual y automatizado con Playwright: tests end-to-end que validan las configuraciones antes de producción.',
      ],
    },
  },
  {
    company: 'GMV',
    title: 'Full-Stack Developer (Robotics)',
    dates: {
      en: 'Oct 2024 – Jun 2025',
      es: 'Oct 2024 – Jun 2025',
    },
    location: {
      en: 'Seville, Spain',
      es: 'Sevilla',
    },
    stack: [
      'Drupal 10',
      'PHP',
      'JavaScript',
      'Twig',
      'AJAX',
      'Leaflet',
      'REST APIs',
      'Docker',
      'YAML',
    ],
    description: {
      en: [
        'Built frontend and backend features for uPathWay, a Drupal 10 platform for planning and managing robotic missions with real-time data from deployed robots.',
        'Developed custom Drupal 10 modules in PHP and JavaScript for asynchronous data flows and dynamic UI.',
        'Integrated Leaflet maps for real-time robot tracking, with responsive Twig components updated via AJAX.',
        'System-to-system communication through REST APIs; environments with YAML and Docker; Git-based teamwork.',
      ],
      es: [
        'Desarrollé funcionalidades de frontend y backend para uPathWay, una plataforma Drupal 10 para planificar y gestionar misiones robóticas con datos en tiempo real de robots desplegados.',
        'Módulos a medida de Drupal 10 en PHP y JavaScript para flujos de datos asíncronos e interfaz dinámica.',
        'Mapas Leaflet para seguir a los robots en tiempo real, con componentes Twig responsivos actualizados por AJAX.',
        'Comunicación entre sistemas mediante APIs REST; entornos con YAML y Docker; trabajo en equipo con Git.',
      ],
    },
  },
  {
    company: 'Vertex Studio',
    title: 'Freelance Web & AI Automation',
    dates: {
      en: 'Ongoing, part-time',
      es: 'En curso, a tiempo parcial',
    },
    description: {
      en: [
        'Independent studio where I build websites, CRM tools and AI automations for local businesses, from requirements and design to launch and technical SEO.',
      ],
      es: [
        'Estudio propio donde hago webs, herramientas CRM y automatizaciones con IA para negocios locales, desde los requisitos y el diseño hasta el lanzamiento y el SEO técnico.',
      ],
    },
    url: 'https://vertexstudiolab.es',
  },
];

export const projects: Project[] = [
  {
    slug: 'ipso',
    name: 'IPSO',
    status: {
      en: 'In development',
      es: 'En desarrollo',
    },
    summary: {
      en: 'Voice AI assistant for self-service laundromats: customers scan a QR on the machine, explain the problem out loud and the agent fixes it or escalates.',
      es: 'Asistente de voz con IA para lavanderías de autoservicio: el cliente escanea un QR en la máquina, cuenta el problema hablando y el agente lo resuelve o lo escala.',
    },
    problem: {
      en: 'When a machine fails there is nobody on site; customers lose money and owners find out late.',
      es: 'Cuando una máquina falla no hay nadie en el local; el cliente pierde dinero y el dueño se entera tarde.',
    },
    solution: {
      en: 'A no-install web app opens from a QR, holds a voice conversation, runs admin actions on the machine (unlock door, retry cycle) through the IPSO Connect integration, logs every incident and emails the owner, who reviews details and transcripts in a dashboard.',
      es: 'Una web sin instalación se abre desde un QR, mantiene una conversación por voz, ejecuta acciones de administrador sobre la máquina (desbloquear puerta, reintentar ciclo) mediante la integración con IPSO Connect, audita cada incidencia y avisa al dueño por email, que la revisa con su transcripción en un panel.',
    },
    highlights: {
      en: [
        'Multi-tenant data model with row-level security',
        'Machine simulator for safe end-to-end testing',
        'Built with a planned, test-gated Claude Code + Codex workflow',
      ],
      es: [
        'Modelo de datos multi-cliente con seguridad a nivel de fila',
        'Simulador de máquinas para probar de punta a punta sin riesgo',
        'Desarrollado con un flujo planificado Claude Code + Codex donde los tests deciden',
      ],
    },
    stack: [
      'Next.js',
      'TypeScript',
      'Supabase (Postgres + RLS)',
      'Vercel',
      'Vitest',
    ],
    repo: 'private',
    media: 'diagram',
  },
  {
    slug: 'vertex-studio',
    name: 'Vertex Studio',
    status: {
      en: 'Live',
      es: 'En producción',
    },
    summary: {
      en: 'Website for my own studio: subscription-based websites with maintenance included, plus a quote questionnaire.',
      es: 'Web de mi estudio: webs por cuota mensual con mantenimiento incluido y un cuestionario de presupuesto.',
    },
    highlights: {
      en: [
        'Static Astro site with a serverless function for the quote form (email via Resend)',
        'Pre-deploy checks that block publishing without legal data or green tests',
        'Separate non-indexed preview environment',
      ],
      es: [
        'Astro estático con una función serverless para el cuestionario (email con Resend)',
        'Comprobaciones previas que impiden publicar sin datos legales o con tests en rojo',
        'Entorno de vista previa aparte y sin indexar',
      ],
    },
    stack: [
      'Astro',
      'Cloudflare Pages + Pages Functions',
      'Resend',
      'node:test',
    ],
    url: 'https://vertexstudiolab.es',
    media: 'screenshots',
  },
  {
    slug: 'dracontreras',
    name: 'Portfolio de la Dra. Isabel Contreras (psiquiatra)',
    status: {
      en: 'Live',
      es: 'En producción',
    },
    summary: {
      en: 'Professional portfolio for a psychiatrist: services, a detailed academic CV and contact.',
      es: 'Portfolio profesional para una psiquiatra: servicios, un CV académico detallado y contacto.',
    },
    highlights: {
      en: [
        'Strict Content Security Policy enforced by a CI check',
        'All copy sourced from one content file, with tests that forbid publishing private data',
        'Domain migrated to Cloudflare without breaking existing email',
      ],
      es: [
        'Política de seguridad de contenido estricta vigilada por un check',
        'Todo el texto sale de un único archivo, con tests que impiden publicar datos privados',
        'Dominio migrado a Cloudflare sin romper el correo existente',
      ],
    },
    stack: [
      'Astro 5',
      'TypeScript estricto',
      'Tailwind CSS v4',
      'Vitest',
      'Cloudflare Pages',
    ],
    url: 'https://dracontreras.es',
    media: 'screenshots',
  },
  {
    slug: 'jm-asesores',
    name: 'JM Asesores',
    status: {
      en: 'Live',
      es: 'En producción',
    },
    summary: {
      en: 'Corporate website for a tax, accounting and labour advisory firm, with service pages and a blog.',
      es: 'Web corporativa de una asesoría fiscal, contable y laboral, con páginas de servicios y blog.',
    },
    highlights: {
      en: [
        'Blog with articles on tax and accounting',
        'Local technical SEO work and indexing fixes',
      ],
      es: [
        'Blog con artículos de fiscalidad y contabilidad',
        'Trabajo de SEO técnico local y corrección de indexación',
      ],
    },
    stack: [
      'TanStack Start',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Cloudflare Workers',
    ],
    url: 'https://jmasesoresantequera.es',
    media: 'screenshots',
  },
  {
    slug: 'clinica-psiquiatria',
    name: 'Clínica de psiquiatría',
    status: {
      en: 'Template',
      es: 'Plantilla',
    },
    summary: {
      en: 'Reusable website template for psychiatry and mental-health clinics, ready to adapt to a new client.',
      es: 'Plantilla web reutilizable para clínicas de psiquiatría y salud mental, lista para adaptar a un nuevo cliente.',
    },
    highlights: {
      en: [
        'Generic, client-agnostic content and branding',
        'Designed to be customised quickly for real clinics',
      ],
      es: [
        'Contenido e imagen genéricos, sin cliente concreto',
        'Pensada para adaptarse rápido a clínicas reales',
      ],
    },
    stack: [
      'React',
      'TypeScript',
      'TanStack Router',
      'Tailwind CSS',
      'shadcn/ui',
      'Cloudflare Workers',
    ],
    url: 'https://dariogrcia-peace-space-site.dariojesusgarcia6.workers.dev',
    media: 'screenshots',
  },
  {
    slug: 'nenufar',
    name: 'Asistente de WhatsApp para un centro de estética',
    status: {
      en: 'In planning',
      es: 'En planificación',
    },
    summary: {
      en: 'WhatsApp assistant that books appointments into Google Calendar, serves new and existing customers and sends promotions to opt-in lists.',
      es: 'Asistente de WhatsApp que agenda citas en Google Calendar, atiende a clientes nuevos y habituales y envía promociones a listas de difusión.',
    },
    stack: ['WhatsApp Business API', 'Google Calendar API'],
    repo: 'private',
    media: 'diagram',
  },
  {
    slug: 'upathway',
    name: 'uPathWay',
    status: {
      en: 'Company project',
      es: 'Proyecto de empresa',
    },
    summary: {
      en: 'Drupal 10 platform for planning and managing robotic missions with real-time data. My contribution as a full-stack developer at GMV (no code or screenshots shown: proprietary).',
      es: 'Plataforma Drupal 10 para planificar y gestionar misiones robóticas con datos en tiempo real. Mi aportación como desarrollador full-stack en GMV (sin código ni capturas: es propiedad de la empresa).',
    },
    stack: [
      'Drupal 10',
      'PHP',
      'JavaScript',
      'Twig',
      'AJAX',
      'Leaflet',
      'REST',
      'Docker',
    ],
    media: 'none',
  },
];

export const skills: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'PHP', 'XML', 'HTML', 'CSS'],
  },
  {
    name: 'Frameworks & web',
    items: [
      'React',
      'Astro',
      'Next.js',
      'Drupal 10',
      'Twig',
      'Tailwind CSS',
      'REST APIs',
    ],
  },
  {
    name: 'Tools & platforms',
    items: [
      'Qapter',
      'Git',
      'Docker',
      'Cloudflare',
      'Supabase',
      'Vercel',
      'technical SEO',
    ],
  },
  {
    name: 'Testing & QA',
    items: ['Playwright', 'Vitest', 'automated and manual testing'],
  },
  {
    name: 'AI',
    items: [
      'Claude Code',
      'Codex',
      'prompt engineering',
      'AI-assisted development',
    ],
  },
];

export const education: Education[] = [
  {
    qualification: {
      en: 'B.Sc. Computer Engineering – Information Technologies',
      es: 'Grado en Ingeniería Informática – Tecnologías Informáticas',
    },
    institution: {
      en: 'University of Seville',
      es: 'Universidad de Sevilla',
    },
    dates: '2018–2026',
  },
];

export const aiWorkflow: Localized<string> = {
  en: 'I use Claude Code and Codex daily in a two-model workflow: I design and plan each change in a written plan with explicit decisions, delegate small, verifiable tasks, and review every diff against the plan. Tests, lint and build decide when something is done. Product and content decisions stay human-led.',
  es: 'Uso Claude Code y Codex a diario en un flujo de dos modelos: diseño y planifico cada cambio en un plan escrito con decisiones explícitas, delego tareas pequeñas y verificables y reviso cada diff contra el plan. Los tests, el lint y el build deciden cuándo algo está terminado. Las decisiones de producto y contenido las tomo yo.',
};

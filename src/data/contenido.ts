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
];

export const projects: Project[] = [
  {
    slug: 'ipso',
    name: 'IPSO Connect',
    status: { en: 'In development', es: 'En desarrollo' },
    summary: {
      en: 'Voice AI assistant for self-service laundromats: customers scan a QR on the machine, explain the problem out loud and the agent fixes it or escalates.',
      es: 'Asistente de voz con IA para lavanderías de autoservicio: el cliente escanea un QR en la máquina, cuenta el problema hablando y el agente lo resuelve o lo escala.',
    },
    role: {
      en: 'Product owner and lead developer: scope, architecture, data model and a 60+ task delivery plan; implementation delegated to Codex and reviewed by me against tests.',
      es: 'Responsable de producto y desarrollador principal: alcance, arquitectura, modelo de datos y un plan de más de 60 tareas; la implementación la delego en Codex y la reviso yo contra los tests.',
    },
    problem: {
      en: 'When a machine fails there is nobody on site; customers lose money and owners find out late.',
      es: 'Cuando una máquina falla no hay nadie en el local; el cliente pierde dinero y el dueño se entera tarde.',
    },
    solution: {
      en: 'A no-install web app opens from a QR, holds a voice conversation, runs admin actions on the machine (unlock door, retry cycle) through its integration with the machines, logs every incident and emails the owner, who reviews details and transcripts in a dashboard.',
      es: 'Una web sin instalación se abre desde un QR, mantiene una conversación por voz, ejecuta acciones de administrador sobre la máquina (desbloquear puerta, reintentar ciclo) mediante su integración con las máquinas, audita cada incidencia y avisa al dueño por email, que la revisa con su transcripción en un panel.',
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
    status: { en: 'Live', es: 'En producción' },
    summary: {
      en: 'Website for my own studio, which leads with AI automation (assistants that answer customers at any hour and book appointments on their own) and offers subscription websites as a complementary service, plus a quote questionnaire.',
      es: 'Web de mi estudio, que pone por delante la automatización con IA (asistentes que atienden a los clientes a cualquier hora y citas que se agendan solas) y ofrece las webs por cuota como servicio complementario, con un cuestionario de presupuesto.',
    },
    role: {
      en: 'Founder, designer and developer: business model, copy, design, build and deployment.',
      es: 'Fundador, diseñador y desarrollador: modelo de negocio, textos, diseño, desarrollo y despliegue.',
    },
    problem: {
      en: 'My studio needed a site that presents two offers without mixing them up (AI automation as the main service, websites as a complement) and turns visitors into qualified quote requests.',
      es: 'Mi estudio necesitaba una web que presentara dos ofertas sin mezclarlas (la automatización con IA como servicio principal y las webs como complemento) y convirtiera visitas en peticiones de presupuesto cualificadas.',
    },
    solution: {
      en: 'A fast static Astro site whose hero shows the product at work: a CSS-only chat in which the assistant books a customer late at night. AI plans come before web plans, and the quote questionnaire, which offers AI automation first, is handled by a Cloudflare Pages Function that emails each request through Resend. Publishing is guarded: the deploy script refuses to go live if legal data is missing or tests fail, and changes are checked first on a non-indexed preview.',
      es: 'Una web estática y rápida en Astro cuyo hero enseña el producto funcionando: un chat hecho solo con CSS en el que el asistente agenda una cita a un cliente de madrugada. Los planes de IA van antes que los de web, y el cuestionario de presupuesto, que ofrece primero la automatización, lo gestiona una Pages Function de Cloudflare que envía cada solicitud por email con Resend. La publicación está protegida: el script de despliegue se niega a publicar si faltan datos legales o fallan los tests, y los cambios se revisan antes en una vista previa sin indexar.',
    },
    highlights: {
      en: [
        'Repositioned from websites to AI automation, keeping “web design” in the SEO titles to protect existing rankings',
        'Animated chat mock-up built only with CSS, with a static version for reduced motion',
        'Pre-deploy checks that block publishing without legal data or green tests',
        'Separate non-indexed preview environment',
      ],
      es: [
        'Reposicionada de webs a automatización con IA, manteniendo «diseño web» en los títulos SEO para no perder lo posicionado',
        'Maqueta de chat animada solo con CSS, con versión estática para «reducir movimiento»',
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
    name: 'Dra. Isabel Contreras',
    status: { en: 'Live', es: 'En producción' },
    summary: {
      en: 'Professional portfolio for a psychiatrist: services, a detailed academic CV and contact.',
      es: 'Portfolio profesional para una psiquiatra: servicios, un CV académico detallado y contacto.',
    },
    role: {
      en: 'Sole developer: planning, design system, development, domain migration and deployment.',
      es: 'Desarrollador único: planificación, sistema de diseño, desarrollo, migración del dominio y despliegue.',
    },
    problem: {
      en: 'A psychiatrist with a long academic record (publications, conference papers, training) needed a professional site that presents it clearly and builds trust with patients, without exposing private data.',
      es: 'Una psiquiatra con una trayectoria académica extensa (publicaciones, comunicaciones en congresos, formación) necesitaba una web profesional que la presentara con claridad y diera confianza a los pacientes, sin exponer datos privados.',
    },
    solution: {
      en: 'A static Astro 5 site with typed content from a single source file, a design system built for readability, and a structured CV section. Tests compare the published data with the source and fail if a phone number or address would be published; a CI check keeps the Content Security Policy strict. Delivered in ten planned tasks with a Claude Code + Codex workflow.',
      es: 'Una web estática en Astro 5 con contenido tipado desde un único archivo, un sistema de diseño pensado para la lectura y un CV estructurado. Los tests comparan los datos publicados con la fuente y fallan si se fuera a publicar un teléfono o una dirección; un check mantiene estricta la política de seguridad de contenido. Entregada en diez tareas planificadas con el flujo Claude Code + Codex.',
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
    status: { en: 'Live', es: 'En producción' },
    summary: {
      en: 'Corporate website for a tax, accounting and labour advisory firm, with service pages and a blog.',
      es: 'Web corporativa de una asesoría fiscal, contable y laboral, con páginas de servicios y blog.',
    },
    role: {
      en: 'Developer and maintainer: took over a generated codebase, hardened it, handled SEO and moved hosting twice.',
      es: 'Desarrollador y mantenimiento: me hice cargo de un código generado, lo endurecí, me ocupé del SEO y migré el hosting dos veces.',
    },
    problem: {
      en: "The firm's site had been generated with an AI builder: most commits came from a bot, there was no documentation, HTTP and HTTPS both served the site, and Google was indexing it poorly.",
      es: 'La web de la asesoría se había generado con un constructor de IA: casi todos los commits venían de un bot, no había documentación, el sitio respondía tanto por HTTP como por HTTPS y Google lo indexaba mal.',
    },
    solution: {
      en: 'I brought the code under my own workflow, documented every decision in a project log, forced HTTPS with 301 redirects, added security headers (CSP with hashes, Referrer and Permissions policies) and ran a security audit with no findings. When court-ordered IP blocks on Cloudflare in Spain kept taking the site down on match days, I migrated hosting (first to Cloudflare Pages, then to Netlify) so they no longer affect it.',
      es: 'Pasé el código a mi propio flujo de trabajo, documenté cada decisión en una bitácora, forcé HTTPS con redirecciones 301, añadí cabeceras de seguridad (CSP con hashes, Referrer y Permissions Policy) y pasé una auditoría de seguridad sin hallazgos. Cuando los bloqueos de IPs de Cloudflare ordenados por LaLiga tumbaban la web en días de partido, migré el hosting (primero a Cloudflare Pages y después a Netlify) para que dejaran de afectarla.',
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
      'Netlify',
    ],
    url: 'https://jmasesoresantequera.es',
    media: 'screenshots',
  },
  {
    slug: 'clinica-psiquiatria',
    name: 'Clínica de psiquiatría',
    status: { en: 'Template', es: 'Plantilla' },
    summary: {
      en: 'Reusable website template for psychiatry and mental-health clinics, ready to adapt to a new client.',
      es: 'Plantilla web reutilizable para clínicas de psiquiatría y salud mental, lista para adaptar a un nuevo cliente.',
    },
    role: {
      en: 'Designer and developer of the template and its back office.',
      es: 'Diseñador y desarrollador de la plantilla y de su panel de gestión.',
    },
    problem: {
      en: 'Small mental-health clinics need more than a brochure site: online booking, a contact inbox and a blog they can update themselves, while handling patient data with care.',
      es: 'Las clínicas pequeñas de salud mental necesitan más que una web escaparate: reserva online, una bandeja de contactos y un blog que puedan actualizar ellas mismas, tratando con cuidado los datos de los pacientes.',
    },
    solution: {
      en: 'A reusable React + TanStack Router template with an admin panel on Supabase (Postgres, Auth, Storage): blog editor, contact inbox and appointment requests with status tracking. Booking requires explicit GDPR consent, and each request emails the owner through Resend; if the email fails, the request is still saved.',
      es: 'Una plantilla reutilizable en React + TanStack Router con panel de administración sobre Supabase (Postgres, Auth, Storage): editor del blog, bandeja de contactos y solicitudes de cita con seguimiento de estado. La reserva exige consentimiento RGPD explícito y cada solicitud avisa al dueño por email con Resend; si el email falla, la solicitud se guarda igualmente.',
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
      'Supabase',
      'Resend',
      'Cloudflare Workers',
    ],
    media: 'screenshots',
  },
  {
    slug: 'nenufar',
    name: 'Nenúfar',
    status: { en: 'In planning', es: 'En planificación' },
    summary: {
      en: 'WhatsApp assistant that books appointments into Google Calendar, serves new and existing customers and sends promotions to opt-in lists.',
      es: 'Asistente de WhatsApp que agenda citas en Google Calendar, atiende a clientes nuevos y habituales y envía promociones a listas de difusión.',
    },
    role: {
      en: 'Product and technical lead: scope, planning and architecture (in planning).',
      es: 'Responsable de producto y técnico: alcance, planificación y arquitectura (en planificación).',
    },
    problem: {
      en: 'A beauty centre handles bookings and customer questions by hand over WhatsApp, which takes staff time and makes promotions hard to manage.',
      es: 'Un centro de estética gestiona a mano las citas y las dudas de sus clientes por WhatsApp, lo que quita tiempo al equipo y complica las promociones.',
    },
    solution: {
      en: 'Planned: an assistant on the WhatsApp Business API that books into Google Calendar, recognises new and returning customers, lets two admins step in, and sends promotions only to customers who opted in, in line with GDPR and Meta template rules.',
      es: 'Previsto: un asistente sobre la API de WhatsApp Business que agenda en Google Calendar, distingue clientes nuevos y habituales, permite intervenir a dos administradores y envía promociones solo a quien lo ha aceptado, cumpliendo el RGPD y las normas de plantillas de Meta.',
    },
    stack: ['WhatsApp Business API', 'Google Calendar API'],
    repo: 'private',
    media: 'diagram',
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
      en: 'Computing Engineering – Information Technologies',
      es: 'Ingeniería Informática – Tecnologías Informáticas',
    },
    institution: {
      en: 'University of Seville',
      es: 'Universidad de Sevilla',
    },
    dates: '2018–2025',
  },
];

export const aiWorkflow: Localized<string> = {
  en: 'I use Claude Code and Codex daily in a two-model workflow: I design and plan each change in a written plan with explicit decisions, delegate small, verifiable tasks, and review every diff against the plan. Tests, lint and build decide when something is done. Product and content decisions stay human-led.',
  es: 'Uso Claude Code y Codex a diario en un flujo de dos modelos: diseño y planifico cada cambio en un plan escrito con decisiones explícitas, delego tareas pequeñas y verificables y reviso cada diff contra el plan. Los tests, el lint y el build deciden cuándo algo está terminado. Las decisiones de producto y contenido las tomo yo.',
};

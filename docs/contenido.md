# Contenido del portfolio — fuente de verdad

> Aprobado por Darío el 2026-11-16. Casos ampliados (rol, problema, solución) aprobados el mismo día.
> Regla: nunca teléfono ni dirección. Email y LinkedIn sí.

## Perfil

- Nombre: Darío Jesús García Aguilera
- Puesto EN: Software Engineer
- Puesto ES: Ingeniero de software
- Ubicación EN: Antequera (Málaga), Spain · Open to remote or hybrid in Málaga
- Ubicación ES: Antequera (Málaga) · Abierto a remoto o híbrido en Málaga
- Email: dariojesusgarcia6@gmail.com
- LinkedIn: https://www.linkedin.com/in/darío-garcía-aguilera-ba5078275
- GitHub: https://github.com/dariogrcia

### Titular
- EN: I build reliable software for real businesses — from enterprise insurance platforms to AI assistants for local companies.
- ES: Construyo software fiable para negocios reales: desde plataformas de seguros a escala empresarial hasta asistentes de IA para empresas locales.

### Resumen
- EN: Software engineer combining enterprise configuration, full-stack web development and AI-driven workflows. At Solera I configure business rules in Qapter for international insurers, test them manually and with Playwright, and work in English every day with Australian teams. Outside work I run Vertex Studio, where I ship websites and AI automations for local businesses end to end.
- ES: Ingeniero de software que combina configuración empresarial, desarrollo web full-stack y flujos de trabajo con IA. En Solera configuro reglas de negocio en Qapter para aseguradoras internacionales, las pruebo a mano y con Playwright, y trabajo en inglés a diario con equipos australianos. Fuera del trabajo llevo Vertex Studio, donde entrego de principio a fin webs y automatizaciones con IA para negocios locales.

## Experiencia

### Solera Holdings — Configurator Engineer
- Fechas: Sep 2025 – actualidad / Sep 2025 – Present
- Lugar: Sevilla / Seville, Spain · Professional Services
- Stack: Qapter, XML, JavaScript, Java, Playwright
- EN:
  - Configure business rules and process logic in Qapter, Solera's estimating platform, using XML, JavaScript and Java.
  - Contribute to client implementations for insurers such as QBE, Suncorp and Hollard, turning functional requirements into production-ready configurations.
  - Daily English communication with Australian clients and teams: technical meetings, requirement clarification and follow-ups.
  - Manual and automated QA with Playwright, writing end-to-end tests that validate configurations before production.
- ES:
  - Configuro reglas de negocio y lógica de procesos en Qapter, la plataforma de peritación de Solera, con XML, JavaScript y Java.
  - Participo en implantaciones para aseguradoras como QBE, Suncorp y Hollard, convirtiendo requisitos funcionales en configuraciones listas para producción.
  - Comunicación diaria en inglés con clientes y equipos australianos: reuniones técnicas, aclaración de requisitos y seguimiento.
  - QA manual y automatizado con Playwright: tests end-to-end que validan las configuraciones antes de producción.

### GMV — Full-Stack Developer (Robotics)
- Fechas: Oct 2024 – Jun 2025
- Lugar: Sevilla / Seville, Spain
- Stack: Drupal 10, PHP, JavaScript, Twig, AJAX, Leaflet, REST APIs, Docker, YAML
- EN:
  - Built frontend and backend features for uPathWay, a Drupal 10 platform for planning and managing robotic missions with real-time data from deployed robots.
  - Developed custom Drupal 10 modules in PHP and JavaScript for asynchronous data flows and dynamic UI.
  - Integrated Leaflet maps for real-time robot tracking, with responsive Twig components updated via AJAX.
  - System-to-system communication through REST APIs; environments with YAML and Docker; Git-based teamwork.
- ES:
  - Desarrollé funcionalidades de frontend y backend para uPathWay, una plataforma Drupal 10 para planificar y gestionar misiones robóticas con datos en tiempo real de robots desplegados.
  - Módulos a medida de Drupal 10 en PHP y JavaScript para flujos de datos asíncronos e interfaz dinámica.
  - Mapas Leaflet para seguir a los robots en tiempo real, con componentes Twig responsivos actualizados por AJAX.
  - Comunicación entre sistemas mediante APIs REST; entornos con YAML y Docker; trabajo en equipo con Git.

### Vertex Studio — Freelance Web & AI Automation
- Fechas: En curso, a tiempo parcial / Ongoing, part-time
- Web: https://vertexstudiolab.es
- EN: Independent studio where I build websites, CRM tools and AI automations for local businesses, from requirements and design to launch and technical SEO.
- ES: Estudio propio donde hago webs, herramientas CRM y automatizaciones con IA para negocios locales, desde los requisitos y el diseño hasta el lanzamiento y el SEO técnico.

## Proyectos (orden D4)

### ipso — IPSO · Asistente de voz con IA para lavanderías
- Estado: En desarrollo / In development
- Stack: Next.js, TypeScript, Supabase (Postgres + RLS), Vercel, Vitest
- Repo: privado
- Resumen EN: Voice AI assistant for self-service laundromats: customers scan a QR on the machine, explain the problem out loud and the agent fixes it or escalates.
- Resumen ES: Asistente de voz con IA para lavanderías de autoservicio: el cliente escanea un QR en la máquina, cuenta el problema hablando y el agente lo resuelve o lo escala.
- Rol EN: Product owner and lead developer: scope, architecture, data model and a 60+ task delivery plan; implementation delegated to Codex and reviewed by me against tests.
- Rol ES: Responsable de producto y desarrollador principal: alcance, arquitectura, modelo de datos y un plan de más de 60 tareas; la implementación la delego en Codex y la reviso yo contra los tests.
- Problema EN: When a machine fails there is nobody on site; customers lose money and owners find out late.
- Problema ES: Cuando una máquina falla no hay nadie en el local; el cliente pierde dinero y el dueño se entera tarde.
- Solución EN: A no-install web app opens from a QR, holds a voice conversation, runs admin actions on the machine (unlock door, retry cycle) through the IPSO Connect integration, logs every incident and emails the owner, who reviews details and transcripts in a dashboard.
- Solución ES: Una web sin instalación se abre desde un QR, mantiene una conversación por voz, ejecuta acciones de administrador sobre la máquina (desbloquear puerta, reintentar ciclo) mediante la integración con IPSO Connect, audita cada incidencia y avisa al dueño por email, que la revisa con su transcripción en un panel.
- Highlights EN: Multi-tenant data model with row-level security · Machine simulator for safe end-to-end testing · Built with a planned, test-gated Claude Code + Codex workflow
- Highlights ES: Modelo de datos multi-cliente con seguridad a nivel de fila · Simulador de máquinas para probar de punta a punta sin riesgo · Desarrollado con un flujo planificado Claude Code + Codex donde los tests deciden

### vertex-studio — Vertex Studio · Web del estudio
- Estado: En producción / Live
- URL: https://vertexstudiolab.es
- Stack: Astro, Cloudflare Pages + Pages Functions, Resend, node:test
- Resumen EN: Website for my own studio: subscription-based websites with maintenance included, plus a quote questionnaire.
- Resumen ES: Web de mi estudio: webs por cuota mensual con mantenimiento incluido y un cuestionario de presupuesto.
- Rol EN: Founder, designer and developer: business model, copy, design, build and deployment.
- Rol ES: Fundador, diseñador y desarrollador: modelo de negocio, textos, diseño, desarrollo y despliegue.
- Problema EN: My studio needed a site that explains a subscription model (website + maintenance for a monthly fee) clearly and turns visitors into qualified quote requests.
- Problema ES: Mi estudio necesitaba una web que explicara con claridad un modelo por cuota (web + mantenimiento al mes) y convirtiera visitas en peticiones de presupuesto cualificadas.
- Solución EN: A fast static Astro site with transparent plans and a quote questionnaire handled by a Cloudflare Pages Function that emails each request through Resend. Publishing is guarded: the deploy script refuses to go live if legal data is missing or tests fail, and changes are checked first on a non-indexed preview.
- Solución ES: Una web estática y rápida en Astro, con planes transparentes y un cuestionario de presupuesto gestionado por una Pages Function de Cloudflare que envía cada solicitud por email con Resend. La publicación está protegida: el script de despliegue se niega a publicar si faltan datos legales o fallan los tests, y los cambios se revisan antes en una vista previa sin indexar.
- Highlights EN: Static Astro site with a serverless function for the quote form (email via Resend) · Pre-deploy checks that block publishing without legal data or green tests · Separate non-indexed preview environment · Retired the previous version behind a 503 + Retry-After maintenance page, so search engines read it as a temporary outage and rollback was a single deploy
- Highlights ES: Astro estático con una función serverless para el cuestionario (email con Resend) · Comprobaciones previas que impiden publicar sin datos legales o con tests en rojo · Entorno de vista previa aparte y sin indexar · La versión anterior se retiró tras una página de mantenimiento 503 + Retry-After, para que Google lo leyera como caída temporal y volver atrás fuera un solo despliegue

### dracontreras — Dra. Isabel Contreras · Portfolio profesional
- Estado: En producción / Live
- URL: https://dracontreras.es
- Stack: Astro 5, TypeScript estricto, Tailwind CSS v4, Vitest, Cloudflare Pages
- Resumen EN: Professional portfolio for a psychiatrist: services, a detailed academic CV and contact.
- Resumen ES: Portfolio profesional para una psiquiatra: servicios, un CV académico detallado y contacto.
- Rol EN: Sole developer: planning, design system, development, domain migration and deployment.
- Rol ES: Desarrollador único: planificación, sistema de diseño, desarrollo, migración del dominio y despliegue.
- Problema EN: A psychiatrist with a long academic record (publications, conference papers, training) needed a professional site that presents it clearly and builds trust with patients, without exposing private data.
- Problema ES: Una psiquiatra con una trayectoria académica extensa (publicaciones, comunicaciones en congresos, formación) necesitaba una web profesional que la presentara con claridad y diera confianza a los pacientes, sin exponer datos privados.
- Solución EN: A static Astro 5 site with typed content from a single source file, a design system built for readability, and a structured CV section. Tests compare the published data with the source and fail if a phone number or address would be published; a CI check keeps the Content Security Policy strict. Delivered in ten planned tasks with a Claude Code + Codex workflow.
- Solución ES: Una web estática en Astro 5 con contenido tipado desde un único archivo, un sistema de diseño pensado para la lectura y un CV estructurado. Los tests comparan los datos publicados con la fuente y fallan si se fuera a publicar un teléfono o una dirección; un check mantiene estricta la política de seguridad de contenido. Entregada en diez tareas planificadas con el flujo Claude Code + Codex.
- Highlights EN: Strict Content Security Policy enforced by a CI check · All copy sourced from one content file, with tests that forbid publishing private data · Domain migrated to Cloudflare without breaking existing email
- Highlights ES: Política de seguridad de contenido estricta vigilada por un check · Todo el texto sale de un único archivo, con tests que impiden publicar datos privados · Dominio migrado a Cloudflare sin romper el correo existente

### jm-asesores — JM Asesores · Asesoría en Antequera
- Estado: En producción / Live
- URL: https://jmasesoresantequera.es
- Stack: TanStack Start, React 19, TypeScript, Tailwind CSS, Netlify
- Resumen EN: Corporate website for a tax, accounting and labour advisory firm, with service pages and a blog.
- Resumen ES: Web corporativa de una asesoría fiscal, contable y laboral, con páginas de servicios y blog.
- Rol EN: Developer and maintainer: took over a generated codebase, hardened it, handled SEO and moved hosting twice.
- Rol ES: Desarrollador y mantenimiento: me hice cargo de un código generado, lo endurecí, me ocupé del SEO y migré el hosting dos veces.
- Problema EN: The firm's site had been generated with an AI builder: most commits came from a bot, there was no documentation, HTTP and HTTPS both served the site, and Google was indexing it poorly.
- Problema ES: La web de la asesoría se había generado con un constructor de IA: casi todos los commits venían de un bot, no había documentación, el sitio respondía tanto por HTTP como por HTTPS y Google lo indexaba mal.
- Solución EN: I brought the code under my own workflow, documented every decision in a project log, forced HTTPS with 301 redirects, added security headers (CSP with hashes, Referrer and Permissions policies) and ran a security audit with no findings. When court-ordered IP blocks on Cloudflare in Spain kept taking the site down on match days, I migrated hosting (first to Cloudflare Pages, then to Netlify) so they no longer affect it.
- Solución ES: Pasé el código a mi propio flujo de trabajo, documenté cada decisión en una bitácora, forcé HTTPS con redirecciones 301, añadí cabeceras de seguridad (CSP con hashes, Referrer y Permissions Policy) y pasé una auditoría de seguridad sin hallazgos. Cuando los bloqueos de IPs de Cloudflare ordenados por LaLiga tumbaban la web en días de partido, migré el hosting (primero a Cloudflare Pages y después a Netlify) para que dejaran de afectarla.
- Highlights EN: Blog with articles on tax and accounting · Local technical SEO work and indexing fixes
- Highlights ES: Blog con artículos de fiscalidad y contabilidad · Trabajo de SEO técnico local y corrección de indexación

### clinica-psiquiatria — Clínica de psiquiatría · Plantilla
- Estado: Plantilla / Template
- URL: https://dariogrcia-peace-space-site.dariojesusgarcia6.workers.dev
- Stack: React, TypeScript, TanStack Router, Tailwind CSS, shadcn/ui, Supabase, Resend, Cloudflare Workers
- Resumen EN: Reusable website template for psychiatry and mental-health clinics, ready to adapt to a new client.
- Resumen ES: Plantilla web reutilizable para clínicas de psiquiatría y salud mental, lista para adaptar a un nuevo cliente.
- Rol EN: Designer and developer of the template and its back office.
- Rol ES: Diseñador y desarrollador de la plantilla y de su panel de gestión.
- Problema EN: Small mental-health clinics need more than a brochure site: online booking, a contact inbox and a blog they can update themselves, while handling patient data with care.
- Problema ES: Las clínicas pequeñas de salud mental necesitan más que una web escaparate: reserva online, una bandeja de contactos y un blog que puedan actualizar ellas mismas, tratando con cuidado los datos de los pacientes.
- Solución EN: A reusable React + TanStack Router template with an admin panel on Supabase (Postgres, Auth, Storage): blog editor, contact inbox and appointment requests with status tracking. Booking requires explicit GDPR consent, and each request emails the owner through Resend; if the email fails, the request is still saved.
- Solución ES: Una plantilla reutilizable en React + TanStack Router con panel de administración sobre Supabase (Postgres, Auth, Storage): editor del blog, bandeja de contactos y solicitudes de cita con seguimiento de estado. La reserva exige consentimiento RGPD explícito y cada solicitud avisa al dueño por email con Resend; si el email falla, la solicitud se guarda igualmente.
- Highlights EN: Generic, client-agnostic content and branding · Designed to be customised quickly for real clinics
- Highlights ES: Contenido e imagen genéricos, sin cliente concreto · Pensada para adaptarse rápido a clínicas reales

### nenufar — Nenúfar · Asistente de WhatsApp para un centro de estética
- Estado: En planificación / In planning
- Stack: WhatsApp Business API, Google Calendar API
- Repo: privado
- Resumen EN: WhatsApp assistant that books appointments into Google Calendar, serves new and existing customers and sends promotions to opt-in lists.
- Resumen ES: Asistente de WhatsApp que agenda citas en Google Calendar, atiende a clientes nuevos y habituales y envía promociones a listas de difusión.
- Rol EN: Product and technical lead: scope, planning and architecture (in planning).
- Rol ES: Responsable de producto y técnico: alcance, planificación y arquitectura (en planificación).
- Problema EN: A beauty centre handles bookings and customer questions by hand over WhatsApp, which takes staff time and makes promotions hard to manage.
- Problema ES: Un centro de estética gestiona a mano las citas y las dudas de sus clientes por WhatsApp, lo que quita tiempo al equipo y complica las promociones.
- Solución EN: Planned: an assistant on the WhatsApp Business API that books into Google Calendar, recognises new and returning customers, lets two admins step in, and sends promotions only to customers who opted in, in line with GDPR and Meta template rules.
- Solución ES: Previsto: un asistente sobre la API de WhatsApp Business que agenda en Google Calendar, distingue clientes nuevos y habituales, permite intervenir a dos administradores y envía promociones solo a quien lo ha aceptado, cumpliendo el RGPD y las normas de plantillas de Meta.

### upathway — uPathWay · GMV (proyecto de empresa)
- Estado: Proyecto de empresa / Company project
- Stack: Drupal 10, PHP, JavaScript, Twig, AJAX, Leaflet, REST, Docker
- Resumen EN: Drupal 10 platform for planning and managing robotic missions with real-time data. My contribution as a full-stack developer at GMV (no code or screenshots shown: proprietary).
- Resumen ES: Plataforma Drupal 10 para planificar y gestionar misiones robóticas con datos en tiempo real. Mi aportación como desarrollador full-stack en GMV (sin código ni capturas: es propiedad de la empresa).
- Rol EN: Full-stack developer in the robotics department team.
- Rol ES: Desarrollador full-stack en el equipo del departamento de robótica.

## Cómo trabajo con IA
- EN: I use Claude Code and Codex daily in a two-model workflow: I design and plan each change in a written plan with explicit decisions, delegate small, verifiable tasks, and review every diff against the plan. Tests, lint and build decide when something is done. Product and content decisions stay human-led.
- ES: Uso Claude Code y Codex a diario en un flujo de dos modelos: diseño y planifico cada cambio en un plan escrito con decisiones explícitas, delego tareas pequeñas y verificables y reviso cada diff contra el plan. Los tests, el lint y el build deciden cuándo algo está terminado. Las decisiones de producto y contenido las tomo yo.

## Skills
- Languages: Java, JavaScript, TypeScript, PHP, XML, HTML, CSS
- Frameworks & web: React, Astro, Next.js, Drupal 10, Twig, Tailwind CSS, REST APIs
- Tools & platforms: Qapter, Git, Docker, Cloudflare, Supabase, Vercel, technical SEO
- Testing & QA: Playwright, Vitest, automated and manual testing
- AI: Claude Code, Codex, prompt engineering, AI-assisted development

## Formación e idiomas
- Grado en Ingeniería Informática – Tecnologías Informáticas, Universidad de Sevilla, 2018–2026 / B.Sc. Computer Engineering – Information Technologies, University of Seville
- Español: nativo / Spanish: native
- Inglés: profesional completo (Cambridge B2), uso diario con clientes australianos / English: full professional proficiency (Cambridge B2), used daily with Australian clients

# PLAN.md

> **Estado: aprobado por Darío el 2026-11-16.**

## Resumen
Portfolio profesional de Darío Jesús García Aguilera, software engineer, para
enlazar en candidaturas y en el CV. Una página principal por idioma (EN en `/`,
ES en `/es/`) con: hero, experiencia, proyectos, cómo trabajo con IA, skills,
formación y contacto. Cada proyecto tiene, además, su página de caso
(problema → solución → stack → resultado). v1: web estática publicada en
`portfolio-dario.pages.dev`.

## Fuera de alcance
- Dominio propio (se añade después sin tocar código, salvo `site` en la config).
- Blog, CMS, formulario de contacto (se contacta por email/LinkedIn).
- Analítica con cookies. Si se quiere, Cloudflare Web Analytics (sin cookies) en
  una versión posterior.
- Proyectos no listados en `docs/contenido.md` (robots-simulator,
  security-audit-skill, mente-san-antequera).

## Decisiones
- **D1 — Stack:** Astro 5 estático + TypeScript estricto + Tailwind v4, como en
  `AGENTS.md`. Sin frameworks de UI.
- **D2 — Idiomas:** EN por defecto en `/`, ES en `/es/`. Rutas de caso:
  `/projects/<slug>` y `/es/proyectos/<slug>` con el mismo `slug`. i18n nativo de
  Astro (`i18n.defaultLocale: 'en'`, `prefixDefaultLocale: false`). Selector de
  idioma que lleva a la página equivalente, no a la portada.
- **D3 — Contenido:** fuente única `docs/contenido.md`; `src/data/contenido.ts`
  la refleja tipada. Un test comprueba que cada proyecto/experiencia tiene EN y
  ES y que no aparece ningún teléfono (patrón genérico español y `tel:`) en `dist/`.
- **D4 — Proyectos v1 y su orden:** 1 IPSO, 2 Vertex Studio, 3 dracontreras.es,
  4 JM Asesores, 5 Clínica de psiquiatría (plantilla), 6 Asistente WhatsApp
  Nenúfar, 7 uPathWay (GMV). Estado visible en cada tarjeta: «En producción»,
  «En desarrollo», «En planificación», «Plantilla» o «Proyecto de empresa».
- **D5 — uPathWay y Solera:** solo descripción textual de lo que hizo Darío. Sin
  capturas, sin código, sin datos internos. Los nombres de clientes de Solera
  (QBE, Suncorp, Hollard) ya figuran en el CV público y se pueden mantener.
- **D6 — Capturas:** de las webs en producción, sacadas con Playwright a
  1440×900 y 390×844, guardadas en `src/assets/projects/<slug>/`. IPSO y
  Nenúfar llevan un diagrama SVG de arquitectura en lugar de captura.
- **D7 — CV descargable:** `public/cv/dario-garcia-aguilera-cv-en.pdf`, versión
  **sin teléfono** (P1). La genera Claude antes de la Tarea 4.
- **D8 — SEO:** `site: 'https://portfolio-dario.pages.dev'`, canonical,
  hreflang (en, es, x-default), Open Graph con imagen 1200×630, JSON-LD
  `Person`, `@astrojs/sitemap`, `robots.txt`.
- **D9 — Seguridad:** `public/_headers` con CSP estricta (sin `unsafe-inline`
  en scripts; hash si hay script inline), `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`.
- **D11 — Textos ausentes (2026-11-16):** ningún campo de texto se inventa. Lo
  que no está en `docs/contenido.md` en EN y ES es opcional en los tipos y la UI
  no lo muestra. Ampliar los casos (rol, problema/solución) requiere que Darío
  apruebe el texto en `docs/contenido.md` primero.
- **D10 — Calidad mínima:** Playwright + axe sin violaciones serias/críticas en
  las 4 plantillas de página; Lighthouse ≥ 95 en Performance, Accessibility,
  Best Practices y SEO (medido a mano en la Tarea 8).

## Pendientes de Darío
- **P1 (resuelto 2026-11-16):** el CV de la web va sin teléfono.
- **P2 (resuelto 2026-11-16):** textos de `docs/contenido.md` aprobados tal cual.
- **P3:** foto de perfil (opcional). Sin ella, el hero usa iniciales/monograma.
- **P4:** el repo pasa a público al terminar la v1 (decidido 2026-11-16).

## Tareas

### Tarea 1 — Andamiaje del proyecto
- **Estado:** hecha
- **Modo:** síncrono
- **Crítica:** no
- **Contexto:** D1. Base sobre la que van todas las tareas.
- **Archivos:** crear `package.json`, `astro.config.mjs`, `tsconfig.json`,
  `eslint.config.js`, `.prettierrc`, `vitest.config.ts`,
  `playwright.config.ts`, `.nvmrc` (22), `.gitignore`, `src/styles/global.css`,
  `src/pages/index.astro` (placeholder), `tests/unit/smoke.test.ts`,
  `tests/e2e/smoke.spec.ts`.
- **Contrato:** existen los scripts `dev`, `build`, `preview`, `typecheck`
  (`astro check`), `lint`, `format`, `test` (vitest run), `test:e2e`
  (playwright, con `webServer` que hace build + preview en el puerto 4321) y
  `verify` (lint → typecheck → test → build → test:e2e). Tailwind v4 cargado en
  `global.css` con `@import "tailwindcss"`.
- **No hacer:** componentes, contenido real ni diseño.
- **Verificación:** `npm run verify` pasa.

### Tarea 2 — i18n, layout base y SEO
- **Estado:** hecha
- **Modo:** síncrono
- **Crítica:** no
- **Contexto:** D2, D8.
- **Archivos:** crear `src/i18n/ui.ts`, `src/i18n/utils.ts`,
  `src/layouts/Base.astro`, `src/components/LangSwitch.astro`,
  `src/pages/es/index.astro`; modificar `astro.config.mjs`,
  `src/pages/index.astro`; tests `tests/unit/i18n.test.ts`.
- **Contrato:** `getLangFromUrl(url)`, `t(lang, key)`,
  `localizedPath(path, targetLang)` (incluye `/projects/x` ↔ `/es/proyectos/x`).
  `Base.astro` recibe `title`, `description`, `lang`, `alternatePath`, `ogImage?`
  y emite canonical, hreflang en/es/x-default, OG, Twitter card, `lang` en
  `<html>` y enlace «Saltar al contenido».
- **No hacer:** secciones de contenido ni estilos finales.
- **Verificación:** `npm run verify` pasa; test e2e: `/` tiene `lang="en"`,
  `/es/` tiene `lang="es"` y el selector enlaza la una con la otra.

### Tarea 3 — Capa de datos del contenido
- **Estado:** hecha
- **Modo:** síncrono
- **Crítica:** no
- **Contexto:** D3, D4, D5.
- **Archivos:** crear `src/data/contenido.ts`, `src/data/types.ts`,
  `tests/unit/contenido.test.ts`.
- **Contrato:** tipos `Localized<T> = { en: T; es: T }`, `Experience`,
  `Project` (`slug`, `name: string` común a ambos idiomas — p. ej. «IPSO»,
  «Vertex Studio», «JM Asesores» —, `tagline: Localized<string>` = el texto
  tras «·» en el encabezado de `docs/contenido.md` (traducirlo al inglés NO está
  permitido: si solo existe en ES, `tagline` es opcional y se omite),
  `status: Localized<string>`, `summary: Localized<string>`,
  `problem?`, `solution?`, `highlights?: Localized<string[]>`, `stack: string[]`,
  `url?`, `repo?: 'private'`, `media: 'screenshots' | 'diagram' | 'none'`).
  `role?: Localized<string>` (añadido el 2026-11-16 al aprobar los casos). Los campos opcionales se rellenan solo si el texto
  existe en `docs/contenido.md` en los dos idiomas (D11). `SkillGroup`,
  `Education`, `Profile`. Exporta `profile`, `experience`, `projects` (en el
  orden de D4), `skills`, `education`, `aiWorkflow`. Los textos son copia literal
  de `docs/contenido.md`. Tests: todos los campos `Localized` tienen EN y ES no
  vacíos; los `slug` son únicos y en kebab-case; no aparece ningún teléfono.
- **No hacer:** componentes; no reescribir ni «mejorar» los textos.
- **Verificación:** `npm test` y `npm run typecheck` pasan.

### Tarea 4 — Secciones de la página principal
- **Estado:** hecha
- **Modo:** background
- **Crítica:** no
- **Contexto:** D2, D3, D4. Estructura y semántica; el estilo fino es la Tarea 6.
- **Archivos:** crear `src/components/{Hero,Experience,Projects,AiWorkflow,Skills,Education,Contact}.astro`
  y `src/components/ProjectCard.astro`; modificar `src/pages/index.astro` y
  `src/pages/es/index.astro`.
- **Contrato:** cada sección es un `<section id>` con `aria-labelledby`. El hero
  tiene el único `<h1>`, botones «Descargar CV» y «Contactar». `ProjectCard`
  muestra estado, nombre, resumen, stack y enlace al caso. Navegación por anclas
  en la cabecera. Ambas portadas comparten componentes y solo cambian `lang`.
- **No hacer:** páginas de caso; animaciones; tocar los datos.
- **Verificación:** `npm run verify` pasa; e2e: las 7 secciones existen en `/` y
  en `/es/`, hay 7 tarjetas de proyecto y el enlace del CV devuelve 200.

### Tarea 5 — Páginas de caso de proyecto y capturas
- **Estado:** hecha
- **Modo:** background
- **Crítica:** no
- **Contexto:** D2, D5, D6.
- **Archivos:** crear `src/pages/projects/[slug].astro`,
  `src/pages/es/proyectos/[slug].astro`, `src/components/ProjectDetail.astro`,
  `scripts/screenshots.ts` (Playwright, ejecución manual) y las imágenes en
  `src/assets/projects/`.
- **Contrato:** `getStaticPaths` desde `projects`. Página: título, estado, rol,
  problema, solución, highlights, stack, enlaces (web/repo si existen),
  galería escritorio/móvil o diagrama, y enlace «volver a proyectos» al ancla.
  `npm run screenshots` regenera las capturas de las URLs de producción.
- **No hacer:** capturas de uPathWay ni de nada de Solera/GMV.
- **Verificación:** `npm run verify` pasa; e2e: las 14 páginas de caso (7×2)
  responden 200 y el hreflang de cada una apunta a su equivalente.

### Tarea 6 — Diseño visual
- **Estado:** hecha
- **Modo:** — (Claude, skill frontend-design)
- **Crítica:** no
- **Contexto:** CLAUDE.md. Identidad visual, tipografía, color, modo oscuro,
  responsive y microinteracciones con `prefers-reduced-motion`.
- **Archivos:** `src/styles/global.css` y estilos de los componentes.
- **No hacer:** cambiar la estructura ni los textos.
- **Verificación:** `npm run verify` pasa; revisión visual a 390, 768 y 1440 px.

### Tarea 7 — Endurecido: accesibilidad, cabeceras y SEO técnico
- **Estado:** hecha
- **Implementación:** escrita; pendiente de instalar `@astrojs/sitemap`, generar
  las OG y ejecutar la verificación completa con Claude.
- **Modo:** síncrono
- **Crítica:** no
- **Contexto:** D8, D9, D10.
- **Archivos:** crear `public/_headers`, `public/robots.txt`,
  `public/og/og-en.png`, `public/og/og-es.png`, `tests/e2e/a11y.spec.ts`,
  `tests/unit/dist.test.ts`; modificar `astro.config.mjs` (sitemap).
- **Contrato:** axe sin violaciones `serious`/`critical` en `/`, `/es/`, un caso
  EN y uno ES. `dist.test.ts` (tras build) comprueba: sitemap con las 16 URLs,
  ningún teléfono en ningún HTML, cada página con canonical y hreflang.
- **No hacer:** cambiar textos ni diseño salvo para arreglar contraste o foco.
- **Verificación:** `npm run verify` pasa.

- **Ejecución pendiente (Claude):** `npm install`, `npm run og` y
  `npm run verify`, en ese orden. `verify` ejecuta `test:dist` después del build;
  los tests unitarios normales no dependen de un `dist/` previo. Revisar las
  imágenes `public/og/og-{en,es}.png` antes de marcar la tarea hecha.

### Tarea 8 — Despliegue en Cloudflare Pages
- **Estado:** en curso
- **Modo:** — (Claude + Darío)
- **Crítica:** no
- **Contexto:** D8. Darío conecta el repo a Cloudflare Pages desde el panel
  (build `npm run build`, salida `dist`, Node 22) o se publica con `wrangler`.
- **Verificación:** la URL de producción responde, cabeceras de `_headers`
  presentes, Lighthouse ≥ 95 en las cuatro categorías en `/` y `/es/`.

## Registro
- 2026-11-16 — Proyecto creado desde la plantilla del kit; PLAN.md en borrador.
- 2026-11-16 — Tarea 1 hecha (Codex + Claude). Codex no tiene red: Claude instaló dependencias y Chromium. Ajustes de Claude: `overrides.vite` a ^6.4.6 (Astro usa Vite 6 y Vitest arrastraba Vite 7, rompía los tipos de `test`), `/// <reference types="vitest" />` y import JSON con `with { type: 'json' }` en el e2e (lo exige Node 26). `npm run verify` en verde con Node 26.8.2.
- 2026-11-16 — Tarea 2 hecha (Codex). El sandbox de Codex no puede abrir puertos (`listen EPERM`): el e2e lo ejecuta Claude. `verify` en verde: 35 unit + 3 e2e. Título provisional `portfolio-dario` y OG pendiente de la Tarea 7.
- 2026-11-16 — Tarea 3 hecha (Codex). Datos tipados con textos literales de `docs/contenido.md`, campos ausentes omitidos según D11 y 18 tests nuevos de contenido. Verificación: lint, typecheck, 53 tests unitarios y build correctos; typecheck conserva un aviso informativo existente de API obsoleta en `eslint.config.js`. Sin commit.
- 2026-11-16 — Tarea 3 hecha (Codex). Primer intento parado con razón: el contrato pedía textos inexistentes; Claude lo corrigió (D11). `verify` en verde: 53 unit + 3 e2e.
- 2026-11-16 — Casos ampliados (rol, problema, solución) aprobados por Darío e integrados por Claude en `docs/contenido.md` y `src/data/contenido.ts`. Corregido: JM Asesores está en Netlify. CV sin teléfono copiado a `public/cv/`.
- 2026-11-16 — Tarea 4 implementada (Codex): siete secciones compartidas EN/ES, tarjetas de proyecto, navegación por anclas y descarga del CV. Etiquetas de interfaz en `src/i18n/ui.ts`; datos sin cambios. Actualizados los smoke tests del placeholder y añadidos ocho e2e (secciones/anclas, tarjetas, contenido/contacto y CV en ambos idiomas). Lint, typecheck, 53 unitarios y build correctos; persiste el hint previo de API obsoleta en `eslint.config.js`. Playwright enumera 11 tests; ejecución pendiente de Claude, sin abrir puertos. Sin commit.
- 2026-11-16 — Tarea 4 hecha (Codex). Claude cambió el `<title>` provisional por «Darío García Aguilera — Software Engineer / Ingeniero de software». `verify` en verde: 53 unit + 11 e2e.
- 2026-11-16 — Tarea 5 implementada (Codex): 14 casos EN/ES con campos opcionales (D11), enlaces equivalentes y regreso al ancla de proyectos; galería con `astro:assets` e `import.meta.glob`, sin exigir capturas existentes; diagramas SVG de IPSO y Nenúfar con title/desc y etiquetas bilingües en `src/i18n/ui.ts`, basados en el contenido aprobado. Script manual `npm run screenshots` (`node scripts/screenshots.ts`) para las cuatro webs públicas con `media: screenshots`, incluida la plantilla: escritorio 1440×900 y móvil 390×844. Sin capturas de uPathWay/Solera/GMV, sin dependencias nuevas ni commit. Lint, typecheck (solo hint previo de `eslint.config.js`), 73 tests unitarios y build de 16 páginas correctos. Playwright enumera 25 e2e (14 nuevos); no se ejecutaron ni se abrieron puertos. Claude debe ejecutar `npm run screenshots`, revisar las ocho imágenes en `src/assets/projects/<slug>/{desktop,mobile}.png` y ejecutar `npm run verify` con ellas antes de marcar la tarea hecha.
- 2026-11-16 — Tarea 5 hecha (Codex; capturas de Claude). La URL de la plantilla de clínica está tras Cloudflare Access (login): se quita del contenido y sus capturas salen de `npx vite dev` en `~/peace-space-site`. Fallo visto en la plantilla: en móvil el botón «Reservar» de la cabecera se sale por la derecha. `verify` en verde: 73 unit + 25 e2e.
- 2026-11-16 — Tarea 6 hecha (Claude, sin la skill frontend-design: no está instalada). Tokens en `global.css` con modo oscuro por `prefers-color-scheme`; fuentes autoalojadas (@fontsource: Inter, Source Serif 4, JetBrains Mono); `src/data/status.ts` para el color del estado. Playwright emula `reducedMotion: 'reduce'`: el scroll suave hacía inestable el e2e de anclas (1 de cada 3). `verify` en verde: 75 unit + 25 e2e.
- 2026-11-16 — Tarea 7 implementada (Codex), pendiente de validación completa:
  CSP estricta con CSS externo (`inlineStylesheets: 'never'`), cabeceras de
  Cloudflare, robots, integración sitemap declarada en `package.json`, metadatos
  OG y JSON-LD Person (datos inertes, sin JavaScript ejecutable). Generador manual
  `node scripts/og.ts` / `npm run og`: Playwright con `setContent`, sin servidor,
  sin red, fuentes locales y textos/colores de las fuentes del proyecto. Patrones
  genéricos de teléfono con pruebas sintéticas; eliminada la comprobación con
  dígitos concretos. Ocho e2e axe (cuatro plantillas en claro/oscuro), enumerados
  pero no ejecutados; Playwright enumera 33 e2e en total. Lint pasa. Los comandos
  oficiales de tipos, unitarios y build fallan al cargar `@astrojs/sitemap`, aún
  no instalada; no se modifica el lockfile ni se intenta instalar sin red.
  Diagnóstico adicional con configuración temporal sin sitemap (retirada al
  terminar): tipos sin errores, con el hint previo de ESLint; 106 unitarios
  pasan; build de 16 páginas correcto, sin `<style>` ni atributos `style=`.
  Sobre ese build, `test:dist` pasa 66 comprobaciones y falla tres por el sitemap
  y los dos PNG pendientes de generar. Claude debe instalar, generar/revisar OG
  y ejecutar `npm run verify`. No se marca hecha; sin commit.
- 2026-11-16 — Tarea 7 hecha (Codex). Claude instaló `@astrojs/sitemap`, generó las OG (`npm run og`) y corrigió la única violación de axe (el logo tenía un `aria-label` distinto de su texto visible). Los tests de privacidad usan un patrón genérico de teléfono, sin dígitos reales. CV: fecha de la carrera parcheada a 2018–2025. `verify` en verde: 106 unit + 69 dist + 33 e2e.
- 2026-11-16 — Tarea 6b (petición de Darío, Claude): efectos de scroll en CSS (`animation-timeline`), solo con `@supports` y sin `prefers-reduced-motion`. Comprobado que todo acaba al 100 % de opacidad; el bloque de contacto usa `entry 0% entry 100%` porque la página termina antes de llegar a un rango `cover`. Carrera: 2018–2025.
- 2026-11-16 — Historial limpiado con `git filter-repo` (quitados restos parciales del teléfono en PLAN.md y en un test antiguo). Repo de GitHub borrado y recreado para eliminar los objetos huérfanos. Copia previa en el scratchpad de la sesión.

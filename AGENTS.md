# AGENTS.md — Fuente de verdad técnica
<!-- Codex lee este archivo automáticamente. CLAUDE.md lo importa.
     Todo lo técnico va aquí, una sola vez. -->

## Proyecto
- Nombre: portfolio-dario
- Cliente: Darío Jesús García Aguilera (uso propio)
- Objetivo en una frase: portfolio profesional bilingüe (EN/ES) para enseñar a
  empresas la experiencia, los proyectos y la forma de trabajar de Darío.

## Stack
- Framework: Astro 5, salida 100 % estática (`output: 'static'`).
- Lenguaje: TypeScript estricto (`astro/tsconfigs/strictest`).
- Estilos: Tailwind CSS v4 vía `@tailwindcss/vite`. Sin librerías de componentes.
- JavaScript en cliente: el mínimo. Nada de React/Vue/islands salvo que una
  tarea lo pida expresamente.
- Base de datos: ninguna.
- Tests: Vitest (unitarios/datos) y Playwright (e2e + accesibilidad con
  `@axe-core/playwright`).
- Despliegue: Cloudflare Pages, proyecto `portfolio-dario`
  (`portfolio-dario.pages.dev`). Cada push a `main` redespliega.

## Comandos
- Instalar: `npm ci`
- Desarrollo: `npm run dev` (http://localhost:4321)
- Tests unitarios: `npm test`
- Tests e2e: `npm run test:e2e` (construye y sirve `dist/` con `astro preview`)
- Lint: `npm run lint`
- Tipos: `npm run typecheck`
- Build: `npm run build`
- Todo: `npm run verify` = lint + typecheck + test + build + test:e2e

## Estructura
- `docs/contenido.md` — fuente de verdad de TODO el texto publicable (EN y ES).
  Se edita a mano; el código nunca inventa textos.
- `src/data/contenido.ts` — el contenido de `docs/contenido.md` tipado, por idioma.
- `src/i18n/` — idiomas, utilidades de rutas y textos de interfaz (botones, aria).
- `src/layouts/Base.astro` — `<head>` (SEO, hreflang, OG, JSON-LD), cabecera, pie.
- `src/components/` — una sección por componente (`Hero`, `Experience`,
  `Projects`, `AiWorkflow`, `Skills`, `Education`, `Contact`, `LangSwitch`).
- `src/pages/index.astro` (EN), `src/pages/es/index.astro` (ES),
  `src/pages/projects/[slug].astro` y `src/pages/es/proyectos/[slug].astro`.
- `public/` — favicon, `cv/` (PDF del CV), `og/`, `_headers`, `robots.txt`.
- `src/assets/projects/` — capturas de los proyectos (optimizadas con `astro:assets`).
- `tests/unit/` (Vitest) y `tests/e2e/` (Playwright).

## Convenciones
- Nombres: camelCase para variables/funciones, PascalCase para componentes.
- Idioma del código y comentarios: inglés. Textos de interfaz: EN y ES, siempre
  ambos; un texto que exista en un idioma y no en el otro es un error.
- Ningún texto visible escrito directamente en un componente: todo sale de
  `src/data/contenido.ts` o `src/i18n/ui.ts`.
- Nunca publicar el teléfono ni la dirección postal de Darío. El email sí.
- Nunca secretos en el código: usar variables de entorno (.env, no versionado).
- Imágenes con `<Image>` de `astro:assets`, con `alt` en ambos idiomas.
- Accesibilidad: HTML semántico, un único `<h1>` por página, foco visible,
  contraste AA, `prefers-reduced-motion` respetado.
- Cada función con lógica lleva test.

## Reglas para quien implementa
- Implementa SOLO la tarea indicada de PLAN.md. No refactorices fuera de alcance.
- Respeta las decisiones de la sección "Decisiones" de PLAN.md; no las cambies.
- Si algo del plan es imposible o contradictorio, detente y explícalo en vez
  de improvisar.
- No hagas commit (el sandbox no permite escribir en `.git`); Claude lo hace.
- El sandbox no tiene red: si necesitas una dependencia nueva, añádela a
  `package.json` y dilo en tu informe; Claude ejecuta `npm install`.
- Termina ejecutando el comando de "Verificación" de la tarea y reporta el
  resultado.

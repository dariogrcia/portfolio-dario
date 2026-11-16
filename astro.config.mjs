import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://portfolio-dario.pages.dev',
  output: 'static',
  build: {
    inlineStylesheets: 'never',
  },
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Fonts and images must be files: the CSP does not allow data: URIs.
    build: { assetsInlineLimit: 0 },
  },
});

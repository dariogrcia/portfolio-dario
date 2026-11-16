import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import { ui, type Lang, type TranslationKey } from '../../src/i18n/ui';
import { getLangFromUrl, localizedPath, t } from '../../src/i18n/utils';
import Base from '../../src/layouts/Base.astro';

describe('getLangFromUrl', () => {
  test.each([
    ['/', 'en'],
    ['/projects/ipso', 'en'],
    ['/es', 'es'],
    ['/es/', 'es'],
    ['/es/proyectos/ipso', 'es'],
    ['/essay', 'en'],
    ['/projects/es', 'en'],
    ['/?lang=es#es', 'en'],
  ] as const)('detects %s as %s', (path, expected) => {
    expect(getLangFromUrl(new URL(path, 'https://example.com'))).toBe(expected);
  });
});

describe('t', () => {
  test('provides the same non-empty interface strings in both languages', () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
    for (const lang of ['en', 'es'] as const) {
      for (const key of Object.keys(ui.en) as TranslationKey[]) {
        expect(t(lang, key)).toBe(ui[lang][key]);
        expect(t(lang, key).trim()).not.toBe('');
      }
    }
    expect(t('en', 'skipToContent')).toBe('Skip to content');
    expect(t('es', 'skipToContent')).toBe('Saltar al contenido');
  });
});

describe('localizedPath', () => {
  test.each<[string, Lang, string]>([
    ['/', 'es', '/es/'],
    ['/es/', 'en', '/'],
    ['/es', 'en', '/'],
    ['/es', 'es', '/es/'],
    ['/', 'en', '/'],
    ['', 'es', '/es/'],
    ['projects/ipso', 'es', '/es/proyectos/ipso'],
    ['/projects/ipso', 'es', '/es/proyectos/ipso'],
    ['/es/proyectos/ipso', 'en', '/projects/ipso'],
    ['/projects/ipso/', 'es', '/es/proyectos/ipso/'],
    ['/es/proyectos/ipso/', 'en', '/projects/ipso/'],
    ['/projects/ipso', 'en', '/projects/ipso'],
    ['/es/proyectos/ipso', 'es', '/es/proyectos/ipso'],
    ['/projects', 'es', '/es/proyectos'],
    ['/es/proyectos', 'en', '/projects'],
    ['/essay', 'es', '/es/essay'],
    ['/projects-archive/x', 'es', '/es/projects-archive/x'],
    ['/es/proyectos-archivo/x', 'en', '/proyectos-archivo/x'],
    ['/projects/projects', 'es', '/es/proyectos/projects'],
    [
      '/projects/ipso?source=cv#stack',
      'es',
      '/es/proyectos/ipso?source=cv#stack',
    ],
    [
      '/es/proyectos/ipso?source=cv#stack',
      'en',
      '/projects/ipso?source=cv#stack',
    ],
    ['/#contact', 'es', '/es/#contact'],
    ['/es/#contact', 'en', '/#contact'],
  ])('localizes %s to %s as %s', (path, lang, expected) => {
    expect(localizedPath(path, lang)).toBe(expected);
  });
});

describe('Base layout', () => {
  test.each(['en', 'es'] as const)(
    'renders project SEO and an equivalent language link in %s',
    async (lang) => {
      const site = 'https://portfolio-dario.pages.dev';
      const path = localizedPath('/projects/ipso', lang);
      const targetLang = lang === 'en' ? 'es' : 'en';
      const alternatePath = localizedPath(path, targetLang);
      const ogImage =
        lang === 'en' ? '/og/custom.png' : 'https://example.com/custom.png';
      const container = await AstroContainer.create();
      const html = await container.renderToString(Base, {
        request: new Request(`https://preview.example${path}?source=cv`),
        props: {
          title: 'IPSO',
          description: 'Project description',
          lang,
          alternatePath,
          ogImage,
        },
      });

      expect(html).toContain(`<html lang="${lang}">`);
      expect(html).toContain(`<link rel="canonical" href="${site}${path}">`);
      expect(html).toContain(`hreflang="en" href="${site}/projects/ipso"`);
      expect(html).toContain(`hreflang="es" href="${site}/es/proyectos/ipso"`);
      expect(html).toContain(
        `hreflang="x-default" href="${site}/projects/ipso"`,
      );
      expect(html).toContain(`href="${alternatePath}" lang="${targetLang}"`);
      expect(html).toContain(
        `property="og:image" content="${new URL(ogImage, site).href}"`,
      );
      expect(html).toContain(
        `name="twitter:image" content="${new URL(ogImage, site).href}"`,
      );
      expect(html).not.toContain('preview.example');
      expect(html).not.toContain('?source=cv');
      expect(html).not.toMatch(/<script\b/i);
    },
  );
});

import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { profile, projects } from '../../src/data/contenido';
import { localizedPath } from '../../src/i18n/utils';
import { spanishPhonePattern } from '../helpers/privacy';

const site = 'https://portfolio-dario.pages.dev';
const dist = new URL('../../dist/', import.meta.url);
// Missing output is a failure: run npm run build before npm run test:dist.
const allHtmlFiles = readdirSync(dist, { recursive: true, encoding: 'utf8' })
  .filter((path) => path.endsWith('.html'))
  .sort();
// 404.html is served for unknown paths only: it is noindex and has no
// language alternates, so it is checked separately from the indexable pages.
const htmlFiles = allHtmlFiles.filter((path) => path !== '404.html');
const expectedPaths = [
  '/',
  '/es/',
  ...projects.flatMap(({ slug }) => [
    `/projects/${slug}/`,
    `/es/proyectos/${slug}/`,
  ]),
];

test('builds the 404 page and nothing beyond the sixteen published pages', () => {
  expect(allHtmlFiles).toContain('404.html');
  const notFound = readFileSync(new URL('404.html', dist), 'utf8');
  expect(notFound).toContain('<meta name="robots" content="noindex">');
  expect(notFound).not.toMatch(spanishPhonePattern);
});

test('builds exactly the sixteen published pages', () => {
  expect(
    htmlFiles.map((file) => `/${file.replace(/index\.html$/, '')}`).sort(),
  ).toEqual([...expectedPaths].sort());
  expect(htmlFiles).toHaveLength(14);
});

test('indexes all sixteen URLs, without duplicates or extra routes', () => {
  const index = readFileSync(new URL('sitemap-index.xml', dist), 'utf8');
  const sitemapUrls = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]!),
  );
  expect(sitemapUrls.length).toBeGreaterThan(0);
  const urls = sitemapUrls.flatMap((url) => {
    expect(url.origin).toBe(site);
    const sitemap = readFileSync(new URL(`.${url.pathname}`, dist), 'utf8');
    return [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
      const pageUrl = new URL(match[1]!);
      expect(pageUrl.origin).toBe(site);
      expect(pageUrl.search).toBe('');
      expect(pageUrl.hash).toBe('');
      return pageUrl.pathname.replace(/\/?$/, '/');
    });
  });
  expect(urls.sort()).toEqual([...expectedPaths].sort());
});

describe.each(htmlFiles)('%s', (file) => {
  const html = readFileSync(new URL(file, dist), 'utf8');
  const path = `/${file.replace(/index\.html$/, '')}`;
  const lang = path.startsWith('/es/') ? 'es' : 'en';

  test('has one canonical and each equivalent hreflang', () => {
    expect(html.match(/<link\b[^>]*rel="canonical"[^>]*>/g)).toHaveLength(1);
    // Astro may omit the trailing slash on case pages with the default routing.
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)!;
    expect(canonical).not.toBeNull();
    expect(new URL(canonical[1]!).origin).toBe(site);
    expect(new URL(canonical[1]!).pathname.replace(/\/?$/, '/')).toBe(path);
    for (const alternateLang of ['en', 'es', 'x-default'] as const) {
      const tags = [
        ...html.matchAll(
          new RegExp(
            `<link rel="alternate" hreflang="${alternateLang}" href="([^"]+)"`,
            'g',
          ),
        ),
      ];
      expect(tags).toHaveLength(1);
      const url = new URL(tags[0]![1]!);
      expect(url.origin).toBe(site);
      expect(url.pathname.replace(/\/?$/, '/')).toBe(
        localizedPath(
          path,
          alternateLang === 'x-default' ? 'en' : alternateLang,
        ),
      );
    }
  });

  test('contains no telephone numbers or telephone links', () => {
    expect(html).not.toMatch(/tel:/i);
    expect(html).not.toMatch(spanishPhonePattern);
  });

  test('uses external styles and only the self-hosted background script, compatible with the CSP', () => {
    expect(html).not.toMatch(/<style\b|\sstyle\s*=/i);
    expect(html).not.toMatch(/\son[a-z]+\s*=|javascript\s*:/i);
    const scripts = html.match(/<script\b[^>]*>/gi) ?? [];
    expect(scripts).toHaveLength(2);
    expect(scripts[0]).toBe('<script type="application/ld+json">');
    // The only executable script is an external module served from /_astro/.
    expect(scripts[1]).toMatch(
      /^<script type="module" src="\/_astro\/[\w.-]+\.js">$/,
    );
    expect(html).toMatch(/<script type="module" src="[^"]+"><\/script>/);
    const json = html.match(
      /<script type="application\/ld\+json">([^]*?)<\/script>/,
    )![1]!;
    expect(JSON.parse(json)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${site}/#person`,
      url: `${site}/`,
      name: profile.name,
      jobTitle: profile.title[lang],
      description: profile.headline[lang],
      email: profile.email,
      sameAs: [profile.linkedin, profile.github],
    });
  });

  test('links the localized Open Graph image and large Twitter card', () => {
    expect(html).toContain(
      `<meta property="og:image" content="${site}/og/og-${lang}.png">`,
    );
    expect(html).toContain('<meta property="og:image:width" content="1200">');
    expect(html).toContain('<meta property="og:image:height" content="630">');
    expect(html).toContain(
      '<meta name="twitter:card" content="summary_large_image">',
    );
  });
});

test.each(['en', 'es'])(
  'ships a 1200×630 %s PNG (run npm run og before building)',
  (lang) => {
    const png = readFileSync(new URL(`og/og-${lang}.png`, dist));
    expect(png.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  },
);

test('ships the robots sitemap declaration and strict Cloudflare headers', () => {
  expect(readFileSync(new URL('robots.txt', dist), 'utf8')).toBe(
    `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap-index.xml\n`,
  );
  const headers = readFileSync(new URL('_headers', dist), 'utf8');
  expect(headers).toMatch(/^\/\*\n/);
  for (const directive of [
    "default-src 'none'",
    "script-src 'self'",
    "style-src 'self'",
    "font-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    "form-action 'none'",
  ])
    expect(headers).toContain(directive);
  expect(headers).not.toMatch(/unsafe-inline|unsafe-eval/);
  expect(headers).toContain('X-Content-Type-Options: nosniff');
  expect(headers).toContain('Referrer-Policy: strict-origin-when-cross-origin');
  expect(headers).toContain(
    'Permissions-Policy: camera=(), microphone=(), geolocation=()',
  );
});

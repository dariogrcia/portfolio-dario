import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import { profile } from '../../src/data/contenido';
import Index from '../../src/pages/index.astro';
import { t } from '../../src/i18n/utils';

test('renders the portfolio as static HTML', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Index);

  expect(html).toContain(`<title>${t('en', 'pageTitle')}</title>`);
  expect(html).toMatch(new RegExp(`<h1\\b[^>]*>\\s*${profile.name}\\s*</h1>`));
  // JSON-LD is inert data; the only executable script is the external
  // module that draws the background.
  const scripts = html.match(/<script\b[^>]*>/gi) ?? [];
  expect(scripts).toHaveLength(2);
  expect(scripts[0]).toBe('<script type="application/ld+json">');
  expect(scripts[1]).toMatch(/^<script type="module" src="[^"]+">$/);
});

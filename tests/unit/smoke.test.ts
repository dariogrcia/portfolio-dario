import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import { profile } from '../../src/data/contenido';
import Index from '../../src/pages/index.astro';
import { t } from '../../src/i18n/utils';

test('renders the portfolio as static HTML', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Index);

  expect(html).toContain(`<title>${t('en', 'pageTitle')}</title>`);
  expect(html).toMatch(new RegExp(`<h1\\b[^>]*>${profile.name}</h1>`));
  expect(html).not.toMatch(/<script\b/i);
});

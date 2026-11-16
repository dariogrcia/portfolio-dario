import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Index from '../../src/pages/index.astro';
import { name } from '../../package.json';

test('renders the placeholder as static HTML', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Index);

  expect(html).toContain(`<title>${name}</title>`);
  expect(html).toMatch(new RegExp(`<h1\\b[^>]*>${name}</h1>`));
  expect(html).not.toMatch(/<script\b/i);
});

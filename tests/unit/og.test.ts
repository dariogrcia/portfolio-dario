import { readFileSync } from 'node:fs';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { profile } from '../../src/data/contenido';

const mocks = vi.hoisted(() => {
  const page = { setContent: vi.fn(), evaluate: vi.fn(), screenshot: vi.fn() };
  const browser = { newPage: vi.fn(), close: vi.fn() };
  return { page, browser, launch: vi.fn(), mkdir: vi.fn() };
});
vi.mock('@playwright/test', () => ({ chromium: { launch: mocks.launch } }));
vi.mock('node:fs/promises', async (importOriginal) => ({
  ...(await importOriginal<typeof import('node:fs/promises')>()),
  mkdir: mocks.mkdir,
}));

import { escapeHtml, generateOgImages, renderOgHtml } from '../../scripts/og';

const css = readFileSync(
  new URL('../../src/styles/global.css', import.meta.url),
  'utf8',
);
const fonts = { sans: 'c2Fucw==', serif: 'c2VyaWY=' };

test('escapes text before placing it into the OG template', () => {
  expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;');
  expect(escapeHtml(profile.name)).toBe(profile.name);
});

test.each(['en', 'es'] as const)(
  'renders approved %s copy, local fonts and palette',
  (lang) => {
    const html = renderOgHtml(lang, css, fonts);
    expect(html).toContain(`<html lang="${lang}">`);
    expect(html).toContain(profile.name);
    expect(html).toContain(profile.title[lang]);
    expect(html).toContain(profile.headline[lang]);
    expect(html).toContain(css.match(/:root\s*\{([^}]+)\}/)![1]);
    expect(html).toContain('width: 1200px; height: 630px;');
    expect(html).toContain(`data:font/woff2;base64,${fonts.sans}`);
    expect(html).toContain(`data:font/woff2;base64,${fonts.serif}`);
    expect(html).not.toMatch(/https?:\/\/|<script/i);
  },
);

test.each(['', ':root { --bg: #ffffff; }'])(
  'fails if the source palette is missing',
  (value) => {
    expect(() => renderOgHtml('en', value, fonts)).toThrow(
      'Missing OG color tokens',
    );
  },
);

describe('manual OG generation', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    mocks.launch.mockResolvedValue(mocks.browser);
    mocks.browser.newPage.mockResolvedValue(mocks.page);
    mocks.page.evaluate.mockResolvedValue(false);
  });
  afterEach(() => vi.restoreAllMocks());

  test('renders both PNGs offline at 1200×630 and closes the browser', async () => {
    await generateOgImages();
    expect(mocks.browser.newPage).toHaveBeenCalledWith(
      expect.objectContaining({
        viewport: { width: 1200, height: 630 },
        deviceScaleFactor: 1,
        offline: true,
      }),
    );
    expect(mocks.page.setContent).toHaveBeenCalledTimes(2);
    expect(mocks.page.screenshot).toHaveBeenCalledTimes(2);
    for (const [index, lang] of ['en', 'es'].entries()) {
      expect(mocks.page.setContent).toHaveBeenNthCalledWith(
        index + 1,
        expect.stringContaining(`<html lang="${lang}">`),
        { waitUntil: 'load' },
      );
      expect(mocks.page.screenshot).toHaveBeenNthCalledWith(index + 1, {
        path: expect.stringContaining(`/public/og/og-${lang}.png`),
        type: 'png',
        fullPage: false,
        animations: 'disabled',
      });
    }
    expect(mocks.browser.close).toHaveBeenCalledOnce();
  });

  test('refuses to save clipped content and closes the browser', async () => {
    mocks.page.evaluate.mockResolvedValue(true);
    await expect(generateOgImages()).rejects.toThrow('OG content overflows');
    expect(mocks.page.screenshot).not.toHaveBeenCalled();
    expect(mocks.browser.close).toHaveBeenCalledOnce();
  });

  test('closes Chromium if rendering fails', async () => {
    mocks.page.setContent.mockRejectedValue(new Error('Rendering failed'));
    await expect(generateOgImages()).rejects.toThrow('Rendering failed');
    expect(mocks.page.screenshot).not.toHaveBeenCalled();
    expect(mocks.browser.close).toHaveBeenCalledOnce();
  });
});

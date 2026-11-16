import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { profile } from '../src/data/contenido.ts';

type Language = 'en' | 'es';
interface Fonts {
  sans: string;
  serif: string;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character]!;
  });
}

export function renderOgHtml(
  lang: Language,
  css: string,
  fonts: Fonts,
): string {
  // Reuse the light palette, without importing Tailwind or remote resources.
  const tokens = css.match(/:root\s*\{([^}]+)\}/)?.[1];
  if (
    !tokens ||
    !['bg', 'ink', 'muted', 'accent'].every((name) =>
      new RegExp(`--${name}:\\s*#[a-f\\d]{6};`, 'i').test(tokens),
    )
  ) {
    throw new Error('Missing OG color tokens in src/styles/global.css');
  }
  return `<!doctype html>
<html lang="${lang}">
<head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url(data:font/woff2;base64,${fonts.sans}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: SourceSerif; src: url(data:font/woff2;base64,${fonts.serif}) format('woff2'); font-weight: 200 900; }
:root { ${tokens} color-scheme: light; }
* { box-sizing: border-box; }
html, body { margin: 0; width: 1200px; height: 630px; }
body { background: var(--bg); color: var(--ink); font-family: Inter, sans-serif; padding: 64px 72px; border-top: 12px solid var(--accent); }
main { height: 100%; display: flex; flex-direction: column; justify-content: center; }
.title { color: var(--accent); font-size: 26px; font-weight: 600; margin: 0 0 28px; }
h1 { font-family: SourceSerif, serif; font-size: 66px; font-weight: 600; line-height: 1.12; letter-spacing: -1px; margin: 0; }
.headline { color: var(--muted); font-size: 30px; line-height: 1.45; max-width: 1000px; margin: 32px 0 0; }
</style></head>
<body><main>
<p class="title">${escapeHtml(profile.title[lang])}</p>
<h1>${escapeHtml(profile.name)}</h1>
<p class="headline">${escapeHtml(profile.headline[lang])}</p>
</main></body></html>`;
}

export async function generateOgImages(): Promise<void> {
  const [css, sans, serif] = await Promise.all([
    readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
    readFile(
      new URL(
        '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
        import.meta.url,
      ),
    ),
    readFile(
      new URL(
        '../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2',
        import.meta.url,
      ),
    ),
  ]);
  const fonts = {
    sans: sans.toString('base64'),
    serif: serif.toString('base64'),
  };
  const directory = new URL('../public/og/', import.meta.url);
  await mkdir(directory, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
      colorScheme: 'light',
      reducedMotion: 'reduce',
      offline: true,
    });
    for (const lang of ['en', 'es'] as const) {
      await page.setContent(renderOgHtml(lang, css, fonts), {
        waitUntil: 'load',
      });
      const overflows = await page.evaluate(async () => {
        await document.fonts.ready;
        return (
          document.documentElement.scrollWidth > 1200 ||
          document.documentElement.scrollHeight > 630
        );
      });
      if (overflows) throw new Error(`OG content overflows the ${lang} image`);
      await page.screenshot({
        path: fileURLToPath(new URL(`og-${lang}.png`, directory)),
        type: 'png',
        fullPage: false,
        animations: 'disabled',
      });
      console.log(`Saved public/og/og-${lang}.png (1200×630)`);
    }
  } finally {
    await browser.close();
  }
}

// Importing the module for tests never launches Chromium.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await generateOgImages();
}

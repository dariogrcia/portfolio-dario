import { mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { projects } from '../src/data/contenido.ts';

// Only approved public websites have screenshot media and a URL. The clinic
// template has no public URL (Cloudflare Access): capture it by hand from
// `npx vite dev` in ~/peace-space-site.
export const screenshotTargets = projects.flatMap((project) =>
  project.media === 'screenshots' && project.url
    ? [{ slug: project.slug, url: project.url }]
    : [],
);

export const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

export async function captureScreenshots(): Promise<void> {
  const browser = await chromium.launch();
  try {
    for (const target of screenshotTargets) {
      const directory = new URL(
        `../src/assets/projects/${target.slug}/`,
        import.meta.url,
      );
      await mkdir(directory, { recursive: true });
      for (const { name, width, height } of viewports) {
        const context = await browser.newContext({
          viewport: { width, height },
          deviceScaleFactor: 1,
          isMobile: name === 'mobile',
          hasTouch: name === 'mobile',
          colorScheme: 'light',
          reducedMotion: 'reduce',
          locale: 'es-ES',
        });
        try {
          const page = await context.newPage();
          const response = await page.goto(target.url, {
            waitUntil: 'load',
            timeout: 60_000,
          });
          if (!response?.ok()) {
            throw new Error(
              `Cannot capture ${target.url}: HTTP ${response?.status()}`,
            );
          }
          await page.evaluate(async () => {
            await document.fonts.ready;
            await Promise.all(
              Array.from(document.images)
                .filter(
                  (image) => image.getBoundingClientRect().top < innerHeight,
                )
                .map((image) => image.decode().catch(() => undefined)),
            );
          });
          const path = fileURLToPath(new URL(`${name}.png`, directory));
          await page.screenshot({
            path,
            fullPage: false,
            animations: 'disabled',
            caret: 'hide',
            timeout: 30_000,
          });
          console.log(`Saved ${target.slug}/${name}.png (${width}×${height})`);
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
}

// Importing this module in tests must not launch a browser or contact any site.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await captureScreenshots();
}

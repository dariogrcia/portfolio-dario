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

// Close-ups of one element, saved as detail.png next to the other captures.
// Vertex: the CSS-only chat mock-up under the hero.
export const detailTargets = [
  { slug: 'vertex-studio', selector: '.maqueta' },
] as const;

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
    for (const { slug, selector } of detailTargets) {
      const target = screenshotTargets.find((entry) => entry.slug === slug);
      if (!target) continue;
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
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
        const path = fileURLToPath(
          new URL(`../src/assets/projects/${slug}/detail.png`, import.meta.url),
        );
        // The mock-up is tilted in 3D, so a tight element capture clips its
        // corners: capture its box plus a margin of page background instead.
        // fullPage would resize the viewport and move the hero (it is sized in
        // vh units), so bring the element into view and clip the viewport.
        const element = page.locator(selector);
        await element.scrollIntoViewIfNeeded();
        const box = await element.boundingBox();
        if (!box) throw new Error(`Cannot find ${selector} on ${target.url}`);
        const margin = 24;
        await page.screenshot({
          path,
          animations: 'disabled',
          caret: 'hide',
          timeout: 30_000,
          clip: {
            x: Math.max(0, box.x - margin),
            y: Math.max(0, box.y - margin),
            width: box.width + margin * 2,
            height: box.height + margin * 2,
          },
        });
        console.log(`Saved ${slug}/detail.png (${selector})`);
      } finally {
        await context.close();
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

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const page = {
    goto: vi.fn(),
    evaluate: vi.fn(),
    screenshot: vi.fn(),
  };
  const context = { newPage: vi.fn(), close: vi.fn() };
  const browser = { newContext: vi.fn(), close: vi.fn() };
  return { page, context, browser, launch: vi.fn(), mkdir: vi.fn() };
});
vi.mock('@playwright/test', () => ({ chromium: { launch: mocks.launch } }));
vi.mock('node:fs/promises', () => ({ mkdir: mocks.mkdir }));

import {
  captureScreenshots,
  screenshotTargets,
} from '../../scripts/screenshots';

describe('Manual screenshots', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    mocks.launch.mockResolvedValue(mocks.browser);
    mocks.browser.newContext.mockResolvedValue(mocks.context);
    mocks.context.newPage.mockResolvedValue(mocks.page);
    mocks.page.goto.mockResolvedValue({ ok: () => true, status: () => 200 });
  });

  afterEach(() => vi.restoreAllMocks());

  // The clinic template sits behind Cloudflare Access, so it has no public URL
  // and its screenshots are captured by hand from a local build.
  test('selects only the three approved public websites', () => {
    expect(screenshotTargets).toEqual([
      { slug: 'vertex-studio', url: 'https://vertexstudiolab.es' },
      { slug: 'dracontreras', url: 'https://dracontreras.es' },
      { slug: 'jm-asesores', url: 'https://jmasesoresantequera.es' },
    ]);
    expect(mocks.launch).not.toHaveBeenCalled();
  });

  test('writes desktop and mobile PNGs at the required dimensions and closes resources', async () => {
    await captureScreenshots();
    expect(mocks.mkdir).toHaveBeenCalledTimes(3);
    expect(mocks.page.screenshot).toHaveBeenCalledTimes(6);
    expect(mocks.context.close).toHaveBeenCalledTimes(6);
    expect(mocks.browser.close).toHaveBeenCalledOnce();
    for (const [index, target] of screenshotTargets.entries()) {
      for (const [offset, name, width, height] of [
        [0, 'desktop', 1440, 900],
        [1, 'mobile', 390, 844],
      ] as const) {
        const call = index * 2 + offset + 1;
        expect(mocks.browser.newContext).toHaveBeenNthCalledWith(
          call,
          expect.objectContaining({
            viewport: { width, height },
            deviceScaleFactor: 1,
            isMobile: name === 'mobile',
          }),
        );
        expect(mocks.page.goto).toHaveBeenNthCalledWith(
          call,
          target.url,
          expect.any(Object),
        );
        expect(mocks.page.screenshot).toHaveBeenNthCalledWith(
          call,
          expect.objectContaining({
            path: expect.stringContaining(
              `/src/assets/projects/${target.slug}/${name}.png`,
            ),
            fullPage: false,
            animations: 'disabled',
          }),
        );
      }
    }
  });

  test('rejects HTTP error pages without saving them as screenshots', async () => {
    mocks.page.goto.mockResolvedValue({ ok: () => false, status: () => 503 });
    await expect(captureScreenshots()).rejects.toThrow('HTTP 503');
    expect(mocks.page.screenshot).not.toHaveBeenCalled();
    expect(mocks.context.close).toHaveBeenCalledOnce();
    expect(mocks.browser.close).toHaveBeenCalledOnce();
  });

  test('closes resources when navigation fails', async () => {
    mocks.page.goto.mockRejectedValue(new Error('Navigation timeout'));
    await expect(captureScreenshots()).rejects.toThrow('Navigation timeout');
    expect(mocks.page.screenshot).not.toHaveBeenCalled();
    expect(mocks.context.close).toHaveBeenCalledOnce();
    expect(mocks.browser.close).toHaveBeenCalledOnce();
  });
});

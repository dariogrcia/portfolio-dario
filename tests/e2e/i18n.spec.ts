import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

const site = 'https://portfolio-dario.pages.dev';

for (const {
  path,
  lang,
  alternatePath,
  targetLang,
  switchLabel,
  skipLabel,
} of [
  {
    path: '/',
    lang: 'en',
    alternatePath: '/es/',
    targetLang: 'es',
    switchLabel: 'Español',
    skipLabel: 'Skip to content',
  },
  {
    path: '/es/',
    lang: 'es',
    alternatePath: '/',
    targetLang: 'en',
    switchLabel: 'English',
    skipLabel: 'Saltar al contenido',
  },
]) {
  test(`${path} has localized SEO and works without JavaScript`, async ({
    page,
  }) => {
    const response = await page.goto(`${path}?source=cv`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${site}${path}`,
    );

    for (const [hreflang, href] of [
      ['en', `${site}/`],
      ['es', `${site}/es/`],
      ['x-default', `${site}/`],
    ]) {
      await expect(
        page.locator(`link[hreflang="${hreflang}"]`),
      ).toHaveAttribute('href', href!);
    }

    const title = await page.title();
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(description).toBeTruthy();
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      title,
    );
    await expect(
      page.locator('meta[property="og:description"]'),
    ).toHaveAttribute('content', description!);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `${site}${path}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `${site}/og/og-${lang}.png`,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
      'content',
      `${site}/og/og-${lang}.png`,
    );

    const skipLink = page.getByRole('link', { name: skipLabel });
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('main')).toBeFocused();

    const languageLink = page.getByRole('link', { name: switchLabel });
    await expect(languageLink).toHaveAttribute('href', alternatePath);
    await expect(languageLink).toHaveAttribute('lang', targetLang);
    await expect(languageLink).toHaveAttribute('hreflang', targetLang);
    await languageLink.click();
    await expect(page).toHaveURL(new RegExp(`${alternatePath}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', targetLang);
  });
}

import { expect, test } from '@playwright/test';
import { t } from '../../src/i18n/utils';
import { profile } from '../../src/data/contenido';

test.use({ javaScriptEnabled: false });

test('serves the static portfolio with Tailwind CSS', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(t('en', 'pageTitle'));
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    profile.name,
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'box-sizing',
    'border-box',
  );
});

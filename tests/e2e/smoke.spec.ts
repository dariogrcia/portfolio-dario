import { expect, test } from '@playwright/test';
import pkg from '../../package.json' with { type: 'json' };

const { name } = pkg;

test.use({ javaScriptEnabled: false });

test('serves the static placeholder with Tailwind CSS', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(name);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS(
    'box-sizing',
    'border-box',
  );
});

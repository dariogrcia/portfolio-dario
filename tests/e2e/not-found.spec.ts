import { expect, test } from '@playwright/test';
import { t } from '../../src/i18n/utils';

test('unknown paths get a bilingual, non-indexable 404 page', async ({
  page,
}) => {
  await page.goto('/404/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    t('en', 'notFoundTitle'),
  );
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(
    t('es', 'notFoundTitle'),
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex',
  );
  await expect(
    page.getByRole('link', { name: t('es', 'backHome') }),
  ).toHaveAttribute('href', '/es/');
});

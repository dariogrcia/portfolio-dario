import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// axe injects its test runner; the production pages themselves need no JS.
for (const colorScheme of ['light', 'dark'] as const) {
  test.describe(colorScheme, () => {
    test.use({ colorScheme });
    for (const path of [
      '/',
      '/es/',
      '/projects/ipso/',
      '/es/proyectos/ipso/',
    ]) {
      test(`${path} has no serious or critical accessibility violations`, async ({
        page,
      }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready.then(() => undefined));
        const results = await new AxeBuilder({ page }).analyze();
        const violations = results.violations.filter(
          ({ impact }) => impact === 'serious' || impact === 'critical',
        );
        expect(violations).toEqual([]);
      });
    }
  });
}

import { existsSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { projects } from '../../src/data/contenido';
import { projectDiagrams } from '../../src/i18n/ui';
import { localizedPath, t } from '../../src/i18n/utils';

test.use({ javaScriptEnabled: false });
const site = 'https://portfolio-dario.pages.dev';

for (const lang of ['en', 'es'] as const) {
  for (const project of projects) {
    const path = localizedPath(`/projects/${project.slug}/`, lang);
    test(`${path} serves the case, equivalent locale and approved media`, async ({
      page,
      request,
    }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        project.name,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${site}${path}`,
      );
      for (const [hreflang, targetLang] of [
        ['en', 'en'],
        ['es', 'es'],
        ['x-default', 'en'],
      ] as const) {
        await expect(
          page.locator(`link[hreflang="${hreflang}"]`),
        ).toHaveAttribute(
          'href',
          `${site}${localizedPath(`/projects/${project.slug}/`, targetLang)}`,
        );
      }
      const article = page.getByRole('article', {
        name: project.name,
        exact: true,
      });
      await expect(
        article.getByText(project.status[lang], { exact: true }),
      ).toBeVisible();
      await expect(
        article.getByText(project.summary[lang], { exact: true }),
      ).toBeVisible();
      for (const field of ['role', 'problem', 'solution'] as const) {
        const section = article.getByRole('region', {
          name: t(lang, field),
          exact: true,
        });
        if (project[field]) {
          await expect(
            section.getByText(project[field][lang], { exact: true }),
          ).toBeVisible();
        } else {
          await expect(section).toHaveCount(0);
        }
      }
      const highlights = article.getByRole('region', {
        name: t(lang, 'highlights'),
      });
      if (project.highlights) {
        await expect(highlights.getByRole('listitem')).toHaveText(
          project.highlights[lang],
        );
      } else {
        await expect(highlights).toHaveCount(0);
      }
      await expect(
        article
          .getByRole('region', { name: t(lang, 'technologyStack') })
          .getByRole('listitem'),
      ).toHaveText(project.stack);
      const website = article.getByRole('link', {
        name: t(lang, 'visitWebsite'),
      });
      if (project.url)
        await expect(website).toHaveAttribute('href', project.url);
      else await expect(website).toHaveCount(0);
      await expect(
        article.getByText(t(lang, 'privateRepository'), { exact: true }),
      ).toHaveCount(project.repo === 'private' ? 1 : 0);

      if (
        project.media === 'diagram' &&
        (project.slug === 'ipso' || project.slug === 'nenufar')
      ) {
        const diagram = projectDiagrams[lang][project.slug];
        const svg = article.getByRole('img', { name: diagram.title });
        await expect(svg).toHaveAccessibleDescription(diagram.description);
        await expect(article.locator('img')).toHaveCount(0);
      } else if (project.media === 'screenshots') {
        const available = (['desktop', 'mobile', 'detail'] as const).filter((viewport) =>
          existsSync(
            new URL(
              `../../src/assets/projects/${project.slug}/${viewport}.png`,
              import.meta.url,
            ),
          ),
        );
        await expect(article.locator('img')).toHaveCount(available.length);
        await expect(
          article.getByRole('region', { name: t(lang, 'screenshots') }),
        ).toHaveCount(available.length ? 1 : 0);
        for (const viewport of available) {
          const image = article.getByRole('img', {
            name: `${project.name} — ${t(lang, viewport)}`,
          });
          const src = await image.getAttribute('src');
          expect(src).toMatch(/^\/_astro\//);
          expect((await request.get(src!)).status()).toBe(200);
        }
      } else {
        await expect(article.locator('img, svg')).toHaveCount(0);
      }

      const alternatePath = localizedPath(path, lang === 'en' ? 'es' : 'en');
      const languageLink = page.getByRole('link', {
        name: t(lang, 'switchLanguage'),
      });
      await expect(languageLink).toHaveAttribute('href', alternatePath);
      await languageLink.click();
      await expect(page).toHaveURL(new RegExp(`${alternatePath}$`));
      expect((await page.goto(path))?.status()).toBe(200);
      const back = page.getByRole('link', { name: t(lang, 'backToProjects') });
      await expect(back).toHaveAttribute(
        'href',
        localizedPath('/#projects', lang),
      );
      await back.click();
      await expect(page.locator('#projects')).toBeInViewport();
    });
  }
}

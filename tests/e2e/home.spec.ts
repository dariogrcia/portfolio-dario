import { expect, test } from '@playwright/test';
import {
  aiWorkflow,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../../src/data/contenido';
import { localizedPath, t } from '../../src/i18n/utils';

test.use({ javaScriptEnabled: false });

const sections = [
  ['hero', 'hero'],
  ['experience', 'experience'],
  ['projects', 'projects'],
  ['ai-workflow', 'aiWorkflow'],
  ['skills', 'skills'],
  ['education', 'education'],
  ['contact', 'contact'],
] as const;

for (const lang of ['en', 'es'] as const) {
  const path = localizedPath('/', lang);

  test(`${path} has seven named sections and working anchor navigation`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator('main section')).toHaveCount(7);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      profile.name,
    );

    const navigation = page.getByRole('navigation', {
      name: t(lang, 'mainNavigation'),
    });
    await expect(navigation.getByRole('link')).toHaveCount(7);
    for (const [id, key] of sections) {
      const section = page.locator(`section#${id}`);
      const label = id === 'hero' ? profile.name : t(lang, key);
      await expect(section).toHaveAttribute('aria-labelledby', `${id}-heading`);
      await expect(section).toHaveAccessibleName(label);
      await expect(
        section.getByRole('heading', { level: id === 'hero' ? 1 : 2 }),
      ).toHaveText(label);

      const link = navigation.getByRole('link', {
        name: t(lang, key),
        exact: true,
      });
      await expect(link).toHaveAttribute('href', `${path}#${id}`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${path}#${id}$`));
      await expect(section).toBeInViewport();
    }

    const contactAction = page
      .locator('#hero')
      .getByRole('link', { name: t(lang, 'contactAction'), exact: true });
    await expect(contactAction).toHaveAttribute('href', '#contact');
    await contactAction.click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test(`${path} renders seven ordered project cards with localized case links`, async ({
    page,
  }) => {
    await page.goto(path);
    const cards = page.locator('#projects').getByRole('article');
    await expect(cards).toHaveCount(7);

    for (const [index, project] of projects.entries()) {
      const card = cards.nth(index);
      await expect(card).toHaveAccessibleName(project.name);
      await expect(card.getByRole('heading', { level: 3 })).toHaveText(
        project.name,
      );
      await expect(
        card.getByText(project.status[lang], { exact: true }),
      ).toBeVisible();
      await expect(
        card.getByText(project.summary[lang], { exact: true }),
      ).toBeVisible();
      await expect(
        card
          .getByRole('list', { name: t(lang, 'technologyStack') })
          .getByRole('listitem'),
      ).toHaveText(project.stack);
      await expect(
        card.getByRole('link', {
          name: `${t(lang, 'viewCase')} ${project.name}`,
          exact: true,
        }),
      ).toHaveAttribute(
        'href',
        localizedPath(`/projects/${project.slug}/`, lang),
      );
    }
  });

  test(`${path} renders the approved section content and contact destinations`, async ({
    page,
  }) => {
    await page.goto(path);
    const hero = page.locator('#hero');
    for (const value of [
      profile.title,
      profile.headline,
      profile.summary,
      profile.location,
    ]) {
      await expect(hero.getByText(value[lang], { exact: true })).toBeVisible();
    }

    const entries = page.locator('#experience article');
    await expect(entries).toHaveCount(experience.length);
    for (const [index, entry] of experience.entries()) {
      const article = entries.nth(index);
      await expect(article.getByRole('heading', { level: 3 })).toHaveText(
        entry.company,
      );
      await expect(
        article.getByText(entry.title, { exact: true }),
      ).toBeVisible();
      await expect(
        article.getByText(entry.dates[lang], { exact: true }),
      ).toBeVisible();
      for (const description of entry.description[lang]) {
        await expect(
          article.getByText(description, { exact: true }),
        ).toBeVisible();
      }
    }
    await expect(page.locator('#ai-workflow p')).toHaveText(aiWorkflow[lang]);
    for (const group of skills) {
      await expect(
        page
          .locator('#skills')
          .getByRole('heading', { name: group.name, exact: true }),
      ).toBeVisible();
      for (const item of group.items) {
        await expect(
          page.locator('#skills').getByText(item, { exact: true }),
        ).toBeVisible();
      }
    }
    for (const language of profile.languages) {
      await expect(
        page.locator('#skills').getByText(language[lang], { exact: true }),
      ).toBeVisible();
    }
    for (const entry of education) {
      await expect(
        page
          .locator('#education')
          .getByRole('heading', { level: 3, name: entry.qualification[lang] }),
      ).toBeVisible();
      await expect(
        page
          .locator('#education')
          .getByText(entry.institution[lang], { exact: true }),
      ).toBeVisible();
      await expect(
        page.locator('#education').getByText(entry.dates, { exact: true }),
      ).toBeVisible();
    }
    const contact = page.locator('#contact');
    await expect(contact.getByRole('link')).toHaveCount(3);
    await expect(
      contact.getByRole('link', { name: profile.email }),
    ).toHaveAttribute('href', `mailto:${profile.email}`);
    await expect(
      contact.getByRole('link', { name: t(lang, 'linkedin') }),
    ).toHaveAttribute('href', profile.linkedin);
    await expect(
      contact.getByRole('link', { name: t(lang, 'github') }),
    ).toHaveAttribute('href', profile.github);
  });

  test(`${path} offers the downloadable CV and serves it with status 200`, async ({
    page,
    request,
  }) => {
    await page.goto(path);
    const link = page
      .locator('#hero')
      .getByRole('link', { name: t(lang, 'downloadCv'), exact: true });
    await expect(link).toHaveAttribute('download', '');
    await expect(link).toHaveAttribute(
      'href',
      '/cv/dario-garcia-aguilera-cv-en.pdf',
    );
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  });
}

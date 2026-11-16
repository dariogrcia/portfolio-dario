import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, test } from 'vitest';
import ProjectDetail from '../../src/components/ProjectDetail.astro';
import { projects } from '../../src/data/contenido';
import type { Project } from '../../src/data/types';
import { projectDiagrams } from '../../src/i18n/ui';
import { t } from '../../src/i18n/utils';

describe('Project detail', () => {
  test.each(['en', 'es'] as const)(
    'omits missing optional content, links and media in %s',
    async (lang) => {
      const project: Project = {
        slug: 'minimal',
        name: 'Minimal',
        status: { en: 'Template', es: 'Plantilla' },
        summary: { en: 'Summary', es: 'Resumen' },
        stack: ['Astro'],
        media: 'none',
      };
      const container = await AstroContainer.create();
      const html = await container.renderToString(ProjectDetail, {
        props: { project, lang },
      });
      expect(html).toContain(project.summary[lang]);
      for (const section of [
        'role',
        'problem',
        'solution',
        'highlights',
        'screenshots',
        'diagram',
      ]) {
        expect(html).not.toContain(`id="${section}-heading"`);
      }
      expect(html).not.toContain(t(lang, 'visitWebsite'));
      expect(html).not.toContain(t(lang, 'privateRepository'));
      expect(html).not.toMatch(/<(?:img|svg|script)\b/);

      project.highlights = { en: [], es: [] };
      const emptyHighlights = await container.renderToString(ProjectDetail, {
        props: { project, lang },
      });
      expect(emptyHighlights).not.toContain('id="highlights-heading"');
    },
  );

  for (const lang of ['en', 'es'] as const) {
    for (const project of projects) {
      test(`${project.slug} renders approved optional sections in ${lang}`, async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(ProjectDetail, {
          props: { project, lang },
        });
        expect(html.match(/<h1\b/g)).toHaveLength(1);
        for (const field of [
          'role',
          'problem',
          'solution',
          'highlights',
        ] as const) {
          expect(html.includes(`id="${field}-heading"`)).toBe(
            Boolean(project[field]),
          );
        }
        expect(html.includes(t(lang, 'privateRepository'))).toBe(
          project.repo === 'private',
        );
        expect(html.includes(t(lang, 'visitWebsite'))).toBe(
          Boolean(project.url),
        );
        expect(html).not.toMatch(/href="(?:private|#)"/);
        expect(html).toContain(
          `href="${lang === 'es' ? '/es/' : '/'}#projects"`,
        );

        if (project.slug === 'ipso' || project.slug === 'nenufar') {
          const diagram = projectDiagrams[lang][project.slug];
          expect(diagram.description).toBe(project.solution?.[lang]);
          expect(html).toContain(
            `aria-labelledby="${project.slug}-diagram-title"`,
          );
          expect(html).toContain(
            `aria-describedby="${project.slug}-diagram-description"`,
          );
          expect(html).toContain(diagram.title);
          expect(html).toContain(diagram.description);
          for (const node of diagram.nodes) {
            for (const label of node) expect(html).toContain(label);
          }
        } else {
          expect(html).not.toContain('<svg');
        }
        if (project.media === 'none') expect(html).not.toContain('<img');
      });
    }
  }
});

import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { spanishPhonePattern } from '../helpers/privacy';
import {
  aiWorkflow,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../../src/data/contenido';

const source = readFileSync(
  new URL('../../docs/contenido.md', import.meta.url),
  'utf8',
);
const content = {
  profile,
  experience,
  projects,
  skills,
  education,
  aiWorkflow,
};

function checkContent(value: unknown, path: string): void {
  if (typeof value === 'string') {
    expect(value.trim(), path).not.toBe('');
    // These are internal discriminants, not publishable copy.
    if (!path.endsWith('.media') && !path.endsWith('.repo')) {
      expect(source, path).toContain(value);
    }
    return;
  }

  if (Array.isArray(value)) {
    expect(value.length, path).toBeGreaterThan(0);
    value.forEach((item: unknown, index) =>
      checkContent(item, `${path}[${index}]`),
    );
    return;
  }

  expect(value, path).toBeTypeOf('object');
  expect(value, path).not.toBeNull();
  const record = value as Record<string, unknown>;
  if ('en' in record || 'es' in record) {
    expect(Object.keys(record).sort(), path).toEqual(['en', 'es']);
    expect(typeof record.en, path).toBe(typeof record.es);
    expect(Array.isArray(record.en), path).toBe(Array.isArray(record.es));
    if (Array.isArray(record.en) && Array.isArray(record.es)) {
      expect(record.en.length, path).toBe(record.es.length);
    }
  }
  for (const [key, item] of Object.entries(record)) {
    checkContent(item, `${path}.${key}`);
  }
}

describe('approved portfolio content', () => {
  test.each(Object.entries(content))(
    '%s contains literal source text and complete, non-empty localized fields',
    (name, value) => {
      checkContent(value, name);
    },
  );

  test('keeps the seven projects in D4 order with unique kebab-case slugs', () => {
    const slugs = projects.map((project) => project.slug);
    expect(slugs).toEqual([
      'ipso',
      'vertex-studio',
      'dracontreras',
      'jm-asesores',
      'clinica-psiquiatria',
      'nenufar',
      'upathway',
    ]);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  test.each(projects)(
    '$slug matches its approved project section',
    (project) => {
      const section = source
        .split(`### ${project.slug} — `)[1]
        ?.split('\n##')[0];
      expect(section).toBeDefined();
      const lines = section!.split('\n');
      expect(project.name).toBe(lines[0]?.split(' · ')[0]);
      // The current source has no bilingual project taglines.
      expect(project).not.toHaveProperty('tagline');
      expect(lines).toContain(
        `- Estado: ${project.status.es} / ${project.status.en}`,
      );
      expect(lines).toContain(`- Stack: ${project.stack.join(', ')}`);

      for (const lang of ['en', 'es'] as const) {
        expect(lines).toContain(
          `- Resumen ${lang.toUpperCase()}: ${project.summary[lang]}`,
        );
        for (const [key, label] of [
          ['role', 'Rol'],
          ['problem', 'Problema'],
          ['solution', 'Solución'],
          ['highlights', 'Highlights'],
        ] as const) {
          const prefix = `- ${label} ${lang.toUpperCase()}: `;
          const approved = lines
            .find((line) => line.startsWith(prefix))
            ?.slice(prefix.length);
          const actual = project[key]?.[lang];
          expect(Array.isArray(actual) ? actual.join(' · ') : actual).toBe(
            approved,
          );
        }
      }

      expect(project.url).toBe(
        lines.find((line) => line.startsWith('- URL: '))?.slice(7),
      );
      expect(project.repo).toBe(
        lines.includes('- Repo: privado') ? 'private' : undefined,
      );
    },
  );

  test('keeps enterprise work textual and uses the planned media modes', () => {
    expect(
      projects
        .filter((project) => project.media === 'diagram')
        .map((project) => project.slug),
    ).toEqual(['ipso', 'nenufar']);
    expect(
      projects
        .filter((project) => project.media === 'screenshots')
        .map((project) => project.slug),
    ).toEqual([
      'vertex-studio',
      'dracontreras',
      'jm-asesores',
      'clinica-psiquiatria',
    ]);
    const upathway = projects.find((project) => project.slug === 'upathway');
    expect(upathway?.media).toBe('none');
    expect(upathway).not.toHaveProperty('repo');
    expect(upathway).not.toHaveProperty('url');
    for (const entry of experience) {
      expect(entry).not.toHaveProperty('media');
      expect(entry).not.toHaveProperty('repo');
    }
  });

  test('preserves all experience descriptions in their original language and order', () => {
    expect(experience.map((entry) => entry.company)).toEqual([
      'Solera Holdings',
      'GMV',
      'Vertex Studio',
    ]);
    for (const entry of experience) {
      const section = source
        .split(`### ${entry.company} — ${entry.title}\n`)[1]
        ?.split('\n##')[0];
      expect(section).toBeDefined();
      for (const lang of ['en', 'es'] as const) {
        const text = section!
          .split(`- ${lang.toUpperCase()}:`)[1]
          ?.split('\n- ')[0]
          ?.trim();
        const expected = text?.startsWith('- ')
          ? text.split('\n').map((line) => line.trim().slice(2))
          : [text];
        expect(entry.description[lang]).toEqual(expected);
      }
    }
  });

  test('preserves all skill groups, education and language proficiency', () => {
    const skillLines = source
      .split('## Skills\n')[1]
      ?.split('\n## ')[0]
      ?.trim()
      .split('\n');
    expect(
      skills.map((group) => `- ${group.name}: ${group.items.join(', ')}`),
    ).toEqual(skillLines);
    expect(education).toHaveLength(1);
    for (const entry of education) {
      expect(source).toContain(
        `- ${entry.qualification.es}, ${entry.institution.es}, ${entry.dates} / ${entry.qualification.en}, ${entry.institution.en}`,
      );
    }
    expect(profile.languages).toHaveLength(2);
    for (const language of profile.languages) {
      expect(source).toContain(`- ${language.es} / ${language.en}`);
    }
  });

  test('does not expose telephone numbers or private contact fields', () => {
    const serialized = JSON.stringify(content);
    expect(serialized).not.toMatch(/tel:/i);
    expect(serialized).not.toMatch(spanishPhonePattern);
    expect(serialized).not.toMatch(
      /"(?:phone|telephone|address|postalAddress)"\s*:/i,
    );
  });
});

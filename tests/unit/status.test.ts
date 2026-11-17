import { expect, test } from 'vitest';
import { projects } from '../../src/data/contenido';
import { statusTone } from '../../src/data/status';

test('maps every project status to its badge tone', () => {
  expect(
    Object.fromEntries(projects.map((p) => [p.slug, statusTone(p)])),
  ).toEqual({
    ipso: 'dev',
    'vertex-studio': 'live',
    dracontreras: 'live',
    'jm-asesores': 'live',
    'clinica-psiquiatria': 'template',
    nenufar: 'plan',
  });
});

test('falls back to the neutral tone for unknown statuses', () => {
  expect(statusTone({ status: { en: 'Archived', es: 'Archivado' } })).toBe(
    'plan',
  );
});

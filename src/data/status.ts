import type { Project } from './types';

export type StatusTone = 'live' | 'dev' | 'plan' | 'template' | 'company';

const tones: Record<string, StatusTone> = {
  Live: 'live',
  'In development': 'dev',
  'In planning': 'plan',
  Template: 'template',
  'Company project': 'company',
};

// Visual tone for a project's status badge, keyed on the English label.
export function statusTone(project: Pick<Project, 'status'>): StatusTone {
  return tones[project.status.en] ?? 'plan';
}

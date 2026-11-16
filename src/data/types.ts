export type Localized<T> = { en: T; es: T };

export interface Profile {
  name: string;
  title: Localized<string>;
  location: Localized<string>;
  email: string;
  linkedin: string;
  github: string;
  headline: Localized<string>;
  summary: Localized<string>;
  languages: Localized<string>[];
}

export interface Experience {
  company: string;
  title: string;
  dates: Localized<string>;
  location?: Localized<string>;
  stack?: string[];
  description: Localized<string[]>;
  url?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline?: Localized<string>;
  status: Localized<string>;
  summary: Localized<string>;
  role?: Localized<string>;
  problem?: Localized<string>;
  solution?: Localized<string>;
  highlights?: Localized<string[]>;
  stack: string[];
  url?: string;
  repo?: 'private';
  media: 'screenshots' | 'diagram' | 'none';
}

// The source provides shared English labels and technology names only.
export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Education {
  qualification: Localized<string>;
  institution: Localized<string>;
  dates: string;
}

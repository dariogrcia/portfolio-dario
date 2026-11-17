import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  approach,
  calmFor,
  darkGlowCap,
  palettes,
} from '../../src/scripts/fluidBackground';

type Rgb = [number, number, number];

const css = readFileSync(
  new URL('../../src/styles/global.css', import.meta.url),
  'utf8',
);
const darkBlock = css.slice(css.indexOf('@media (prefers-color-scheme: dark)'));

const token = (block: string, name: string): Rgb => {
  const hex = block.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6});`, 'i'))![1]!;
  const n = Number.parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const luminance = ([r, g, b]: Rgb) => {
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
};

describe('calmFor', () => {
  test('is zero at the top and grows with scroll depth', () => {
    expect(calmFor(0, 800)).toBe(0);
    expect(calmFor(480, 800)).toBeCloseTo(0.275);
  });

  test('is clamped between 0 and 0.55', () => {
    expect(calmFor(-100, 800)).toBe(0);
    expect(calmFor(10_000, 800)).toBe(0.55);
  });
});

describe('approach', () => {
  test('moves a fraction of the way towards the target', () => {
    expect(approach(0, 1, 0.25)).toBe(0.25);
    expect(approach(1, 0, 0.5)).toBe(0.5);
    expect(approach(0.3, 0.3, 0.05)).toBe(0.3);
  });
});

describe('palettes keep text at WCAG AA over the gradient', () => {
  const cases = [
    {
      scheme: 'light',
      block: css,
      // The light glow only mixes towards white, which never lowers contrast.
      backgrounds: [...palettes.light.colors, palettes.light.base],
    },
    {
      scheme: 'dark',
      block: darkBlock,
      backgrounds: [...palettes.dark.colors, palettes.dark.base, darkGlowCap],
    },
  ] as const;

  for (const { scheme, block, backgrounds } of cases) {
    test.each(['ink', 'muted', 'accent'])(`${scheme}: %s`, (name) => {
      const text = token(block, name);
      for (const background of backgrounds) {
        expect(contrast(text, background)).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  test('palette bases match the page background tokens', () => {
    expect(palettes.light.base).toEqual(token(css, 'bg'));
    expect(palettes.dark.base).toEqual(token(darkBlock, 'bg'));
  });
});

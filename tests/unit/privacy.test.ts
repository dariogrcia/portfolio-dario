import { expect, test } from 'vitest';
import { spanishPhonePattern } from '../helpers/privacy';

// Synthetic repetitions: never put private contact data in regression tests.
for (const first of ['6', '7', '8', '9']) {
  const digits = first.repeat(9);
  const grouped = [
    digits,
    `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`,
    `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 7)}-${digits.slice(7)}`,
    `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`,
  ];
  test.each(grouped)(
    'detects synthetic national and international number %s',
    (value) => {
      expect(value).toMatch(spanishPhonePattern);
      expect(`+34 ${value}`).toMatch(spanishPhonePattern);
    },
  );
}

test.each([
  '2026-11-16',
  'Sep 2025 – Present',
  '2024 – 2025',
  '1440×900',
  `asset${'6'.repeat(9)}hash`,
  'ba5078275',
  '1200 630',
])(
  'does not mistake dates, dimensions or identifiers for phones: %s',
  (value) => {
    expect(value).not.toMatch(spanishPhonePattern);
  },
);

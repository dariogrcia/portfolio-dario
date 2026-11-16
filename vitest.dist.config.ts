import { defineConfig } from 'vitest/config';

// This suite requires a fresh production build; ordinary unit tests do not.
export default defineConfig({
  test: {
    include: ['tests/unit/dist.test.ts'],
    environment: 'node',
  },
});

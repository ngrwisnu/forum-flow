import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src'],
      thresholds: {
        'src/helpers': {
          100: true,
        },
        'src/store': {
          functions: 50,
        },
      },
    },
  },
});

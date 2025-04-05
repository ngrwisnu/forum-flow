import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src'],
      exclude: ['src/assets', 'src/data', 'src/types', '**/*.d.ts'],
      thresholds: {
        'src/helpers/**.ts': {
          functions: 90,
        },
        'src/store/**.ts': {
          functions: 50,
        },
      },
    },
  },
});

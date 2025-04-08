import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['src'],
      exclude: ['src/assets', 'src/data', 'src/types', '**/*.d.ts'],
      thresholds: {
        'src/helpers/**.ts': {
          functions: 90,
        },
        'src/store/**': {
          functions: 100,
        },
      },
    },
    setupFiles: 'src/setupTests.ts',
  },
});

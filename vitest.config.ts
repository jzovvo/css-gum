import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '*.config.*',
        'test.mjs',
        'src/**/*.test.ts',
        'src/**/*.spec.ts'
      ],
      all: true,
      clean: true
    }
  }
})
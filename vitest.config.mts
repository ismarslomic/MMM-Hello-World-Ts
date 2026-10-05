import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      logger: fileURLToPath(new URL('./__tests__/unit/mocks/logger.ts', import.meta.url)),
      node_helper: fileURLToPath(new URL('./__tests__/unit/mocks/node-helper.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['__tests__/unit/**/*.test.ts'],
    clearMocks: true,
    reporters: ['junit', ...configDefaults.reporters],
    outputFile: { junit: 'coverage/unit-test-results.xml' },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'lcov'],
    },
  },
})

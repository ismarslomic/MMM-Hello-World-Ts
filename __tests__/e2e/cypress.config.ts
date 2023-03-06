import { defineConfig } from 'cypress'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    video: false,
    supportFile: false,
    specPattern: '__tests__/e2e/**/*.cy.ts',
  },
})

import { defineConfig } from 'cypress';

export default defineConfig({
  // allowCypressEnv: false,

  e2e: {
    baseUrl: 'http://localhost:',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    // implement node event listeners here
  },
});

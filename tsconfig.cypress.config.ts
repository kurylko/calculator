import { defineConfig } from 'cypress';

export default defineConfig({
  extends: './tsconfig.json',

  compilerOptions: {
    outDir: './cypress/dist',
    rootDir: './cypress',
    types: ['cypress'],
  },

  include: ['cypress/**/*.ts', 'cypress/support/**/*.d.ts'],
  exclude: ['node_modules'],

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

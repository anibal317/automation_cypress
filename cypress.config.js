const { defineConfig } = require("cypress");
require('dotenv').config();

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'ISFDyT 27 - Reporting',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: "cypress/reports",
    overwrite: false,
    reportFilename: `[name].html`,
    html: true,
    json: false,
    timestamp: 'mm-dd-yyyy_HH-MM-ss'
  },
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 8000,
  log: false,

  e2e: {
    baseUrl: requiredEnv('BASE_URL'),
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin');
      cypressGrepPlugin(config);

      // Puente automático: pasa todo process.env (cargado por dotenv desde .env)
      // al env de Cypress, sin listar variables individuales.
      config.env = { ...config.env, ...process.env };
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    excludeSpecPattern: ['cypress/e2e/reference/**/*']
  },
});

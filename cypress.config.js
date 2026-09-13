const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'AMP QA Regression Testing',
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
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin');
      cypressGrepPlugin(config);
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    excludeSpecPattern: ['cypress/e2e/reference/**/*']
  },
});

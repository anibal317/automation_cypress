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
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    specPattern: ['cypress/e2e/tests/**/*.{ts,js}']
  },
});

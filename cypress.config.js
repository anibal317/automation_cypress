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

      // Permite imprimir en la terminal desde los specs: cy.task('log', mensaje)
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      // Puente automático: pasa todo process.env (cargado por dotenv desde .env)
      // al env de Cypress, sin listar variables individuales.
      config.env = { ...config.env, ...process.env };

      // @cypress/grep 7.x: el filtro se hace en el evento before:spec
      const grepTags = process.env.grepTags || config.expose?.grepTags;
      if (grepTags) {
        on('before:spec', (spec) => {
          const tags = Array.isArray(grepTags) ? grepTags : [grepTags];
          // El filtro real lo hace registerCypressGrep() en e2e.js
          // Aquí solo logueamos qué spec se ejecuta
          console.log(`[grep] Spec: ${spec.name} — tags: ${tags.join(', ')}`);
        });
      }

      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    excludeSpecPattern: ['cypress/e2e/reference/**/*']
  },
});

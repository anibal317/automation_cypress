/// <reference types="cypress"/>
import POMs from '../pomObjects.js';

describe('Testing de la pagina principal', () => {
  it('Carga la pagina principal', {
    // browser: 'chrome', // Ejecuta/filtra este test para un browser especifico
    // retries: { runMode: 2, openMode: 0 }, // Reintentos por modo
    // env: { featureFlag: true }, // Variables de entorno para este test

    // viewportWidth: 1366,
    // viewportHeight: 768,
    // baseUrl: 'https://anibal317.github.io/testing-testingProject',
    // defaultCommandTimeout: 8000,
    // pageLoadTimeout: 60000,
    // requestTimeout: 5000,
    // responseTimeout: 30000,
    // execTimeout: 60000,
    // taskTimeout: 60000,
    // animationDistanceThreshold: 5,
    // waitForAnimations: true,
    // scrollBehavior: 'top', // 'center' | 'bottom' | 'nearest' | false
    // includeShadowDom: false,
    // numTestsKeptInMemory: 50,
    // redirectionLimit: 20,
    // screenshotOnRunFailure: true,
    // slowTestThreshold: 10000,
    // testIsolation: true,
    // chromeWebSecurity: false,
    // blockHosts: ['*.google-analytics.com'],
    // clientCertificates: [],
    // trashAssetsBeforeRuns: true,
    // keystrokeDelay: 0,

    // tags: ['@smoke', '@regression'], // Opcion de @cypress/grep (plugin)
  }, () => {
    POMs.HomePage.visit();
    POMs.HomePage.title.should('be.visible');
    POMs.HomePage.validateNavItems();
  });

  it('El título principal tiene color negro', () => {
    POMs.HomePage.visit();
    POMs.HomePage.title.should('have.css', 'color').and('be.colored', '#000000');
  });

  it('El header tiene fondo gris oscuro', () => {
    POMs.HomePage.visit();
    cy.get('header').should('have.css', 'background-color').and('be.colored', '#333');
  });

  it('Los articles de Featured Articles tienen borde rojo', () => {
    POMs.HomePage.visit();
    POMs.HomePage.articles.should('have.css', 'border-color').and('be.colored', '#d72626');
  });
});

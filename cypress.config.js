const { defineConfig } = require("cypress"); // Importa la función que define la configuración principal de Cypress.

module.exports = defineConfig({ // Exporta la configuración de Cypress usando la API de definición.
  reporter: 'cypress-mochawesome-reporter', // Usa el reporter de Mochawesome para generar reportes HTML de las ejecuciones.
  reporterOptions: { // Configuración del generador de reportes.
    charts: true, // Muestra gráficos en el reporte final.
    reportPageTitle: 'ISFDyT 27 - Reporting', // Título que aparece en la pestaña del reporte.
    embeddedScreenshots: true, // Incluye capturas dentro del reporte HTML.
    inlineAssets: true, // Guarda los assets del reporte en el mismo archivo para que sea portable.
    saveAllAttempts: false, // Guarda solo el último intento o el resultado final, no todas las reintentos.
    reportDir: "cypress/reports", // Carpeta donde se generan los reportes.
    overwrite: false, // No sobrescribe reportes anteriores.
    reportFilename: `[name].html`, // Nombre del archivo HTML generado.
    html: true, // Genera el reporte en formato HTML.
    json: false, // No genera salida JSON adicional.
    timestamp: 'mm-dd-yyyy_HH-MM-ss' // Agrega fecha y hora al nombre del reporte para diferenciar ejecuciones.
  },
  chromeWebSecurity: false, // Desactiva la seguridad del navegador para evitar bloqueos entre dominios en pruebas.
  defaultCommandTimeout: 8000, // Tiempo máximo por defecto para esperar comandos de Cypress antes de fallar.
  pageLoadTimeout: 8000, // Tiempo máximo para cargar una página antes de marcar error.
  log: false, // Desactiva logs de consola adicionales de Cypress.
  e2e: { // Configuración específica para pruebas end-to-end.
    setupNodeEvents(on, config) { // Hook de inicialización del entorno de Node para plugins.
      require('cypress-mochawesome-reporter/plugin')(on); // Registra el plugin del reporter de Mochawesome.
      const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin'); // Importa el plugin de filtrado por tags/grep.
      cypressGrepPlugin(config); // Inicializa el plugin de grep con la configuración actual.
      return config; // Devuelve la configuración actualizada para que Cypress la use.
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}', // Busca archivos de prueba en la carpeta e2e con extensión .js o .ts.
    excludeSpecPattern: ['cypress/e2e/reference/**/*'] // Excluye specs de referencia o ejemplos del conjunto de pruebas.
  },
});

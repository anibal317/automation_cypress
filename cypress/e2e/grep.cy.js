/// <reference types="cypress" />

describe('Uso de GREP', () => {
    it('smoke - Test basico de humo', { tags: ['@smoke'] }, () => {
        cy.log('Test @smoke: verificando que el sitio carga');
    });

    it('regression - Test de regresion', { tags: ['@regression'] }, () => {
        cy.log('Test @regression: verificando funcionalidad critica');
    });

    it('fast - Test rapido', { tags: ['@fast'] }, () => {
        cy.log('Test @fast: verificacion rapida');
    });

    it('slow - Test lento', { tags: ['@slow'] }, () => {
        cy.log('Test @slow: verificacion completa del flujo');
    });

    it('regression+slow - Test de regresion lento', { tags: ['@regression', '@slow'] }, () => {
        cy.log('Test @regression + @slow: verificacion completa de funcionalidad critica');
    });
});
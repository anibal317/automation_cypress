/// <reference types="cypress"/>
describe('Cypress Automation', () => {
    it('Login Test', () => {
        cy.visit(Cypress.env('loginPage'))
    });
});
/// <reference types="cypress"/>
import POMs from '../pomObjects.js';

//TODO
describe('Página Articulos', () => {
    it('Debería abrir la página de artículos', () => {
        POMs.ArticlesPage.visit();
        cy.url().should('include', '/articles.html');
    });
});
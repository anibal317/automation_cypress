/// <reference types="cypress" />
import POMs from '../pomObjects.js';

describe('Tests de Comandos y Selectores', () => {

  // === CommonElements ===
  describe('CommonElements', () => {
    it('verifyCount - cuenta elementos del nav', () => {
      POMs.HomePage.visit();
      POMs.CommonElements.verifyCount('nav a', 9);
    });

    it('verifyVisible - elemento visible', () => {
      POMs.HomePage.visit();
      POMs.CommonElements.verifyVisible('h1');
    });

    it('verifyTextContains - texto en elemento', () => {
      POMs.HomePage.visit();
      POMs.CommonElements.verifyTextContains('h1', 'Welcome');
    });

    it('clickMainNavLink - click en link del nav', () => {
      POMs.HomePage.visit();
      POMs.CommonElements.clickMainNavLink('Articles');
      POMs.CommonElements.verifyUrlContains('articles');
    });

    it('verifyCss - verifica CSS de elemento', () => {
      POMs.HomePage.visit();
      POMs.CommonElements.verifyCss('header', 'background-color', 'rgb(51, 51, 51)');
    });
  });

  // === Selectores ===
  describe('Selectores', () => {
    it('cy.get() - obtiene elemento por selector CSS', () => {
      POMs.HomePage.visit();
      cy.get('h1').should('exist');
    });

    it('cy.contains() - obtiene elemento por texto', () => {
      POMs.HomePage.visit();
      cy.contains('Welcome to TechInfo Hub').should('be.visible');
    });

    it('cy.find() - obtiene elemento hijo dentro de un padre', () => {
      POMs.HomePage.visit();
      cy.get('nav').find('a').should('have.length', 9);
    });
  });

  // === Aserciones básicas ===
  describe('Aserciones básicas', () => {
    it('should be.visible - elemento visible', () => {
      POMs.HomePage.visit();
      cy.get('h1').should('be.visible');
    });

    it('should contain.text - elemento contiene texto', () => {
      POMs.HomePage.visit();
      cy.get('h1').should('contain.text', 'Welcome');
    });

    it('should have.length - cantidad de elementos', () => {
      POMs.HomePage.visit();
      cy.get('nav a').should('have.length', 9);
    });
  });

  // === Navegación ===
  describe('Navegación', () => {
    it('cy.visit() - navega a una URL', () => {
      POMs.HomePage.visit();
      cy.url().should('include', 'index.html');
    });

    it('cy.url() - obtiene URL actual', () => {
      POMs.HomePage.visit();
      cy.url().should('include', 'index');
    });

    it('cy.go(back) - navega hacia atras', () => {
      POMs.HomePage.visit();
      cy.visit('/articles.html');
      cy.url().should('include', 'articles');
      cy.go('back');
      cy.url().should('include', 'index');
    });
  });

  // === Custom commands ===
  describe('Custom commands', () => {
    it.only('cy.noNewTab() - target _blank navega en misma ventana', () => {
      POMs.HomePage.visit();
      cy.noNewTab();
      cy.get('[data-testid="external-link"]').click();
      cy.url().should('include', 'external.html');
    });

    it('cy.getSelectors() - obtiene selectores de un contenedor', () => {
      POMs.HomePage.visit();
      cy.getSelectors('nav');
    });
  });

  // === Esperas y reintentos ===
  describe('Esperas y reintentos', () => {
    it('cy.wait() - espera un tiempo fijo', () => {
      POMs.HomePage.visit();
      cy.wait(1000);
      cy.get('h1').should('be.visible');
    });

    it('defaultCommandTimeout - timeout por defecto', () => {
      POMs.HomePage.visit();
      cy.get('h1', { timeout: 10000 }).should('be.visible');
    });
  });

  // === Manejo de pestañas/ventanas ===
  describe('Manejo de pestañas/ventanas', () => {
    it('cy.window() - accede a la ventana del navegador', () => {
      POMs.HomePage.visit();
      cy.window().should('have.property', 'location');
    });

    it('cy.stub() - stub de window.open', () => {
      POMs.HomePage.visit();
      cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          win.location.href = url;
        }).as('open');
        win.open('https://example.com');
        expect(win.open).to.be.called;
      });
    });
  });
});

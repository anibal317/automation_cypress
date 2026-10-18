class CommonElementsPage {
  get mainNavLinks() {
    return cy.get('nav a');
  }

  get vcModuleNav() {
    return cy.get('[data-testid="vc-module-nav"]');
  }

  verifyUrlContains(text) {
    cy.url().should('include', text);
  }

  verifyVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  verifyTextContains(selector, text) {
    cy.get(selector).should('contain.text', text);
  }

  verifyCount(selector, count) {
    cy.get(selector).should('have.length', count);
  }

  verifyAttr(selector, attr, value) {
    cy.get(selector).should('have.attr', attr, value);
  }

  verifyCss(selector, property, value) {
    cy.get(selector).should('have.css', property, value);
  }

  clickMainNavLink(text) {
    cy.get('nav a').contains(text).click();
  }

  clickVcModule(module) {
    cy.get(`[data-testid="vc-module-nav"] a[href="videoclub-${module}.html"]`).click();
  }

  verifyFormVisible(formId) {
    cy.get(`#${formId}`).should('be.visible');
  }

  fillInput(id, value) {
    cy.get(`#${id}`).type(value);
  }

  clickButtonByTestid(testid) {
    cy.get(`[data-testid="${testid}"]`).click();
  }

  verifyTextByTestid(testid, text) {
    cy.get(`[data-testid="${testid}"]`).should('contain.text', text);
  }
}

export default new CommonElementsPage();
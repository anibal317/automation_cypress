class HomePage {
  visit() {
    cy.visit('https://example.cypress.io');
  }

  get title() {
    return cy.contains('h1');
  }

  get getStartedButton() {
    return cy.contains('Get started');
  }
}

export default new HomePage();

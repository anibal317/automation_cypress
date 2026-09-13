class HomePage {
  visit() {
    cy.visit('https://anibal317.github.io/testing-testingProject/index.html');
  }

  get title() {
    return cy.get('h1');
  }

  get getStartedButton() {
    return cy.contains('Get started');
  }

  get navLinks() {
    return cy.get('nav a');
  }

  get navItems() {
    return [
      'Home',
      'Articles',
      'About',
      'Products',
      'Services',
      'Video Club',
      'Blog'
    ];
  }

  validateNavItems() {
    this.navItems.forEach((item) => {
      this.navLinks.contains(item).should('be.visible').and('contain.text', item);
    });
  }
}

export default new HomePage();

class HomePage {
  // Abre la página Home usando la ruta configurada para esta pantalla.
  visit() {
    cy.env(['HOME_PATH']).then(({ HOME_PATH }) => {
      cy.visit(HOME_PATH);
    });
  }

  // Devuelve el título principal de la página.
  get title() {
    return cy.get('h1');
  }

  // Devuelve el botón "Get started".
  get getStartedButton() {
    return cy.contains('Get started');
  }

  // Devuelve todos los links del menú de navegación.
  get navLinks() {
    return cy.get('nav a');
  }

  // Lista de textos esperados en la barra de navegación.
  get navItems() {
    return [
      'Home',
      'Articles',
      'About',
      'Products',
      'Services',
      'Video Club',
      'Blog',
    ];
  }

  // Verifica que cada item del nav esté visible y con el texto correcto.
  validateNavItems() {
    this.navItems.forEach((item) => {
      this.navLinks.contains(item).should('be.visible').and('contain.text', item);
    });
  }
}

export default new HomePage();

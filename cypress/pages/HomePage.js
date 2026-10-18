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

  // Devuelve los articles de Featured Articles.
  get articles() {
    return cy.get('.article-grid article');
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
      'Tabs',
      'Blog',
      'Table',
    ];
  }

  // Verifica orden, texto y visibilidad de cada item del nav.
  // - Orden: compara el link de cada posicion contra navItems[index].
  // - Texto: cada link debe contener el texto esperado.
  // - Visibilidad: cada link debe estar visible.
  validateNavItems() {
    const expected = this.navItems;

    // Primero valida que la cantidad de links coincida con lo esperado.
    this.navLinks.should('have.length', expected.length);

    // Luego recorre cada link comparando posicion, texto y visibilidad.
    this.navLinks.each(($link, index) => {
      cy.wrap($link)
        .should('be.visible')
        .and('contain.text', expected[index]);
    });
  }
}

export default new HomePage();

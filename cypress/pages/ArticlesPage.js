class ArticlePage{
  // Abre la página Home usando la ruta configurada para esta pantalla.
  visit() {
      cy.visit('/articles.html');
  }
}

export default new ArticlePage();

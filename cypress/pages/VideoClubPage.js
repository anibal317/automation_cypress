class VideoClubPage {
  visit() {
    cy.visit('/videoclub/videoclub.html');
  }

  // Selectores del formulario de auth
  get authForm() {
    return cy.get('[data-testid="vc-auth-form"]');
  }

  get emailInput() {
    return cy.get('[data-testid="vc-auth-email"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="vc-auth-password"]');
  }

  get submitButton() {
    return cy.get('[data-testid="vc-auth-submit"]');
  }

  get registerButton() {
    return cy.get('[data-testid="vc-register-btn"]');
  }

  get logoutButton() {
    return cy.get('[data-testid="vc-logout-btn"]');
  }

  get authStatus() {
    return cy.get('[data-testid="vc-auth-status"]');
  }

  get authRole() {
    return cy.get('[data-testid="vc-auth-role"]');
  }

  // Selectores de navegación de módulos
  get moduleNav() {
    return cy.get('[data-testid="vc-module-nav"]');
  }

  // Selectores de estadísticas
  get stats() {
    return cy.get('.vc-stats-grid');
  }

  get moviesStat() {
    return cy.get('#vc-stat-movies');
  }

  get customersStat() {
    return cy.get('#vc-stat-customers');
  }

  get rentalsStat() {
    return cy.get('#vc-stat-rentals');
  }

  get stockStat() {
    return cy.get('#vc-stat-stock');
  }

  // Selectores de módulos
  get moviesLink() {
    return cy.get('[data-testid="vc-module-nav"] a[href="videoclub-movies.html"]');
  }

  get customersLink() {
    return cy.get('a[href="videoclub-customers.html"]');
  }

  get rentalsLink() {
    return cy.get('a[href="videoclub-rentals.html"]');
  }

  get usersLink() {
    return cy.get('a[href="videoclub-users.html"]');
  }

  get candybarLink() {
    return cy.get('a[href="videoclub-candybar.html"]');
  }

  // Selectores del catálogo de películas (tabla)
  get searchInput() {
    return cy.get('#vc-search');
  }

  get onlyAvailableToggle() {
    return cy.get('#vc-only-available');
  }

  get moviesTableBody() {
    return cy.get('#vc-movies-body');
  }

  // Selector de la tabla de películas (para los commands genéricos de tabla).
  get tableSelector() {
    return '[data-testid="vc-movies-table"]';
  }

  get moviesTableRows() {
    return cy.get('#vc-movies-body tr');
  }

  // Lista de encabezados esperados en la tabla de películas.
  get moviesTableHeaders() {
    return ['ID', 'Titulo', 'Genero', 'Copias', 'Precio', 'Acciones'];
  }

  // Abre el módulo de películas del videoclub.
  visitMovies() {
    cy.visit('/videoclub/videoclub-movies.html');
  }

  // Filtra el catálogo escribiendo en el buscador.
  searchMovies(text) {
    this.searchInput.clear().type(text);
  }

  // Activa/desactiva el filtro "Solo disponibles".
  toggleOnlyAvailable() {
    this.onlyAvailableToggle.click();
  }

  // Verificar que está autenticado
  isLoggedIn() {
    this.authRole.should('not.contain.text', 'Sin sesion');
  }

  // Verificar que NO está autenticado
  isLoggedOut() {
    this.authRole.should('contain.text', 'Sin sesion');
  }
}

export default new VideoClubPage();

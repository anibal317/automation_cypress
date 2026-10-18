class VideoClubTabsPage {
  // Abre la página de tabs del videoclub.
  visit() {
    cy.visit('/videoclub/videoclub-tabs.html');
  }

  // Abre la página de tabs apuntando directo a un tab por hash (#info/#cast/#rentals).
  visitTab(key) {
    cy.visit(`/videoclub/videoclub-tabs.html#${key}`);
  }

  // Contenedor de los tabs.
  get tabsNav() {
    return cy.get('[data-testid="tabs-nav"]');
  }

  // Todos los tabs.
  get tabs() {
    return cy.get('[role="tab"]');
  }

  // El tab actualmente seleccionado.
  get activeTab() {
    return cy.get('[role="tab"][aria-selected="true"]');
  }

  // El panel visible (los inactivos tienen el atributo hidden).
  get visiblePanel() {
    return cy.get('[role="tabpanel"]:not([hidden])');
  }

  // Datos de los tabs: clave (data-testid), texto del tab y contenido esperado del panel.
  get tabData() {
    return [
      { key: 'info', label: 'Info', content: 'Genero: Sci-Fi · USD 3000.00' },
      { key: 'cast', label: 'Reparto', content: 'Sam Worthington' },
      { key: 'rentals', label: 'Alquileres', content: '3 alquileres activos' },
    ];
  }

  // Devuelve el tab por su clave.
  tab(key) {
    return cy.get(`[data-testid="tab-${key}"]`);
  }

  // Devuelve el panel por su clave.
  panel(key) {
    return cy.get(`[data-testid="tabpanel-${key}"]`);
  }

  // Hace click en un tab por su clave.
  openTab(key) {
    this.tab(key).click();
  }
}

export default new VideoClubTabsPage();

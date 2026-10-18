class TablePage {
  // Abre la página de la tabla con acciones por fila.
  visit() {
    cy.visit('/table.html');
  }

  // La tabla de datos.
  get table() {
    return cy.get('[data-testid="data-table"]');
  }

  // Selector de la tabla (para los commands genéricos de tabla).
  get tableSelector() {
    return '[data-testid="data-table"]';
  }

  // Las filas del cuerpo de la tabla.
  get rows() {
    return cy.get('[data-testid="data-table-body"] tr');
  }

  // Encabezados esperados de la tabla.
  get headers() {
    return ['ID', 'Nombre', 'Email', 'Rol', 'Acciones'];
  }

  // Modal de detalle/edición/borrado.
  get modal() {
    return cy.get('[data-testid="row-modal"]');
  }

  get modalTitle() {
    return cy.get('[data-testid="row-modal-title"]');
  }

  get modalView() {
    return cy.get('[data-testid="row-modal-view"]');
  }

  get editForm() {
    return cy.get('[data-testid="row-edit-form"]');
  }

  get closeButton() {
    return cy.get('[data-testid="row-modal-close"]');
  }
}

export default new TablePage();

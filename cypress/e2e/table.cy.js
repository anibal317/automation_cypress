/// <reference types="cypress" />
import POMs from '../pomObjects.js';

describe('Tabla con acciones por fila', () => {
  beforeEach(() => {
    POMs.TablePage.visit();
  });

  it('Muestra los encabezados esperados (recorrido lento)', () => {
    cy.verifyTableHeaders(POMs.TablePage.tableSelector, POMs.TablePage.headers);
  });

  it('Lista los registros cargados', () => {
    POMs.TablePage.rows.should('have.length', 5);
  });

  it('La acción Ver muestra el detalle del registro', () => {
    // table id desde el POM; dato a buscar y acción escritos en el test.
    cy.clickRowAction(POMs.TablePage.tableSelector, 'Ana Gomez', 'ver');

    POMs.TablePage.modal.should('be.visible');
    POMs.TablePage.modalTitle.should('contain.text', 'Detalle del registro');
    cy.get('[data-testid="row-modal-name"]').should('have.text', 'Ana Gomez');
    cy.get('[data-testid="row-modal-email"]').should('have.text', 'ana@example.com');
  });

  it('La acción Editar precarga el formulario del registro', () => {
    cy.clickRowAction(POMs.TablePage.tableSelector, 'Bruno Diaz', 'editar');

    POMs.TablePage.modalTitle.should('contain.text', 'Editar registro');
    POMs.TablePage.editForm.should('be.visible');
    cy.get('[data-testid="row-edit-name"]').should('have.value', 'Bruno Diaz');
    cy.get('[data-testid="row-edit-email"]').should('have.value', 'bruno@example.com');
  });

  it('La acción Borrar abre la confirmación', () => {
    cy.clickRowAction(POMs.TablePage.tableSelector, 'Carla Ferro', 'borrar');

    POMs.TablePage.modalTitle.should('contain.text', 'Borrar registro');
  });
});

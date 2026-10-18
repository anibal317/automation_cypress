/// <reference types="cypress" />

// Ejemplo: tomar usuarios de un fixture y ejecutar/verificar steps SEGÚN SU ROL.
// (El sitio de prueba no maneja roles reales: es una demo del patrón.)
describe('Ejemplo - steps según el rol', () => {
  it('Evalúa el rol de cada usuario y ejecuta lo que le corresponde', () => {
    cy.fixture('usuarios-roles.json').then((datos) => {
      datos.usuarios.forEach((u) => {
        const cabecera = `=== ${u.email} · rol: ${u.rol} ===`;
        cy.log(cabecera);
        cy.task('log', cabecera);

        // Según el rol, se ejecutan/verifican steps distintos.
        if (u.rol === 'admin') {
          cy.log('Esto controla admin: crear, editar y eliminar');
          cy.task('log', 'Esto controla admin: crear, editar y eliminar');
          // acá irían los steps de admin (cy.visit, click en crear/editar/eliminar...)
        } else if (u.rol === 'editor') {
          cy.log('Esto controla editor: crear y editar');
          cy.task('log', 'Esto controla editor: crear y editar');
        } else {
          cy.log('Esto controla usuario: solo ver');
          cy.task('log', 'Esto controla usuario: solo ver');
        }
      });
    });
  });
});

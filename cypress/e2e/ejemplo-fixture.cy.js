/// <reference types="cypress" />

// Ejemplo simple: cómo TOMAR datos de un fixture e ITERARLOS.
// Lo importante es ver el resultado impreso en la consola (Command Log) de Cypress.
describe('Ejemplo - tomar e iterar un fixture', () => {
  it('Imprime en la consola cada registro del fixture', () => {
    cy.fixture('videoclub-peliculas.json').then((datos) => {
      // El fixture completo llega como objeto; el array está en `datos.data`.
      const peliculas = datos.data;

      cy.log(`El fixture trae ${peliculas.length} películas`);

      // Recorrer el array e imprimir cada item.
      peliculas.forEach((p, i) => {
        const linea = `${i + 1}) ${p.title} · ${p.genre} · ${p.available_copies}/${p.total_copies} · USD ${p.rental_price}`;
        cy.log(linea);      // consola (Command Log) de Cypress
        console.log(linea); // consola del navegador (DevTools)
      });
    });
  });
});

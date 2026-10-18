/// <reference types="cypress" />
import POMs from '../pomObjects.js';

describe('Video Club - Catálogo de películas (fixture)', () => {
  // Datos del fixture que usamos para mockear GET /api/movies
  let peliculas;

  beforeEach(() => {
    cy.fixture('videoclub-peliculas.json').then((fixture) => {
      peliculas = fixture.data;
    });

    // Mockeamos la API para no depender del backend real ni de datos cambiantes.
    cy.intercept('GET', '**/api/movies*', { fixture: 'videoclub-peliculas.json' }).as('getMovies');

    POMs.VideoClubPage.visitMovies();
    cy.wait('@getMovies');
  });

  it('La tabla lista exactamente las películas del fixture', () => {
    POMs.VideoClubPage.moviesTableRows.should('have.length', peliculas.length);
  });

  it('La búsqueda filtra la tabla por título', () => {
    POMs.VideoClubPage.searchMovies('Test Dos');

    POMs.VideoClubPage.moviesTableRows.should('have.length', 1);
    POMs.VideoClubPage.moviesTableBody.should('contain.text', 'Pelicula Test Dos');
  });

  it('El filtro "Solo disponibles" oculta las películas sin stock', () => {
    const disponibles = peliculas.filter((p) => p.available_copies > 0);

    POMs.VideoClubPage.toggleOnlyAvailable();

    POMs.VideoClubPage.onlyAvailableToggle.should('have.attr', 'aria-pressed', 'true');
    POMs.VideoClubPage.moviesTableRows.should('have.length', disponibles.length);
    POMs.VideoClubPage.moviesTableBody.should('not.contain.text', 'Pelicula Test Dos');
  });

  it('La tabla muestra los encabezados esperados (recorrido lento)', () => {
    cy.verifyTableHeaders(POMs.VideoClubPage.tableSelector, POMs.VideoClubPage.moviesTableHeaders);
  });

  it('La tabla lista las películas del fixture con sus datos', () => {
    POMs.VideoClubPage.moviesTableBody.find('tr').should('have.length', peliculas.length);

    // La tabla puede ordenar distinto que el fixture: buscamos cada película por título.
    peliculas.forEach((p) => {
      POMs.VideoClubPage.moviesTableBody
        .contains('td', p.title)
        .parent('tr')
        .within(() => {
          cy.get('td').eq(2).should('have.text', p.genre);
          cy.get('td').eq(3).should('have.text', `${p.available_copies}/${p.total_copies}`);
          cy.get('td').eq(4).should('have.text', `USD ${Number(p.rental_price).toFixed(2)}`);
        });
    });
  });
});

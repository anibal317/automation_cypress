/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

// Ejemplos de POST construyendo el body de DOS formas:
//   1) Datos generados con la librería @faker-js/faker.
//   2) Datos leídos de un fixture JSON.
// La API responde 401 (requiere token); el objetivo es mostrar cómo armar el body.
describe('Video Club - POST /api/movies (data mock)', () => {
  const API = 'https://be-testing-project.vercel.app';
  const MOVIES = `${API}/api/movies`;

  // Helper: hace el POST y valida la respuesta (401 sin token).
  const postPelicula = (body) =>
    cy.request({ method: 'POST', url: MOVIES, failOnStatusCode: false, body }).then((res) => {
      expect(res.status).to.eq(401);
    });

  it('POST con datos generados por faker', () => {
    const body = {
      title: `Pelicula ${faker.word.adjective()} ${faker.word.noun()}`,
      director: faker.person.fullName(),
      genre: faker.music.genre(),
      release_year: faker.number.int({ min: 1980, max: 2026 }),
      rental_price: faker.commerce.price({ min: 1, max: 99 }),
      duration_minutes: faker.number.int({ min: 60, max: 240 }),
    };

    cy.log(`body con faker: ${JSON.stringify(body)}`);
    postPelicula(body);
  });

  it('POST con datos del fixture', () => {
    cy.fixture('videoclub-peliculas.json').then((datos) => {
      const pelicula = datos.data[0];

      const body = {
        title: pelicula.title,
        director: pelicula.director,
        genre: pelicula.genre,
        release_year: pelicula.release_year,
        rental_price: pelicula.rental_price,
        duration_minutes: pelicula.duration_minutes,
      };

      cy.log(`body con fixture: ${JSON.stringify(body)}`);
      postPelicula(body);
    });
  });
});

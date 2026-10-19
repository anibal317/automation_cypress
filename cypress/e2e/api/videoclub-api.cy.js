/// <reference types="cypress" />

// Ejemplos de cada MÉTODO HTTP contra la API del videoclub (reales).
// - GET             -> endpoint público, responde 200.
// - POST/PUT/DELETE -> el backend exige token; sin token responde 401.
//   Usamos failOnStatusCode: false y validamos ese 401.
//   Para probarlos con datos reales: POST /api/auth/login y enviar el token
//   en el header Authorization.
// Nota: cy.intercept() NO intercepta peticiones de cy.request() (solo las de la app).
describe('Video Club - API de películas (ejemplos por método)', () => {
  const API = 'https://be-testing-project.vercel.app';
  const MOVIES = `${API}/api/movies`;

  // Forma esperada de una película.
  const movieSchema = {
    title: 'Movie',
    type: 'object',
    required: ['id', 'title', 'available_copies', 'total_copies', 'rental_price'],
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      director: { type: ['string', 'null'] },
      genre: { type: ['string', 'null'] },
      release_year: { type: ['number', 'null'] },
      description: { type: ['string', 'null'] },
      available_copies: { type: 'number' },
      total_copies: { type: 'number' },
      rental_price: { type: 'string' },
      duration_minutes: { type: ['number', 'null'] },
      created_at: { type: 'string' },
    },
  };

  // Forma esperada de la respuesta completa.
  const responseSchema = {
    title: 'MoviesResponse',
    type: 'object',
    required: ['success', 'data'],
    properties: {
      success: { type: 'boolean' },
      data: { type: 'array', items: movieSchema },
    },
  };

  // ================= GET =================
  describe('GET', () => {
    it('GET /api/movies — listado público (real)', () => {
      cy.request(MOVIES).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers['content-type']).to.include('application/json');
        expect(res.body.success).to.eq(true);
        expect(res.body.data).to.be.an('array');
      });
    });

    it('GET /api — documentación de la API (real)', () => {
      cy.request(`${API}/api`).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.name).to.eq('Video Club API');
        expect(res.body.endpoints.movies).to.include('GET /api/movies');
      });
    });

    it('GET /api/movies — respuesta cumple el JSON schema', () => {
      cy.request(MOVIES).then((res) => {
        expect(res.body).to.be.jsonSchema(responseSchema);
      });
    });
  });

  // ================= POST =================
  describe('POST', () => {
    it('POST /api/movies — crear película (requiere token)', () => {
      cy.request({
        method: 'POST',
        url: MOVIES,
        failOnStatusCode: false,
        body: { title: 'Cypress Movie', genre: 'Drama', rental_price: '5.00' },
      }).then((res) => {
        // Sin token, la API responde 401 (Unauthorized).
        expect(res.status).to.eq(401);
      });
    });
  });

  // ================= PUT =================
  describe('PUT', () => {
    it('PUT /api/movies/:id — actualizar película (requiere token)', () => {
      cy.request({
        method: 'PUT',
        url: `${MOVIES}/23`,
        failOnStatusCode: false,
        body: { title: 'Editada por Cypress' },
      }).then((res) => {
        expect(res.status).to.eq(401);
      });
    });
  });

  // ================= DELETE =================
  describe('DELETE', () => {
    it('DELETE /api/movies/:id — eliminar película (requiere token)', () => {
      cy.request({
        method: 'DELETE',
        url: `${MOVIES}/23`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(401);
      });
    });
  });
});

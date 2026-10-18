/// <reference types="cypress" />

// Validación de la API de películas del videoclub contra un JSON schema.
// Endpoint público: GET {API_URL}/api/movies -> { success, data: [movie, ...] }
describe('Video Club - API de películas (JSON schema)', () => {
  // URL base del backend del videoclub (endpoint público, sin credenciales).
  const API_URL = 'https://be-testing-project.vercel.app/api/movies';

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

  it('La respuesta de GET /api/movies cumple el JSON schema', () => {
    cy.request(API_URL).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.be.jsonSchema(responseSchema);
    });
  });

  it('Cada película del catálogo cumple el schema individual', () => {
    cy.request(API_URL).then((response) => {
      expect(response.body.success).to.eq(true);
      expect(response.body.data).to.be.an('array').and.not.be.empty;

      response.body.data.forEach((movie) => {
        expect(movie).to.be.jsonSchema(movieSchema);
      });
    });
  });
});

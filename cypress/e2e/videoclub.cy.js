/// <reference types="cypress" />
import POMs from '../pomObjects.js';

describe('Video Club - Login', () => {
  beforeEach(() => {
    POMs.VideoClubPage.visit();
  });

  // Tests de UI estática (sin API)
  it('El formulario de login está visible', () => {
    POMs.VideoClubPage.authForm.should('be.visible');
    POMs.VideoClubPage.emailInput.should('be.visible');
    POMs.VideoClubPage.passwordInput.should('be.visible');
    POMs.VideoClubPage.submitButton.should('be.visible');
  });

  it('Estado inicial: Sin sesion', () => {
    POMs.VideoClubPage.authRole.should('contain.text', 'Sin sesion');
    POMs.VideoClubPage.authStatus.should('contain.text', 'Debes iniciar sesion');
  });

  it('Las estadísticas son visibles', () => {
    POMs.VideoClubPage.stats.should('be.visible');
    POMs.VideoClubPage.moviesStat.should('be.visible');
    POMs.VideoClubPage.customersStat.should('be.visible');
    POMs.VideoClubPage.rentalsStat.should('be.visible');
    POMs.VideoClubPage.stockStat.should('be.visible');
  });

  // Tests de login con localStorage mockeado
  describe('Login con localStorage mockeado', () => {
    beforeEach(() => {
      cy.visit('/videoclub/videoclub.html');
      cy.window().then((win) => {
        win.localStorage.setItem('vc_auth_session', JSON.stringify({
          token: 'test-token-123',
          user: { email: 'admin@test.com', role: 'admin' }
        }));
      });
      cy.reload();
    });

    it('Login con credenciales válidas', () => {
      POMs.VideoClubPage.authRole.should('not.contain.text', 'Sin sesion');
      POMs.VideoClubPage.authStatus.should('contain.text', 'Sesion iniciada');
    });

    it('Logout vuelve a estado Sin sesion', () => {
      POMs.VideoClubPage.authRole.should('not.contain.text', 'Sin sesion');
      cy.vcLogout();
      POMs.VideoClubPage.authRole.should('contain.text', 'Sin sesion');
    });

    it('Navegar a módulos del videoclub', () => {
      POMs.CommonElements.clickVcModule('movies');
      POMs.CommonElements.verifyUrlContains('videoclub-movies');
    });
  });
});

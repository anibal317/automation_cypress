/// <reference types="cypress" />
import POMs from '../pomObjects.js';

describe('Video Club - Tabs (WAI-ARIA)', () => {
  beforeEach(() => {
    POMs.VideoClubTabsPage.visit();
  });

  context('Estado inicial', () => {
    it('Arranca con el tab "Info" seleccionado y su panel visible', () => {
      POMs.VideoClubTabsPage.activeTab.should('have.attr', 'data-testid', 'tab-info');
      POMs.VideoClubTabsPage.visiblePanel.should('have.attr', 'data-testid', 'tabpanel-info');
    });

    it('Solo hay un panel visible a la vez', () => {
      POMs.VideoClubTabsPage.visiblePanel.should('have.length', 1);
    });
  });

  // Un test por tab, generado desde el array del POM (data-driven).
  context('Contenido de cada tab', () => {
    POMs.VideoClubTabsPage.tabData.forEach((tab) => {
      it(`El tab "${tab.label}" muestra su panel`, () => {
        POMs.VideoClubTabsPage.openTab(tab.key);

        POMs.VideoClubTabsPage.tab(tab.key).should('have.attr', 'aria-selected', 'true');
        POMs.VideoClubTabsPage.panel(tab.key).should('be.visible').and('contain.text', tab.content);
      });

      it(`Al abrir "${tab.label}" los demás paneles quedan ocultos`, () => {
        POMs.VideoClubTabsPage.openTab(tab.key);

        POMs.VideoClubTabsPage.visiblePanel
          .should('have.length', 1)
          .and('have.attr', 'data-testid', `tabpanel-${tab.key}`);
      });
    });
  });

  context('Deep-link por hash', () => {
    it('Abre directo en el tab indicado por el hash', () => {
      POMs.VideoClubTabsPage.visitTab('cast');

      POMs.VideoClubTabsPage.activeTab.should('have.attr', 'data-testid', 'tab-cast');
      POMs.VideoClubTabsPage.panel('cast').should('be.visible');
    });
  });

  context('Navegación por teclado', () => {
    it('Las flechas mueven la selección entre tabs', () => {
      POMs.VideoClubTabsPage.tab('info').focus();

      cy.realPress('ArrowRight');
      POMs.VideoClubTabsPage.tab('cast').should('have.attr', 'aria-selected', 'true');

      cy.realPress('ArrowRight');
      POMs.VideoClubTabsPage.tab('rentals').should('have.attr', 'aria-selected', 'true');
    });
  });
});

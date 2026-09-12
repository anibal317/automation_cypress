/// <reference types="cypress"/>
import { homePage } from '../pomObjects';

describe('Testing de la pagina principal', () => {
  it('Carga la pagina principal', () => {
    homePage.visit();
    homePage.title.should('be.visible');
  });
});
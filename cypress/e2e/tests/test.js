/// <reference types="cypress"/>

import LoginPage from "../pages/loginPage/loginPage";
import TablePage from "../pages/table/tablePage";

describe('Cypress Automation', () => {
    const loginPage = new LoginPage
    const table = new TablePage()

    it('Login Test', () => {
        cy.visit(Cypress.env('loginPage'))
        loginPage.pageTitle().should('have.text', 'Login Page')
        loginPage.pageText().should('have.text', loginPage.expectedPageText())
        loginPage.inputUsername().clear().type('tomsmith')
        loginPage.inputPwd().clear().type('SuperSecretPassword!')
        loginPage.btnLogin().click()
        loginPage.alertBanner().should('include.text', 'You logged into a secure area!')
        loginPage.pageTitle().should('include.text', 'Secure Area')
        loginPage.pageText().should('include.text', 'Welcome to the Secure Area. When you are done click logout below.')



    });
    it('Invalid Login', () => {
        cy.visit(Cypress.env('loginPage'))
        loginPage.inputUsername().clear().type('user')
        loginPage.inputPwd().clear().type('pwd')
        loginPage.btnLogin().click()
        loginPage.alertBanner().should('include.text', 'Your username is invalid!')

    });

    it.only('Table', () => {
        cy.visit(Cypress.env('table'))
        table.pageTitle().should('include.text', 'Data Tables')

        table.tbl1().find('th').then(($el, index) => {
            expect($el.length).to.be.equal(table.tbl1ExpectedHeaders().length)
        })

        table.tbl1().find('th').each(($el, index) => {
            expect($el.text().trim()).to.be.equal(table.tbl1ExpectedHeaders()[index])
        })

        table.editElement('Smith')
        table.deleteElement('Smith')
    });
});
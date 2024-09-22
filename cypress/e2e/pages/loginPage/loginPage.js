export default class LoginPage {
    pageTitle() {
        return cy.get("div[class='example'] h2");
    }
    pageText(){
        return cy.get('.subheader');
    }
    expectedPageText(){
        return 'This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.'
    }
    inputUsername(){
        return cy.get('#username');
    }
    inputPwd(){
        return cy.get('#password');
    }
    btnLogin(){
        return cy.get("button[type='submit']");
    }
    alertBanner(){
        return cy.get('#flash');
    }

    btnLogOut(){
        return cy.get('.button')
    }
}
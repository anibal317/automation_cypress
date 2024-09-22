export default class TablePage {
    pageTitle() {
        return cy.get("div[class='example'] h3");
    }
    tbl1ExpectedHeaders() {
        return ['Last Name', 'First Name', 'Email', 'Due', 'Web Site', 'Action']
    }
    tbl1() {
        return cy.get('#table1');
    }

    editElement(element){
        return cy.contains(element).parent().find('a[href="#edit"]').click();
    }
    deleteElement(element){
        return cy.contains(element).parent().find('a[href="#delete"]').click();
    }
};

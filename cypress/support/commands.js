// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Intercepts the new tab oppening
Cypress.Commands.add('noNewTab', function () {
    cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
            // Oppening in the same window
            win.location.href = url;
        });
    });
})


Cypress.Commands.add('waitLoading', function (timeOut, interval) {
    cy.waitUntil(() =>
        commonElements.loadingIcon().then($el => $el.prop('hidden') === true),
        {
            timeout: timeOut || 20000, // tiempo máximo de espera en milisegundos
            interval: interval || 500   // intervalo entre intentos en milisegundos
        }
    )
})

Cypress.Commands.add('getSelectors', function (container) {
    // Seleccionar el contenedor
    cy.get(container).then($container => {
        const container = $container[0];
        const elements = container.querySelectorAll('*');
        const uniqueSelectors = new Set();

        elements.forEach(el => {
            if (el.id) {
                uniqueSelectors.add(`#${el.id}`);
            }
            if (el.className) {
                el.classList.forEach(cls => uniqueSelectors.add(`.${cls}`));
            }
            const tagName = el.tagName.toLowerCase();
            uniqueSelectors.add(tagName);
        });

        // Mostrar los selectores únicos en la consola de Cypress
        console.log([...uniqueSelectors].join('\n'));
    });

})
Cypress.Commands.add('getContainerText', (container) => {
    cy.get(container).each($container => {
        console.log(`'${$container.text().trim()}',`)
    });
})
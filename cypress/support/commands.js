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

// Intercepts the new tab opening: stubs window.open and forces
// target="_blank" links to navigate in the same window.
Cypress.Commands.add('noNewTab', function () {
    cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
            win.location.href = url;
        });
    });
    cy.document().then((doc) => {
        doc.querySelectorAll('a[target="_blank"]').forEach((a) => {
            a.setAttribute('data-original-target', a.getAttribute('target'));
            a.removeAttribute('target');
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
        console.log(`'${$container.text().trim()}',`);
    });
})

// Login en el videoclub
Cypress.Commands.add('vcLogin', (email, password) => {
    cy.get('[data-testid="vc-auth-email"]').type(email);
    cy.get('[data-testid="vc-auth-password"]').type(password);
    cy.get('[data-testid="vc-auth-submit"]').click();
})

// Logout en el videoclub
Cypress.Commands.add('vcLogout', () => {
    cy.get('[data-testid="vc-logout-btn"]').click();
})

// Navegar a un módulo del videoclub
Cypress.Commands.add('vcNavigateTo', (module) => {
    cy.get(`a[href="videoclub-${module}.html"]`).click();
})

// Recorre lentamente los encabezados de una tabla y los verifica.
// - tableSelector: selector de la tabla (ej. '[data-testid="vc-movies-table"]')
// - expectedHeaders: array con los textos esperados, en orden
// - delay: pausa (ms) entre cada encabezado para verlo en el runner
Cypress.Commands.add('verifyTableHeaders', (tableSelector, expectedHeaders, delay = 400) => {
    cy.get(`${tableSelector} thead th`).should('have.length', expectedHeaders.length);

    cy.get(`${tableSelector} thead th`).each(($th, index) => {
        cy.wrap($th).should('be.visible');
        cy.log(`Encabezado ${index + 1}/${expectedHeaders.length}: "${$th.text().trim()}"`);
        cy.wrap($th).should('contain.text', expectedHeaders[index]);
        cy.wait(delay); // pausa para recorrer los encabezados "lentamente"
    });
})

// Hace click en una acción (ver/editar/borrar) de la fila que contiene un valor.
// - tableSelector: selector de la tabla (ej. '[data-testid="data-table"]')
// - rowValue: texto de alguna celda de la fila a buscar (nombre, email, id, ...)
// - action: 'ver' | 'editar' | 'borrar' (o 'view' | 'edit' | 'delete')
// Busca el valor en cualquier celda, sube a la fila y clickea el botón con
// [data-action="..."] de esa fila. No depende del número de fila.
Cypress.Commands.add('clickRowAction', (tableSelector, rowValue, action) => {
    const acciones = {
        ver: 'view', view: 'view',
        editar: 'edit', edit: 'edit',
        borrar: 'delete', delete: 'delete',
    };
    const clave = acciones[String(action).toLowerCase()];

    if (!clave) {
        throw new Error(`clickRowAction: acción no soportada "${action}" (usá ver/editar/borrar o view/edit/delete)`);
    }

    cy.get(tableSelector)
        .contains('td', rowValue)
        .parent('tr')
        .find(`[data-action="${clave}"]`)
        .should('be.visible')
        .click();
})
// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // when the exception originated from an unhandled promise
    // rejection, the promise is provided as a third argument
    // you can turn off failing the test in this case
    if (promise) {
        return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})
import 'cypress-mochawesome-reporter/register';
import "cypress-real-events";

import chaiColors from 'chai-colors'
chai.use(chaiColors)

const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()

// Importa chai-json-schema
import chaiJsonSchema from 'chai-json-schema';

// Usa chai-json-schema
chai.use(chaiJsonSchema);

// Alternatively you can use CommonJS syntax:
// require('./commands')
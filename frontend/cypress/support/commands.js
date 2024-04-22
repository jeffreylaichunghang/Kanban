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

Cypress.Commands.add('signin', (email, password) => {
    const baseUrl = Cypress.env('base_url')

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(`${password}{enter}`)

    cy.url().should('include', '/kanbanBoard')

    // check for jwt token from local storage
    cy.getAllLocalStorage().then(result => {
        let localStorage = {}
        localStorage[baseUrl] = {
            'secret_token': result[baseUrl]['secret_token']
        }
        expect(result).to.deep.equal(localStorage)
    })
})

Cypress.Commands.add('signup', ({
    username,
    email,
    password
}) => {
    cy.get('form').within(() => {
        cy.get('input[name="name"]').type(username)
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(password)
    })

    cy.get("div[data-test-id='signup-buttons']").within(() => {
        // cy.get('button').eq(0).contains('p', 'Cancel')
        cy.get('button').eq(1).contains('p', 'Next').click().click().click()
        cy.get('button').eq(1).contains('p', 'Confirm').click()
    })
})

Cypress.Commands.add('callApi', (endpoint, alias, verb = 'GET', body = {}) => {
    const baseUrl = Cypress.env('base_url')
    cy.getAllLocalStorage().then(res => {
        // cy.log(res[baseUrl]['secret_token'])
        cy.request(verb, `api${endpoint}?secret_token=${res[baseUrl]['secret_token']}`, body).as(alias)
    })
})

Cypress.Commands.add('createBoard', (boardName) => {
    cy.get('[data-test-id="new-board-button"]').click()

    cy.get('form').get('input[name="boardName"]').type(boardName)

    cy.get('button[type="submit"]').contains('p', 'Create New Board').click()
})

Cypress.Commands.add('deleteAllBoards', () => {
    cy.callApi('/boards', 'getBoards')

    cy.get('@getBoards').then((res) => {
        cy.wrap(res.body).each((item, i, array) => {
            cy.callApi(`/deleteBoard/${item.id}`, 'deleteBoard', 'DELETE')
        })
    })
})

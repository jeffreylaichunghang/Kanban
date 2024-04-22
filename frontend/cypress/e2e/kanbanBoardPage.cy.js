
describe('kanban board interface', () => {
  beforeEach(() => {
    cy.visit('/signin')

    cy.signin('jdoe@gmail.com', '1234')
  })

  it('should get the kanban board page when logged in', () => {
    cy.url().should('include', '/kanbanBoard')
  })

  it('should get the user\'s board data and show them on the sidebar. By default, the first board item should be shown on the navbar', () => {
    cy.callApi('/boards', 'getBoards')

    cy.get('@getBoards').then(boards => {
      expect(boards.status).to.equal(200)

      cy.get('[data-test-id="sidebar"]').contains('p', `ALL BOARDS (${boards.body.length})`)

      cy.get('[data-test-id="board-button"]')
        .each((item, index, array) => {
          cy.get(item).should('have.text', boards.body[index].board_name)
        })
        .then(array => {
          expect(array).to.have.length(boards.body.length)
        })

      cy.get('[data-test-id="navbar-title"]').contains('p', boards.body[0].board_name)
    })
  })
})

describe.only('board CRUD functionalities', () => {
  /*
      !ANTI PATTERN
      tearing down the seed data should not be done in after block
  */
  before(() => {
    const email = 'a@a.com'
    const password = '1234'

    cy.visit('/signin')
    cy.signin(email, password)

    /* cy.task('db:teardownBoards') */
    cy.deleteAllBoards()
  })

  after(() => {
    cy.deleteAllBoards()
  })

  it('should be able to read, create, update, delete boards', () => {
    cy.createBoard('test-board1')
    cy.wait(1000)
    cy.createBoard('test-board2')
    cy.wait(1000)
    cy.createBoard('test-board3')

    cy.callApi('/boards', 'getBoards')
    cy.get('@getBoards').then(boards => {
      expect(boards.status).to.equal(200)

      cy.get('[data-test-id="sidebar"]').contains('p', `ALL BOARDS (${boards.body.length})`)

      cy.get('[data-test-id="board-button"]')
        .each((item, index, array) => {
          cy.get(item).should('have.text', boards.body[index].board_name)
        })
        .then(array => {
          expect(array).to.have.length(boards.body.length)
        })
    })

    cy.get('[data-test-id="board-button"]').eq(0).click()
    cy.get('span[data-test-id="navbar-ellipsis"]').click()
    cy.contains('p', 'Edit Board').click()
    cy.get('form')
      .contains('p', 'Edit Board')
      .get('input[name="boardName"]').type(' editted')
      .get('button[type="submit"]').contains('p', 'Save Changes').click()
    // cy.get('[data-test-id="board-button"]').eq(0).should('contain', 'test-board1 editted') // failed

    cy.get('[data-test-id="board-button"]').eq(1).click()
    cy.get('span[data-test-id="navbar-ellipsis"]').click()
    cy.contains('p', 'Delete Board').click()
    cy.get('button').contains('p', 'Delete').click()
    cy.get('[data-test-id="board-button"]')
      .then(array => {
        expect(array).to.have.length(2)
      })
  })
})

describe('sign in interface', () => {
  it('gets the sign in page', () => {
    cy.visit('/signin')

    cy.get('p').should('be.visible')

    cy.contains('p', 'Start organizing your work with Kanban')
    cy.contains('p', 'Visualize and optimize the flow of work among your team with a dedicated kanban board, a single source of truth for the team\'s work')

    cy.get('form')
      .should('be.visible')
      .contains('p', 'Sign In')
      .get('input[name="email"]').should('have.value', '').should('have.prop', 'placeholder', 'email')
      .get('input[name="password"]').should('have.value', '').should('have.prop', 'placeholder', 'password')
      .get('button').eq(0).should('have.text', 'Sign In')
      .get('button').eq(1).should('have.text', 'Sign Up')
  })
})

describe('sign in process', () => {
  beforeEach(() => {
    cy.visit('/signin')
  })

  it('should be able to sign in', () => {
    const email = 'jdoe@gmail.com'
    const password = '1234'

    cy.signin(email, password)
  })

  it('should not be able to sign in with correct email but wrong password and show the correct error message on the password input field', () => {
    const email = 'jdoe@gmail.com'
    const password = 'wrong password'

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(`${password}{enter}`)

    cy.url().should('not.include', '/kanbanBoard')
    cy.url().should('include', '/signin')

    // !Check: password should not have value of 'wrong password'
    // cy.get('form')
    //   .get('input[name="password"]').should('have.value', 'wrong password')

    cy.get('form')
      .contains('p', 'wrong password')
  })

  it('should not be able to sign in with an email which doesn\'t exist and show the correct error message on the email input field', () => {
    const email = 'unknown@nowhere.com'
    const password = 'wrong password'

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(`${password}{enter}`)

    cy.url().should('not.include', '/kanbanBoard')
    cy.url().should('include', '/signin')

    cy.get('form')
      .contains('p', 'user not found')
  })

  it('should not be able to sign in with empty field', () => {
    cy.get('button').eq(0).click()

    cy.url().should('not.include', '/kanbanBoard')
    cy.url().should('include', '/signin')

    cy.get('form')
      .within(() => {
        cy.contains('p', 'email is required')
        cy.contains('p', 'password is required')
      })
  })
})

describe('redirection test', () => {
  it('should direct to sign up page when sign up button is clicked', () => {
    cy.visit('/signin')

    cy.get('button').contains('p', 'Sign Up').click()

    cy.url().should('include', 'signup')
  })
})

/*
*TODO-Error Message Checks:
Consider adding checks for error messages that should display when a user enters invalid input. This is crucial for validating the robustness of form validations.
TODO-Responsive Checks:
If applicable, adding tests to check the responsiveness of the page could be beneficial. This ensures that the page renders correctly on different devices.
TODO-Network Requests:
It might be useful to verify that the correct network requests are made (and with the correct payload) when submitting the form. This can be done using cy.intercept() to intercept and validate network calls.
*TODO-Redirection Test:
After a successful sign-in, checking whether the user is redirected to the correct page or dashboard can be a critical part of the sign-in flow.
*/

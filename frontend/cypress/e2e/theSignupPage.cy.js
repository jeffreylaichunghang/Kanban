describe('sign up interface', () => {
  it('should gets the sign up page', () => {
    cy.visit('/signup')
    cy.url().should('include', 'signup')
  })
})

describe('sign up process', () => {
  beforeEach(() => {
    cy.request('GET', '/auth/user/test@gmail.com').then(res => {
      cy.log(res.body?.email)
      if (res.body?.email) {
        cy.request('DELETE', `/auth/user/${res.body.email}`).then(res => {
          cy.log(res.body)
        })
      } else {
        cy.log('no such user')
      }
    })

    cy.visit('/signup')
  })

  it('should be able to sign up a user and log in with the newly registered user', () => {
    const username = 'testuser'
    const email = 'test@gmail.com'
    const password = '12345678'

    cy.signup({
      username,
      email,
      password
    })

    cy.url().should('include', '/signin')

    cy.signin(email, password)
  })

  it('should not be able to sign up an account that already exist', () => {
    const username = 'jdoe'
    const email = 'jdoe@gmail.com'
    const password = '12345678'

    cy.signup({
      username,
      email,
      password
    })

    cy.get('form').within(() => {
      cy.contains('p', 'email already exists')
    })
  })
})

describe('redirection test', () => {
  it('should redirect to sign in page when cancel button is clicked', () => {
    cy.visit('/signup')

    cy.get("div[data-test-id='signup-buttons']").within(() => {
      cy.get('button').eq(0).contains('p', 'Cancel').click()
    })

    cy.url().should('include', '/signin')
  })
})

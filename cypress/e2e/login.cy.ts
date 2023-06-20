before(() => {
  cy.task('seedUsers')
})

beforeEach(() => {
  cy.visit('/login')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Login Page', () => {
  it('verifies form link', () => {
    cy.verifyLink('register-link', '/register')
  })

  it('submits the form with empty input fields and shows error messages', () => {
    cy.wait(100)
    cy.submitForm('login-form')
    cy.getMessage('email-error', 'Email is required')
    cy.getMessage('password-error', 'Password is required')
  })

  it('submits the form with a non-empty email', () => {
    cy.typeInto('email-input', 'john@gmail.com')
    cy.submitForm('login-form')
    cy.getByTestId('email-error').should('not.exist')
  })

  it('submits the form with a non-empty password', () => {
    cy.typeInto('password-input', '12345')
    cy.submitForm('login-form')
    cy.getByTestId('password-error').should('not.exist')
  })

  it('submits the form with invalid credentials and shows an error message', () => {
    cy.typeInto('email-input', 'john@example.com')
    cy.typeInto('password-input', '12345')
    cy.submitForm('login-form')
    cy.getMessage('error-message', 'Invalid credentials')
  })

  it('submits the form with valid input fields and logs the user in', () => {
    cy.intercept('POST', '/api/users/login').as('login')

    cy.typeInto('email-input', 'john@example.com')
    cy.typeInto('password-input', '123456')
    cy.submitForm('login-form')

    cy.getByTestId('error-message').should('not.exist')
    cy.assertDisabled('login-button')

    cy.location('pathname').should('eq', '/')

    cy.wait('@login').then(({ response }) => {
      expect(response.statusCode).to.equal(200)

      cy.getCookie('token').then((cookie) => {
        expect(cookie.secure).to.be.true
        expect(cookie.httpOnly).to.be.true
        expect(cookie.sameSite).to.equal('strict')
      })
    })
  })
})

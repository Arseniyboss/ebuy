before(() => {
  cy.task('seedUsers')
})

beforeEach(() => {
  cy.visit('/register')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Register Page', () => {
  it('verifies login link', () => {
    cy.verifyLink('login-link', '/login')
  })

  it('submits the form with empty input fields and shows error messages', () => {
    cy.wait(100)
    cy.submitForm('register-form')
    cy.getMessage('name-error', 'Username is required')
    cy.getMessage('email-error', 'Email is required')
    cy.getMessage('password-error', 'Password is required')
    cy.getMessage('confirm-password-error', 'Password is required')
  })

  it('submits the form with an invalid name and shows an error message', () => {
    cy.typeInto('name-input', 'John1')
    cy.submitForm('register-form')
    cy.getMessage('name-error', 'Username is invalid')
  })

  it('submits the form with a valid name', () => {
    cy.typeInto('name-input', 'John')
    cy.submitForm('register-form')
    cy.getByTestId('name-error').should('not.exist')
  })

  it('submits the form with an invalid email and shows an error message', () => {
    cy.typeInto('email-input', 'john.gmail.com')
    cy.submitForm('register-form')
    cy.getMessage('email-error', 'Email is invalid')
  })

  it('submits the form with a valid email', () => {
    cy.typeInto('email-input', 'john@gmail.com')
    cy.submitForm('register-form')
    cy.getByTestId('email-error').should('not.exist')
  })

  it('submits the form with an invalid password and shows an error message', () => {
    cy.typeInto('password-input', '12345')
    cy.submitForm('register-form')
    cy.getMessage(
      'password-error',
      'Password must be at least 6 characters long'
    )
  })

  it('submits the form with a valid password', () => {
    cy.typeInto('password-input', '123456')
    cy.submitForm('register-form')
    cy.getByTestId('password-error').should('not.exist')
  })

  it('submits the form with an invalid confirm password and shows an error message', () => {
    cy.typeInto('password-input', '123456')
    cy.typeInto('confirm-password-input', '12345')
    cy.submitForm('register-form')
    cy.getMessage('confirm-password-error', 'Passwords do not match')
  })

  it('submits the form with a valid confirm password', () => {
    cy.typeInto('password-input', '123456')
    cy.typeInto('confirm-password-input', '123456')
    cy.submitForm('register-form')
    cy.getByTestId('confirm-password-error').should('not.exist')
  })

  it('submits the form with valid input fields and an email already in use', () => {
    cy.typeInto('name-input', 'John')
    cy.typeInto('email-input', 'john@gmail.com')
    cy.typeInto('password-input', '123456')
    cy.typeInto('confirm-password-input', '123456')
    cy.submitForm('register-form')
    cy.getMessage('error-message', 'Email is already in use')
  })

  it('submits the form with valid input fields and registers the user', () => {
    cy.intercept('POST', '/api/users/register').as('register')

    cy.typeInto('name-input', 'Bob')
    cy.typeInto('email-input', 'bob@gmail.com')
    cy.typeInto('password-input', '123456')
    cy.typeInto('confirm-password-input', '123456')
    cy.submitForm('register-form')

    cy.getByTestId('error-message').should('not.exist')
    cy.assertDisabled('register-button')
    cy.verifyUrl('/')

    cy.wait('@register').then(({ response }) => {
      expect(response.statusCode).to.equal(201)
      cy.verifyCookie('accessToken')
    })
  })
})

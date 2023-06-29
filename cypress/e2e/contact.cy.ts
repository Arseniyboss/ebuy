before(() => {
  cy.task('seedUsers')
  cy.login({ email: 'john@example.com', password: '123456' })
})

beforeEach(() => {
  cy.visit('/contact')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Contact Page', () => {
  it('gets user details for the logged in user', () => {
    cy.assertValue('name-input', 'John Doe')
    cy.assertValue('email-input', 'john@example.com')
  })

  it('submits the form with empty input fields and shows error messages', () => {
    cy.waitBeforeSubmit()
    cy.submitForm('contact-form')
    cy.getMessage('name-error', 'Username is required')
    cy.getMessage('email-error', 'Email is required')
    cy.getMessage('message-error', 'Message is required')
  })

  it('submits the form with an invalid name and shows an error message', () => {
    cy.typeInto('name-input', 'John1')
    cy.submitForm('contact-form')
    cy.getMessage('name-error', 'Username is invalid')
  })

  it('submits the form with a valid name', () => {
    cy.typeInto('name-input', 'John')
    cy.submitForm('contact-form')
    cy.getByTestId('name-error').should('not.exist')
  })

  it('submits the form with an invalid email and shows an error message', () => {
    cy.typeInto('email-input', 'john.gmail.com')
    cy.submitForm('contact-form')
    cy.getMessage('email-error', 'Email is invalid')
  })

  it('submits the form with a valid email', () => {
    cy.typeInto('email-input', 'john@gmail.com')
    cy.submitForm('contact-form')
    cy.getByTestId('email-error').should('not.exist')
  })

  it('submits the form with a non-empty message', () => {
    cy.typeInto('message-input', 'Test message')
    cy.submitForm('contact-form')
    cy.getByTestId('message-error').should('not.exist')
  })

  describe('submits the form with valid input fields and', () => {
    beforeEach(() => {
      cy.typeInto('name-input', 'John')
      cy.typeInto('email-input', 'john@gmail.com')
      cy.typeInto('message-input', 'Test message')
      cy.submitForm('contact-form')
      cy.assertDisabled('submit-button')
      cy.assertEmpty('message-input')
    })

    it('shows a success message', () => {
      cy.getMessage('success-message', 'Message Sent')
    })

    it('removes success message after 3 seconds ', () => {
      cy.getTemporaryMessage('success-message', 'Message Sent')
    })

    it('when form error occurs removes success message', () => {
      cy.submitForm('contact-form')
      cy.getByTestId('success-message').should('not.exist')
    })
  })
})

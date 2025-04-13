beforeEach(() => {
  cy.task('seedUsers')
  cy.login({ email: 'john@gmail.com', password: '123456' })
  cy.visit('/change-password')
})

afterEach(() => {
  cy.task('deleteUsers')
})

describe('Change Password Page', () => {
  it('submits the form with empty input fields and shows error messages', () => {
    cy.submitForm('password-form')
    cy.getMessage('current-password-error', 'Current password is required')
    cy.getMessage('new-password-error', 'New password is required')
    cy.getMessage('confirm-new-password-error', 'New password is required')
  })

  it('submits the form with an invalid new password and shows an error message', () => {
    cy.typeInto('new-password-input', '12345')
    cy.submitForm('password-form')
    cy.getMessage('new-password-error', 'New password must be at least 6 characters long')
  })

  it('submits the form with a valid new password', () => {
    cy.typeInto('new-password-input', '1234567')
    cy.submitForm('password-form')
    cy.getByTestId('new-password-error').should('not.exist')
  })

  it('submits the form with an invalid confirm new password and shows an error message', () => {
    cy.typeInto('new-password-input', '1234567')
    cy.typeInto('confirm-new-password-input', '123456')
    cy.submitForm('password-form')
    cy.getMessage('confirm-new-password-error', 'Passwords do not match')
  })

  it('submits the form with a valid confirm new password', () => {
    cy.typeInto('new-password-input', '1234567')
    cy.typeInto('confirm-new-password-input', '1234567')
    cy.submitForm('password-form')
    cy.getByTestId('confirm-new-password-error').should('not.exist')
  })

  it('submits the form with an invalid current password', () => {
    cy.typeInto('current-password-input', '12345')
    cy.typeInto('new-password-input', '1234567')
    cy.typeInto('confirm-new-password-input', '1234567')
    cy.submitForm('password-form')
    cy.getMessage('error-message', 'Current password is invalid')
  })

  it('submits the form with valid input fields and updates user password', () => {
    cy.intercept('PUT', '/api/users/user/change-password').as('updateUserPassword')

    cy.typeInto('current-password-input', '123456')
    cy.typeInto('new-password-input', '1234567')
    cy.typeInto('confirm-new-password-input', '1234567')

    cy.submitForm('password-form')

    cy.wait('@updateUserPassword').then(({ response }) => {
      expect(response.statusCode).to.equal(200)
      cy.getMessage('success-message', 'Password Updated')
      cy.logout()
      cy.login({ email: 'john@gmail.com', password: '1234567' })
    })
  })
})

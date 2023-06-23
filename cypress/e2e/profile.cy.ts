beforeEach(() => {
  cy.task('seedUsers')
  cy.login({ email: 'john@example.com', password: '123456' })
  cy.visit('/profile')
})

afterEach(() => {
  cy.task('deleteUsers')
})

describe('Profile Page', () => {
  it('gets user details', () => {
    cy.assertValue('name-input', 'John Doe')
    cy.assertValue('email-input', 'john@example.com')
  })

  describe('tests name input', () => {
    it('does not update the user with an invalid name', () => {
      cy.clearInput('name-input')
      cy.typeInto('name-input', 'John1')
      cy.submitForm('profile-form')
      cy.getMessage('name-error', 'Username is invalid')
    })

    it('updates the user with a valid name', () => {
      cy.intercept('PUT', '/api/users/user').as('updateUser')

      cy.clearInput('name-input')
      cy.typeInto('name-input', 'John')
      cy.submitForm('profile-form')

      cy.getByTestId('name-error').should('not.exist')
      cy.assertDisabled('update-button')
      cy.assertText('user-initials', 'J')

      cy.getMessage('success-message', 'Profile Updated')
      cy.verifyUserUpdate('name-input', 'John')
    })
  })

  describe('tests email input', () => {
    it('does not update the user with an invalid email', () => {
      cy.clearInput('email-input')
      cy.typeInto('email-input', 'john.gmail.com')
      cy.submitForm('profile-form')
      cy.getMessage('email-error', 'Email is invalid')
    })

    it('does not update the user with an email already in use', () => {
      cy.clearInput('email-input')
      cy.typeInto('email-input', 'jane@example.com')
      cy.submitForm('profile-form')
      cy.getMessage('error-message', 'Email is already in use')
    })

    it('updates the user with a valid email', () => {
      cy.intercept('PUT', '/api/users/user').as('updateUser')

      cy.clearInput('email-input')
      cy.typeInto('email-input', 'johndoe@example.com')
      cy.submitForm('profile-form')

      cy.getByTestId('email-error').should('not.exist')
      cy.assertDisabled('update-button')

      cy.getMessage('success-message', 'Profile Updated')
      cy.verifyUserUpdate('email-input', 'johndoe@example.com')
    })
  })

  describe('tests password input', () => {
    it('does not update the user with an invalid password', () => {
      cy.clearInput('password-input')
      cy.typeInto('password-input', '12345')
      cy.submitForm('profile-form')
      cy.getMessage(
        'password-error',
        'Password must contain at least 8 characters including at least one letter and number'
      )
    })

    it('updates the user with a valid password', () => {
      cy.intercept('PUT', '/api/users/user').as('updateUser')

      cy.clearInput('password-input')
      cy.typeInto('password-input', 'john12345')
      cy.submitForm('profile-form')

      cy.getByTestId('password-error').should('not.exist')
      cy.assertDisabled('update-button')

      cy.getMessage('success-message', 'Profile Updated')

      cy.logout()
      cy.login({ email: 'john@example.com', password: 'john12345' })
    })
  })

  describe('after 3 seconds', () => {
    it('removes success message', () => {
      cy.waitBeforeSubmit()
      cy.submitForm('profile-form')
      cy.getTemporaryMessage('success-message', 'Profile Updated')
    })

    it('removes error message', () => {
      cy.clearInput('email-input')
      cy.typeInto('email-input', 'jane@example.com')
      cy.submitForm('profile-form')
      cy.getTemporaryMessage('error-message', 'Email is already in use')
    })
  })

  describe('when form error occurs', () => {
    it('removes server success message', () => {
      cy.waitBeforeSubmit()
      cy.submitForm('profile-form')
      cy.getMessage('success-message', 'Profile Updated')

      cy.typeInto('password-input', '123')
      cy.submitForm('profile-form')
      cy.getByTestId('success-message').should('not.exist')
    })

    it('removes server error message', () => {
      cy.clearInput('email-input')
      cy.typeInto('email-input', 'jane@example.com')
      cy.submitForm('profile-form')
      cy.getMessage('error-message', 'Email is already in use')

      cy.typeInto('password-input', '123')
      cy.submitForm('profile-form')
      cy.getByTestId('error-message').should('not.exist')
    })
  })
})

beforeEach(() => {
  cy.task('seedUsers')
  cy.login({ email: 'john@gmail.com', password: '123456' })
  cy.visit('/profile')
})

afterEach(() => {
  cy.task('deleteUsers')
})

describe('Profile Page', () => {
  it('gets user details', () => {
    cy.getUser().then((response) => {
      const { status, body: user } = response

      expect(status).to.equal(200)

      cy.assertValue('name-input', user.name)
      cy.assertValue('email-input', user.email)
    })
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
      cy.typeInto('email-input', 'jane@gmail.com')
      cy.submitForm('profile-form')
      cy.getMessage('error-message', 'Email is already in use')
    })

    it('updates the user with a valid email', () => {
      cy.intercept('PUT', '/api/users/user').as('updateUser')

      cy.clearInput('email-input')
      cy.typeInto('email-input', 'johndoe@gmail.com')
      cy.submitForm('profile-form')

      cy.getByTestId('email-error').should('not.exist')
      cy.assertDisabled('update-button')

      cy.getMessage('success-message', 'Profile Updated')
      cy.verifyUserUpdate('email-input', 'johndoe@gmail.com')
    })
  })

  describe('after 3 seconds', () => {
    it('removes success message', () => {
      cy.submitForm('profile-form')
      cy.getTemporaryMessage('success-message', 'Profile Updated')
    })

    it('removes error message', () => {
      cy.clearInput('email-input')
      cy.typeInto('email-input', 'jane@gmail.com')
      cy.submitForm('profile-form')
      cy.getTemporaryMessage('error-message', 'Email is already in use')
    })
  })

  describe('when form error occurs', () => {
    it('removes success message', () => {
      cy.submitForm('profile-form')
      cy.getMessage('success-message', 'Profile Updated')

      cy.clearInput('email-input')
      cy.typeInto('email-input', 'john.gmail.com')

      cy.submitForm('profile-form')
      cy.getByTestId('success-message').should('not.exist')
    })

    it('removes server error message', () => {
      cy.clearInput('email-input')
      cy.typeInto('email-input', 'jane@gmail.com')

      cy.submitForm('profile-form')
      cy.getMessage('error-message', 'Email is already in use')

      cy.clearInput('email-input')
      cy.typeInto('email-input', 'john.gmail.com')

      cy.submitForm('profile-form')
      cy.getByTestId('error-message').should('not.exist')
    })
  })
})

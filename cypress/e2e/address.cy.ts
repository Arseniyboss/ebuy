before(() => {
  cy.task('seedUsers')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Address Page', () => {
  describe('given the user address already exists', () => {
    it('gets the user address', () => {
      cy.login({ email: 'kyle@gmail.com', password: '123456' })
      cy.visit('/address')

      cy.getUser().then((response) => {
        const { status, body } = response
        const { street, country, city, postalCode } = body.address

        expect(status).to.equal(200)

        cy.assertValue('street-input', street)
        cy.assertValue('country-input', country)
        cy.assertValue('city-input', city)
        cy.assertValue('postal-code-input', postalCode)
      })
    })
  })

  describe('given the user address does not exist', () => {
    beforeEach(() => {
      cy.login({ email: 'jane@gmail.com', password: '123456' })
      cy.visit('/address')
    })

    it('submits the form with empty input fields and shows error messages', () => {
      cy.waitBeforeSubmit()
      cy.submitForm('address-form')
      cy.getMessage('street-error', 'Street is required')
      cy.getMessage('country-error', 'Country is required')
      cy.getMessage('city-error', 'City is required')
      cy.getMessage('postal-code-error', 'Postal Code is required')
    })

    it('submits the form with an invalid street and shows an error message', () => {
      cy.typeInto('street-input', 'Street!')
      cy.submitForm('address-form')
      cy.getMessage('street-error', 'Street is invalid')
    })

    it('submits the form with a valid street', () => {
      cy.typeInto('street-input', 'Street')
      cy.submitForm('address-form')
      cy.getByTestId('street-error').should('not.exist')
    })

    it('submits the form with an invalid country and shows an error message', () => {
      cy.typeInto('country-input', 'Country123')
      cy.submitForm('address-form')
      cy.getMessage('country-error', 'Country is invalid')
    })

    it('submits the form with a valid country', () => {
      cy.typeInto('country-input', 'Country')
      cy.submitForm('address-form')
      cy.getByTestId('country-error').should('not.exist')
    })

    it('submits the form with an invalid city and shows an error message', () => {
      cy.typeInto('city-input', 'City123')
      cy.submitForm('address-form')
      cy.getMessage('city-error', 'City is invalid')
    })

    it('submits the form with a valid city', () => {
      cy.typeInto('city-input', 'City')
      cy.submitForm('address-form')
      cy.getByTestId('city-error').should('not.exist')
    })

    it('submits the form with an invalid postal code and shows an error message', () => {
      cy.typeInto('postal-code-input', 'Postal Code!')
      cy.submitForm('address-form')
      cy.getMessage('postal-code-error', 'Postal Code is invalid')
    })

    it('submits the form with a valid postal code', () => {
      cy.typeInto('postal-code-input', 'Postal Code')
      cy.submitForm('address-form')
      cy.getByTestId('postal-code-error').should('not.exist')
    })

    it('submits the form with valid input fields and gets the new user address', () => {
      cy.intercept('PUT', '/api/checkout/address').as('setAddress')

      cy.typeInto('street-input', 'Street')
      cy.typeInto('country-input', 'Country')
      cy.typeInto('city-input', 'City')
      cy.typeInto('postal-code-input', 'Postal Code')
      cy.submitForm('address-form')

      cy.assertDisabled('continue-button')
      cy.verifyUrl('/payment')

      cy.wait('@setAddress').then(({ response }) => {
        expect(response.statusCode).to.equal(201)

        cy.visit('/address')

        cy.assertValue('street-input', 'Street')
        cy.assertValue('country-input', 'Country')
        cy.assertValue('city-input', 'City')
        cy.assertValue('postal-code-input', 'Postal Code')
      })
    })
  })
})

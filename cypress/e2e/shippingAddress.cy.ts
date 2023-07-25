before(() => {
  cy.task('seedUsers')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Shipping Address Page', () => {
  describe('given the shipping address already exists', () => {
    it('gets user address', () => {
      cy.login({ email: 'kyle@gmail.com', password: '123456' })
      cy.visit('/shippingAddress')

      cy.getUser().then((response) => {
        const { status, body } = response
        const { address, country, city, postalCode } = body.shippingAddress

        expect(status).to.equal(200)

        cy.assertValue('address-input', address)
        cy.assertValue('country-input', country)
        cy.assertValue('city-input', city)
        cy.assertValue('postal-code-input', postalCode)
      })
    })
  })

  describe('given the shipping address does not exist', () => {
    beforeEach(() => {
      cy.login({ email: 'jane@gmail.com', password: '123456' })
      cy.visit('/shippingAddress')
    })

    it('submits the form with empty input fields and shows error messages', () => {
      cy.waitBeforeSubmit()
      cy.submitForm('shipping-address-form')
      cy.getMessage('address-error', 'Address is required')
      cy.getMessage('country-error', 'Country is required')
      cy.getMessage('city-error', 'City is required')
      cy.getMessage('postal-code-error', 'Postal Code is required')
    })

    it('submits the form with an invalid address and shows an error message', () => {
      cy.typeInto('address-input', 'Address!')
      cy.submitForm('shipping-address-form')
      cy.getMessage('address-error', 'Address is invalid')
    })

    it('submits the form with a valid address', () => {
      cy.typeInto('address-input', 'Address')
      cy.submitForm('shipping-address-form')
      cy.getByTestId('address-error').should('not.exist')
    })

    it('submits the form with an invalid country and shows an error message', () => {
      cy.typeInto('country-input', 'Country123')
      cy.submitForm('shipping-address-form')
      cy.getMessage('country-error', 'Country is invalid')
    })

    it('submits the form with a valid country', () => {
      cy.typeInto('country-input', 'Country')
      cy.submitForm('shipping-address-form')
      cy.getByTestId('country-error').should('not.exist')
    })

    it('submits the form with an invalid city and shows an error message', () => {
      cy.typeInto('city-input', 'City123')
      cy.submitForm('shipping-address-form')
      cy.getMessage('city-error', 'City is invalid')
    })

    it('submits the form with a valid city', () => {
      cy.typeInto('city-input', 'City')
      cy.submitForm('shipping-address-form')
      cy.getByTestId('city-error').should('not.exist')
    })

    it('submits the form with an invalid postal code and shows an error message', () => {
      cy.typeInto('postal-code-input', 'Postal Code!')
      cy.submitForm('shipping-address-form')
      cy.getMessage('postal-code-error', 'Postal Code is invalid')
    })

    it('submits the form with a valid postal code', () => {
      cy.typeInto('postal-code-input', 'Postal Code')
      cy.submitForm('shipping-address-form')
      cy.getByTestId('postal-code-error').should('not.exist')
    })

    it('submits the form with valid input fields and gets new user address', () => {
      cy.intercept('PUT', '/api/checkout/shippingAddress').as(
        'addShippingAddress'
      )

      cy.typeInto('address-input', 'Address')
      cy.typeInto('country-input', 'Country')
      cy.typeInto('city-input', 'City')
      cy.typeInto('postal-code-input', 'Postal Code')
      cy.submitForm('shipping-address-form')

      cy.assertDisabled('continue-button')
      cy.verifyUrl('/paymentMethod')

      cy.wait('@addShippingAddress').then(({ response }) => {
        expect(response.statusCode).to.equal(201)

        cy.visit('/shippingAddress')

        cy.assertValue('address-input', 'Address')
        cy.assertValue('country-input', 'Country')
        cy.assertValue('city-input', 'City')
        cy.assertValue('postal-code-input', 'Postal Code')
      })
    })
  })
})

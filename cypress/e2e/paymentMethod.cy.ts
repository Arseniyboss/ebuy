before(() => {
  cy.task('seedUsers')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Payment Method Page', () => {
  describe('given the payment method already exists', () => {
    it('gets the payment method', () => {
      cy.login({ email: 'robert@gmail.com', password: '123456' })
      cy.visit('/paymentMethod')
      cy.assertChecked('stripe-input')
    })
  })

  describe('given the payment method does not exist', () => {
    beforeEach(() => {
      cy.login({ email: 'kyle@gmail.com', password: '123456' })
      cy.visit('/paymentMethod')
    })

    it('submits the form without payment method and shows an error message', () => {
      cy.waitBeforeSubmit()
      cy.submitForm('payment-method-form')
      cy.getMessage('form-error', 'Payment method is required')
    })

    it('submits the form with a payment method and gets the new payment method', () => {
      cy.intercept('PUT', '/api/checkout/paymentMethod').as('addPaymentMethod')

      cy.getByTestId('paypal-input').check()
      cy.submitForm('payment-method-form')

      cy.assertDisabled('continue-button')
      cy.verifyUrl('/placeOrder')

      cy.wait('@addPaymentMethod').then(({ response }) => {
        expect(response.statusCode).to.equal(201)

        cy.visit('/paymentMethod')
        cy.assertChecked('paypal-input')
      })
    })
  })
})

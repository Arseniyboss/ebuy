before(() => {
  cy.task('seedUsers')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Payment Method Page', () => {
  describe('given the payment method already exists', () => {
    beforeEach(() => {
      cy.login({ email: 'robert@gmail.com', password: '123456' })
      cy.visit('/payment')
    })

    it('gets checkout steps', () => {
      cy.verifyLink('address-link', '/address')
      cy.verifyLink('order-review-link', '/order/review')
    })

    it('gets the payment method', () => {
      cy.assertChecked('stripe-input')
    })
  })

  describe('given the payment method does not exist', () => {
    beforeEach(() => {
      cy.login({ email: 'kyle@gmail.com', password: '123456' })
      cy.visit('/payment')
    })

    it('gets checkout steps', () => {
      cy.verifyLink('address-link', '/address')
      cy.assertDisabledLink('order-review-link')
    })

    it('submits the form without payment method and shows an error message', () => {
      cy.waitBeforeSubmit()
      cy.submitForm('payment-method-form')
      cy.getMessage('form-error', 'Payment method is required')
    })

    it('submits the form with a payment method and gets the new payment method', () => {
      cy.intercept('PUT', '/api/checkout/payment').as('setPaymentMethod')

      cy.getByTestId('paypal-input').check()
      cy.submitForm('payment-method-form')

      cy.assertDisabled('continue-button')
      cy.verifyUrl('/order/review')

      cy.wait('@setPaymentMethod').then(({ response }) => {
        expect(response.statusCode).to.equal(201)

        cy.visit('/payment')
        cy.assertChecked('paypal-input')
      })
    })
  })
})

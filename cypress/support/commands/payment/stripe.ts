import { getCardExpiry } from '@/utils/getters/getCardExpiry'

Cypress.Commands.add('payWithStripe', () => {
  const cardExpiry = getCardExpiry()

  cy.getByTestId('stripe-button').click()

  cy.get('#email').type('john@gmail.com')
  cy.get('#cardNumber').type('4242 4242 4242 4242')
  cy.get('#cardExpiry').type(cardExpiry)
  cy.get('#cardCvc').type('424')
  cy.get('#billingName').type('John')
  cy.get('.SubmitButton').click()

  cy.wait('@stripePaymentSuccess', { timeout: 10000 })

  cy.wait(1000)
})

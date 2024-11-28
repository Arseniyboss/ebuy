import { isLocalTest } from 'utils/isLocalTest'

type PayPal = {
  window: {
    document: Document
  }
}

const paypal: PayPal = {
  window: {
    document: null,
  },
}

Cypress.Commands.add('getIframeBody', { prevSubject: 'element' }, ($iframe) => {
  cy.wrap($iframe.contents().find('body'))
})

Cypress.Commands.add('capturePayPalWindow', () => {
  const payPalWindow = cy.get('iframe').eq(0).its('0.contentWindow')
  const window = isLocalTest() ? cy.window() : payPalWindow

  window.then((win) => {
    cy.stub(win, 'open').callsFake((...params) => {
      paypal.window = open(...params)
      return paypal.window
    })
  })
})

Cypress.Commands.add('clickPayPalButton', () => {
  const index = isLocalTest() ? 1 : 0
  cy.get('iframe').eq(index).getIframeBody().click()
})

Cypress.Commands.add('getPayPalWindow', () => {
  const window = Cypress.$(paypal.window.document)
  cy.wrap(window.contents().find('body'))
})

Cypress.Commands.add('payWithPayPal', (email, password) => {
  cy.waitPayPalLoading()
  cy.getPayPalWindow().find('#email').type(email)
  cy.getPayPalWindow().find('#btnNext').click()
  cy.getPayPalWindow().find('#password').type(password)
  cy.getPayPalWindow().find('#btnLogin').click()
  cy.waitPayPalLoading()
  cy.getPayPalWindow().find('#payment-submit-btn').click()
  cy.waitPayPalLoading()
})

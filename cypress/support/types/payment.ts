declare global {
  namespace Cypress {
    interface Chainable {
      getIframeBody(): Chainable<Element>
      capturePayPalWindow(): Chainable<Element>
      clickPayPalButton(): Chainable<Element>
      getPayPalWindow(): Chainable<JQuery>
      payWithPayPal(email: string, password: string): Chainable<Element>
      payWithStripe(): Chainable<Element>
    }
  }
}

export {}

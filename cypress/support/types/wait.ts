declare global {
  namespace Cypress {
    interface Chainable {
      waitDebounce(): Chainable<Element>
      waitSelect(): Chainable<Element>
      waitCypressLoading(): Chainable<Element>
    }
  }
}

export {}

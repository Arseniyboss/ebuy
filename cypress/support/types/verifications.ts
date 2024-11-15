declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<Element>
      getMessage(testId: string, value: string, index?: number): Chainable<Element>
      verifyUrl(url: string): Chainable<Element>
      verifyProtectedUrl(url: string): Chainable<Element>
      verifyLink(dataId: string, url: string): Chainable<Element>
      verifyNavLink(dataId: string, url: string): Chainable<Element>
      verifyFirstDynamicLink(testId: string, url: string): Chainable<Element>
      verifySort(prices: number[]): Chainable<Element>
      verifyCookie(name: string): Chainable<Element>
      verifyUserUpdate(input: string, value: string): Chainable<Element>
    }
  }
}

export {}

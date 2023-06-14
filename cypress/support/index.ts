type SelectOption = {
  testId: string
  text: string
  value: string
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<void>
      getImage(testId: string): Chainable<Element>
      typeInto(dataId: string, text: string): Chainable<Element>
      selectOption({ testId, text, value }: SelectOption): Chainable<Element>
      clearInput(dataId: string): Chainable<Element>
      clickButton(dataId: string): Chainable<Element>
      waitDebounce(): Chainable<Element>
      waitSelect(): Chainable<Element>
      verifyNavLink(dataId: string, url: string): Chainable<Element>
      verifyFirstDynamicLink(testId: string, url: string): Chainable<Element>
      verifySort(prices: number[]): Chainable<Element>
    }
  }
}

export {}

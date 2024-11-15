type SelectOptionParams = {
  testId: string
  text: string
  value: string
  index?: number
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<Element>
      typeInto(dataId: string, text: string): Chainable<Element>
      selectOption(params: SelectOptionParams): Chainable<Element>
      clearInput(dataId: string): Chainable<Element>
      submitForm(dataId: string): Chainable<Element>
    }
  }
}

export {}

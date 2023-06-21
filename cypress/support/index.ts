import { UserCredentials } from '../../src/types/api'

type SelectOption = {
  testId: string
  text: string
  value: string
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<void>
      getMessage(testId: string, value: string): Chainable<Element>
      getImage(testId: string): Chainable<Element>
      assertDisabled(testId: string): Chainable<Element>
      typeInto(dataId: string, text: string): Chainable<Element>
      selectOption({ testId, text, value }: SelectOption): Chainable<Element>
      clearInput(dataId: string): Chainable<Element>
      submitForm(dataId: string): Chainable<Element>
      waitDebounce(): Chainable<Element>
      waitSelect(): Chainable<Element>
      verifyUrl(url: string): Chainable<Element>
      verifyLink(dataId: string, url: string): Chainable<Element>
      verifyNavLink(dataId: string, url: string): Chainable<Element>
      verifyFirstDynamicLink(testId: string, url: string): Chainable<Element>
      verifySort(prices: number[]): Chainable<Element>
      verifyCookie(name: string): Chainable<Element>
      login(userCredentials: UserCredentials): Chainable<Element>
    }
  }
}

export {}

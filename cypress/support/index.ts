import { UserLoginParams } from '../../src/types/params'
import { User } from '../../src/types/api'

type SelectOption = {
  testId: string
  text: string
  value: string
  index?: number
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<void>
      getMessage(testId: string, value: string): Chainable<Element>
      getTemporaryMessage(testId: string, value: string): Chainable<Element>
      getImage(testId: string): Chainable<Element>
      assertText(
        testId: string,
        text: string,
        index?: number
      ): Chainable<Element>
      assertValue(
        testId: string,
        value: string,
        index?: number
      ): Chainable<Element>
      assertEmpty(testId: string): Chainable<Element>
      assertLength(testId: string, value: number): Chainable<Element>
      assertDisabled(testId: string): Chainable<Element>
      assertDisabledLink(testId: string): Chainable<Element>
      assertChecked(testId: string): Chainable<Element>
      assertCountInStock(
        productId: string,
        countInStock: number
      ): Chainable<Element>
      typeInto(dataId: string, text: string): Chainable<Element>
      selectOption({
        testId,
        text,
        value,
        index,
      }: SelectOption): Chainable<Element>
      clearInput(dataId: string): Chainable<Element>
      submitForm(dataId: string): Chainable<Element>
      waitDebounce(): Chainable<Element>
      waitSelect(): Chainable<Element>
      waitBeforeSubmit(): Chainable<Element>
      verifyUrl(url: string): Chainable<Element>
      verifyLink(dataId: string, url: string): Chainable<Element>
      verifyNavLink(dataId: string, url: string): Chainable<Element>
      verifyFirstDynamicLink(testId: string, url: string): Chainable<Element>
      verifySort(prices: number[]): Chainable<Element>
      verifyCookie(name: string): Chainable<Element>
      verifyUserUpdate(input: string, value: string): Chainable<Element>
      login(userCredentials: UserLoginParams): Chainable<Element>
      logout(): Chainable<Element>
      getUser(): Chainable<Response<User>>
    }
  }
}

export {}

import { Sort } from '@/types/sort'

declare global {
  namespace Cypress {
    interface Chainable {
      verifyUrl(url: string): Chainable<Element>
      verifyProtectedUrl(url: string): Chainable<Element>
      verifyLink(dataId: string, url: string): Chainable<Element>
      verifyNavLink(dataId: string, url: string): Chainable<Element>
      verifyFirstDynamicLink(testId: string, url: string): Chainable<Element>
      verifySort(sort: Sort): Chainable<Element>
      verifyCookie(name: string): Chainable<Element>
      verifyUserUpdate(input: string, value: string): Chainable<Element>
    }
  }
}

export {}

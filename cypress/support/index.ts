import {
  UserLoginParams,
  UserOrdersQueryParams,
  OrdersQueryParams,
} from '@/types/params'
import { CartItem, User, Order, GetOrdersData } from '@/types/api'
import { Address, PaymentMethod } from '@/types/base/user'

type SelectOptionParams = {
  testId: string
  text: string
  value: string
  index?: number
}

type AssertPaginatedOrdersParams = {
  firstPage: number
  secondPage: number
}

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<Element>
      getMessage(
        testId: string,
        value: string,
        index?: number
      ): Chainable<Element>
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
      assertTotalPrice(items: CartItem[]): Chainable<Element>
      assertDeliveryDate(deliveryDate: string): Chainable<Element>
      assertAddress(address: Address): Chainable<Element>
      assertPaymentMethod(paymentMethod: PaymentMethod): Chainable<Element>
      assertCartItems(cartItem: CartItem[]): Chainable<Element>
      assertOrderItems(orderItems: CartItem[]): Chainable<Element>
      assertOrders(response: Response<GetOrdersData>): Chainable<Element>
      assertFilterOrders(orders: Order[]): Chainable<Element>
      assertPaginatedOrders(
        number: AssertPaginatedOrdersParams
      ): Chainable<Element>
      assertCountInStock(
        productId: string,
        countInStock: number
      ): Chainable<Element>
      typeInto(dataId: string, text: string): Chainable<Element>
      selectOption(params: SelectOptionParams): Chainable<Element>
      clearInput(dataId: string): Chainable<Element>
      submitForm(dataId: string): Chainable<Element>
      waitDebounce(): Chainable<Element>
      waitSelect(): Chainable<Element>
      waitBeforeSubmit(): Chainable<Element>
      verifyUrl(url: string): Chainable<Element>
      verifyProtectedUrl(url: string): Chainable<Element>
      verifyLink(dataId: string, url: string): Chainable<Element>
      verifyNavLink(dataId: string, url: string): Chainable<Element>
      verifyFirstDynamicLink(testId: string, url: string): Chainable<Element>
      verifySort(prices: number[]): Chainable<Element>
      verifyCookie(name: string): Chainable<Element>
      verifyUserUpdate(input: string, value: string): Chainable<Element>
      login(userCredentials: UserLoginParams): Chainable<Element>
      logout(): Chainable<Element>
      getUser(): Chainable<Response<User>>
      getOrder(id: string): Chainable<Response<Order>>
      getUserOrders(
        queryParams?: UserOrdersQueryParams
      ): Chainable<Response<GetOrdersData>>
      getOrders(
        queryParams?: OrdersQueryParams
      ): Chainable<Response<GetOrdersData>>
      getIframeBody(): Chainable<Element>
      capturePayPalWindow(): Chainable<Element>
      clickPayPalButton(): Chainable<Element>
      getPayPalWindow(): Chainable<JQuery>
      payWithPayPal(email: string, password: string): Chainable<Element>
    }
  }
}

export {}

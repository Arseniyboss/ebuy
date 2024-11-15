import { CartItem, Order, GetOrdersData } from '@/types/api'
import { Address, PaymentMethod } from '@/types/user'

type AssertPaginatedOrdersParams = {
  firstPage: number
  secondPage: number
}

declare global {
  namespace Cypress {
    interface Chainable {
      assertText(testId: string, text: string, index?: number): Chainable<Element>
      assertValue(testId: string, value: string, index?: number): Chainable<Element>
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
      assertPaginatedOrders(number: AssertPaginatedOrdersParams): Chainable<Element>
      assertCountInStock(productId: string, countInStock: number): Chainable<Element>
    }
  }
}

export {}

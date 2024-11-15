import { UserOrdersQueryParams, OrdersQueryParams } from '@/types/params'
import { Order, GetOrdersData } from '@/types/api'

declare global {
  namespace Cypress {
    interface Chainable {
      getImage(testId: string): Chainable<Element>
      getMessage(testId: string, value: string, index?: number): Chainable<Element>
      getTemporaryMessage(testId: string, value: string): Chainable<Element>
      getOrder(id: string): Chainable<Response<Order>>
      getUserOrders(
        queryParams?: UserOrdersQueryParams
      ): Chainable<Response<GetOrdersData>>
      getOrders(queryParams?: OrdersQueryParams): Chainable<Response<GetOrdersData>>
    }
  }
}

export {}

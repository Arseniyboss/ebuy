import { Order } from '../../src/types/api'
import { getDeliveryDate } from '../../src/utils/getters/getDeliveryDate'

before(() => {
  cy.task('seedUsers')
  cy.task('seedProducts')
})

beforeEach(() => {
  cy.login({ email: 'robert@gmail.com', password: '123456' })
  cy.visit('/order/review')
})

after(() => {
  cy.task('deleteUsers')
  cy.task('deleteProducts')
  cy.task('deleteOrders')
})

describe('Order Review Page', () => {
  it('gets checkout steps', () => {
    cy.verifyLink('address-link', '/address')
    cy.verifyLink('payment-link', '/payment')
  })

  it('gets user order', () => {
    cy.getUser().then((response) => {
      const { status, body: user } = response
      const { address, paymentMethod, cartItems } = user

      const deliveryDate = getDeliveryDate()

      expect(status).to.equal(200)

      cy.assertDeliveryDate(deliveryDate)
      cy.assertAddress(address)
      cy.assertPaymentMethod(paymentMethod)
      cy.assertOrderItems(cartItems)
      cy.assertTotalPrice(cartItems)
    })
  })

  it('places the order', () => {
    const productIds = ['62dbfa7f31c12b460f19f2b1', '62dbfa7f31c12b460f19f2b2']

    cy.intercept('POST', '/api/orders').as('createOrder')
    cy.intercept('PATCH', '/api/products/*').as('updateStock')
    cy.intercept('DELETE', '/api/cart').as('clearCart')

    cy.getByTestId('place-order-button').click()

    cy.wait('@createOrder').then(({ response }) => {
      const { statusCode, body } = response
      const { _id }: Order = body

      expect(statusCode).to.equal(201)
      cy.verifyUrl(`/order/${_id}`)
    })

    cy.wait('@updateStock').then(({ response }) => {
      expect(response.statusCode).to.equal(200)

      cy.visit(`/product/${productIds[0]}`)
      cy.assertCountInStock(productIds[0], 0)

      cy.visit(`/product/${productIds[1]}`)
      cy.assertCountInStock(productIds[1], 9)
    })

    cy.wait('@clearCart').then(({ response }) => {
      expect(response.statusCode).to.equal(200)

      cy.visit('/cart')
      cy.getMessage('info-message', 'Your cart is empty')
      cy.assertLength('cart-item', 0)
    })
  })
})

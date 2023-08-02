import { Order } from '../../src/types/api'
import { getDeliveryDate } from '../../src/utils/getDeliveryDate'
import { getTotalPrice } from '../../src/utils/getTotalPrice'
import { formatPrice } from '../../src/utils/formatPrice'

before(() => {
  cy.task('seedProducts')
})

beforeEach(() => {
  cy.task('seedUsers')
  cy.login({ email: 'robert@gmail.com', password: '123456' })
  cy.visit('/order/review')
})

afterEach(() => {
  cy.task('deleteUsers')
})

after(() => {
  cy.task('deleteProducts')
})

describe('Order Review Page', () => {
  it('gets checkout steps', () => {
    cy.verifyLink('address-link', '/address')
    cy.verifyLink('payment-link', '/payment')
  })

  it('gets user order', () => {
    cy.getUser().then((response) => {
      const { status, body } = response
      const { address, paymentMethod, cartItems } = body

      const deliveryDate = getDeliveryDate()
      const totalPrice = getTotalPrice(cartItems)

      expect(status).to.equal(200)

      cy.assertText('delivery-date', `Delivery Date: ${deliveryDate}`)
      cy.assertText('street', `Street: ${address.street}`)
      cy.assertText('country', `Country: ${address.country}`)
      cy.assertText('city', `City: ${address.city}`)
      cy.assertText('postal-code', `Postal Code: ${address.postalCode}`)
      cy.assertText('payment-method', `Payment Method: ${paymentMethod}`)

      cy.getImage('item-image')

      cartItems.forEach((cartItem, index) => {
        const { name, quantity, price } = cartItem

        const totalPrice = formatPrice(quantity * price)

        cy.assertText('item-name', name, index)
        cy.assertText(
          'item-total-price',
          `${quantity} x $${price} = $${totalPrice}`,
          index
        )
      })

      cy.assertText('total-price', `Total: $${totalPrice}`)
    })
  })

  describe('after placing the order', () => {
    it('creates order', () => {
      cy.intercept('POST', '/api/orders').as('createOrder')
      cy.getByTestId('place-order-button').click()

      cy.wait('@createOrder').then(({ response }) => {
        const { statusCode, body } = response
        const { _id }: Order = body

        expect(statusCode).to.equal(201)
        cy.verifyUrl(`/order/${_id}`)
      })
    })

    it('updates stock', () => {
      const id1 = '62dbfa7f31c12b460f19f2b1'
      const id2 = '62dbfa7f31c12b460f19f2b2'

      cy.getByTestId('place-order-button').click()

      cy.visit(`/product/${id1}`)
      cy.assertCountInStock(id1, 0)

      cy.visit(`/product/${id2}`)
      cy.assertCountInStock(id2, 9)
    })

    it('clears cart', () => {
      cy.intercept('DELETE', '/api/cart').as('clearCart')
      cy.getByTestId('place-order-button').click()

      cy.wait('@clearCart').then(({ response }) => {
        expect(response.statusCode).to.equal(200)

        cy.visit('/cart')
        cy.getMessage('info-message', 'Your cart is empty')
        cy.assertLength('cart-item', 0)
      })
    })
  })
})

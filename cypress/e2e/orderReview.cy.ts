import { Order } from '../../src/types/api'
import { getDeliveryDate } from '../../src/utils/getDeliveryDate'
import { getTotalPrice } from '../../src/utils/getTotalPrice'
import { formatPrice } from '../../src/utils/formatPrice'

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
      const totalPrice = getTotalPrice(cartItems)

      expect(status).to.equal(200)

      cy.assertText('delivery-date', `Delivery Date: ${deliveryDate}`)
      cy.assertText('username', `Username: ${user.name}`)
      cy.assertText('email', `Email: ${user.email}`)
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

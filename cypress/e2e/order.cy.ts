import { Order } from '../../src/types/api'
import { getDeliveryDate } from '../../src/utils/getDeliveryDate'
import { getTotalPrice } from '../../src/utils/getTotalPrice'
import { formatPrice } from '../../src/utils/formatPrice'

const id = '62dbfa7f31c12b460f19f2c1'

before(() => {
  cy.task('seedUsers')
  cy.task('seedOrders')
})

beforeEach(() => {
  cy.login({ email: 'robert@gmail.com', password: '123456' })
  cy.visit(`/order/${id}`)
})

after(() => {
  cy.task('deleteUsers')
  cy.task('deleteOrders')
})

describe('Order  Page', () => {
  it('gets user order', () => {
    cy.request(`/api/orders/${id}`).then((response) => {
      const { status, body } = response
      const { user, address, paymentMethod, orderItems }: Order = body

      const deliveryDate = getDeliveryDate()
      const totalPrice = getTotalPrice(orderItems)

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

      orderItems.forEach((orderItems, index) => {
        const { name, quantity, price } = orderItems

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

  // describe('gets order delivery address and status messages', () => {
  //   it('given the order is not paid', () => {})
  //   it('given the order is paid but not delivered', () => {})
  //   it('given the order is paid and delivered', () => {})
  // })
})

import { Product } from '@/types/api'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'
import { formatPrice } from '@/utils/formatters/formatPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'

Cypress.Commands.add('assertTotalPrice', (items) => {
  const totalPrice = getTotalPrice(items)
  cy.assertText('total-price', `Total: $${totalPrice}`)
})

Cypress.Commands.add('assertDeliveryDate', (deliveryDate) => {
  cy.assertText('delivery-date', `Delivery Date: ${deliveryDate}`)
})

Cypress.Commands.add('assertAddress', (address) => {
  cy.assertText('street', `Street: ${address.street}`)
  cy.assertText('country', `Country: ${address.country}`)
  cy.assertText('city', `City: ${address.city}`)
  cy.assertText('postal-code', `Postal Code: ${address.postalCode}`)
})

Cypress.Commands.add('assertPaymentMethod', (paymentMethod) => {
  cy.assertText('payment-method', `Payment Method: ${paymentMethod}`)
})

Cypress.Commands.add('assertCartItems', (cartItems) => {
  cy.getImage('product-image')

  cartItems.forEach((cartItem, index) => {
    const { name, price, quantity } = cartItem

    const totalPrice = formatPrice(quantity * price)

    cy.assertText('product-name', name, index)
    cy.assertText('product-price', `$${formatTotalPrice(totalPrice)}`, index)
    cy.assertValue('product-quantity', quantity.toString(), index)
  })
})

Cypress.Commands.add('assertOrderItems', (orderItems) => {
  cy.getImage('item-image')

  orderItems.forEach((orderItems, index) => {
    const { name, quantity, price } = orderItems

    const totalPrice = formatPrice(quantity * price)

    cy.assertText('item-name', name, index)
    cy.assertText(
      'item-total-price',
      `${quantity} x $${price} = $${formatTotalPrice(totalPrice)}`,
      index
    )
  })
})

Cypress.Commands.add('assertOrders', (response) => {
  const { status, body } = response
  const { orders } = body

  expect(status).to.equal(200)
  expect(orders.length).to.equal(2)

  orders.forEach((order, index) => {
    cy.assertText('order-id', order._id, index)
    cy.assertText('order-total-price', `$${order.totalPrice}`, index)

    if (order.isPaid) {
      cy.assertText('order-paid-status', order.paidAt, index)
    }

    if (order.isDelivered) {
      cy.assertText('order-delivered-status', order.deliveredAt, index)
    }
  })

  cy.verifyFirstDynamicLink('order-link', `/order/${orders[0]._id}`)
})

Cypress.Commands.add('assertPaginatedOrders', (number) => {
  cy.assertDisabled('left-arrow')

  cy.getByTestId('right-arrow').click()
  cy.assertDisabled('right-arrow')
  cy.getByTestId('left-arrow').should('not.be.disabled')

  cy.assertLength('order', number.secondPage)

  cy.getByTestId('left-arrow').click()

  cy.assertLength('order', number.firstPage)
})

Cypress.Commands.add('assertFilterOrders', (orders) => {
  cy.getByTestId('order-id').each((element, index) => {
    expect(element[index]).to.have.text(orders[index]._id)
  })
})

Cypress.Commands.add('assertCountInStock', (productId, countInStock) => {
  cy.request(`/api/products/${productId}`).then((response) => {
    const product: Product = response.body
    expect(product.countInStock).to.equal(countInStock)

    if (countInStock === 0) {
      cy.assertText('product-status', 'Out Of Stock')
    } else {
      cy.getByTestId('product-quantity').should('contain', countInStock)
      cy.getByTestId('product-quantity').should('not.contain', countInStock + 1)
    }
  })
})

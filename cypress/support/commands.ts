/// <reference types="cypress" />

import { Product } from '@/types/api'
import { formatPrice } from '@/utils/formatters/formatPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { getTotalPrice } from '@/utils/getters/getTotalPrice'

Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid=${testId}]`)
})

Cypress.Commands.add('getMessage', (dataId, value, index = 0) => {
  cy.getByTestId(dataId).eq(index).should('have.text', value)
})

Cypress.Commands.add('getTemporaryMessage', (dataId, value) => {
  cy.getMessage(dataId, value)
  cy.wait(3000)
  cy.getByTestId(dataId).should('not.exist')
})

Cypress.Commands.add('getImage', (testId) => {
  cy.getByTestId(testId)
    .should('be.visible')
    .and((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(0)
    })
})

Cypress.Commands.add('assertText', (testId, text, index = 0) => {
  cy.getByTestId(testId).eq(index).should('have.text', text)
})

Cypress.Commands.add('assertValue', (testId, value, index = 0) => {
  cy.getByTestId(testId).eq(index).should('have.value', value)
})

Cypress.Commands.add('assertEmpty', (testId) => {
  cy.getByTestId(testId).should('have.value', '')
})

Cypress.Commands.add('assertLength', (testId, value) => {
  cy.getByTestId(testId).should('have.length', value)
})

Cypress.Commands.add('assertDisabled', (testId) => {
  cy.getByTestId(testId).should('be.disabled')
})

Cypress.Commands.add('assertDisabledLink', (testId) => {
  cy.getByTestId(testId).should('have.css', 'pointer-events', 'none')
  cy.getByTestId(testId).should('have.attr', 'tabindex', '-1')
})

Cypress.Commands.add('assertChecked', (testId) => {
  cy.getByTestId(testId).should('be.checked')
})

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

Cypress.Commands.add('typeInto', (dataId, text) => {
  cy.getByTestId(dataId).type(text).should('have.value', text)
})

Cypress.Commands.add('selectOption', ({ testId, text, value, index = 0 }) => {
  cy.getByTestId(testId).eq(index).select(text).should('have.value', value)
})

Cypress.Commands.add('clearInput', (dataId) => {
  cy.getByTestId(dataId).clear()
})

Cypress.Commands.add('submitForm', (dataId) => {
  cy.getByTestId(dataId).submit()
})

Cypress.Commands.add('waitDebounce', () => {
  cy.wait(500)
})

Cypress.Commands.add('waitSelect', () => {
  cy.wait(500)
})

// use before first form submission when using beforeEach hook in the describe block
Cypress.Commands.add('waitCypressLoading', () => {
  cy.wait(100)
})

Cypress.Commands.add('waitPayPalLoading', () => {
  cy.wait(3000)
})

Cypress.Commands.add('verifyUrl', (url) => {
  cy.location('pathname').should('eq', url)
})

Cypress.Commands.add('verifyProtectedUrl', (url) => {
  cy.visit(url)
  cy.verifyUrl('/login')
})

Cypress.Commands.add('verifyLink', (testId, url) => {
  cy.getByTestId(testId).click()
  cy.verifyUrl(url)
  cy.go('back')
})

Cypress.Commands.add('verifyNavLink', (testId, url) => {
  cy.getByTestId(testId).click()
  cy.verifyUrl(url)
})

Cypress.Commands.add('verifyFirstDynamicLink', (testId, url) => {
  cy.getByTestId(testId).eq(0).click()
  cy.location('pathname').should('eq', url)
  cy.go('back')
})

Cypress.Commands.add('verifySort', (prices) => {
  cy.getByTestId('product-price').each((element, index) => {
    const price = Number(element.text().slice(1))
    expect(price).to.eq(prices[index])
  })
})

Cypress.Commands.add('verifyCookie', (name) => {
  cy.getCookie(name).then((cookie) => {
    expect(cookie.secure).to.be.true
    expect(cookie.httpOnly).to.be.true
    expect(cookie.sameSite).to.equal('lax')
  })
})

Cypress.Commands.add('verifyUserUpdate', (input, value) => {
  cy.wait('@updateUser').then(({ response }) => {
    expect(response.statusCode).to.equal(200)
    cy.verifyCookie('accessToken')
    cy.reload()
    cy.assertValue(input, value)
  })
})

Cypress.Commands.add('login', (userCredentials) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: userCredentials,
  }).then(() => {
    cy.verifyCookie('accessToken')
    cy.reload()
  })
})

Cypress.Commands.add('logout', () => {
  cy.request({
    method: 'POST',
    url: '/api/users/logout',
  }).then(() => {
    cy.getCookie('accessToken').then((cookie) => {
      expect(cookie).to.be.null
    })
    cy.reload()
  })
})

Cypress.Commands.add('getUser', () => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: '/api/users/user',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})

Cypress.Commands.add('getOrder', (id) => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: `/api/orders/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})

Cypress.Commands.add('getUserOrders', ({ page = 1, status = '' } = {}) => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: `/api/orders/?page=${page}&status=${status}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})

Cypress.Commands.add('getOrders', ({ page = 1, status = '' } = {}) => {
  cy.getCookie('accessToken').then((cookie) => {
    const accessToken = cookie.value
    cy.request({
      method: 'GET',
      url: `/api/admin/orders/?page=${page}&status=${status}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })
})

const paypal = {
  window: {
    document: null,
  },
}

Cypress.Commands.add('getIframeBody', { prevSubject: 'element' }, ($iframe) => {
  cy.wrap($iframe.contents().find('body'))
})

Cypress.Commands.add('capturePayPalWindow', () => {
  cy.window().then((window) => {
    const { open } = window
    cy.stub(window, 'open').callsFake((...params) => {
      paypal.window = open(...params)
      return paypal.window
    })
  })
})

Cypress.Commands.add('clickPayPalButton', () => {
  cy.get('iframe').eq(1).getIframeBody().click()
})

Cypress.Commands.add('getPayPalWindow', () => {
  const window = Cypress.$(paypal.window.document)
  return cy.wrap(window.contents().find('body'))
})

Cypress.Commands.add('payWithPayPal', (email, password) => {
  cy.waitPayPalLoading()
  cy.getPayPalWindow().find('#email').type(email)
  cy.getPayPalWindow().find('#btnNext').click()
  cy.getPayPalWindow().find('#password').type(password)
  cy.getPayPalWindow().find('#btnLogin').click()
  cy.waitPayPalLoading()
  cy.getPayPalWindow().find('#payment-submit-btn').click()
  cy.waitPayPalLoading()
})

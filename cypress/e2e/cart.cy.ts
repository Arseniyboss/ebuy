import { User } from '../../src/types/api'

before(() => {
  cy.task('seedUsers')
})

beforeEach(() => {
  cy.visit('/cart')
})

after(() => {
  cy.task('deleteUsers')
})

describe('Cart Page', () => {
  describe('given the user is not logged in', () => {
    it('shows info message', () => {
      cy.getMessage('info-message', 'Your cart is empty')
    })
  })

  describe('given the user is logged in', () => {
    beforeEach(() => {
      cy.login({ email: 'jane@gmail.com', password: '123456' })
    })

    it('navigates to the checkout page', () => {
      cy.getByTestId('checkout-button').click()
      cy.verifyUrl('/shippingAddress')
    })

    it('gets cart items', () => {
      cy.getCookie('token').then((cookie) => {
        const token = cookie.value

        cy.request({
          method: 'GET',
          url: '/api/users/user',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          const { status, body } = response
          const { cartItems }: User = body

          expect(status).to.equal(200)

          cy.getImage('product-image')

          cartItems.forEach((cartItem, index) => {
            const { name, price, quantity } = cartItem

            cy.assertText('product-name', name, index)
            cy.assertText('product-price', `$${price}`, index)
            cy.assertValue('product-quantity', quantity.toString(), index)
          })
        })
      })
    })

    it('updates cart item', () => {
      cy.selectOption({
        testId: 'product-quantity',
        text: '1',
        value: '1',
        index: 0,
      })
      cy.assertValue('product-quantity', '1', 0)
    })

    it('deletes cart item', () => {
      cy.getByTestId('delete-button').eq(0).click()
      cy.assertLength('cart-item', 1)
    })
  })
})

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
      cy.login({ email: 'john@example.com', password: '123456' })
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
          const { name, price, quantity } = cartItems[0]

          expect(status).to.equal(200)

          cy.getImage('product-image')

          cy.assertText('product-name', name)
          cy.assertText('product-price', `$${price}`)
          cy.assertValue('product-quantity', quantity.toString())
        })
      })
    })

    it('updates cart item', () => {
      cy.selectOption({ testId: 'product-quantity', text: '1', value: '1' })
      cy.assertValue('product-quantity', '1')
    })

    it('deletes cart item', () => {
      cy.getByTestId('delete-button').click()
      cy.assertLength('cart-item', 0)
    })
  })
})

import { getTotalPrice } from '../../src/utils/getTotalPrice'

const id = '62dbfa7f31c12b460f19f2b1'

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
      cy.getUser().then((response) => {
        const { status, body } = response
        const { cartItems } = body

        const totalPrice = getTotalPrice(cartItems)

        expect(status).to.equal(200)

        cy.getImage('product-image')

        cartItems.forEach((cartItem, index) => {
          const { name, price, quantity } = cartItem

          cy.assertText('product-name', name, index)
          cy.assertText('product-price', `$${price}`, index)
          cy.assertValue('product-quantity', quantity.toString(), index)
        })

        cy.assertText('total-price', `Total: $${totalPrice}`)
      })
    })

    it('updates cart item', () => {
      cy.intercept('PATCH', `/api/cart/${id}`).as('updateCartItem')

      cy.selectOption({
        testId: 'product-quantity',
        text: '1',
        value: '1',
        index: 0,
      })

      cy.wait('@updateCartItem').then(({ response }) => {
        expect(response.statusCode).to.equal(200)
        cy.assertValue('product-quantity', '1', 0)
      })
    })

    it('deletes cart item', () => {
      cy.intercept('DELETE', `/api/cart/${id}`).as('deleteCartItem')

      cy.getByTestId('delete-button').eq(0).click()

      cy.wait('@deleteCartItem').then(({ response }) => {
        expect(response.statusCode).to.equal(200)
        cy.assertLength('cart-item', 1)
      })
    })
  })
})

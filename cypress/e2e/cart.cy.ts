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
      cy.getByTestId('checkout-link').click()
      cy.verifyUrl('/address')
    })

    it('gets cart items', () => {
      cy.getUser().then((response) => {
        const { status, body } = response
        const { cartItems } = body

        expect(status).to.equal(200)

        cy.assertCartItems(cartItems)
        cy.assertTotalPrice(cartItems)
      })
    })

    it('updates cart item', () => {
      cy.intercept('PATCH', '/api/cart/*').as('updateCartItem')

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
      cy.intercept('DELETE', '/api/cart/*').as('deleteCartItem')

      cy.getByTestId('delete-button').eq(0).click()

      cy.wait('@deleteCartItem').then(({ response }) => {
        expect(response.statusCode).to.equal(200)
        cy.assertLength('cart-item', 1)
      })
    })
  })
})

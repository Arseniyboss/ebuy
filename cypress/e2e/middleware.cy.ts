before(() => {
  cy.task('seedUsers')
})

after(() => {
  cy.task('deleteUsers')
})

describe('middleware', () => {
  describe('given the user does not exist', () => {
    it('redirects the user to the login page', () => {
      cy.verifyProtectedUrl('/profile')
      cy.verifyProtectedUrl('/orders')
      cy.verifyProtectedUrl('/admin/orders')
      cy.verifyProtectedUrl('/address')
      cy.verifyProtectedUrl('/payment')
      cy.verifyProtectedUrl('/order/review')
      cy.verifyProtectedUrl('/order/62dbfa7f31c12b460f19f2c1')
    })
  })

  describe('given the user exists', () => {
    describe('given the user is on the login or register page', () => {
      it('redirects the user to the home page', () => {
        cy.login({ email: 'john@gmail.com', password: '123456' })

        cy.visit('/login')
        cy.verifyUrl('/')

        cy.visit('/register')
        cy.verifyUrl('/')
      })
    })

    describe('given the user is not an admin and is on the admin page', () => {
      it('redirects the user to the home page', () => {
        cy.login({ email: 'john@gmail.com', password: '123456' })

        cy.visit('/admin/orders')
        cy.verifyUrl('/')
      })
    })

    describe('given the user is on the address page', () => {
      describe('given the user does not have cart items', () => {
        it('redirects the user to the cart page', () => {
          cy.login({ email: 'john@gmail.com', password: '123456' })

          cy.visit('/address')
          cy.verifyUrl('/cart')
        })
      })
    })

    describe('given the user is on the payment page', () => {
      describe('given the user does not have cart items', () => {
        it('redirects the user to the cart page', () => {
          cy.login({ email: 'john@gmail.com', password: '123456' })

          cy.visit('/payment')
          cy.verifyUrl('/cart')
        })
      })

      describe('given the user has cart items', () => {
        describe('given the user does not have an address', () => {
          it('redirects the user to the address page', () => {
            cy.login({ email: 'jane@gmail.com', password: '123456' })

            cy.visit('/payment')
            cy.verifyUrl('/address')
          })
        })
      })
    })

    describe('given the user is on the order review page', () => {
      describe('given the user does not have cart items', () => {
        it('redirects the user to the cart page', () => {
          cy.login({ email: 'john@gmail.com', password: '123456' })

          cy.visit('/order/review')
          cy.verifyUrl('/cart')
        })
      })

      describe('given the user has cart items', () => {
        describe('given the user does not have a payment method', () => {
          it('redirects the user to the payment page', () => {
            cy.login({ email: 'kyle@gmail.com', password: '123456' })

            cy.visit('/order/review')
            cy.verifyUrl('/payment')
          })
        })
      })
    })
  })
})

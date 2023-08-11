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

describe('Order Page', () => {
  it('gets user order', () => {
    cy.getOrder(id).then((response) => {
      const { status, body } = response
      const { address, paymentMethod, orderItems } = body

      expect(status).to.equal(200)

      cy.assertAddress(address)
      cy.assertPaymentMethod(paymentMethod)
      cy.assertOrderItems(orderItems)
      cy.assertTotalPrice(orderItems)
    })
  })

  // cy.getMessage('error-message', 'Not Paid')
  // cy.getMessage('error-message', 'Not Delivered')

  // cy.getMessage('success-message', `Paid on ${date}`)
  // cy.getMessage('success-message', `Delivered on ${date}`)

  // cy.getByTestId('paypal-button')
  // cy.getByTestId('stripe-button')
  // cy.getByTestId('admin-button')

  // describe('gets order delivery address and status messages', () => {
  //   it('given the order is not paid', () => {})
  //   it('given the order is paid but not delivered', () => {})
  //   it('given the order is paid and delivered', () => {})
  // })

  // describe('tests payment', () => {
  //   describe('updates order to paid', () => {
  //     it('given the payment method is PayPal', () => {})
  //     it('given the payment method is Stripe', () => {})
  //   })
  // })

  // describe('given the user is an admin', () => {
  //   it('updates order to delivered', () => {})
  // })
})

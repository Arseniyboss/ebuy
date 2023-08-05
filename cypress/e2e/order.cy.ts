import { Order } from '../../src/types/api'

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
    cy.request(`/api/orders/${id}`).then((response) => {
      const { status, body } = response
      const { address, paymentMethod, orderItems }: Order = body

      expect(status).to.equal(200)

      cy.assertAddress(address)
      cy.assertPaymentMethod(paymentMethod)
      cy.assertOrderItems(orderItems)
      cy.assertTotalPrice(orderItems)
    })
  })

  // describe('gets order delivery address and status messages', () => {
  //   it('given the order is not paid', () => {})
  //   it('given the order is paid but not delivered', () => {})
  //   it('given the order is paid and delivered', () => {})
  // })
})

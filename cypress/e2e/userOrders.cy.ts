before(() => {
  cy.task('seedUsers')
  cy.task('seedOrders')
})

beforeEach(() => {
  cy.login({ email: 'robert@gmail.com', password: '123456' })
  cy.visit('/orders')
})

after(() => {
  cy.task('deleteUsers')
  cy.task('deleteOrders')
})

describe('User Orders Page', () => {
  it('renders user orders on the first page', () => {
    cy.getUserOrders().then((response) => {
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
  })

  it('paginates user orders', () => {
    cy.assertDisabled('left-arrow')

    cy.getByTestId('right-arrow').click()
    cy.assertDisabled('right-arrow')
    cy.getByTestId('left-arrow').should('not.be.disabled')

    cy.assertLength('order', 1)

    cy.getByTestId('left-arrow').click()

    cy.assertLength('order', 2)
  })

  it('filters user orders', () => {
    cy.selectOption({
      testId: 'status-select',
      text: 'Not Paid',
      value: 'not-paid',
    })
    cy.waitSelect()

    cy.getUserOrders({ status: 'not-paid' }).then((response) => {
      const { orders } = response.body

      cy.getByTestId('order-id').each((element, index) => {
        expect(element[index]).to.have.text(orders[index]._id)
      })
    })
  })
})

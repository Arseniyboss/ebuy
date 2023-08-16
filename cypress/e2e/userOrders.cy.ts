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
      cy.assertOrders(response)
    })
  })

  it('paginates user orders', () => {
    cy.assertPaginatedOrders({ firstPage: 2, secondPage: 1 })
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
      cy.assertFilterOrders(orders)
    })
  })
})

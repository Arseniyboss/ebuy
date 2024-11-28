before(() => {
  cy.task('seedUsers')
  cy.task('seedOrders')
})

beforeEach(() => {
  cy.login({ email: 'admin@gmail.com', password: '123456' })
  cy.visit('/admin/orders')
})

after(() => {
  cy.task('deleteUsers')
  cy.task('deleteOrders')
})

describe('User Orders Page', () => {
  it('renders orders on the first page', () => {
    cy.getOrders().then((response) => {
      cy.assertOrders(response)
    })
  })

  it('paginates orders', () => {
    cy.assertPaginatedOrders({ firstPage: 2, secondPage: 2 })
  })

  it('filters orders', () => {
    cy.selectOption({ testId: 'status-select', value: 'not-delivered' })
    cy.waitSelect()

    cy.getOrders({ status: 'not-delivered' }).then((response) => {
      const { orders } = response.body
      cy.assertFilterOrders(orders)
    })
  })
})

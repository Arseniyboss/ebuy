import { Product } from '../../src/types/product'

before(() => {
  cy.task('seedProducts')
  cy.request('/api/revalidate?tag=products')
})

after(() => {
  cy.task('deleteProducts')
})

describe('Product Page', () => {
  it('renders product', () => {
    const id = '62dbfa7f31c12b460f19f2b5'

    cy.visit(`/product/${id}`)

    cy.request(`/api/products/${id}`).then((response) => {
      const { status, body } = response
      const { name, price, description }: Product = body

      expect(status).to.equal(200)

      cy.getImage('product-image')

      cy.getByTestId('product-name').should('have.text', name)
      cy.getByTestId('product-price').should('contain.text', price)
      cy.getByTestId('product-description').should('have.text', description)
    })
  })
})

before(() => {
  cy.task('seedProducts')
})

after(() => {
  cy.task('deleteProducts')
})

describe('Home Page', () => {
  it('renders products', () => {
    cy.request('/api/revalidate?tag=products')
    cy.visit('/')

    const page = 1
    const search = ''
    const sort = 'createdAt.desc'
    const url = `/api/products?page=${page}&search=${search}&sort=${sort}`

    cy.request(url).then((response) => {
      const { status, body } = response
      const products = body.products

      expect(status).to.equal(200)
      expect(products.length).to.equal(4)

      cy.getByTestId('product-name').each((element, index) => {
        expect(element).to.have.text(products[index].name)
      })
    })
  })
})

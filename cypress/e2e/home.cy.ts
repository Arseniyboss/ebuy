import { Product } from '../../src/types/api'

before(() => {
  cy.task('seedProducts')
  cy.task('seedUsers')
  cy.request('/api/revalidate?tag=products')
})

beforeEach(() => {
  cy.visit('/')
})

after(() => {
  cy.task('deleteProducts')
  cy.task('deleteUsers')
})

describe('Home Page', () => {
  it('renders products on the first page', () => {
    const url = "/api/products?page=1&search=''&sort=createdAt.desc"

    cy.request(url).then((response) => {
      const { status, body } = response
      const products: Product[] = body.products

      expect(status).to.equal(200)
      expect(products.length).to.equal(4)

      cy.getByTestId('product-name').each((element, index) => {
        expect(element).to.have.text(products[index].name)
      })
      cy.getByTestId('product-price').each((element, index) => {
        expect(element).to.contain.text(products[index].price.toString())
      })

      cy.verifyFirstDynamicLink('product-link', `/product/${products[0]._id}`)
    })
  })

  it('paginates products', () => {
    cy.assertDisabled('left-arrow')

    cy.getByTestId('right-arrow').click()
    cy.assertDisabled('right-arrow')
    cy.getByTestId('left-arrow').should('not.be.disabled')

    cy.assertLength('product', 3)

    cy.getByTestId('left-arrow').click()

    cy.assertLength('product', 4)
  })

  it('filters products', () => {
    cy.typeInto('search-input', 'Airpods')
    cy.waitDebounce()
    cy.getByTestId('product-name').should('contain.text', 'Airpods')
    cy.assertLength('product', 1)
    cy.clearInput('search-input')

    cy.typeInto('search-input', 'xyz')
    cy.waitDebounce()
    cy.assertLength('product', 0)
    cy.getByTestId('search-fail-text').should(
      'include.text',
      'No products matched your search term'
    )

    cy.clearInput('search-input')

    cy.assertLength('product', 4)
  })

  it('sorts products', () => {
    const ascendingPrices = [29.99, 49.99, 99.99, 129.99]
    const descendingPrices = [929.99, 599.99, 399.99, 129.99]

    cy.selectOption({
      testId: 'sort-select',
      text: 'Price: Low - High',
      value: 'price.asc',
    })
    cy.waitSelect()
    cy.verifySort(ascendingPrices)

    cy.selectOption({
      testId: 'sort-select',
      text: 'Price: High - Low',
      value: 'price.desc',
    })
    cy.waitSelect()
    cy.verifySort(descendingPrices)

    cy.selectOption({
      testId: 'sort-select',
      text: 'Top Rated',
      value: 'rating.desc',
    })
    cy.waitSelect()
  })

  describe('navigates to the first page', () => {
    beforeEach(() => {
      cy.getByTestId('right-arrow').click()
    })

    it('when searching products', () => {
      cy.typeInto('search-input', 'Airpods')
      cy.location('search').should('include', '?page=1')
    })

    it('when sorting products', () => {
      cy.selectOption({
        testId: 'sort-select',
        text: 'Price: Low - High',
        value: 'price.asc',
      })
      cy.location('search').should('include', '?page=1')
    })
  })

  describe('tests header', () => {
    it('nav links', () => {
      cy.verifyNavLink('cart-nav-link', '/cart')
      cy.verifyNavLink('login-nav-link', '/login')
      cy.verifyNavLink('contact-nav-link', '/contact')
      cy.verifyNavLink('home-nav-link', '/')
    })

    it('user dropdown', () => {
      cy.login({ email: 'john@example.com', password: '123456' })

      cy.assertText('user-initials', 'JD')

      cy.getByTestId('user-initials').click()
      cy.verifyLink('profile-link', '/profile')

      cy.getByTestId('user-initials').click()
      cy.getByTestId('logout-text').click()

      cy.getCookie('token').then((cookie) => {
        expect(cookie).to.be.null
      })
    })
  })
})

import { GetProductsData as Body } from '@/types/api'

before(() => {
  cy.task('seedProducts')
  cy.task('seedUsers')
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
      const body: Body = response.body
      const { products } = body

      expect(response.status).to.equal(200)
      expect(products.length).to.equal(4)

      cy.getImage('product-image')

      products.forEach((product, index) => {
        const { name, price } = product

        cy.assertText('product-name', name, index)
        cy.assertText('product-price', `$${price}`, index)
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
    cy.verifySort('price.asc')
    cy.verifySort('price.desc')
    cy.verifySort('rating.desc')
  })

  describe('navigates to the first page', () => {
    beforeEach(() => {
      cy.getByTestId('right-arrow').click()
    })

    it('when searching products', () => {
      cy.typeInto('search-input', 'Airpods')
      cy.location('search').should('include', 'page=1')
    })

    it('when sorting products', () => {
      cy.selectOption({ testId: 'sort-select', value: 'price.asc' })
      cy.location('search').should('include', 'page=1')
    })
  })

  describe('tests header', () => {
    it('nav links', () => {
      cy.verifyNavLink('cart-nav-link', '/cart')
      cy.verifyNavLink('login-nav-link', '/login')
      cy.verifyNavLink('contact-nav-link', '/contact')
      cy.verifyNavLink('home-nav-link', '/')
    })

    describe('user dropdown', () => {
      afterEach(() => {
        cy.getByTestId('user-initials').click()
        cy.verifyLink('profile-link', '/profile')

        cy.getByTestId('user-initials').click()
        cy.getByTestId('logout-button').click()

        cy.getCookie('accessToken').should('be.null')
      })

      it('given the user is an admin', () => {
        cy.login({ email: 'admin@gmail.com', password: '123456' })

        cy.assertText('user-initials', 'AU')

        cy.getByTestId('user-initials').click()
        cy.verifyLink('orders-link', '/admin/orders')
      })

      it('given the user is not an admin', () => {
        cy.login({ email: 'john@gmail.com', password: '123456' })

        cy.assertText('user-initials', 'JD')

        cy.getByTestId('user-initials').click()
        cy.verifyLink('orders-link', '/orders')
      })
    })
  })
})

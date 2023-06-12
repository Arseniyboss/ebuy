import { Product, CartItem } from '../../src/types/product'

const id = '62dbfa7f31c12b460f19f2b5'
const products = [
  {
    _id: '62dbfa7f31c12b460f19f2b6',
    name: 'iPhone 11 Pro 256GB Memory',
    price: 599.99,
  },
  {
    _id: '62dbfa7f31c12b460f19f2b5',
    name: 'Airpods Wireless Bluetooth Headphones',
    price: 129.99,
  },
]

const getCartItems = (value: string) => {
  const cartItems: CartItem[] = JSON.parse(decodeURIComponent(value))
  return cartItems
}

before(() => {
  cy.task('seedProducts')
  cy.request('/api/revalidate?tag=products')
})

beforeEach(() => {
  cy.visit(`/product/${id}`)
})

after(() => {
  cy.task('deleteProducts')
})

describe('Product Page', () => {
  it('renders product', () => {
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

  it('adds product to an empty cart', () => {
    cy.clickButton('product-button')

    cy.getCookie('cartItems').then(({ value }) => {
      const cartItems = getCartItems(value)
      expect(cartItems[0].quantity).to.equal(1)
    })
  })

  it('adds the product in the selected quantity to the cart', () => {
    cy.selectOption({ testId: 'product-quantity', text: '2', value: '2' })
    cy.clickButton('product-button')

    cy.getCookie('cartItems').then(({ value }) => {
      const cartItems = getCartItems(value)
      cy.verifyCartItem(cartItems[0], products[1])
      expect(cartItems[0].quantity).to.equal(2)
    })
  })

  it('adds product to a non-empty cart', () => {
    cy.setCookie('cartItems', JSON.stringify([products[0]]))
    cy.clickButton('product-button')

    cy.getCookie('cartItems').then(({ value }) => {
      const cartItems = getCartItems(value)
      cy.verifyCartItem(cartItems[1], products[1])
      expect(cartItems[0]._id).to.equal(products[0]._id)
      expect(cartItems.length).to.equal(2)
    })
  })

  it('updates quantity of the cart item', () => {
    cy.setCookie('cartItems', JSON.stringify(products))
    cy.selectOption({ testId: 'product-quantity', text: '3', value: '3' })
    cy.clickButton('product-button')

    cy.getCookie('cartItems').then(({ value }) => {
      const cartItems = getCartItems(value)
      cy.verifyCartItem(cartItems[1], products[1])
      expect(cartItems[0]._id).to.equal(products[0]._id)
      expect(cartItems.length).to.equal(2)
      expect(cartItems[1].quantity).to.equal(3)
    })
  })
})

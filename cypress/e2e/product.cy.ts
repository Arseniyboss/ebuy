import { Product } from '../../src/types/product'

before(() => {
  cy.task('seedProducts')
  cy.request('/api/revalidate?tag=products')
})

after(() => {
  cy.task('deleteProducts')
})

describe('Product Page', () => {
  // it('shows error message if the product was not found', () => {
  //   const id = '62dbfa7f31c12b460f19f2b4'
  //   cy.visit(`/product/${id}`)
  //   cy.getByTestId('error-message').should('have.text', 'Product not found')
  // })
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
  it('selects product quantity', () => {
    const id = '62dbfa7f31c12b460f19f2b5'
    cy.visit(`/product/${id}`)
    cy.selectOption({ testId: 'product-quantity', text: '3', value: '3' })
  })
  it('adds product to the cart', () => {
    const id = '62dbfa7f31c12b460f19f2b5'
    cy.visit(`/product/${id}`)
    cy.clickButton('product-button')

    const product = {
      _id: '62dbfa7f31c12b460f19f2b5',
      name: 'Airpods Wireless Bluetooth Headphones',
      image: '/images/airpods.jpg',
      description:
        'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
      brand: 'Apple',
      category: 'Electronics',
      price: 129.99,
      discountPrice: 89.99,
      countInStock: 3,
      rating: 4.5,
      numReviews: 7,
      isPublished: true,
      reviews: [
        {
          user: '62dbfa7f31c12b460f19f2b3',
          name: 'Jane Doe',
          rating: 4,
          comment: 'Very Good Airpods!',
        },
      ],
    }

    cy.getCookie('cartItems').then((cartItems) => {
      expect(product).to.be.oneOf(JSON.parse(JSON.stringify(cartItems)))
    })
  })
})

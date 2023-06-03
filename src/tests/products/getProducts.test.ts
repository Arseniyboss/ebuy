import { NextRequest } from 'next/server'
import { GET } from '@app/api/products/route'
import { seedProducts } from '@config/seeder'
import { BASE_URL } from '@baseUrl'
import { SortKey, QueryParams } from 'types/queryParams'
import { Product } from 'types/product'

const getProducts = async ({
  page = 1,
  searchTerm = '',
  sort = 'createdAt.desc',
}: QueryParams = {}) => {
  const url = `${BASE_URL}/api/products?page=${page}&searchTerm=${searchTerm}&sort=${sort}`
  const request = new NextRequest(url)
  const response = await GET(request)
  const products: Product[] = await response.json()
  return { status: response.status, products }
}

// const verifySort

const verifyAscendingSort = (products: Product[], key: SortKey) => {
  products.reduce((prevProduct, nextProduct, index) => {
    expect(prevProduct[key]).toBeLessThanOrEqual(nextProduct[key])
    return products[index]
  }, products[0])
}

const verifyDescendingSort = (products: Product[], key: SortKey) => {
  products.reduce((prevProduct, nextProduct, index) => {
    expect(prevProduct[key]).toBeGreaterThanOrEqual(nextProduct[key])
    return products[index]
  }, products[0])
}

beforeAll(async () => await seedProducts())

describe('GET /api/products', () => {
  describe('given the searchTerm and sort are not applied', () => {
    it('returns status code 200 and all products', async () => {
      const { status, products } = await getProducts()

      expect(status).toBe(200)
      expect(products.length).toBe(7)
    })
  })

  describe('given the products matched the searchTerm', () => {
    it('returns status code 200 and matching products', async () => {
      const { status, products } = await getProducts({ searchTerm: 'A' })

      expect(status).toBe(200)
      expect(products.length).toBe(2)

      products.forEach((product) => {
        expect(product.name.startsWith('A')).toBeTruthy()
      })
    })
  })

  describe('given the products matched the searchTerm in lowercase', () => {
    it('returns status code 200 and matching products', async () => {
      const { status, products } = await getProducts({ searchTerm: 'a' })

      expect(status).toBe(200)
      expect(products.length).toBe(2)

      products.forEach((product) => {
        expect(product.name.startsWith('A')).toBeTruthy()
      })
    })
  })

  describe('given no products matched the searchTerm', () => {
    it('returns status code 200 and empty array', async () => {
      const { status, products } = await getProducts({ searchTerm: 'xyz' })

      expect(status).toBe(200)
      expect(products.length).toBe(0)
      expect(products).toEqual([])
    })
  })

  describe('given the searchTerm is invalid', () => {
    describe('given the searchTerm is )', () => {
      it('returns status code 200 and all products', async () => {
        const { status, products } = await getProducts({ searchTerm: ')' })

        expect(status).toBe(200)
        expect(products.length).toBe(7)
      })
    })

    describe('given the searchTerm is #', () => {
      it('returns status code 200 and all products', async () => {
        const { status, products } = await getProducts({ searchTerm: '#' })

        expect(status).toBe(200)
        expect(products.length).toBe(7)
      })
    })
  })

  describe('given the price sort is applied', () => {
    describe('in ascending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'price.asc' })

        expect(status).toBe(200)
        verifyAscendingSort(products, 'price')
      })
    })

    describe('in descending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'price.desc' })

        expect(status).toBe(200)
        verifyDescendingSort(products, 'price')
      })
    })
  })

  describe('given the rating sort is applied', () => {
    describe('in descending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'rating.desc' })

        expect(status).toBe(200)
        verifyDescendingSort(products, 'rating')
      })
    })
  })

  describe('given the sort is invalid', () => {
    it('returns status code 200 and sorted products', async () => {
      const { status, products } = await getProducts({ sort: 'rating.xyz' })

      expect(status).toBe(200)
      expect(products.length).toBe(7)
    })
  })

  describe('given the searchTerm and sort are applied', () => {
    it('return status code 200 and filtered sorted products', async () => {
      const { status, products } = await getProducts({
        searchTerm: 'A',
        sort: 'price.asc',
      })

      expect(status).toBe(200)
      expect(products.length).toBe(2)
      verifyAscendingSort(products, 'price')
    })
  })
})

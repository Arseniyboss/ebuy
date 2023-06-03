import { NextRequest } from 'next/server'
import { GET } from '@app/api/products/route'
import { seedProducts } from '@config/seeder'
import { BASE_URL } from '@baseUrl'
import { SortKey, QueryParams } from 'types/queryParams'
import { Product } from 'types/product'

type Data = {
  products: Product[]
  pages: number
}

type Sort = {
  type: 'asc' | 'desc'
  key: SortKey
  products: Product[]
}

const getProducts = async ({
  page = 1,
  searchTerm = '',
  sort = 'createdAt.desc',
}: QueryParams = {}) => {
  const url = `${BASE_URL}/api/products?page=${page}&searchTerm=${searchTerm}&sort=${sort}`
  const request = new NextRequest(url)
  const response = await GET(request)
  const { products, pages }: Data = await response.json()
  return { status: response.status, products, pages }
}

const verifySort = ({ type, key, products }: Sort) => {
  products.reduce((prevProduct, nextProduct, index) => {
    if (type === 'asc') {
      expect(prevProduct[key]).toBeLessThanOrEqual(nextProduct[key])
    }
    if (type === 'desc') {
      expect(prevProduct[key]).toBeGreaterThanOrEqual(nextProduct[key])
    }
    return products[index]
  }, products[0])
}

beforeAll(async () => await seedProducts())

describe('GET /api/products', () => {
  describe('given the searchTerm and sort are not applied', () => {
    it('returns status code 200 and paginated products', async () => {
      const { status, products, pages } = await getProducts()

      expect(status).toBe(200)
      expect(pages).toBe(2)
      expect(products.length).toBe(4)
    })
  })

  describe('given the page number is invalid', () => {
    describe('given the page number is less than 1', () => {
      it('returns status code 200 and paginated products', async () => {
        const { status, products, pages } = await getProducts({ page: -1 })

        expect(status).toBe(200)
        expect(pages).toBe(2)
        expect(products.length).toBe(4)
      })
    })

    describe('given the page number is greater than the total number of pages', () => {
      it('returns status code 200 and paginated products', async () => {
        const { status, products, pages } = await getProducts({ page: 3 })

        expect(status).toBe(200)
        expect(pages).toBe(2)
        expect(products.length).toBe(4)
      })
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
      it('returns status code 200', async () => {
        const { status } = await getProducts({
          searchTerm: ')',
        })
        expect(status).toBe(200)
      })
    })

    describe('given the searchTerm is #', () => {
      it('returns status code 200 and all products', async () => {
        const { status } = await getProducts({
          searchTerm: '#',
        })
        expect(status).toBe(200)
      })
    })
  })

  describe('given the price sort is applied', () => {
    describe('in ascending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'price.asc' })

        expect(status).toBe(200)
        verifySort({ type: 'asc', key: 'price', products })
      })
    })

    describe('in descending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'price.desc' })

        expect(status).toBe(200)
        verifySort({ type: 'desc', key: 'price', products })
      })
    })
  })

  describe('given the rating sort is applied', () => {
    describe('in descending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'rating.desc' })

        expect(status).toBe(200)
        verifySort({ type: 'desc', key: 'rating', products })
      })
    })
  })

  describe('given the sort is invalid', () => {
    it('returns status code 200', async () => {
      const { status } = await getProducts({
        sort: 'rating.xyz',
      })
      expect(status).toBe(200)
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
      verifySort({ type: 'asc', key: 'price', products })
    })
  })
})

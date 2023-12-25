import { NextRequest } from 'next/server'
import { HomeQueryParams } from '@/types/params'
import { Product, GetProductsData as Data } from '@/types/api'
import { SortOrder, SortKey } from '@/types/sort'
import { BASE_URL } from '@/baseUrl'
// import { BASE_URL } from '@//baseUrl'
import { GET } from '@/app/api/products/route'
import { seedProducts } from '@/database/mongoMemoryServer'

type VerifySortParams = {
  order: SortOrder
  key: SortKey
  products: Product[]
}

const getProducts = async ({
  page = 1,
  search = '',
  sort = 'createdAt.desc',
}: HomeQueryParams = {}) => {
  const url = `${BASE_URL}/api/products?page=${page}&search=${search}&sort=${sort}`
  const request = new NextRequest(url)
  const response = await GET(request)
  const { products, pages }: Data = await response.json()
  return { status: response.status, products, pages }
}

const verifySort = ({ order, key, products }: VerifySortParams) => {
  products.reduce((prevProduct, nextProduct, index) => {
    if (order === 'asc') {
      expect(prevProduct[key]).toBeLessThanOrEqual(nextProduct[key])
    }
    if (order === 'desc') {
      expect(prevProduct[key]).toBeGreaterThanOrEqual(nextProduct[key])
    }
    return products[index]
  }, products[0])
}

beforeAll(async () => await seedProducts())

describe('GET /api/products', () => {
  describe('given the search and sort are not applied', () => {
    it('returns status code 200 and paginated products on the first page', async () => {
      const { status, products, pages } = await getProducts()

      expect(status).toBe(200)
      expect(pages).toBe(2)
      expect(products.length).toBe(4)
    })

    it('returns status code 200 and paginated products on the second page', async () => {
      const { status, products, pages } = await getProducts({ page: 2 })

      expect(status).toBe(200)
      expect(pages).toBe(2)
      expect(products.length).toBe(3)
    })
  })

  describe('given the products matched the search', () => {
    it('returns status code 200 and matching products', async () => {
      const { status, products } = await getProducts({ search: 'A' })

      expect(status).toBe(200)
      expect(products.length).toBe(2)

      products.forEach((product) => {
        expect(product.name.startsWith('A')).toBeTruthy()
      })
    })
  })

  describe('given the products matched the search in lowercase', () => {
    it('returns status code 200 and matching products', async () => {
      const { status, products } = await getProducts({ search: 'a' })

      expect(status).toBe(200)
      expect(products.length).toBe(2)

      products.forEach((product) => {
        expect(product.name.startsWith('A')).toBeTruthy()
      })
    })
  })

  describe('given no products matched the search', () => {
    it('returns status code 200 and empty array', async () => {
      const { status, products } = await getProducts({ search: 'xyz' })

      expect(status).toBe(200)
      expect(products.length).toBe(0)
      expect(products).toEqual([])
    })
  })

  describe('given the search is invalid', () => {
    describe('given the search is )', () => {
      it('returns status code 200', async () => {
        const { status } = await getProducts({ search: ')' })
        expect(status).toBe(200)
      })
    })

    describe('given the search is #', () => {
      it('returns status code 200 and all products', async () => {
        const { status } = await getProducts({ search: '#' })
        expect(status).toBe(200)
      })
    })
  })

  describe('given the price sort is applied', () => {
    describe('in ascending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'price.asc' })

        expect(status).toBe(200)
        verifySort({ order: 'asc', key: 'price', products })
      })
    })

    describe('in descending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'price.desc' })

        expect(status).toBe(200)
        verifySort({ order: 'desc', key: 'price', products })
      })
    })
  })

  describe('given the rating sort is applied', () => {
    describe('in descending order', () => {
      it('returns status code 200 sorted products', async () => {
        const { status, products } = await getProducts({ sort: 'rating.desc' })

        expect(status).toBe(200)
        verifySort({ order: 'desc', key: 'rating', products })
      })
    })
  })

  describe('given the sort is invalid', () => {
    it('returns status code 200', async () => {
      const { status } = await getProducts({ sort: 'rating.xyz' })
      expect(status).toBe(200)
    })
  })

  describe('given the search and sort are applied', () => {
    it('return status code 200 and filtered sorted products', async () => {
      const { status, products } = await getProducts({
        search: 'A',
        sort: 'price.asc',
      })

      expect(status).toBe(200)
      expect(products.length).toBe(2)
      verifySort({ order: 'asc', key: 'price', products })
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
})

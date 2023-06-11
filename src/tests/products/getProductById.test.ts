import { NextRequest } from 'next/server'
import { GET } from '@app/api/products/[id]/route'
import { seedProducts } from '@config/mongoMemoryServer'
import { BASE_URL } from '@baseUrl'
import { Product } from 'types/product'

const getProductById = async (id: string) => {
  const url = `${BASE_URL}/api/products/${id}`
  const request = new NextRequest(url)
  const response = await GET(request, { params: { id } })
  const product: Product = await response.json()
  return { status: response.status, statusText: response.statusText, product }
}

beforeAll(async () => await seedProducts())

describe('GET /api/products/:id', () => {
  describe('given the product exists', () => {
    it('returns status code 200 and the product', async () => {
      const id = '62dbfa7f31c12b460f19f2b5'
      const { status, product } = await getProductById(id)

      expect(status).toBe(200)
      expect(product._id).toBe(id)
    })
  })
  describe('given the product does not exist', () => {
    it('returns status code 404', async () => {
      const id = '62dbfa7f31c12b460f19f2b4'
      const { status, statusText } = await getProductById(id)

      expect(status).toBe(404)
      expect(statusText).toBe('Product not found')
    })
  })
})

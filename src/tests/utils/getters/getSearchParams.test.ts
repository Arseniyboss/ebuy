import { NextRequest } from 'next/server'
import { BASE_URL } from '@baseUrl'
import { getSearchParams } from '@utils/getters/getSearchParams'

it('gets search params', () => {
  const url = `${BASE_URL}/api/products?search=Airpods`
  const request = new NextRequest(url)
  const search = getSearchParams(request, 'search')
  expect(search).toBe('Airpods')
})

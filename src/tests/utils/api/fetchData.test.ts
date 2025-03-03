import { http } from 'msw'
import { setupServer } from 'msw/node'
import { fetchData } from '@/utils/api/fetchData'
import { BASE_URL } from '@/baseUrl'

const user = {
  name: 'John',
  email: 'john@gmail.com',
}

const getRequestHandler = (route: string, response: Response) => {
  return http.get(`${BASE_URL}/api${route}`, () => response)
}

const response = Response.json(user)
const requestHandler = getRequestHandler('/user', response)

const handlers = [requestHandler]
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

it('handles successful response', async () => {
  const { data } = await fetchData('/user')
  expect(data).toEqual(user)
})

it('handles client error', async () => {
  const response = Response.json({ error: 'Bad Request' }, { status: 500 })
  const requestHandler = getRequestHandler('/users', response)

  server.use(requestHandler)

  const { error } = await fetchData('/users')
  expect(error).toBe('Bad Request')
})

it('handles server error', async () => {
  const response = Response.json({ error: 'Internal Server Error' }, { status: 500 })
  const requestHandler = getRequestHandler('/products', response)

  server.use(requestHandler)

  const { error } = await fetchData('/products')
  expect(error).toBe('Internal Server Error')
})

it('handles network error', async () => {
  const response = Response.error()
  const requestHandler = getRequestHandler('/orders', response)

  server.use(requestHandler)

  const { error } = await fetchData('/orders')
  expect(error).toBe('Fetch Failed')
})

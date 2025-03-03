import { throwError } from '@/utils/api/throwError'

type Body = {
  error: string
}

it('returns an error and status code as a json response', async () => {
  const response = throwError({ error: 'Unauthorized', status: 401 })
  const { error }: Body = await response.json()

  expect(response.status).toBe(401)
  expect(response.statusText).toBe('Unauthorized')
  expect(error).toBe('Unauthorized')
})

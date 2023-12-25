import { POST } from '@/app/api/users/logout/route'

const logout = () => {
  const { status, cookies } = POST()
  const accessToken = cookies.get('accessToken')
  return { status, accessToken }
}

describe('GET /api/users/logout', () => {
  it('returns status code 200 and logs the user out', async () => {
    const { status, accessToken } = logout()
    expect(status).toBe(200)
    expect(accessToken?.name).toBe('accessToken')
    expect(accessToken?.value).toBe('')
    expect(accessToken?.expires).toEqual(new Date(0))
  })
})

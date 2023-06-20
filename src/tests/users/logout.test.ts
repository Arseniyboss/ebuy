import { POST } from '@app/api/users/logout/route'

const logout = async () => {
  const { status, cookies } = await POST()
  const cookie = cookies.get('token')
  return { status, cookie }
}

describe('GET /api/users/logout', () => {
  it('returns status code 200 and logs the user out', async () => {
    const { status, cookie } = await logout()

    expect(status).toBe(200)
    expect(cookie?.name).toBe('token')
    expect(cookie?.value).toBeUndefined()
    expect(cookie?.expires).toEqual(new Date(0))
  })
})

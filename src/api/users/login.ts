import { BASE_URL } from '@baseUrl'

type UserCredentials = {
  email: string
  password: string
}

export const login = async ({ email, password }: UserCredentials) => {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  return response
}

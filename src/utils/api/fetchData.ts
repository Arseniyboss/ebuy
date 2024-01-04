import { BASE_URL } from '@/baseUrl'
import { getAccessToken } from '@/auth/getters/getAccessToken'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type Options = {
  method: Method
  body: any
  tags: string[]
  stripeSessionId: string
}

type SuccessState<T> = {
  data: T
  error?: undefined
}

type ErrorState = {
  data?: undefined
  error: string
}

type Response<T> = SuccessState<T> | ErrorState

export const fetchData = async <T>(
  route: string,
  options?: Partial<Options>
): Promise<Response<T>> => {
  const accessToken = await getAccessToken()

  const response = await fetch(`${BASE_URL}/api${route}`, {
    method: options?.method || 'GET',
    body: JSON.stringify(options?.body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken || options?.stripeSessionId}`,
    },
    next: {
      tags: options?.tags,
    },
  })

  if (!response.ok) {
    return { error: response.statusText }
  }

  const data: T = await response.json()
  return { data }
}

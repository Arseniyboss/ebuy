import { BASE_URL } from '@/baseUrl'
import { getToken } from '@/auth/token/getters/getToken'

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
  const token = await getToken()

  const response = await fetch(`${BASE_URL}/api${route}`, {
    method: options?.method || 'GET',
    body: JSON.stringify(options?.body),
    headers: {
      Authorization: `Bearer ${token || options?.stripeSessionId}`,
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

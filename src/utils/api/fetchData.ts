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
  options: Partial<Options> = {}
): Promise<Response<T>> => {
  const { method, body, tags, stripeSessionId } = options
  const accessToken = await getAccessToken()

  try {
    const response = await fetch(`${BASE_URL}/api${route}`, {
      method: method || 'GET',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken || stripeSessionId}`,
      },
      next: { tags },
    })

    if (!response.ok) {
      const { error }: ErrorState = await response.json()
      return { error }
    }

    const data: T = await response.json()
    return { data }
  } catch (error) {
    return { error: 'Fetch Failed' }
  }
}

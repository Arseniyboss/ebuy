import { cookies } from 'next/headers'

export const getSessionId = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('sessionId')?.value
}

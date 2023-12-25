import { cookies } from 'next/headers'

export const getSessionId = () => {
  return cookies().get('sessionId')?.value
}

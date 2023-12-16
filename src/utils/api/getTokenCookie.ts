import { User } from './withAuth/types'
import { generatePayload } from '@/auth/token/generators/generatePayload'
import { generateTokenCookie } from '@/auth/token/generators/generateTokenCookie'

export const getTokenCookie = async (user: User) => {
  const payload = generatePayload(user)
  const tokenCookie = await generateTokenCookie(payload)
  return tokenCookie
}

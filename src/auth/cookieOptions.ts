import { fifteenMinutes } from '@/constants/time'

type SameSite = boolean | 'lax' | 'strict' | 'none'

type CookieSecurityOptions = {
  secure: boolean
  httpOnly: boolean
  sameSite: SameSite
}

interface SessionIdOptions extends CookieSecurityOptions {
  name: string
}

interface AccessTokenOptions extends SessionIdOptions {
  maxAge: number
}

const options: CookieSecurityOptions = {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'lax', // stops stripe from resetting the cookie
}

export const accessTokenOptions: AccessTokenOptions = {
  ...options,
  name: 'accessToken',
  maxAge: fifteenMinutes,
}

export const sessionIdOptions: SessionIdOptions = {
  ...options,
  name: 'sessionId',
}

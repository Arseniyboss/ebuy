import { kv } from '@vercel/kv'
import { isTest } from '@/constants/isTest'

export const setRefreshToken = (sessionId: string, refreshToken: string) => {
  if (isTest) return
  kv.set(sessionId, refreshToken)
}

export const deleteRefreshToken = (sessionId: string) => {
  if (isTest) return
  kv.del(sessionId)
}

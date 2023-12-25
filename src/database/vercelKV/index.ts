import { kv } from '@vercel/kv'
import { getSessionId } from '@/auth/getters/getSessionId'
import { isTest } from '@/constants/isTest'

export const getRefreshToken = async () => {
  if (isTest) return
  const sessionId = getSessionId()
  if (!sessionId) return
  return kv.get<string>(sessionId)
}

export const setRefreshToken = (sessionId: string, refreshToken: string) => {
  if (isTest) return
  kv.set(sessionId, refreshToken)
}

export const deleteRefreshToken = () => {
  if (isTest) return
  const sessionId = getSessionId()
  if (!sessionId) return
  kv.del(sessionId)
}

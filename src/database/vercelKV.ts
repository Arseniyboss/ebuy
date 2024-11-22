import { kv } from '@vercel/kv'
import { isTest } from '@/constants/isTest'
import { getSessionId } from '@/auth/getters/getSessionId'

export const getRefreshToken = async () => {
  if (isTest) return
  const sessionId = await getSessionId()
  if (!sessionId) return
  return kv.get<string>(sessionId)
}

export const setRefreshToken = (sessionId: string, refreshToken: string) => {
  if (isTest) return
  return kv.set(sessionId, refreshToken)
}

export const deleteRefreshToken = async () => {
  if (isTest) return
  const sessionId = await getSessionId()
  if (!sessionId) return
  return kv.del(sessionId)
}

import { NextResponse } from 'next/server'
import { getRefreshToken } from '@/database/vercelKV'
import { verifyRefreshToken } from '@/auth/verifyTokens'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { generateSessionId } from '@/auth/generators/generateSessionId'
import { deleteRefreshToken } from '@/database/vercelKV'
import { setRefreshToken } from '@/database/vercelKV'
import { accessTokenOptions, sessionIdOptions } from '@/auth/cookieOptions'

export const refreshAccessToken = async () => {
  const response = NextResponse.next()
  const refreshToken = await getRefreshToken()
  const session = await verifyRefreshToken(refreshToken)

  if (!refreshToken || !session) return response

  const accessToken = await generateAccessToken(session.user)
  const newSessionId = generateSessionId()

  deleteRefreshToken()
  setRefreshToken(newSessionId, refreshToken)

  response.cookies.set({ ...accessTokenOptions, value: accessToken })
  response.cookies.set({ ...sessionIdOptions, value: newSessionId })

  return response
}

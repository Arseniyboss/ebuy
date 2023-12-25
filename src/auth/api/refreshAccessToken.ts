import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken } from '@/auth/verifyTokens'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { getSessionId } from './getCookies'
import { generateSessionId } from '@/auth/generators/generateSessionId'
import { setRefreshToken, deleteRefreshToken } from '@/database/vercelKV/edge'
import { getRefreshToken } from '@/database/vercelKV'
import { accessTokenOptions, sessionIdOptions } from '@/auth/cookieOptions'
import { isTest } from '@/constants/isTest'

export const refreshAccessToken = async (request: NextRequest) => {
  if (isTest) return NextResponse.next()

  const refreshToken = await getRefreshToken()

  if (!refreshToken) return NextResponse.next()

  const session = await verifyRefreshToken(refreshToken)

  if (!session) return NextResponse.next()

  const sessionId = getSessionId(request)

  if (!sessionId) return NextResponse.next()

  const accessToken = await generateAccessToken(session.user)
  const newSessionId = generateSessionId()

  setRefreshToken(newSessionId, refreshToken)
  deleteRefreshToken(sessionId)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('accessToken', accessToken)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.cookies.set({ ...accessTokenOptions, value: accessToken })
  response.cookies.set({ ...sessionIdOptions, value: newSessionId })

  return response
}

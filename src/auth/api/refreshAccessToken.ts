import { NextRequest, NextResponse } from 'next/server'
import { getRefreshToken } from '@/database/vercelKV'
import { verifyRefreshToken } from '@/auth/verifyTokens'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { generateSessionId } from '@/auth/generators/generateSessionId'
import { deleteRefreshToken } from '@/database/vercelKV'
import { setRefreshToken } from '@/database/vercelKV'
import { accessTokenOptions, sessionIdOptions } from '@/auth/cookieOptions'

export const refreshAccessToken = async (request: NextRequest) => {
  const refreshToken = await getRefreshToken()
  const session = await verifyRefreshToken(refreshToken)

  if (!refreshToken || !session) {
    return NextResponse.next()
  }

  const accessToken = await generateAccessToken(session.user)
  const sessionId = generateSessionId()

  deleteRefreshToken()
  setRefreshToken(sessionId, refreshToken)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('accessToken', accessToken)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.cookies.set({ ...accessTokenOptions, value: accessToken })
  response.cookies.set({ ...sessionIdOptions, value: sessionId })

  return response
}

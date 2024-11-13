import { NextResponse } from 'next/server'
import { User } from '@/middleware/api/types'
import { generatePayload } from '@/auth/generators/generatePayload'
import { generateSessionId } from '@/auth/generators/generateSessionId'
import { generateAccessToken } from '@/auth/generators/generateAccessToken'
import { generateRefreshToken } from '@/auth/generators/generateRefreshToken'
import { deleteRefreshToken, setRefreshToken } from '@/database/vercelKV'
import { accessTokenOptions, sessionIdOptions } from '@/auth/cookieOptions'
import { isTest } from '@/constants/isTest'

export const generateAuthTokens = async (user: User, status = 200) => {
  const response = NextResponse.json(null, { status })
  const payload = generatePayload(user)
  const accessToken = await generateAccessToken(payload)
  response.cookies.set({ ...accessTokenOptions, value: accessToken })

  if (isTest) return response

  const refreshToken = await generateRefreshToken(payload)
  const sessionId = generateSessionId()
  response.cookies.set({ ...sessionIdOptions, value: sessionId })
  deleteRefreshToken()
  setRefreshToken(sessionId, refreshToken)

  return response
}

import { NextResponse } from 'next/server'
import { deleteRefreshToken } from '@/database/vercelKV'

export const POST = () => {
  const response = NextResponse.json(null, { status: 200 })
  response.cookies.delete('accessToken')
  response.cookies.delete('sessionId')
  deleteRefreshToken()
  return response
}

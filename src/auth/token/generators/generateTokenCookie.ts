import { NextResponse } from 'next/server'
import { UserPayload } from '@/types/jwtPayload'
import { day, generateToken } from './generateToken'

export const generateTokenCookie = async (payload: UserPayload) => {
  const token = await generateToken(payload)
  const response = NextResponse.next()
  const tokenCookie = response.cookies.set({
    name: 'token',
    value: token,
    maxAge: day,
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    sameSite: 'lax', // stops stripe from resetting token cookie
  })
  return tokenCookie.toString()
}

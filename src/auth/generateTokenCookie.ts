import { NextResponse } from 'next/server'
import { JwtPayload } from 'types/jwtPayload'
import { hour, generateToken } from './generateToken'

export const generateTokenCookie = async (payload: JwtPayload) => {
  const token = await generateToken(payload)
  const response = NextResponse.next()
  const tokenCookie = response.cookies.set({
    name: 'token',
    value: token,
    maxAge: hour,
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    sameSite: 'strict',
  })
  return tokenCookie.toString()
}

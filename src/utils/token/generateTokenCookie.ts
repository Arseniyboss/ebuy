import { NextResponse } from 'next/server'
import { hour, generateToken } from './generateToken'

type Payload = {
  id: string
  name: string
}

export const generateTokenCookie = async (payload: Payload) => {
  const token = await generateToken(payload)
  const response = NextResponse.next()
  const tokenCookie = response.cookies.set({
    name: 'token',
    value: token,
    maxAge: hour,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  })
  return tokenCookie.toString()
}

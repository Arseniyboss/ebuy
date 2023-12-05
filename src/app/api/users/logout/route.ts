import { setCookie } from '@/utils/api/setCookie'
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.next()
  const tokenCookie = response.cookies.delete('token')
  return setCookie(tokenCookie.toString())
}

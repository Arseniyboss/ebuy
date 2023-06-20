import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.next()
  const tokenCookie = response.cookies.delete('token')

  return NextResponse.json(null, {
    status: 200,
    headers: { 'Set-Cookie': tokenCookie.toString() },
  })
}

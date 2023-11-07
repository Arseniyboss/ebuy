import { NextResponse } from 'next/server'

export const setCookie = (cookie: string) => {
  return NextResponse.next({ headers: { 'Set-Cookie': cookie } })
}

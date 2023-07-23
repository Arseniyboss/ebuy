import { NextResponse } from 'next/server'

export const setCookie = (cookie: string, status = 200) => {
  return NextResponse.json(null, {
    status,
    headers: { 'Set-Cookie': cookie },
  })
}

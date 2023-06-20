import { NextResponse } from 'next/server'
import { BASE_URL } from '@baseUrl'

export const redirect = (url: string) => {
  return NextResponse.redirect(`${BASE_URL}${url}`)
}

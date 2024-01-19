import { NextResponse } from 'next/server'

type Error = {
  error: string
  status: number
}

export const throwError = ({ error, status }: Error) => {
  // return error in JSON response body because custom statusText is not set on Vercel
  return NextResponse.json({ error }, { status, statusText: error })
}

import { NextResponse } from 'next/server'

type Error = {
  error: string
  status: number
}

export const throwError = ({ error, status }: Error) => {
  return NextResponse.json(null, { status, statusText: error })
}

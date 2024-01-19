import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/utils/api/getUser'

type Error = {
  error: string
}

export type User = NonNullable<Awaited<ReturnType<typeof getUser>>>

export type ReturnValue<T> = NextResponse<T> | Promise<NextResponse<T | Error>>

export type Params = {
  request: NextRequest
  user: User
}

export type Handler<T> = ({ request, user }: Params) => ReturnValue<T>

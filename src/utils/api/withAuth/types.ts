import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/utils/api/getUser'

export type User = NonNullable<Awaited<ReturnType<typeof getUser>>>

export type ReturnValue<T> = Promise<NextResponse<T>>

export type Params = {
  request: NextRequest
  user: User
}

export type Handler<T> = ({ request, user }: Params) => ReturnValue<T>

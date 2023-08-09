import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const GET = async (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get('tag')!
  revalidateTag(tag)
  return NextResponse.json({ revalidated: true })
}

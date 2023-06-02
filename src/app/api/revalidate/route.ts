import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')!
  revalidateTag(tag)
  return new NextResponse(JSON.stringify({ revalidated: true }))
}

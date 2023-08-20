import { NextRequest } from 'next/server'

export const getSearchParams = (request: NextRequest, name: string) => {
  const searchParams = request.nextUrl.searchParams.get(name)!
  return searchParams
}

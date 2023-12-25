import { NextRequest } from 'next/server'

export const getCookie = (request: NextRequest, name: string) => {
  return request.cookies.get(name)?.value
}

export const getAccessToken = (request: NextRequest) => {
  return getCookie(request, 'accessToken')
}

export const getSessionId = (request: NextRequest) => {
  return getCookie(request, 'sessionId')
}

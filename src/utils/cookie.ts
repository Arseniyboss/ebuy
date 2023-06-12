import { cookies } from 'next/headers'

export const setCookie = (key: string, value: any) => {
  if (typeof value === 'string') {
    return cookies().set(key, value)
  }
  cookies().set(key, JSON.stringify(value))
}

export const getCookie = <T = string>(name: string): T | undefined => {
  const cookie = cookies().get(name)?.value as T

  if (!cookie) return

  try {
    return JSON.parse(cookie.toString())
  } catch {
    return cookie
  }
}

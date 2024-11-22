'use server'

import { cookies, headers } from 'next/headers'

// async because it returns a promise in updateUser.ts

export const getAccessToken = async () => {
  const cookieStore = await cookies()
  const headerStore = await headers()
  return cookieStore.get('accessToken')?.value || headerStore.get('accessToken')
}

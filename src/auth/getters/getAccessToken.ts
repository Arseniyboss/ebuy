'use server'

import { cookies, headers } from 'next/headers'

// async because it returns a promise in updateUser.ts

export const getAccessToken = async () => {
  return cookies().get('accessToken')?.value || headers().get('accessToken')
}

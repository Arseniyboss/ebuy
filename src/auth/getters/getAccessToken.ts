'use server'

import { cookies } from 'next/headers'

// async because it returns a promise in updateUser.ts

export const getAccessToken = async () => {
  return cookies().get('accessToken')?.value
}

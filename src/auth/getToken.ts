'use server'

import { cookies } from 'next/headers'

// async because it returns a promise in updateUser.ts

export const getToken = async () => {
  return cookies().get('token')?.value
}

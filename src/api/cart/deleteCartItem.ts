'use server'

import { revalidateTag } from 'next/cache'
import { fetchData } from '@/utils/api/fetchData'

export const deleteCartItem = async (id: string) => {
  const { error } = await fetchData(`/cart/${id}`, { method: 'DELETE' })
  if (error) return error
  revalidateTag('user', 'max')
}

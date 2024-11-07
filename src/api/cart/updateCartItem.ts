'use server'

import { revalidateTag } from 'next/cache'
import { fetchData } from '@/utils/api/fetchData'

export const updateCartItem = async (id: string, quantity: number) => {
  const { error } = await fetchData(`/cart/${id}`, { method: 'PATCH', body: quantity })
  if (error) return error
  revalidateTag('user')
}

'use server'

import { cookies } from 'next/headers'
import { CartItem } from 'types/product'

export const addToCart = (cartItem: CartItem) => {
  cookies().set('cartItem', JSON.stringify(cartItem))
}

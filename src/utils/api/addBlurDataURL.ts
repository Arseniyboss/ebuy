import { CartItem } from '@/types/api'
import { generateBlurDataURL } from './generateBlurDataURL'

export const addBlurDataURL = (cartItems: CartItem[]) => {
  const cartItemPromises = cartItems.map(async (cartItem) => {
    const blurDataURL = await generateBlurDataURL(cartItem.image)
    return { ...cartItem, blurDataURL }
  })
  return cartItemPromises
}

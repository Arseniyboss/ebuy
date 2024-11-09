import { CartItem as CartItemType } from '@/types/api'
import { getUser } from '@/api/users/getUser'
import { addBlurDataURL } from '@/utils/api/addBlurDataURL'

export interface CartItem extends CartItemType {
  blurDataURL: string
}

export const getCartItems = async () => {
  const { data: user } = await getUser()
  const cartItems = user?.cartItems || []
  const cartItemPromises = addBlurDataURL(cartItems)
  return Promise.all(cartItemPromises)
}

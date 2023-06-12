'use server'

import { CartItem } from 'types/product'
import { getCookie, setCookie } from './cookie'
import { updateCartItem } from './updateCartItem'

export const addToCart = (cartItem: CartItem) => {
  const cartItems = getCookie<CartItem[]>('cartItems')

  if (!cartItems?.length || typeof cartItems !== 'object') {
    return setCookie('cartItems', [cartItem])
  }

  const isAlreadyInCart = cartItems.find((item) => item._id === cartItem._id)

  if (isAlreadyInCart) {
    const cartItems = updateCartItem(cartItem._id, cartItem.quantity)
    return setCookie('cartItems', cartItems)
  }

  setCookie('cartItems', [...cartItems, cartItem])
}

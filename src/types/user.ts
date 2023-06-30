import { CartItem } from './product'

export type User = {
  _id: string
  name: string
  email: string
  password: string
  cartItems: CartItem[]
}

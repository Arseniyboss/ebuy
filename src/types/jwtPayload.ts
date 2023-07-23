import { UserSchema } from './mongo/models'

export type UserPayload = {
  id: string
  name: string
  isAdmin: boolean
  cartItems: boolean
  shippingAddress: boolean
  paymentMethod: boolean
}

export interface User extends UserSchema {
  id: string
}

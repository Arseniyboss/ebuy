import { OmitCartItems, OmitPush } from './omitters'
import { CartItem } from './user'
import { User as UserType } from 'types/mongo/documents'

export type UserPayload = {
  id: string
  name: string
  isAdmin: boolean
  cartItems: boolean
  address: boolean
  paymentMethod: boolean
}

export interface User extends OmitCartItems<UserType> {
  cartItems: OmitPush<CartItem[]>
}

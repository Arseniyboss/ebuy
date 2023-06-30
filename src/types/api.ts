import { OmitId } from './mongo'
import {
  Review as ReviewType,
  CartItem as CartItemType,
  Product as ProductType,
} from './product'
import { User as UserType } from './user'

export type Review = OmitId<ReviewType>
export type CartItem = OmitId<CartItemType>
export type Product = OmitId<ProductType>
export type User = Omit<UserType, '_id' | 'cartItems'>
export type UserCredentials = Pick<UserType, 'email' | 'password'>

import {
  Review as ReviewType,
  CartItem as CartItemType,
  Product as ProductType,
} from './product'
import { User as UserType } from './user'

type AssignId<T> = T & {
  _id: string
}

export interface Review extends AssignId<ReviewType> {
  createdAt: string
}
export interface Product extends AssignId<ProductType> {
  reviews: Review[]
}
export type CartItem = AssignId<CartItemType>
export type User = Omit<UserType, '_id' | 'cartItems'>
export type UserCredentials = Pick<UserType, 'email' | 'password'>

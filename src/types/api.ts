import { Model } from 'mongoose'
import {
  Review as ReviewType,
  CartItem as CartItemType,
  Product as ProductType,
} from './product'
import { User as UserType } from './user'

type AssignId<T> = T & {
  _id: string
}

export type Review = AssignId<ReviewType>
export type CartItem = AssignId<CartItemType>
export type Product = AssignId<ProductType>
export type User = Omit<UserType, '_id' | 'cartItems'>
export type UserCredentials = Pick<UserType, 'email' | 'password'>

export type ProductModel = Model<Product>

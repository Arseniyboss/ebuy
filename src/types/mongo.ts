import { Types, Model } from 'mongoose'
import { Review, CartItem, Product } from './product'
import { User as UserType } from './user'

type AssignId = {
  _id: Types.ObjectId
}

export type OmitId<T> = Omit<T, '_id'>
export type IdMapper<T> = OmitId<T> & AssignId

type OmitNestedId<T, M, P extends string> = Omit<T, P> & {
  [A in P]: OmitId<M>[]
}

type ProductSchema = OmitNestedId<Product, Review, 'reviews'>

export type ProductModel = Model<ProductSchema>

export interface User extends UserType {
  matchPassword: (password: string) => Promise<boolean>
}

type UserSchema = OmitNestedId<User, CartItem, 'cartItems'>

export type UserModel = Model<UserSchema>

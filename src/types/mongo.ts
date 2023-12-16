import { Types, mongo } from 'mongoose'
import { Review as ReviewType, Product as ProductType } from '@/types/product'
import { CartItem as CartItemType, User as UserType } from '@/types/user'
import { Order as OrderType } from '@/types/order'

export type Document<T> = Promise<mongo.WithId<T>[]>

export type WithId<T> = T & {
  _id: Types.ObjectId
}

export interface Review extends WithId<ReviewType> {
  userId: Types.ObjectId
}

export interface Product extends WithId<ProductType> {
  reviews: Review[]
}

export type CartItem = WithId<CartItemType>

export interface User extends WithId<UserType> {
  cartItems: CartItem[]
}

export interface Order extends WithId<OrderType> {
  userId: Types.ObjectId
  orderItems: CartItem[]
}

export type Data = Product | User | Order

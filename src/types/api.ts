import {
  OmitId,
  OmitUserId,
  OmitPassword,
  OmitReviews,
  OmitCartItems,
} from './omitters'
import { Review as ReviewType, Product as ProductType } from './product'
import { CartItem as CartItemType, User as UserType } from './user'
import { Order as OrderType } from './order'

type WithId<T> = T & {
  _id: string
}

type WithUserId<T> = T & {
  userId: string
}

export type CartItem = WithId<OmitId<CartItemType>>

export interface User extends OmitCartItems<WithId<OmitPassword<UserType>>> {
  cartItems: CartItem[]
}

export interface Review extends WithUserId<OmitUserId<ReviewType>> {
  createdAt: string
  updatedAt: string
}

export interface Product extends OmitReviews<WithId<ProductType>> {
  reviews: Review[]
}

export type Order = WithId<OmitId<OrderType>>

export type GetProductsData = {
  products: Product[]
  pages: number
}

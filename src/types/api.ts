import { Review as ReviewType, Product as ProductType } from './product'
import { CartItem as CartItemType, User as UserType } from './user'

type WithId<T> = T & {
  _id: string
}

type WithUserId<T> = T & {
  userId: string
}

type OmitReviews<T> = Omit<T, 'reviews'>
type OmitUserId<T> = Omit<T, 'userId'>
type OmitPassword<T> = Omit<T, 'password'>
type OmitCartItems<T> = Omit<T, 'cartItems'>
export type OmitId<T> = Omit<T, '_id'>

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

export type GetProductsData = {
  products: Product[]
  pages: number
}

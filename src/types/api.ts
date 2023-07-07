import {
  Review as ReviewType,
  Product as ProductType,
  CartItem as CartItemType,
} from './product'
import { User as UserType } from './user'

type WithId<T> = T & {
  _id: string
}

export interface Review extends WithId<ReviewType> {
  createdAt: string
  updatedAt: string
}
export interface Product extends WithId<ProductType> {
  reviews: Review[]
}
export type CartItem = WithId<CartItemType>
export interface User extends WithId<Omit<UserType, 'password'>> {
  cartItems: CartItem[]
}

export type GetProductsData = {
  products: Product[]
  pages: number
}

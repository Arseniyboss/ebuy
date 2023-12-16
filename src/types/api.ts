import { Review as ReviewType, Product as ProductType } from './base/product'
import { CartItem as CartItemType, User as UserType } from './base/user'
import { Order as OrderType } from './base/order'

type WithId<T> = T & {
  _id: string
}

type OmitPassword<T> = Omit<T, 'password'>

export type CartItem = WithId<CartItemType>

export interface User extends WithId<OmitPassword<UserType>> {
  cartItems: CartItem[]
}

export interface Review extends ReviewType {
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Product extends WithId<ProductType> {
  reviews: Review[]
}

export interface Order extends WithId<OrderType> {
  orderItems: CartItem[]
}

export type GetProductsData = {
  products: Product[]
  pages: number
}

export type GetOrdersData = {
  orders: Order[]
  pages: number
}

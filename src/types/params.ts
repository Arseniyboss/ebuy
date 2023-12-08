import { CartItem } from '@/types/api'
import { Address, PaymentMethod } from '@/types/base/user'
import { UserOrdersStatus, OrdersStatus } from './base/order'

export type PageParams = {
  params: {
    id: string
  }
}

export type QueryParams = {
  page?: number
}

export type HomeQueryParams = QueryParams & {
  search?: string
  sort?: string
}

export type UserOrdersQueryParams = QueryParams & {
  status?: UserOrdersStatus
}

export type OrdersQueryParams = QueryParams & {
  status?: OrdersStatus
}

export type UserLoginParams = {
  email: string
  password: string
}

export type UserRegisterParams = {
  name: string
  email: string
  password: string
}

export type UpdateUserParams = {
  name: string
  email: string
  password: string
}

export type CreateReviewParams = {
  rating: number
  comment: string
}

export type UpdateProductParams = {
  id: string
  quantity: number
}

export type PlaceOrderParams = {
  orderItems: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
}

export interface CreateOrderParams extends PlaceOrderParams {
  totalPrice: number
}

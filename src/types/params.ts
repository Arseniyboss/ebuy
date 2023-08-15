import { CartItem } from 'types/api'
import { Address, PaymentMethod } from 'types/user'
import { UserOrdersStatus } from './order'

export type PageParams = {
  params: {
    id: string
  }
}

export interface QueryParams {
  page?: number
}

export interface HomeQueryParams extends QueryParams {
  search?: string
  sort?: string
}

export interface UserOrdersQueryParams extends QueryParams {
  status?: UserOrdersStatus
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

export type CreateOrderParams = {
  orderItems: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
  totalPrice: number
}

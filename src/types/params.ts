import { CartItem } from '@/types/api'
import { Address, PaymentMethod } from '@/types/user'
import { UserOrdersStatus, OrdersStatus } from './order'

export type PageParams = {
  params: Promise<{ id: string }>
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
}

export type UpdateUserPasswordParams = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
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

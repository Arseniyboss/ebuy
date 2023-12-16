import { Model, Types } from 'mongoose'
import { CartItem, Address, PaymentMethod } from './user'

export type Order = {
  orderItems: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
  totalPrice: number
  isPaid: boolean
  isDelivered: boolean
  paidAt?: string
  deliveredAt?: string
  deliveryDate?: string
}

export interface OrderDocument extends Order {
  userId: Types.ObjectId
  orderItems: Types.DocumentArray<CartItem>
}

export type OrderModel = Model<OrderDocument>

export type UserOrdersStatus = 'not-paid' | ''
export type OrdersStatus = 'not-delivered' | ''

export type Status = UserOrdersStatus | OrdersStatus

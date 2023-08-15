import { Types } from 'mongoose'
import { CartItem, Address, PaymentMethod } from './user'

export type Order = {
  userId: Types.ObjectId
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

export type UserOrdersStatus = 'not-paid' | ''

export type Status = {
  name: UserOrdersStatus
  label: string
}

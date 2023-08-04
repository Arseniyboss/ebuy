import { Types } from 'mongoose'
import { CartItem, Address, PaymentMethod } from './user'

export type Order = {
  user: Types.ObjectId
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

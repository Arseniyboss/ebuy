import { Types } from 'mongoose'
import { CartItem, Address, PaymentMethod } from './user'

export type Order = {
  userId: Types.ObjectId
  orderItems: CartItem[]
  address: Address
  paymentMethod: PaymentMethod
  totalPrice: number
  isPaid: boolean
  paidAt: string
  isDelivered: boolean
  deliveredAt: string
  deliveryDate: string
}

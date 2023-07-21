import { Types } from 'mongoose'

export type CartItem = {
  _id: Types.ObjectId
  name: string
  image: string
  price: number
  countInStock: number
  quantity: number
}

export type ShippingAddress = {
  address: string
  country: string
  city: string
  postalCode: string
}

type PaymentMethod = 'Stripe' | 'PayPal'

export type Checkout = {
  shippingAddress?: ShippingAddress
  paymentMethod?: PaymentMethod
}

export type User = {
  name: string
  email: string
  password: string
  cartItems: CartItem[]
  checkout?: Checkout
}

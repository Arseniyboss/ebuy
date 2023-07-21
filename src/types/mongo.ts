import { Types } from 'mongoose'
import { CartItem as CartItemType } from './api'

export type WithId<T> = T & {
  _id: Types.ObjectId
}

export interface CartItem extends CartItemType {
  id: string
  deleteOne: () => Promise<void>
}

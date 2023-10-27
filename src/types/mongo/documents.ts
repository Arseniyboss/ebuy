import { Types, mongo } from 'mongoose'
import { Product as ProductType } from '@/types/base/product'
import { CartItem as CartItemType, User as UserType } from '@/types/base/user'
import { Order as OrderType } from '@/types/base/order'

type WithId<T> = T & {
  _id: Types.ObjectId
}

export interface CartItem extends CartItemType {
  id: string
  deleteOne: () => Promise<void>
}

export type Document<T> = Promise<mongo.WithId<T>[]>

export type Product = WithId<ProductType>
export type User = WithId<UserType>
export type Order = WithId<OrderType>

export type Data = Product | User | Order

export type ProductDocuments = Document<ProductType>
export type UserDocuments = Document<UserType>
export type OrderDocuments = Document<OrderType>

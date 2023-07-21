import { Types, mongo } from 'mongoose'
import { CartItem as CartItemType } from 'types/api'
import { Product as ProductType } from 'types/product'
import { User as UserType } from 'types/user'

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

export type Data = Product | User
export type ProductDocuments = Document<ProductType>
export type UserDocuments = Document<UserType>

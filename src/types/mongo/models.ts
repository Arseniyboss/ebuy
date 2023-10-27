import { Types, Model } from 'mongoose'
import {
  OmitId,
  OmitUserId,
  OmitCartItems,
  OmitReviews,
  OmitTimestamps,
  OmitPush,
} from '@/types/omitters'
import { CartItem } from '@/types/mongo/documents'
import { Review, Product } from '@/types/base/product'
import { CartItem as CartSchemaType, User } from '@/types/base/user'
import { Order as OrderSchema } from '@/types/base/order'
import { CartItem as CartItemType, Review as ReviewType } from '@/types/api'

type WithUserId<T> = T & {
  userId: Types.ObjectId
}

// caveat: return type is any
type Push<T> =
  | {
      push: (...items: T[]) => number
    }
  | {
      push: (...items: any) => any
    }

type WithPush<T, K> = T & Push<K>

// type WithPush<T, K> = T & {
//   push: (...items: K[]) => number
// }

type WithCartItemPush<T> = WithPush<T, CartItemType>
type WithReviewPush<T> = WithPush<T, OmitTimestamps<ReviewType>>

type CartItems = WithCartItemPush<OmitPush<CartItem[]>>
export type Reviews = WithReviewPush<OmitPush<Review[]>>

interface ProductSchema extends OmitReviews<Product> {
  reviews: Reviews
}

export interface UserSchema extends OmitCartItems<User> {
  cartItems: CartItems
  matchPassword: (password: string) => Promise<boolean>
}

export type ReviewSchema = WithUserId<OmitUserId<Review>>
export type CartSchema = OmitId<CartSchemaType>

export type ProductModel = Model<ProductSchema>
export type UserModel = Model<UserSchema>
export type OrderModel = Model<OrderSchema>

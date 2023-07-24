import { Types, Model } from 'mongoose'
import {
  OmitId,
  OmitUserId,
  OmitCartItems,
  OmitReviews,
  OmitTimestamps,
  OmitPush,
} from 'types/omitters'
import { CartItem } from 'types/mongo/documents'
import { Review, Product } from 'types/product'
import { CartItem as CartSchemaType, User } from 'types/user'
import { CartItem as CartItemType, Review as ReviewType } from 'types/api'

type WithUserId<T> = T & {
  userId: Types.ObjectId
}

type WithPush<T, K> = T & {
  push: (...items: K[]) => number
}

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

import { Model, Types } from 'mongoose'

export type Review = {
  username: string
  rating: number
  comment: string
}

export interface Product {
  name: string
  image: string
  brand: string
  category: string
  description: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  reviews: Review[]
}

export interface ReviewDocument extends Review {
  userId: Types.ObjectId
}

export interface ProductDocument extends Product {
  reviews: Types.DocumentArray<ReviewDocument>
}

export type ProductModel = Model<ProductDocument>

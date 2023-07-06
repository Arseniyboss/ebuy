import { Schema, Model } from 'mongoose'

// user -> userId
// name -> username

export type Review = {
  user: Schema.Types.ObjectId | string
  name: string
  rating: number
  comment: string
}

export interface Product {
  name: string
  image: string
  brand: string
  category: string
  description: string
  rating: number
  numReviews: number
  price: number
  countInStock: number
  reviews: Review[]
}

export type CartItem = {
  name: string
  image: string
  price: number
  countInStock: number
  quantity: number
}

export type ProductModel = Model<Product>

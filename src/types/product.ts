import { Model } from 'mongoose'

export type Review = {
  user: string
  name: string
  rating: number
  comment: string
}

export type CartItem = {
  name: string
  image: string
  price: number
  countInStock: number
  quantity: number
}

export interface Product extends CartItem {
  brand: string
  category: string
  description: string
  rating: number
  numReviews: number
  isPublished: boolean
  reviews: Review[]
}

export type ProductModel = Model<Product>

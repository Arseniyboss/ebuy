import { Types } from 'mongoose'

export type Review = {
  userId: Types.ObjectId
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

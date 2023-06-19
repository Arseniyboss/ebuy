import { Model } from 'mongoose'

type Review = {
  user: string
  name: string
  rating: number
  comment: string
}

export type Product = {
  _id: string
  name: string
  image: string
  brand: string
  category: string
  description: string
  rating: number
  numReviews: number
  price: number
  countInStock: number
  isPublished: boolean
  reviews?: Review[]
}

export type ProductModel = Model<Product>

export interface CartItem extends Product {
  quantity: number
}

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
  discountPrice: number
  countInStock: number
  isPublished: boolean
  reviews?: Review[]
}

export interface CartItem {
  _id: string
  name: string
  image: string
  price: number
  countInStock: number
  quantity: number
}

import { Product } from 'types/product'
import { Schema, models, model, Model } from 'mongoose'

type ProductModel = Model<Product>

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
})

const Product =
  (models.Product as ProductModel) || model<Product>('Product', productSchema)

export default Product

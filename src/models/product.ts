import { Schema, models, model } from 'mongoose'
import { ReviewSchema, ProductModel } from 'types/mongo/models'
import { Product as ProductSchema } from 'types/product'

const reviewSchema = new Schema<ReviewSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true, _id: false }
)

const productSchema = new Schema<ProductSchema>({
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
  reviews: [reviewSchema],
})

const Product: ProductModel = models.Product || model('Product', productSchema)

export default Product

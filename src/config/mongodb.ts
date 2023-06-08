import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/product'
import products from '../mocks/products'

dotenv.config()

const isConnected = mongoose.connection.readyState === 1

export const connectToDB = async () => {
  if (isConnected || process.env.NODE_ENV === 'test') return
  if (process.env.TEST_MONGO_URI) {
    await mongoose.connect(process.env.TEST_MONGO_URI)
  } else {
    await mongoose.connect(process.env.MONGO_URI)
  }
}

export const seedProducts = async () => {
  await Product.insertMany(products)
}

export const deleteProducts = async () => {
  await Product.deleteMany()
}

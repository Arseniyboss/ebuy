import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '@/models/product'
import User from '@/models/user'
import Order from '@/models/order'
import products from '@/mocks/products'
import users from '@/mocks/users'
import orders from '@/mocks/orders'

dotenv.config({ quiet: true })

const isConnected = mongoose.connection.readyState === 1
const isNotCypressTest = process.env.CYPRESS_TEST !== 'true'

const getMongoURI = (env: typeof process.env) => {
  if (env.CYPRESS_TEST === 'true') {
    return process.env.TEST_MONGO_URI
  }
  if (env.NODE_ENV === 'development') {
    return process.env.DEV_MONGO_URI
  }
  if (env.NODE_ENV === 'production') {
    return process.env.MONGO_URI
  }
}

export const connectToDB = async () => {
  if (isConnected || process.env.NODE_ENV === 'test') return
  const uri = getMongoURI(process.env)!
  await mongoose.connect(uri)
}

export const seedProducts = async () => {
  if (isNotCypressTest) return
  await Product.insertMany(products)
}

export const deleteProducts = async () => {
  if (isNotCypressTest) return
  await Product.deleteMany()
}

export const seedUsers = async () => {
  if (isNotCypressTest) return
  await User.insertMany(users)
}

export const deleteUsers = async () => {
  if (isNotCypressTest) return
  await User.deleteMany()
}

export const seedOrders = async () => {
  if (isNotCypressTest) return
  await Order.insertMany(orders)
}

export const deleteOrders = async () => {
  if (isNotCypressTest) return
  await Order.deleteMany()
}

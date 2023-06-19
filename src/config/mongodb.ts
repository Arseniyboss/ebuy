import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from '../models/product'
import User from '@models/user'
import products from '../mocks/products'
import users from '@mocks/users'
// import { Data } from './mongoMemoryServer'

dotenv.config()

const isConnected = mongoose.connection.readyState === 1

export const connectToDB = async () => {
  if (isConnected || process.env.NODE_ENV === 'test') return
  if (process.env.CYPRESS_TEST === 'true') {
    await mongoose.connect(process.env.TEST_MONGO_URI)
  } else {
    await mongoose.connect(process.env.MONGO_URI)
  }
}

// export const seedCollection = async (name: string, data: Data[]) => {
//   if (process.env.CYPRESS_TEST !== 'true') return
//   const collections = mongoose.connection.collections
//   const collection = collections[name]
//   await collection.insertMany(data)
// }

// export const deleteCollection = async (name: string) => {
//   if (process.env.CYPRESS_TEST !== 'true') return
//   const collections = mongoose.connection.collections
//   const collection = collections[name]
//   await collection.deleteMany()
// }

export const seedProducts = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await Product.insertMany(products)
  // await seedCollection('products', products)
}

export const deleteProducts = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await Product.deleteMany()
  // await deleteCollection('products')
}

export const seedUsers = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await User.insertMany(users)
  // await seedCollection('users', users)
}

export const deleteUsers = async () => {
  if (process.env.CYPRESS_TEST !== 'true') return
  await User.deleteMany()
  // await deleteCollection('users')
}

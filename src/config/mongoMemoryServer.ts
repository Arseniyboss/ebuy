import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Data, Document, Product, User, Order } from '@/types/mongo'
import products from '@/mocks/products'
import users from '@/mocks/users'
import orders from '@/mocks/orders'

const collections = mongoose.connection.collections

let mongoMemoryServer: MongoMemoryServer

export const connectToDB = async () => {
  mongoMemoryServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoMemoryServer.getUri())
}

export const disconnectFromDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
  await mongoose.connection.close()
  await mongoMemoryServer.stop()
}

export const seedCollection = async (name: string, data: Data[]) => {
  const collection = collections[name]
  await collection.insertMany(data)
}

export const seedProducts = async () => {
  await seedCollection('products', products)
}

export const seedUsers = async () => {
  await seedCollection('users', users)
}

export const seedOrders = async () => {
  await seedCollection('orders', orders)
}

const getDocuments = <T>(name: string) => {
  return collections[name].find().toArray() as Document<T>
}

export const getProducts = async () => {
  return getDocuments<Product>('products')
}

export const getUsers = async () => {
  return getDocuments<User>('users')
}

export const getOrders = async () => {
  return getDocuments<Order>('orders')
}

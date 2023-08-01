import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import products from '@mocks/products'
import users from '@mocks/users'
import {
  Data,
  Document,
  ProductDocuments,
  UserDocuments,
  OrderDocuments,
} from 'types/mongo/documents'

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

const getDocuments = <T>(name: string) => {
  return collections[name].find().toArray() as Document<T>
}

export const getProducts = async (): Promise<ProductDocuments> => {
  return getDocuments('products')
}

export const getUsers = async (): Promise<UserDocuments> => {
  return getDocuments('users')
}

export const getOrders = async (): Promise<OrderDocuments> => {
  return getDocuments('orders')
}

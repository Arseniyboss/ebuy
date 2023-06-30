import mongoose from 'mongoose'
import products from '@mocks/products'
import users from '@mocks/users'
import { IdMapper } from 'types/mongo'
import { Product } from 'types/product'
import { User } from 'types/user'
import { MongoMemoryServer } from 'mongodb-memory-server'

type Data = IdMapper<Product | User>
type Document<T> = Promise<mongoose.mongo.WithId<T>[]>
type Users = Document<User>
type Products = Document<Product>

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

export const getUsers = async (): Users => {
  return getDocuments('users')
}

export const getProducts = async (): Products => {
  return getDocuments('products')
}

import { seedCollection } from './mongoMemoryServer'
import products from '@mocks/products'

export const seedProducts = async () => {
  await seedCollection('products', products)
}

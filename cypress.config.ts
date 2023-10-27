import { defineConfig } from 'cypress'
import {
  connectToDB,
  seedProducts,
  deleteProducts,
  seedUsers,
  deleteUsers,
  seedOrders,
  deleteOrders,
} from './src/config/mongodb'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // @ts-ignore
      on('before:browser:launch', async () => {
        await connectToDB()
      })
      on('task', {
        seedProducts: async () => {
          await seedProducts()
          return null
        },
        deleteProducts: async () => {
          await deleteProducts()
          return null
        },
        seedUsers: async () => {
          await seedUsers()
          return null
        },
        deleteUsers: async () => {
          await deleteUsers()
          return null
        },
        seedOrders: async () => {
          await seedOrders()
          return null
        },
        deleteOrders: async () => {
          await deleteOrders()
          return null
        },
      })
    },
    baseUrl: 'http://localhost:3000',
    video: true,
  },
})

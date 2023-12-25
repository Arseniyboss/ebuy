import { defineConfig } from 'cypress'
import { exec } from 'child_process'
import {
  connectToDB,
  seedProducts,
  deleteProducts,
  seedUsers,
  deleteUsers,
  seedOrders,
  deleteOrders,
} from './src/database/mongoDB'

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
        async execute(command: string) {
          return new Promise((resolve, reject) => {
            try {
              resolve(exec(command))
            } catch (e) {
              reject(e)
            }
          })
        },
      })
    },
    baseUrl: 'http://localhost:3000',
    video: true,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
  env: {
    paypalEmail: process.env.PAYPAL_EMAIL,
    paypalPassword: process.env.PAYPAL_PASSWORD,
  },
})

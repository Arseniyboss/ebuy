import { defineConfig } from 'cypress'
import { connectToDB, seedProducts, deleteProducts } from './src/config/mongodb'

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
      })
    },
    baseUrl: 'http://localhost:3000',
  },
})

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CYPRESS_TEST: string
      TEST_MONGO_URI: string
      DEV_MONGO_URI: string
      MONGO_URI: string
      JWT_SECRET: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string
    }
  }
}

export {}

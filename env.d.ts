declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CYPRESS_TEST: string
      TEST_MONGO_URI: string
      DEV_MONGO_URI: string
      MONGO_URI: string
      KV_URL: string
      KV_REST_API_URL: string
      KV_REST_API_TOKEN: string
      KV_REST_API_READ_ONLY_TOKEN: string
      ACCESS_TOKEN_SECRET: string
      REFRESH_TOKEN_SECRET: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string
      PAYPAL_EMAIL: number
      PAYPAL_PASSWORD: string
    }
  }
}

export {}

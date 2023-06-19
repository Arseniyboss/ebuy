declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CYPRESS_TEST: string
      MONGO_URI: string
      TEST_MONGO_URI: string
      JWT_SECRET: string
    }
  }
}

export {}

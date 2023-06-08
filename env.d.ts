declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CYPRESS_TEST: boolean
      MONGO_URI: string
      TEST_MONGO_URI: string
    }
  }
}

export {}

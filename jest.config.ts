import nextJest from 'next/jest.js'
import { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)

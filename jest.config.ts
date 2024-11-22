import nextJest from 'next/jest'
import { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default createJestConfig(config)

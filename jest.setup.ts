import { connectToDB, disconnectFromDB } from '@config/mongoMemoryServer'

beforeAll(async () => await connectToDB())
afterAll(async () => await disconnectFromDB())

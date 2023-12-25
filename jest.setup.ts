import { connectToDB, disconnectFromDB } from '@/database/mongoMemoryServer'

beforeAll(async () => await connectToDB())
afterAll(async () => await disconnectFromDB())

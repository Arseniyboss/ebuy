import { connectDB, disconnectDB } from '@config/mongoMemoryServer'

beforeAll(async () => await connectDB())
afterAll(async () => await disconnectDB())

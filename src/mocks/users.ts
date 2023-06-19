import { hashSync } from 'bcryptjs'
import { Types } from 'mongoose'
const { ObjectId } = Types

const users = [
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashSync('123456', 10),
    isAdmin: true,
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
    name: 'John Doe',
    email: 'john@example.com',
    password: hashSync('123456', 10),
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b3'),
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: hashSync('123456', 10),
  },
]

export default users

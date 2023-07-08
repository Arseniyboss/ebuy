import { hashSync } from 'bcryptjs'
import { Types } from 'mongoose'
const { ObjectId } = Types

const users = [
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashSync('123456', 10),
    cartItems: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
    name: 'John Doe',
    email: 'john@example.com',
    password: hashSync('123456', 10),
    cartItems: [
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b5'),
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 129.99,
        countInStock: 3,
        quantity: 3,
      },
    ],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b3'),
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: hashSync('123456', 10),
    cartItems: [],
  },
]

export default users

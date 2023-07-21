import { hashSync } from 'bcryptjs'
import { Types } from 'mongoose'
import { User } from '@config/mongoMemoryServer'

const { ObjectId } = Types

const users: User[] = [
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b0'),
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: hashSync('123456', 10),
    cartItems: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
    name: 'John Doe',
    email: 'john@gmail.com',
    password: hashSync('123456', 10),
    cartItems: [
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b3'),
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 129.99,
        countInStock: 3,
        quantity: 3,
      },
    ],
    checkout: {
      shippingAddress: {
        address: 'Address',
        country: 'Country',
        city: 'City',
        postalCode: 'Postal Code',
      },
      paymentMethod: 'Stripe',
    },
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: hashSync('123456', 10),
    cartItems: [],
  },
]

export default users

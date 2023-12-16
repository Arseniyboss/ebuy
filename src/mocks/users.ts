import { hashSync } from 'bcryptjs'
import { Types } from 'mongoose'
import { User } from '@/types/mongo'

const { ObjectId } = Types

const users: User[] = [
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2a1'),
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: hashSync('123456', 10),
    isAdmin: true,
    cartItems: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2a2'),
    name: 'John Doe',
    email: 'john@gmail.com',
    password: hashSync('123456', 10),
    isAdmin: false,
    cartItems: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2a3'),
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: hashSync('123456', 10),
    isAdmin: false,
    cartItems: [
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 129.99,
        countInStock: 3,
        quantity: 3,
      },
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
        name: 'iPhone 11 Pro 256GB Memory',
        image: '/images/phone.jpg',
        price: 599.99,
        countInStock: 10,
        quantity: 1,
      },
    ],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2a4'),
    name: 'Kyle',
    email: 'kyle@gmail.com',
    password: hashSync('123456', 10),
    isAdmin: false,
    cartItems: [
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 129.99,
        countInStock: 3,
        quantity: 3,
      },
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
        name: 'iPhone 11 Pro 256GB Memory',
        image: '/images/phone.jpg',
        price: 599.99,
        countInStock: 10,
        quantity: 1,
      },
    ],
    address: {
      street: 'Street',
      country: 'Country',
      city: 'City',
      postalCode: 'Postal Code',
    },
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2a5'),
    name: 'Robert',
    email: 'robert@gmail.com',
    password: hashSync('123456', 10),
    isAdmin: false,
    cartItems: [
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        price: 129.99,
        countInStock: 3,
        quantity: 3,
      },
      {
        _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
        name: 'iPhone 11 Pro 256GB Memory',
        image: '/images/phone.jpg',
        price: 599.99,
        countInStock: 10,
        quantity: 1,
      },
    ],
    address: {
      street: 'Street',
      country: 'Country',
      city: 'City',
      postalCode: 'Postal Code',
    },
    paymentMethod: 'Stripe',
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2a6'),
    name: 'Mike',
    email: 'mike@gmail.com',
    password: hashSync('123456', 10),
    isAdmin: false,
    cartItems: [],
    address: {
      street: 'Street',
      country: 'Country',
      city: 'City',
      postalCode: 'Postal Code',
    },
    paymentMethod: 'Stripe',
  },
]

export default users

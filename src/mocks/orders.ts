import { Types } from 'mongoose'
import { Order } from 'types/mongo/documents'

const { ObjectId } = Types

const orders: Order[] = [
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2c1'),
    user: new ObjectId('62dbfa7f31c12b460f19f2a5'),
    orderItems: [
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
    totalPrice: 1999.96,
    isPaid: false,
    isDelivered: false,
  },
]

export default orders

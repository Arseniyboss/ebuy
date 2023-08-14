import { Types } from 'mongoose'
import { Order } from 'types/mongo/documents'

const { ObjectId } = Types

type BaseOrder = Omit<Order, '_id' | 'isPaid' | 'isDelivered'>

const baseOrder: BaseOrder = {
  userId: new ObjectId('62dbfa7f31c12b460f19f2a5'),
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
}

const orders: Order[] = [
  {
    ...baseOrder,
    _id: new ObjectId('62dbfa7f31c12b460f19f2c1'),
    isPaid: false,
    isDelivered: false,
  },
  {
    ...baseOrder,
    _id: new ObjectId('62dbfa7f31c12b460f19f2c2'),
    isPaid: true,
    paidAt: '11.08.2023',
    isDelivered: false,
    deliveryDate: '12.08.2023',
  },
  {
    ...baseOrder,
    _id: new ObjectId('62dbfa7f31c12b460f19f2c3'),
    isPaid: true,
    paidAt: '11.08.2023',
    isDelivered: true,
    deliveredAt: '12.08.2023',
  },
  {
    ...baseOrder,
    userId: new ObjectId('62dbfa7f31c12b460f19f2a6'),
    _id: new ObjectId('62dbfa7f31c12b460f19f2c4'),
    isPaid: false,
    isDelivered: false,
  },
]

export default orders

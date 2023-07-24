import { Types } from 'mongoose'
import { Product } from 'types/mongo/documents'

const { ObjectId } = Types

const products: Product[] = [
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b1'),
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    brand: 'Apple',
    category: 'Electronics',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    price: 129.99,
    countInStock: 3,
    rating: 4.5,
    numReviews: 7,
    reviews: [
      {
        userId: new ObjectId('62dbfa7f31c12b460f19f2a3'),
        username: 'Jane Doe',
        rating: 4,
        comment: 'Very Good Airpods!',
      },
      {
        userId: new ObjectId('62dbfa7f31c12b460f19f2a2'),
        username: 'John Doe',
        rating: 5,
        comment: '',
      },
    ],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b2'),
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 10,
    rating: 4,
    numReviews: 5,
    reviews: [
      {
        userId: new ObjectId('62dbfa7f31c12b460f19f2a2'),
        username: 'John Doe',
        rating: 4,
        comment: '',
      },
    ],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b3'),
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    rating: 5,
    numReviews: 3,
    reviews: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b4'),
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3.5,
    numReviews: 3,
    reviews: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b5'),
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 10,
    rating: 3.5,
    numReviews: 7,
    reviews: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b6'),
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 3,
    rating: 4,
    numReviews: 4,
    reviews: [],
  },
  {
    _id: new ObjectId('62dbfa7f31c12b460f19f2b7'),
    name: 'Sample product',
    image: '/images/sample.jpg',
    description: 'Sample description',
    brand: 'Sample brand',
    category: 'Sample category',
    price: 99.99,
    countInStock: 1,
    rating: 0,
    numReviews: 0,
    reviews: [],
  },
]

export default products

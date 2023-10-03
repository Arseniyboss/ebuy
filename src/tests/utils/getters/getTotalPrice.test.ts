import { getTotalPrice } from '@utils/getters/getTotalPrice'

const cartItems = [
  {
    _id: '1',
    name: 'Airpods',
    image: '/images/airpods.jpg',
    price: 129.99,
    countInStock: 3,
    quantity: 2,
  },
  {
    _id: '2',
    name: 'iPhone',
    image: '/images/phone.jpg',
    price: 599.99,
    countInStock: 5,
    quantity: 1,
  },
  {
    _id: '3',
    name: 'Sony Playstation',
    image: 'image 3',
    price: 399.99,
    countInStock: 7,
    quantity: 3,
  },
]

it('gets total price of cart items', () => {
  const totalPrice = getTotalPrice(cartItems)
  expect(totalPrice).toBe(2059.94)
})

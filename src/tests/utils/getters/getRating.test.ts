import { Types } from 'mongoose'
import { getRating } from '@/utils/getters/getRating'

const { ObjectId } = Types

const reviews = [
  {
    userId: new ObjectId('62dbfa7f31c12b460f19f2a2'),
    username: 'John Doe',
    rating: 5,
    comment: '',
  },
  {
    userId: new ObjectId('62dbfa7f31c12b460f19f2a3'),
    username: 'Jane Doe',
    rating: 4,
    comment: '',
  },
  {
    userId: new ObjectId('62dbfa7f31c12b460f19f2a4'),
    username: 'Kyle',
    rating: 3,
    comment: '',
  },
]

it('gets rating', () => {
  const rating = getRating(reviews)
  expect(rating).toBe(4)
})

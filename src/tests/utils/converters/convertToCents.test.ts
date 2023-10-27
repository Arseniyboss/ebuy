import { convertToCents } from '@/utils/converters/convertToCents'

it('converts price to cents', () => {
  const price = 399.99
  const priceInCents = convertToCents(price)
  expect(priceInCents).toBe(39999)
})

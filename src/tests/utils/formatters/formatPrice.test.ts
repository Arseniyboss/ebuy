import { formatPrice } from '@utils/formatters/formatPrice'

it('formats price', () => {
  const price = 10.123456
  const formattedPrice = formatPrice(price)
  expect(formattedPrice).toBe(10.12)
})

import { formatTotalPrice } from '@utils/formatters/formatTotalPrice'

it('formats total price', () => {
  const price = 399.901234
  const formattedPrice = formatTotalPrice(price)
  expect(formattedPrice).toBe('399.90')
})

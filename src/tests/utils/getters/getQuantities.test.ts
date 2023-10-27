import { getQuantities } from '@/utils/getters/getQuantities'

it('gets product quantities', () => {
  const quantities = getQuantities(5)
  expect(quantities).toEqual([1, 2, 3, 4, 5])
})

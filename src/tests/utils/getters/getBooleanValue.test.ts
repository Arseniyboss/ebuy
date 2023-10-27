import { getBooleanValue } from '@/utils/getters/getBooleanValue'

it('gets boolean value', () => {
  expect(getBooleanValue(undefined)).toBe(false)
  expect(getBooleanValue(0)).toBe(false)
  expect(getBooleanValue(1)).toBe(true)
  expect(getBooleanValue('John')).toBe(true)
  expect(getBooleanValue([1, 2, 3])).toBe(true)
  expect(getBooleanValue({ name: 'John', age: 20 })).toBe(true)
})

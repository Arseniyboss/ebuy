import { getDeliveryDate } from '@/utils/getters/getDeliveryDate'

it('gets order delivery date', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date('2024-05-10'))
  expect(getDeliveryDate()).toBe('11.05.2024')
  jest.useRealTimers()
})

import { getCurrentDate } from '@/utils/getters/getCurrentDate'

it('gets current date', () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date('2024-05-10'))
  expect(getCurrentDate()).toBe('10.05.2024')
  jest.useRealTimers()
})

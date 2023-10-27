import { getCurrentDate } from '@/utils/getters/getCurrentDate'

it('gets current date', () => {
  const currentDate = new Date().toLocaleDateString('ru-RU')
  expect(getCurrentDate()).toBe(currentDate)
})

import { getDeliveryDate } from '@utils/getters/getDeliveryDate'

it('gets order delivery date', () => {
  const day = 24 * 60 * 60 * 1000
  const deliveryDate = new Date(Date.now() + day).toLocaleDateString('ru-RU')
  expect(getDeliveryDate()).toBe(deliveryDate)
})

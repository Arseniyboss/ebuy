import { isCheckoutRoute } from '@/utils/api/middleware/routeCheckers/isCheckoutRoute'

it('checks if the route is a checkout route', () => {
  expect(isCheckoutRoute('/address')).toBeTruthy()
  expect(isCheckoutRoute('/payment')).toBeTruthy()
  expect(isCheckoutRoute('/order/review')).toBeTruthy()
  expect(isCheckoutRoute('/cart')).toBeFalsy()
})

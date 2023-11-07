import { checkRouteAccess } from '@/utils/api/middleware/checkRouteAccess'

it('checks route access', () => {
  expect(checkRouteAccess('/profile')).toBeTruthy()
  expect(checkRouteAccess('/order/review')).toBeTruthy()
  expect(checkRouteAccess('/order/123')).toBeTruthy()
  expect(checkRouteAccess('/')).toBeFalsy()
})

import { isRouteProtected } from '@/utils/api/middleware/isRouteProtected'

it('checks if the route is protected', () => {
  expect(isRouteProtected('/profile')).toBeTruthy()
  expect(isRouteProtected('/order/review')).toBeTruthy()
  expect(isRouteProtected('/order/123')).toBeTruthy()
  expect(isRouteProtected('/')).toBeFalsy()
})

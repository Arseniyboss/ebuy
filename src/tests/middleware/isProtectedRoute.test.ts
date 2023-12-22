import { isProtectedRoute } from '@/utils/api/middleware/routeCheckers/isProtectedRoute'

it('checks if the route is a protected route', () => {
  expect(isProtectedRoute('/profile')).toBeTruthy()
  expect(isProtectedRoute('/order/review')).toBeTruthy()
  expect(isProtectedRoute('/order/123')).toBeTruthy()
  expect(isProtectedRoute('/')).toBeFalsy()
})

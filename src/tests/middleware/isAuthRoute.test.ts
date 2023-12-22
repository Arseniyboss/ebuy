import { isAuthRoute } from '@/utils/api/middleware/routeCheckers/isAuthRoute'

it('checks if the route is an auth route', () => {
  expect(isAuthRoute('/login')).toBeTruthy()
  expect(isAuthRoute('/register')).toBeTruthy()
  expect(isAuthRoute('/')).toBeFalsy()
})

import { isAdminRoute } from '@/utils/api/middleware/routeCheckers/isAdminRoute'

it('checks if the route is an admin route', () => {
  expect(isAdminRoute('/admin/users')).toBeTruthy()
  expect(isAdminRoute('/admin/orders')).toBeTruthy()
  expect(isAdminRoute('/orders')).toBeFalsy()
})

import { protectedRoutes } from '@/constants/routes'

export const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.includes(route))
}

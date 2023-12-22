import { protectedRoutes } from '@/constants/protectedRoutes'

export const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.includes(route))
}

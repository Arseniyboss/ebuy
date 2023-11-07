import { protectedRoutes } from '@/constants/protectedRoutes'

export const checkRouteAccess = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.includes(route))
}

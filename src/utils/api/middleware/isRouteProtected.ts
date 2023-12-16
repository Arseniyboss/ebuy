import { protectedRoutes } from '@/constants/protectedRoutes'

export const isRouteProtected = (pathname: string) => {
  return protectedRoutes.some((route) => pathname.includes(route))
}

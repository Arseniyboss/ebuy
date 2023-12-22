import { authRoutes } from '@/constants/routes'

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => pathname === route)
}

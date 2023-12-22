import { authRoutes } from '@/constants/authRoutes'

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => pathname === route)
}

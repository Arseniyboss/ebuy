import { checkoutRoutes } from '@/constants/checkoutRoutes'

export const isCheckoutRoute = (pathname: string) => {
  return checkoutRoutes.some((route) => pathname === route)
}

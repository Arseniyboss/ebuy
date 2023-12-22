import { checkoutRoutes } from '@/constants/routes'

export const isCheckoutRoute = (pathname: string) => {
  return checkoutRoutes.some((route) => pathname === route)
}

import { formatPrice } from './formatPrice'

export const formatTotalPrice = (price: number) => {
  return formatPrice(price).toFixed(2)
}

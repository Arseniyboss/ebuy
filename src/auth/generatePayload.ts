import { User } from 'types/jwtPayload'
import { getBooleanValue } from '@utils/getBooleanValue'

export const generatePayload = ({
  _id,
  name,
  isAdmin,
  cartItems,
  address,
  paymentMethod,
}: User) => {
  return {
    id: _id.toString(),
    name,
    isAdmin,
    cartItems: getBooleanValue(cartItems.length),
    address: getBooleanValue(address),
    paymentMethod: getBooleanValue(paymentMethod),
  }
}

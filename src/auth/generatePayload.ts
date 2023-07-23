import { User } from 'types/jwtPayload'

export const generatePayload = ({
  id,
  name,
  isAdmin,
  cartItems,
  checkout,
}: User) => {
  return {
    id,
    name,
    isAdmin,
    cartItems: cartItems.length ? true : false,
    shippingAddress: checkout?.shippingAddress ? true : false,
    paymentMethod: checkout?.paymentMethod ? true : false,
  }
}

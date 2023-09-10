import { jwtVerify, JWTPayload } from 'jose'
import { UserPayload } from 'types/jwtPayload'
import { getJwtSecret } from './getters/getJwtSecret'

type Payload = JWTPayload & UserPayload

export const verifyToken = async (token?: string) => {
  if (!token) return

  const JWT_SECRET = getJwtSecret()

  try {
    const jwtVerifyResult = await jwtVerify(token, JWT_SECRET)
    const payload = jwtVerifyResult.payload as Payload

    const { id, name, isAdmin, cartItems, address, paymentMethod } = payload

    const user = {
      id,
      name,
      isAdmin,
      cartItems,
      address,
      paymentMethod,
    }

    return user
  } catch (error) {
    return
  }
}

import { User } from '@/types/base/user'
import { getBooleanValue } from '@/utils/getters/getBooleanValue'
import { WithId } from '@/types/mongo/documents'

type Payload = WithId<User>

export const generatePayload = <T extends Payload>({
  _id,
  name,
  isAdmin,
  cartItems,
  address,
  paymentMethod,
}: T) => {
  return {
    id: _id.toString(),
    name,
    isAdmin,
    cartItems: getBooleanValue(cartItems.length),
    address: getBooleanValue(address),
    paymentMethod: getBooleanValue(paymentMethod),
  }
}

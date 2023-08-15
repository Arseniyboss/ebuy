import { Cross, OrderLink } from '@styles/table'
import { Order as Props } from 'types/api'

const Order = ({
  _id,
  totalPrice,
  isPaid,
  paidAt,
  isDelivered,
  deliveredAt,
}: Props) => {
  return (
    <tr>
      <td>{_id}</td>
      <td>${totalPrice}</td>
      <td>{isPaid ? paidAt : <Cross />}</td>
      <td>{isDelivered ? deliveredAt : <Cross />}</td>
      <td>
        <OrderLink href={`/order/${_id}`}>Details</OrderLink>
      </td>
    </tr>
  )
}

export default Order

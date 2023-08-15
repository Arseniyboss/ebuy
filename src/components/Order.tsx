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
    <tr data-testid='order'>
      <td data-testid='order-id'>{_id}</td>
      <td data-testid='order-total-price'>${totalPrice}</td>
      <td data-testid='order-paid-status'>{isPaid ? paidAt : <Cross />}</td>
      <td data-testid='order-delivered-status'>
        {isDelivered ? deliveredAt : <Cross />}
      </td>
      <td>
        <OrderLink href={`/order/${_id}`} data-testid='order-link'>
          Details
        </OrderLink>
      </td>
    </tr>
  )
}

export default Order

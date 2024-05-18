'use client'

import Link from 'next/link'
import { CartItem as Props } from '@/types/api'
import { formatPrice } from '@/utils/formatters/formatPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import {
  Container,
  ItemImage,
  ItemDetails,
  ItemName,
} from '@/components/item/styles'

const OrderItem = ({ _id, name, image, price, quantity }: Props) => {
  const totalPrice = formatPrice(quantity * price)
  return (
    <Container>
      <Link href={`/product/${_id}`} aria-label={name}>
        <ItemImage
          src={image}
          height={153}
          width={192}
          alt=''
          priority
          data-testid='item-image'
        />
      </Link>
      <ItemDetails aria-label='order item details'>
        <ItemName data-testid='item-name'>{name}</ItemName>
        <p data-testid='item-total-price'>
          {quantity} x ${price} = ${formatTotalPrice(totalPrice)}
        </p>
      </ItemDetails>
    </Container>
  )
}

export default OrderItem

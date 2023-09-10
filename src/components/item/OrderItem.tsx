'use client'

import Link from 'next/link'
import { CartItem as Props } from 'types/api'
import { formatPrice } from '@utils/formatters/formatPrice'
import {
  Container,
  ItemImage,
  ItemDetails,
  ItemName,
} from '@components/item/styles'

const OrderItem = ({ _id, name, image, price, quantity }: Props) => {
  const totalPrice = formatPrice(quantity * price)
  return (
    <Container>
      <Link href={`/product/${_id}`}>
        <ItemImage
          src={image}
          height={153}
          width={192}
          alt={name}
          priority
          data-testid='item-image'
        />
      </Link>
      <ItemDetails>
        <ItemName data-testid='item-name'>{name}</ItemName>
        <p data-testid='item-total-price'>
          {quantity} x ${price} = ${totalPrice}
        </p>
      </ItemDetails>
    </Container>
  )
}

export default OrderItem
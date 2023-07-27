'use client'

import Link from 'next/link'
import { CartItem as Props } from 'types/api'
import { formatPrice } from '@utils/formatPrice'
import {
  Container,
  ItemImage,
  ItemDetails,
  ItemName,
} from '@components/cartItem/styles'

const OrderItem = ({ _id, name, image, price, quantity }: Props) => {
  const totalPrice = formatPrice(quantity * price)
  return (
    <Container>
      <Link href={`/product/${_id}`}>
        <ItemImage src={image} height={153} width={192} alt={name} priority />
      </Link>
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <p>
          {quantity} x ${price} = ${totalPrice}
        </p>
      </ItemDetails>
    </Container>
  )
}

export default OrderItem

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { CartItem as Props } from 'types/product'
import { InvisibleButton } from '@styles/globals'
import { Container, ItemImage, ItemDetails, FlexGroup } from './styles'
import ProductQuantity from '@components/productQuantity/ProductQuantity'

const CartItem = ({
  _id,
  name,
  image,
  price,
  countInStock,
  quantity: initialQuantity,
}: Props) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  return (
    <Container>
      <Link href={`/product/${_id}`}>
        <ItemImage src={image} height={153} width={170} alt={name} priority />
      </Link>
      <ItemDetails>
        <h2>{name}</h2>
        <h3>${price}</h3>
        <FlexGroup>
          <ProductQuantity
            countInStock={countInStock}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <InvisibleButton aria-label='delete cart item'>
            <FaTrashAlt />
          </InvisibleButton>
        </FlexGroup>
      </ItemDetails>
    </Container>
  )
}

export default CartItem

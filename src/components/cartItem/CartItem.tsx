'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrashAlt } from 'react-icons/fa'
import { CartItem as Props } from 'types/api'
import { InvisibleButton } from '@styles/globals'
import { Container, ItemImage, ItemDetails, FlexGroup } from './styles'
import { deleteCartItem } from '@api/cart/deleteCartItem'
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
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return

    setLoading(true)

    const response = await deleteCartItem(_id)

    if (!response.ok) {
      setLoading(false)
      alert(response.statusText)
      return
    }

    setLoading(false)
    router.refresh()
  }
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
          <InvisibleButton
            disabled={loading}
            onClick={handleDelete}
            aria-label='delete cart item'
          >
            <FaTrashAlt />
          </InvisibleButton>
        </FlexGroup>
      </ItemDetails>
    </Container>
  )
}

export default CartItem

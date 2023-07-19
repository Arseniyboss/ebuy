'use client'

import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrashAlt } from 'react-icons/fa'
import { CartItem as Props } from 'types/api'
import { getQuantities } from '@utils/getQuantities'
import { deleteCartItem } from '@api/cart/deleteCartItem'
import { updateCartItem } from '@api/cart/updateCartItem'
import { InvisibleButton, ProductQuantity } from '@styles/globals'
import { Container, ItemImage, ItemDetails, FlexGroup } from './styles'

const CartItem = ({
  _id,
  name,
  image,
  price,
  countInStock,
  quantity,
}: Props) => {
  const quantities = getQuantities(countInStock)

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

  const handleUpdate = async (e: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true)

    const quantity = parseInt(e.target.value)
    const response = await updateCartItem(_id, quantity)

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
        <ItemImage
          src={image}
          height={153}
          width={170}
          alt={name}
          priority
          data-testid='product-image'
        />
      </Link>
      <ItemDetails>
        <h2 data-testid='product-name'>{name}</h2>
        <h3 data-testid='product-price'>${price}</h3>
        <FlexGroup>
          <ProductQuantity
            value={quantity}
            onChange={handleUpdate}
            data-testid='product-quantity'
          >
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </ProductQuantity>
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

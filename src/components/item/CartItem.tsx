import Link from 'next/link'
import { ChangeEvent, startTransition } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { CartAction } from '@/types/actions'
import { CartItem as CartItemProps } from '@/api/cart/getCartItems'
import { formatPrice } from '@/utils/formatters/formatPrice'
import { formatTotalPrice } from '@/utils/formatters/formatTotalPrice'
import { getQuantities } from '@/utils/getters/getQuantities'
import { deleteCartItem } from '@/api/cart/deleteCartItem'
import { updateCartItem } from '@/api/cart/updateCartItem'
import { InvisibleButton, ProductQuantity } from '@/styles/globals'
import {
  Container,
  ItemImage,
  ItemDetails,
  ItemName,
  ItemPrice,
  FlexGroup,
} from './styles'

interface Props extends CartItemProps {
  dispatch: (action: CartAction) => void
}

const CartItem = (props: Props) => {
  const { _id, name, image, blurDataURL, price, countInStock, quantity, dispatch } = props

  const totalPrice = formatPrice(quantity * price)
  const quantities = getQuantities(countInStock)

  const handleDelete = async () => {
    startTransition(() => {
      dispatch({ type: 'DELETE_ITEM', id: _id })
    })
    const error = await deleteCartItem(_id)
    if (error) return alert(error)
  }

  const handleUpdate = async (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value)
    startTransition(() => {
      dispatch({ type: 'UPDATE_ITEM', id: _id, quantity })
    })
    const error = await updateCartItem(_id, quantity)
    if (error) return alert(error)
  }
  return (
    <Container data-testid="cart-item">
      <Link href={`/product/${_id}`} aria-label={name}>
        <ItemImage
          src={image}
          height={153}
          width={192}
          alt=""
          preload
          placeholder="blur"
          blurDataURL={blurDataURL}
          data-testid="product-image"
        />
      </Link>
      <ItemDetails aria-label="cart item details">
        <ItemName data-testid="product-name">{name}</ItemName>
        <ItemPrice data-testid="product-price">${formatTotalPrice(totalPrice)}</ItemPrice>
        <FlexGroup>
          <ProductQuantity
            value={quantity}
            onChange={handleUpdate}
            aria-label="select item quantity"
            data-testid="product-quantity"
          >
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </ProductQuantity>
          <InvisibleButton
            onClick={handleDelete}
            aria-label="delete cart item"
            data-testid="delete-button"
          >
            <FaTrashAlt />
          </InvisibleButton>
        </FlexGroup>
      </ItemDetails>
    </Container>
  )
}

export default CartItem

import Image from 'next/image'
import { CartItem as Props } from 'types/product'

const CartItem = ({ name, image, price, countInStock, quantity }: Props) => {
  return (
    <div>
      <Image src={image} alt='' height={100} width={100} />
      <p>{name}</p>
      <p>{price}</p>
      <p>Quantity: {quantity}</p>
      <p>Count in stock:{countInStock}</p>
    </div>
  )
}

export default CartItem

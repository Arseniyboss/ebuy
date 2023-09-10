import { Address as Props } from 'types/base/user'

const Address = ({ street, country, city, postalCode }: Props) => {
  return (
    <>
      <p data-testid='street'>Street: {street}</p>
      <p data-testid='country'>Country: {country}</p>
      <p data-testid='city'>City: {city}</p>
      <p data-testid='postal-code'>Postal Code: {postalCode}</p>
    </>
  )
}

export default Address

export const getPrice = ($price: JQuery<HTMLElement>) => {
  const price = $price.text().slice(1)
  return parseFloat(price)
}

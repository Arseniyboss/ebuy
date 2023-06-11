export const getQuantities = (countInStock: number) => {
  return Array.from(Array(countInStock), (_, index) => index + 1)
}

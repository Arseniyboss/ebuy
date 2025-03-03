export const getCardExpiry = () => {
  const date = new Date()
  const month = date.getMonth() + 1
  const year = date.toLocaleDateString('en-US', { year: '2-digit' })
  const cardExpiry = `${month}${year}`
  return cardExpiry
}

export const getCardExpiry = () => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.toLocaleDateString('en-US', { year: '2-digit' })
  const cardExpiry = `${month}${year}`
  return cardExpiry
}

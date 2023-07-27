const day = 24 * 60 * 60 * 1000

export const getDeliveryDate = () => {
  return new Date(Date.now() + day).toLocaleDateString('ru-RU')
}

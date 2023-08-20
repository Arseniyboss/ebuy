export const formatReviewDate = (createdAt: string) => {
  return new Date(createdAt).toLocaleDateString('ru-RU')
}

export const validateSearchTerm = (searchTerm: string) => {
  return /^[A-Za-z0-9 ]+$/.test(searchTerm)
}

export const validateSortOrder = (sortOrder: string) => {
  return sortOrder === 'asc' || sortOrder === 'desc'
}

export const getValidPage = (page: number, pages: number) => {
  return page >= 1 && page <= pages ? page : 1
}

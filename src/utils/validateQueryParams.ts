export const validateSearch = (search: string) => {
  return /^[A-Za-z0-9 ]+$/.test(search)
}

export const validateSortOrder = (sortOrder: string) => {
  return sortOrder === 'asc' || sortOrder === 'desc'
}

export const getValidPage = (page: number, pages: number) => {
  return page >= 1 && page <= pages ? page : 1
}

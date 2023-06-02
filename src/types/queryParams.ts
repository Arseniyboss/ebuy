export type SortOrder = 'asc' | 'desc'
export type SortKey = 'price' | 'rating' | 'createdAt'

export type QueryParams = {
  searchTerm?: string
  sort?: `${SortKey}.${SortOrder}`
}

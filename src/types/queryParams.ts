export type SortOrder = 'asc' | 'desc'
export type SortKey = 'price' | 'rating'

export type QueryParams = {
  page?: number
  search?: string
  sort?: string
}

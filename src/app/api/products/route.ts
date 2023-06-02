import { NextResponse, NextRequest } from 'next/server'
import { connectToDB } from '@config/mongodb'
import { SortOrder } from 'types/queryParams'
import Product from '@models/product'

const validateSearchTerm = (searchTerm: string) => {
  return /^[A-Za-z0-9 ]+$/.test(searchTerm)
}

const validateSortDirection = (sortDirection: string) => {
  return sortDirection === 'asc' || sortDirection === 'desc'
}

export const GET = async (request: NextRequest) => {
  const searchTerm = request.nextUrl.searchParams.get('searchTerm')!
  const sort = request.nextUrl.searchParams.get('sort')!

  const sortKey = sort?.split('.')[0]
  const sortDirection = sort?.split('.')[1] as SortOrder

  const isSearchTermValid = validateSearchTerm(searchTerm)
  const isSortDirectionValid = validateSortDirection(sortDirection)

  const filters = {
    name: { $regex: `^${searchTerm}`, $options: 'i' },
  }
  const filterQuery = isSearchTermValid ? filters : {}
  const sortQuery = isSortDirectionValid ? { [sortKey]: sortDirection } : {}

  await connectToDB()

  const products = await Product.find(filterQuery).sort(sortQuery)

  return NextResponse.json(products)
}

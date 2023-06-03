import { NextResponse, NextRequest } from 'next/server'
import { SortOrder } from 'types/queryParams'
import { connectToDB } from '@config/mongodb'
import { getSearchParams } from '@utils/getSearchParams'
import {
  validateSearchTerm,
  validateSortOrder,
  getValidPage,
} from '@utils/validateQueryParams'
import Product from '@models/product'

export const GET = async (request: NextRequest) => {
  await connectToDB()

  const searchTerm = getSearchParams(request, 'searchTerm')
  const sort = getSearchParams(request, 'sort')

  const sortKey = sort?.split('.')[0]
  const sortOrder = sort?.split('.')[1] as SortOrder

  const isSearchTermValid = validateSearchTerm(searchTerm)
  const isSortOrderValid = validateSortOrder(sortOrder)

  const filterQuery = {
    name: {
      $regex: isSearchTermValid ? `^${searchTerm}` : '(.*?)',
      $options: 'i',
    },
  }
  const sortQuery = isSortOrderValid ? { [sortKey]: sortOrder } : null

  const productsPerPage = 4
  const numberOfProducts = await Product.countDocuments(filterQuery)
  const pages = Math.ceil(numberOfProducts / productsPerPage)
  const page = getValidPage(Number(getSearchParams(request, 'page')), pages)

  const prevPageProducts = productsPerPage * (page - 1)

  const products = await Product.find(filterQuery)
    .sort(sortQuery)
    .limit(productsPerPage)
    .skip(prevPageProducts)

  return NextResponse.json({ products, pages })
}

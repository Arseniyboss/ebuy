'use client'

import { useQueryParams } from '@hooks/useQueryParams'
import { QueryParams } from 'types/params'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { PaginationContainer, PaginationButton } from './styles'
import { getValidPage } from '@utils/validateQueryParams'

type Props = {
  pages: number
}

const Pagination = ({ pages }: Props) => {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>()
  const page = getValidPage(Number(queryParams.page), pages)
  return (
    <PaginationContainer>
      <PaginationButton
        disabled={page === 1}
        onClick={() => setQueryParams({ page: page - 1 })}
        aria-label='go to the previous page'
        data-testid='left-arrow'
      >
        <FiArrowLeft />
      </PaginationButton>
      <p>
        {page} of {pages}
      </p>
      <PaginationButton
        disabled={page === pages}
        onClick={() => setQueryParams({ page: page + 1 })}
        aria-label='go to the next page'
        data-testid='right-arrow'
      >
        <FiArrowRight />
      </PaginationButton>
    </PaginationContainer>
  )
}

export default Pagination

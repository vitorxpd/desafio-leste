import { MouseEvent } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface IContactPaginationProps {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
  onNextPage: () => void
  onPrevPage: () => void
}

export function ContactPagination({
  currentPage,
  totalPages,
  onChangePage,
  onNextPage,
  onPrevPage,
}: IContactPaginationProps) {
  function handleChangePage(
    event: MouseEvent<HTMLAnchorElement>,
    page: number,
  ) {
    event.preventDefault()
    onChangePage(page)
  }

  function handleNextPage(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onNextPage()
  }

  function handlePrevPage(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onPrevPage()
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevPage} />
        </PaginationItem>

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => handleChangePage(event, currentPage - 1)}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            onClick={(event) => event.preventDefault()}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {!(currentPage + 1 > totalPages) && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(event) => handleChangePage(event, currentPage + 1)}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext href="#" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

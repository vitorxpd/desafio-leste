import { useCallback, useEffect, useState } from 'react'

import { IContact } from '@/entities/IContact'

export function usePagination(
  contacts: IContact[],
  offset: string | number | null,
) {
  const [currentPage, setCurrentPage] = useState(1)

  const currentOffset = Number(offset) || 20

  const indexOfLastItem = currentPage * currentOffset
  const indexOfFirstItem = indexOfLastItem - currentOffset

  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(contacts.length / currentOffset)

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((page) => (page + 1 > totalPages ? page : page + 1))
  }, [totalPages])

  const handlePrevPage = useCallback(() => {
    setCurrentPage((page) => (page === 1 ? 1 : page - 1))
  }, [])

  useEffect(() => {
    setCurrentPage((page) => {
      switch (true) {
        case page === 1:
          return 1
        case page > totalPages:
          return totalPages
        default:
          return page
      }
    })
  }, [totalPages])

  return {
    paginationContacts: currentContacts,
    currentPage,
    totalPages,
    handleChangePage,
    handleNextPage,
    handlePrevPage,
  }
}

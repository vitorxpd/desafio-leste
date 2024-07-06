import { useCallback, useState } from 'react'

import { IContact } from '@/contexts/contacts-context'

export function usePagination(contacts: IContact[], offset: number) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * offset
  const indexOfFirstItem = indexOfLastItem - offset

  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(contacts.length / offset)

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((page) => (page + 1 > totalPages ? page : page + 1))
  }, [totalPages])

  const handlePrevPage = useCallback(() => {
    setCurrentPage((page) => (page === 1 ? 1 : page - 1))
  }, [])

  return {
    currentContacts,
    currentPage,
    totalPages,
    handleChangePage,
    handleNextPage,
    handlePrevPage,
  }
}

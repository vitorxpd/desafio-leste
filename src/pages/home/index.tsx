import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useContacts } from '@/contexts/contacts-context'

import { ContactCard } from './components/contact-card'
import { ContactFallback } from './components/contact-fallback'
import { ContactPagination } from './components/contact-pagination'
import { ErrorFallback } from './components/error-fallback'
import { Filters } from './components/filters'
import { RemoveModal } from './components/remove-modal'
import { StatisticsModal } from './components/statistics-modal'
import { useFilters } from './hooks/useFilters'
import { usePagination } from './hooks/usePagination'
import { useSearch } from './hooks/useSearch'

export function Home() {
  const [statisticsModalIsOpen, setStatisticsModalIsOpen] = useState(false)
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [removeContactId, setRemoveContactId] = useState<number | null>(null)

  const {
    contacts,
    isFirstLoading,
    isLoading,
    hasError,
    removeContact,
    loadContacts,
  } = useContacts()

  const {
    filterParams,
    filteredContacts,
    filterOffset,
    handleClearFilters,
    handleSelectFilter,
  } = useFilters(contacts, isFirstLoading)

  const {
    paginationContacts,
    currentPage,
    totalPages,
    handleChangePage,
    handleNextPage,
    handlePrevPage,
  } = usePagination(filteredContacts, filterOffset)

  const { searchContacts, searchTerm, handleChangeSearchTerm } =
    useSearch(paginationContacts)

  const navigate = useNavigate()

  function handleOpenStatisticsModal() {
    setStatisticsModalIsOpen(true)
  }

  function handleCloseStatisticsModal() {
    setStatisticsModalIsOpen(false)
  }

  function handleOpenRemoveModal() {
    setRemoveModalIsOpen(true)
  }

  function handleCloseRemoveModal() {
    setRemoveModalIsOpen(false)
  }

  function handleSetRemoveContactId(contactId: number) {
    setRemoveContactId(contactId)
  }

  function handleRemoveContact() {
    if (!removeContactId) {
      return
    }

    removeContact(removeContactId)
    setRemoveContactId(null)
  }

  return (
    <>
      <div>
        <section className="mx-auto mb-8 flex w-[320px] items-center justify-between sm:w-auto">
          <h1 className="text-2xl font-bold text-primary-green sm:text-3xl">
            Contacts{' '}
            <span className="align-middle text-xl sm:text-2xl">
              ({contacts.length})
            </span>
          </h1>
        </section>

        <section className="mx-auto mb-4 flex w-[320px] items-center justify-between sm:w-auto">
          <Button
            className="w-32"
            onClick={handleOpenStatisticsModal}
            disabled={contacts.length === 0 || isLoading}
          >
            Show Statistics
          </Button>

          <Button
            variant="green"
            className="w-32"
            disabled={isLoading}
            onClick={() => navigate('/new-contact')}
          >
            Add Contact
          </Button>
        </section>

        <section className="mx-auto mb-4 flex w-[320px] justify-end gap-2 sm:mx-0 sm:w-full">
          <Input
            type="search"
            placeholder="Search Contacts"
            value={searchTerm}
            disabled={contacts.length === 0 || isLoading}
            className="w-full sm:w-[220px]"
            onChange={(event) => handleChangeSearchTerm(event.target.value)}
          />

          <Filters
            params={filterParams}
            disabled={contacts.length === 0 || isLoading}
            onSelect={handleSelectFilter}
            onClear={handleClearFilters}
          />
        </section>

        {(isLoading || isFirstLoading || contacts.length === 0) &&
          !hasError && (
            <div className="mx-auto mt-8 w-fit">
              <Spinner className="h-16 w-16" />
            </div>
          )}

        {hasError && contacts.length === 0 && (
          <section className="mt-8">
            <ErrorFallback onTryAgain={loadContacts} />
          </section>
        )}

        {!isLoading &&
          contacts.length > 0 &&
          (paginationContacts.length === 0 || searchContacts.length === 0) && (
            <section className="mt-8">
              <ContactFallback />
            </section>
          )}

        {!isLoading && paginationContacts.length > 0 && (
          <section className="mx-auto">
            <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchTerm.length > 0 &&
                searchContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onRemoveContactId={handleSetRemoveContactId}
                    onOpenRemoveModal={handleOpenRemoveModal}
                  />
                ))}

              {searchTerm.length === 0 &&
                paginationContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onRemoveContactId={handleSetRemoveContactId}
                    onOpenRemoveModal={handleOpenRemoveModal}
                  />
                ))}
            </div>

            {searchTerm.length === 0 && (
              <ContactPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChangePage={handleChangePage}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            )}
          </section>
        )}
      </div>

      <StatisticsModal
        open={statisticsModalIsOpen}
        onClose={handleCloseStatisticsModal}
      />

      <RemoveModal
        open={removeModalIsOpen}
        onClose={handleCloseRemoveModal}
        onRemove={handleRemoveContact}
      />
    </>
  )
}

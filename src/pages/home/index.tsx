import { Contact } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useContacts } from '@/contexts/contacts-context'

import { ContactCard } from './components/contact-card'
import { ContactPagination } from './components/contact-pagination'
import { Filters } from './components/filters'
import { RemoveModal } from './components/remove-modal'
import { Search } from './components/search'
import { StatisticsModal } from './components/statistics-modal'
import { useFilters } from './hooks/useFilters'
import { usePagination } from './hooks/usePagination'
import { useSearch } from './hooks/useSearch'

export function Home() {
  const [statisticsModalIsOpen, setStatisticsModalIsOpen] = useState(false)
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [removeContactId, setRemoveContactId] = useState<number | null>(null)

  const { contacts, isFirstLoading, isLoading, removeContact } = useContacts()

  const {
    filterParams,
    filteredContacts,
    filtersIsVisible,
    filterOffset,
    handleClearFilters,
    handleSelectFilter,
    handleToggleFilters,
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
          <h1 className="text-3xl font-bold text-primary-green">Contacts</h1>

          <Button
            variant="green"
            className="w-32"
            disabled={isLoading}
            onClick={() => navigate('/new-contact')}
          >
            Add Contact
          </Button>
        </section>

        <section className="mx-auto mb-8 w-[320px] sm:w-auto">
          <div className="mb-4 flex items-center justify-between">
            <Button
              className="w-32"
              onClick={handleOpenStatisticsModal}
              disabled={contacts.length === 0 || isLoading}
            >
              Show Statistics
            </Button>

            <Button
              className="w-32 md:hidden"
              onClick={handleToggleFilters}
              disabled={isLoading}
            >
              {filtersIsVisible ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {filtersIsVisible && (
            <Filters
              key={filterParams.size}
              params={filterParams}
              disabled={contacts.length === 0 || isLoading}
              onSelect={handleSelectFilter}
              onClear={handleClearFilters}
            />
          )}
        </section>

        {paginationContacts.length > 0 && (
          <section className="mb-4">
            <Search
              searchTerm={searchTerm}
              searchCount={searchContacts.length}
              onChangeSearchTerm={handleChangeSearchTerm}
            />
          </section>
        )}

        {isLoading && (
          <div className="mx-auto mt-40 w-fit">
            <Spinner className="h-16 w-16" />
          </div>
        )}

        {!isLoading && paginationContacts.length === 0 && (
          <div className="mx-auto mt-32 flex w-fit flex-col items-center gap-4 text-center">
            <Contact className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-bold">No Contacts Found</h2>
            <p className="text-muted-foreground">
              You don&apos;t have any contacts to display yet.
            </p>
          </div>
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

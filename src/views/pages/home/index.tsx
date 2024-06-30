import { Contact } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useContacts } from '@/contexts/contact-context'
import { isMobile } from '@/lib/utils'
import { Spinner } from '@/views/components/ui/spinner'

import { Button } from '../../components/ui/button'

import { ContactCard } from './components/contact-card'
import { Filters } from './components/filters'
import { RemoveModal } from './components/remove-modal'
import { StatisticsModal } from './components/statistics-modal'
import { useFilters } from './hooks/useFilters'

export function Home() {
  const [statisticsModalIsOpen, setStatisticsModalIsOpen] = useState(false)
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [removeContactId, setRemoveContactId] = useState<number | null>(null)

  const { contacts, isLoading, removeContact } = useContacts()

  const {
    filterParams,
    filteredContacts,
    filtersIsVisible,
    handleClearFilters,
    handleSelectFilter,
    handleToggleFilters,
  } = useFilters()

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

        <section className="mx-auto mb-4 w-[320px] sm:w-auto">
          <div className="mb-4 flex items-center justify-between">
            <Button
              className="w-32"
              onClick={handleOpenStatisticsModal}
              disabled={contacts.length === 0 || isLoading}
            >
              Show Statistics
            </Button>

            {isMobile && (
              <Button
                className="w-32"
                onClick={handleToggleFilters}
                disabled={isLoading}
              >
                {filtersIsVisible ? 'Hide Filters' : 'Show Filters'}
              </Button>
            )}
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

        {isLoading && (
          <div className="mx-auto mt-40 w-fit">
            <Spinner className="h-16 w-16" />
          </div>
        )}

        {!isLoading && contacts.length === 0 && (
          <div className="mx-auto mt-32 flex w-fit flex-col items-center gap-4 text-center">
            <Contact className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-bold">No Contacts Found</h2>
            <p className="text-muted-foreground">
              You don&apos;t have any contacts to display yet.
            </p>
          </div>
        )}

        {!isLoading && contacts.length > 0 && (
          <section className="mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onRemoveContactId={handleSetRemoveContactId}
                  onOpenRemoveModal={handleOpenRemoveModal}
                />
              ))}
            </div>
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

import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useContact } from '@/contexts/contact-context'
import { calculateAge, months } from '@/lib/utils'
import { Spinner } from '@/views/components/ui/spinner'

import { Button } from '../../components/ui/button'

import { ContactCard } from './contact-card'
import { Filters } from './filters'
import { RemoveModal } from './remove-modal'

export function Home() {
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [removeContactId, setRemoveContactId] = useState<number | null>(null)
  const [filterParams, setFilterParams] = useSearchParams()

  const { contacts, isLoading, removeContact } = useContact()

  const navigate = useNavigate()

  function getFilteredContacts() {
    const gender = filterParams.get('gender')
    const language = filterParams.get('language')
    const age = filterParams.get('age')
    const birthday = filterParams.get('birthday')

    let filteredContacts = contacts

    if (gender) {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.gender === gender,
      )
    }

    if (language) {
      filteredContacts = filteredContacts.filter(
        (contact) => contact.language === language,
      )
    }

    if (age) {
      const minRange = Number(age.split('-')[0])
      const maxRange = Number(age.split('-')[1])

      filteredContacts = filteredContacts.filter((contact) => {
        const age = calculateAge(contact.birthday)
        const isInRange = age >= minRange && age <= maxRange

        if (isInRange) {
          return contact
        }
      })
    }

    if (birthday) {
      filteredContacts = filteredContacts.filter((contact) => {
        const monthIndex = new Date(contact.birthday).getMonth()
        const monthName = months[monthIndex]

        if (monthName === birthday) {
          return contact
        }
      })
    }

    return filteredContacts
  }

  function handleSelectFilter(type: string, value: string) {
    let prevFilters: { [key: string]: string } = {}

    filterParams.forEach((prevValue, prevKey) => {
      prevFilters = {
        ...prevFilters,
        [prevKey]: prevValue,
      }
    })

    setFilterParams({ ...prevFilters, [type]: value })
  }

  function handleClearFilters() {
    setFilterParams(undefined)
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
  }

  return (
    <>
      <div>
        <section className="mx-auto mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary-green">Contacts</h1>

          <Button variant="green" onClick={() => navigate('/new-contact')}>
            Add Contact
          </Button>
        </section>

        <section className="mb-4">
          <Filters
            key={filterParams.size}
            params={filterParams}
            onSelect={handleSelectFilter}
            onClear={handleClearFilters}
          />
        </section>

        {isLoading && (
          <div className="mx-auto mt-32 w-fit">
            <Spinner className="h-16 w-16" />
          </div>
        )}

        {!isLoading && (
          <section className="mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {getFilteredContacts().map((contact) => (
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

      <RemoveModal
        open={removeModalIsOpen}
        onClose={handleCloseRemoveModal}
        onRemove={handleRemoveContact}
      />
    </>
  )
}

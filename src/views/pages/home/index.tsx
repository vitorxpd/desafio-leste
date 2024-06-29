import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useContact } from '@/contexts/contact-context'
import { Spinner } from '@/views/components/ui/spinner'

import { Button } from '../../components/ui/button'

import { ContactCard } from './contact-card'
import { RemoveModal } from './remove-modal'

export function Home() {
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)
  const [removeContactId, setRemoveContactId] = useState<number | null>(null)

  const { contacts, isLoading, removeContact } = useContact()

  const navigate = useNavigate()

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
        <section className="mx-auto mb-8 flex items-center justify-between px-8">
          <h1 className="text-3xl font-bold text-primary-green">Contacts</h1>

          <Button variant="green" onClick={() => navigate('/new-contact')}>
            Add Contact
          </Button>
        </section>

        {isLoading && (
          <div className="mx-auto mt-32 w-fit">
            <Spinner className="h-16 w-16" />
          </div>
        )}

        {!isLoading && (
          <section className="mx-auto px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {contacts.map((contact) => (
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

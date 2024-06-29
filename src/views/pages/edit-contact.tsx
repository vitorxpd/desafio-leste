import { CircleChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IContact, useContact } from '@/contexts/contact-context'

import { ContactForm } from '../components/contact-form'
import { Button } from '../components/ui/button'

export function EditContact() {
  const [currentContact, setCurrentContact] = useState<IContact | undefined>(
    undefined,
  )

  const navigate = useNavigate()

  const { id } = useParams()

  const { contacts } = useContact()

  useEffect(() => {
    const contact = contacts.find((contact) => contact.id === Number(id))
    setCurrentContact(contact)
  }, [contacts, id])

  function handleSubmit() {}

  if (!currentContact) {
    return null
  }

  return (
    <section className="mx-auto max-w-[400px]">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" className="p-0" onClick={() => navigate('/')}>
          <CircleChevronLeft />
        </Button>

        <h1 className="text-center text-2xl font-bold">
          Edit Contact - {currentContact?.first_name}{' '}
          {currentContact?.last_name}
        </h1>
      </div>

      <ContactForm contactData={currentContact} onSubmit={handleSubmit} />
    </section>
  )
}

import { Check, CircleChevronLeft } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { IContact, useContacts } from '@/contexts/contacts-context'

import { ContactForm, TContactFormSchema } from '../components/contact-form'
import { Button } from '../components/ui/button'
import { Spinner } from '../components/ui/spinner'

export function EditContact() {
  const [currentContact, setCurrentContact] = useState<
    IContact | null | undefined
  >(null)

  const navigate = useNavigate()

  const { id } = useParams()

  const { contacts, isLoading, editContact } = useContacts()

  const navigateToHome = useCallback(() => {
    navigate('/')
  }, [navigate])

  function handleSubmit(data: TContactFormSchema) {
    editContact(Number(id), data)
    setCurrentContact(null)
    navigateToHome()
    toast('Contact Edited Successfully', {
      description: 'Your changes to the contact have been successfully saved.',
      closeButton: true,
      duration: 3000,
      icon: <Check color="green" />,
      className: 'gap-2',
    })
  }

  useEffect(() => {
    const contact = contacts.find((contact) => contact.id === Number(id))

    if (!contact) {
      navigateToHome()
    }

    setCurrentContact(contact)
  }, [contacts, id, navigateToHome])

  if (!currentContact) {
    return null
  }

  return (
    <div className="mx-auto max-w-[400px]">
      <section className="mb-4 flex items-center gap-2">
        <Button variant="ghost" className="p-0" onClick={navigateToHome}>
          <CircleChevronLeft />
        </Button>

        <h1 className="text-center text-2xl font-bold">
          {isLoading ? (
            <Spinner className="ml-1 inline h-6 w-6" />
          ) : (
            `${currentContact?.first_name} ${currentContact?.last_name}`
          )}
        </h1>
      </section>

      {isLoading && (
        <div className="mx-auto mt-40 w-fit">
          <Spinner className="h-16 w-16" />
        </div>
      )}

      {!isLoading && (
        <ContactForm contactData={currentContact} onSubmit={handleSubmit} />
      )}
    </div>
  )
}

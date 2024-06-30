import { Check, CircleChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { useContacts } from '@/contexts/contacts-context'

import { ContactForm, TContactFormSchema } from '../components/contact-form'
import { Button } from '../components/ui/button'
import { Spinner } from '../components/ui/spinner'

export function NewContact() {
  const navigate = useNavigate()

  const { isLoading, addContact } = useContacts()

  function handleSubmit(data: TContactFormSchema) {
    addContact(data)
    toast('Added Successfully', {
      description: 'The new contact has been successfully added to your list.',
      closeButton: true,
      duration: 3000,
      icon: <Check color="green" />,
      className: 'gap-2 pointer-events-none',
    })
  }

  return (
    <div className="mx-auto max-w-[400px]">
      <section className="mb-4 flex items-center gap-2">
        <Button variant="ghost" className="p-0" onClick={() => navigate('/')}>
          <CircleChevronLeft />
        </Button>

        <h1 className="text-center text-2xl font-bold">Add Contact</h1>
      </section>

      {isLoading && (
        <div className="mx-auto mt-40 w-fit">
          <Spinner className="h-16 w-16" />
        </div>
      )}

      {!isLoading && <ContactForm onSubmit={handleSubmit} />}
    </div>
  )
}

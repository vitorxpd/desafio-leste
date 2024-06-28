import { CircleChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { ContactForm } from '../components/contact-form'
import { Button } from '../components/ui/button'

export function EditContact() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <section className="mx-auto max-w-[400px]">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" className="p-0" onClick={() => navigate('/')}>
          <CircleChevronLeft />
        </Button>

        <h1 className="text-center text-2xl font-bold">Edit Contact - {id}</h1>
      </div>

      <ContactForm />
    </section>
  )
}

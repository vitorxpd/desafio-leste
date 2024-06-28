import { CircleChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ContactForm } from '../components/contact-form'
import { Button } from '../components/ui/button'

export function NewContact() {
  const navigate = useNavigate()

  return (
    <section className="mx-auto max-w-[400px]">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" className="p-0" onClick={() => navigate('/')}>
          <CircleChevronLeft />
        </Button>

        <h1 className="text-center text-2xl font-bold">Add Contact</h1>
      </div>

      <ContactForm />
    </section>
  )
}

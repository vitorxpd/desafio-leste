import { useNavigate } from 'react-router-dom'

import { IContact } from '@/contexts/contact-context'
import { Button } from '@/views/components/ui/button'

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'

interface IContactCardProps {
  contact: IContact
  onRemoveContactId: (contactId: number) => void
  onOpenRemoveModal: () => void
}

export function ContactCard({
  contact,
  onRemoveContactId,
  onOpenRemoveModal,
}: IContactCardProps) {
  const navigate = useNavigate()

  function handleNavigateToEditContact() {
    navigate(`/edit-contact/${contact.id}`)
  }

  function handleOpenRemoveModal() {
    onRemoveContactId(contact.id)
    onOpenRemoveModal()
  }

  return (
    <Card key={contact.id} className="mx-auto max-w-[320px]">
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="bg-black">
          <AvatarImage src={contact.avatar} alt="Avatar" />
          <AvatarFallback>
            {contact.first_name.charAt(0)}
            {contact.last_name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <CardTitle className="text-lg font-semibold">
          {contact.first_name} {contact.last_name}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div>
          <span className="font-medium">Birthday:</span> {contact.birthday}
        </div>
        <div>
          <span className="font-medium">Language:</span> {contact.language}
        </div>
        <div>
          <span className="font-medium">Email:</span> {contact.email}
        </div>
        <div>
          <span className="font-medium">Gender:</span>{' '}
          {contact.gender === 'F' ? 'Female' : 'Male'}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleNavigateToEditContact}>
          Edit
        </Button>
        <Button variant="destructive" onClick={handleOpenRemoveModal}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  )
}

import { useContext, useState } from 'react'

import { ContactContext } from '@/contexts/contact-context'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export function Home() {
  const [removeModalIsOpen, setRemoveModalIsOpen] = useState(false)

  const { contacts } = useContext(ContactContext)

  function handleOpenRemoveModal() {
    setRemoveModalIsOpen(true)
  }

  function handleCloseRemoveModal() {
    setRemoveModalIsOpen(false)
  }

  return (
    <>
      <main className="py-8">
        <section className="mx-auto mb-8 flex max-w-[1440px] items-center justify-between px-8">
          <h1 className="text-3xl font-bold text-primary-green">Contacts</h1>
          <Button className="bg-primary-green hover:bg-primary-green hover:opacity-80">
            Add Contact
          </Button>
        </section>

        <section className="mx-auto max-w-[1440px] px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {contacts.map((contact) => (
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
                    <span className="font-medium">Birthday:</span>{' '}
                    {contact.birthday}
                  </div>
                  <div>
                    <span className="font-medium">Language:</span>{' '}
                    {contact.language}
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
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive" onClick={handleOpenRemoveModal}>
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <AlertDialog open={removeModalIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete contact
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleCloseRemoveModal}>
              Cancel
            </Button>
            <Button variant="destructive">Remove</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

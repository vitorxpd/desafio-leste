import { useContext } from 'react'

import { ContactContext } from '@/contexts/contact-context'

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
  const { contacts } = useContext(ContactContext)

  return (
    <main>
      <section className="mx-auto lg:max-w-[1440px]">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  <span className="font-medium">Gender:</span> {contact.gender}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Remove</Button>
              </CardFooter>
            </Card>
          ))}
        </ul>
      </section>
    </main>
  )
}

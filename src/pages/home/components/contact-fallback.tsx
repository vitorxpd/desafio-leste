import { Contact } from 'lucide-react'

export function ContactFallback() {
  return (
    <div className="mx-auto flex w-fit flex-col items-center gap-4 text-center">
      <Contact className="h-16 w-16 text-muted-foreground" />
      <h3 className="text-2xl font-bold">No Contacts Found</h3>
      <p className="text-muted-foreground">
        You don&apos;t have any contacts to display yet.
      </p>
    </div>
  )
}

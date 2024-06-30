import { ContactsProvider } from './contexts/contacts-context'
import { Router } from './router'
import { Toaster } from './views/components/ui/sonner'

import './globals.css'

export function App() {
  return (
    <ContactsProvider>
      <Router />
      <Toaster />
    </ContactsProvider>
  )
}

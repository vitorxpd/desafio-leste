import { Toaster } from './components/ui/sonner'
import { ContactsProvider } from './contexts/contacts-context'
import { Router } from './router'

import './globals.css'

export function App() {
  return (
    <ContactsProvider>
      <Router />
      <Toaster />
    </ContactsProvider>
  )
}

import { ContactProvider } from './contexts/contact-context'
import { Router } from './router'
import { Toaster } from './views/components/ui/sonner'

import './globals.css'

export function App() {
  return (
    <ContactProvider>
      <Router />
      <Toaster />
    </ContactProvider>
  )
}

import { ContactProvider } from './contexts/contact-context'
import { Router } from './router'
import './globals.css'

export function App() {
  return (
    <ContactProvider>
      <Router />
    </ContactProvider>
  )
}

import { ThemeSwitcher } from './components/theme-switcher'
import { Toaster } from './components/ui/sonner'
import { ContactsProvider } from './contexts/contacts-context'
import ThemeProvider from './contexts/theme-context'
import { Router } from './router'
import './globals.css'

export function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />

      <ContactsProvider>
        <Router />
        <Toaster />
      </ContactsProvider>
    </ThemeProvider>
  )
}

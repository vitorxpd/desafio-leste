import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { IContact } from '@/interfaces/IContact'
import { generateId } from '@/lib/utils'

interface IContactsContext {
  contacts: IContact[]
  isLoading: boolean
  isFirstLoading: boolean
  addContact: (contact: Omit<IContact, 'id'>) => void
  editContact: (contactId: number, contact: Omit<IContact, 'id'>) => void
  removeContact: (contactId: number) => void
}

export const ContactsContext = createContext({} as IContactsContext)

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoading, setIsFirstLoading] = useState(true)

  const storageKey = '@desafio-leste-1.0.0'

  const addContact = useCallback(
    (contact: Omit<IContact, 'id'>) => {
      setIsLoading(true)
      const {
        avatar,
        birthday,
        email,
        first_name,
        gender,
        language,
        last_name,
      } = contact

      const newContact = {
        id: generateId(),
        avatar,
        birthday,
        email,
        first_name,
        gender,
        language,
        last_name,
      }

      const newContacts = [...contacts, newContact]

      localStorage.setItem(storageKey, JSON.stringify(newContacts))
      setContacts(newContacts)
      setIsLoading(false)
    },
    [contacts],
  )

  const editContact = useCallback(
    (contactId: number, contact: Omit<IContact, 'id'>) => {
      setIsLoading(true)

      const updatedContacts = contacts.map((newContact) => {
        if (newContact.id === contactId) {
          return { ...newContact, ...contact }
        }

        return newContact
      })

      localStorage.setItem(storageKey, JSON.stringify(updatedContacts))
      setContacts(updatedContacts)
      setIsLoading(false)
    },
    [contacts],
  )

  const removeContact = useCallback(
    (contactId: number) => {
      setIsLoading(true)

      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId,
      )

      localStorage.setItem(storageKey, JSON.stringify(filteredContacts))
      setContacts(filteredContacts)
      setIsLoading(false)
    },
    [contacts],
  )

  useEffect(() => {
    setIsLoading(true)

    const storage = localStorage.getItem(storageKey)

    if (storage) {
      const contactsStorage = JSON.parse(storage)

      if (contactsStorage.length > 0) {
        setContacts(contactsStorage)
        setIsLoading(false)
        return
      }
    }

    const controller = new AbortController()

    async function loadContacts() {
      try {
        const response = await fetch(
          'https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060',
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setContacts(data)
        localStorage.setItem(storageKey, JSON.stringify(data))
      } catch {
        //
      }
    }

    loadContacts()
    setIsLoading(false)
    setIsFirstLoading(false)

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isLoading,
        isFirstLoading,
        addContact,
        editContact,
        removeContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
  return useContext(ContactsContext)
}

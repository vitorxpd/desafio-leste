import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { TContactFormSchema } from '@/views/components/contact-form'

export interface IContact {
  avatar: string
  birthday: string
  email: string
  first_name: string
  gender: 'M' | 'F'
  id: number
  language: string
  last_name: string
}

interface IContactContext {
  contacts: IContact[]
  isLoading: boolean
  addContact: (contact: TContactFormSchema) => void
  editContact: (contactId: number, contact: TContactFormSchema) => void
  removeContact: (contactId: number) => void
}

export const ContactContext = createContext({} as IContactContext)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const storageKey = '@desafio-leste-1.0.0'

  const addContact = useCallback(
    (contact: TContactFormSchema) => {
      setIsLoading(true)

      const { birthday, email, first_name, gender, language, last_name } =
        contact

      const data = {
        id: contacts.length + 1,
        avatar: '',
        birthday,
        email,
        first_name,
        gender,
        language,
        last_name,
      }

      setContacts((state) => [...state, data])
      setIsLoading(false)
      localStorage.setItem(storageKey, JSON.stringify([...contacts, data]))
    },
    [contacts],
  )

  const editContact = useCallback(
    (contactId: number, contact: TContactFormSchema) => {
      setIsLoading(true)

      const newContacts = contacts.map((newContact) => {
        if (newContact.id === contactId) {
          return { ...newContact, ...contact }
        }

        return newContact
      })

      setContacts((state) =>
        state.map((stateContact) => {
          if (stateContact.id === contactId) {
            return { ...stateContact, ...contact }
          }

          return stateContact
        }),
      )

      setIsLoading(false)

      localStorage.setItem(storageKey, JSON.stringify(newContacts))
    },
    [contacts],
  )

  const removeContact = useCallback(
    (contactId: number) => {
      setIsLoading(true)

      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId,
      )
      setContacts(filteredContacts)
      setIsLoading(false)
      localStorage.setItem(storageKey, JSON.stringify(filteredContacts))
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
      } catch (error) {
        throw new Error('Error fetching contacts')
      }
    }

    loadContacts()
    setIsLoading(false)

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <ContactContext.Provider
      value={{ contacts, isLoading, addContact, editContact, removeContact }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  return useContext(ContactContext)
}

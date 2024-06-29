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

  const addContact = useCallback(
    (contact: TContactFormSchema) => {
      setIsLoading(true)

      const { birthday, email, first_name, gender, language, last_name } =
        contact

      setContacts((state) => [
        ...state,
        {
          id: contacts.length + 1,
          avatar: '',
          birthday,
          email,
          first_name,
          gender,
          language,
          last_name,
        },
      ])

      setIsLoading(false)
    },
    [contacts],
  )

  const editContact = useCallback(
    (contactId: number, contact: TContactFormSchema) => {
      setIsLoading(true)

      setContacts((state) =>
        state.map((stateContact) => {
          if (stateContact.id === contactId) {
            return { ...stateContact, ...contact }
          }

          return stateContact
        }),
      )

      setIsLoading(false)
    },
    [],
  )

  const removeContact = useCallback(
    (contactId: number) => {
      setIsLoading(true)

      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId,
      )
      setContacts(filteredContacts)
      setIsLoading(false)
    },
    [contacts],
  )

  useEffect(() => {
    setIsLoading(true)

    const _storageKey = '@desafio-leste-1.0.0'
    const storage = localStorage.getItem(_storageKey)

    if (storage) {
      setContacts(JSON.parse(storage))
      setIsLoading(false)
      return
    }

    fetch('https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data)
        localStorage.setItem(_storageKey, JSON.stringify(data))
      })

    setIsLoading(false)
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

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
  addContact: (contact: TContactFormSchema) => void
  removeContact: (contactId: number) => void
}

export const ContactContext = createContext({} as IContactContext)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<IContact[]>([])

  const addContact = useCallback(
    (contact: TContactFormSchema) => {
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
    },
    [contacts],
  )

  const removeContact = useCallback(
    (contactId: number) => {
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId,
      )
      setContacts(filteredContacts)
    },
    [contacts],
  )

  useEffect(() => {
    const _storageKey = '@desafio-leste-1.0.0'
    const storage = localStorage.getItem(_storageKey)

    if (storage) {
      setContacts(JSON.parse(storage))
      return
    }

    fetch('https://my.api.mockaroo.com/lestetelecom/test.json?key=f55c4060')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data)
        localStorage.setItem(_storageKey, JSON.stringify(data))
      })
  }, [])

  return (
    <ContactContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  return useContext(ContactContext)
}

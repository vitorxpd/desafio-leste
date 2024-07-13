import { AxiosError, CanceledError } from 'axios'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { APIError } from '@/errors/api-error'
import { StorageError } from '@/errors/storage-error'
import { IContact } from '@/interfaces/IContact'
import { storageKey } from '@/lib/constants'
import { delay, generateId } from '@/lib/utils'
import ContactsService from '@/services/contacts-service'

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

  const loadStorage = useCallback(async () => {
    if (contacts.length > 0) {
      return
    }

    const storage = localStorage.getItem(storageKey)

    if (!storage) {
      return
    }

    try {
      const contactsStorage = JSON.parse(storage)

      setIsLoading(true)

      await delay()

      if (contactsStorage.length > 0) {
        setContacts(contactsStorage)
        return
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new StorageError('Invalid JSON format')
      }

      throw new StorageError('Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [contacts])

  const loadContacts = useCallback(
    async (controller: AbortController) => {
      if (contacts.length > 0) {
        return
      }

      try {
        setIsLoading(true)

        const { data, status } = await ContactsService.listContacts({
          signal: controller.signal,
        })

        if (status === 200) {
          localStorage.setItem(storageKey, JSON.stringify(data))
          setContacts(data)

          return
        }

        throw new Error()
      } catch (error) {
        if (error instanceof CanceledError) {
          return
        }

        if (error instanceof AxiosError) {
          throw new APIError(error.message)
        }

        throw new APIError('Request failed')
      } finally {
        setIsLoading(false)
      }
    },
    [contacts],
  )

  useEffect(() => {
    const controller = new AbortController()

    loadStorage()
    loadContacts(controller)

    setIsFirstLoading(false)

    return () => {
      controller.abort()
    }
  }, [loadContacts, loadStorage])

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

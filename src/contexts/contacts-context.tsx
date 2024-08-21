import { AxiosError, CanceledError } from 'axios'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { storageKeys } from '@/config/storage-keys'
import { IContact } from '@/entities/IContact'
import { APIError } from '@/errors/api-error'
import { StorageError } from '@/errors/storage-error'
import { generateId } from '@/lib/utils'
import { ContactsService } from '@/services/contacts-service'

interface IContactsContext {
  contacts: IContact[]
  isLoading: boolean
  isFirstLoading: boolean
  hasError: boolean
  addContact: (contact: Omit<IContact, 'id'>) => void
  editContact: (contactId: number, contact: Omit<IContact, 'id'>) => void
  removeContact: (contactId: number) => void
  loadContacts: (controller?: AbortController) => Promise<void>
}

export const ContactsContext = createContext({} as IContactsContext)

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

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

      localStorage.setItem(storageKeys.contacts, JSON.stringify(newContacts))
      setContacts(newContacts)
      setHasError(false)
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

      localStorage.setItem(
        storageKeys.contacts,
        JSON.stringify(updatedContacts),
      )
      setContacts(updatedContacts)
      setHasError(false)
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

      localStorage.setItem(
        storageKeys.contacts,
        JSON.stringify(filteredContacts),
      )
      setContacts(filteredContacts)
      setHasError(false)
      setIsLoading(false)
    },
    [contacts],
  )

  const loadStorage = useCallback(() => {
    if (contacts.length > 0) {
      return
    }

    const storage = localStorage.getItem(storageKeys.contacts)

    if (!storage) {
      return
    }

    try {
      const contactsStorage = JSON.parse(storage)

      setHasError(false)
      setIsLoading(true)

      if (contactsStorage.length > 0) {
        setContacts(contactsStorage)
        setHasError(false)
        return
      }
    } catch (error) {
      setHasError(true)

      if (error instanceof SyntaxError) {
        throw new StorageError('Invalid JSON format')
      }

      throw new StorageError('Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [contacts])

  const loadContacts = useCallback(
    async (controller?: AbortController) => {
      if (contacts.length > 0) {
        return
      }

      try {
        setHasError(false)
        setIsLoading(true)

        const { data, status } = await ContactsService.listContacts({
          signal: controller?.signal,
        })

        if (status === 200) {
          localStorage.setItem(storageKeys.contacts, JSON.stringify(data))
          setContacts(data)
          setHasError(false)
          return
        }

        throw new Error()
      } catch (error) {
        setHasError(true)

        if (error instanceof CanceledError) {
          setHasError(false)
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
        hasError,
        addContact,
        editContact,
        removeContact,
        loadContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  )
}

export function useContacts() {
  return useContext(ContactsContext)
}

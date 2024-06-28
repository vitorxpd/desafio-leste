import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface IContact {
  avatar: string
  birthday: string
  email: string
  first_name: string
  gender: string
  id: number
  language: string
  last_name: string
}

interface IContactContext {
  contacts: IContact[]
}

export const ContactContext = createContext({} as IContactContext)

export function ContactProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<IContact[]>([])

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
    <ContactContext.Provider value={{ contacts }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  return useContext(ContactContext)
}

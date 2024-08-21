'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { storageKeys } from '@/config/storage-keys'

type Theme = 'dark' | 'light'

interface IThemeContext {
  theme: Theme
  handleChangeTheme: () => void
}

const ThemeContext = createContext({} as IThemeContext)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storage = localStorage.getItem(storageKeys.theme)

    if (!storage) {
      return 'light'
    }

    return storage as Theme
  })

  const handleChangeTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'))
  }, [])

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.add('light')
    localStorage.setItem(storageKeys.theme, theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

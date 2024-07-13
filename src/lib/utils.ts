import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(birthDay: string) {
  const today = new Date()
  const birthDate = new Date(birthDay)

  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export const isMobile = window.innerWidth < 768

export function generateId() {
  const min = 1000000
  const max = 9999999

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function delay(ms: number = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

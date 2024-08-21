import { Moon, Sun } from 'lucide-react'

import { Switch } from '@/components/ui/switch'

import { useTheme } from '../contexts/theme-context'

export function ThemeSwitcher() {
  const { theme, handleChangeTheme } = useTheme()

  return (
    <div className="absolute right-4 top-4 flex items-center gap-1">
      <Sun />
      <Switch checked={theme === 'dark'} onCheckedChange={handleChangeTheme} />
      <Moon />
    </div>
  )
}

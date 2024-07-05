import { Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, toast as sonnerDispatch } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

type ToastType = 'success'

const ToastIcon = ({ type }: { type: ToastType }) => {
  if (type === 'success') {
    return <Check color="green" />
  }

  return null
}

interface ToastProps {
  type: ToastType
  title: string
  description: string
}

const toast = ({ type, title, description }: ToastProps) => {
  sonnerDispatch(title, {
    description,
    duration: 3000,
    icon: <ToastIcon type={type} />,
    className: 'gap-2 pointer-events-none',
  })
}

export { Toaster, toast }

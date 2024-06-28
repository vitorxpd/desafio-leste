'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Spinner } from '../ui/spinner'
import { Textarea } from '../ui/textarea'

import { FormGroup } from './form-group'

const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(100, { message: 'Message must be at most 100 characters long' }),
})

type TContactFormSchema = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const { formState, register, handleSubmit, reset } =
    useForm<TContactFormSchema>({
      resolver: zodResolver(contactFormSchema),
      mode: 'onChange',
    })

  const { errors, isSubmitting } = formState

  async function submitForm(data: TContactFormSchema) {
    // eslint-disable-next-line no-console
    console.log({ data })

    toast('Email Sent', {
      description: 'Thank you for reaching out.',
      icon: <Check color="green" />,
      closeButton: true,
      className: 'gap-2',
    })

    reset()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <FormGroup error={errors.name?.message}>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              hasError={!!errors.name?.message}
              {...register('name')}
            />
          </FormGroup>

          <FormGroup error={errors.email?.message}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              hasError={!!errors.email?.message}
              {...register('email')}
            />
          </FormGroup>

          <FormGroup error={errors.message?.message}>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              className="h-[90px] resize-none"
              hasError={!!errors.message?.message}
              {...register('message')}
            />
          </FormGroup>

          <Button type="submit" disabled={!formState.isValid || isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Send message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

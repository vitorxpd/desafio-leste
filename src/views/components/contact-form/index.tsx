import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Spinner } from '../ui/spinner'

import { FormGroup } from './form-group'

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  birthday: z.string().date('Please enter a valid date'),
  gender: z.enum(['f', 'm']),
  language: z.string(),
})

type TContactFormSchema = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const { formState, control, register, handleSubmit } =
    useForm<TContactFormSchema>({
      resolver: zodResolver(contactFormSchema),
      mode: 'onChange',
    })

  const { errors, isSubmitting } = formState

  function handleChangeBirthday(
    event: ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) {
    let newValue = event.target.value.replace(/\D/g, '')

    if (newValue.length > 8) {
      newValue = newValue.slice(0, 8)
    }

    if (newValue.length > 4) {
      newValue = `${newValue.slice(0, 4)}-${newValue.slice(4)}`
    }

    if (newValue.length > 7) {
      newValue = `${newValue.slice(0, 7)}-${newValue.slice(7)}`
    }

    onChange(newValue)
  }

  async function submitForm(data: TContactFormSchema) {
    // eslint-disable-next-line no-console
    console.log({ data })

    toast('Email Sent', {
      description: 'Thank you for reaching out.',
      icon: <Check color="green" />,
      closeButton: true,
      className: 'gap-2',
    })

    // reset()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex gap-2">
            <FormGroup error={errors.firstName?.message}>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                hasError={!!errors.firstName?.message}
                {...register('firstName')}
              />
            </FormGroup>

            <FormGroup error={errors.lastName?.message}>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                hasError={!!errors.lastName?.message}
                {...register('lastName')}
              />
            </FormGroup>
          </div>

          <FormGroup error={errors.email?.message}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              hasError={!!errors.email?.message}
              {...register('email')}
            />
          </FormGroup>

          <div className="flex gap-2">
            <FormGroup error={errors.gender?.message}>
              <Label htmlFor="message">Gender</Label>
              <Input
                id="gender"
                hasError={!!errors.gender?.message}
                {...register('gender')}
              />
            </FormGroup>

            <FormGroup error={errors.birthday?.message}>
              <Label htmlFor="message">Birthday</Label>

              <Controller
                control={control}
                name="birthday"
                render={({ field: { value, onChange } }) => (
                  <Input
                    id="birthday"
                    placeholder="0000-00-00"
                    hasError={!!errors.birthday?.message}
                    value={value}
                    onChange={(event) => handleChangeBirthday(event, onChange)}
                  />
                )}
              />
            </FormGroup>
          </div>

          <FormGroup error={errors.language?.message}>
            <Label htmlFor="message">Language</Label>
            <Input
              id="language"
              hasError={!!errors.language?.message}
              {...register('language')}
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

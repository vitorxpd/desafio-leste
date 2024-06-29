import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { IContact } from '@/contexts/contact-context'
import { languages } from '@/lib/utils'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Spinner } from '../ui/spinner'

import { FormGroup } from './form-group'

const contactFormSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  birthday: z.string().date('Please enter a valid date'),
  gender: z.enum(['M', 'F']),
  language: z.string().min(1, { message: 'Please select a language' }),
})

export type TContactFormSchema = z.infer<typeof contactFormSchema>

interface IContactForm {
  contactData?: IContact
  onSubmit: (formData: TContactFormSchema) => void
}

export function ContactForm({ contactData, onSubmit }: IContactForm) {
  const { formState, control, register, handleSubmit, reset } =
    useForm<TContactFormSchema>({
      resolver: zodResolver(contactFormSchema),
      mode: 'onChange',
      defaultValues: {
        first_name: contactData?.first_name,
        last_name: contactData?.last_name,
        email: contactData?.email,
        gender: contactData?.gender ?? 'M',
        birthday: contactData?.birthday ?? '',
        language: contactData?.language,
      },
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

  async function submitForm(formData: TContactFormSchema) {
    onSubmit(formData)
    reset()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex gap-2">
            <FormGroup error={errors.first_name?.message}>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                hasError={!!errors.first_name?.message}
                {...register('first_name')}
              />
            </FormGroup>

            <FormGroup error={errors.last_name?.message}>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                hasError={!!errors.last_name?.message}
                {...register('last_name')}
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
              <Label htmlFor="gender">Gender</Label>

              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Male" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
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
            <Label htmlFor="language">Language</Label>
            <Controller
              control={control}
              name="language"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder={languages[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormGroup>

          <Button
            variant="green"
            type="submit"
            disabled={!formState.isValid || isSubmitting}
          >
            {isSubmitting && <Spinner />}
            {!isSubmitting && contactData && 'Save Contact'}
            {!isSubmitting && !contactData && 'Add Contact'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

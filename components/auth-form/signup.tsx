'use client'
import { signupAction } from '@/app/actions/auth/signup'
import { SignupFormState, SignupFormScheme } from '@/lib/zod/auth'
import { ActionButton } from '../action-button'
import { useActionState } from 'react'
import { Input, InputError } from '../input'
import Form from 'next/form'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  errors: undefined,
}

export function SignupForm() {
  const [formState, action] = useActionState(async (prevState: SignupFormState, formData: FormData) => {
    const validateFields = SignupFormScheme.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!validateFields.success) {
      return {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        errors: validateFields.error.flatten().fieldErrors,
      }
    }

    const { firstName, lastName, email, password } = validateFields.data

    const { errors, formErrors } = await signupAction({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })

    if (formErrors) return formErrors

    if (errors) alert(errors.message)

    return {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      errors: undefined,
    }
  }, initialState)

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={formState.firstName?.toString()}
          name="firstName"
          label="Nome"
          placeholder="Digite seu nome"
        />
        {formState.errors?.firstName && <InputError>{formState.errors.firstName}</InputError>}

        <Input
          defaultValue={formState.lastName?.toString()}
          name="lastName"
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
        />
        {formState.errors?.lastName && <InputError>{formState.errors.lastName}</InputError>}

        <Input
          defaultValue={formState.email?.toString()}
          name="email"
          label="Email"
          type="email"
          placeholder="m@exemplo.com"
        />
        {formState.errors?.email && <InputError>{formState.errors.email}</InputError>}

        <Input
          defaultValue={formState.password?.toString()}
          name="password"
          label="Senha"
          placeholder="Digite uma senha"
        />
        {formState.errors?.password && (
          <div className="text-red-500">
            <p>A senha deve ter:</p>
            <ul>
              {formState.errors.password.map((error) => (
                <li key={error}>
                  <InputError>{error}</InputError>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ActionButton full>Criar conta</ActionButton>
    </form>
  )
}

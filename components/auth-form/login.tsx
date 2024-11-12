'use client'
import { LoginFormState, LoginFormScheme } from '@/lib/zod/auth'
import { ActionButton } from '../action-button'
import { useActionState } from 'react'
import { Input, InputError } from '../input'
import { loginAction } from '@/app/actions/auth/login'

const initialState = {
  email: '',
  password: '',
  errors: undefined,
}

export function LoginForm() {
  const [formState, action] = useActionState(async (prevState: LoginFormState, formData: FormData) => {
    const validateFields = LoginFormScheme.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (!validateFields.success) {
      return {
        email: formData.get('email'),
        password: formData.get('password'),
        errors: validateFields.error.flatten().fieldErrors,
      }
    }

    const { email, password } = validateFields.data

    const { errors, formErrors } = await loginAction({ customerEmail: email, customerPassword: password })

    if (formErrors) return formErrors

    if (errors) alert(errors.message)

    return {
      email: formData.get('email'),
      password: formData.get('password'),
      errors: undefined,
    }
  }, initialState)

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input
          defaultValue={formState.email?.toString()}
          name="email"
          label="Email"
          type="email"
          placeholder="m@exemplo.com"
        />
        {formState.errors?.email && <InputError>{formState.errors?.email}</InputError>}
        <Input
          defaultValue={formState.password?.toString()}
          name="password"
          label="Senha"
          placeholder="Digite uma senha"
        />
        {formState.errors?.password && <InputError>{formState.errors?.password}</InputError>}
      </div>
      <ActionButton full>Login</ActionButton>
    </form>
  )
}

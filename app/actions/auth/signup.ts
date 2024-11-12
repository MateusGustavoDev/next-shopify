'use server'
import { ERROR_MESSAGES } from '@/lib/constants'
import { shopifyFetch } from '@/lib/shopify/fetch/shopify-fetch'
import { ActionStateType } from '@/lib/shopify/types'
import { CreateCustomerAccountMutation } from '@/lib/shopify/graphql/generated'
import { SignupFormState, SignupFormScheme } from '@/lib/zod/auth'
import { loginAction } from './login'
import { createCustomerAccountMutation } from '@/lib/shopify/graphql/mutations/create-customer-account'

type SignupActionArgs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type SignupAction = ActionStateType & {
  formErrors?: SignupFormState
}

export async function signupAction(formData: SignupActionArgs): Promise<SignupAction> {
  const validateFields = SignupFormScheme.safeParse({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
  })

  if (!validateFields.success) {
    return {
      errors: { message: ERROR_MESSAGES.customerCreateAccount },
      formErrors: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        errors: validateFields.error.flatten().fieldErrors,
      },
    }
  }

  const { firstName, lastName, email, password } = validateFields.data

  const { data, errors } = await shopifyFetch<CreateCustomerAccountMutation>({
    query: createCustomerAccountMutation,
    variables: {
      input: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    },
  })

  if (errors) {
    return {
      errors: { message: ERROR_MESSAGES.customerCreateAccount },
    }
  }

  if (data?.customerCreate?.customerUserErrors[0]) {
    return {
      errors: { message: data.customerCreate.customerUserErrors[0].message },
    }
  }

  await loginAction({ customerEmail: email, customerPassword: password })

  return {
    errors: undefined,
  }
}

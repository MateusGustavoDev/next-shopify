import { customerInfoFragment } from '../fragments/customer'

export const getCustomerInfoQuery = /* GraphQL */ `
  query CustomerMetafields($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...Customer
    }
  }
  ${customerInfoFragment}
`

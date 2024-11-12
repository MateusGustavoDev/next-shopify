import { productFragment } from '../fragments/product'

export const getProductByHandleQuery = /* GraphQL */ `
  query getProductByHandle($handle: String) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${productFragment}
`

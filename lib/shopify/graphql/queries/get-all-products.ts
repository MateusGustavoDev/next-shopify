import { pageInfoFragment } from '../fragments/page-info'
import { productFragment } from '../fragments/product'

export const getAllProductsQuery = /* GraphQL */ `
  query getProductsAndVariants($cursor: String) {
    products(first: 5, after: $cursor) {
      edges {
        cursor
        node {
          ...Product
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${pageInfoFragment}
  ${productFragment}
`

import { pageInfoFragment } from '../fragments/page-info'
import { productFragment } from '../fragments/product'

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      title
      handle
      products(first: 10, after: $cursor) {
        edges {
          node {
            ...Product
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
  ${pageInfoFragment}
  ${productFragment}
`

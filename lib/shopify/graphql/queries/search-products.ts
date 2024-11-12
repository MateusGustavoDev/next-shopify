import { pageInfoFragment } from '../fragments/page-info'
import { productFragment } from '../fragments/product'

export const searchProductsQuery = /* GraphQL */ `
  query searchProducts($query: String!, $cursor: String, $numOfResults: Int) {
    search(query: $query, first: $numOfResults, types: PRODUCT, after: $cursor) {
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
  ${pageInfoFragment}
  ${productFragment}
`

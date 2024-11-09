import { pageInfoFragment } from '../fragments/page-info'
import { productFragment } from '../fragments/product'

export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      title
      products(first: 5, after: $cursor) {
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

export const getProductByHandleQuery = /* GraphQL */ `
  query getProductByHandle($handle: String) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${productFragment}
`

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

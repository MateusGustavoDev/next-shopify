import { productFragment } from '../fragments/product'

export const getProductRecommendationsQuery = /* GraphQL */ `
  query productRecommendations($productHandle: String) {
    productRecommendations(productHandle: $productHandle) {
      ...Product
    }
  }
  ${productFragment}
`

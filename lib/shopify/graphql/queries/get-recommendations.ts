import { productFragment } from '../fragments/product'

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations {
    productRecommendations(productId: "gid://shopify/Product/123456789") {
      ...Product
    }
  }
  ${productFragment}
`

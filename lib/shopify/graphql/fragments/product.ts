import { imageFragment } from './image'
import { productVariantFragment } from './product-variant'

export const productFragment = /* GraphQL */ `
  fragment Product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      optionValues {
        id
        name
        swatch {
          color
        }
      }
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      ...ProductVariant
    }
    featuredImage {
      ...Image
    }
    images(first: 20) {
      edges {
        node {
          ...Image
        }
      }
    }
    metafields(identifiers: [{ namespace: "product", key: "condition" }]) {
      id
      key
      value
    }
    tags
    updatedAt
  }
  ${productVariantFragment}
  ${imageFragment}
`

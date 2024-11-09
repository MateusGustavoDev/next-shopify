import { imageFragment } from './image'

export const productVariantFragment = /* GraphQL */ `
  fragment ProductVariant on ProductVariantConnection {
    edges {
      node {
        id
        title
        availableForSale
        quantityAvailable
        selectedOptions {
          name
          value
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        image {
          url
        }
      }
    }
  }
`

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
    compareAtPriceRange {
      maxVariantPrice {
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
    tags
    updatedAt
  }
  ${productVariantFragment}
  ${imageFragment}
`

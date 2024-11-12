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

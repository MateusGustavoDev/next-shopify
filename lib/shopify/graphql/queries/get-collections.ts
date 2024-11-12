export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 3) {
      edges {
        cursor
        node {
          id
          title
          handle
        }
      }
    }
  }
`

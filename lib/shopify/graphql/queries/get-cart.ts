import { cartFragment } from '../fragments/cart'

export const getCartQuery = /* GraphQL */ `
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      ...Cart
    }
  }
  ${cartFragment}
`

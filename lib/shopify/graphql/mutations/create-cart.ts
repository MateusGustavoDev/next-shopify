import { cartFragment } from '../fragments/cart'

export const createCartMutation = /* GraphQL */ `
  mutation createCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        ...Cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`

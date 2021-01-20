import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: createOrderInput) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;

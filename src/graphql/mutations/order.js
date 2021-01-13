import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: createOrderInput) {
    createOrder(input: $input) {
      order {
        id
        contactInfo {
          block
          flat
          locality
          number
          phone
          street
        }
      }
    }
  }
`;

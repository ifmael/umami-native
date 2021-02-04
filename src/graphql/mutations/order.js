import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation CreateOrder($input: createOrderInput) {
    createOrder(input: $input) {
      order {
        id
      }
    }
  }
`;

export default CREATE_ORDER;

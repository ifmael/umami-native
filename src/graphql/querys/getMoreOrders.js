import { gql } from "@apollo/client";

const GET_MORE_ORDERS = gql`
  query {
    configurations {
      configuration {
        ... on ComponentConfigurationsMoreOrders {
          moreOrder
          titleNoMoreOrders
        }
      }
    }
  }
`;

export default GET_MORE_ORDERS;

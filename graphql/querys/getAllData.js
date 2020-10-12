import { gql } from "@apollo/client";

const GET_ALL_DATA = gql`
  query {
    products {
      id
      name
      product_category {
        name
      }
      description
      price
      ingredients {
        name
        type
      }
      order
    }
    productCategories {
      id
      name
      order
      color
    }
  }
`;

export default GET_ALL_DATA;

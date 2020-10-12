import { gql } from "@apollo/client";

const GET_PRODUCT_CATEGORIES = gql`
  query {
    productCategories {
      name
      order
      color
    }
  }
`;

export default GET_PRODUCT_CATEGORIES;

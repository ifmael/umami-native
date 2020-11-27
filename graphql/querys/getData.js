import { gql } from "@apollo/client";

const GET_DATA = gql`
  query {
    products {
      id
      name
      name
      description
      price
      category {
        slug
      }
      isMenuable
      isCustomizable
      isRadioButton
      order
      ingredients {
        id
        name
      }
      configuration {
        ... on ComponentBurgerMeats {
          id
          name
          description
          isRadioButton
          order
          data {
            id
            name
          }
        }

        ... on ComponentBurgerPointCooking {
          id
          name
          description
          isRadioButton
          order
          data {
            id
            name
          }
        }
        ... on ComponentSandwichBreads {
          id
          name
          description
          isRadioButton
          order
          data {
            id
            name
          }
        }
        ... on ComponentOptionsMeat {
          id
          order
          options {
            elements {
              ... on ComponentBurgerMeats {
                id
                name
                description
                isRadioButton
                order
                data {
                  id
                  name
                }
              }
            }
          }
        }
        ... on ComponentOptionsPointMeatConfiguration {
          id
          order
          options {
            elements {
              ... on ComponentBurgerPointCooking {
                id
                name
                description
                isRadioButton
                order
                data {
                  id
                  name
                }
              }
            }
          }
        }
        ... on ComponentOptionsBread {
          id
          order
          options {
            elements {
              ... on ComponentSandwichBreads {
                id
                name
                description
                isRadioButton
                order
                data {
                  id
                  name
                }
              }
            }
          }
        }
        ... on ComponentOptionsType {
          id
          states {
            id
            name
          }
        }
      }
      menu {
        ... on ComponentMenuInfo {
          id
          price
          description
        }
        ... on ComponentMenuSide {
          name
          isRadioButton
          order
          sides {
            ... on ComponentMenuSideItem {
              extraPrice
              product {
                id
                name
              }
            }
          }
        }
        ... on ComponentOptionsSides {
          id
          order
          options {
            elements {
              ... on ComponentMenuSide {
                name
                isRadioButton
                order
                sides {
                  ... on ComponentMenuSideItem {
                    id
                    extraPrice
                    product {
                      id
                      name
                    }
                    options {
                      id
                      name
                    }
                    isRadioButton
                  }
                }
              }
            }
          }
        }
        ... on ComponentMenuBeverage {
          id
          name
          isRadioButton
          beverages {
            ... on ComponentMenuBeverageItem {
              id
              extraPrice
              product {
                id
                name
              }
            }
          }
        }
        ... on ComponentOptionsBeverage {
          id
          order
          options {
            elements {
              ... on ComponentMenuBeverage {
                id
                name
                isRadioButton
                beverages {
                  ... on ComponentMenuBeverageItem {
                    id
                    extraPrice
                    product {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    productCategories {
      id
      name
      slug
      color
      order
    }
  }
`;

export default GET_DATA;

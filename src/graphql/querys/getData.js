import { gql } from "@apollo/client";

const GET_DATA = gql`
  query {
    products {
      id
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
      isYourTaste
      isChildrenMenu
      customiseSideIngredients
      ingredients {
        id
        name
        price
      }
      images {
        id
        caption
        name
        url
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
            price
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
                  price
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
        ... on ComponentOptionsSideIngredientsConfiguration {
          id
          order
          options {
            elements {
              ... on ComponentOptionsSideIngredients {
                id
                ingredients {
                  id
                  name
                }
              }
            }
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
              id
              extraPrice
              product {
                id
                name
                price
              }
              states {
                id
                name
              }
              isRadioButtonConfigurations
              isRadioButtonIngredients
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
                      price
                      customiseSideIngredients
                      isRadioButton
                      ingredients {
                        id
                        name
                      }
                    }
                    states {
                      id
                      name
                    }
                    isRadioButtonConfigurations
                    isRadioButtonIngredients
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
                price
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
                      price
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
      image {
        id
        name
        caption
        width
        height
        size
        url
        previewUrl
      }
    }
    ingredients {
      id
      name
      price
      showAddExtraIngredientBurguer
      showAddExtraIngredientSandwich
      showAddExtraIngredientSalad
    }
    configurations {
      configuration {
        ... on ComponentConfigurationsMoreOrders {
          moreOrder
          titleNoMoreOrders
        }
        ... on ComponentConfigurationsMinimumPayment {
          min
          title
        }
        ... on ComponentConfigurationsSchedule {
          openingTime
          closingTime
          lastTimelatestSection
          order
          days {
            day
            key
          }
        }
        ... on ComponentConfigurationsClose {
          isClose
          title
        }
      }
    }
    days {
      day
      key
    }
    paymentMethods {
      id
      name
    }
  }
`;

export default GET_DATA;

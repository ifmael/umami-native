import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";

const menusCategory = "menus";

const groupByCategory = (shoppingCart, categories) => {
  try {
    const sortCategoriesWithData = categories.reduce(
      (allCategories, { slug, order }) => {
        return [...allCategories, { category: slug.toLowerCase(), data: [], order }];
      },
      [{ category: menusCategory, data: [], order: 0 }]
    );

    return shoppingCart
      .reduce((elementsGrouped, cartElement) => {
        const {
          beverage,
          category,
          ingredients,
          id,
          isMenu,
          meatPoint,
          name,
          price,
          side,
          typeOfBread,
          typeOfMeat,
        } = cartElement;
        const newCategory = isMenu ? menusCategory : category;
        const categoryElement = elementsGrouped?.find(({ category: categoryGrouped }) => {
          return categoryGrouped === newCategory;
        });

        categoryElement?.data.push({
          beverage,
          category,
          id,
          ingredients,
          meatPoint,
          name,
          price,
          side,
          typeOfBread,
          typeOfMeat,
        });

        return elementsGrouped;
      }, sortCategoriesWithData)
      .filter(({ data }) => data.length > 0);
  } catch (error) {
    console.log(error);
  }
};

const getPrice = (shoppingCart) => {
  return shoppingCart?.reduce((totalPrice, { price = 0 }) => {
    return totalPrice + price;
  }, 0);
};

export default function useShoppingCart() {
  const { categories, shoppingCart } = useContext(GlobalContext);
  const [shoppingCartByCategory, setShoppingCartByCategory] = useState(groupByCategory(shoppingCart, categories));
  const [totalPrice, setTotalPrice] = useState(getPrice(shoppingCart));
  const navigation = useNavigation();

  useEffect(() => {
    const newShoppingCartByCategory = groupByCategory(shoppingCart, categories);

    newShoppingCartByCategory.length > 0
      ? setShoppingCartByCategory(newShoppingCartByCategory)
      : navigation.navigate("HomeTab");
  }, [categories, navigation, shoppingCart]);

  useEffect(() => {
    const newPrice = getPrice(shoppingCart);
    setTotalPrice(newPrice);
  }, [shoppingCart]);

  console.log(shoppingCartByCategory);
  console.log(`price: ${totalPrice}`);

  return [{ shoppingCartByCategory, totalPrice }];
}

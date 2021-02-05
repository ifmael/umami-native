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
          ingredientsExtra,
          id,
          isChildrenMenu,
          isCustom,
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
          ingredientsExtra,
          isChildrenMenu,
          isCustom,
          isMenu,
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

const initialValueError = { message: "", show: false };
const fatalError =
  "No se ha podido completar su pedido.\n\nPor favor intentelo más tarde o llame el teléfono: 987654321";

export default function useShoppingCart() {
  const { categories, createNewOrder, configuration, deliveryOptions, shoppingCart } = useContext(GlobalContext);
  const [shoppingCartByCategory, setShoppingCartByCategory] = useState(groupByCategory(shoppingCart, categories));
  const [totalPrice, setTotalPrice] = useState(getPrice(shoppingCart));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(initialValueError);
  const [showModalMinPayment, setShowModalMinPayment] = useState(totalPrice < configuration?.minimumPayment.min);
  const navigation = useNavigation();
  const isDeliveryOption = deliveryOptions?.option && deliveryOptions?.contactInfo;
  const titleMinPayment = configuration?.minimumPayment.title;
  const lowerMinPayment = totalPrice < configuration?.minimumPayment.min;

  const onCreateNewOrder = async () => {
    try {
      setIsLoading(true);
      const { create, message } = await createNewOrder(deliveryOptions, shoppingCartByCategory, totalPrice);
      create ? setError(initialValueError) : setError({ show: true, message });
      setIsLoading(false);
    } catch (error) {
      setError({ message: fatalError, show: true });
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const newShoppingCartByCategory = groupByCategory(shoppingCart, categories);

    newShoppingCartByCategory.length > 0
      ? setShoppingCartByCategory(newShoppingCartByCategory)
      : navigation.navigate("HomeTab");
  }, [categories, navigation, shoppingCart]);

  useEffect(() => {
    const newPrice = getPrice(shoppingCart);

    setShowModalMinPayment(newPrice < configuration?.minimumPayment.min);
    setTotalPrice(newPrice);
  }, [configuration, shoppingCart]);

  return [
    {
      deliveryOptions,
      error,
      isDeliveryOption,
      isLoading,
      lowerMinPayment,
      shoppingCartByCategory,
      showModalMinPayment,
      titleMinPayment,
      totalPrice,
    },
    { onCreateNewOrder, setError, setShowModalMinPayment },
  ];
}

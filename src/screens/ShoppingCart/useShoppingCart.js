import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import useOrder from "./useOrder";
import { getPrice, groupByCategory } from "./functions";

const initialValueError = { message: "", show: false };
const fatalError =
  "No se ha podido completar su pedido.\n\nPor favor intentelo más tarde o llame el teléfono: 987654321";
const initiaValueShowModalOrder = { isCompleted: false, orderId: "" };

const useShoppingCart = (paymentMethod) => {
  const {
    categories,
    configuration,
    clearDeliveryOptions,
    clearShoppingCart,
    deliveryOptions,
    shoppingCart,
  } = useContext(GlobalContext);
  const createNewOrder = useOrder();
  const [shoppingCartByCategory, setShoppingCartByCategory] = useState(groupByCategory(shoppingCart, categories));
  const [totalPrice, setTotalPrice] = useState(getPrice(shoppingCart));
  const [isLoading, setIsLoading] = useState(false);
  const [showModalOrderCompleted, setShowModalOrderCompleted] = useState(initiaValueShowModalOrder);
  const [error, setError] = useState(initialValueError);
  const [showModalMinPayment, setShowModalMinPayment] = useState(totalPrice < configuration?.minimumPayment.min);
  const [isNavigate, setIsNavigate] = useState(false);

  const navigation = useNavigation();
  const isDeliveryOption = deliveryOptions?.option && deliveryOptions?.contactInfo;
  const titleMinPayment = configuration?.minimumPayment.title;
  const lowerMinPayment = totalPrice < configuration?.minimumPayment.min;

  const onCreateNewOrder = async () => {
    try {
      setIsLoading(true);
      const { create, message } = await createNewOrder(
        deliveryOptions,
        shoppingCartByCategory,
        totalPrice,
        paymentMethod
      );
      if (create) {
        setError(initialValueError);
        setShowModalOrderCompleted({ isCompleted: true, orderId: message });
      } else {
        setShowModalOrderCompleted(initiaValueShowModalOrder);
        setError({ show: true, message });
      }
      setIsLoading(false);
    } catch (error) {
      setError({ message: fatalError, show: true });
      setIsLoading(false);
      console.log(error);
    }
  };

  const resetOrder = () => {
    setShowModalOrderCompleted(initiaValueShowModalOrder);
    clearShoppingCart();
    clearDeliveryOptions();
    setIsNavigate(true);

    // navigation.navigate("HomeTab", { screen: "Home" });
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTab" }],
    });
  };

  useEffect(() => {
    const newShoppingCartByCategory = groupByCategory(shoppingCart, categories);

    newShoppingCartByCategory.length > 0
      ? setShoppingCartByCategory(newShoppingCartByCategory)
      : navigation.navigate("HomeTab", { screen: "Home" });
  }, [categories, navigation, shoppingCart]);

  useEffect(() => {
    if (!isNavigate) {
      const newPrice = getPrice(shoppingCart);

      setShowModalMinPayment(newPrice < configuration?.minimumPayment.min);
      setTotalPrice(newPrice);
    }
  }, [configuration, isNavigate, shoppingCart]);

  return [
    {
      deliveryOptions,
      error,
      isDeliveryOption,
      isLoading,
      lowerMinPayment,
      showModalOrderCompleted,
      shoppingCartByCategory,
      showModalMinPayment,
      titleMinPayment,
      totalPrice,
    },
    { onCreateNewOrder, resetOrder, setError, setShowModalMinPayment },
  ];
};

export default useShoppingCart;

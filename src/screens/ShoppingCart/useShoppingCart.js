import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "/context/GlobalContext";
import useOrder from "./useOrder";
import { getPrice, groupByCategory } from "./functions";

const initialValueError = { message: "", show: false };
const fatalError =
  "No se ha podido completar su pedido.\n\nPor favor intentelo más tarde o llame el teléfono: 987654321";

const useShoppingCart = () => {
  const { categories, configuration, deliveryOptions, shoppingCart } = useContext(GlobalContext);
  const createNewOrder = useOrder();
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
};

export default useShoppingCart;

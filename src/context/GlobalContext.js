import React from "react";
import { useQuery } from "@apollo/client";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  // Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";
import { element } from "prop-types";
import SafeAreaViewAndroid from "/components/common/SafeAreaViewAndroid";
import { useCategories, useDelivery, useIngredients, useOrder, useProducts, useShoppingCart } from "/hooks";

import GET_DATA from "/graphql/querys/getData";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_DATA);
  const { productsByCategory } = useProducts(data);
  const { categories } = useCategories(data);
  const ingredients = useIngredients(data);
  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    // Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });
  const [shoppingCartSelectors, shoppingCartHandlers] = useShoppingCart();
  const [orderSelectors, orderHandlers] = useOrder();
  const [deliverySelectors, deliveryHandlers] = useDelivery();

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <GlobalContext.Provider
      value={{
        categories,
        error,
        ingredients,
        loading,
        productsByCategory,
        ...shoppingCartSelectors,
        ...shoppingCartHandlers,
        ...orderSelectors,
        ...orderHandlers,
        ...deliverySelectors,
        ...deliveryHandlers,
      }}
    >
      <SafeAreaViewAndroid>{children}</SafeAreaViewAndroid>
    </GlobalContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: element,
};
export default ContextProvider;

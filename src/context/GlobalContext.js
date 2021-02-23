import React from "react";
import { useQuery } from "@apollo/client";
import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import AppLoading from "expo-app-loading";
import { element } from "prop-types";
import SafeAreaViewAndroid from "/components/common/SafeAreaViewAndroid";
import InitialError from "/components/common/InitialError";
import {
  useCategories,
  useConfigurations,
  useDays,
  useDelivery,
  useIngredients,
  useProducts,
  useShoppingCart,
} from "/hooks";

import GET_DATA from "/graphql/querys/getData";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_DATA, { fetchPolicy: "no-cache" });
  const { productsByCategory } = useProducts(data);
  const { categories } = useCategories(data);
  const ingredients = useIngredients(data);
  const [configurationSelectors, configurationHandlers] = useConfigurations(data);
  const days = useDays(data);
  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });
  const [shoppingCartSelectors, shoppingCartHandlers] = useShoppingCart();
  const [deliverySelectors, deliveryHandlers] = useDelivery();
  console.log("@@@@@@@@@@@@@@");
  console.log("error");
  console.log(error);

  return !fontsLoaded || loading ? (
    <AppLoading />
  ) : error ? (
    <InitialError />
  ) : (
    <GlobalContext.Provider
      value={{
        categories,
        days,
        error,
        ingredients,
        loading,
        productsByCategory,
        ...configurationSelectors,
        ...configurationHandlers,
        ...shoppingCartSelectors,
        ...shoppingCartHandlers,
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

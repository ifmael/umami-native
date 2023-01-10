import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import {
  useFonts,
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import * as SplashScreen from "expo-splash-screen";
import { element } from "prop-types";
import SafeAreaViewAndroid from "/components/common/SafeAreaViewAndroid";
import InitialError from "/components/common/InitialError";
import {
  useCategories,
  useConfigurations,
  useDays,
  useDelivery,
  useIngredients,
  usePaymentMethods,
  useProducts,
  useShoppingCart,
  useLocation,
  useStorage,
} from "/hooks";

import GET_DATA from "/graphql/querys/getData";

SplashScreen.preventAutoHideAsync();

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_DATA, { fetchPolicy: "no-cache" });
  const { productsByCategory } = useProducts(data);
  const { categories } = useCategories(data);
  const ingredients = useIngredients(data);
  const [configurationSelectors, configurationHandlers] = useConfigurations(data);
  const location = useLocation();
  const days = useDays(data);
  const paymentMethods = usePaymentMethods(data);
  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });
  const [shoppingCartSelectors, shoppingCartHandlers] = useShoppingCart();
  const [deliverySelectors, deliveryHandlers] = useDelivery();
  const { lastOrdersStorage, saveIntoLastOrders, getLastOrders } = useStorage();

  useEffect(() => {
    if (fontsLoaded && !loading && !error) {
      SplashScreen.hideAsync();
    }
  }, [error, fontsLoaded, loading]);

  if (!fontsLoaded || loading) return null;

  return error ? (
    <InitialError error={error} />
  ) : (
    <GlobalContext.Provider
      value={{
        categories,
        days,
        error,
        ingredients,
        loading,
        paymentMethods,
        productsByCategory,
        location,
        lastOrdersStorage,
        ...configurationSelectors,
        ...configurationHandlers,
        ...shoppingCartSelectors,
        ...shoppingCartHandlers,
        ...deliverySelectors,
        ...deliveryHandlers,
        saveIntoLastOrders,
        getLastOrders,
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

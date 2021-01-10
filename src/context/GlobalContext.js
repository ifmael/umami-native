import React from "react";
import { useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { element } from "prop-types";
import SafeAreaViewAndroid from "/components/common/SafeAreaViewAndroid";
import useProducts from "/hooks/useProducts";
import useCategories from "/hooks/useCategories";
import useShoppingCart from "/hooks/useShoppingCart";
import useOrder from "/hooks/useOrder";
import GET_DATA from "/graphql/querys/getData";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_DATA);
  const { productsByCategory } = useProducts(data);
  const { categories } = useCategories(data);
  const [fontsLoaded] = useFonts({
    Confortaa: require("/assets/fonts/Comfortaa.ttf"),
  });
  const [shoppingCartSelectors, shoppingCartHandlers] = useShoppingCart();
  const [orderSelectosr, orderHandlers] = useOrder();
  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <GlobalContext.Provider
      value={{
        categories,
        error,
        loading,
        productsByCategory,
        ...shoppingCartSelectors,
        ...shoppingCartHandlers,
        ...orderSelectosr,
        ...orderHandlers,
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

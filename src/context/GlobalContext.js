import React from "react";
import { useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { element } from "prop-types";
import SafeAreaViewAndroid from "/components/common/SafeAreaViewAndroid";
import useProducts from "/hooks/useProducts";
import useCategories from "/hooks/useCategories";
import useShoppingCart from "/hooks/useShoppingCart";
import GET_DATA from "/graphql/querys/getData";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_DATA);
  const { productsByCategory } = useProducts(data);
  const { categories } = useCategories(data);
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("/assets/fonts/Montserrat-Regular.otf"),
  });
  const { shoppingCart, setItemShoppingCart } = useShoppingCart();

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <GlobalContext.Provider
      value={{
        categories,
        error,
        loading,
        productsByCategory,
        shoppingCart,
        // clearShoppingCart,
        setItemShoppingCart,
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

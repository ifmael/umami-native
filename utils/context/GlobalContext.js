import React from "react";
import { useQuery } from "@apollo/client";
import SafeAreaViewAndroid from "../../components/common/SafeAreaViewAndroid";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useShoppingCart from "../hooks/useShoppingCart";
import GET_DATA from "../../graphql/querys/getData";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_DATA);
  const { productsByCategory } = useProducts(data);
  const { categories } = useCategories(data);

  const {
    shoppingCart,
    setItemShoppingCart,
    clearShoppingCart,
  } = useShoppingCart();

  return (
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

export default ContextProvider;

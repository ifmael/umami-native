import React from "react";
import SafeAreaViewAndroid from "../../components/common/SafeAreaViewAndroid";
import { useQuery } from "@apollo/client";
import useProducts from "./useProducts";
import useCategories from "./useCategories";
import useShoppingCart from "./useShoppingCart";
import GET_ALL_DATA from "../../graphql/querys/getAllData";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_ALL_DATA);
  const { products, productsByCategory } = useProducts(data);
  const { simpleCategories, categories } = useCategories(data);
  const {
    shoppingCart,
    setItemShoppingCart,
    clearShoppingCart,
  } = useShoppingCart();

  return (
    <GlobalContext.Provider
      value={{
        loading,
        error,
        products,
        productsByCategory,
        categories,
        simpleCategories,
        shoppingCart,
        setItemShoppingCart,
        clearShoppingCart,
      }}
    >
      <SafeAreaViewAndroid>{children}</SafeAreaViewAndroid>
    </GlobalContext.Provider>
  );
};

export default ContextProvider;

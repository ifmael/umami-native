import React from "react";
import SafeAreaViewAndroid from "../../components/common/SafeAreaViewAndroid";
import useGlobalContext from "./useGlobalContext";

export const GlobalContext = React.createContext({});

const ContextProvider = ({ children }) => {
  const { loading, error, products, productCategories } = useGlobalContext();

  return (
    <GlobalContext.Provider
      value={{ loading, error, products, productCategories }}
    >
      <SafeAreaViewAndroid>{children}</SafeAreaViewAndroid>
    </GlobalContext.Provider>
  );
};

export default ContextProvider;

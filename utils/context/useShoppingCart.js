import { useState, useCallback } from "react";

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const setItemShoppingCart = useCallback((itemShoppingCart) => {
    return setShoppingCart((currentValue) => [
      ...currentValue,
      itemShoppingCart,
    ]);
  }, []);

  const clearShoppingCart = useCallback(() => {
    return [];
  }, []);

  return { shoppingCart, setItemShoppingCart, clearShoppingCart };
};

export default useShoppingCart;

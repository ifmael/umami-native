import { useState, useCallback } from "react";

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const setItemShoppingCart = useCallback((itemShoppingCart) => {
    return setShoppingCart((currentValue) => [...currentValue, itemShoppingCart]);
  }, []);

  const removeItem = useCallback((id) => {
    setShoppingCart((currentShoppingCart) => {
      return currentShoppingCart?.filter(({ id: idItem }) => id !== idItem);
    });
  }, []);

  const clearShoppingCart = useCallback(() => {
    return [];
  }, []);

  return [{ shoppingCart }, { clearShoppingCart, removeItem, setItemShoppingCart }];
};

export default useShoppingCart;

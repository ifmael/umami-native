import { useState, useCallback } from "react";

const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const setItemShoppingCart = useCallback((itemShoppingCart) => {
    setShoppingCart((currentValue) => [...currentValue, itemShoppingCart]);
  }, []);

  const removeItem = useCallback((id) => {
    setShoppingCart((currentShoppingCart) => {
      return currentShoppingCart?.filter(({ id: idItem }) => id !== idItem);
    });
  }, []);

  const clearShoppingCart = useCallback(() => {
    setShoppingCart([]);
  }, []);

  return [{ shoppingCart }, { clearShoppingCart, removeItem, setItemShoppingCart, setShoppingCart }];
};

export default useShoppingCart;

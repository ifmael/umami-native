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
    // setShoppingCartByCategory((currentShoppingCart) => {
    //   debugger;
    //   const shoppingCartCategory = currentShoppingCart?.find(({ category: categoryCart }) => category === categoryCart);
    //   const newShoppingCartCategory = shoppingCartCategory?.data?.filter(
    //     ({ id: idShoppingCartElement }) => !(idShoppingCartElement === id)
    //   );
    //   return currentShoppingCart.map((shoppingCartCategoryElement) =>
    //     shoppingCartCategoryElement.category === category
    //       ? { ...shoppingCartCategoryElement, data: newShoppingCartCategory }
    //       : shoppingCartCategoryElement
    //   );
    // });
  }, []);

  const clearShoppingCart = useCallback(() => {
    return [];
  }, []);

  return [{ shoppingCart }, { clearShoppingCart, removeItem, setItemShoppingCart }];
};

export default useShoppingCart;

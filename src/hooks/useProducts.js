import { useState, useEffect } from "react";
import { getProductsByCategory } from "./functions";
import { alphabeticName } from "/utils/functions";

const useProducts = (dataFromServer) => {
  const [productsByCategory, setProductsByCategory] = useState();

  useEffect(() => {
    if (!dataFromServer) return;
    const { products: productsServer } = dataFromServer;

    const ingredientsSortedInProducts = productsServer.map(({ ingredients, ...restProps }) => {
      return Array.isArray(ingredients) && ingredients.length > 0
        ? { ...restProps, ingredients: ingredients.sort(alphabeticName) }
        : { ingredients, ...restProps };
    });

    const productsByCategory = getProductsByCategory(ingredientsSortedInProducts);

    setProductsByCategory(productsByCategory);
  }, [dataFromServer]);

  return { productsByCategory };
};

export default useProducts;

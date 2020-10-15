import { useState, useEffect } from "react";
import { formatProducts, getProductsByCategory } from "./functions";

const useProducts = (dataFromServer) => {
  const [products, setProducts] = useState();
  const [productsByCategory, setProductsByCategory] = useState();

  useEffect(() => {
    if (!dataFromServer) return;

    const { products: productsServer } = dataFromServer;
    const productsFormatted = formatProducts(productsServer);
    const productsCategory = getProductsByCategory(productsFormatted);

    setProducts(productsFormatted);
    setProductsByCategory(productsCategory);
  }, [dataFromServer]);

  return { products, productsByCategory };
};

export default useProducts;

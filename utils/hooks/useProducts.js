import { useState, useEffect } from "react";
import { getProductsByCategory } from "./functions";

const useProducts = (dataFromServer) => {
  const [productsByCategory, setProductsByCategory] = useState();

  useEffect(() => {
    if (!dataFromServer) return;
    const { products: productsServer } = dataFromServer;

    const productsByCategory = getProductsByCategory(productsServer);

    setProductsByCategory(productsByCategory);
  }, [dataFromServer]);

  return { productsByCategory };
};

export default useProducts;

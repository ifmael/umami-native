import { useState, useEffect } from "react";
import { formatProductCategories } from "./functions";

const useCategories = (dataFromServer) => {
  const [categories, setCategories] = useState();
  const [simpleCategories, setSimpleCategories] = useState();

  useEffect(() => {
    if (!dataFromServer) return;

    const { productCategories: productCategoriesServer } = dataFromServer;

    // why is frozen ??
    const [
      productCategoriesFormatted,
      simpleCategoriesAux,
    ] = formatProductCategories(productCategoriesServer.slice());

    setCategories(productCategoriesFormatted);
    setSimpleCategories(simpleCategoriesAux);
  }, [dataFromServer]);

  return { simpleCategories, categories };
};

export default useCategories;

import { useState, useEffect } from "react";
import { sortAsc } from "../functions";

const useCategories = (dataFromServer) => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    if (!dataFromServer) return;

    const { productCategories: productCategoriesServer } = dataFromServer;

    //Why is frozen?
    setCategories(productCategoriesServer.slice().sort(sortAsc));
  }, [dataFromServer]);

  return { categories };
};

export default useCategories;

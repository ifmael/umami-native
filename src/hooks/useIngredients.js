import { useMemo } from "react";

const useIngredients = (dataFromServer) => {
  const addExtraIngredient = useMemo(() => {
    try {
      if (!dataFromServer) return;
      const { ingredients } = dataFromServer;
      return ingredients;
    } catch (error) {
      console.log(error);
      return;
    }
  }, [dataFromServer]);

  return addExtraIngredient;
};

export default useIngredients;

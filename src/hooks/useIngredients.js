import { useMemo } from "react";
import { alphabeticName } from "/utils/functions";

const useIngredients = (dataFromServer) => {
  const addExtraIngredient = useMemo(() => {
    try {
      if (!dataFromServer) return;
      const { ingredients } = dataFromServer;

      const sortedIngredients = ingredients.sort(alphabeticName);

      return sortedIngredients;
    } catch (error) {
      console.log(error);
      return;
    }
  }, [dataFromServer]);

  return addExtraIngredient;
};

export default useIngredients;
